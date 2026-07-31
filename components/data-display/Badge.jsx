import React from 'react';
const tones = {
  neutral: { background: 'var(--neutral-100)', color: 'var(--text-secondary)' },
  success: { background: 'var(--success-100)', color: 'var(--success-500)' },
  warning: { background: 'var(--warning-100)', color: 'var(--warning-500)' },
  danger: { background: 'var(--danger-100)', color: 'var(--danger-500)' },
  info: { background: 'var(--info-100)', color: 'var(--info-500)' },
  gold: { background: 'var(--gold-100)', color: 'var(--gold-800)' },
};
export function Badge({ tone = 'neutral', children }) {
  const t = tones[tone] || tones.neutral;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 'var(--radius-full)',
      fontFamily: 'var(--font-body)', fontSize: 'var(--text-caption)', fontWeight: 'var(--weight-semibold)', ...t }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
      {children}
    </span>
  );
}
