'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import type { Department } from '@/lib/types';

export async function updateDepartment(userId: string, department: Department) {
  const supabase = await createClient();
  const { error } = await supabase.from('profiles').update({ department }).eq('id', userId);

  if (error) return { error: error.message };

  revalidatePath('/usuarios');
  return { error: null };
}
