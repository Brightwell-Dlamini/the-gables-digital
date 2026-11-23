import Fuse from "fuse.js";
import { stores, type Store } from "@/data/stores";

/**
 * Fuzzy search over the store directory.
 * Falls back to full list when query is empty.
 */
export function fuzzySearchStores(
  query: string,
  list: Store[] = stores
): Store[] {
  const q = query.trim();
  if (!q) return list;

  const localFuse = new Fuse(list, {
    keys: [
      { name: "name", weight: 0.5 },
      { name: "shopNumber", weight: 0.2 },
      { name: "category", weight: 0.2 },
      { name: "description", weight: 0.1 },
    ],
    threshold: 0.35,
    ignoreLocation: true,
    minMatchCharLength: 1,
  });

  return localFuse.search(q).map((r) => r.item);
}
