alter table public.profiles
  add column if not exists phone text,
  add column if not exists state text,
  add column if not exists city text,
  add column if not exists parish text,
  add column if not exists ministry text;

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
    ministry
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.email),
    new.raw_user_meta_data ->> 'phone',
    new.raw_user_meta_data ->> 'state',
    new.raw_user_meta_data ->> 'city',
    new.raw_user_meta_data ->> 'parish',
    new.raw_user_meta_data ->> 'ministry'
  )
  on conflict (id) do update
  set display_name = excluded.display_name,
      phone = excluded.phone,
      state = excluded.state,
      city = excluded.city,
      parish = excluded.parish,
      ministry = excluded.ministry;

  return new;
end;
$$;
