export function Card({
  children,
  className = '',
  padding = 24,
}: {
  children: React.ReactNode;
  className?: string;
  padding?: number;
}) {
  return (
    <div
      style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        padding,
      }}
      className={className}
    >
      {children}
    </div>
  );
}

export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-7">
      <h1 style={{ color: 'var(--text-primary)' }} className="text-2xl">
        {title}
      </h1>
      {description && (
        <p style={{ color: 'var(--text-secondary)' }} className="text-sm mt-1.5">
          {description}
        </p>
      )}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <Card>
      <div style={{ color: 'var(--text-muted)' }} className="text-xs uppercase tracking-wide font-medium">
        {label}
      </div>
      <div
        style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
        className="text-3xl font-extrabold mt-2"
      >
        {value}
      </div>
      {hint && (
        <div style={{ color: 'var(--text-muted)' }} className="text-xs mt-1.5">
          {hint}
        </div>
      )}
    </Card>
  );
}

export function Button({
  children,
  variant = 'primary',
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' }) {
  const styles: Record<string, React.CSSProperties> = {
    primary: { background: 'var(--accent-gold)', color: '#fff', border: '1px solid var(--accent-gold)' },
    secondary: { background: '#fff', color: 'var(--text-primary)', border: '1px solid var(--border-default)' },
    danger: { background: 'var(--danger-500)', color: '#fff', border: '1px solid var(--danger-500)' },
  };
  return (
    <button
      {...rest}
      style={{
        ...styles[variant],
        borderRadius: 'var(--radius-sm)',
        fontWeight: 600,
        padding: '9px 16px',
        fontSize: 14,
        opacity: rest.disabled ? 0.6 : 1,
        ...rest.style,
      }}
      className={`transition hover:brightness-95 ${rest.className ?? ''}`}
    >
      {children}
    </button>
  );
}

export function Badge({ tone = 'neutral', children }: { tone?: 'neutral' | 'gold' | 'success'; children: React.ReactNode }) {
  const styles: Record<string, React.CSSProperties> = {
    neutral: { background: 'var(--neutral-100)', color: 'var(--text-secondary)' },
    gold: { background: 'var(--gold-100)', color: 'var(--gold-800)' },
    success: { background: 'var(--success-100)', color: 'var(--success-500)' },
  };
  return (
    <span
      style={{ ...styles[tone], borderRadius: 'var(--radius-full, 999px)', padding: '2px 10px', fontSize: 12, fontWeight: 600 }}
    >
      {children}
    </span>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{ borderColor: 'var(--border-default)', borderRadius: 'var(--radius-sm)', ...props.style }}
      className={`border px-3 py-2 text-sm outline-none focus:border-[var(--navy-800)] w-full ${props.className ?? ''}`}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      style={{ borderColor: 'var(--border-default)', borderRadius: 'var(--radius-sm)', ...props.style }}
      className={`border px-3 py-2 text-sm outline-none focus:border-[var(--navy-800)] w-full ${props.className ?? ''}`}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      style={{ borderColor: 'var(--border-default)', borderRadius: 'var(--radius-sm)', ...props.style }}
      className={`border px-3 py-2 text-sm outline-none focus:border-[var(--navy-800)] w-full bg-white ${props.className ?? ''}`}
    />
  );
}

export function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} style={{ color: 'var(--text-secondary)' }} className="text-sm font-medium block mb-1.5">
      {children}
    </label>
  );
}
