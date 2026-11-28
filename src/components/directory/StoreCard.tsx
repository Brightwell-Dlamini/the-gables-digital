"use client";

import { motion } from "framer-motion";
import { Heart, Phone, MapPin, ChevronRight } from "lucide-react";
import { Store } from "@/data/stores";
import { cn } from "@/lib/utils";
import { categoryPalette, storeMonogram } from "@/lib/storeLogo";

interface StoreCardProps {
  store: Store;
  onSelect: (store: Store) => void;
  isFavourite?: boolean;
  onToggleFavourite?: (id: string) => void;
}

export function StoreCard({
  store,
  onSelect,
  isFavourite = false,
  onToggleFavourite,
}: StoreCardProps) {
  const palette = categoryPalette(store.category);
  const mono = storeMonogram(store.name);

  return (
    <motion.article
      layout
      layoutId={store.id}
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.22 } }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-forest/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-glass hover:border-forest/20"
    >
      <button
        type="button"
        onClick={() => onSelect(store)}
        className="relative block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-inset"
      >
        <div
          className="relative flex aspect-[16/10] items-center justify-center overflow-hidden"
          style={{ backgroundColor: palette.bg }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-50"
            style={{
              background:
                "linear-gradient(135deg, transparent 35%, rgba(255,255,255,0.22) 48%, transparent 62%)",
            }}
          />
          <div
            className="absolute right-0 top-0 h-24 w-24 opacity-50 transition-opacity duration-500 group-hover:opacity-90"
            style={{
              background: `radial-gradient(circle at top right, ${palette.accent}, transparent 70%)`,
            }}
          />
          <span
            className="relative z-[1] font-serif text-3xl sm:text-4xl font-medium tracking-tight transition-transform duration-500 group-hover:scale-110"
            style={{ color: palette.fg }}
          >
            {mono}
          </span>
          <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 backdrop-blur-sm">
            <ChevronRight className="h-4 w-4" />
          </span>
        </div>
      </button>

      <button
        type="button"
        onClick={() => onSelect(store)}
        className="flex flex-1 flex-col items-start px-4 py-4 text-left focus:outline-none sm:p-5"
      >
        <div className="flex w-full items-start justify-between gap-2">
          <h3 className="font-serif text-lg font-medium leading-snug text-forest">
            {store.name}
          </h3>
          <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-ink-muted opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
        </div>
        <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-terracotta/90">
          {store.category}
        </p>
        {store.description && (
          <p className="mt-2 line-clamp-2 text-sm text-ink-muted leading-relaxed">
            {store.description}
          </p>
        )}
      </button>

      <div className="flex items-center justify-between border-t border-forest/8 px-4 py-2.5 sm:px-5">
        <div className="flex items-center gap-3">
          {store.phone && (
            <a
              href={`tel:${store.phone.replace(/\s/g, "")}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs font-medium text-ink-muted transition-colors hover:text-forest"
              aria-label={`Call ${store.name}`}
            >
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Call</span>
            </a>
          )}
          <button
            type="button"
            onClick={() => onSelect(store)}
            className="flex items-center gap-1.5 text-xs font-medium text-ink-muted transition-colors hover:text-forest"
          >
            <MapPin className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Details</span>
          </button>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavourite?.(store.id);
          }}
          className={cn(
            "rounded-full p-1.5 transition-colors",
            isFavourite
              ? "bg-terracotta/10 text-terracotta"
              : "text-ink-muted hover:bg-terracotta/5 hover:text-terracotta"
          )}
          aria-label={
            isFavourite
              ? `Remove ${store.name} from favourites`
              : `Save ${store.name} to favourites`
          }
        >
          <Heart className={cn("h-4 w-4", isFavourite && "fill-current")} />
        </button>
      </div>
    </motion.article>
  );
}
