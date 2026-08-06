-- Perfis de usuário, vinculados a auth.users, com departamento de acesso
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  department text not null default 'sem_departamento'
    check (department in ('admin','conteudo','marketing','analytics','sem_departamento')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'Perfil de cada usuário do painel, com o departamento que define o que ele pode acessar.';

-- Funções auxiliares (security definer) para checar permissões sem recursão de RLS
create or replace function public.is_admin()
returns boolean
language sql security definer set search_path = public stable
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and department = 'admin');
$$;

create or replace function public.has_department(dept text)
returns boolean
language sql security definer set search_path = public stable
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and department = dept);
$$;

-- Cria o perfil automaticamente quando um usuário se cadastra.
-- O primeiro usuário criado no sistema vira admin automaticamente.
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, department)
  values (
    new.id,
    new.email,
    case when (select count(*) from public.profiles) = 0 then 'admin' else 'sem_departamento' end
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;

create policy "profiles_select" on public.profiles for select
using (auth.uid() = id or public.is_admin());

create policy "profiles_update" on public.profiles for update
using (auth.uid() = id or public.is_admin());

-- Artigos do blog
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content text,
  cover_image_url text,
  status text not null default 'draft' check (status in ('draft','published')),
  author_id uuid references public.profiles(id),
  seo_title text,
  seo_description text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.posts is 'Artigos do blog institucional, publicados em /blog no site principal.';

create trigger posts_set_updated_at before update on public.posts
for each row execute function public.set_updated_at();

alter table public.posts enable row level security;

create policy "posts_select_published_or_staff" on public.posts for select
using (status = 'published' or public.is_admin() or public.has_department('conteudo'));

create policy "posts_write_staff" on public.posts for all
using (public.is_admin() or public.has_department('conteudo'))
with check (public.is_admin() or public.has_department('conteudo'));

-- Configurações gerais (pixels de marketing, ids de analytics, etc)
create table public.settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default now()
);

comment on table public.settings is 'Configurações do site: pixels do Meta, Google Ads, GA4, GTM, etc.';

create trigger settings_set_updated_at before update on public.settings
for each row execute function public.set_updated_at();

alter table public.settings enable row level security;

-- Leitura pública: os pixels precisam ser lidos pelo site (visitante anônimo) para funcionar
create policy "settings_select_public" on public.settings for select
using (true);

create policy "settings_write_staff" on public.settings for all
using (public.is_admin() or public.has_department('marketing'))
with check (public.is_admin() or public.has_department('marketing'));

insert into public.settings (key, value) values
  ('meta_pixel_id', '{"id": ""}'),
  ('google_ads_id', '{"id": ""}'),
  ('ga4_id', '{"id": ""}'),
  ('gtm_id', '{"id": ""}')
on conflict (key) do nothing;

-- Contador de visitas
create table public.page_views (
  id bigint generated always as identity primary key,
  path text not null,
  referrer text,
  user_agent text,
  session_id text,
  created_at timestamptz not null default now()
);

comment on table public.page_views is 'Registro de visitas do site, uma linha por pageview.';

create index page_views_created_at_idx on public.page_views (created_at desc);
create index page_views_path_idx on public.page_views (path);

alter table public.page_views enable row level security;

-- Inserção pública: o script do site registra o pageview sem estar autenticado
create policy "page_views_insert_public" on public.page_views for insert
with check (true);

create policy "page_views_select_staff" on public.page_views for select
using (public.is_admin() or public.has_department('analytics'));
