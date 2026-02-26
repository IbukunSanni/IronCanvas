-- Storage bucket for artwork
insert into storage.buckets (id, name, public)
values ('artwork', 'artwork', true)
on conflict (id) do nothing;

-- Storage policies
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'artwork_public_read'
  ) then
    create policy "artwork_public_read" on storage.objects
      for select
      using (bucket_id = 'artwork');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'artwork_authenticated_insert'
  ) then
    create policy "artwork_authenticated_insert" on storage.objects
      for insert
      with check (
        bucket_id = 'artwork'
        and auth.role() = 'authenticated'
      );
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'artwork_owner_update'
  ) then
    create policy "artwork_owner_update" on storage.objects
      for update
      using (bucket_id = 'artwork' and auth.uid() = owner)
      with check (bucket_id = 'artwork' and auth.uid() = owner);
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'artwork_owner_delete'
  ) then
    create policy "artwork_owner_delete" on storage.objects
      for delete
      using (bucket_id = 'artwork' and auth.uid() = owner);
  end if;
end $$;
