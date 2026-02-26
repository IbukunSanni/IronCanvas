-- Iron Canvas Phase 1 Schema (Supabase)
-- Core tables: users, submissions, critiques, props

-- Enable required extensions
create extension if not exists "uuid-ossp";

-- Users profile table (mirrors Supabase auth.users)
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  email text not null unique,
  created_at timestamptz not null default now()
);

-- Submissions
create table if not exists public.submissions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  image_url text not null,
  exercise_type text not null,
  curriculum_source text,
  lesson_number integer,
  created_at timestamptz not null default now()
);

-- Critiques
create table if not exists public.critiques (
  id uuid primary key default uuid_generate_v4(),
  submission_id uuid not null references public.submissions(id) on delete cascade,
  reviewer_id uuid not null references public.users(id) on delete cascade,
  what_works text not null,
  what_to_improve text not null,
  next_focus text not null,
  created_at timestamptz not null default now()
);

-- Props
create table if not exists public.props (
  id uuid primary key default uuid_generate_v4(),
  submission_id uuid not null references public.submissions(id) on delete cascade,
  giver_id uuid not null references public.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint props_unique_per_user unique (submission_id, giver_id)
);

-- Indexes
create index if not exists submissions_user_id_idx on public.submissions (user_id);
create index if not exists submissions_created_at_idx on public.submissions (created_at desc);
create index if not exists critiques_submission_id_idx on public.critiques (submission_id);
create index if not exists critiques_reviewer_id_idx on public.critiques (reviewer_id);
create index if not exists critiques_created_at_idx on public.critiques (created_at desc);
create index if not exists props_submission_id_idx on public.props (submission_id);
create index if not exists props_giver_id_idx on public.props (giver_id);

-- Row Level Security
alter table public.users enable row level security;
alter table public.submissions enable row level security;
alter table public.critiques enable row level security;
alter table public.props enable row level security;

-- Policies: users
create policy "users_select_all" on public.users
  for select using (true);

create policy "users_insert_self" on public.users
  for insert with check (auth.uid() = id);

create policy "users_update_self" on public.users
  for update using (auth.uid() = id)
  with check (auth.uid() = id);

-- Policies: submissions
create policy "submissions_select_all" on public.submissions
  for select using (true);

create policy "submissions_insert_own" on public.submissions
  for insert with check (auth.uid() = user_id);

create policy "submissions_update_own" on public.submissions
  for update using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "submissions_delete_own" on public.submissions
  for delete using (auth.uid() = user_id);

-- Policies: critiques
create policy "critiques_select_all" on public.critiques
  for select using (true);

create policy "critiques_insert_self" on public.critiques
  for insert with check (auth.uid() = reviewer_id);

create policy "critiques_update_self" on public.critiques
  for update using (auth.uid() = reviewer_id)
  with check (auth.uid() = reviewer_id);

create policy "critiques_delete_self" on public.critiques
  for delete using (auth.uid() = reviewer_id);

-- Policies: props (prevent self-propping at DB level)
create policy "props_select_all" on public.props
  for select using (true);

create policy "props_insert_not_self" on public.props
  for insert with check (
    auth.uid() = giver_id
    and not exists (
      select 1
      from public.submissions s
      where s.id = submission_id
        and s.user_id = auth.uid()
    )
  );

create policy "props_delete_self" on public.props
  for delete using (auth.uid() = giver_id);
