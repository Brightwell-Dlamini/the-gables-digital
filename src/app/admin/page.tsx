"use client";

import Link from "next/link";
import {
  Store,
  FileText,
  Mail,
  Calendar,
  Palette,
  ArrowRight,
} from "lucide-react";
import { useAdmin } from "@/store/admin";
import { resolveThemeForDate, themeMeta } from "@/lib/themes/seasonal";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const stores = useAdmin((s) => s.stores);
  const leasing = useAdmin((s) => s.leasing);
  const messages = useAdmin((s) => s.messages);
  const events = useAdmin((s) => s.events);
  const themeSettings = useAdmin((s) => s.settings.theme);

  const newApps = leasing.filter((a) => a.status === "new").length;
  const unread = messages.filter((m) => m.status === "unread").length;
  const activeTheme = resolveThemeForDate(
    new Date(),
    themeSettings.schedule,
    themeSettings.mode,
    themeSettings.themeId
  );
  const meta = themeMeta(activeTheme);

  const cards = [
    {
      label: "Stores live",
      value: stores.length,
      href: "/admin/stores",
      icon: Store,
      tone: "bg-forest/10 text-forest",
    },
    {
      label: "New leasing apps",
      value: newApps,
      href: "/admin/leasing",
      icon: FileText,
      tone: "bg-terracotta/15 text-terracotta",
    },
    {
      label: "Unread messages",
      value: unread,
      href: "/admin/messages",
      icon: Mail,
      tone: "bg-amber-500/15 text-amber-800",
    },
    {
      label: "Events published",
      value: events.filter((e) => e.published).length,
      href: "/admin/events",
      icon: Calendar,
      tone: "bg-emerald-500/15 text-emerald-800",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
            Overview
          </p>
          <h1 className="font-serif text-3xl font-medium text-forest">Dashboard</h1>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-forest/10 bg-white px-3 py-1.5 text-xs">
          <Palette className="h-3.5 w-3.5 text-terracotta" />
          <span className="text-ink-muted">Theme:</span>
          <span className="font-medium text-forest">{meta.name}</span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="group rounded-xl border border-forest/10 bg-white p-5 transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className={cn("rounded-lg p-2", c.tone)}>
                <c.icon className="h-5 w-5" />
              </div>
              <ArrowRight className="h-4 w-4 text-ink-muted opacity-0 transition group-hover:opacity-100" />
            </div>
            <p className="mt-4 text-3xl font-semibold tabular-nums text-forest">{c.value}</p>
            <p className="mt-1 text-sm text-ink-muted">{c.label}</p>
          </Link>
        ))}
      </div>

      <p className="text-sm text-ink-muted">
        Use the sidebar for Stores, Events, Leasing applications, Messages, Seasonal themes and Settings.
      </p>
    </div>
  );
}
