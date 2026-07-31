import React from 'react';
const tones = {
  success: { background: 'var(--success-500)' },
  warning: { background: 'var(--warning-500)' },
  danger: { background: 'var(--danger-500)' },
  neutral: { background: 'var(--navy-800)' },
};
export function Toast({ tone = 'neutral', children, onClose }) {
  const t = tones[tone] || tones.neutral;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderRadius: 'var(--radius-md)',
      color: '#fff', boxShadow: 'var(--shadow-lg)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-body-sm)', ...t }}>
      <span style={{ flex: 1 }}>{children}</span>
      {onClose && <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', cursor: 'pointer', fontSize: 16 }}>×</button>}
    </div>
  );
}
