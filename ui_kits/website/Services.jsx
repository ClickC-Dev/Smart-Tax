function Services() {
  const DS = window.SmartTaxDesignSystem_5b7735;
  const { Card } = DS;
  const services = [
    { icon: 'landmark', title: 'Abertura de empresa', desc: 'Do CNPJ ao primeiro faturamento, cuidamos de toda a burocracia.' },
    { icon: 'file-text', title: 'Emissão de notas', desc: 'Notas fiscais emitidas automaticamente, sem atraso.' },
    { icon: 'calculator', title: 'Apuração de impostos', desc: 'Cálculo e guias prontos, sempre dentro do prazo.' },
    { icon: 'shield-check', title: 'Compliance fiscal', desc: 'Acompanhamento contínuo das suas obrigações legais.' },
  ];
  React.useEffect(() => { window.lucide && window.lucide.createIcons(); });
  return (
    <section style={{ padding: '72px 48px', background: 'var(--surface-page)' }}>
      <h2 style={{ textAlign: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 32, color: 'var(--text-primary)', margin: '0 0 40px' }}>Nossos serviços</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, maxWidth: 1100, margin: '0 auto' }}>
        {services.map(s => (
          <Card key={s.title}>
            <i data-lucide={s.icon} style={{ width: 28, height: 28, color: 'var(--gold-600)' }}></i>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, margin: '14px 0 8px', color: 'var(--text-primary)' }}>{s.title}</h3>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{s.desc}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
window.Services = Services;
