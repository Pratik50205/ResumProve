-- ==============================================================================
-- ResumProve Database Schema (PostgreSQL + Supabase)
-- Fact-Lock™ AI Resume Intelligence Platform
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ==============================================================================
-- 1. PROFILES (Extends Supabase auth.users)
-- ==============================================================================
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  plan text default 'free' check (plan in ('free', 'pro', 'enterprise')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- ==============================================================================
-- 2. RESUMES (Full resume state documents)
-- ==============================================================================
create table if not exists public.resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null default 'My Resume',
  slug text,
  template text not null default 'ats-minimal',
  resume_data jsonb not null default '{}'::jsonb,
  completeness_score integer default 0,
  is_primary boolean default false,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Index for user's resumes
create index if not exists resumes_user_id_idx on public.resumes(user_id);
create index if not exists resumes_updated_at_idx on public.resumes(updated_at desc);

-- ==============================================================================
-- 3. RESUME VERSIONS (Snapshots for rollback and audit trail)
-- ==============================================================================
create table if not exists public.resume_versions (
  id uuid primary key default gen_random_uuid(),
  resume_id uuid references public.resumes(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  version_number integer not null,
  snapshot jsonb not null,
  change_summary text,
  created_at timestamptz default now() not null
);

create index if not exists resume_versions_resume_id_idx on public.resume_versions(resume_id, version_number desc);

-- ==============================================================================
-- 4. JOB DESCRIPTIONS (Target job postings for optimization)
-- ==============================================================================
create table if not exists public.job_descriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  company text,
  location text,
  raw_text text not null,
  parsed_requirements jsonb default '{}'::jsonb,
  seniority_level text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create index if not exists job_descriptions_user_id_idx on public.job_descriptions(user_id);

-- ==============================================================================
-- 5. COMPATIBILITY ANALYSES (ATS match scores & keyword gap audits)
-- ==============================================================================
create table if not exists public.compatibility_analyses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  resume_id uuid references public.resumes(id) on delete cascade not null,
  job_id uuid references public.job_descriptions(id) on delete set null,
  overall_score integer not null,
  breakdown jsonb not null default '{}'::jsonb,
  matched_skills text[] default '{}',
  missing_skills text[] default '{}',
  recommendations jsonb default '[]'::jsonb,
  created_at timestamptz default now() not null
);

create index if not exists comp_analyses_resume_user_idx on public.compatibility_analyses(resume_id, user_id);

-- ==============================================================================
-- 6. PROOF ANALYSES (Fact-Lock™ Evidence Verification audits)
-- ==============================================================================
create table if not exists public.proof_analyses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  resume_id uuid references public.resumes(id) on delete cascade not null,
  proof_score integer not null,
  evidence_breakdown jsonb not null default '{}'::jsonb,
  unbacked_claims jsonb default '[]'::jsonb,
  verified_claims jsonb default '[]'::jsonb,
  created_at timestamptz default now() not null
);

create index if not exists proof_analyses_resume_user_idx on public.proof_analyses(resume_id, user_id);

-- ==============================================================================
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

alter table public.profiles enable row level security;
alter table public.resumes enable row level security;
alter table public.resume_versions enable row level security;
alter table public.job_descriptions enable row level security;
alter table public.compatibility_analyses enable row level security;
alter table public.proof_analyses enable row level security;

-- Profiles: Users can view and update their own profile
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Resumes: Users have full CRUD on their own resumes
create policy "Users can view own resumes" on public.resumes
  for select using (auth.uid() = user_id);

create policy "Users can insert own resumes" on public.resumes
  for insert with check (auth.uid() = user_id);

create policy "Users can update own resumes" on public.resumes
  for update using (auth.uid() = user_id);

create policy "Users can delete own resumes" on public.resumes
  for delete using (auth.uid() = user_id);

-- Resume Versions: Users have full CRUD on their versions
create policy "Users can view own resume versions" on public.resume_versions
  for select using (auth.uid() = user_id);

create policy "Users can insert own resume versions" on public.resume_versions
  for insert with check (auth.uid() = user_id);

create policy "Users can delete own resume versions" on public.resume_versions
  for delete using (auth.uid() = user_id);

-- Job Descriptions: Users have full CRUD on their target jobs
create policy "Users can view own job descriptions" on public.job_descriptions
  for select using (auth.uid() = user_id);

create policy "Users can insert own job descriptions" on public.job_descriptions
  for insert with check (auth.uid() = user_id);

create policy "Users can update own job descriptions" on public.job_descriptions
  for update using (auth.uid() = user_id);

create policy "Users can delete own job descriptions" on public.job_descriptions
  for delete using (auth.uid() = user_id);

-- Compatibility Analyses: Users can view and create analyses
create policy "Users can view own compatibility analyses" on public.compatibility_analyses
  for select using (auth.uid() = user_id);

create policy "Users can insert own compatibility analyses" on public.compatibility_analyses
  for insert with check (auth.uid() = user_id);

-- Proof Analyses: Users can view and create proof analyses
create policy "Users can view own proof analyses" on public.proof_analyses
  for select using (auth.uid() = user_id);

create policy "Users can insert own proof analyses" on public.proof_analyses
  for insert with check (auth.uid() = user_id);

-- ==============================================================================
-- 8. AUTOMATIC PROFILE CREATION TRIGGER
-- ==============================================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to execute on auth.users insert
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Updated_at timestamp refresher trigger
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_resumes_updated_at
  before update on public.resumes
  for each row execute procedure public.update_updated_at_column();

create trigger update_job_descriptions_updated_at
  before update on public.job_descriptions
  for each row execute procedure public.update_updated_at_column();

