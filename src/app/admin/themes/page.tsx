"use client";

import { useAdmin } from "@/store/admin";
import {
  SEASONAL_THEMES,
  resolveThemeForDate,
  themeMeta,
} from "@/lib/themes/seasonal";
import type { SeasonalThemeId } from "@/lib/admin/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AdminThemesPage() {
  const themeSettings = useAdmin((s) => s.settings.theme);
  const setThemeMode = useAdmin((s) => s.setThemeMode);
  const setManualTheme = useAdmin((s) => s.setManualTheme);

  const active = resolveThemeForDate(
    new Date(),
    themeSettings.schedule,
    themeSettings.mode,
    themeSettings.themeId
  );
  const activeMeta = themeMeta(active);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
          Brand experience
        </p>
        <h1 className="font-serif text-3xl font-medium text-forest">
          Seasonal themes
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted leading-relaxed">
          Switch the public site for Eswatini calendar moments — Independence Day,
          Umhlanga, Buganu, Christmas, Valentine, Easter, Halloween — or use auto schedule.
        </p>
      </div>

      <div className="rounded-xl border border-forest/10 bg-white p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs text-ink-muted">Currently live</p>
            <p className="font-serif text-xl font-medium text-forest">{activeMeta.name}</p>
            <p className="text-sm text-ink-muted">{activeMeta.description}</p>
          </div>
          <div className="flex rounded-lg border border-forest/15 p-1">
            <button
              type="button"
              onClick={() => setThemeMode("auto")}
              className={cn(
                "rounded-md px-4 py-2 text-sm font-medium",
                themeSettings.mode === "auto"
                  ? "bg-forest text-white"
                  : "text-ink-muted hover:text-forest"
              )}
            >
              Auto schedule
            </button>
            <button
              type="button"
              onClick={() => setThemeMode("manual")}
              className={cn(
                "rounded-md px-4 py-2 text-sm font-medium",
                themeSettings.mode === "manual"
                  ? "bg-forest text-white"
                  : "text-ink-muted hover:text-forest"
              )}
            >
              Manual override
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SEASONAL_THEMES.map((t) => {
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setManualTheme(t.id as SeasonalThemeId)}
              className={cn(
                "rounded-xl border p-5 text-left transition-all",
                isActive
                  ? "border-terracotta ring-2 ring-terracotta/30 bg-white shadow-md"
                  : "border-forest/10 bg-white hover:border-forest/25"
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-10 w-10 rounded-full border-2 border-white shadow"
                  style={{ backgroundColor: t.swatch }}
                />
                <div>
                  <p className="font-medium text-forest">{t.name}</p>
                  {isActive && (
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-terracotta">
                      Live now
                    </p>
                  )}
                </div>
              </div>
              <p className="mt-3 text-xs text-ink-muted">{t.description}</p>
            </button>
          );
        })}
      </div>

      <section className="rounded-xl border border-forest/10 bg-white p-5">
        <h2 className="font-serif text-lg font-medium text-forest">Auto schedule</h2>
        <ul className="mt-4 divide-y divide-forest/5">
          {themeSettings.schedule.map((entry) => (
            <li
              key={`${entry.themeId}-${entry.start}`}
              className="flex items-center justify-between py-3 text-sm"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: themeMeta(entry.themeId).swatch }}
                />
                <div>
                  <p className="font-medium text-forest">{entry.label}</p>
                  <p className="text-xs text-ink-muted">{themeMeta(entry.themeId).name}</p>
                </div>
              </div>
              <p className="tabular-nums text-ink-muted">
                {entry.start} → {entry.end}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <Button variant="outline" size="sm" onClick={() => setThemeMode("auto")}>
            Return to auto schedule
          </Button>
        </div>
      </section>
    </div>
  );
}
