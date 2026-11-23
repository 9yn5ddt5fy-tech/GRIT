-- grit.mn site: privacy-friendly page-view counts and the contact form.
-- No cookies, no IP addresses, no personal data in page views: only the page,
-- the referring site's host, a coarse device type and the day.
begin;

create table if not exists grit.pageviews (
  id bigint generated always as identity primary key,
  day date not null default (now() at time zone 'Asia/Ulaanbaatar')::date,
  at timestamptz not null default now(),
  path text not null check (char_length(path) <= 200),
  ref_host text check (char_length(ref_host) <= 120),
  device text check (device in ('mobile', 'desktop')),
  lang text check (lang in ('mn', 'en'))
);
create index if not exists pageviews_day on grit.pageviews (day);
alter table grit.pageviews enable row level security;

create table if not exists grit.messages (
  id bigint generated always as identity primary key,
  at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 200),
  phone text check (char_length(phone) <= 40),
  message text not null check (char_length(message) between 1 and 5000),
  page text check (char_length(page) <= 200),
  handled boolean not null default false
);
alter table grit.messages enable row level security;

create or replace function public.site_view(p_path text, p_ref text, p_device text, p_lang text) returns void
language plpgsql security definer set search_path = grit, public, pg_temp
as $$
begin
  insert into grit.pageviews (path, ref_host, device, lang)
  values (left(coalesce(p_path, '/'), 200), nullif(left(coalesce(p_ref, ''), 120), ''),
          case when p_device in ('mobile', 'desktop') then p_device end,
          case when p_lang in ('mn', 'en') then p_lang end);
end $$;

create or replace function public.site_message(p_name text, p_email text, p_phone text, p_message text, p_page text) returns jsonb
language plpgsql security definer set search_path = grit, public, pg_temp
as $$
begin
  if coalesce(trim(p_name), '') = '' or coalesce(trim(p_message), '') = '' or p_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    return jsonb_build_object('ok', false, 'error', 'invalid');
  end if;
  -- simple flood guard: at most 20 messages an hour from everyone together
  if (select count(*) from grit.messages where at > now() - interval '1 hour') >= 20 then
    return jsonb_build_object('ok', false, 'error', 'busy');
  end if;
  insert into grit.messages (name, email, phone, message, page)
  values (left(trim(p_name), 120), left(trim(p_email), 200), nullif(left(trim(coalesce(p_phone, '')), 40), ''), left(p_message, 5000), left(p_page, 200));
  return jsonb_build_object('ok', true);
end $$;

revoke all on grit.pageviews, grit.messages from public, anon, authenticated;
revoke all on function public.site_view(text, text, text, text) from public;
revoke all on function public.site_message(text, text, text, text, text) from public;
grant execute on function public.site_view(text, text, text, text) to anon, authenticated;
grant execute on function public.site_message(text, text, text, text, text) to anon, authenticated;

commit;

-- Reading the numbers (SQL Editor):
--   select day, count(*) views, count(*) filter (where device = 'mobile') mobile
--   from grit.pageviews group by day order by day desc;
--   select path, count(*) from grit.pageviews where day > current_date - 30 group by path order by 2 desc;
--   select * from grit.messages where not handled order by at desc;
