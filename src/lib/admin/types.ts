import type { Store, StoreCategory } from "@/data/stores";

export type { Store, StoreCategory };

export type LeasingStatus =
  | "new"
  | "in_review"
  | "shortlisted"
  | "offer"
  | "declined";

export type MessageStatus = "unread" | "read" | "archived";

export interface LeasingApplication {
  id: string;
  createdAt: string;
  persona: string;
  spaceSize: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  fileName?: string;
  status: LeasingStatus;
  notes?: string;
}

export interface ContactMessage {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: MessageStatus;
}

export interface ManagedEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  tag?: string;
  published: boolean;
}

export interface ManagedShowtime {
  id: string;
  title: string;
  rating: string;
  times: string[];
  genre?: string;
  published: boolean;
}

export interface ManagedPromotion {
  id: string;
  title: string;
  summary: string;
  tag: string;
  href?: string;
  featured: boolean;
  published: boolean;
}

export interface OpeningHours {
  monFri: string;
  saturday: string;
  sunday: string;
}

export interface CentreContact {
  phone: string;
  email: string;
  address: string;
}

export type SeasonalThemeId =
  | "default"
  | "christmas"
  | "valentine"
  | "halloween"
  | "easter"
  | "independence"
  | "umhlanga"
  | "buganu";

export interface ThemeScheduleEntry {
  themeId: SeasonalThemeId;
  start: string;
  end: string;
  label: string;
}

export interface ThemeSettings {
  mode: "auto" | "manual";
  themeId: SeasonalThemeId;
  schedule: ThemeScheduleEntry[];
}

export interface SiteSettings {
  hours: OpeningHours;
  contact: CentreContact;
  theme: ThemeSettings;
  showMovieZone: boolean;
  showPromotions: boolean;
}

export interface AdminUser {
  email: string;
  name: string;
  role: "super" | "leasing" | "marketing" | "viewer";
}
