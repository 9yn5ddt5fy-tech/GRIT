-- GRIT EDU, first tools:
--   1. “Гадаадад суралцах зам”: a grade-by-grade checklist whose ticks are saved to the player
--      (guest or account, the same session token as GRIT Culture).
--   2. “Өдрийн англи үг”: a daily word game. The Mongolian meaning is the clue; the player types
--      the 5-letter English word in six tries (Таасан уу? colours). Words live only in the
--      database (seeded separately), so tomorrow's word is not in the site's code.

-- ---------------------------------------------------------------- 1. roadmap progress
create table if not exists grit.edu_progress (
  player_id uuid not null references grit.players on delete cascade,
  item      text not null check (item ~ '^[a-z0-9-]{1,40}$'),
  done_at   timestamptz not null default now(),
  primary key (player_id, item)
);
alter table grit.edu_progress enable row level security;
revoke all on grit.edu_progress from public, anon, authenticated;

create or replace function public.edu_progress(p_token text) returns jsonb
language plpgsql security definer set search_path = grit, public, extensions, pg_temp
as $$
declare pid uuid;
begin
  begin pid := grit.player_of(p_token); exception when others then return '[]'::jsonb; end;
  return coalesce((select jsonb_agg(item order by done_at) from grit.edu_progress where player_id = pid), '[]'::jsonb);
end $$;

create or replace function public.edu_mark(p_token text, p_item text, p_done boolean) returns jsonb
language plpgsql security definer set search_path = grit, public, extensions, pg_temp
as $$
declare pid uuid := grit.player_of(p_token);
begin
  if coalesce(p_item, '') !~ '^[a-z0-9-]{1,40}$' then raise exception 'item'; end if;
  if p_done then
    insert into grit.edu_progress (player_id, item) values (pid, p_item) on conflict do nothing;
  else
    delete from grit.edu_progress where player_id = pid and item = p_item;
  end if;
  return coalesce((select jsonb_agg(item order by done_at) from grit.edu_progress where player_id = pid), '[]'::jsonb);
end $$;

-- ---------------------------------------------------------------- 2. daily English word
create table if not exists grit.en_words (
  id         int primary key,
  word       text not null check (word ~ '^[A-Z]{5}$'),
  mn         text not null,          -- Mongolian meaning (the clue)
  pos        text not null,          -- part of speech, in Mongolian
  example    text not null,          -- English example sentence
  example_mn text not null           -- its Mongolian translation
);
alter table grit.en_words enable row level security;
revoke all on grit.en_words from public, anon, authenticated;

create table if not exists grit.en_schedule (day_no int primary key, word_id int not null references grit.en_words);
alter table grit.en_schedule enable row level security;
revoke all on grit.en_schedule from public, anon, authenticated;

create table if not exists grit.en_plays (
  player_id  uuid not null references grit.players on delete cascade,
  day_no     int not null,
  guesses    text[] not null default '{}',
  finished   boolean not null default false,
  solved     boolean not null default false,
  points     int not null default 0,
  updated_at timestamptz not null default now(),
  primary key (player_id, day_no)
);
alter table grit.en_plays enable row level security;
revoke all on grit.en_plays from public, anon, authenticated;

alter table grit.activity drop constraint if exists activity_kind_check;
alter table grit.activity add constraint activity_kind_check check (kind in ('quiz', 'timeline', 'book', 'whois', 'english'));

insert into grit.settings values ('en_start', (grit.today())::text) on conflict (key) do nothing;

create or replace function grit.en_fill() returns void language plpgsql
as $$
declare d int := greatest(coalesce((select max(day_no) from grit.en_schedule), 0) + 1, grit.today()); r record; last int;
begin
  select word_id into last from grit.en_schedule order by day_no desc limit 1;
  while d <= grit.today() + 730 loop
    for r in select id from grit.en_words order by random() loop
      exit when d > grit.today() + 730;
      continue when r.id = last;
      insert into grit.en_schedule values (d, r.id) on conflict do nothing;
      last := r.id; d := d + 1;
    end loop;
  end loop;
end $$;
revoke all on function grit.en_fill() from public, anon, authenticated;

create or replace function grit.en_of(n int) returns grit.en_words language sql stable
as $$ select w.* from grit.en_words w join grit.en_schedule s on s.word_id = w.id where s.day_no = n $$;
revoke all on function grit.en_of(int) from public, anon, authenticated;

create or replace function grit.en_state(pid uuid) returns jsonb language plpgsql stable
as $$
declare
  n int := grit.today();
  w grit.en_words := grit.en_of(n);
  pl grit.en_plays;
