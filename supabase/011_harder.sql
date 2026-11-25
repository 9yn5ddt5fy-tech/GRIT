-- Таасан уу? gets harder (players were solving in ~2.4 tries and burning guesses like ЩЩЩЩЩ
-- in a second window to see the answer):
--   1. a guess needs a vowel and may not repeat one letter 4+ times;
--   2. hard mode: letters found in place stay in place, letters found elsewhere must be used again;
--   3. the category hint opens after 2 guesses, the letter reveal after 3;
--   4. a lost game no longer shows the answer: it is shown the next day as “yesterday's word”.

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
  prev text;
  sc text[];
  ch text;
  i int;
begin
  if char_length(g) <> 5 or g !~ '^[А-ЯЁӨҮ]+$' then raise exception 'word'; end if;
  if g !~ '[АЭИОУӨҮЫЕЁЮЯ]' then raise exception 'novowel'; end if;
  if exists (select 1 from regexp_split_to_table(g, '') c group by c having count(*) >= 4) then raise exception 'junk'; end if;
  insert into grit.plays (player_id, day_no) values (pid, n) on conflict do nothing;
  select * into pl from grit.plays where player_id = pid and day_no = n for update;
  if pl.finished or coalesce(array_length(pl.guesses, 1), 0) >= 6 then raise exception 'over'; end if;
  -- hard mode: every earlier guess must be respected
  foreach prev in array coalesce(pl.guesses, '{}') loop
    sc := grit.score(prev, w.word);
    for i in 1..5 loop
      if sc[i] = 'correct' and substr(g, i, 1) <> substr(prev, i, 1) then
        raise exception 'hard_pos:%:%', i, substr(prev, i, 1);
      end if;
    end loop;
    for ch in select distinct substr(prev, j, 1) from generate_series(1, 5) gs(j) where sc[j] = 'present' loop
      if (select count(*) from generate_series(1, 5) gs(j) where substr(g, j, 1) = ch)
         < (select count(*) from generate_series(1, 5) gs(j) where substr(prev, j, 1) = ch and sc[j] in ('correct', 'present')) then
        raise exception 'hard_has:%', ch;
      end if;
    end loop;
  end loop;
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

-- The category hint opens after the second guess.
create or replace function public.tu_hint(p_token text) returns jsonb
language plpgsql security definer set search_path = grit, public, extensions, pg_temp
as $$
declare pid uuid := grit.player_of(p_token); n int := grit.today(); k int;
begin
  select coalesce(cardinality(guesses), 0) into k from grit.plays where player_id = pid and day_no = n;
  if coalesce(k, 0) < 2 then raise exception 'hint_early'; end if;
  update grit.plays set hint = true, updated_at = now() where player_id = pid and day_no = n and not finished;
  return grit.state(pid);
end $$;

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
                                 'handle', pr.handle,
                                 'google', pr.auth_uid is not null,
                                 'avatar', pr.avatar,
                                 'class', (select c.name from grit.classes c where c.id = pr.class_id),
                                 'school', (select s.name from grit.classes c join grit.schools s on s.id = c.school_id where c.id = pr.class_id)),
    'stats', grit.player_stats(pid),
    'ranks', (select jsonb_agg(jsonb_build_object('lvl', lvl, 'name', name, 'min_points', min_points, 'min_days', min_days, 'descr', descr) order by lvl) from grit.ranks)
  );
end $$;
