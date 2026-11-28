"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Search, LayoutGrid, Map as MapIcon, X } from "lucide-react";
import { stores, categories, type Store, type StoreCategory } from "@/data/stores";
import { fuzzySearchStores } from "@/lib/search";
import { StoreCard } from "@/components/directory/StoreCard";
import { QuickView } from "@/components/directory/QuickView";
import { CentreMap } from "@/components/directory/CentreMap";
import { useFavourites } from "@/store/favourites";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "map";

function parseCategory(raw: string | null): StoreCategory | "All" {
  if (!raw) return "All";
  const decoded = decodeURIComponent(raw).trim();
  if (decoded === "All") return "All";
  if ((categories as string[]).includes(decoded)) {
    return decoded as StoreCategory;
  }
  const hit = categories.find(
    (c) =>
      c.toLowerCase() === decoded.toLowerCase() ||
      c.toLowerCase().startsWith(decoded.toLowerCase()) ||
      decoded.toLowerCase().includes(c.toLowerCase().split(" ")[0])
  );
  return hit ?? "All";
}

export default function DirectoryClient() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<StoreCategory | "All">("All");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [showFavsOnly, setShowFavsOnly] = useState(false);

  const { ids, toggle, has } = useFavourites();

  useEffect(() => {
    const cat = searchParams.get("cat");
    setActiveCategory(parseCategory(cat));
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = stores;
    if (showFavsOnly) {
      list = list.filter((s) => ids.includes(s.id));
    }
    if (activeCategory !== "All") {
      list = list.filter((s) => s.category === activeCategory);
    }
    return fuzzySearchStores(query, list);
  }, [query, activeCategory, showFavsOnly, ids]);

  function selectCategory(cat: StoreCategory | "All") {
    setActiveCategory(cat);
    const url = new URL(window.location.href);
    if (cat === "All") url.searchParams.delete("cat");
    else url.searchParams.set("cat", cat);
    window.history.replaceState({}, "", url.pathname + url.search);
  }

  return (
    <div className="min-h-screen bg-sand">
      <section className="relative overflow-hidden border-b border-forest/10 bg-forest text-white">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=70"
            alt=""
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-forest/80" />
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-terracotta/40 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-terracotta"
          >
            Discover
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight"
          >
            {activeCategory !== "All" ? activeCategory : "Find your next stop"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.55 }}
            className="mt-3 max-w-2xl text-white/80 leading-relaxed"
          >
            {activeCategory !== "All"
              ? `${filtered.length} places in ${activeCategory} — search, save favourites, jump to the map.`
              : "96+ stores, restaurants and services. Search, filter by mood, pin your favourites."}
          </motion.p>
        </div>
      </section>

      <div className="sticky top-16 z-30 border-b border-forest/10 bg-sand/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(15,46,31,0.06)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search stores, shops, categories…"
                className="w-full rounded-xl border border-forest/15 bg-white py-2.5 pl-10 pr-10 text-sm text-forest placeholder:text-ink-muted/70 focus:border-forest/40 focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                aria-label="Search directory"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-forest"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowFavsOnly((v) => !v)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  showFavsOnly
                    ? "border-terracotta bg-terracotta/10 text-terracotta"
                    : "border-forest/15 bg-white text-ink-muted hover:border-forest/25"
                )}
              >
                Favourites
              </button>
              <div className="flex rounded-full border border-forest/15 bg-white p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "rounded-full p-2 transition-colors",
                    viewMode === "grid"
                      ? "bg-forest text-white"
                      : "text-ink-muted hover:text-forest"
                  )}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("map")}
                  className={cn(
                    "rounded-full p-2 transition-colors",
                    viewMode === "map"
                      ? "bg-forest text-white"
                      : "text-ink-muted hover:text-forest"
                  )}
                  aria-label="Map view"
                >
                  <MapIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {(["All", ...categories] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => selectCategory(cat)}
                className={cn(
                  "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                  activeCategory === cat
                    ? "bg-forest text-white border-forest shadow-sm"
                    : "bg-white text-ink-muted border-forest/10 hover:border-forest/25 hover:text-forest"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <p className="mb-5 text-sm text-ink-muted">
          <span className="font-medium text-forest">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "result" : "results"}
          {activeCategory !== "All" && (
            <>
              {" "}
              in <span className="font-medium text-forest">{activeCategory}</span>
            </>
          )}
        </p>

        {viewMode === "grid" ? (
          <LayoutGroup>
            <motion.div
              layout
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((store) => (
                  <StoreCard
                    key={store.id}
                    store={store}
                    onSelect={setSelectedStore}
                    isFavourite={has(store.id)}
                    onToggleFavourite={toggle}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        ) : (
          <CentreMap stores={filtered} onSelect={setSelectedStore} />
        )}

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-serif text-xl text-forest">Nothing matches</p>
            <p className="mt-2 text-sm text-ink-muted">
              Try another category or clear your search.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                selectCategory("All");
                setShowFavsOnly(false);
              }}
              className="mt-4 text-sm font-medium text-terracotta hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      <QuickView
        store={selectedStore}
        open={!!selectedStore}
        onOpenChange={(o) => !o && setSelectedStore(null)}
        isFavourite={selectedStore ? has(selectedStore.id) : false}
        onToggleFavourite={toggle}
      />
    </div>
  );
}
