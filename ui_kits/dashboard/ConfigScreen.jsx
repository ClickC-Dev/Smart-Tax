function ConfigScreen() {
  const DS = window.SmartTaxDesignSystem_5b7735;
  const { Card, Input, Select, Switch, Button } = DS;
  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 560 }}>
      <Card>
        <h3 style={{ margin: '0 0 16px', fontFamily: 'var(--font-display)', fontSize: 'var(--text-heading-md)', color: 'var(--text-primary)' }}>Dados da empresa</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Input label="Razão social" value="Oliveira Tech Ltda" onChange={() => {}} />
          <Input label="CNPJ" value="12.345.678/0001-90" onChange={() => {}} />
          <Select label="Regime tributário" options={[{ value: 'simples', label: 'Simples Nacional' }, { value: 'presumido', label: 'Lucro Presumido' }]} />
        </div>
      </Card>
      <Card>
        <h3 style={{ margin: '0 0 14px', fontFamily: 'var(--font-display)', fontSize: 'var(--text-heading-md)', color: 'var(--text-primary)' }}>Notificações</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Switch label="Notificar por e-mail" checked={true} onChange={() => {}} />
          <Switch label="Lembretes de vencimento" checked={true} onChange={() => {}} />
          <Switch label="Novidades do Smart Tax" checked={false} onChange={() => {}} />
        </div>
      </Card>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}><Button variant="primary">Salvar alterações</Button></div>
    </div>
  );
}
window.ConfigScreen = ConfigScreen;
