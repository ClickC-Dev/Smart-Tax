'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { Department } from '@/lib/types';
import {
  LayoutDashboard,
  Newspaper,
  Megaphone,
  BarChart3,
  Users,
  LogOut,
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  departments: Department[];
}

const NAV_ITEMS: NavItem[] = [
  {
    href: '/',
    label: 'Início',
    icon: LayoutDashboard,
    departments: ['admin', 'conteudo', 'marketing', 'analytics'],
  },
  {
    href: '/blog',
    label: 'Blog',
    icon: Newspaper,
    departments: ['admin', 'conteudo'],
  },
  {
    href: '/marketing',
    label: 'Marketing',
    icon: Megaphone,
    departments: ['admin', 'marketing'],
  },
  {
    href: '/analytics',
    label: 'Analytics',
    icon: BarChart3,
    departments: ['admin', 'analytics'],
  },
  {
    href: '/usuarios',
    label: 'Usuários',
    icon: Users,
    departments: ['admin'],
  },
];

export function Sidebar({ department, email }: { department: Department; email: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const items = NAV_ITEMS.filter((item) => item.departments.includes(department));

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  }

  return (
    <aside
      style={{ background: 'var(--navy-800)' }}
      className="w-64 shrink-0 min-h-screen flex flex-col text-white"
    >
      <div className="flex items-center gap-2 px-5 py-6">
        <svg width="26" height="26" viewBox="0 0 100 100" fill="none">
          <path
            d="M50 8 L92 84 H8 Z"
            stroke="var(--gold-600)"
            strokeWidth="9"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <div style={{ fontFamily: 'var(--font-display)' }} className="font-extrabold text-sm">
          SMART TAX
        </div>
      </div>

      <nav className="flex-1 px-3 flex flex-col gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                background: active ? 'var(--gold-600)' : 'transparent',
                color: active ? '#fff' : 'rgba(255,255,255,0.75)',
                borderRadius: 'var(--radius-sm)',
              }}
              className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium transition-colors hover:bg-white/10"
            >
              <Icon size={17} strokeWidth={1.75} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <div className="px-3 pb-3 text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
          {email}
        </div>
        <button
          onClick={handleSignOut}
          style={{ borderRadius: 'var(--radius-sm)' }}
          className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium w-full text-left transition-colors hover:bg-white/10"
        >
          <LogOut size={17} strokeWidth={1.75} />
          Sair
        </button>
      </div>
    </aside>
  );
}
