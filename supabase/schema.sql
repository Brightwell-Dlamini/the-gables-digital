-- The Gables Digital — Supabase schema
-- Run this in the Supabase SQL editor once. Safe to re-run (IF NOT EXISTS).

create extension if not exists "pgcrypto";

create table if not exists public.stores (
  id text primary key,
  name text not null,
  shop_number text not null default '—',
  category text not null default 'Other',
  phone text,
  email text,
  description text,
  map_x numeric,
  map_y numeric,
  image_url text,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id text primary key,
  title text not null,
  date text not null,
  description text not null default '',
  tag text,
  image_url text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.showtimes (
  id text primary key,
  title text not null,
  rating text not null default 'PG',
  times text[] not null default '{}',
  genre text,
  image_url text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.promotions (
  id text primary key,
  title text not null,
  summary text not null default '',
  tag text not null default 'Offer',
  href text,
  image_url text,
  featured boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.leasing_applications (
  id text primary key,
  created_at timestamptz not null default now(),
  persona text not null default '',
  space_size text not null default '',
  name text not null,
  email text not null,
  phone text,
  company text,
  message text,
  file_name text,
  status text not null default 'new'
    check (status in ('new','in_review','shortlisted','offer','declined')),
  notes text
);

create table if not exists public.contact_messages (
  id text primary key,
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  subject text not null default 'general',
  message text not null,
  status text not null default 'unread'
    check (status in ('unread','read','archived'))
);

create table if not exists public.site_settings (
  id text primary key default 'default',
  hours jsonb not null default '{"monFri":"09:00 – 17:00","saturday":"09:00 – 14:00","sunday":"09:00 – 13:00"}'::jsonb,
  contact jsonb not null default '{"phone":"+268 2416 1600","email":"info@thegables.co.sz","address":"MR103, Shebas Rocks, Ezulwini, Eswatini"}'::jsonb,
  theme jsonb not null default '{"mode":"auto","themeId":"default","schedule":[]}'::jsonb,
  show_movie_zone boolean not null default true,
  show_promotions boolean not null default true,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id) values ('default')
  on conflict (id) do nothing;

create table if not exists public.media_assets (
  id text primary key,
  slot text not null unique,
  label text not null,
  kind text not null default 'image' check (kind in ('image','video')),
  url text not null,
  poster_url text,
  alt text,
  updated_at timestamptz not null default now()
);

insert into public.media_assets (id, slot, label, kind, url, poster_url, alt) values
  ('media-hero-video', 'hero_video', 'Homepage hero video', 'video',
   'https://cdn.coverr.co/videos/coverr-shopping-mall-exterior-5644/1080p.mp4',
   'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80',
   'Open-air retail at The Gables'),
  ('media-hero-poster', 'hero_poster', 'Homepage hero poster', 'image',
   'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80',
   null, 'The Gables Shopping Centre'),
  ('media-about', 'about_hero', 'About page hero', 'image',
   'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80',
   null, 'Valley lifestyle at The Gables'),
  ('media-leasing', 'leasing_hero', 'Leasing page visual', 'image',
   'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80',
   null, 'Retail space at The Gables')
on conflict (id) do nothing;

alter table public.stores enable row level security;
alter table public.events enable row level security;
alter table public.showtimes enable row level security;
alter table public.promotions enable row level security;
alter table public.leasing_applications enable row level security;
alter table public.contact_messages enable row level security;
alter table public.site_settings enable row level security;
alter table public.media_assets enable row level security;

create policy if not exists "public_read_stores" on public.stores for select using (published = true);
create policy if not exists "public_read_events" on public.events for select using (published = true);
create policy if not exists "public_read_showtimes" on public.showtimes for select using (published = true);
create policy if not exists "public_read_promotions" on public.promotions for select using (published = true);
create policy if not exists "public_read_media" on public.media_assets for select using (true);
create policy if not exists "public_read_settings" on public.site_settings for select using (true);
create policy if not exists "public_insert_leasing" on public.leasing_applications for insert with check (true);
create policy if not exists "public_insert_messages" on public.contact_messages for insert with check (true);
