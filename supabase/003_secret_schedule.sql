-- Таасан уу?: keep future words secret.
-- Until puzzle №24 the word was idx (n-1) mod count, which anyone could work out
-- from a public word list. From №25 on, the word for each day is read from
-- grit.schedule, a shuffled order that lives only in the database (RLS on, no
-- grants), so knowing the word list no longer tells you which day uses which word.
begin;

create table if not exists grit.schedule (
  day_no int primary key,
  idx    int not null references grit.words(idx)
);
alter table grit.schedule enable row level security;
revoke all on grit.schedule from public, anon, authenticated;

-- Fill ~1 year ahead: first every word not used yet (idx >= 24), then whole-list
-- reshuffles. Re-running only adds days that are still missing.
do $$
declare d int := coalesce((select max(day_no) from grit.schedule), 24) + 1; r record;
begin
  if not exists (select 1 from grit.schedule) then
    for r in select idx from grit.words where idx >= 24 order by random() loop
      insert into grit.schedule values (d, r.idx); d := d + 1;
    end loop;
  end if;
  while d <= 420 loop
    for r in select idx from grit.words order by random() loop
      exit when d > 420;
      insert into grit.schedule values (d, r.idx) on conflict do nothing; d := d + 1;
    end loop;
  end loop;
end $$;

create or replace function grit.word_of(n int) returns grit.words language sql stable
as $$
  select w.* from grit.words w
  where w.idx = coalesce(
    (select s.idx from grit.schedule s where s.day_no = n),
    (((n - 1) % (select count(*) from grit.words)) + (select count(*) from grit.words)) % (select count(*) from grit.words))
$$;
revoke all on function grit.word_of(int) from public, anon, authenticated;

commit;
