import { createClient } from '@/lib/supabase/server';
import { PageHeader, Card } from '@/components/ui';
import { DepartmentSelect } from './DepartmentSelect';
import type { Profile } from '@/lib/types';

export default async function UsuariosPage() {
  const supabase = await createClient();
  const { data: profiles } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: true })
    .returns<Profile[]>();

  return (
    <div>
      <PageHeader
        title="Usuários"
        description="Novas contas são criadas pelo próprio usuário na tela de login e começam sem departamento — atribua um abaixo para liberar o acesso."
      />

      <Card padding={0}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <Th>E-mail</Th>
              <Th>Criado em</Th>
              <Th>Departamento</Th>
            </tr>
          </thead>
          <tbody>
            {(profiles ?? []).map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td className="px-5 py-3.5" style={{ color: 'var(--text-primary)' }}>
                  {p.email}
                </td>
                <td className="px-5 py-3.5" style={{ color: 'var(--text-secondary)' }}>
                  {new Date(p.created_at).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-5 py-3.5">
                  <DepartmentSelect userId={p.id} current={p.department} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function Th({ children }: { children?: React.ReactNode }) {
  return (
    <th style={{ color: 'var(--text-muted)' }} className="text-left text-xs uppercase tracking-wide font-medium px-5 py-3">
      {children}
    </th>
  );
}
