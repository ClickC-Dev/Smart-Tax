import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { PageHeader, Card, Badge, Button } from '@/components/ui';
import type { Post } from '@/lib/types';

export default async function BlogListPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('updated_at', { ascending: false })
    .returns<Post[]>();

  return (
    <div>
      <div className="flex items-start justify-between mb-7">
        <PageHeader title="Blog" description="Artigos publicados em smart-tax.clickc.com.br/blog." />
        <Link href="/blog/novo">
          <Button>Novo artigo</Button>
        </Link>
      </div>

      {!posts || posts.length === 0 ? (
        <Card>
          <p style={{ color: 'var(--text-muted)' }} className="text-sm">
            Nenhum artigo ainda.{' '}
            <Link href="/blog/novo" className="underline">
              Criar o primeiro
            </Link>
            .
          </p>
        </Card>
      ) : (
        <Card padding={0}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <Th>Título</Th>
                <Th>Status</Th>
                <Th>Atualizado</Th>
                <Th />
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td className="px-5 py-3.5">
                    <div style={{ color: 'var(--text-primary)' }} className="font-medium">
                      {post.title}
                    </div>
                    <div style={{ color: 'var(--text-muted)' }} className="text-xs mt-0.5">
                      /blog/{post.slug}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge tone={post.status === 'published' ? 'success' : 'neutral'}>
                      {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5" style={{ color: 'var(--text-secondary)' }}>
                    {new Date(post.updated_at).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <Link href={`/blog/${post.id}`} style={{ color: 'var(--navy-800)' }} className="text-sm font-medium hover:underline">
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}

function Th({ children }: { children?: React.ReactNode }) {
  return (
    <th
      style={{ color: 'var(--text-muted)' }}
      className="text-left text-xs uppercase tracking-wide font-medium px-5 py-3"
    >
      {children}
    </th>
  );
}
