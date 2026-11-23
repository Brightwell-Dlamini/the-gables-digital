"use client";

import { useAdmin } from "@/store/admin";
import { Button } from "@/components/ui/button";

const inputCls =
  "mt-1 w-full rounded-lg border border-forest/15 bg-sand/40 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30";

export default function AdminSettingsPage() {
  const settings = useAdmin((s) => s.settings);
  const updateSettings = useAdmin((s) => s.updateSettings);
  const resetContentToSeed = useAdmin((s) => s.resetContentToSeed);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">Centre</p>
        <h1 className="font-serif text-3xl font-medium text-forest">Settings</h1>
      </div>

      <section className="rounded-xl border border-forest/10 bg-white p-6 space-y-4">
        <h2 className="font-serif text-lg font-medium text-forest">Opening hours</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="text-xs font-medium text-forest">
            Mon – Fri
            <input
              className={inputCls}
              value={settings.hours.monFri}
              onChange={(e) =>
                updateSettings({ hours: { ...settings.hours, monFri: e.target.value } })
              }
            />
          </label>
          <label className="text-xs font-medium text-forest">
            Saturday
            <input
              className={inputCls}
              value={settings.hours.saturday}
              onChange={(e) =>
                updateSettings({ hours: { ...settings.hours, saturday: e.target.value } })
              }
            />
          </label>
          <label className="text-xs font-medium text-forest">
            Sunday
            <input
              className={inputCls}
              value={settings.hours.sunday}
              onChange={(e) =>
                updateSettings({ hours: { ...settings.hours, sunday: e.target.value } })
              }
            />
          </label>
        </div>
      </section>

      <section className="rounded-xl border border-forest/10 bg-white p-6 space-y-4">
        <h2 className="font-serif text-lg font-medium text-forest">Contact details</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-xs font-medium text-forest">
            Phone
            <input
              className={inputCls}
              value={settings.contact.phone}
              onChange={(e) =>
                updateSettings({
                  contact: { ...settings.contact, phone: e.target.value },
                })
              }
            />
          </label>
          <label className="text-xs font-medium text-forest">
            Email
            <input
              className={inputCls}
              value={settings.contact.email}
              onChange={(e) =>
                updateSettings({
                  contact: { ...settings.contact, email: e.target.value },
                })
              }
            />
          </label>
          <label className="text-xs font-medium text-forest sm:col-span-2">
            Address
            <input
              className={inputCls}
              value={settings.contact.address}
              onChange={(e) =>
                updateSettings({
                  contact: { ...settings.contact, address: e.target.value },
                })
              }
            />
          </label>
        </div>
      </section>

      <section className="rounded-xl border border-forest/10 bg-white p-6 space-y-4">
        <h2 className="font-serif text-lg font-medium text-forest">Feature flags</h2>
        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={settings.showMovieZone}
            onChange={(e) => updateSettings({ showMovieZone: e.target.checked })}
          />
          Show Movie Zone on Events page
        </label>
        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={settings.showPromotions}
            onChange={(e) => updateSettings({ showPromotions: e.target.checked })}
          />
          Show promotions strip on homepage
        </label>
      </section>

      <section className="rounded-xl border border-red-200 bg-red-50/50 p-6">
        <h2 className="font-serif text-lg font-medium text-forest">Danger zone</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Reset stores, events, promotions and settings to seed data.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4 border-red-300 text-red-700 hover:bg-red-100"
          onClick={() => {
            if (confirm("Reset content to seed data?")) resetContentToSeed();
          }}
        >
          Reset content to seed
        </Button>
      </section>
    </div>
  );
}
