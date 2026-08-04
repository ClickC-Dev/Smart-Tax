import React from 'react';
export function Tooltip({ label, children }) {
  const [show, setShow] = React.useState(false);
  return (
    <span style={{ position: 'relative', display: 'inline-block' }} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <span style={{ position: 'absolute', bottom: '125%', left: '50%', transform: 'translateX(-50%)', background: 'var(--navy-900)', color: '#fff',
          padding: '6px 10px', borderRadius: 'var(--radius-xs)', fontSize: 'var(--text-caption)', whiteSpace: 'nowrap', fontFamily: 'var(--font-body)',
          boxShadow: 'var(--shadow-md)', zIndex: 50 }}>
          {label}
        </span>
      )}
    </span>
  );
}
