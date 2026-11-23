'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Store,
  Calendar,
  Megaphone,
  FileText,
  Mail,
  Settings,
  LogOut,
  Palette,
  ExternalLink,
  Menu,
  X,
  ImageIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAdmin } from '@/store/admin';
import { resolveThemeForDate, themeMeta } from '@/lib/themes/seasonal';

const nav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/stores', label: 'Stores', icon: Store },
  { href: '/admin/events', label: 'Events & Cinema', icon: Calendar },
  { href: '/admin/promotions', label: 'Promotions', icon: Megaphone },
  { href: '/admin/leasing', label: 'Leasing apps', icon: FileText },
  { href: '/admin/messages', label: 'Messages', icon: Mail },
  { href: '/admin/media', label: 'Media & hero', icon: ImageIcon },
  { href: '/admin/themes', label: 'Seasonal themes', icon: Palette },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminShell({
  children,
  email,
}: {
  children: React.ReactNode;
  email: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const themeSettings = useAdmin((s) => s.settings.theme);
  const leasingNew = useAdmin(
    (s) => s.leasing.filter((a) => a.status === 'new').length
  );
  const msgUnread = useAdmin(
    (s) => s.messages.filter((m) => m.status === 'unread').length
  );

  const activeTheme = resolveThemeForDate(
    new Date(),
    themeSettings.schedule,
    themeSettings.mode,
    themeSettings.themeId
  );
  const meta = themeMeta(activeTheme);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  const sidebar = (
    <>
      <div className="mb-6 px-3 sm:mb-8">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta font-serif text-lg font-semibold text-white shadow-lg shadow-terracotta/30">
            G
          </div>
          <div className="leading-tight">
            <p className="font-serif text-base font-medium tracking-tight">
              The Gables
            </p>
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">
              Admin
            </p>
          </div>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto" aria-label="Admin">
        {nav.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const badge =
            item.href === '/admin/leasing'
              ? leasingNew
              : item.href === '/admin/messages'
                ? msgUnread
                : 0;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                active
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-white/60 hover:bg-white/8 hover:text-white'
              )}
            >
              <item.icon className="h-4 w-4 shrink-0 opacity-80" />
              <span className="flex-1">{item.label}</span>
              {badge > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta px-1.5 text-[10px] font-bold text-white">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 space-y-2 border-t border-white/10 pt-4 px-1">
        <div className="rounded-xl bg-white/5 px-3 py-2.5 text-xs backdrop-blur-sm">
          <p className="text-white/45">Live theme</p>
          <p className="mt-0.5 font-medium text-white">{meta.name}</p>
          <p className="text-white/35">
            {themeSettings.mode === 'auto' ? 'Auto schedule' : 'Manual'}
          </p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-white/55 hover:bg-white/8 hover:text-white transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          View public site
        </Link>
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs text-white/55 hover:bg-white/8 hover:text-white transition-colors"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign out
        </button>
        <p className="truncate px-3 text-[10px] text-white/30">{email}</p>
      </div>
    </>
  );

  return (
    <div className="admin-shell text-sand min-h-screen">
      <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-white/10 bg-[#0a1f15]/95 px-4 py-3 backdrop-blur-xl lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-terracotta font-serif text-sm font-semibold text-white">
            G
          </div>
          <span className="font-serif text-sm font-medium text-white">Admin</span>
        </Link>
        <Link
          href="/"
          target="_blank"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/70"
          aria-label="View site"
        >
          <ExternalLink className="h-4 w-4" />
        </Link>
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[min(18rem,88vw)] flex-col border-r border-white/10 bg-[#0a1f15] px-3 py-6 shadow-2xl transition-transform duration-300 ease-out lg:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="absolute right-3 top-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white"
          aria-label="Close menu"
        >
          <X className="h-4 w-4" />
        </button>
        {sidebar}
      </aside>

      <div className="mx-auto flex min-h-screen max-w-[1400px]">
        <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-white/10 px-3 py-6 lg:flex">
          {sidebar}
        </aside>

        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="admin-panel min-h-[calc(100vh-5.5rem)] rounded-2xl p-4 sm:p-6 lg:p-8 text-ink lg:min-h-[calc(100vh-4rem)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
