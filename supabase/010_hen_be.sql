-- Хэн бэ? (Who am I?): a daily game on /culture/. Every day one person from Mongolian
-- history is hidden behind five clues, from hard to easy. Each wrong guess opens the
-- next clue; solving on clue k gives 6 - k points (5 .. 1).
-- The people and their clues live only in the database (seeded separately, not in this
-- repository), and the day's person comes from a shuffled schedule, so nobody can read
-- tomorrow's answer from the site's code.

create table if not exists grit.hb_figures (
  id       int primary key,
  name_mn  text not null,
  name_en  text not null,
  era_mn   text not null,
  era_en   text not null,
  clues_mn text[] not null check (array_length(clues_mn, 1) = 5),
  clues_en text[] not null check (array_length(clues_en, 1) = 5),
  info_mn  text not null,
  info_en  text not null
);
alter table grit.hb_figures enable row level security;
revoke all on grit.hb_figures from public, anon, authenticated;

create table if not exists grit.hb_schedule (
  day_no int primary key,
  fig    int not null references grit.hb_figures
);
alter table grit.hb_schedule enable row level security;
revoke all on grit.hb_schedule from public, anon, authenticated;

create table if not exists grit.hb_plays (
  player_id  uuid not null references grit.players on delete cascade,
  day_no     int not null,
  guesses    int[] not null default '{}',
  finished   boolean not null default false,
  solved     boolean not null default false,
  points     int not null default 0,
  updated_at timestamptz not null default now(),
  primary key (player_id, day_no)
);
alter table grit.hb_plays enable row level security;
revoke all on grit.hb_plays from public, anon, authenticated;

-- Points land in grit.activity, so they count for the leaderboard, ranks and played days.
alter table grit.activity drop constraint if exists activity_kind_check;
alter table grit.activity add constraint activity_kind_check check (kind in ('quiz', 'timeline', 'book', 'whois'));

-- №1 of Хэн бэ? is the day the game opened.
insert into grit.settings values ('hb_start', (grit.today())::text) on conflict (key) do nothing;

-- Fill the schedule two years ahead with whole-list shuffles; re-running only adds missing days.
create or replace function grit.hb_fill() returns void language plpgsql
as $$
declare d int := greatest(coalesce((select max(day_no) from grit.hb_schedule), 0) + 1, grit.today()); r record; last int;
begin
  select fig into last from grit.hb_schedule order by day_no desc limit 1;
  while d <= grit.today() + 730 loop
    for r in select id from grit.hb_figures order by random() loop
      exit when d > grit.today() + 730;
      continue when r.id = last;  -- never the same person two days running
      insert into grit.hb_schedule values (d, r.id) on conflict do nothing;
      last := r.id; d := d + 1;
    end loop;
  end loop;
end $$;
revoke all on function grit.hb_fill() from public, anon, authenticated;

create or replace function grit.hb_of(n int) returns grit.hb_figures language sql stable
as $$ select f.* from grit.hb_figures f join grit.hb_schedule s on s.fig = f.id where s.day_no = n $$;
revoke all on function grit.hb_of(int) from public, anon, authenticated;

create or replace function grit.hb_state(pid uuid) returns jsonb language plpgsql stable
as $$
declare
  n int := grit.today();
  f grit.hb_figures := grit.hb_of(n);
  pl grit.hb_plays;
  shown int;
begin
  if f.id is null then raise exception 'closed'; end if;
  if pid is not null then select * into pl from grit.hb_plays where player_id = pid and day_no = n; end if;
  shown := case when coalesce(pl.finished, false) then 5 else least(5, coalesce(cardinality(pl.guesses), 0) + 1) end;
  return jsonb_build_object(
    'no', n - (select value::int from grit.settings where key = 'hb_start') + 1,
    'next_in', extract(epoch from (date_trunc('day', now() at time zone grit.tz()) + interval '1 day') - (now() at time zone grit.tz()))::int,
    'clues', (select jsonb_agg(jsonb_build_object('mn', f.clues_mn[i], 'en', f.clues_en[i]) order by i) from generate_series(1, shown) i),
    'guesses', coalesce((select jsonb_agg(jsonb_build_object('id', t.gid, 'mn', g.name_mn, 'en', g.name_en) order by o)
                         from unnest(pl.guesses) with ordinality t(gid, o) left join grit.hb_figures g on g.id = t.gid), '[]'::jsonb),
    'finished', coalesce(pl.finished, false),
    'solved', coalesce(pl.solved, false),
    'points', coalesce(pl.points, 0),
    'answer', case when pl.finished then jsonb_build_object('id', f.id, 'mn', f.name_mn, 'en', f.name_en,
                'era_mn', f.era_mn, 'era_en', f.era_en, 'info_mn', f.info_mn, 'info_en', f.info_en) end
  );
