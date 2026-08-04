function Hero() {
  const DS = window.SmartTaxDesignSystem_5b7735;
  const { Button } = DS;
  return (
    <section style={{ background: 'var(--navy-800)', color: '#fff', padding: '90px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 24 }}>
      <div style={{ letterSpacing: 'var(--tracking-widest)', textTransform: 'uppercase', fontSize: 12, color: 'var(--gold-400)' }}>Contabilidade online de alto padrão</div>
      <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 52, lineHeight: 1.1, maxWidth: 680, letterSpacing: 'var(--tracking-tight)' }}>
        Sua contabilidade, sempre em dia.
      </h1>
      <p style={{ margin: 0, maxWidth: 560, fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
        Cuidamos de toda a rotina fiscal da sua empresa — impostos, notas e obrigações — para que você tenha clareza e tranquilidade todos os meses.
      </p>
      <div style={{ display: 'flex', gap: 12 }}>
        <Button variant="gold" size="lg">Fale com um especialista</Button>
        <Button variant="outlineInverse" size="lg">Ver planos</Button>
      </div>
    </section>
  );
}
window.Hero = Hero;
