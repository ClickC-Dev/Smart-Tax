import { createClient } from '@/lib/supabase/server';
import { PageHeader, Card, StatCard } from '@/components/ui';
import { ViewsChart } from './Chart';

export default async function AnalyticsPage() {
  const supabase = await createClient();

  const since = new Date(Date.now() - 13 * 24 * 60 * 60 * 1000);
  since.setHours(0, 0, 0, 0);

  const { data: rows } = await supabase
    .from('page_views')
    .select('path, created_at')
    .gte('created_at', since.toISOString())
    .order('created_at', { ascending: true });

  const byDay = new Map<string, number>();
  const byPath = new Map<string, number>();
  for (let i = 0; i < 14; i++) {
    const d = new Date(since);
    d.setDate(d.getDate() + i);
    byDay.set(d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }), 0);
  }

  for (const row of rows ?? []) {
    const day = new Date(row.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    byDay.set(day, (byDay.get(day) ?? 0) + 1);
    byPath.set(row.path, (byPath.get(row.path) ?? 0) + 1);
  }

  const chartData = Array.from(byDay.entries()).map(([day, views]) => ({ day, views }));
  const topPages = Array.from(byPath.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  const total = rows?.length ?? 0;
  const todayKey = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  const today = byDay.get(todayKey) ?? 0;

  return (
    <div>
      <PageHeader title="Analytics" description="Visitas registradas no site institucional." />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="Hoje" value={today} />
        <StatCard label="Últimos 14 dias" value={total} />
        <StatCard label="Páginas com visitas" value={byPath.size} />
      </div>

      <Card className="mb-6">
        <h2 className="text-base mb-4">Visitas por dia</h2>
        <ViewsChart data={chartData} />
      </Card>

      <Card padding={0}>
        <h2 className="text-base px-6 pt-5 pb-3">Páginas mais visitadas</h2>
        {topPages.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }} className="text-sm px-6 pb-5">
            Nenhuma visita registrada ainda.
          </p>
        ) : (
          <table className="w-full text-sm">
            <tbody>
              {topPages.map(([path, count]) => (
                <tr key={path} style={{ borderTop: '1px solid var(--border-subtle)' }}>
                  <td className="px-6 py-3" style={{ color: 'var(--text-primary)' }}>
                    {path}
                  </td>
                  <td className="px-6 py-3 text-right" style={{ color: 'var(--text-secondary)' }}>
                    {count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