end $$;
revoke all on function grit.hb_state(uuid) from public, anon, authenticated;

-- Everyone may read the list of people to choose from (not which day is whose).
create or replace function public.hb_names() returns jsonb
language sql stable security definer set search_path = grit, public, pg_temp
as $$ select coalesce(jsonb_agg(jsonb_build_object('id', id, 'mn', name_mn, 'en', name_en) order by name_mn), '[]'::jsonb) from grit.hb_figures $$;

-- Today's state; without a session it simply shows the first clue.
create or replace function public.hb_state(p_token text default null) returns jsonb
language plpgsql security definer set search_path = grit, public, extensions, pg_temp
as $$
declare pid uuid;
begin
  begin pid := grit.player_of(p_token); exception when others then pid := null; end;
  return grit.hb_state(pid);
end $$;

create or replace function public.hb_guess(p_token text, p_id int) returns jsonb
language plpgsql security definer set search_path = grit, public, extensions, pg_temp
as $$
declare
  pid uuid := grit.player_of(p_token);
  n int := grit.today();
  f grit.hb_figures := grit.hb_of(n);
  pl grit.hb_plays;
  k int;
begin
  if f.id is null then raise exception 'closed'; end if;
  -- p_id 0 means "I don't know": it uses up a try and opens the next clue
  if p_id <> 0 and not exists (select 1 from grit.hb_figures where id = p_id) then raise exception 'unknown'; end if;
  insert into grit.hb_plays (player_id, day_no) values (pid, n) on conflict do nothing;
  select * into pl from grit.hb_plays where player_id = pid and day_no = n for update;
  if pl.finished then raise exception 'done'; end if;
  if p_id <> 0 and p_id = any (pl.guesses) then raise exception 'repeat'; end if;
  pl.guesses := pl.guesses || p_id;
  k := cardinality(pl.guesses);
  if p_id = f.id then
    pl.finished := true; pl.solved := true; pl.points := 6 - k;
  elsif k >= 5 then
    pl.finished := true;
  end if;
  update grit.hb_plays set guesses = pl.guesses, finished = pl.finished, solved = pl.solved,
         points = pl.points, updated_at = now()
  where player_id = pid and day_no = n;
  if pl.finished then
    insert into grit.activity (player_id, day_no, kind, ref, points) values (pid, n, 'whois', 'hb' || n, pl.points);
  end if;
  return grit.hb_state(pid) || jsonb_build_object('stats', grit.player_stats(pid));
end $$;

-- A guest's Хэн бэ? games move into the account on sign-in, like the word game.
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
  insert into grit.hb_plays (player_id, day_no, guesses, finished, solved, points, updated_at)
    select dst, day_no, guesses, finished, solved, points, updated_at
    from grit.hb_plays where player_id = src
    on conflict (player_id, day_no) do nothing;
  -- a day's Хэн бэ? points count once, even if both the guest and the account played it
  insert into grit.activity (player_id, day_no, kind, ref, points, at)
    select dst, a.day_no, a.kind, a.ref, a.points, a.at from grit.activity a
    where a.player_id = src
      and not (a.kind = 'whois' and exists (select 1 from grit.activity b where b.player_id = dst and b.kind = 'whois' and b.day_no = a.day_no))
    on conflict do nothing;
  delete from grit.players where id = src;
end $$;

revoke all on function public.hb_names(), public.hb_state(text), public.hb_guess(text, int) from public;
grant execute on function public.hb_names(), public.hb_state(text), public.hb_guess(text, int) to anon, authenticated;
