alter table public.profiles
  add column if not exists family text,
  add column if not exists jurisdiction text;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    display_name,
    phone,
    state,
    city,
    parish,
    ministry,
    family,
    jurisdiction
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.email),
    new.raw_user_meta_data ->> 'phone',
    new.raw_user_meta_data ->> 'state',
    new.raw_user_meta_data ->> 'city',
    new.raw_user_meta_data ->> 'parish',
    new.raw_user_meta_data ->> 'ministry',
    new.raw_user_meta_data ->> 'family',
    new.raw_user_meta_data ->> 'jurisdiction'
  )
  on conflict (id) do update
  set display_name = excluded.display_name,
      phone = excluded.phone,
      state = excluded.state,
      city = excluded.city,
      parish = excluded.parish,
      ministry = excluded.ministry,
      family = excluded.family,
      jurisdiction = excluded.jurisdiction;

  return new;
end;
$$;
