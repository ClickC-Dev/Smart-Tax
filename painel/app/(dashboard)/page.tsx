import { createClient } from '@/lib/supabase/server';
import { PageHeader, StatCard, Card } from '@/components/ui';
import type { Profile } from '@/lib/types';
import Link from 'next/link';

export default async function OverviewPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user!.id)
    .single<Profile>();

  const dept = profile?.department;
  const canSeeBlog = dept === 'admin' || dept === 'conteudo';
  const canSeeAnalytics = dept === 'admin' || dept === 'analytics';
  const canSeeMarketing = dept === 'admin' || dept === 'marketing';

  const [postsCount, publishedCount, viewsLast7d, pixelSettings] = await Promise.all([
    canSeeBlog
      ? supabase.from('posts').select('id', { count: 'exact', head: true })
      : Promise.resolve({ count: null }),
    canSeeBlog
      ? supabase.from('posts').select('id', { count: 'exact', head: true }).eq('status', 'published')
      : Promise.resolve({ count: null }),
    canSeeAnalytics
      ? supabase
          .from('page_views')
          .select('id', { count: 'exact', head: true })
          .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      : Promise.resolve({ count: null }),
    canSeeMarketing
      ? supabase.from('settings').select('key,value').in('key', ['meta_pixel_id', 'google_ads_id'])
      : Promise.resolve({ data: null }),
  ]);

  const pixelsConfigured =
    'data' in pixelSettings && pixelSettings.data
      ? pixelSettings.data.filter((s) => (s.value as { id?: string })?.id).length
      : 0;

  return (
    <div>
      <PageHeader
        title={`Olá, ${profile?.full_name || profile?.email?.split('@')[0]}`}
        description="Visão geral do painel Smart Tax."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {canSeeBlog && (
          <>
            <StatCard label="Artigos publicados" value={publishedCount.count ?? 0} />
            <StatCard label="Artigos no total" value={postsCount.count ?? 0} hint="incluindo rascunhos" />
          </>
        )}
        {canSeeAnalytics && <StatCard label="Visitas (7 dias)" value={viewsLast7d.count ?? 0} />}
        {canSeeMarketing && (
          <StatCard
            label="Pixels configurados"
            value={`${pixelsConfigured} / 2`}
            hint="Meta Pixel + Google Ads"
          />
        )}
      </div>

      <Card>
        <h2 className="text-base mb-3">Atalhos</h2>
        <div className="flex flex-wrap gap-2">
          {canSeeBlog && <QuickLink href="/blog" label="Gerenciar artigos" />}
          {canSeeMarketing && <QuickLink href="/marketing" label="Configurar pixels" />}
          {canSeeAnalytics && <QuickLink href="/analytics" label="Ver visitas" />}
          {dept === 'admin' && <QuickLink href="/usuarios" label="Gerenciar usuários" />}
        </div>
      </Card>
    </div>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-sm)',
        color: 'var(--text-primary)',
      }}
      className="text-sm font-medium px-3.5 py-2 hover:border-[var(--navy-800)] transition-colors"
    >
      {label} →
    </Link>
  );
}
