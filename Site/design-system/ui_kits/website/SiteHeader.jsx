function SiteHeader() {
  const DS = window.SmartTaxDesignSystem_5b7735;
  const { Button } = DS;
  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 48px', background: 'var(--navy-800)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src="../../assets/logo-mark.png" style={{ height: 32 }} />
        <div style={{ color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16 }}>SMART TAX</div>
      </div>
      <nav style={{ display: 'flex', gap: 32, fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>
        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Serviços</a>
        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Sobre</a>
        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Planos</a>
        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Contato</a>
      </nav>
      <Button variant="gold" size="sm">Fale conosco</Button>
    </header>
  );
}
window.SiteHeader = SiteHeader;
