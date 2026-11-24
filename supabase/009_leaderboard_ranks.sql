-- The leaderboard also returns the rank ladder and, for a signed-in player, their own totals,
-- so the Culture page can show the ranks beside the board.

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
    'my_name', (select grit.display_name(p) from grit.players p where p.id = pid),
    'my_stats', case when pid is not null then grit.player_stats(pid) - 'season' end,
    'ranks', (select jsonb_agg(jsonb_build_object('lvl', lvl, 'name', name, 'min_points', min_points, 'min_days', min_days) order by lvl) from grit.ranks)
  );
end $$;

