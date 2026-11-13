-- GRIT Culture · Таасан уу? — бүх тохиргоо нэг файлд (001 + 002). Supabase SQL Editor дээр бүхэлд нь хуулж Run дарна.

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

-- Таасан уу? word list. Puzzle n uses idx (n-1) mod count, so append new words at the end.
-- Re-running this file replaces the whole list.
delete from grit.words;
insert into grit.words (idx, word, cat, info, era) values
  (0, 'ӨРТӨӨ', 'харилцааны систем', 'Их Монгол Улсын шуудан, харилцааны сүлжээ. Элч нар өртөө бүрт морио сольж, мэдээ, тушаалыг эзэнт гүрний нэг захаас нөгөө зах хүртэл маш хурдан хүргэдэг байв. Өгөдэй хааны үед өргөн хэмжээнд зохион байгуулагдсан.', 'XIII зуун · Их Монгол Улс'),
  (1, 'ЭЛЧИН', 'албан тушаал', 'Хааны зарлиг, захидлыг бусад улс, нутагт хүргэдэг төлөөлөгч. Их Монгол Улсын элч нар хаанаас олгосон алт, мөнгө, модон гэрэгэ (пайз) барьж явдаг бөгөөд гэрэгэтэй хүн өртөөгөөр унаа, хүнс авах эрхтэй байв. Өнөөдрийн “элчин сайд” гэдэг үг үүнээс улбаатай.', 'XIII–XIV зуун · Их Монгол Улс, Юань'),
  (2, 'ТАМГА', 'эрх мэдлийн тэмдэг', 'Хаан, ноёд, албан байгууллагын эрх мэдэл, баталгааны тэмдэг. Гүюг хааны тамгатай захидал 1246 онд Ромын Пап ламд хүрч байсан нь өнөөг хүртэл хадгалагдаж буй.', 'XIII зуун · Их Монгол Улс'),
  (3, 'ХҮРЭЭ', 'газрын нэр', 'Улаанбаатарын өмнөх нэр. 1639 онд Өндөр гэгээн Занабазарт зориулан байгуулсан нүүдлийн өргөөнөөс эхтэй бөгөөд олон удаа нүүсний эцэст одоогийн байрандаа суурьшсан.', 'XVII–XX зуун'),
  (4, 'ЗАСАГ', 'хууль, засаглал', 'Чингис хааны “Их засаг” бол Их Монгол Улсын хууль цааз байв. Хожим Манжийн үед хошууг захирах ноёныг “засаг ноён” гэж нэрлэдэг болсон.', 'XIII зуун ба түүнээс хойш'),
  (5, 'ХАТАН', 'цол', 'Мандухай сэцэн хатан XV зууны сүүлээр бутарсан монголчуудыг дахин нэгтгэж, Даян хааныг хаан ширээнд суулгахад гол үүрэг гүйцэтгэсэн.', 'XV зуун · Хойд Юань'),
  (6, 'ХАГАН', 'цол', 'Нүүдэлчдийн их гүрний дээд захирагчийн цол. Нирун, Түрэг, Уйгур, Монголын эзэнт гүрнүүдэд хэрэглэгдэж ирсэн. “Хаан” гэдэг үг үүнтэй холбоотой.', 'V–XIV зуун'),
  (7, 'БИЧИГ', 'соёлын өв', 'Монгол бичиг уйгур бичгээс улбаатай бөгөөд Чингис хааны үед төрийн бичиг болсон. Дээрээс доош босоо бичигддэгээрээ онцлог. Өвөр Монголд одоо ч өдөр тутам хэрэглэдэг.', 'XIII зуунаас өнөөг хүртэл'),
  (8, 'ДОМОГ', 'аман зохиол', 'Газар ус, уул нуурын үүслийн тухай ам дамжсан түүх. Жишээ нь Тайхар чулууны домогт Бөх Билэгт баатар аварга могойг дарахаар энэ чулууг шидсэн гэдэг.', 'Аман уламжлал'),
  (9, 'ОРДОН', 'барилга', 'Хаадын суудаг, төрийн ёслол үйлддэг газар. Богд хааны ордон нь Монголын сүүлчийн хаан VIII Богд Жавзандамбын өвлийн ордон байсан бөгөөд одоо музей болжээ.', 'XX зууны эх · Богд хаант Монгол Улс'),
  (10, 'АЙМАГ', 'засаг захиргаа', 'Монгол Улсын засаг захиргааны том нэгж. Өнөөдөр 21 аймаг байдаг бөгөөд аймаг бүр сумдад хуваагддаг.', 'Орчин үе'),
  (11, 'ТҮМЭН', 'цэргийн нэгж', 'Чингис хааны цэргийн зохион байгуулалтын хамгийн том нэгж буюу 10,000 цэрэг. Аравт, зуут, мянгат, түмэн гэсэн аравтын тогтолцоо нь цэргийг маш сайн зохион байгуулалттай болгосон.', 'XIII зуун · Их Монгол Улс'),
  (12, 'ХУРАЛ', 'төрийн чуулган', 'Их хуралдай бол хаан сонгох, улсын чухал хэргийг шийддэг чуулган. 1206 онд Онон голын эх дэх их хуралдайгаар Тэмүжинийг Чингис хаан хэмээн өргөмжилсөн.', '1206 он · Их Монгол Улс'),
  (13, 'ХҮЛЭГ', 'түүхэн хүмүүс', 'Чингис хааны “дөрвөн хүлэг” баатар бол Боорчи, Мухулай, Борохул, Чулуун. Тэд хааны хамгийн итгэлтэй жанжид байжээ.', 'XIII зуун · Их Монгол Улс'),
  (14, 'ХҮННҮ', 'төр улс', 'Монголын нутагт байгуулагдсан анхны нүүдэлчдийн төр. МЭӨ 209 онд Модун шаньюй Хүннүгийн хүчирхэг гүрнийг байгуулжээ.', 'МЭӨ III зуун – МЭ I зуун'),
  (15, 'ЧУЛУУ', 'дурсгал', 'Буган чулуу бол хүрэл ба төмөр зэвсгийн үеийн хөшөө. Нисэж буй мэт буга сийлсэн эдгээр хөшөө Монголын нутагт олон зуугаар олддог.', 'Хүрэл, төмөр зэвсгийн үе'),
  (16, 'УЙГУР', 'төр улс', 'Уйгурын хаант улс 744–840 онд Монголын нутагт оршиж байв. Нийслэл нь Орхоны хөндий дэх Хар балгас (Орду-Балык) байсан бөгөөд монгол бичиг уйгур бичгээс гаралтай.', 'VIII–IX зуун'),
  (17, 'МОРИН', 'хөгжим', 'Морин хуур бол толгойг нь морины толгойн хэлбэрээр сийлсэн хоёр утастай хөгжим. Морин хуурын уламжлалт урлаг 2003 онд ЮНЕСКО-гийн хүн төрөлхтний биет бус соёлын өвийн шилдэг бүтээлээр тунхаглагдсан.', 'Уламжлалт урлаг'),
  (18, 'ХОШУУ', 'засаг захиргаа', 'Манжийн үеийн засаг захиргааны нэгж. Хошууг засаг ноён захирдаг байв. 1931 оны засаг захиргааны шинэчлэлээр хошууг татан буулгаж, аймаг, сумын тогтолцоог бий болгосон.', 'XVII–XX зуун · Манжийн үе'),
  (19, 'ХАДАГ', 'ёс заншил', 'Хүндэтгэл, ерөөлийн бэлгэдэл болгон барьдаг торгон алчуур. Хөх хадаг мөнх тэнгэрийг бэлгэддэг тул хамгийн хүндэтгэлтэйд тооцогддог.', 'Ёс заншил'),
  (20, 'ТҮРЭГ', 'төр улс', 'Түрэгийн хаант улс 552 онд байгуулагдаж, VIII зууны дунд үе хүртэл оршсон. Орхоны хөндийд Билгэ хаан, Күлтегинд зориулсан гэрэлт хөшөө өнөөг хүртэл үлджээ.', 'VI–VIII зуун'),
  (21, 'СУДАР', 'номын өв', 'Ном, шашны бичвэрийг судар гэдэг. Лигдэн хааны үед буюу 1628–1629 онд Буддын шашны их ном Ганжуурыг монгол хэлнээ бүрэн орчуулжээ.', 'XVII зуун'),
  (22, 'АЙРАГ', 'идээ ундаа', 'Гүүний сүүг хөхүүрт бүлж исгэсэн ундаа. Зун айраг бэлтгэдэг бөгөөд наадам, баяр ёслолын ширээнд заавал байдаг.', 'Нүүдэлчдийн уламжлал'),
  (23, 'НИРУН', 'төр улс', 'Нирун (Жужан) улс бол Монголын нутагт оршсон нүүдэлчдийн төр. «Хаган» цолыг анх Нирун улсын захирагчид хэрэглэж эхэлсэн гэж үздэг.', 'V–VI зуун'),
  (24, 'ХУУЛЬ', 'хууль, засаглал', 'Монголын эртний хуулийн дурсгалд Чингис хааны Их засаг, 1640 оны «Монгол-Ойрадын Их цааз», 1709 оны «Халх журам» багтдаг.', 'XIII–XVIII зуун'),
  (25, 'ТООНО', 'гэр', 'Гэрийн оройн дугуй цонх. Утаа гаргаж, нарны гэрэл оруулдаг бөгөөд гэрийн хамгийн хүндэтгэлтэй хэсэг. Тооноор орсон нарны гэрэл хаана тусахыг харж өдрийн цагийг тааварладаг байжээ.', 'Нүүдэлчдийн уламжлал'),
  (26, 'КИДАН', 'төр улс', 'Кидан (Ляо) улс X–XII зуунд одоогийн Монгол болон Хятадын хойд нутгийг захирч байв. Монголын нутагт тэдний хэрэм, хотын туурь олноор бий.', 'X–XII зуун'),
  (27, 'СЭЛЭМ', 'зэвсэг', 'Муруй иртэй сэлэм нь нум сум, жадны хамт Монгол морин цэргийн гол зэвсэг байв. Гэхдээ монгол цэргийн хамгийн том давуу тал нь морин дээрээс харвах ур чадвар байжээ.', 'XIII зуун · Их Монгол Улс'),
  (28, 'ЗУРАГ', 'урлаг', 'Монгол зураг бол уламжлалт уран зургийн төрөл. XX зууны эхээр Б. Шаравын зурсан «Монголын нэг өдөр» бүтээл нь нэг зурган дээр нүүдэлчдийн амьдралын олон зуун үзэгдлийг харуулдгаараа алдартай.', 'XX зууны эх'),
  (29, 'ОЙРАД', 'түүхэн ард түмэн', 'Баруун Монголын ард түмэн. XV зуунд Эсэн тайшийн үед хүчирхэгжиж, XVII–XVIII зуунд Зүүнгарын хаант улсыг байгуулжээ.', 'XV–XVIII зуун'),
  (30, 'ХОРГО', 'байгалийн дурсгал', 'Архангай аймагт орших унтарсан галт уул. Түүнээс урссан лаав Тэрх голыг хааж Тэрхийн Цагаан нуур үүссэн. Домогт уулын оройг баатар хуйхлан шидсэн нь нуурын арал болсон гэдэг.', 'Архангай · Тариат сум'),
  (31, 'БӨРТЭ', 'түүхэн хүмүүс', 'Чингис хааны ахлах хатан Бөртэ үжин. Хонгирад аймгийн Дэй сэцэний охин бөгөөд Зүчи, Цагаадай, Өгөдэй, Тулуй хөвгүүдийн эх.', 'XII–XIII зуун'),
  (32, 'ШАГАЙ', 'уламжлалт тоглоом', 'Хонины шагайгаар олон төрлийн тоглоом тоглодог. «Шагай харваа» 2014 онд ЮНЕСКО-гийн хүн төрөлхтний биет бус соёлын өвийн жагсаалтад бүртгэгдсэн.', 'Нүүдэлчдийн уламжлал'),
  (33, 'ХИАГТ', 'газрын нэр', 'Монгол, Оросын хил дээрх худалдааны төв. 1915 онд Хиагтад Монгол, Орос, Хятад гурван улсын гэрээ байгуулагдсан.', 'XVIII–XX зуун'),
  (34, 'ТЭМЭЭ', 'мал', 'Хоёр бөхтэй тэмээ говийн хатуу ширүүн нөхцөлд дасан зохицсон. Тэмээн цуваа олон зууны турш худалдааны ачаа тээвэрлэж ирсэн.', 'Нүүдэлчдийн уламжлал'),
  (35, 'АЛТАН', 'түүхэн сурвалж', '«Алтан товч» бол XVII зуунд Лувсанданзаны бичсэн Монголын түүхийн сурвалж бичиг. Түүнд «Монголын нууц товчоо»-ны ихэнх хэсэг орсон нь их ач холбогдолтой.', 'XVII зуун'),
  (36, 'ЛИМБЭ', 'хөгжим', 'Хулс, модоор хийсэн үлээвэр хөгжим. Амьсгал тасралтгүй үлээх «битүү амьсгаа»-ны арга барил бүхий лимбэчдийн урлаг 2011 онд ЮНЕСКО-гийн яаралтай хамгаалах шаардлагатай биет бус соёлын өвийн жагсаалтад бүртгэгдсэн.', 'Уламжлалт урлаг'),
  (37, 'ДУНХУ', 'эртний ард түмэн', 'Монголын зүүн хэсэгт нутаглаж байсан эртний нүүдэлчид. МЭӨ III зууны сүүлээр Хүннүгийн Модун шаньюй Дунхуг бут цохижээ.', 'МЭӨ III зуун'),
  (38, 'ЗОДОГ', 'ёс заншил', 'Монгол бөхийн өмсгөл. Домогт өгүүлснээр нэгэн удаа эмэгтэй хүн эрчүүдтэй барилдаж түрүүлсэн тул түүнээс хойш зодгийн энгэрийг задгай болгосон гэдэг.', 'Үндэсний бөх'),
  (39, 'ДАЛАЙ', 'цол', '«Далай лам» цолыг 1578 онд Түмэдийн Алтан хаан Түвдийн Содномжамцад өргөсөн. «Далай» гэдэг нь монгол үг бөгөөд «их тэнгис» гэсэн утгатай.', 'XVI зуун'),
  (40, 'ИРВЭС', 'байгаль', 'Өндөр уулын ховор амьтан. Дэлхийн ирвэсийн нэлээд хэсэг нь Монголын Алтай, Говь-Алтайн уулсад амьдардаг бөгөөд агнахыг хуулиар хориглосон.', 'Монголын байгаль'),
  (41, 'ТУЛУЙ', 'түүхэн хүмүүс', 'Чингис хааны отгон хүү. Түүний хөвгүүд Мөнх, Хубилай, Хүлэгү, Аригбөх бүгд эзэнт гүрний томоохон захирагчид болжээ.', 'XIII зуун · Их Монгол Улс'),
  (42, 'ТУЛГА', 'гэр', 'Гал голомтын дээр тогоо тавих гурван хөлтэй төмөр. Тулга бол айл өрх, үр удмын залгамж холбоог бэлгэддэг тул түүнийг гишгэх, түлхэх нь цээртэй.', 'Ёс заншил'),
  (43, 'ХЭРЭМ', 'дурсгал', 'Дорнод, Сүхбаатар аймгаар дайран өнгөрдөг «Чингисийн хэрэм» гэж нэрлэгддэг шороон хэрэм нь үнэндээ Чингис хаанаас өмнө, Кидан, Зүрчидийн үед баригдсан гэж үздэг.', 'X–XIII зуун'),
  (44, 'ЭМЭЭЛ', 'эд өлгийн зүйл', 'Модон суурьтай, мөнгөн чимэглэлтэй монгол эмээл. Эмээл, хазаар урладаг дархчууд нутаг бүрт байсан бөгөөд сайхан эмээл айлын бахархал байв.', 'Нүүдэлчдийн уламжлал'),
  (45, 'ТАТАР', 'эртний аймаг', 'XII зууны Монголын хүчирхэг аймгуудын нэг. «Монголын нууц товчоо»-нд өгүүлснээр Тэмүжиний эцэг Есүхэй баатрыг татарууд хордуулан алжээ.', 'XII зуун'),
  (46, 'ДАЦАН', 'шашин, боловсрол', 'Хийдийн дэргэдэх лам нарын сургууль. Гүн ухаан, анагаах ухаан, зурхай зэрэг тусгай чиглэлээр суралцдаг байжээ.', 'XVII–XX зуун'),
  (47, 'АЛТАЙ', 'газрын нэр', 'Монголын баруун хязгаар дахь уулс. Монголын хамгийн өндөр оргил Хүйтэн оргил (4374 м) Алтай Таван Богдод оршдог. Монгол Алтайн хадны зургийн цогцолбор ЮНЕСКО-гийн Дэлхийн өвд бүртгэгдсэн.', 'Баян-Өлгий, Ховд'),
  (48, 'ЦЭРЭГ', 'цэрэг', 'Их Монгол Улсад 15-аас 70 насны эр бүр цэргийн алба хаах үүрэгтэй байжээ. Цэрэг бүр хэд хэдэн морьтой явдаг тул аян дайнд маш хурдан шилжиж чаддаг байв.', 'XIII зуун · Их Монгол Улс'),
  (49, 'МӨНГӨ', 'урлал', 'Хархорумд Парисын дархан Гийом Бушье мөнгөн мод бүтээж, түүний цоргоор айраг, дарс урсдаг байжээ. Үүнийг 1254 онд Хархорумд ирсэн Рубрук тэмдэглэн үлдээсэн.', 'XIII зуун · Хархорум'),
  (50, 'ГУТАЛ', 'хувцас', 'Хоншоороо дээш эргүүлсэн монгол гутал. Газар шороо, ургамлыг гэмтээхгүйн тулд ийм хэлбэртэй хийдэг гэж ардын тайлбарт өгүүлдэг.', 'Ёс заншил'),
  (51, 'ӨЭЛҮН', 'түүхэн хүмүүс', 'Чингис хааны эх Өэлүн. Есүхэй баатрыг нас барсны дараа хүүхдүүдээ ганцаараа өсгөсөн бөгөөд «Нууц товчоо»-нд түүний тэвчээр, ухааныг магтан өгүүлдэг.', 'XII зуун'),
  (52, 'ЦУВАА', 'худалдаа', 'Тэмээн цуваа. XVIII–XIX зуунд «Цайны зам»-аар Хиагт, Хүрээ, Халганы чиглэлд цай, торго, бөс бараа тээвэрлэдэг байв.', 'XVIII–XIX зуун'),
  (53, 'ШАТАР', 'уламжлалт тоглоом', 'Монгол шатарт ноён, бэрс, тэмээ, морь, тэрэг, хүү гэсэн хүүнүүд байдаг. Шатрын хүүг баримлаар урлах нь монгол дархчуудын нэгэн уламжлал байв.', 'Уламжлалт тоглоом'),
  (54, 'ОРХОН', 'газрын нэр', 'Монголын хамгийн урт гол бөгөөд 1100 гаруй км урсдаг. Түүний хөндий олон гүрний нийслэл байсан тул 2004 онд «Орхоны хөндийн соёлын дурсгалт газар нутаг» ЮНЕСКО-гийн Дэлхийн өвд бүртгэгдсэн.', 'Архангай, Өвөрхангай'),
  (55, 'АБТАЙ', 'түүхэн хүмүүс', 'Халхын Абтай сайн хан 1585 онд Хархорумын туурийн дэргэд Эрдэнэ Зуу хийдийг байгуулжээ. Энэ нь Монголд өнөөг хүртэл хадгалагдан үлдсэн хамгийн эртний буддын хийд.', 'XVI зуун'),
  (56, 'УУРГА', 'малчин ахуй', 'Адуу барихад хэрэглэдэг, үзүүртээ савхин гогцоотой урт шон. Морин дээрээс уургаар адуу барих нь малчдын ур чадварын нэг.', 'Нүүдэлчдийн уламжлал'),
  (57, 'ХӨРӨГ', 'урлаг', 'Чингис хааны хамгийн алдартай хөрөг Юань улсын үед зурагдсан бөгөөд одоо Тайпэйн Үндэсний ордон музейд хадгалагддаг.', 'XIII–XIV зуун · Юань'),
  (58, 'УДГАН', 'шүтлэг', 'Бөө мөргөлд эмэгтэй бөөг удган гэдэг. Монголчуудын эртний шүтлэгт Мөнх тэнгэр, газар эхийг шүтэж, бөө, удган тэнгэр болон хүмүүсийн хооронд зуучилдаг гэж үздэг байв.', 'Эртний шүтлэг'),
  (59, 'ТОРГО', 'худалдаа', 'Нарийн гоёмсог даавуу. Их Монгол Улсын үед Торгоны замын худалдаа аюулгүй болж, Европ, Азийн хооронд бараа, санаа чөлөөтэй дамжих болжээ.', 'XIII–XIV зуун'),
  (60, 'ХАСАР', 'түүхэн хүмүүс', 'Чингис хааны дүү Хасар. Мэргэн харваачаараа алдаршиж, «Хавт Хасар» хэмээн нэрлэгддэг байв.', 'XII–XIII зуун'),
  (61, 'ЁОЧИН', 'хөгжим', 'Олон утастай, хоёр жижиг савхаар цохиж тоглодог хөгжим. Морин хуур, ёочин, лимбэ нь ардын хөгжмийн чуулгын гол хөгжмүүдийн нэг.', 'Уламжлалт урлаг'),
  (62, 'ХУЛАН', 'байгаль', 'Говийн тал нутгийн зэрлэг амьтан. Дэлхий дээрх хулангийн дийлэнх нь Монголын өмнөд говьд амьдардаг.', 'Монголын байгаль'),
  (63, 'АРАВТ', 'цэргийн нэгж', 'Аравтын тогтолцооны хамгийн бага нэгж буюу арван цэрэг. Аравтын гишүүд бие биеэ хамгаалах үүрэгтэй байсан бөгөөд нэгнээ орхиж зугтвал бүгд шийтгүүлдэг байжээ.', 'XIII зуун · Их Монгол Улс'),
  (64, 'ДУГАН', 'барилга', 'Хийдийн доторх бурхан тахиж, ном уншдаг байшин. Эрдэнэ Зуу хийдэд Баруун, Гол, Зүүн зуу хэмээх гурван сүм бий.', 'Буддын шашны уламжлал'),
  (65, 'ТӨМӨР', 'дархан урлал', 'Тэмүжин гэдэг нэр «төмөр» гэдэг үгтэй холбоотой гэж үздэг. Нүүдэлчид төмрөөр зэр зэвсэг, эмээл хазаарын эд анги урладаг дархчуудыг ихэд хүндэлдэг байв.', 'XII–XIII зуун'),
  (66, 'АРГАЛ', 'малчин ахуй', 'Хатаасан үхрийн хоргол. Мод ховор тал нутагт нүүдэлчид олон зууны турш аргалаар гэрээ халааж, хоол хүнсээ болгосоор ирсэн.', 'Нүүдэлчдийн уламжлал'),
  (67, 'ХӨШӨӨ', 'дурсгал', 'Хөшөө Цайдамд VIII зууны Түрэгийн Билгэ хаан, Күлтегиний гэрэлт хөшөөнүүд бий. Тэдгээрт эртний түрэг бичгээр түүхээ сийлж үлдээжээ.', 'VIII зуун'),
  (68, 'ЗАЛАА', 'хувцас', 'Монгол малгайн оройд хадсан улаан утсан цацаг. Ардын тайлбараар залаа нь нар, гал, хийморийг бэлгэддэг.', 'Ёс заншил'),
  (69, 'ХАМБА', 'шашин', 'Хийдийн тэргүүн ламыг хамба лам гэдэг. Өнөөдөр Гандантэгчэнлин хийдийн хамба лам Монголын Буддын шашинтны төвийн тэргүүн байдаг.', 'Буддын шашны уламжлал'),
  (70, 'ЖОЛОО', 'малчин ахуй', 'Морийг удирдах хазаарын оосор. «Жолоо барих» гэдэг нь удирдах, тэргүүлэх гэсэн утгаар ч хэрэглэгддэг.', 'Нүүдэлчдийн уламжлал'),
  (71, 'ХУТГА', 'эд өлгийн зүйл', 'Хэт хутга бол эрчүүдийн бүсэндээ зүүдэг хутга, хэт (цахиур), савх бүхий иж бүрдэл. Сайн хэт хутга эр хүний бахархал байжээ.', 'Ёс заншил');

select 'GRIT Culture: бэлэн боллоо · ' || count(*) || ' үг' as status from grit.words;
