'use client';

import { useMemo, useState } from 'react';
import { ImageIcon, Video, Link2, Check, Upload } from 'lucide-react';
import { useAdmin } from '@/store/admin';
import type { MediaAsset } from '@/lib/supabase/data';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { isSupabaseConfigured } from '@/lib/supabase/client';

export default function AdminMediaPage() {
  const media = useAdmin((s) => s.media);
  const upsertMedia = useAdmin((s) => s.upsertMedia);
  const [editing, setEditing] = useState<MediaAsset | null>(null);
  const [saved, setSaved] = useState(false);
  const supabaseOn = isSupabaseConfigured();

  const slots = useMemo(() => media, [media]);

  function startEdit(asset: MediaAsset) {
    setEditing({ ...asset });
    setSaved(false);
  }

  function save() {
    if (!editing || !editing.url.trim()) return;
    upsertMedia({
      ...editing,
      url: editing.url.trim(),
      poster_url: editing.poster_url?.trim() || null,
      alt: editing.alt?.trim() || null,
      updated_at: new Date().toISOString(),
    });
    setEditing(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
            Brand assets
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-forest">
            Media & hero
          </h1>
          <p className="mt-1 max-w-xl text-sm text-ink-muted">
            Control the homepage hero video/poster and key page imagery. Paste a
            public URL or a Supabase Storage path. Changes apply immediately on
            this device; with Supabase connected they sync to production.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium',
              supabaseOn
                ? 'bg-emerald-500/15 text-emerald-800'
                : 'bg-amber-500/15 text-amber-900'
            )}
          >
            <span
              className={cn(
                'h-1.5 w-1.5 rounded-full',
                supabaseOn ? 'bg-emerald-600' : 'bg-amber-600'
              )}
            />
            {supabaseOn ? 'Supabase live' : 'Local mock mode'}
          </span>
          {saved && (
            <span className="inline-flex items-center gap-1 text-emerald-700">
              <Check className="h-3.5 w-3.5" /> Saved
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {slots.map((asset) => (
          <article
            key={asset.id}
            className="group overflow-hidden rounded-2xl border border-forest/10 bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="relative aspect-[16/10] bg-forest/5">
              {asset.kind === 'video' ? (
                <video
                  src={asset.url}
                  poster={asset.poster_url || undefined}
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={asset.url}
                  alt={asset.alt || asset.label}
                  className="h-full w-full object-cover"
                />
              )}
              <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-forest/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                {asset.kind === 'video' ? (
                  <Video className="h-3 w-3" />
                ) : (
                  <ImageIcon className="h-3 w-3" />
                )}
                {asset.slot}
              </div>
            </div>
            <div className="flex items-start justify-between gap-3 p-4">
              <div className="min-w-0">
                <h2 className="truncate font-medium text-forest">{asset.label}</h2>
                <p className="mt-0.5 truncate text-xs text-ink-muted">{asset.url}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => startEdit(asset)}>
                Edit
              </Button>
            </div>
          </article>
        ))}
      </div>

      <div className="rounded-2xl border border-dashed border-forest/20 bg-sand/40 p-5 text-sm text-ink-muted">
        <p className="font-medium text-forest">Upload tips</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            Create a public <code className="text-xs">media</code> bucket in
            Supabase Storage, then paste the public object URL here.
          </li>
          <li>Hero video: MP4, 1080p, under ~15&nbsp;MB for fast mobile loads.</li>
          <li>Always set a poster image for video so the first paint stays sharp.</li>
        </ul>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-forest/50 p-0 sm:items-center sm:p-4">
          <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-5 shadow-2xl sm:rounded-2xl sm:p-6">
            <div className="flex items-center gap-2">
              <Upload className="h-4 w-4 text-terracotta" />
              <h2 className="font-serif text-xl font-medium text-forest">{editing.label}</h2>
            </div>
            <p className="mt-1 text-xs text-ink-muted">Slot · {editing.slot}</p>

            <div className="mt-5 space-y-3">
              <label className="block text-sm">
                <span className="text-ink-muted">Asset URL</span>
                <div className="relative mt-1">
                  <Link2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                  <input
                    className="w-full rounded-xl border border-forest/15 py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                    value={editing.url}
                    onChange={(e) => setEditing({ ...editing, url: e.target.value })}
                    placeholder="https://…"
                  />
                </div>
              </label>

              {editing.kind === 'video' && (
                <label className="block text-sm">
                  <span className="text-ink-muted">Poster image URL</span>
                  <input
                    className="mt-1 w-full rounded-xl border border-forest/15 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                    value={editing.poster_url || ''}
                    onChange={(e) => setEditing({ ...editing, poster_url: e.target.value })}
                    placeholder="https://…"
                  />
                </label>
              )}

              <label className="block text-sm">
                <span className="text-ink-muted">Alt text</span>
                <input
                  className="mt-1 w-full rounded-xl border border-forest/15 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                  value={editing.alt || ''}
                  onChange={(e) => setEditing({ ...editing, alt: e.target.value })}
                />
              </label>

              <div className="overflow-hidden rounded-xl border border-forest/10 bg-sand/30">
                <div className="aspect-video">
                  {editing.kind === 'video' ? (
                    <video
                      key={editing.url}
                      src={editing.url}
                      poster={editing.poster_url || undefined}
                      muted
                      controls
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={editing.url}
                      alt={editing.alt || ''}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => setEditing(null)}>
                Cancel
              </Button>
              <Button variant="terracotta" size="sm" className="w-full sm:w-auto" onClick={save}>
                Save media
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
