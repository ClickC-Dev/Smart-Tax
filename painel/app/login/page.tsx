'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) {
        setError(traduzErro(error.message));
        return;
      }
      router.refresh();
      router.push('/');
      return;
    }

    const { error, data } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setError(traduzErro(error.message));
      return;
    }
    if (data.session) {
      router.refresh();
      router.push('/');
      return;
    }
    setInfo('Conta criada. Verifique seu e-mail para confirmar o acesso antes de entrar.');
  }

  return (
    <main
      style={{ background: 'var(--navy-800)' }}
      className="min-h-screen w-full flex items-center justify-center px-4"
    >
      <div
        style={{
          background: 'var(--surface-card)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
        }}
        className="w-full max-w-sm p-8"
      >
        <div className="flex flex-col items-center gap-2 mb-8">
          <svg width="36" height="36" viewBox="0 0 100 100" fill="none">
            <path
              d="M50 8 L92 84 H8 Z"
              stroke="var(--gold-600)"
              strokeWidth="9"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <div
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            className="font-extrabold text-lg tracking-wide"
          >
            SMART TAX
          </div>
          <div style={{ color: 'var(--text-muted)' }} className="text-xs tracking-widest uppercase">
            Painel administrativo
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              style={{ color: 'var(--text-secondary)' }}
              className="text-sm font-medium"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                borderColor: 'var(--border-default)',
                borderRadius: 'var(--radius-sm)',
              }}
              className="border px-3 py-2 text-sm outline-none focus:border-[var(--navy-800)]"
              placeholder="voce@empresa.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              style={{ color: 'var(--text-secondary)' }}
              className="text-sm font-medium"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                borderColor: 'var(--border-default)',
                borderRadius: 'var(--radius-sm)',
              }}
              className="border px-3 py-2 text-sm outline-none focus:border-[var(--navy-800)]"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div
              style={{ background: 'var(--danger-100)', color: 'var(--danger-500)' }}
              className="text-sm px-3 py-2 rounded-[var(--radius-sm)]"
            >
              {error}
            </div>
          )}
          {info && (
            <div
              style={{ background: 'var(--success-100)', color: 'var(--success-500)' }}
              className="text-sm px-3 py-2 rounded-[var(--radius-sm)]"
            >
              {info}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              background: 'var(--accent-gold)',
              color: '#fff',
              borderRadius: 'var(--radius-sm)',
              opacity: loading ? 0.6 : 1,
            }}
            className="py-2.5 text-sm font-semibold mt-2 transition-colors hover:brightness-95"
          >
            {loading ? 'Aguarde…' : mode === 'login' ? 'Entrar' : 'Criar conta'}
          </button>
        </form>

        <button
          onClick={() => {
            setMode(mode === 'login' ? 'signup' : 'login');
            setError(null);
            setInfo(null);
          }}
          style={{ color: 'var(--text-muted)' }}
          className="text-xs text-center w-full mt-5 hover:underline"
        >
          {mode === 'login'
            ? 'Ainda não tem conta? Criar conta de teste'
            : 'Já tem conta? Entrar'}
        </button>
      </div>
    </main>
  );
}

function traduzErro(msg: string): string {
  if (msg.includes('Invalid login credentials')) return 'E-mail ou senha incorretos.';
  if (msg.includes('User already registered')) return 'Já existe uma conta com esse e-mail.';
  if (msg.includes('Password should be at least')) return 'A senha precisa ter pelo menos 6 caracteres.';
  return msg;
}
