"use client";

import { useState } from "react";
import { useAdmin } from "@/store/admin";
import type { ContactMessage, MessageStatus } from "@/lib/admin/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AdminMessagesPage() {
  const messages = useAdmin((s) => s.messages);
  const setMessageStatus = useAdmin((s) => s.setMessageStatus);
  const [filter, setFilter] = useState<MessageStatus | "all">("all");
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  const list = filter === "all" ? messages : messages.filter((m) => m.status === filter);

  function open(m: ContactMessage) {
    setSelected(m);
    if (m.status === "unread") {
      setMessageStatus(m.id, "read");
      setSelected({ ...m, status: "read" });
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">Inbox</p>
        <h1 className="font-serif text-3xl font-medium text-forest">Contact messages</h1>
      </div>

      <div className="flex flex-wrap gap-2">
        {(["all", "unread", "read", "archived"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium border",
              filter === f ? "bg-forest text-white border-forest" : "bg-white border-forest/10 text-ink-muted"
            )}
          >
            {f}
            {f !== "all" && ` (${messages.filter((m) => m.status === f).length})`}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-forest/10 bg-white">
        <ul className="divide-y divide-forest/5">
          {list.map((m) => (
            <li key={m.id}>
              <button type="button" onClick={() => open(m)} className="flex w-full items-start gap-4 px-4 py-4 text-left hover:bg-sand/40">
                <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", m.status === "unread" ? "bg-terracotta" : "bg-transparent")} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className={cn("truncate text-sm", m.status === "unread" ? "font-semibold text-forest" : "font-medium text-forest")}>
                      {m.name}
                    </p>
                    <time className="shrink-0 text-xs text-ink-muted">{new Date(m.createdAt).toLocaleDateString("en-SZ")}</time>
                  </div>
                  <p className="text-xs text-ink-muted capitalize">{m.subject}</p>
                  <p className="mt-1 line-clamp-1 text-sm text-ink-muted">{m.message}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
        {list.length === 0 && <p className="py-10 text-center text-sm text-ink-muted">No messages</p>}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-forest/40 p-4 backdrop-blur-sm">
          <div className="admin-panel w-full max-w-lg rounded-2xl p-6">
            <h2 className="font-serif text-xl font-medium text-forest">{selected.name}</h2>
            <p className="text-sm text-ink-muted">
              <a href={`mailto:${selected.email}`} className="hover:text-terracotta">{selected.email}</a>
              {selected.phone && ` · ${selected.phone}`}
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-wide text-terracotta">{selected.subject}</p>
            <p className="mt-4 whitespace-pre-wrap text-sm text-ink leading-relaxed">{selected.message}</p>
            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => { setMessageStatus(selected.id, "archived"); setSelected(null); }}>
                Archive
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSelected(null)}>Close</Button>
              <Button variant="terracotta" size="sm" asChild>
                <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}>Reply by email</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
