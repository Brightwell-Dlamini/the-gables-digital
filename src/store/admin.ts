"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { stores as seedStores, type Store } from "@/data/stores";
import {
  communityEvents as seedEvents,
  showtimes as seedShowtimes,
} from "@/data/events";
import { promotions as seedPromotions } from "@/data/promotions";
import type {
  ContactMessage,
  LeasingApplication,
  ManagedEvent,
  ManagedPromotion,
  ManagedShowtime,
  SeasonalThemeId,
  SiteSettings,
  ThemeSettings,
} from "@/lib/admin/types";
import { DEFAULT_THEME_SCHEDULE } from "@/lib/themes/seasonal";

function uid(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

const defaultSettings: SiteSettings = {
  hours: {
    monFri: "09:00 – 17:00",
    saturday: "09:00 – 14:00",
    sunday: "09:00 – 13:00",
  },
  contact: {
    phone: "+268 2416 1600",
    email: "info@thegables.co.sz",
    address: "MR103, Shebas Rocks, Ezulwini, Eswatini",
  },
  theme: {
    mode: "auto",
    themeId: "default",
    schedule: DEFAULT_THEME_SCHEDULE,
  },
  showMovieZone: true,
  showPromotions: true,
};

const seedLeasing: LeasingApplication[] = [
  {
    id: "lease-seed-1",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    persona: "Fashion",
    spaceSize: "medium",
    name: "Thandi Nkambule",
    email: "thandi@example.com",
    phone: "+268 7600 1122",
    company: "Valley Styles",
    message: "Looking for a mid-size unit near the main court.",
    status: "new",
  },
  {
    id: "lease-seed-2",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    persona: "Food",
    spaceSize: "small",
    name: "Sipho Dlamini",
    email: "sipho.cafe@example.com",
    phone: "+268 7611 3344",
    company: "Sipho's Kitchen",
    status: "in_review",
    notes: "Follow up on power requirements",
  },
];

const seedMessages: ContactMessage[] = [
  {
    id: "msg-seed-1",
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    name: "Nomsa Zwane",
    email: "nomsa@example.com",
    subject: "general",
    message: "Do you allow school group visits on Saturdays?",
    status: "unread",
  },
  {
    id: "msg-seed-2",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    name: "Media Desk",
    email: "press@example.com",
    subject: "media",
    message: "Requesting a quote on the solar project for a feature.",
    status: "read",
  },
];

interface AdminState {
  stores: Store[];
  events: ManagedEvent[];
  showtimes: ManagedShowtime[];
  promotions: ManagedPromotion[];
  leasing: LeasingApplication[];
  messages: ContactMessage[];
  settings: SiteSettings;
  upsertStore: (store: Store) => void;
  removeStore: (id: string) => void;
  upsertEvent: (event: ManagedEvent) => void;
  removeEvent: (id: string) => void;
  upsertShowtime: (show: ManagedShowtime) => void;
  removeShowtime: (id: string) => void;
  upsertPromotion: (p: ManagedPromotion) => void;
  removePromotion: (id: string) => void;
  addLeasing: (
    app: Omit<LeasingApplication, "id" | "createdAt" | "status"> &
      { status?: LeasingApplication["status"] }
  ) => void;
  setLeasingStatus: (
    id: string,
    status: LeasingApplication["status"],
    notes?: string
  ) => void;
  addMessage: (
    msg: Omit<ContactMessage, "id" | "createdAt" | "status"> &
      { status?: ContactMessage["status"] }
  ) => void;
  setMessageStatus: (id: string, status: ContactMessage["status"]) => void;
  updateSettings: (partial: Partial<SiteSettings>) => void;
  setThemeMode: (mode: ThemeSettings["mode"]) => void;
  setManualTheme: (themeId: SeasonalThemeId) => void;
  setThemeSchedule: (schedule: ThemeSettings["schedule"]) => void;
  resetContentToSeed: () => void;
}

export const useAdmin = create<AdminState>()(
  persist(
    (set) => ({
      stores: seedStores.map((s) => ({ ...s })),
      events: seedEvents.map((e) => ({ ...e, published: true })),
      showtimes: seedShowtimes.map((s, i) => ({
        id: `show-${i}-${s.title.toLowerCase().replace(/\s+/g, "-")}`,
        title: s.title,
        rating: s.rating,
        times: s.times,
        genre: s.genre,
        published: true,
      })),
      promotions: seedPromotions.map((p) => ({
        ...p,
        featured: !!p.featured,
        published: true,
      })),
      leasing: seedLeasing,
      messages: seedMessages,
      settings: defaultSettings,

      upsertStore: (store) =>
        set((s) => {
          const idx = s.stores.findIndex((x) => x.id === store.id);
          if (idx >= 0) {
            const next = [...s.stores];
            next[idx] = store;
            return { stores: next };
          }
          return { stores: [...s.stores, store] };
        }),
      removeStore: (id) =>
        set((s) => ({ stores: s.stores.filter((x) => x.id !== id) })),

      upsertEvent: (event) =>
        set((s) => {
          const idx = s.events.findIndex((x) => x.id === event.id);
          if (idx >= 0) {
            const next = [...s.events];
            next[idx] = event;
            return { events: next };
          }
          return { events: [...s.events, event] };
        }),
      removeEvent: (id) =>
        set((s) => ({ events: s.events.filter((x) => x.id !== id) })),

      upsertShowtime: (show) =>
        set((s) => {
          const idx = s.showtimes.findIndex((x) => x.id === show.id);
          if (idx >= 0) {
            const next = [...s.showtimes];
            next[idx] = show;
            return { showtimes: next };
          }
          return { showtimes: [...s.showtimes, show] };
        }),
      removeShowtime: (id) =>
        set((s) => ({ showtimes: s.showtimes.filter((x) => x.id !== id) })),

      upsertPromotion: (p) =>
        set((s) => {
          const idx = s.promotions.findIndex((x) => x.id === p.id);
          if (idx >= 0) {
            const next = [...s.promotions];
            next[idx] = p;
            return { promotions: next };
          }
          return { promotions: [...s.promotions, p] };
        }),
      removePromotion: (id) =>
        set((s) => ({ promotions: s.promotions.filter((x) => x.id !== id) })),

      addLeasing: (app) =>
        set((s) => ({
          leasing: [
            {
              ...app,
              id: uid("lease"),
              createdAt: new Date().toISOString(),
              status: app.status ?? "new",
            },
            ...s.leasing,
          ],
        })),
      setLeasingStatus: (id, status, notes) =>
        set((s) => ({
          leasing: s.leasing.map((a) =>
            a.id === id ? { ...a, status, notes: notes ?? a.notes } : a
          ),
        })),

      addMessage: (msg) =>
        set((s) => ({
          messages: [
            {
              ...msg,
              id: uid("msg"),
              createdAt: new Date().toISOString(),
              status: msg.status ?? "unread",
            },
            ...s.messages,
          ],
        })),
      setMessageStatus: (id, status) =>
        set((s) => ({
          messages: s.messages.map((m) =>
            m.id === id ? { ...m, status } : m
          ),
        })),

      updateSettings: (partial) =>
        set((s) => ({ settings: { ...s.settings, ...partial } })),
      setThemeMode: (mode) =>
        set((s) => ({
          settings: {
            ...s.settings,
            theme: { ...s.settings.theme, mode },
          },
        })),
      setManualTheme: (themeId) =>
        set((s) => ({
          settings: {
            ...s.settings,
            theme: { ...s.settings.theme, mode: "manual", themeId },
          },
        })),
      setThemeSchedule: (schedule) =>
        set((s) => ({
          settings: {
            ...s.settings,
            theme: { ...s.settings.theme, schedule },
          },
        })),

      resetContentToSeed: () =>
        set({
          stores: seedStores.map((s) => ({ ...s })),
          events: seedEvents.map((e) => ({ ...e, published: true })),
          promotions: seedPromotions.map((p) => ({
            ...p,
            featured: !!p.featured,
            published: true,
          })),
          settings: defaultSettings,
        }),
    }),
    { name: "gables-admin-v1" }
  )
);
