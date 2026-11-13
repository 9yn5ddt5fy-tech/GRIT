-- ============================================================================
-- GRIT Culture · "Таасан уу?" server (Supabase / PostgreSQL 15+)
--
-- Run once in the Supabase SQL editor (or via the Management API), then run
-- 002_words.sql. Everything lives in the private schema "grit"; the browser can
-- only call the public.tu_* functions below with the project's anon/publishable
-- key. Tables are never exposed directly, so the answers stay on the server.
--
-- Scoring (one season = one year):
--   * a solved day gives 7 - tries points (1st try 6 ... 6th try 1),
--     minus 1 for the hint and 1 for revealing a letter, never below 1;
--     an unsolved day gives 0 but still counts as a day played
--   * a week (Mon–Sun) with 5 or more days played gives +3
--   * a rank needs BOTH enough points AND enough days played, so no single
--     game, shared answer or lucky streak can jump someone to the top
--   * a class holds a rank when at least 80% of its students hold it
--     (classes need 5+ students); the first class in a school to reach each
--     rank is recorded with the date, for the school's rewards
-- ============================================================================

create extension if not exists pgcrypto with schema extensions;
create schema if not exists grit;
revoke all on schema grit from public;

-- ---------------------------------------------------------------- tables
create table if not exists grit.settings (key text primary key, value text not null);
insert into grit.settings values
  ('epoch', '2026-11-01'),           -- puzzle №1
  ('tz', 'Asia/Ulaanbaatar')         -- the day changes at midnight Mongolian time
on conflict (key) do nothing;

create table if not exists grit.words (
  idx  int primary key,              -- word for puzzle n is idx (n-1) mod count
  word text not null check (char_length(word) = 5),
  cat  text not null,
  info text not null,
  era  text not null
);

create table if not exists grit.seasons (
  id int primary key,
  name text not null,
  starts_on date not null,
  ends_on date not null
);
insert into grit.seasons values (1, '2026–2027', '2026-11-01', '2027-10-31')
on conflict (id) do nothing;

create table if not exists grit.ranks (
  lvl int primary key,
  name text not null,
  min_points int not null,
  min_days int not null,
  descr text not null
);
insert into grit.ranks values
  (0, 'Цэрэг',          0,    0, 'Аравтын нэг гишүүн. Их Монгол Улсын эр хүн бүр цэргийн алба хаах үүрэгтэй байжээ.'),
  (1, 'Аравтын ноён',  60,   15, 'Арван цэргийг удирдагч. Аравт бол цэргийн хамгийн жижиг, хамгийн нягт нэгж.'),
  (2, 'Зуутын ноён',  250,   60, 'Арван аравтыг буюу зуун цэргийг удирдана.'),
  (3, 'Мянгатын ноён', 600, 140, 'Мянган цэрэг. 1206 онд Чингис хаан улсаа 95 мянгатад хувааж, итгэлт нөхдөө мянгатын ноён болгожээ.'),
  (4, 'Түмэний ноён', 1000, 220, 'Арван мянган цэргийг удирдах хамгийн өндөр цэргийн тушаал.'),
  (5, 'Хаан',         1300, 300, 'Бүх түмнийг захирагч. Бараг жилийн турш өдөр бүр тоглосон хүн л хүрнэ.')
on conflict (lvl) do update set name = excluded.name, min_points = excluded.min_points,
  min_days = excluded.min_days, descr = excluded.descr;

