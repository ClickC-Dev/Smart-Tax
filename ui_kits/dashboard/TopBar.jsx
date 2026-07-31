function TopBar({ title, subtitle }) {
  return (
    <div style={{ padding: '24px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)' }}>
      <div>
        <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 'var(--text-heading-lg)', fontWeight: 800, color: 'var(--text-primary)' }}>{title}</h1>
        {subtitle && <p style={{ margin: '4px 0 0', fontSize: 'var(--text-body-sm)', color: 'var(--text-muted)' }}>{subtitle}</p>}
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <i data-lucide="bell" style={{ width: 20, height: 20, color: 'var(--text-muted)' }}></i>
        <window.SmartTaxDesignSystem_5b7735.Button variant="gold" size="sm">Enviar documento</window.SmartTaxDesignSystem_5b7735.Button>
      </div>
    </div>
  );
}
window.TopBar = TopBar;
