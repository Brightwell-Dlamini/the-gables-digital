"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useAdmin } from "@/store/admin";
import type { ManagedEvent, ManagedShowtime } from "@/lib/admin/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AdminEventsPage() {
  const events = useAdmin((s) => s.events);
  const showtimes = useAdmin((s) => s.showtimes);
  const upsertEvent = useAdmin((s) => s.upsertEvent);
  const removeEvent = useAdmin((s) => s.removeEvent);
  const upsertShowtime = useAdmin((s) => s.upsertShowtime);
  const removeShowtime = useAdmin((s) => s.removeShowtime);

  const [eventForm, setEventForm] = useState<ManagedEvent | null>(null);
  const [showForm, setShowForm] = useState<ManagedShowtime | null>(null);

  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
          Lifestyle
        </p>
        <h1 className="font-serif text-3xl font-medium text-forest">
          Events & Movie Zone
        </h1>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-medium text-forest">
            Community board
          </h2>
          <Button
            variant="terracotta"
            size="sm"
            className="gap-1.5"
            onClick={() =>
              setEventForm({
                id: `evt-${Date.now().toString(36)}`,
                title: "",
                date: "",
                description: "",
                tag: "Community",
                published: true,
              })
            }
          >
            <Plus className="h-4 w-4" />
            Add event
          </Button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {events.map((e) => (
            <article
              key={e.id}
              className={cn(
                "rounded-xl border border-forest/10 bg-white p-4",
                !e.published && "opacity-60"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs text-terracotta font-medium">{e.date}</p>
                  <h3 className="font-medium text-forest">{e.title}</h3>
                  <p className="mt-1 text-xs text-ink-muted line-clamp-2">
                    {e.description}
                  </p>
                </div>
                <div className="flex shrink-0">
                  <button
                    type="button"
                    className="p-1.5 text-forest/50 hover:text-forest"
                    onClick={() => setEventForm({ ...e })}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 text-red-500/60 hover:text-red-600"
                    onClick={() => removeEvent(e.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-medium text-forest">
            Movie Zone showtimes
          </h2>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() =>
              setShowForm({
                id: `show-${Date.now().toString(36)}`,
                title: "",
                rating: "PG",
                times: ["14:00"],
                genre: "",
                published: true,
              })
            }
          >
            <Plus className="h-4 w-4" />
            Add film
          </Button>
        </div>
        <div className="overflow-hidden rounded-xl border border-forest/10 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-forest/10 bg-sand/50 text-left text-xs uppercase text-ink-muted">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3 hidden sm:table-cell">Times</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest/5">
              {showtimes.map((s) => (
                <tr key={s.id}>
                  <td className="px-4 py-3 font-medium text-forest">{s.title}</td>
                  <td className="px-4 py-3">{s.rating}</td>
                  <td className="px-4 py-3 text-ink-muted hidden sm:table-cell">
                    {s.times.join(" · ")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      className="inline-flex p-1.5 text-forest/60 hover:text-forest"
                      onClick={() => setShowForm({ ...s })}
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="inline-flex p-1.5 text-red-500/70 hover:text-red-600"
                      onClick={() => removeShowtime(s.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {eventForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-forest/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="font-serif text-xl font-medium text-forest">Event</h2>
            <div className="mt-4 space-y-3">
              <label className="block text-sm">
                Title
                <input
                  className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                />
              </label>
              <label className="block text-sm">
                Date
                <input
                  className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2"
                  value={eventForm.date}
                  onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                />
              </label>
              <label className="block text-sm">
                Description
                <textarea
                  className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2"
                  rows={3}
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                />
              </label>
              <label className="block text-sm">
                Tag
                <input
                  className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2"
                  value={eventForm.tag}
                  onChange={(e) => setEventForm({ ...eventForm, tag: e.target.value })}
                />
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={eventForm.published}
                  onChange={(e) => setEventForm({ ...eventForm, published: e.target.checked })}
                />
                Published
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setEventForm(null)}>
                Cancel
              </Button>
              <Button
                variant="terracotta"
                size="sm"
                onClick={() => {
                  if (eventForm.title.trim()) {
                    upsertEvent(eventForm);
                    setEventForm(null);
                  }
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-forest/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="font-serif text-xl font-medium text-forest">Showtime</h2>
            <div className="mt-4 space-y-3">
              <label className="block text-sm">
                Title
                <input
                  className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2"
                  value={showForm.title}
                  onChange={(e) => setShowForm({ ...showForm, title: e.target.value })}
                />
              </label>
              <label className="block text-sm">
                Rating
                <input
                  className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2"
                  value={showForm.rating}
                  onChange={(e) => setShowForm({ ...showForm, rating: e.target.value })}
                />
              </label>
              <label className="block text-sm">
                Genre
                <input
                  className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2"
                  value={showForm.genre}
                  onChange={(e) => setShowForm({ ...showForm, genre: e.target.value })}
                />
              </label>
              <label className="block text-sm">
                Times (comma separated)
                <input
                  className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2"
                  value={showForm.times.join(", ")}
                  onChange={(e) =>
                    setShowForm({
                      ...showForm,
                      times: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                    })
                  }
                />
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={showForm.published}
                  onChange={(e) => setShowForm({ ...showForm, published: e.target.checked })}
                />
                Published
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowForm(null)}>
                Cancel
              </Button>
              <Button
                variant="terracotta"
                size="sm"
                onClick={() => {
                  if (showForm.title.trim()) {
                    upsertShowtime(showForm);
                    setShowForm(null);
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
