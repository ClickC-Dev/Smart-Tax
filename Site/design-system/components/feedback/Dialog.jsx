import React from 'react';
export function Dialog({ open, title, children, onClose, actions }) {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(13,24,31,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-xl)',
        padding: 28, width: 400, maxWidth: '90vw', fontFamily: 'var(--font-body)' }}>
        {title && <h3 style={{ margin: '0 0 12px', fontFamily: 'var(--font-display)', fontSize: 'var(--text-heading-md)', color: 'var(--text-primary)' }}>{title}</h3>}
        <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-body-md)', lineHeight: 'var(--leading-normal)' }}>{children}</div>
        {actions && <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 24 }}>{actions}</div>}
      </div>
    </div>
  );
}
