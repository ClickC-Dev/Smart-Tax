function DocsScreen() {
  const DS = window.SmartTaxDesignSystem_5b7735;
  const { Card, Badge, Tag, Button, Tabs } = DS;
  const [tab, setTab] = React.useState('todos');
  const docs = [
    { nome: 'NF-e 00123.pdf', tipo: 'Nota fiscal', tamanho: '212 KB', status: 'Processado', tone: 'success' },
    { nome: 'DAS_julho.pdf', tipo: 'Guia de imposto', tamanho: '88 KB', status: 'Pendente', tone: 'warning' },
    { nome: 'Recibo_aluguel.pdf', tipo: 'Despesa', tamanho: '140 KB', status: 'Processado', tone: 'success' },
    { nome: 'Folha_junho.xlsx', tipo: 'Folha de pagamento', tamanho: '54 KB', status: 'Atrasado', tone: 'danger' },
  ];
  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Tabs items={[{ value: 'todos', label: 'Todos' }, { value: 'pendentes', label: 'Pendentes' }, { value: 'notas', label: 'Notas fiscais' }]} active={tab} onChange={setTab} />
        <div style={{ display: 'flex', gap: 8 }}>
          <Tag>Julho 2026</Tag>
          <Tag>PJ</Tag>
        </div>
      </div>
      <Card padding={0}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-body-sm)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', textAlign: 'left' }}>
              <th style={{ padding: '12px 24px', fontWeight: 600 }}>Documento</th>
              <th style={{ padding: '12px 24px', fontWeight: 600 }}>Tipo</th>
              <th style={{ padding: '12px 24px', fontWeight: 600 }}>Tamanho</th>
              <th style={{ padding: '12px 24px', fontWeight: 600 }}>Status</th>
              <th style={{ padding: '12px 24px' }}></th>
            </tr>
          </thead>
          <tbody>
            {docs.map(d => (
              <tr key={d.nome} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '14px 24px', color: 'var(--text-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <i data-lucide="file-text" style={{ width: 16, height: 16, color: 'var(--text-muted)' }}></i>{d.nome}
                </td>
                <td style={{ padding: '14px 24px', color: 'var(--text-secondary)' }}>{d.tipo}</td>
                <td style={{ padding: '14px 24px', color: 'var(--text-muted)' }}>{d.tamanho}</td>
                <td style={{ padding: '14px 24px' }}><Badge tone={d.tone}>{d.status}</Badge></td>
                <td style={{ padding: '14px 24px', textAlign: 'right' }}><Button size="sm" variant="ghost">Ver</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
window.DocsScreen = DocsScreen;
