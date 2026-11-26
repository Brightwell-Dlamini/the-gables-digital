import type { Store, StoreCategory } from "@/data/stores";

/** Category → brand plate colours (bg, fg) for monogram logos */
const CATEGORY_PALETTE: Record<
  StoreCategory,
  { bg: string; fg: string; accent: string }
> = {
  Fashion: { bg: "#0F2E1F", fg: "#F3EFE6", accent: "#D95F43" },
  "Food & Dining": { bg: "#D95F43", fg: "#FFF8F5", accent: "#0F2E1F" },
  "Banks & Finance": { bg: "#1A3A5C", fg: "#E8F0F8", accent: "#C4A35A" },
  "Health & Beauty": { bg: "#5C7A6A", fg: "#F4F8F6", accent: "#D95F43" },
  "Electronics & Tech": { bg: "#1A1714", fg: "#F3EFE6", accent: "#6B9AC4" },
  "Home & Furniture": { bg: "#6B5344", fg: "#F7F0E8", accent: "#C4A35A" },
  Entertainment: { bg: "#2C1810", fg: "#F3EFE6", accent: "#D95F43" },
  Services: { bg: "#3D5A4C", fg: "#EEF4F0", accent: "#C4A35A" },
  Other: { bg: "#4A453F", fg: "#F3EFE6", accent: "#D95F43" },
};

export function categoryPalette(category: StoreCategory) {
  return CATEGORY_PALETTE[category] ?? CATEGORY_PALETTE.Other;
}

/** 1–2 letter monogram from store name */
export function storeMonogram(name: string): string {
  const cleaned = name
    .replace(/\b(limited|ltd|pty|the|and|&|of|eswatini|swaziland)\b/gi, " ")
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (cleaned.length === 0) return "?";
  if (cleaned.length === 1) {
    return cleaned[0].slice(0, 2).toUpperCase();
  }
  return (cleaned[0][0] + cleaned[1][0]).toUpperCase();
}

export function storeLogoSrc(store: Store): string | undefined {
  return store.logoUrl;
}
