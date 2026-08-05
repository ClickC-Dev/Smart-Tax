'use client';

import { useState } from 'react';
import { Card, Input, Label, Button } from '@/components/ui';
import type { Setting } from '@/lib/types';
import { saveSettings } from './actions';

export function SettingsForm({ settings }: { settings: Setting[] }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const get = (key: string) => settings.find((s) => s.key === key)?.value?.id ?? '';

  async function handleSubmit(formData: FormData) {
    setSaving(true);
    setSaved(false);
    setError(null);
    const result = await saveSettings(formData);
    setSaving(false);
    if (result?.error) setError(result.error);
    else setSaved(true);
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-6">
      <Card>
        <h2 className="text-base mb-1">Meta Ads</h2>
        <p style={{ color: 'var(--text-muted)' }} className="text-sm mb-4">
          Pixel do Facebook/Instagram para rastreamento de conversões.
        </p>
        <Label htmlFor="meta_pixel_id">Meta Pixel ID</Label>
        <Input id="meta_pixel_id" name="meta_pixel_id" defaultValue={get('meta_pixel_id')} placeholder="Ex: 123456789012345" />
      </Card>

      <Card>
        <h2 className="text-base mb-1">Google Ads</h2>
        <p style={{ color: 'var(--text-muted)' }} className="text-sm mb-4">
          ID de conversão do Google Ads.
        </p>
        <Label htmlFor="google_ads_id">Google Ads ID</Label>
        <Input id="google_ads_id" name="google_ads_id" defaultValue={get('google_ads_id')} placeholder="Ex: AW-123456789" />
      </Card>

      <Card>
        <h2 className="text-base mb-1">Google Analytics</h2>
        <p style={{ color: 'var(--text-muted)' }} className="text-sm mb-4">
          GA4 e/ou Google Tag Manager.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="ga4_id">GA4 Measurement ID</Label>
            <Input id="ga4_id" name="ga4_id" defaultValue={get('ga4_id')} placeholder="Ex: G-XXXXXXXXXX" />
          </div>
          <div>
            <Label htmlFor="gtm_id">Google Tag Manager ID</Label>
            <Input id="gtm_id" name="gtm_id" defaultValue={get('gtm_id')} placeholder="Ex: GTM-XXXXXXX" />
          </div>
        </div>
      </Card>

      {error && (
        <div style={{ background: 'var(--danger-100)', color: 'var(--danger-500)' }} className="text-sm px-3 py-2 rounded-[var(--radius-sm)]">
          {error}
        </div>
      )}
      {saved && !error && (
        <div style={{ background: 'var(--success-100)', color: 'var(--success-500)' }} className="text-sm px-3 py-2 rounded-[var(--radius-sm)]">
          Configurações salvas.
        </div>
      )}

      <div>
        <Button type="submit" disabled={saving}>
          {saving ? 'Salvando…' : 'Salvar configurações'}
        </Button>
      </div>
    </form>
  );
}
