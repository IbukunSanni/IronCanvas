import { supabase } from '@/lib/supabaseClient';

const BUCKET_NAME = 'artwork';

export async function uploadArtwork(file: File, userId: string) {
  const fileExt = file.name.split('.').pop();
  const filePath = `${userId}/${crypto.randomUUID()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

  if (!data.publicUrl) {
    throw new Error('Failed to get public URL for upload.');
  }

  return data.publicUrl;
}
