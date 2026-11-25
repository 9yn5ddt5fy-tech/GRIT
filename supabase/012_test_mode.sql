-- Таасан уу? test page for the site owner: unlimited guesses, nothing is saved, no points.
-- Protected by a secret test key (stored hashed in grit.settings 'tu_test_hash'; the key
-- itself is never in this repository).
create or replace function public.tu_test(p_key text, p_day int default null, p_word text default null,
  p_prev text[] default '{}', p_hard boolean default true, p_hint boolean default false, p_reveal boolean default false)
returns jsonb language plpgsql security definer set search_path = grit, public, extensions, pg_temp
as $$
declare
  h text := (select value from grit.settings where key = 'tu_test_hash');
  n int := coalesce(p_day, grit.today());
  w grit.words;
  g text := upper(trim(coalesce(p_word, '')));
  prev text; sc text[]; ch text; i int;
  out jsonb;
begin
  if h is null or h <> extensions.crypt(coalesce(p_key, ''), h) then raise exception 'testkey'; end if;
  if n < 1 or n > grit.today() + 400 then raise exception 'day'; end if;
  w := grit.word_of(n);
  out := jsonb_build_object('no', n, 'date', grit.day_date(n), 'today', grit.today());
  if p_hint then out := out || jsonb_build_object('hint', jsonb_build_object('cat', w.cat, 'era', w.era)); end if;
  if p_reveal then out := out || jsonb_build_object('answer', jsonb_build_object('w', w.word, 'cat', w.cat, 'era', w.era, 'info', w.info)); end if;
  if p_word is null then return out; end if;
  if char_length(g) <> 5 or g !~ '^[А-ЯЁӨҮ]+$' then raise exception 'word'; end if;
  if g !~ '[АЭИОУӨҮЫЕЁЮЯ]' then raise exception 'novowel'; end if;
  if exists (select 1 from regexp_split_to_table(g, '') c group by c having count(*) >= 4) then raise exception 'junk'; end if;
  if p_hard then
    foreach prev in array coalesce(p_prev, '{}') loop
      prev := upper(prev);
      continue when char_length(prev) <> 5;
      sc := grit.score(prev, w.word);
      for i in 1..5 loop
        if sc[i] = 'correct' and substr(g, i, 1) <> substr(prev, i, 1) then raise exception 'hard_pos:%:%', i, substr(prev, i, 1); end if;
      end loop;
      for ch in select distinct substr(prev, j, 1) from generate_series(1, 5) gs(j) where sc[j] = 'present' loop
        if (select count(*) from generate_series(1, 5) gs(j) where substr(g, j, 1) = ch)
           < (select count(*) from generate_series(1, 5) gs(j) where substr(prev, j, 1) = ch and sc[j] in ('correct', 'present')) then
          raise exception 'hard_has:%', ch;
        end if;
      end loop;
    end loop;
  end if;
  out := out || jsonb_build_object('w', g, 'r', to_jsonb(grit.score(g, w.word)), 'solved', g = w.word);
  if g = w.word then out := out || jsonb_build_object('answer', jsonb_build_object('w', w.word, 'cat', w.cat, 'era', w.era, 'info', w.info)); end if;
  return out;
end $$;
revoke all on function public.tu_test(text, int, text, text[], boolean, boolean, boolean) from public;
grant execute on function public.tu_test(text, int, text, text[], boolean, boolean, boolean) to anon, authenticated;
