-- Supl database setup. Run once in Supabase: Dashboard → SQL Editor → New query → paste → Run.
-- Safe to re-run: every statement checks before creating or replaces in place.
-- Every table uses row-level security, so a signed-in user can only reach their own rows.

-- 1. Profiles: one row per user, holding health-data consent.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  health_consent_at timestamptz,
  consent_version text,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

drop policy if exists "profiles: read own" on public.profiles;
create policy "profiles: read own" on public.profiles for select to authenticated using (id = auth.uid());
drop policy if exists "profiles: insert own" on public.profiles;
create policy "profiles: insert own" on public.profiles for insert to authenticated with check (id = auth.uid());
drop policy if exists "profiles: update own" on public.profiles;
create policy "profiles: update own" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- 2. Check-ins: saved answers and scores. Ten answers of 1–5, a 1–10 score and its band, plus the About-you profile.
create table if not exists public.checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  nutrient_id text not null check (nutrient_id ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and length(nutrient_id) <= 60),
  answers smallint[] not null check (cardinality(answers) = 10 and 1 <= all (answers) and 5 >= all (answers)),
  score smallint not null check (score between 1 and 10),
  band text not null check (band in ('low', 'moderate', 'high')),
  -- "About you" answers that shaped the questions and score (saved only with consent, like the answers).
  sex text check (sex in ('female', 'male', 'other')),
  age_group text check (age_group in ('18-29', '30-44', '45-59', '60-74', '75-plus')),
  menopause boolean,
  created_at timestamptz not null default now()
);
-- For projects created before these columns existed (safe to re-run):
alter table public.checkins add column if not exists sex text check (sex in ('female', 'male', 'other'));
alter table public.checkins add column if not exists age_group text check (age_group in ('18-29', '30-44', '45-59', '60-74', '75-plus'));
alter table public.checkins add column if not exists menopause boolean;
create index if not exists checkins_user_created on public.checkins (user_id, created_at desc);
alter table public.checkins enable row level security;

drop policy if exists "checkins: read own" on public.checkins;
create policy "checkins: read own" on public.checkins for select to authenticated using (user_id = auth.uid());
-- Saving requires recorded consent.
drop policy if exists "checkins: insert own with consent" on public.checkins;
create policy "checkins: insert own with consent" on public.checkins for insert to authenticated
  with check (user_id = auth.uid() and exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.health_consent_at is not null));
drop policy if exists "checkins: delete own" on public.checkins;
create policy "checkins: delete own" on public.checkins for delete to authenticated using (user_id = auth.uid());
-- No update policy: saved check-ins are a record; users delete and retake instead.

-- 3. Withdraw consent: deletes all saved check-ins and clears consent. Runs with the caller's rights.
create or replace function public.withdraw_health_consent()
returns void language sql security invoker set search_path = '' as $$
  delete from public.checkins where user_id = auth.uid();
  update public.profiles set health_consent_at = null, consent_version = null where id = auth.uid();
$$;
revoke all on function public.withdraw_health_consent() from public, anon;
grant execute on function public.withdraw_health_consent() to authenticated;

-- 4. Delete my account: removes the auth user; profiles and check-ins cascade.
-- Security definer is needed to delete from auth.users; it only ever deletes the caller.
create or replace function public.delete_my_account()
returns void language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is null then raise exception 'not signed in'; end if;
  delete from auth.users where id = auth.uid();
end;
$$;
revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;

-- 5. Table privileges: only signed-in users, only the operations the policies allow.
revoke all on public.profiles, public.checkins from anon;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, delete on public.checkins to authenticated;
