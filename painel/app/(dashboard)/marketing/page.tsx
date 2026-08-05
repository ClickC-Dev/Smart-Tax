import { createClient } from '@/lib/supabase/server';
import { PageHeader } from '@/components/ui';
import { SettingsForm } from './SettingsForm';
import type { Setting } from '@/lib/types';

export default async function MarketingPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from('settings').select('*').returns<Setting[]>();

  return (
    <div>
      <PageHeader title="Marketing" description="Pixels de rastreamento usados no site institucional." />
      <SettingsForm settings={settings ?? []} />
    </div>
  );
}
