"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { useAdmin } from "@/store/admin";
import type { Store, StoreCategory } from "@/data/stores";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CATEGORIES: StoreCategory[] = [
  "Fashion",
  "Food & Dining",
  "Banks & Finance",
  "Health & Beauty",
  "Electronics & Tech",
  "Home & Furniture",
  "Entertainment",
  "Services",
  "Other",
];

const empty: Store = {
  id: "",
  name: "",
  shopNumber: "",
  category: "Other",
  phone: "",
  email: "",
  description: "",
  mapX: 50,
  mapY: 50,
};

export default function AdminStoresPage() {
  const stores = useAdmin((s) => s.stores);
  const upsertStore = useAdmin((s) => s.upsertStore);
  const removeStore = useAdmin((s) => s.removeStore);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<Store | null>(null);

  const filtered = stores.filter(
    (s) =>
      !q ||
      s.name.toLowerCase().includes(q.toLowerCase()) ||
      s.shopNumber.includes(q) ||
      s.category.toLowerCase().includes(q.toLowerCase())
  );

  function startNew() {
    setEditing({
      ...empty,
      id: `store-${Date.now().toString(36)}`,
    });
  }

  function save() {
    if (!editing || !editing.name.trim()) return;
    upsertStore({
      ...editing,
      name: editing.name.trim(),
      shopNumber: editing.shopNumber.trim() || "—",
    });
    setEditing(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
            Directory
          </p>
          <h1 className="font-serif text-3xl font-medium text-forest">Stores</h1>
        </div>
        <Button variant="terracotta" size="sm" className="gap-1.5" onClick={startNew}>
          <Plus className="h-4 w-4" />
          Add store
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search stores…"
          className="w-full rounded-lg border border-forest/15 bg-white py-2 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-forest/10 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-forest/10 bg-sand/50 text-left text-xs uppercase tracking-wide text-ink-muted">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium hidden sm:table-cell">Shop</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium hidden md:table-cell">Phone</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-forest/5">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-sand/30">
                <td className="px-4 py-3 font-medium text-forest">{s.name}</td>
                <td className="px-4 py-3 text-ink-muted hidden sm:table-cell">
                  {s.shopNumber}
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-forest/5 px-2 py-0.5 text-xs">
                    {s.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-ink-muted hidden md:table-cell">
                  {s.phone || "—"}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    className="inline-flex p-1.5 text-forest/60 hover:text-forest"
                    onClick={() => setEditing({ ...s })}
                    aria-label="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="inline-flex p-1.5 text-red-500/70 hover:text-red-600"
                    onClick={() => {
                      if (confirm(`Remove ${s.name}?`)) removeStore(s.id);
                    }}
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-ink-muted">No stores match</p>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-forest/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="font-serif text-xl font-medium text-forest">
              {editing.id.startsWith("store-") && !stores.find((s) => s.id === editing.id)
                ? "New store"
                : "Edit store"}
            </h2>
            <div className="mt-4 grid gap-3">
              <label className="block text-sm">
                <span className="text-ink-muted">Name</span>
                <input
                  className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2"
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block text-sm">
                  <span className="text-ink-muted">Shop number</span>
                  <input
                    className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2"
                    value={editing.shopNumber}
                    onChange={(e) => setEditing({ ...editing, shopNumber: e.target.value })}
                  />
                </label>
                <label className="block text-sm">
                  <span className="text-ink-muted">Category</span>
                  <select
                    className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2"
                    value={editing.category}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        category: e.target.value as StoreCategory,
                      })
                    }
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <label className="block text-sm">
                  <span className="text-ink-muted">Phone</span>
                  <input
                    className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2"
                    value={editing.phone}
                    onChange={(e) => setEditing({ ...editing, phone: e.target.value })}
                  />
                </label>
                <label className="block text-sm">
                  <span className="text-ink-muted">Email</span>
                  <input
                    className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2"
                    value={editing.email}
                    onChange={(e) => setEditing({ ...editing, email: e.target.value })}
                  />
                </label>
              </div>
              <label className="block text-sm">
                <span className="text-ink-muted">Description</span>
                <textarea
                  className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2"
                  rows={3}
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block text-sm">
                  <span className="text-ink-muted">Map X (%)</span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2"
                    value={editing.mapX}
                    onChange={(e) =>
                      setEditing({ ...editing, mapX: Number(e.target.value) })
                    }
                  />
                </label>
                <label className="block text-sm">
                  <span className="text-ink-muted">Map Y (%)</span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2"
                    value={editing.mapY}
                    onChange={(e) =>
                      setEditing({ ...editing, mapY: Number(e.target.value) })
                    }
                  />
                </label>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setEditing(null)}>
                Cancel
              </Button>
              <Button variant="terracotta" size="sm" onClick={save}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