begin
  if w.id is null then raise exception 'closed'; end if;
  if pid is not null then select * into pl from grit.en_plays where player_id = pid and day_no = n; end if;
  return jsonb_build_object(
    'no', n - (select value::int from grit.settings where key = 'en_start') + 1,
    'next_in', extract(epoch from (date_trunc('day', now() at time zone grit.tz()) + interval '1 day') - (now() at time zone grit.tz()))::int,
    'clue', jsonb_build_object('mn', w.mn, 'pos', w.pos),
    'guesses', coalesce((select jsonb_agg(jsonb_build_object('w', g, 'r', to_jsonb(grit.score(g, w.word))) order by o)
                         from unnest(pl.guesses) with ordinality t(g, o)), '[]'::jsonb),
    'finished', coalesce(pl.finished, false),
    'solved', coalesce(pl.solved, false),
    'points', coalesce(pl.points, 0),
    -- a learner should see the right word even after six misses: the clue already gives the meaning
    'answer', case when pl.finished then jsonb_build_object('w', w.word, 'mn', w.mn, 'pos', w.pos, 'example', w.example, 'example_mn', w.example_mn) end
  );
end $$;
revoke all on function grit.en_state(uuid) from public, anon, authenticated;

create or replace function public.en_state(p_token text default null) returns jsonb
language plpgsql security definer set search_path = grit, public, extensions, pg_temp
as $$
declare pid uuid;
begin
  begin pid := grit.player_of(p_token); exception when others then pid := null; end;
  return grit.en_state(pid);
end $$;

-- Solving on try k gives 7 - k points (6 .. 1), like Таасан уу?
create or replace function public.en_guess(p_token text, p_word text) returns jsonb
language plpgsql security definer set search_path = grit, public, extensions, pg_temp
as $$
declare
  pid uuid := grit.player_of(p_token);
  n int := grit.today();
  w grit.en_words := grit.en_of(n);
  g text := upper(trim(coalesce(p_word, '')));
  pl grit.en_plays;
  k int;
begin
  if w.id is null then raise exception 'closed'; end if;
  if g !~ '^[A-Z]{5}$' then raise exception 'word'; end if;
  if g !~ '[AEIOUY]' then raise exception 'novowel'; end if;
  if exists (select 1 from regexp_split_to_table(g, '') c group by c having count(*) >= 4) then raise exception 'junk'; end if;
  insert into grit.en_plays (player_id, day_no) values (pid, n) on conflict do nothing;
  select * into pl from grit.en_plays where player_id = pid and day_no = n for update;
  if pl.finished then raise exception 'over'; end if;
  pl.guesses := pl.guesses || g;
  k := cardinality(pl.guesses);
  pl.solved := g = w.word;
  pl.finished := pl.solved or k >= 6;
  pl.points := case when pl.solved then 7 - k else 0 end;
  update grit.en_plays set guesses = pl.guesses, finished = pl.finished, solved = pl.solved, points = pl.points, updated_at = now()
  where player_id = pid and day_no = n;
  if pl.finished then
    insert into grit.activity (player_id, day_no, kind, ref, points) values (pid, n, 'english', 'en' || n, pl.points);
  end if;
  return grit.en_state(pid) || jsonb_build_object('stats', grit.player_stats(pid));
end $$;

-- ---------------------------------------------------------------- guests become accounts
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
    select dst, day_no, guesses, finished, solved, points, updated_at from grit.hb_plays where player_id = src
    on conflict (player_id, day_no) do nothing;
  insert into grit.en_plays (player_id, day_no, guesses, finished, solved, points, updated_at)
    select dst, day_no, guesses, finished, solved, points, updated_at from grit.en_plays where player_id = src
    on conflict (player_id, day_no) do nothing;
  insert into grit.edu_progress (player_id, item, done_at)
    select dst, item, done_at from grit.edu_progress where player_id = src
    on conflict do nothing;
  -- a day's Хэн бэ? / English points count once, even if both the guest and the account played it
  insert into grit.activity (player_id, day_no, kind, ref, points, at)
    select dst, a.day_no, a.kind, a.ref, a.points, a.at from grit.activity a
    where a.player_id = src
      and not (a.kind in ('whois', 'english') and exists (select 1 from grit.activity b where b.player_id = dst and b.kind = a.kind and b.day_no = a.day_no))
    on conflict do nothing;
  delete from grit.players where id = src;
end $$;

revoke all on function public.edu_progress(text), public.edu_mark(text, text, boolean), public.en_state(text), public.en_guess(text, text) from public;
grant execute on function public.edu_progress(text), public.edu_mark(text, text, boolean), public.en_state(text), public.en_guess(text, text) to anon, authenticated;
