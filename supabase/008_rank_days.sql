-- Ranks: a "played day" is any day with points from any GRIT Culture game (the word game,
-- the quiz, the timeline or a picture book), and the first rank needs 10 days instead of 15.

update grit.ranks set min_days = 10 where lvl = 1;

create or replace function grit.player_stats(pid uuid) returns jsonb language sql stable
as $$
  with s as (select * from grit.season()),
  p as (
    select pl.day_no, pl.solved, pl.points, grit.day_date(pl.day_no) d
    from grit.plays pl, s
    where pl.player_id = pid and pl.finished and grit.day_date(pl.day_no) between s.starts_on and s.ends_on
  ),
  a as (
    select a.day_no, a.points from grit.activity a, s
    where a.player_id = pid and grit.day_date(a.day_no) between s.starts_on and s.ends_on
  ),
  ex as (select coalesce(sum(points), 0)::int pts from a),
  active as (
    select count(*)::int days from (select day_no from p union select day_no from a where points > 0) d
  ),
  wk as (select count(*) filter (where c >= 5) full_weeks from (select date_trunc('week', d) w, count(*) c from p group by 1) x),
  runs as (
    select min(day_no) a, max(day_no) b, count(*) len
    from (select day_no, day_no - row_number() over (order by day_no) grp from p where solved) x
    group by grp
  ),
  tot as (
    select coalesce(sum(points), 0)::int + 3 * (select full_weeks from wk)::int + (select pts from ex) points,
           (select days from active) days, count(*)::int played, count(*) filter (where solved)::int wins
    from p
  ),
  lv as (
    select coalesce(max(r.lvl), 0) lvl from grit.ranks r, tot
    where r.min_points <= tot.points and r.min_days <= tot.days
  )
  select jsonb_build_object(
    'points', tot.points, 'days', tot.days, 'played', tot.played, 'wins', tot.wins,
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
