-- Run this in Supabase Dashboard > SQL Editor.
-- This does not create tables. It only grants authenticated users access
-- required by the AutoForge vehicle module while keeping RLS enabled.

grant usage on schema public to authenticated;

grant select on public.car_brands to authenticated;
grant select on public.car_models to authenticated;
grant select on public.car_categories to authenticated;
grant select on public.vehicle_images to authenticated;
grant select, insert, update, delete on public.vehicles to authenticated;

alter table public.car_brands enable row level security;
alter table public.car_models enable row level security;
alter table public.car_categories enable row level security;
alter table public.vehicle_images enable row level security;
alter table public.vehicles enable row level security;

drop policy if exists "Authenticated users can read car brands" on public.car_brands;
create policy "Authenticated users can read car brands"
  on public.car_brands for select to authenticated using (true);

drop policy if exists "Authenticated users can read car models" on public.car_models;
create policy "Authenticated users can read car models"
  on public.car_models for select to authenticated using (true);

drop policy if exists "Authenticated users can read car categories" on public.car_categories;
create policy "Authenticated users can read car categories"
  on public.car_categories for select to authenticated using (true);

drop policy if exists "Authenticated users can read vehicle images" on public.vehicle_images;
create policy "Authenticated users can read vehicle images"
  on public.vehicle_images for select to authenticated using (true);

drop policy if exists "Authenticated users can read vehicles" on public.vehicles;
create policy "Authenticated users can read vehicles"
  on public.vehicles for select to authenticated using (true);

drop policy if exists "Authenticated users can create vehicles" on public.vehicles;
create policy "Authenticated users can create vehicles"
  on public.vehicles for insert to authenticated with check (true);

drop policy if exists "Authenticated users can update vehicles" on public.vehicles;
create policy "Authenticated users can update vehicles"
  on public.vehicles for update to authenticated using (true) with check (true);

drop policy if exists "Authenticated users can delete vehicles" on public.vehicles;
create policy "Authenticated users can delete vehicles"
  on public.vehicles for delete to authenticated using (true);