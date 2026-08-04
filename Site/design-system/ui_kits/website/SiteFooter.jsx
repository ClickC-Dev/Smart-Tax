function SiteFooter() {
  return (
    <footer style={{ background: 'var(--navy-900)', color: 'rgba(255,255,255,0.6)', padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
      <div>© 2026 Smart Tax Contabilidade. Todos os direitos reservados.</div>
      <div style={{ display: 'flex', gap: 20 }}>
        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacidade</a>
        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Termos</a>
      </div>
    </footer>
  );
}
window.SiteFooter = SiteFooter;
