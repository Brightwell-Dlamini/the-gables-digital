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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-forest/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glass hover:border-forest/20"
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
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background:
                "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
            }}
          />
          <div
            className="absolute right-0 top-0 h-16 w-16 opacity-40"
            style={{
              background: `radial-gradient(circle at top right, ${palette.accent}, transparent 70%)`,
            }}
          />
          {store.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={store.logoUrl}
              alt=""
              className="relative z-[1] max-h-[58%] max-w-[70%] object-contain drop-shadow-sm"
            />
          ) : (
            <span
              className="relative z-[1] font-serif text-4xl sm:text-5xl font-medium tracking-tight select-none"
              style={{ color: palette.fg }}
              aria-hidden
            >
              {mono}
            </span>
          )}
          <span
            className="absolute bottom-3 left-3 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm"
            style={{ backgroundColor: "rgba(0,0,0,0.35)", color: "#F3EFE6" }}
          >
            Shop {store.shopNumber}
          </span>
        </div>
      </button>

      <button
        type="button"
        onClick={() => onSelect(store)}
        className="flex flex-1 flex-col p-4 text-left focus:outline-none sm:p-5"
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-lg font-medium leading-snug text-forest">
            {store.name}
          </h3>
          <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-ink-muted opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
        </div>
        <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-muted">
          {store.category}
        </p>
        {store.description && (
          <p className="mt-2 line-clamp-2 text-sm text-ink-muted/90 leading-relaxed">
            {store.description}
          </p>
        )}
      </button>

      <div className="flex items-center justify-between border-t border-forest/6 px-4 py-2.5 sm:px-5">
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
