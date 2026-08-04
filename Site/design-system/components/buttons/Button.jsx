import React from 'react';

const sizeStyles = {
  sm: { padding: '8px 16px', fontSize: 'var(--text-body-sm)', gap: 6 },
  md: { padding: '11px 22px', fontSize: 'var(--text-body-md)', gap: 8 },
  lg: { padding: '14px 28px', fontSize: 'var(--text-body-lg)', gap: 10 },
};

const variantStyles = {
  primary: { background: 'var(--accent-primary)', color: 'var(--text-inverse)', border: '1px solid var(--accent-primary)' },
  gold: { background: 'var(--accent-gold)', color: 'var(--text-inverse)', border: '1px solid var(--accent-gold)' },
  secondary: { background: 'var(--surface-card)', color: 'var(--text-primary)', border: '1px solid var(--border-default)' },
  ghost: { background: 'transparent', color: 'var(--text-primary)', border: '1px solid transparent' },
  outlineInverse: { background: 'transparent', color: 'var(--text-inverse)', border: '1px solid rgba(255,255,255,0.4)' },
};

export function Button({ variant = 'primary', size = 'md', disabled = false, icon = null, iconPosition = 'left', children, onClick, style, ...rest }) {
  const v = variantStyles[variant] || variantStyles.primary;
  const s = sizeStyles[size] || sizeStyles.md;
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: s.gap, fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-semibold)',
        fontSize: s.fontSize, padding: s.padding, borderRadius: 'var(--radius-sm)',
        cursor: disabled ? 'not-allowed' : 'pointer', transition: 'all var(--duration-normal) var(--ease-standard)',
        opacity: disabled ? 0.45 : 1, letterSpacing: 'var(--tracking-tight)',
        ...v, ...style,
      }}
      {...rest}
    >
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </button>
  );
}
