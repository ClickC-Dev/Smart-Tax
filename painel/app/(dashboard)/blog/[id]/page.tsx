import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { PageHeader } from '@/components/ui';
import { PostForm } from '../PostForm';
import type { Post } from '@/lib/types';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase.from('posts').select('*').eq('id', id).single<Post>();

  if (!post) notFound();

  return (
    <div>
      <PageHeader title="Editar artigo" />
      <PostForm post={post} />
    </div>
  );
}
