-- Admins: signed-in accounts that may see every player's progress (today's games, streaks).
alter table grit.players add column if not exists is_admin boolean not null default false;
update grit.players set is_admin = true where handle = 'Muaiiiii';

-- The state tells the page whether this player is an admin (to show the admin link).
create or replace function grit.state(pid uuid) returns jsonb language plpgsql stable
as $$
declare
  n int := grit.today();
  w grit.words := grit.word_of(n);
  y grit.words;
  pl grit.plays;
  pr grit.players;
  last_reveal int;
  can_reveal boolean;
begin
  select * into pl from grit.plays where player_id = pid and day_no = n;
  select * into pr from grit.players where id = pid;
  if n > 1 then y := grit.word_of(n - 1); end if;
  select max(day_no) into last_reveal from grit.plays where player_id = pid and reveal_pos is not null and day_no < n;
  can_reveal := coalesce(pl.hint, false) and not coalesce(pl.finished, false) and pl.reveal_pos is null
                and coalesce(cardinality(pl.guesses), 0) >= 3
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
    'hint_after', 2,
    'reveal_after', 3,
    'reveal', case when pl.reveal_pos is not null then jsonb_build_object('pos', pl.reveal_pos, 'ch', substr(w.word, pl.reveal_pos + 1, 1)) end,
    'reveal_available', can_reveal,
    'reveal_next', case when last_reveal is not null and n - last_reveal < 2 then grit.day_date(last_reveal + 2) end,
    -- only a solved game shows today's word; everyone else learns it tomorrow
    'answer', case when pl.solved then jsonb_build_object('w', w.word, 'cat', w.cat, 'info', w.info, 'era', w.era) end,
    'yesterday', case when y.word is not null then jsonb_build_object('no', n - 1, 'w', y.word, 'cat', y.cat, 'info', y.info, 'era', y.era) end,
    'player', jsonb_build_object('nickname', pr.nickname,
                                 'admin', coalesce(pr.is_admin, false),
                                 'handle', pr.handle,
                                 'google', pr.auth_uid is not null,
                                 'avatar', pr.avatar,
                                 'class', (select c.name from grit.classes c where c.id = pr.class_id),
                                 'school', (select s.name from grit.classes c join grit.schools s on s.id = c.school_id where c.id = pr.class_id)),
    'stats', grit.player_stats(pid),
    'ranks', (select jsonb_agg(jsonb_build_object('lvl', lvl, 'name', name, 'min_points', min_points, 'min_days', min_days, 'descr', descr) order by lvl) from grit.ranks)
  );
end $$;


-- Everyone who played in the last 14 days: today's Таасан уу? and Хэн бэ?, streak, points.
create or replace function public.tu_admin_overview(p_token text) returns jsonb
language plpgsql security definer set search_path = grit, public, extensions, pg_temp
as $$
declare
  pid uuid := grit.player_of(p_token);
  n int := grit.today();
  wk_start int := n - (extract(isodow from grit.local_today())::int - 1);
begin
  if not coalesce((select is_admin from grit.players where id = pid), false) then raise exception 'forbidden'; end if;
  return (
    with act as (   -- every day each player did something
      select player_id, day_no, updated_at at_ from grit.plays where day_no > n - 400
      union all select player_id, day_no, updated_at from grit.hb_plays where day_no > n - 400
      union all select player_id, day_no, at from grit.activity where day_no > n - 400
    ),
    recent as (select player_id, max(at_) last_seen from act where day_no >= n - 13 group by player_id),
    days as (select distinct player_id, day_no from act),
    runs as (   -- consecutive days, the run that reaches today or yesterday
      select player_id, max(day_no) b, count(*) len
      from (select player_id, day_no, day_no - row_number() over (partition by player_id order by day_no) grp from days) x
      group by player_id, grp
    ),
    rows as (
      select p.id, grit.display_name(p) name, p.handle, p.nickname, p.auth_uid is not null google, p.is_admin,
        (select c.name from grit.classes c where c.id = p.class_id) class,
        p.created_at, r.last_seen,
        coalesce((select len from runs u where u.player_id = p.id and u.b >= n - 1 order by u.b desc limit 1), 0) streak,
        coalesce((select max(len) from runs u where u.player_id = p.id), 0) best,
        (select count(*) from days d where d.player_id = p.id) days,
        (select jsonb_build_object('g', cardinality(pl.guesses), 'fin', pl.finished, 'ok', pl.solved, 'hint', pl.hint, 'rev', pl.reveal_pos is not null, 'pts', pl.points)
           from grit.plays pl where pl.player_id = p.id and pl.day_no = n) tu,
        (select jsonb_build_object('g', cardinality(h.guesses), 'fin', h.finished, 'ok', h.solved, 'pts', h.points)
           from grit.hb_plays h where h.player_id = p.id and h.day_no = n) hb,
        (select coalesce(sum(x.points), 0) from (
           select points from grit.plays where player_id = p.id and finished and day_no between wk_start and n
           union all select points from grit.activity where player_id = p.id and day_no between wk_start and n) x) week,
        grit.player_stats(p.id) st
      from recent r join grit.players p on p.id = r.player_id
    )
    select jsonb_build_object(
      'no', n, 'date', grit.local_today(),
      'summary', jsonb_build_object(
        'players_14d', (select count(*) from rows),
        'today', (select count(*) from rows where tu is not null or hb is not null),
        'tu_played', (select count(*) from rows where (tu ->> 'g')::int > 0),
        'tu_solved', (select count(*) from rows where (tu ->> 'ok')::boolean),
        'hb_played', (select count(*) from rows where (hb ->> 'g')::int > 0),
        'hb_solved', (select count(*) from rows where (hb ->> 'ok')::boolean),
        'new_today', (select count(*) from grit.players where (created_at at time zone grit.tz())::date = grit.local_today())),
      'rows', coalesce((select jsonb_agg(jsonb_build_object(
          'name', name, 'type', case when class is not null then 'class' when google then 'google' when handle is not null then 'name' else 'guest' end,
          'class', class, 'admin', is_admin, 'last_seen', last_seen, 'streak', streak, 'best', best, 'days', days,
          'tu', tu, 'hb', hb, 'week', week, 'season', (st ->> 'points')::int, 'rank', st ->> 'rank', 'lvl', (st ->> 'lvl')::int)
        order by (tu is not null or hb is not null) desc, last_seen desc) from rows), '[]'::jsonb)
    )
  );
end $$;
revoke all on function public.tu_admin_overview(text) from public;
grant execute on function public.tu_admin_overview(text) to anon, authenticated;
