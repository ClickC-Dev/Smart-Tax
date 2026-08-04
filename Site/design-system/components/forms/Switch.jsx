import React from 'react';
export function Switch({ checked, onChange, label, disabled }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, fontFamily: 'var(--font-body)', fontSize: 'var(--text-body-md)', color: 'var(--text-primary)' }}>
      <span style={{ width: 40, height: 24, borderRadius: 'var(--radius-full)', background: checked ? 'var(--accent-primary)' : 'var(--neutral-300)',
        position: 'relative', transition: 'background var(--duration-normal) var(--ease-standard)', flexShrink: 0 }}>
        <span style={{ position: 'absolute', top: 3, left: checked ? 19 : 3, width: 18, height: 18, borderRadius: '50%', background: '#fff',
          boxShadow: 'var(--shadow-sm)', transition: 'left var(--duration-normal) var(--ease-standard)' }} />
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} style={{ display: 'none' }} />
      {label}
    </label>
  );
}
