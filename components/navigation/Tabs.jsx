import React from 'react';
export function Tabs({ items = [], active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--border-subtle)', fontFamily: 'var(--font-body)' }}>
      {items.map(it => (
        <button key={it.value} onClick={() => onChange && onChange(it.value)}
          style={{ padding: '10px 16px', border: 'none', background: 'none', cursor: 'pointer',
            fontSize: 'var(--text-body-md)', fontWeight: 'var(--weight-semibold)',
            color: active === it.value ? 'var(--navy-800)' : 'var(--text-muted)',
            borderBottom: active === it.value ? '2px solid var(--accent-gold)' : '2px solid transparent',
            marginBottom: -1, transition: 'color var(--duration-fast) var(--ease-standard)' }}>
          {it.label}
        </button>
      ))}
    </div>
  );
}
