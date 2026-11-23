"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/store/admin";
import { resolveThemeForDate, themeMeta } from "@/lib/themes/seasonal";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/stores", label: "Stores", icon: Store },
  { href: "/admin/events", label: "Events & Cinema", icon: Calendar },
  { href: "/admin/promotions", label: "Promotions", icon: Megaphone },
  { href: "/admin/leasing", label: "Leasing apps", icon: FileText },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/themes", label: "Seasonal themes", icon: Palette },
  { href: "/admin/settings", label: "Settings", icon: Settings },
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
  const themeSettings = useAdmin((s) => s.settings.theme);
  const leasingNew = useAdmin(
    (s) => s.leasing.filter((a) => a.status === "new").length
  );
  const msgUnread = useAdmin(
    (s) => s.messages.filter((m) => m.status === "unread").length
  );

  const activeTheme = resolveThemeForDate(
    new Date(),
    themeSettings.schedule,
    themeSettings.mode,
    themeSettings.themeId
  );
  const meta = themeMeta(activeTheme);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-shell text-sand">
      <div className="mx-auto flex min-h-screen max-w-[1400px]">
        <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col border-r border-white/10 px-3 py-6">
          <div className="mb-8 px-3">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta font-serif text-lg font-semibold text-white">
                G
              </div>
              <div className="leading-tight">
                <p className="font-serif text-base font-medium">The Gables</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                  Admin
                </p>
              </div>
            </Link>
          </div>

          <nav className="flex flex-1 flex-col gap-0.5" aria-label="Admin">
            {nav.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              const badge =
                item.href === "/admin/leasing"
                  ? leasingNew
                  : item.href === "/admin/messages"
                    ? msgUnread
                    : 0;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-white/15 text-white"
                      : "text-white/65 hover:bg-white/8 hover:text-white"
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
            <div className="rounded-lg bg-white/5 px-3 py-2.5 text-xs">
              <p className="text-white/50">Live theme</p>
              <p className="mt-0.5 font-medium text-white">{meta.name}</p>
              <p className="text-white/40">
                {themeSettings.mode === "auto" ? "Auto schedule" : "Manual"}
              </p>
            </div>
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-white/60 hover:bg-white/8 hover:text-white"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View public site
            </Link>
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-white/60 hover:bg-white/8 hover:text-white"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
            <p className="truncate px-3 text-[10px] text-white/35">{email}</p>
          </div>
        </aside>

        <main className="flex-1 overflow-auto p-6 lg:p-8">
          <div className="admin-panel min-h-[calc(100vh-3rem)] rounded-2xl p-6 sm:p-8 text-ink">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
