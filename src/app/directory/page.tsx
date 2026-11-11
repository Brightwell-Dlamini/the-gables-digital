"use client";

import { useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Search, LayoutGrid, Map as MapIcon, X } from "lucide-react";
import { stores, categories, searchStores, type Store, type StoreCategory } from "@/data/stores";
import { StoreCard } from "@/components/directory/StoreCard";
import { QuickView } from "@/components/directory/QuickView";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "map";

export default function DirectoryPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<StoreCategory | "All">("All");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [favourites, setFavourites] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    let list = stores;
    if (activeCategory !== "All") {
      list = list.filter((s) => s.category === activeCategory);
    }
    return searchStores(query, list);
  }, [query, activeCategory]);

  const toggleFavourite = useCallback((id: string) => {
    setFavourites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return (
    <div className="min-h-screen bg-sand">
      <section className="border-b border-forest/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-ink-muted">Discover</p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-forest tracking-tight">
            Smart Directory
          </h1>
          <p className="mt-3 max-w-2xl text-ink-muted leading-relaxed">
            Explore 96+ stores, restaurants and services. Search, filter and save your favourites.
            Switch to map view to see approximate locations within the centre.
          </p>
        </div>
      </section>

      <div className="sticky top-16 z-30 border-b border-forest/10 bg-sand/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search stores, e.g. Woolworths, bank, coffee…"
                className="w-full rounded-lg border border-forest/15 bg-white py-2.5 pl-10 pr-10 text-sm text-forest placeholder:text-ink-muted/70 focus:border-forest/40 focus:outline-none focus:ring-2 focus:ring-terracotta/30"
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

            <div className="flex items-center gap-1 rounded-lg border border-forest/15 bg-white p-1">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  viewMode === "grid" ? "bg-forest text-white" : "text-ink-muted hover:text-forest"
                )}
                aria-pressed={viewMode === "grid"}
              >
                <LayoutGrid className="h-4 w-4" />
                Grid
              </button>
              <button
                type="button"
                onClick={() => setViewMode("map")}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  viewMode === "map" ? "bg-forest text-white" : "text-ink-muted hover:text-forest"
                )}
                aria-pressed={viewMode === "map"}
              >
                <MapIcon className="h-4 w-4" />
                Map
              </button>
            </div>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setActiveCategory("All")}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                activeCategory === "All"
                  ? "bg-forest text-white"
                  : "bg-white text-ink-muted border border-forest/10 hover:border-forest/30 hover:text-forest"
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                  activeCategory === cat
                    ? "bg-forest text-white"
                    : "bg-white text-ink-muted border border-forest/10 hover:border-forest/30 hover:text-forest"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-6">
          <p className="text-sm text-ink-muted">
            {filtered.length} {filtered.length === 1 ? "result" : "results"}
            {query && (
              <>
                {" "}for “<span className="font-medium text-forest">{query}</span>”
              </>
            )}
          </p>
        </div>

        {viewMode === "grid" ? (
          <LayoutGroup>
            <motion.div
              layout
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((store) => (
                  <StoreCard
                    key={store.id}
                    store={store}
                    onSelect={setSelectedStore}
                    isFavourite={favourites.has(store.id)}
                    onToggleFavourite={toggleFavourite}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        ) : (
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-forest/10 bg-forest/5">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sand via-sand/80 to-forest/10" />
            <p className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-forest shadow-sm">
              Approximate centre layout · Click a pin
            </p>
            {filtered.map((store) => (
              <button
                key={store.id}
                type="button"
                onClick={() => setSelectedStore(store)}
                className="absolute z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-forest text-white text-[10px] font-bold shadow-md transition-transform hover:scale-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
                style={{
                  left: `${store.mapX ?? 50}%`,
                  top: `${store.mapY ?? 50}%`,
                }}
                title={store.name}
                aria-label={store.name}
              >
                {store.name.charAt(0)}
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-ink-muted">No stores match your filters</p>
              </div>
            )}
          </div>
        )}

        {filtered.length === 0 && viewMode === "grid" && (
          <div className="py-20 text-center">
            <p className="text-lg text-ink-muted">No stores match your search.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setQuery("");
                setActiveCategory("All");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>

      <QuickView
        store={selectedStore}
        open={!!selectedStore}
        onOpenChange={(open) => !open && setSelectedStore(null)}
        isFavourite={selectedStore ? favourites.has(selectedStore.id) : false}
        onToggleFavourite={toggleFavourite}
      />
    </div>
  );
}
