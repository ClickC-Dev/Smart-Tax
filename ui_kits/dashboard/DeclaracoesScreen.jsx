function DeclaracoesScreen() {
  const DS = window.SmartTaxDesignSystem_5b7735;
  const { Card, Badge, Button } = DS;
  const items = [
    { nome: 'Simples Nacional — DAS', venc: '20/08/2026', valor: 'R$ 3.420,00', status: 'A vencer', tone: 'warning' },
    { nome: 'DCTFWeb', venc: '15/08/2026', valor: '—', status: 'Enviado', tone: 'success' },
    { nome: 'eSocial', venc: '07/08/2026', valor: '—', status: 'Enviado', tone: 'success' },
  ];
  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 'var(--text-body-sm)', color: 'var(--text-muted)' }}>Próximo vencimento</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-display-sm)', color: 'var(--text-primary)', margin: '6px 0' }}>DAS — 20 de agosto</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-body-sm)' }}>Simples Nacional · R$ 3.420,00</div>
          </div>
          <Button variant="gold">Pagar agora</Button>
        </div>
      </Card>
      <Card padding={0}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border-subtle)', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>Declarações e guias</div>
        {items.map(it => (
          <div key={it.nome} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 'var(--text-body-md)' }}>{it.nome}</div>
              <div style={{ fontSize: 'var(--text-caption)', color: 'var(--text-muted)' }}>Vencimento {it.venc} · {it.valor}</div>
            </div>
            <Badge tone={it.tone}>{it.status}</Badge>
          </div>
        ))}
      </Card>
    </div>
  );
}
window.DeclaracoesScreen = DeclaracoesScreen;
