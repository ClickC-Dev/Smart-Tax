import React from 'react';
export function Checkbox({ label, checked, onChange, disabled }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-body)', fontSize: 'var(--text-body-md)', color: 'var(--text-primary)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}>
      <span style={{ width: 20, height: 20, borderRadius: 'var(--radius-xs)', border: checked ? 'none' : '1.5px solid var(--border-default)',
        background: checked ? 'var(--accent-primary)' : 'var(--surface-card)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all var(--duration-fast) var(--ease-standard)', flexShrink: 0 }}>
        {checked && <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.2 8.5L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} style={{ display: 'none' }} />
      {label}
    </label>
  );
}
