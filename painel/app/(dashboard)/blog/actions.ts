'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function createPost(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const title = String(formData.get('title') || '').trim();
  const slugInput = String(formData.get('slug') || '').trim();
  const slug = slugInput ? slugify(slugInput) : slugify(title);

  const { data, error } = await supabase
    .from('posts')
    .insert({
      title,
      slug,
      excerpt: String(formData.get('excerpt') || '') || null,
      content: String(formData.get('content') || '') || null,
      cover_image_url: String(formData.get('cover_image_url') || '') || null,
      seo_title: String(formData.get('seo_title') || '') || null,
      seo_description: String(formData.get('seo_description') || '') || null,
      status: 'draft',
      author_id: user!.id,
    })
    .select('id')
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/blog');
  redirect(`/blog/${data.id}`);
}

export async function updatePost(id: string, formData: FormData) {
  const supabase = await createClient();

  const title = String(formData.get('title') || '').trim();
  const slugInput = String(formData.get('slug') || '').trim();
  const slug = slugInput ? slugify(slugInput) : slugify(title);

  const { error } = await supabase
    .from('posts')
    .update({
      title,
      slug,
      excerpt: String(formData.get('excerpt') || '') || null,
      content: String(formData.get('content') || '') || null,
      cover_image_url: String(formData.get('cover_image_url') || '') || null,
      seo_title: String(formData.get('seo_title') || '') || null,
      seo_description: String(formData.get('seo_description') || '') || null,
    })
    .eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/blog');
  revalidatePath(`/blog/${id}`);
  return { error: null };
}

export async function togglePublish(id: string, publish: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('posts')
    .update({
      status: publish ? 'published' : 'draft',
      published_at: publish ? new Date().toISOString() : null,
    })
    .eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/blog');
  revalidatePath(`/blog/${id}`);
  return { error: null };
}

export async function deletePost(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('posts').delete().eq('id', id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/blog');
  redirect('/blog');
}
