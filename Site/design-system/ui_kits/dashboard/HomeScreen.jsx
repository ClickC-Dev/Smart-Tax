function HomeScreen() {
  const DS = window.SmartTaxDesignSystem_5b7735;
  const { Card, Badge } = DS;
  const kpis = [
    { label: 'Faturamento (mês)', value: 'R$ 48.200,00', tone: 'success' },
    { label: 'Impostos a pagar', value: 'R$ 6.940,00', tone: 'warning' },
    { label: 'Documentos pendentes', value: '3', tone: 'danger' },
  ];
  const rows = [
    { doc: 'NF-e 00123', tipo: 'Nota fiscal', data: '02/07/2026', status: 'Processado', tone: 'success' },
    { doc: 'DAS Simples', tipo: 'Guia de imposto', data: '05/07/2026', status: 'Pendente', tone: 'warning' },
    { doc: 'NF-e 00124', tipo: 'Nota fiscal', data: '08/07/2026', status: 'Processado', tone: 'success' },
    { doc: 'Folha de pagamento', tipo: 'Relatório', data: '10/07/2026', status: 'Atrasado', tone: 'danger' },
  ];
  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        {kpis.map(k => (
          <Card key={k.label}>
            <div style={{ fontSize: 'var(--text-body-sm)', color: 'var(--text-muted)' }}>{k.label}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-display-sm)', color: 'var(--text-primary)', margin: '6px 0 10px' }}>{k.value}</div>
            <Badge tone={k.tone}>{k.tone === 'success' ? 'Em dia' : k.tone === 'warning' ? 'Atenção' : 'Ação necessária'}</Badge>
          </Card>
        ))}
      </div>
      <Card padding={0}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border-subtle)', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>Atividade recente</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-body-sm)' }}>
          <tbody>
            {rows.map(r => (
              <tr key={r.doc} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '14px 24px', color: 'var(--text-primary)', fontWeight: 600 }}>{r.doc}</td>
                <td style={{ padding: '14px 24px', color: 'var(--text-secondary)' }}>{r.tipo}</td>
                <td style={{ padding: '14px 24px', color: 'var(--text-muted)' }}>{r.data}</td>
                <td style={{ padding: '14px 24px' }}><Badge tone={r.tone}>{r.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
window.HomeScreen = HomeScreen;
