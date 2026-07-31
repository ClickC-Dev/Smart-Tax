import React from 'react';
export function Radio({ label, checked, onChange, name, disabled }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-body)', fontSize: 'var(--text-body-md)', color: 'var(--text-primary)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}>
      <span style={{ width: 20, height: 20, borderRadius: '50%', border: checked ? '6px solid var(--accent-primary)' : '1.5px solid var(--border-default)',
        background: 'var(--surface-card)', transition: 'all var(--duration-fast) var(--ease-standard)', flexShrink: 0, boxSizing: 'border-box' }} />
      <input type="radio" name={name} checked={checked} onChange={onChange} disabled={disabled} style={{ display: 'none' }} />
      {label}
    </label>
  );
}
