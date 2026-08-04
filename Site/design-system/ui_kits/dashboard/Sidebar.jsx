function Sidebar({ active, onNav }) {
  const items = [
    { key: 'home', label: 'Início', icon: 'layout-dashboard' },
    { key: 'docs', label: 'Notas & Documentos', icon: 'file-text' },
    { key: 'declaracoes', label: 'Declarações', icon: 'landmark' },
    { key: 'relatorios', label: 'Relatórios', icon: 'trending-up' },
    { key: 'config', label: 'Configurações', icon: 'settings' },
  ];
  return (
    <div style={{ width: 240, background: 'var(--navy-800)', color: '#fff', display: 'flex', flexDirection: 'column', flexShrink: 0, height: '100%' }}>
      <div style={{ padding: '28px 24px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src="../../assets/logo-mark.png" style={{ height: 30 }} />
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, letterSpacing: 'var(--tracking-tight)' }}>SMART TAX</div>
          <div style={{ fontSize: 9, letterSpacing: 'var(--tracking-widest)', color: 'var(--gold-400)', textTransform: 'uppercase' }}>Contabilidade</div>
        </div>
      </div>
      <div style={{ flex: 1, padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map(it => (
          <button key={it.key} onClick={() => onNav(it.key)} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '11px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
            background: active === it.key ? 'rgba(255,255,255,0.08)' : 'transparent',
            borderLeft: active === it.key ? '2px solid var(--gold-500)' : '2px solid transparent',
            color: active === it.key ? '#fff' : 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, textAlign: 'left' }}>
            <i data-lucide={it.icon} style={{ width: 18, height: 18 }}></i>
            {it.label}
          </button>
        ))}
      </div>
      <div style={{ padding: 20, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--gold-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>MO</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Mariana Oliveira</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Oliveira Tech Ltda</div>
        </div>
      </div>
    </div>
  );
}
window.Sidebar = Sidebar;
