import React from 'react';
export function Card({ children, padding = 24, elevated = true, style }) {
  return (
    <div style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)',
      boxShadow: elevated ? 'var(--shadow-md)' : 'none', padding, fontFamily: 'var(--font-body)', ...style }}>
      {children}
    </div>
  );
}
