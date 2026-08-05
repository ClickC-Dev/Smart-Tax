'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Input, Textarea, Label, Button, Badge } from '@/components/ui';
import type { Post } from '@/lib/types';
import { createPost, updatePost, togglePublish, deletePost } from './actions';

export function PostForm({ post }: { post?: Post }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);

  async function handleSubmit(formData: FormData) {
    setSaving(true);
    setError(null);
    const result = post ? await updatePost(post.id, formData) : await createPost(formData);
    setSaving(false);
    if (result?.error) setError(result.error);
  }

  async function handleTogglePublish() {
    if (!post) return;
    setPublishing(true);
    const result = await togglePublish(post.id, post.status !== 'published');
    setPublishing(false);
    if (result?.error) setError(result.error);
    else router.refresh();
  }

  async function handleDelete() {
    if (!post) return;
    if (!confirm('Excluir este artigo definitivamente?')) return;
    await deletePost(post.id);
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-6">
      {post && (
        <div className="flex items-center justify-between">
          <Badge tone={post.status === 'published' ? 'success' : 'neutral'}>
            {post.status === 'published' ? 'Publicado' : 'Rascunho'}
          </Badge>
          <div className="flex gap-2">
            <Button type="button" variant="secondary" onClick={handleTogglePublish} disabled={publishing}>
              {post.status === 'published' ? 'Despublicar' : 'Publicar'}
            </Button>
            <Button type="button" variant="danger" onClick={handleDelete}>
              Excluir
            </Button>
          </div>
        </div>
      )}

      <Card>
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input id="title" name="title" required defaultValue={post?.title} placeholder="Título do artigo" />
          </div>
          <div>
            <Label htmlFor="slug">URL (slug)</Label>
            <Input
              id="slug"
              name="slug"
              defaultValue={post?.slug}
              placeholder="gerado automaticamente a partir do título, se vazio"
            />
          </div>
          <div>
            <Label htmlFor="excerpt">Resumo</Label>
            <Textarea id="excerpt" name="excerpt" rows={2} defaultValue={post?.excerpt ?? ''} placeholder="Resumo curto exibido na listagem" />
          </div>
          <div>
            <Label htmlFor="content">Conteúdo (Markdown)</Label>
            <Textarea id="content" name="content" rows={16} defaultValue={post?.content ?? ''} placeholder="Escreva o artigo em markdown…" />
          </div>
          <div>
            <Label htmlFor="cover_image_url">Imagem de capa (URL)</Label>
            <Input id="cover_image_url" name="cover_image_url" defaultValue={post?.cover_image_url ?? ''} placeholder="https://…" />
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-base mb-4">SEO</h2>
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="seo_title">Título para SEO</Label>
            <Input id="seo_title" name="seo_title" defaultValue={post?.seo_title ?? ''} />
          </div>
          <div>
            <Label htmlFor="seo_description">Descrição para SEO</Label>
            <Textarea id="seo_description" name="seo_description" rows={2} defaultValue={post?.seo_description ?? ''} />
          </div>
        </div>
      </Card>

      {error && (
        <div style={{ background: 'var(--danger-100)', color: 'var(--danger-500)' }} className="text-sm px-3 py-2 rounded-[var(--radius-sm)]">
          {error}
        </div>
      )}

      <div>
        <Button type="submit" disabled={saving}>
          {saving ? 'Salvando…' : post ? 'Salvar alterações' : 'Criar artigo'}
        </Button>
      </div>
    </form>
  );
}
