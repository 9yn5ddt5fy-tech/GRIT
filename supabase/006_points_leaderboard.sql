-- GRIT Culture: points from the history quiz, the timeline game and the picture books,
-- names for Google accounts, and a weekly leaderboard of every player.

create table if not exists grit.activity (
  id bigint generated always as identity primary key,
  player_id uuid not null references grit.players on delete cascade,
  day_no int not null,
  kind text not null check (kind in ('quiz', 'timeline', 'book')),
  ref text check (char_length(ref) <= 24),
  points int not null default 0,
  at timestamptz not null default now()
);
create index if not exists activity_player_day on grit.activity (player_id, day_no);
create unique index if not exists activity_book_once on grit.activity (player_id, ref) where kind = 'book';
alter table grit.activity enable row level security;
revoke all on grit.activity from public;

-- Season points now include the quiz, timeline and book points.
create or replace function grit.player_stats(pid uuid) returns jsonb language sql stable
as $$
  with s as (select * from grit.season()),
  p as (
    select pl.day_no, pl.solved, pl.points, grit.day_date(pl.day_no) d
    from grit.plays pl, s
    where pl.player_id = pid and pl.finished and grit.day_date(pl.day_no) between s.starts_on and s.ends_on
  ),
  ex as (
    select coalesce(sum(a.points), 0)::int pts from grit.activity a, s
    where a.player_id = pid and grit.day_date(a.day_no) between s.starts_on and s.ends_on
  ),
  wk as (select count(*) filter (where c >= 5) full_weeks from (select date_trunc('week', d) w, count(*) c from p group by 1) x),
  runs as (
    select min(day_no) a, max(day_no) b, count(*) len
    from (select day_no, day_no - row_number() over (order by day_no) grp from p where solved) x
    group by grp
  ),
  tot as (
    select coalesce(sum(points), 0)::int + 3 * (select full_weeks from wk)::int + (select pts from ex) points,
           count(*)::int days, count(*) filter (where solved)::int wins
    from p
  ),
  lv as (
    select coalesce(max(r.lvl), 0) lvl from grit.ranks r, tot
    where r.min_points <= tot.points and r.min_days <= tot.days
  )
  select jsonb_build_object(
    'points', tot.points, 'days', tot.days, 'played', tot.days, 'wins', tot.wins,
    'extra_points', (select pts from ex),
    'full_weeks', (select full_weeks from wk),
    'streak', coalesce((select len from runs where b >= grit.today() - 1 order by b desc limit 1), 0),
    'best', coalesce((select max(len) from runs), 0),
    'lvl', lv.lvl,
    'rank', (select name from grit.ranks where lvl = lv.lvl),
    'next', (select jsonb_build_object('lvl', r.lvl, 'name', r.name, 'min_points', r.min_points, 'min_days', r.min_days,
                                       'points_left', greatest(0, r.min_points - tot.points),
                                       'days_left', greatest(0, r.min_days - tot.days))
             from grit.ranks r where r.lvl = lv.lvl + 1),
    'season', (select jsonb_build_object('name', name, 'starts_on', starts_on, 'ends_on', ends_on) from s)
  )
  from tot, lv
$$;

-- Guest progress moves into an account together with the extra points.
create or replace function grit.merge_guest(src uuid, dst uuid) returns void language plpgsql
as $$
declare g grit.players;
begin
  if src is null or src = dst then return; end if;
  select * into g from grit.players where id = src;
  if g.id is null or not grit.is_guest(g) then return; end if;
  insert into grit.plays (player_id, day_no, guesses, finished, solved, hint, reveal_pos, points, updated_at)
    select dst, day_no, guesses, finished, solved, hint, reveal_pos, points, updated_at
    from grit.plays where player_id = src
    on conflict (player_id, day_no) do nothing;
  insert into grit.activity (player_id, day_no, kind, ref, points, at)
    select dst, day_no, kind, ref, points, at from grit.activity where player_id = src
    on conflict do nothing;
  delete from grit.players where id = src;
end $$;

-- A nickname account must have a PIN to sign in with nickname + PIN.
create or replace function public.tu_login(p_token text, p_handle text, p_pin text) returns jsonb
language plpgsql security definer set search_path = grit, public, extensions, pg_temp
as $$
declare
  cur uuid;
  acc grit.players;
  tok text;
begin
  begin cur := grit.player_of(p_token); exception when others then cur := null; end;
  select * into acc from grit.players where lower(handle) = lower(trim(coalesce(p_handle, '')));
  if acc.id is null or acc.pin_hash is null then return jsonb_build_object('error', 'login'); end if;
  if acc.locked_until is not null and acc.locked_until > now() then raise exception 'locked'; end if;
  if coalesce(p_pin, '') !~ '^[0-9]{4}$' or acc.pin_hash is distinct from extensions.crypt(p_pin, acc.pin_hash) then
    update grit.players set failed = failed + 1,
           locked_until = case when failed + 1 >= 10 then now() + interval '15 minutes' end
    where id = acc.id;
    return jsonb_build_object('error', 'login');
  end if;
  update grit.players set failed = 0, locked_until = null where id = acc.id;
  perform grit.merge_guest(cur, acc.id);
  tok := grit.new_session(acc.id, p_token);
  return jsonb_build_object('token', tok) || grit.state(acc.id);
end $$;

-- Google accounts choose the name shown on the leaderboard (no PIN needed).
create or replace function public.tu_set_name(p_token text, p_handle text) returns jsonb
language plpgsql security definer set search_path = grit, public, extensions, pg_temp
as $$
declare
  pid uuid := grit.player_of(p_token);
  me grit.players;
  h text := regexp_replace(trim(coalesce(p_handle, '')), '\s+', ' ', 'g');
