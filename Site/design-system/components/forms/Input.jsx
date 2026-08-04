import React from 'react';

const base = {
  fontFamily: 'var(--font-body)', fontSize: 'var(--text-body-md)', color: 'var(--text-primary)',
  padding: '11px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-default)',
  background: 'var(--surface-card)', width: '100%', boxSizing: 'border-box',
  transition: 'border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)',
  outline: 'none',
};

export function Input({ label, placeholder, value, onChange, type = 'text', error, hint, disabled, prefix, style }) {
  const [focused, setFocused] = React.useState(false);
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-body)', ...style }}>
      {label && <span style={{ fontSize: 'var(--text-body-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-secondary)' }}>{label}</span>}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, ...base,
        borderColor: error ? 'var(--danger-500)' : focused ? 'var(--navy-600)' : 'var(--border-default)',
        boxShadow: focused ? '0 0 0 3px rgba(63,113,136,0.15)' : 'none', padding: prefix ? '11px 14px' : base.padding,
        opacity: disabled ? 0.55 : 1 }}>
        {prefix && <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-body-sm)' }}>{prefix}</span>}
        <input type={type} value={value} placeholder={placeholder} disabled={disabled}
          onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ border: 'none', outline: 'none', width: '100%', fontFamily: 'inherit', fontSize: 'inherit', background: 'transparent', color: 'inherit' }} />
      </div>
      {error ? <span style={{ fontSize: 'var(--text-caption)', color: 'var(--danger-500)' }}>{error}</span>
        : hint && <span style={{ fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>{hint}</span>}
    </label>
  );
}
