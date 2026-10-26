-- =============================================================
-- Portfolio admin panel — database + storage setup
--
-- Run this once in Supabase: Dashboard → SQL Editor → New query
-- → paste everything → Run.
--
-- Before running, replace the email below with the email of the
-- admin account you create in Authentication → Users.
-- =============================================================


-- -------------------------------------------------------------
-- Who is allowed to edit content
-- -------------------------------------------------------------

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
    select coalesce(auth.jwt() ->> 'email', '') = 'husanxonbahodirxonov@gmail.com'
$$;


-- -------------------------------------------------------------
-- Tables
-- -------------------------------------------------------------

create table if not exists public.certificates (
    id          uuid primary key default gen_random_uuid(),
    title       text not null,
    issuer      text,
    issued_on   date,
    image_path  text not null,
    thumb_path  text not null,
    sort_order  integer not null default 0,
    created_at  timestamptz not null default now()
);

create table if not exists public.gallery (
    id          uuid primary key default gen_random_uuid(),
    caption     text,
    event       text,
    taken_on    date,
    image_path  text not null,
    thumb_path  text not null,
    sort_order  integer not null default 0,
    created_at  timestamptz not null default now()
);

create table if not exists public.projects (
    id              uuid primary key default gen_random_uuid(),
    title           text not null,
    description_en  text,
    description_uz  text,
    description_ru  text,
    stack           text[] not null default '{}',
    code_url        text,
    live_url        text,
    image_path      text,
    thumb_path      text,
    sort_order      integer not null default 0,
    created_at      timestamptz not null default now()
);


-- -------------------------------------------------------------
-- Table privileges (newer Supabase projects don't grant these by
-- default). Row Level Security below still decides who may write.
-- -------------------------------------------------------------

grant usage on schema public to anon, authenticated;
grant select on public.certificates, public.gallery, public.projects to anon, authenticated;
grant insert, update, delete on public.certificates, public.gallery, public.projects to authenticated;


-- -------------------------------------------------------------
-- Row Level Security: everyone can read, only the admin can write
-- -------------------------------------------------------------

do $$
declare
    t text;
begin
    foreach t in array array['certificates', 'gallery', 'projects'] loop
        execute format('alter table public.%I enable row level security', t);

        execute format('drop policy if exists "Public read" on public.%I', t);
        execute format('create policy "Public read" on public.%I for select using (true)', t);

        execute format('drop policy if exists "Admin insert" on public.%I', t);
        execute format('create policy "Admin insert" on public.%I for insert to authenticated with check (public.is_admin())', t);

        execute format('drop policy if exists "Admin update" on public.%I', t);
        execute format('create policy "Admin update" on public.%I for update to authenticated using (public.is_admin()) with check (public.is_admin())', t);

        execute format('drop policy if exists "Admin delete" on public.%I', t);
        execute format('create policy "Admin delete" on public.%I for delete to authenticated using (public.is_admin())', t);
    end loop;
end
$$;


-- -------------------------------------------------------------
-- Storage bucket for images (public read, admin write)
-- -------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

drop policy if exists "Media admin insert" on storage.objects;
create policy "Media admin insert" on storage.objects
    for insert to authenticated
    with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "Media admin update" on storage.objects;
create policy "Media admin update" on storage.objects
    for update to authenticated
    using (bucket_id = 'media' and public.is_admin());

drop policy if exists "Media admin delete" on storage.objects;
create policy "Media admin delete" on storage.objects
    for delete to authenticated
    using (bucket_id = 'media' and public.is_admin());


-- -------------------------------------------------------------
-- Seed: the two projects from the resume (skipped if any exist)
-- -------------------------------------------------------------

insert into public.projects (title, description_en, description_uz, description_ru, stack, code_url, live_url, sort_order)
select * from (values
    (
        'Portfolio Website',
        'This site — a responsive portfolio with dark mode, a trilingual interface (EN / UZ / RU), animations and automatic deployment with GitHub Actions.',
        'Ushbu sayt — tungi rejim, uch tilli interfeys (EN / UZ / RU), animatsiyalar va GitHub Actions orqali avtomatik deploy qilinadigan moslashuvchan portfolio.',
        'Этот сайт — адаптивное портфолио с тёмной темой, интерфейсом на трёх языках (EN / UZ / RU), анимациями и автоматическим деплоем через GitHub Actions.',
        array['React', 'Vite', 'Tailwind CSS', 'Supabase', 'GitHub Actions'],
        'https://github.com/Husanxon4407/portfolio-website',
        'https://husanxon4407.github.io/portfolio-website/',
        1
    ),
    (
        'UzChess',
        'A responsive chess-themed interface built from a Figma design.',
        'Figma dizayni asosida yaratilgan shaxmat mavzusidagi moslashuvchan interfeys.',
        'Адаптивный интерфейс на шахматную тематику, свёрстанный по макету Figma.',
        array['Next.js', 'React', 'Figma'],
        null,
        null,
        2
    )
) as seed
where not exists (select 1 from public.projects);
