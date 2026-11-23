/**
 * Unified data access.
 * - If Supabase is configured → read/write there.
 * - Else → return null so callers fall back to Zustand / seed data.
 */

import { getSupabaseBrowser, getSupabaseService, isSupabaseConfigured } from "./client";
import type { Store } from "@/data/stores";
import type {
  ContactMessage,
  LeasingApplication,
  ManagedEvent,
  ManagedPromotion,
  ManagedShowtime,
  SiteSettings,
} from "@/lib/admin/types";

export type MediaAsset = {
  id: string;
  slot: string;
  label: string;
  kind: "image" | "video";
  url: string;
  poster_url?: string | null;
  alt?: string | null;
  updated_at?: string;
};

export { isSupabaseConfigured };

function mapStore(row: Record<string, unknown>): Store {
  return {
    id: String(row.id),
    name: String(row.name),
    shopNumber: String(row.shop_number ?? "—"),
    category: (row.category as Store["category"]) ?? "Other",
    phone: row.phone ? String(row.phone) : undefined,
    email: row.email ? String(row.email) : undefined,
    description: row.description ? String(row.description) : undefined,
    mapX: row.map_x != null ? Number(row.map_x) : undefined,
    mapY: row.map_y != null ? Number(row.map_y) : undefined,
  };
}

function mapEvent(row: Record<string, unknown>): ManagedEvent {
  return {
    id: String(row.id),
    title: String(row.title),
    date: String(row.date),
    description: String(row.description ?? ""),
    tag: row.tag ? String(row.tag) : undefined,
    published: Boolean(row.published ?? true),
  };
}

function mapShowtime(row: Record<string, unknown>): ManagedShowtime {
  return {
    id: String(row.id),
    title: String(row.title),
    rating: String(row.rating ?? "PG"),
    times: Array.isArray(row.times) ? (row.times as string[]) : [],
    genre: row.genre ? String(row.genre) : undefined,
    published: Boolean(row.published ?? true),
  };
}

function mapPromotion(row: Record<string, unknown>): ManagedPromotion {
  return {
    id: String(row.id),
    title: String(row.title),
    summary: String(row.summary ?? ""),
    tag: String(row.tag ?? "Offer"),
    href: row.href ? String(row.href) : undefined,
    featured: Boolean(row.featured),
    published: Boolean(row.published ?? true),
  };
}

function mapMedia(row: Record<string, unknown>): MediaAsset {
  return {
    id: String(row.id),
    slot: String(row.slot),
    label: String(row.label),
    kind: (row.kind as "image" | "video") ?? "image",
    url: String(row.url),
    poster_url: row.poster_url ? String(row.poster_url) : null,
    alt: row.alt ? String(row.alt) : null,
    updated_at: row.updated_at ? String(row.updated_at) : undefined,
  };
}

export async function fetchStores(): Promise<Store[] | null> {
  const sb = getSupabaseBrowser();
  if (!sb) return null;
  const { data, error } = await sb.from("stores").select("*").eq("published", true).order("sort_order", { ascending: true });
  if (error || !data) return null;
  return data.map(mapStore);
}

export async function fetchEvents(): Promise<ManagedEvent[] | null> {
  const sb = getSupabaseBrowser();
  if (!sb) return null;
  const { data, error } = await sb.from("events").select("*").eq("published", true).order("date", { ascending: true });
  if (error || !data) return null;
  return data.map(mapEvent);
}

export async function fetchShowtimes(): Promise<ManagedShowtime[] | null> {
  const sb = getSupabaseBrowser();
  if (!sb) return null;
  const { data, error } = await sb.from("showtimes").select("*").eq("published", true);
  if (error || !data) return null;
  return data.map(mapShowtime);
}

export async function fetchPromotions(): Promise<ManagedPromotion[] | null> {
  const sb = getSupabaseBrowser();
  if (!sb) return null;
  const { data, error } = await sb.from("promotions").select("*").eq("published", true).order("featured", { ascending: false });
  if (error || !data) return null;
  return data.map(mapPromotion);
}

export async function fetchMediaBySlot(slot: string): Promise<MediaAsset | null> {
  const sb = getSupabaseBrowser();
  if (!sb) return null;
  const { data, error } = await sb.from("media_assets").select("*").eq("slot", slot).maybeSingle();
  if (error || !data) return null;
  return mapMedia(data);
}

export async function fetchAllMedia(): Promise<MediaAsset[] | null> {
  const sb = getSupabaseBrowser();
  if (!sb) return null;
  const { data, error } = await sb.from("media_assets").select("*").order("slot");
  if (error || !data) return null;
  return data.map(mapMedia);
}

export async function fetchSiteSettings(): Promise<Partial<SiteSettings> | null> {
  const sb = getSupabaseBrowser();
  if (!sb) return null;
  const { data, error } = await sb.from("site_settings").select("*").eq("id", "default").maybeSingle();
  if (error || !data) return null;
  return {
    hours: data.hours as SiteSettings["hours"],
    contact: data.contact as SiteSettings["contact"],
    theme: data.theme as SiteSettings["theme"],
    showMovieZone: Boolean(data.show_movie_zone),
    showPromotions: Boolean(data.show_promotions),
  };
}

export async function insertLeasing(
  app: Omit<LeasingApplication, "id" | "createdAt" | "status"> & { status?: LeasingApplication["status"] }
): Promise<boolean> {
  const sb = getSupabaseBrowser();
  if (!sb) return false;
  const id = `lease-${Date.now().toString(36)}`;
  const { error } = await sb.from("leasing_applications").insert({
    id,
    persona: app.persona,
    space_size: app.spaceSize,
    name: app.name,
    email: app.email,
    phone: app.phone,
    company: app.company,
    message: app.message,
    file_name: app.fileName,
    status: app.status ?? "new",
  });
  return !error;
}

export async function insertMessage(
  msg: Omit<ContactMessage, "id" | "createdAt" | "status"> & { status?: ContactMessage["status"] }
): Promise<boolean> {
  const sb = getSupabaseBrowser();
  if (!sb) return false;
  const id = `msg-${Date.now().toString(36)}`;
  const { error } = await sb.from("contact_messages").insert({
    id,
    name: msg.name,
    email: msg.email,
    phone: msg.phone,
    subject: msg.subject,
    message: msg.message,
    status: msg.status ?? "unread",
  });
  return !error;
}

export async function upsertMediaAsset(
  asset: MediaAsset
): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabaseService() ?? getSupabaseBrowser();
  if (!sb) return { ok: false, error: "Supabase not configured" };
  const { error } = await sb.from("media_assets").upsert({
    id: asset.id,
    slot: asset.slot,
    label: asset.label,
    kind: asset.kind,
    url: asset.url,
    poster_url: asset.poster_url ?? null,
    alt: asset.alt ?? null,
    updated_at: new Date().toISOString(),
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
