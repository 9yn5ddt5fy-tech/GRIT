-- GRIT Culture: change your leaderboard name and pick an avatar (an animal and a colour).
-- No photo uploads: players are mostly children, so avatars come from a fixed set.

alter table grit.players add column if not exists avatar text
  check (avatar is null or avatar ~ '^[a-z]{2,10}-[0-7]$');

-- Change name and/or avatar. Class members keep the nickname their class knows them by.
create or replace function public.tu_profile(p_token text, p_handle text default null, p_avatar text default null)
returns jsonb language plpgsql security definer set search_path = grit, public, extensions, pg_temp
as $$
declare
  pid uuid := grit.player_of(p_token);
  me grit.players;
  h text := nullif(regexp_replace(trim(coalesce(p_handle, '')), '\s+', ' ', 'g'), '');
begin
  select * into me from grit.players where id = pid;
  if grit.is_guest(me) then raise exception 'guest'; end if;
  if h is not null and h is distinct from me.handle then
    if me.class_id is not null then raise exception 'class'; end if;
    if h !~ '^[A-Za-zА-Яа-яЁёӨөҮү0-9 ._-]{3,20}$' then raise exception 'handle'; end if;
    if exists (select 1 from grit.players where lower(handle) = lower(h) and id <> pid) then raise exception 'taken'; end if;
    update grit.players set handle = h where id = pid;
  end if;
  if p_avatar is not null then
    if p_avatar !~ '^(horse|camel|eagle|sheep|goat|ox|deer|wolf|fox|leopard|bear|owl)-[0-7]$' then raise exception 'avatar'; end if;
    update grit.players set avatar = p_avatar where id = pid;
  end if;
  return jsonb_build_object('token', p_token) || grit.state(pid);
end $$;

-- The state reports the avatar too.
create or replace function grit.state(pid uuid) returns jsonb language plpgsql stable
as $$
declare
  n int := grit.today();
  w grit.words := grit.word_of(n);
  pl grit.plays;
  pr grit.players;
  last_reveal int;
  can_reveal boolean;
begin
  select * into pl from grit.plays where player_id = pid and day_no = n;
  select * into pr from grit.players where id = pid;
  select max(day_no) into last_reveal from grit.plays where player_id = pid and reveal_pos is not null and day_no < n;
  can_reveal := coalesce(pl.hint, false) and not coalesce(pl.finished, false) and pl.reveal_pos is null
                and (last_reveal is null or n - last_reveal >= 2);
  return jsonb_build_object(
    'no', n,
    'date', grit.day_date(n),
    'next_in', extract(epoch from (date_trunc('day', now() at time zone grit.tz()) + interval '1 day') - (now() at time zone grit.tz()))::int,
    'guesses', coalesce((select jsonb_agg(jsonb_build_object('w', g, 'r', to_jsonb(grit.score(g, w.word))) order by o)
                         from unnest(pl.guesses) with ordinality t(g, o)), '[]'::jsonb),
    'finished', coalesce(pl.finished, false),
    'solved', coalesce(pl.solved, false),
    'points', coalesce(pl.points, 0),
    'hint', case when pl.hint then jsonb_build_object('cat', w.cat, 'era', w.era) end,
    'reveal', case when pl.reveal_pos is not null then jsonb_build_object('pos', pl.reveal_pos, 'ch', substr(w.word, pl.reveal_pos + 1, 1)) end,
    'reveal_available', can_reveal,
    'reveal_next', case when last_reveal is not null and n - last_reveal < 2 then grit.day_date(last_reveal + 2) end,
    'answer', case when pl.finished then jsonb_build_object('w', w.word, 'cat', w.cat, 'info', w.info, 'era', w.era) end,
    'player', jsonb_build_object('nickname', pr.nickname,
                                 'handle', pr.handle,
                                 'google', pr.auth_uid is not null,
                                 'avatar', pr.avatar,
                                 'class', (select c.name from grit.classes c where c.id = pr.class_id),
                                 'school', (select s.name from grit.classes c join grit.schools s on s.id = c.school_id where c.id = pr.class_id)),
    'stats', grit.player_stats(pid),
    'ranks', (select jsonb_agg(jsonb_build_object('lvl', lvl, 'name', name, 'min_points', min_points, 'min_days', min_days, 'descr', descr) order by lvl) from grit.ranks)
  );
end $$;

-- Leaderboard rows carry the avatar.
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
      'pos', pos, 'name', grit.display_name(p), 'xp', xp, 'me', player_id = pid, 'avatar', (p).avatar,
      'class', (select c.name from grit.classes c where c.id = (p).class_id),
      'streak', (st ->> 'streak')::int, 'rank', st ->> 'rank', 'lvl', (st ->> 'lvl')::int
    ) order by pos) filter (where pos <= 50), '[]'::jsonb),
    (array_agg(jsonb_build_object('pos', pos, 'name', grit.display_name(p), 'xp', xp, 'me', true, 'avatar', (p).avatar,
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

revoke all on function public.tu_profile(text, text, text) from public;
grant execute on function public.tu_profile(text, text, text) to anon, authenticated;
