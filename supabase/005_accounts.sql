-- Таасан уу?: accounts that work on any device.
--   1. nickname + 4-digit PIN for anyone (class members already sign in with the class code);
--   2. Google sign-in through Supabase Auth.
-- Signing in moves the guest progress of the current device into the account
-- (days the account has not played yet). Nothing else about the player changes.

alter table grit.players add column if not exists handle text;
alter table grit.players add column if not exists auth_uid uuid;
create unique index if not exists players_handle on grit.players (lower(handle)) where handle is not null;
create unique index if not exists players_auth on grit.players (auth_uid) where auth_uid is not null;

-- A guest is a player nobody can sign in to: no class, no nickname account, no Google.
create or replace function grit.is_guest(p grit.players) returns boolean language sql immutable
as $$ select p.class_id is null and p.handle is null and p.auth_uid is null $$;

-- Move a guest's days into an account and remove the guest.
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
  delete from grit.players where id = src;
end $$;

-- A fresh session for a player, replacing the one the device had.
create or replace function grit.new_session(pid uuid, old_token text) returns text language plpgsql
as $$
declare tok text := grit.new_token();
begin
  insert into grit.sessions (token_hash, player_id) values (grit.hash_token(tok), pid);
  delete from grit.sessions where token_hash = grit.hash_token(coalesce(old_token, ''));
  return tok;
end $$;

-- The state now also says how the player signs in.
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
                                 'handle', pr.handle,
                                 'google', pr.auth_uid is not null,
                                 'class', (select c.name from grit.classes c where c.id = pr.class_id),
                                 'school', (select s.name from grit.classes c join grit.schools s on s.id = c.school_id where c.id = pr.class_id)),
    'stats', grit.player_stats(pid),
    'ranks', (select jsonb_agg(jsonb_build_object('lvl', lvl, 'name', name, 'min_points', min_points, 'min_days', min_days, 'descr', descr) order by lvl) from grit.ranks)
  );
end $$;

-- Create a nickname account from the current player (keeps all progress).
create or replace function public.tu_register(p_token text, p_handle text, p_pin text) returns jsonb
language plpgsql security definer set search_path = grit, public, extensions, pg_temp
as $$
declare
  pid uuid := grit.player_of(p_token);
  me grit.players;
  h text := regexp_replace(trim(coalesce(p_handle, '')), '\s+', ' ', 'g');
begin
  select * into me from grit.players where id = pid;
  if me.class_id is not null then raise exception 'class'; end if;
  if me.handle is not null then raise exception 'already'; end if;
  if h !~ '^[A-Za-zА-Яа-яЁёӨөҮү0-9 ._-]{3,20}$' then raise exception 'handle'; end if;
  if coalesce(p_pin, '') !~ '^[0-9]{4}$' then raise exception 'pin_format'; end if;
  if exists (select 1 from grit.players where lower(handle) = lower(h)) then raise exception 'taken'; end if;
  update grit.players set handle = h, pin_hash = extensions.crypt(p_pin, extensions.gen_salt('bf')), failed = 0, locked_until = null
  where id = pid;
  return jsonb_build_object('token', p_token) || grit.state(pid);
end $$;

-- Sign in with nickname + PIN on any device.
create or replace function public.tu_login(p_token text, p_handle text, p_pin text) returns jsonb
language plpgsql security definer set search_path = grit, public, extensions, pg_temp
as $$
declare
  cur uuid;
  acc grit.players;
  tok text;
begin
  begin cur := grit.player_of(p_token); exception when others then cur := null; end;
  select * into acc from grit.players where lower(handle) = lower(trim(coalesce(p_handle, '')));
  if acc.id is null then return jsonb_build_object('error', 'login'); end if;
  if acc.locked_until is not null and acc.locked_until > now() then raise exception 'locked'; end if;
  if coalesce(p_pin, '') !~ '^[0-9]{4}$' or acc.pin_hash <> extensions.crypt(p_pin, acc.pin_hash) then
    update grit.players set failed = failed + 1,
           locked_until = case when failed + 1 >= 10 then now() + interval '15 minutes' end
    where id = acc.id;
    return jsonb_build_object('error', 'login');
  end if;
  update grit.players set failed = 0, locked_until = null where id = acc.id;
  perform grit.merge_guest(cur, acc.id);
  tok := grit.new_session(acc.id, p_token);
  return jsonb_build_object('token', tok) || grit.state(acc.id);
end $$;

-- Sign in with Google: the request carries the Supabase Auth token of the Google user.
-- A Google user seen for the first time is linked to the current player.
create or replace function public.tu_google(p_token text) returns jsonb
language plpgsql security definer set search_path = grit, public, extensions, pg_temp
as $$
declare
  uid uuid := auth.uid();
  cur uuid;
  me grit.players;
  acc grit.players;
  tok text;
begin
  if uid is null then raise exception 'auth'; end if;
  begin cur := grit.player_of(p_token); exception when others then cur := null; end;
  select * into acc from grit.players where auth_uid = uid;
  if acc.id is not null then
    perform grit.merge_guest(cur, acc.id);
    tok := grit.new_session(acc.id, p_token);
    return jsonb_build_object('token', tok) || grit.state(acc.id);
  end if;
  if cur is null then
    insert into grit.players default values returning id into cur;
  end if;
  select * into me from grit.players where id = cur;
  if me.auth_uid is not null then raise exception 'linked'; end if;
  update grit.players set auth_uid = uid where id = cur;
  tok := grit.new_session(cur, p_token);
  return jsonb_build_object('token', tok) || grit.state(cur);
end $$;

-- Sign out on this device only.
create or replace function public.tu_logout(p_token text) returns void
language sql security definer set search_path = grit, public, extensions, pg_temp
as $$ delete from grit.sessions where token_hash = grit.hash_token(coalesce(p_token, '')) $$;

revoke all on function public.tu_register(text, text, text), public.tu_login(text, text, text),
  public.tu_google(text), public.tu_logout(text) from public;
grant execute on function public.tu_register(text, text, text), public.tu_login(text, text, text),
  public.tu_google(text), public.tu_logout(text) to anon, authenticated;
