'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function saveSettings(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const keys = ['meta_pixel_id', 'google_ads_id', 'ga4_id', 'gtm_id'];

  for (const key of keys) {
    const id = String(formData.get(key) || '').trim();
    const { error } = await supabase
      .from('settings')
      .update({ value: { id }, updated_by: user!.id })
      .eq('key', key);
    if (error) return { error: error.message };
  }

  revalidatePath('/marketing');
  return { error: null };
}
