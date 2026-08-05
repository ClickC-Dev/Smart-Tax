import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Sidebar } from '@/components/Sidebar';
import type { Profile } from '@/lib/types';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single<Profile>();

  if (!profile || profile.department === 'sem_departamento') {
    return (
      <main
        style={{ background: 'var(--navy-800)' }}
        className="min-h-screen w-full flex items-center justify-center px-4 text-white"
      >
        <div className="max-w-sm text-center flex flex-col items-center gap-3">
          <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
            <path d="M50 8 L92 84 H8 Z" stroke="var(--gold-600)" strokeWidth="9" strokeLinejoin="round" fill="none" />
          </svg>
          <h1 className="text-lg">Aguardando liberação de acesso</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)' }} className="text-sm">
            Sua conta ({user.email}) foi criada, mas ainda não tem um departamento
            atribuído. Peça a um administrador para liberar seu acesso na seção Usuários.
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar department={profile.department} email={profile.email} />
      <div style={{ background: 'var(--surface-page)' }} className="flex-1 min-w-0">
        <div className="max-w-6xl mx-auto px-8 py-8">{children}</div>
      </div>
    </div>
  );
}
