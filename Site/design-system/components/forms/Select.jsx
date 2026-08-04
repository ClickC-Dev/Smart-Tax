import React from 'react';
export function Select({ label, value, onChange, options = [], disabled, style }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-body)', ...style }}>
      {label && <span style={{ fontSize: 'var(--text-body-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-secondary)' }}>{label}</span>}
      <select value={value} onChange={onChange} disabled={disabled}
        style={{ padding: '11px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-default)',
          background: 'var(--surface-card)', fontFamily: 'inherit', fontSize: 'var(--text-body-md)', color: 'var(--text-primary)',
          opacity: disabled ? 0.55 : 1, outline: 'none' }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );
}
