"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useAdmin } from "@/store/admin";
import type { ManagedPromotion } from "@/lib/admin/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const inputCls =
  "mt-1 w-full rounded-lg border border-forest/15 bg-sand/40 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30";

export default function AdminPromotionsPage() {
  const promotions = useAdmin((s) => s.promotions);
  const upsertPromotion = useAdmin((s) => s.upsertPromotion);
  const removePromotion = useAdmin((s) => s.removePromotion);
  const [form, setForm] = useState<ManagedPromotion | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">Marketing</p>
          <h1 className="font-serif text-3xl font-medium text-forest">Promotions</h1>
        </div>
        <Button
          variant="terracotta"
          size="sm"
          className="gap-1.5"
          onClick={() =>
            setForm({
              id: `promo-${Date.now().toString(36)}`,
              title: "",
              summary: "",
              tag: "Seasonal",
              href: "/events",
              featured: false,
              published: true,
            })
          }
        >
          <Plus className="h-4 w-4" />
          Add promotion
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {promotions.map((p) => (
          <article
            key={p.id}
            className={cn(
              "rounded-xl border border-forest/10 bg-white p-5",
              !p.published && "opacity-60"
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-terracotta/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-terracotta">
                    {p.tag}
                  </span>
                  {p.featured && (
                    <span className="rounded-full bg-forest/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-forest">
                      Featured
                    </span>
                  )}
                </div>
                <h3 className="mt-2 font-serif text-lg font-medium text-forest">{p.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{p.summary}</p>
              </div>
              <div className="flex">
                <button type="button" className="p-1.5 text-forest/50 hover:text-forest" onClick={() => setForm({ ...p })}>
                  <Pencil className="h-4 w-4" />
                </button>
                <button type="button" className="p-1.5 text-red-500/60 hover:text-red-600" onClick={() => removePromotion(p.id)}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {form && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-forest/40 p-4 backdrop-blur-sm">
          <div className="admin-panel w-full max-w-md space-y-3 rounded-2xl p-6">
            <h2 className="font-serif text-xl font-medium text-forest">Promotion</h2>
            <label className="block text-xs font-medium text-forest">
              Title
              <input className={inputCls} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </label>
            <label className="block text-xs font-medium text-forest">
              Summary
              <textarea className={inputCls} rows={3} value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
            </label>
            <label className="block text-xs font-medium text-forest">
              Tag
              <input className={inputCls} value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} />
            </label>
            <label className="block text-xs font-medium text-forest">
              Link
              <input className={inputCls} value={form.href || ""} onChange={(e) => setForm({ ...form, href: e.target.value })} />
            </label>
            <div className="flex gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
                Featured on homepage
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
                Published
              </label>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setForm(null)}>Cancel</Button>
              <Button
                variant="terracotta"
                size="sm"
                onClick={() => {
                  if (form.title.trim()) {
                    upsertPromotion(form);
                    setForm(null);
                  }
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
