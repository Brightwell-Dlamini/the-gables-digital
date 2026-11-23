import type { SeasonalThemeId, ThemeScheduleEntry } from "@/lib/admin/types";

export interface SeasonalThemeMeta {
  id: SeasonalThemeId;
  name: string;
  description: string;
  swatch: string;
}

export const SEASONAL_THEMES: SeasonalThemeMeta[] = [
  { id: "default", name: "Gables Classic", description: "Forest, sand & terracotta — year-round brand", swatch: "#0F2E1F" },
  { id: "christmas", name: "Festive Christmas", description: "Deep greens, berry red and gold for December", swatch: "#8B1E2D" },
  { id: "valentine", name: "Valentine", description: "Soft rose and warm blush for mid-February", swatch: "#C45B7A" },
  { id: "halloween", name: "Halloween", description: "Amber, charcoal and pumpkin for late October", swatch: "#E07A2F" },
  { id: "easter", name: "Easter", description: "Soft sage, cream and lilac for the Easter window", swatch: "#7BA38A" },
  { id: "independence", name: "Independence Day", description: "Eswatini blue, yellow and red for 6 September", swatch: "#0033A0" },
  { id: "umhlanga", name: "Umhlanga / Reed Dance", description: "Earthy ochre, reed gold and royal accents (late Aug–Sept)", swatch: "#C4A35A" },
  { id: "buganu", name: "Buganu / Marula", description: "Marula green and sun-gold for the marula season", swatch: "#5C8A3D" },
];

export const DEFAULT_THEME_SCHEDULE: ThemeScheduleEntry[] = [
  { themeId: "valentine", start: "02-01", end: "02-16", label: "Valentine period" },
  { themeId: "easter", start: "03-20", end: "04-15", label: "Easter window (approx)" },
  { themeId: "umhlanga", start: "08-20", end: "09-05", label: "Umhlanga season" },
  { themeId: "independence", start: "09-01", end: "09-10", label: "Independence Day (6 Sept)" },
  { themeId: "halloween", start: "10-20", end: "11-02", label: "Halloween / All Saints" },
  { themeId: "buganu", start: "01-15", end: "02-28", label: "Buganu / Marula season" },
  { themeId: "christmas", start: "12-01", end: "01-06", label: "Festive season" },
];

function parseMd(md: string): { m: number; d: number } {
  const [m, d] = md.split("-").map(Number);
  return { m, d };
}

function ordinal(m: number, d: number): number {
  const days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let n = d;
  for (let i = 1; i < m; i++) n += days[i];
  return n;
}

export function resolveThemeForDate(
  date: Date,
  schedule: ThemeScheduleEntry[],
  mode: "auto" | "manual",
  manualId: SeasonalThemeId
): SeasonalThemeId {
  if (mode === "manual") return manualId;
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const today = ordinal(m, d);
  let active: SeasonalThemeId = "default";
  for (const entry of schedule) {
    const s = parseMd(entry.start);
    const e = parseMd(entry.end);
    const start = ordinal(s.m, s.d);
    const end = ordinal(e.m, e.d);
    const inRange =
      start <= end ? today >= start && today <= end : today >= start || today <= end;
    if (inRange) active = entry.themeId;
  }
  return active;
}

export function themeMeta(id: SeasonalThemeId): SeasonalThemeMeta {
  return SEASONAL_THEMES.find((t) => t.id === id) ?? SEASONAL_THEMES[0];
}
