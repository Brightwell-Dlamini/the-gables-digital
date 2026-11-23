'use client';

import { useState } from 'react';
import { useAdmin } from '@/store/admin';
import type { LeasingApplication, LeasingStatus } from '@/lib/admin/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const STATUSES: LeasingStatus[] = [
  'new',
  'in_review',
  'shortlisted',
  'offer',
  'declined',
];

export default function AdminLeasingPage() {
  const applications = useAdmin((s) => s.leasing);
  const setLeasingStatus = useAdmin((s) => s.setLeasingStatus);
  const [filter, setFilter] = useState<LeasingStatus | 'all'>('all');
  const [selected, setSelected] = useState<LeasingApplication | null>(null);
  const [notes, setNotes] = useState('');

  const list =
    filter === 'all'
      ? applications
      : applications.filter((a) => a.status === filter);

  function open(app: LeasingApplication) {
    setSelected(app);
    setNotes(app.notes || '');
  }

  function saveNotes() {
    if (!selected) return;
    setLeasingStatus(selected.id, selected.status, notes);
    setSelected({ ...selected, notes });
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
          Pipeline
        </p>
        <h1 className="font-serif text-3xl font-medium text-forest">
          Leasing applications
        </h1>
      </div>

      <div className="flex flex-wrap gap-2">
        {(['all', ...STATUSES] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              'rounded-full px-3 py-1.5 text-xs font-medium border capitalize',
              filter === f
                ? 'bg-forest text-white border-forest'
                : 'bg-white border-forest/10 text-ink-muted'
            )}
          >
            {f.replace('_', ' ')}
            {f !== 'all' &&
              ` (${applications.filter((a) => a.status === f).length})`}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-forest/10 bg-white">
        <ul className="divide-y divide-forest/5">
          {list.map((a) => (
            <li key={a.id}>
              <button
                type="button"
                onClick={() => open(a)}
                className="flex w-full items-start gap-4 px-4 py-4 text-left hover:bg-sand/40"
              >
                <span
                  className={cn(
                    'mt-1.5 h-2 w-2 shrink-0 rounded-full',
                    a.status === 'new'
                      ? 'bg-terracotta'
                      : a.status === 'offer'
                        ? 'bg-emerald-500'
                        : 'bg-forest/30'
                  )}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate font-medium text-forest">
                      {a.company || a.name}
                    </p>
                    <time className="shrink-0 text-xs text-ink-muted">
                      {new Date(a.createdAt).toLocaleDateString('en-SZ')}
                    </time>
                  </div>
                  <p className="text-xs text-ink-muted capitalize">
                    {a.status.replace('_', ' ')} · {a.persona || a.spaceSize}
                  </p>
                  <p className="mt-1 line-clamp-1 text-sm text-ink-muted">
                    {a.email}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
        {list.length === 0 && (
          <p className="py-10 text-center text-sm text-ink-muted">
            No applications
          </p>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-forest/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="font-serif text-xl font-medium text-forest">
              {selected.company || selected.name}
            </h2>
            <p className="text-sm text-ink-muted">
              <a
                href={`mailto:${selected.email}`}
                className="hover:text-terracotta"
              >
                {selected.email}
              </a>
              {selected.phone && ` · ${selected.phone}`}
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-wide text-terracotta">
              {selected.persona} · {selected.spaceSize}
            </p>
            <div className="mt-4 space-y-2 text-sm text-ink">
              <p>
                <span className="text-ink-muted">Contact:</span> {selected.name}
              </p>
              {selected.message && (
                <p className="whitespace-pre-wrap leading-relaxed">
                  {selected.message}
                </p>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-xs font-medium text-forest">
                Status
                <select
                  className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2 text-sm capitalize"
                  value={selected.status}
                  onChange={(e) => {
                    const status = e.target.value as LeasingStatus;
                    setLeasingStatus(selected.id, status, notes);
                    setSelected({ ...selected, status });
                  }}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-3">
              <label className="block text-xs font-medium text-forest">
                Internal notes
                <textarea
                  className="mt-1 w-full rounded-lg border border-forest/15 px-3 py-2 text-sm"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </label>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={saveNotes}
              >
                Save notes
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelected(null)}>
                Close
              </Button>
              <Button variant="terracotta" size="sm" asChild>
                <a
                  href={`mailto:${selected.email}?subject=Re: Leasing at The Gables`}
                >
                  Reply by email
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
