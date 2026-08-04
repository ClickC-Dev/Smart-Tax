function Plans() {
  const DS = window.SmartTaxDesignSystem_5b7735;
  const { Card, Button, Badge } = DS;
  const plans = [
    { name: 'Essencial', price: 'R$ 249/mês', desc: 'Para MEI e autônomos.', features: ['Emissão de notas', 'Guia mensal de impostos', 'Suporte por e-mail'] },
    { name: 'Profissional', price: 'R$ 549/mês', desc: 'Para pequenas empresas.', features: ['Tudo do Essencial', 'Folha de pagamento', 'Suporte prioritário'], highlight: true },
    { name: 'Empresarial', price: 'Sob consulta', desc: 'Para operações maiores.', features: ['Tudo do Profissional', 'Contador dedicado', 'Relatórios personalizados'] },
  ];
  return (
    <section style={{ padding: '72px 48px', background: 'var(--neutral-50)' }}>
      <h2 style={{ textAlign: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 32, color: 'var(--text-primary)', margin: '0 0 40px' }}>Planos</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, maxWidth: 1000, margin: '0 auto' }}>
        {plans.map(p => (
          <Card key={p.name} style={p.highlight ? { border: '2px solid var(--gold-500)', boxShadow: 'var(--shadow-gold-glow)' } : {}}>
            {p.highlight && <Badge tone="gold">Mais popular</Badge>}
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, margin: '12px 0 4px', color: 'var(--text-primary)' }}>{p.name}</h3>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, color: 'var(--navy-800)', margin: '4px 0 6px' }}>{p.price}</div>
            <p style={{ margin: '0 0 16px', fontSize: 14, color: 'var(--text-muted)' }}>{p.desc}</p>
            <ul style={{ margin: '0 0 20px', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {p.features.map(f => <li key={f} style={{ fontSize: 14, color: 'var(--text-secondary)' }}>✓ {f}</li>)}
            </ul>
            <Button variant={p.highlight ? 'gold' : 'secondary'} style={{ width: '100%' }}>Escolher plano</Button>
          </Card>
        ))}
      </div>
    </section>
  );
}
window.Plans = Plans;