create table if not exists grit.schools (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists grit.classes (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references grit.schools on delete cascade,
  name text not null,
  code text not null unique,                 -- given to students
  teacher_hash text not null,                -- teacher code, hashed
  created_at timestamptz not null default now(),
  unique (school_id, name)
);

create table if not exists grit.players (
  id uuid primary key default gen_random_uuid(),
  class_id uuid references grit.classes on delete set null,
  nickname text,
  pin_hash text,
  failed int not null default 0,
  locked_until timestamptz,
  created_at timestamptz not null default now()
);
create unique index if not exists players_nick on grit.players (class_id, lower(nickname))
  where class_id is not null;

create table if not exists grit.sessions (
  token_hash text primary key,
  player_id uuid not null references grit.players on delete cascade,
  created_at timestamptz not null default now(),
  last_seen timestamptz not null default now()
);

create table if not exists grit.plays (
  player_id uuid not null references grit.players on delete cascade,
  day_no int not null,
  guesses text[] not null default '{}',
  finished boolean not null default false,
  solved boolean not null default false,
  hint boolean not null default false,
  reveal_pos int,
  points int not null default 0,
  updated_at timestamptz not null default now(),
  primary key (player_id, day_no)
);

create table if not exists grit.milestones (
  class_id uuid not null references grit.classes on delete cascade,
  lvl int not null,
  reached_on date not null,
  primary key (class_id, lvl)
);

alter table grit.settings enable row level security;
alter table grit.words enable row level security;
alter table grit.seasons enable row level security;
alter table grit.ranks enable row level security;
alter table grit.schools enable row level security;
alter table grit.classes enable row level security;
alter table grit.players enable row level security;
alter table grit.sessions enable row level security;
alter table grit.plays enable row level security;
alter table grit.milestones enable row level security;

-- ---------------------------------------------------------------- helpers
create or replace function grit.tz() returns text language sql stable
as $$ select value from grit.settings where key = 'tz' $$;

create or replace function grit.local_today() returns date language sql stable
as $$ select (now() at time zone grit.tz())::date $$;

create or replace function grit.today() returns int language sql stable
as $$ select (grit.local_today() - (select value::date from grit.settings where key = 'epoch')) + 1 $$;

create or replace function grit.day_date(n int) returns date language sql stable
as $$ select (select value::date from grit.settings where key = 'epoch') + n - 1 $$;

create or replace function grit.word_of(n int) returns grit.words language sql stable
as $$
  select w.* from grit.words w
  where w.idx = (((n - 1) % (select count(*) from grit.words)) + (select count(*) from grit.words)) % (select count(*) from grit.words)
$$;

create or replace function grit.season() returns grit.seasons language sql stable
as $$
  select s.* from grit.seasons s
  order by (grit.local_today() between s.starts_on and s.ends_on) desc, s.starts_on desc
  limit 1
$$;

-- Same rules as the game: exact letters first, then letters elsewhere,
-- each letter of the answer used at most once.
create or replace function grit.score(g text, a text) returns text[] language plpgsql immutable
as $$
declare
  ga text[] := regexp_split_to_array(g, '');
  aa text[] := regexp_split_to_array(a, '');
  res text[] := array_fill('absent'::text, array[5]);
  lft jsonb := '{}';
  i int;
begin
  for i in 1..5 loop
    if ga[i] = aa[i] then res[i] := 'correct';
    else lft := jsonb_set(lft, array[aa[i]], to_jsonb(coalesce((lft ->> aa[i])::int, 0) + 1));
    end if;
  end loop;
  for i in 1..5 loop
    if res[i] <> 'correct' and coalesce((lft ->> ga[i])::int, 0) > 0 then
      res[i] := 'present';
      lft := jsonb_set(lft, array[ga[i]], to_jsonb((lft ->> ga[i])::int - 1));
    end if;
  end loop;
  return res;
end $$;

create or replace function grit.day_points(tries int, solved boolean, hint boolean, revealed boolean)
returns int language sql immutable
as $$ select case when solved then greatest(1, 7 - tries - hint::int - revealed::int) else 0 end $$;

create or replace function grit.new_token() returns text language sql volatile
as $$ select encode(extensions.gen_random_bytes(24), 'hex') $$;

create or replace function grit.hash_token(t text) returns text language sql immutable
as $$ select encode(extensions.digest(t, 'sha256'), 'hex') $$;

create or replace function grit.rand_code(n int) returns text language sql volatile
as $$
  select string_agg(substr('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 1 + (get_byte(b, i) % 32), 1), '')
  from (select extensions.gen_random_bytes(n) b) x, generate_series(0, n - 1) i
$$;

create or replace function grit.player_of(p_token text) returns uuid language plpgsql
as $$
declare pid uuid;
begin
  update grit.sessions set last_seen = now()
  where token_hash = grit.hash_token(coalesce(p_token, ''))
  returning player_id into pid;
  if pid is null then raise exception 'session'; end if;
  return pid;
end $$;

-- Season totals for one player.
create or replace function grit.player_stats(pid uuid) returns jsonb language sql stable
as $$
  with s as (select * from grit.season()),
  p as (
    select pl.day_no, pl.solved, pl.points, grit.day_date(pl.day_no) d
    from grit.plays pl, s
    where pl.player_id = pid and pl.finished and grit.day_date(pl.day_no) between s.starts_on and s.ends_on
  ),
  wk as (select count(*) filter (where c >= 5) full_weeks from (select date_trunc('week', d) w, count(*) c from p group by 1) x),
  runs as (
    select min(day_no) a, max(day_no) b, count(*) len
    from (select day_no, day_no - row_number() over (order by day_no) grp from p where solved) x
    group by grp
  ),
  tot as (
    select coalesce(sum(points), 0)::int + 3 * (select full_weeks from wk)::int points,
           count(*)::int days, count(*) filter (where solved)::int wins
    from p
  ),
  lv as (
    select coalesce(max(r.lvl), 0) lvl from grit.ranks r, tot
    where r.min_points <= tot.points and r.min_days <= tot.days
  )
  select jsonb_build_object(
    'points', tot.points, 'days', tot.days, 'played', tot.days, 'wins', tot.wins,
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

-- Class standing: average points over ALL students (non-players count as 0),
-- class rank = highest rank held by at least 80% of the class.
create or replace function grit.class_stats(cid uuid) returns jsonb language sql stable
as $$
  with m as (
    select p.id, p.nickname, grit.player_stats(p.id) st,
           (select max(day_no) from grit.plays x where x.player_id = p.id and x.finished) last_day
    from grit.players p where p.class_id = cid
  ),
  agg as (
    select count(*)::int size,
           coalesce(round(avg((st ->> 'points')::numeric)), 0)::int avg_points,
           count(*) filter (where last_day >= grit.today() - extract(isodow from grit.local_today())::int + 1)::int active_week
    from m
  ),
  lv as (
    select coalesce(max(r.lvl), 0) lvl
    from grit.ranks r, agg
    where agg.size >= 5
      and (select count(*) from m where (m.st ->> 'lvl')::int >= r.lvl) >= ceil(0.8 * agg.size)
  )
  select jsonb_build_object(
    'id', c.id, 'name', c.name, 'school', s.name,
    'size', agg.size, 'avg_points', agg.avg_points,
    'active_week', agg.active_week,
    'active_week_pct', case when agg.size > 0 then round(100.0 * agg.active_week / agg.size) else 0 end,
    'lvl', lv.lvl, 'rank', (select name from grit.ranks where lvl = lv.lvl),
    'milestones', coalesce((select jsonb_agg(jsonb_build_object('lvl', ms.lvl, 'reached_on', ms.reached_on) order by ms.lvl)
                            from grit.milestones ms where ms.class_id = c.id), '[]'::jsonb)
  )
  from grit.classes c join grit.schools s on s.id = c.school_id, agg, lv
  where c.id = cid
$$;

create or replace function grit.record_milestones(cid uuid) returns void language plpgsql
as $$
declare l int;
begin
  if cid is null then return; end if;
  l := (grit.class_stats(cid) ->> 'lvl')::int;
  insert into grit.milestones (class_id, lvl, reached_on)
  select cid, g, grit.local_today() from generate_series(1, l) g
  on conflict do nothing;
end $$;

-- Everything the game needs to draw itself.
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
                                 'class', (select c.name from grit.classes c where c.id = pr.class_id),
                                 'school', (select s.name from grit.classes c join grit.schools s on s.id = c.school_id where c.id = pr.class_id)),
    'stats', grit.player_stats(pid),
    'ranks', (select jsonb_agg(jsonb_build_object('lvl', lvl, 'name', name, 'min_points', min_points, 'min_days', min_days, 'descr', descr) order by lvl) from grit.ranks)
  );
end $$;

-- ---------------------------------------------------------------- public API
-- Start as a guest: no name needed. Returns a session token to keep.
create or replace function public.tu_start() returns jsonb
language plpgsql security definer set search_path = grit, public, extensions, pg_temp
as $$
declare pid uuid; tok text := grit.new_token();
begin
  insert into grit.players default values returning id into pid;
  insert into grit.sessions (token_hash, player_id) values (grit.hash_token(tok), pid);
  return jsonb_build_object('token', tok) || grit.state(pid);
end $$;

create or replace function public.tu_state(p_token text) returns jsonb
language plpgsql security definer set search_path = grit, public, extensions, pg_temp
as $$ begin return grit.state(grit.player_of(p_token)); end $$;

create or replace function public.tu_guess(p_token text, p_word text) returns jsonb
language plpgsql security definer set search_path = grit, public, extensions, pg_temp
as $$
declare
  pid uuid := grit.player_of(p_token);
  n int := grit.today();
  w grit.words := grit.word_of(n);
  g text := upper(trim(coalesce(p_word, '')));
  pl grit.plays;
  before_lvl int;
  after_lvl int;
begin
  if char_length(g) <> 5 or g !~ '^[А-ЯЁӨҮ]+$' then raise exception 'word'; end if;
  insert into grit.plays (player_id, day_no) values (pid, n) on conflict do nothing;
  select * into pl from grit.plays where player_id = pid and day_no = n for update;
  if pl.finished or coalesce(array_length(pl.guesses, 1), 0) >= 6 then raise exception 'over'; end if;
  before_lvl := (grit.player_stats(pid) ->> 'lvl')::int;
  pl.guesses := pl.guesses || g;
  pl.solved := g = w.word;
  pl.finished := pl.solved or array_length(pl.guesses, 1) >= 6;
  pl.points := case when pl.finished then grit.day_points(array_length(pl.guesses, 1), pl.solved, pl.hint, pl.reveal_pos is not null) else 0 end;
  update grit.plays set guesses = pl.guesses, solved = pl.solved, finished = pl.finished,
         points = pl.points, updated_at = now()
  where player_id = pid and day_no = n;
  if pl.finished then
    perform grit.record_milestones((select class_id from grit.players where id = pid));
  end if;
  after_lvl := (grit.player_stats(pid) ->> 'lvl')::int;
  return grit.state(pid) || jsonb_build_object('rank_up', after_lvl > before_lvl);
end $$;

create or replace function public.tu_hint(p_token text) returns jsonb
language plpgsql security definer set search_path = grit, public, extensions, pg_temp
as $$
declare pid uuid := grit.player_of(p_token); n int := grit.today();
begin
  insert into grit.plays (player_id, day_no, hint) values (pid, n, true)
  on conflict (player_id, day_no) do update set hint = true, updated_at = now() where not grit.plays.finished;
  return grit.state(pid);
end $$;

create or replace function public.tu_reveal(p_token text, p_pos int) returns jsonb
language plpgsql security definer set search_path = grit, public, extensions, pg_temp
as $$
declare pid uuid := grit.player_of(p_token); st jsonb;
begin
  st := grit.state(pid);
  if p_pos is null or p_pos < 0 or p_pos > 4 then raise exception 'pos'; end if;
  if not (st ->> 'reveal_available')::boolean then raise exception 'reveal'; end if;
  update grit.plays set reveal_pos = p_pos, updated_at = now()
  where player_id = pid and day_no = grit.today();
  return grit.state(pid);
end $$;

-- Join a class (first time) or sign in to it again on another device.
create or replace function public.tu_join(p_token text, p_code text, p_nickname text, p_pin text) returns jsonb
language plpgsql security definer set search_path = grit, public, extensions, pg_temp
as $$
declare
  pid uuid := grit.player_of(p_token);
  cls grit.classes;
  nick text := regexp_replace(trim(coalesce(p_nickname, '')), '\s+', ' ', 'g');
  ex grit.players;
  me grit.players;
  tok text;
begin
  select * into cls from grit.classes where code = upper(trim(coalesce(p_code, '')));
  if cls.id is null then raise exception 'code'; end if;
  if nick !~ '^[A-Za-zА-Яа-яЁёӨөҮү0-9 ._-]{2,20}$' then raise exception 'nickname'; end if;
  if coalesce(p_pin, '') !~ '^[0-9]{4}$' then raise exception 'pin_format'; end if;

  select * into ex from grit.players where class_id = cls.id and lower(nickname) = lower(nick);
  if ex.id is not null then
    -- Signing in to an existing student.
    if ex.locked_until is not null and ex.locked_until > now() then raise exception 'locked'; end if;
    if ex.pin_hash <> extensions.crypt(p_pin, ex.pin_hash) then
      -- Return instead of raising, so the failed-attempt count is kept.
      update grit.players set failed = failed + 1,
             locked_until = case when failed + 1 >= 10 then now() + interval '15 minutes' end
      where id = ex.id;
      return jsonb_build_object('error', 'pin');
    end if;
    update grit.players set failed = 0, locked_until = null where id = ex.id;
    tok := grit.new_token();
    insert into grit.sessions (token_hash, player_id) values (grit.hash_token(tok), ex.id);
    delete from grit.sessions where token_hash = grit.hash_token(p_token);
    return jsonb_build_object('token', tok) || grit.state(ex.id);
  end if;

  select * into me from grit.players where id = pid;
  if me.class_id is not null then raise exception 'already'; end if;
  update grit.players set class_id = cls.id, nickname = nick,
         pin_hash = extensions.crypt(p_pin, extensions.gen_salt('bf'))
  where id = pid;
  perform grit.record_milestones(cls.id);
  return jsonb_build_object('token', p_token) || grit.state(pid);
end $$;

-- Leaderboards. Class members are only visible to their own class.
create or replace function public.tu_board(p_token text) returns jsonb
language plpgsql security definer set search_path = grit, public, extensions, pg_temp
as $$
declare pid uuid := grit.player_of(p_token); cid uuid; sid uuid;
begin
  select class_id into cid from grit.players where id = pid;
  select school_id into sid from grit.classes where id = cid;
  return jsonb_build_object(
    'me', grit.player_stats(pid),
    'class', case when cid is not null then grit.class_stats(cid) end,
    'members', case when cid is not null then (
       select jsonb_agg(x order by (x ->> 'points')::int desc, x ->> 'nickname')
       from (select jsonb_build_object('nickname', p.nickname, 'me', p.id = pid) || grit.player_stats(p.id) x
             from grit.players p where p.class_id = cid) t) end,
    'school', case when sid is not null then (
       select jsonb_agg(x order by (x ->> 'lvl')::int desc, (x ->> 'avg_points')::int desc)
       from (select grit.class_stats(c.id) || jsonb_build_object('me', c.id = cid) x
             from grit.classes c where c.school_id = sid) t) end,
    'top', (select coalesce(jsonb_agg(x order by (x ->> 'lvl')::int desc, (x ->> 'avg_points')::int desc), '[]'::jsonb)
            from (select grit.class_stats(c.id) x from grit.classes c) t)
  );
end $$;

-- ---------------------------------------------------------------- teachers
create or replace function grit.teacher_class(p_code text, p_teacher text) returns grit.classes language plpgsql
as $$
declare cls grit.classes;
begin
  select * into cls from grit.classes where code = upper(trim(coalesce(p_code, '')));
  if cls.id is null or cls.teacher_hash <> extensions.crypt(upper(trim(coalesce(p_teacher, ''))), cls.teacher_hash) then
    raise exception 'teacher';
  end if;
  return cls;
end $$;

create or replace function public.tu_teacher(p_code text, p_teacher text) returns jsonb
language plpgsql security definer set search_path = grit, public, extensions, pg_temp
as $$
declare cls grit.classes := grit.teacher_class(p_code, p_teacher);
begin
  return jsonb_build_object(
    'class', grit.class_stats(cls.id) || jsonb_build_object('code', cls.code),
    'today', grit.today(),
    'members', (select coalesce(jsonb_agg(x order by x ->> 'nickname'), '[]'::jsonb)
                from (select jsonb_build_object('id', p.id, 'nickname', p.nickname,
                        'last_day', (select max(day_no) from grit.plays pl where pl.player_id = p.id and pl.finished),
                        'locked', p.locked_until is not null and p.locked_until > now()) || grit.player_stats(p.id) x
                      from grit.players p where p.class_id = cls.id) t),
    'school', (select jsonb_agg(grit.class_stats(c.id) order by c.name) from grit.classes c where c.school_id = cls.school_id)
  );
end $$;

create or replace function public.tu_teacher_remove(p_code text, p_teacher text, p_player uuid) returns jsonb
language plpgsql security definer set search_path = grit, public, extensions, pg_temp
as $$
declare cls grit.classes := grit.teacher_class(p_code, p_teacher);
begin
  update grit.players set class_id = null, nickname = null, pin_hash = null
  where id = p_player and class_id = cls.id;
  return public.tu_teacher(p_code, p_teacher);
end $$;

create or replace function public.tu_teacher_pin(p_code text, p_teacher text, p_player uuid, p_pin text) returns jsonb
language plpgsql security definer set search_path = grit, public, extensions, pg_temp
as $$
declare cls grit.classes := grit.teacher_class(p_code, p_teacher);
begin
  if coalesce(p_pin, '') !~ '^[0-9]{4}$' then raise exception 'pin_format'; end if;
  update grit.players set pin_hash = extensions.crypt(p_pin, extensions.gen_salt('bf')), failed = 0, locked_until = null
  where id = p_player and class_id = cls.id;
  return public.tu_teacher(p_code, p_teacher);
end $$;

-- ---------------------------------------------------------------- GRIT admins
-- Set the admin key once from the SQL editor:  select grit.set_admin_key('…');
create or replace function grit.set_admin_key(k text) returns void language sql
as $$
  insert into grit.settings values ('admin_hash', extensions.crypt(k, extensions.gen_salt('bf')))
  on conflict (key) do update set value = excluded.value
$$;

create or replace function grit.check_admin(k text) returns void language plpgsql
as $$
declare h text := (select value from grit.settings where key = 'admin_hash');
begin
  if h is null or h <> extensions.crypt(coalesce(k, ''), h) then raise exception 'admin'; end if;
end $$;

create or replace function public.tu_admin_classes(p_key text) returns jsonb
language plpgsql security definer set search_path = grit, public, extensions, pg_temp
as $$
begin
  perform grit.check_admin(p_key);
  return (select coalesce(jsonb_agg(grit.class_stats(c.id) || jsonb_build_object('code', c.code) order by s.name, c.name), '[]'::jsonb)
          from grit.classes c join grit.schools s on s.id = c.school_id);
end $$;

-- Returns the student code and the teacher code. The teacher code is shown
-- only here, once; it is stored hashed.
create or replace function public.tu_admin_create_class(p_key text, p_school text, p_class text) returns jsonb
language plpgsql security definer set search_path = grit, public, extensions, pg_temp
as $$
declare sid uuid; v_code text; tcode text := grit.rand_code(8);
begin
  perform grit.check_admin(p_key);
  if char_length(trim(coalesce(p_school, ''))) < 2 or char_length(trim(coalesce(p_class, ''))) < 1 then raise exception 'name'; end if;
  insert into grit.schools (name) values (trim(p_school)) on conflict (name) do nothing;
  select id into sid from grit.schools where name = trim(p_school);
  if exists (select 1 from grit.classes c where c.school_id = sid and c.name = trim(p_class)) then raise exception 'exists'; end if;
  loop
    v_code := grit.rand_code(6);
    exit when not exists (select 1 from grit.classes c where c.code = v_code);
  end loop;
  insert into grit.classes (school_id, name, code, teacher_hash)
  values (sid, trim(p_class), v_code, extensions.crypt(tcode, extensions.gen_salt('bf')));
  return jsonb_build_object('school', trim(p_school), 'class', trim(p_class), 'code', v_code, 'teacher_code', tcode);
end $$;

create or replace function public.tu_admin_teacher_code(p_key text, p_code text) returns jsonb
language plpgsql security definer set search_path = grit, public, extensions, pg_temp
as $$
declare tcode text := grit.rand_code(8);
begin
  perform grit.check_admin(p_key);
  update grit.classes set teacher_hash = extensions.crypt(tcode, extensions.gen_salt('bf')) where code = upper(trim(p_code));
  if not found then raise exception 'code'; end if;
  return jsonb_build_object('code', upper(trim(p_code)), 'teacher_code', tcode);
end $$;

-- ---------------------------------------------------------------- access
revoke all on all tables in schema grit from public;
revoke all on all functions in schema grit from public;
do $$
declare f text;
begin
  foreach f in array array[
    'tu_start()', 'tu_state(text)', 'tu_guess(text,text)', 'tu_hint(text)', 'tu_reveal(text,int)',
    'tu_join(text,text,text,text)', 'tu_board(text)',
    'tu_teacher(text,text)', 'tu_teacher_remove(text,text,uuid)', 'tu_teacher_pin(text,text,uuid,text)',
    'tu_admin_classes(text)', 'tu_admin_create_class(text,text,text)', 'tu_admin_teacher_code(text,text)'
  ] loop
    execute format('revoke all on function public.%s from public', f);
    execute format('grant execute on function public.%s to anon, authenticated', f);
  end loop;
end $$;