begin
  select * into me from grit.players where id = pid;
  if me.auth_uid is null then raise exception 'auth'; end if;
  if me.class_id is not null then raise exception 'class'; end if;
  if h !~ '^[A-Za-zА-Яа-яЁёӨөҮү0-9 ._-]{3,20}$' then raise exception 'handle'; end if;
  if exists (select 1 from grit.players where lower(handle) = lower(h) and id <> pid) then raise exception 'taken'; end if;
  update grit.players set handle = h where id = pid;
  return jsonb_build_object('token', p_token) || grit.state(pid);
end $$;

-- Points from the quiz (max 8 a game), the timeline (max 5 a game) and picture books
-- (2 for each book's check question, once per book). Three quiz and three timeline games a day count.
create or replace function public.tu_activity(p_token text, p_kind text, p_score int, p_total int, p_ref text default null)
returns jsonb language plpgsql security definer set search_path = grit, public, extensions, pg_temp
as $$
declare
  pid uuid := grit.player_of(p_token);
  n int := grit.today();
  pts int := 0;
  done int;
begin
  if p_kind = 'quiz' then
    if p_total not between 1 and 20 or p_score not between 0 and p_total then raise exception 'score'; end if;
    select count(*) into done from grit.activity where player_id = pid and day_no = n and kind = 'quiz';
    if done < 3 then pts := least(p_score, 8); end if;
  elsif p_kind = 'timeline' then
    if p_total not between 1 and 10 or p_score not between 0 and p_total then raise exception 'score'; end if;
    select count(*) into done from grit.activity where player_id = pid and day_no = n and kind = 'timeline';
    if done < 3 then pts := least(p_score, 5); end if;
  elsif p_kind = 'book' then
    if coalesce(p_ref, '') !~ '^[a-z0-9-]{1,24}$' then raise exception 'score'; end if;
    if p_score < 1 then return jsonb_build_object('awarded', 0, 'stats', grit.player_stats(pid)); end if;
    if exists (select 1 from grit.activity where player_id = pid and kind = 'book' and ref = p_ref) then
      return jsonb_build_object('awarded', 0, 'stats', grit.player_stats(pid));
    end if;
    pts := 2;
  else
    raise exception 'score';
  end if;
  insert into grit.activity (player_id, day_no, kind, ref, points) values (pid, n, p_kind, p_ref, pts);
  return jsonb_build_object('awarded', pts, 'stats', grit.player_stats(pid));
end $$;

-- The name a player shows on the leaderboard.
create or replace function grit.display_name(p grit.players) returns text language sql immutable
as $$
  select coalesce(p.handle, p.nickname,
    case when p.auth_uid is null then 'Зочин ' else 'Тоглогч ' end || upper(substr(replace(p.id::text, '-', ''), 1, 4)))
$$;

-- Weekly (Monday to Sunday, Mongolian time) or season leaderboard of everyone who scored.
create or replace function public.tu_leaderboard(p_token text, p_scope text default 'week') returns jsonb
language plpgsql security definer set search_path = grit, public, extensions, pg_temp
as $$
declare
  pid uuid;
  n int := grit.today();
  wk_start int := n - (extract(isodow from grit.local_today())::int - 1);
  s grit.seasons := grit.season();
  first_day int;
  rows jsonb;
  mine jsonb;
begin
  -- anyone can look at the board; a player without a session simply has no row of their own
  begin pid := grit.player_of(p_token); exception when others then pid := null; end;
  first_day := case when p_scope = 'season' then n - (grit.local_today() - s.starts_on) else wk_start end;
  with xp as (
    select player_id, sum(points)::int xp from (
      select player_id, points from grit.plays where finished and day_no between first_day and n
      union all
      select player_id, points from grit.activity where day_no between first_day and n
    ) t group by player_id having sum(points) > 0
  ),
  ranked as (
    select x.player_id, x.xp, row_number() over (order by x.xp desc, p.created_at) pos, p
    from xp x join grit.players p on p.id = x.player_id
  ),
  shown as (
    select r.*, grit.player_stats(r.player_id) st from ranked r where r.pos <= 50 or r.player_id = pid
  )
  select
    coalesce(jsonb_agg(jsonb_build_object(
      'pos', pos, 'name', grit.display_name(p), 'xp', xp, 'me', player_id = pid,
      'class', (select c.name from grit.classes c where c.id = (p).class_id),
      'streak', (st ->> 'streak')::int, 'rank', st ->> 'rank', 'lvl', (st ->> 'lvl')::int
    ) order by pos) filter (where pos <= 50), '[]'::jsonb),
    (array_agg(jsonb_build_object('pos', pos, 'name', grit.display_name(p), 'xp', xp, 'me', true,
      'streak', (st ->> 'streak')::int, 'rank', st ->> 'rank', 'lvl', (st ->> 'lvl')::int)) filter (where player_id = pid))[1]
  into rows, mine
  from shown;
  return jsonb_build_object(
    'scope', case when p_scope = 'season' then 'season' else 'week' end,
    'ends_in', case when p_scope = 'season' then null else
      extract(epoch from (date_trunc('week', now() at time zone grit.tz()) + interval '7 days') - (now() at time zone grit.tz()))::int end,
    'season', s.name,
    'rows', rows,
    'me', mine,
    'my_name', (select grit.display_name(p) from grit.players p where p.id = pid)
  );
end $$;

revoke all on function public.tu_set_name(text, text), public.tu_activity(text, text, int, int, text),
  public.tu_leaderboard(text, text), public.tu_login(text, text, text) from public;
grant execute on function public.tu_set_name(text, text), public.tu_activity(text, text, int, int, text),
  public.tu_leaderboard(text, text), public.tu_login(text, text, text) to anon, authenticated;
