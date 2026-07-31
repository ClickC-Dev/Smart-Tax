import React from 'react';
export function Tag({ children, onRemove }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 'var(--radius-sm)',
      background: 'var(--neutral-100)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)',
      fontFamily: 'var(--font-body)', fontSize: 'var(--text-body-sm)' }}>
      {children}
      {onRemove && <button onClick={onRemove} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, color: 'var(--text-muted)', fontSize: 14, lineHeight: 1 }}>×</button>}
    </span>
  );
}
