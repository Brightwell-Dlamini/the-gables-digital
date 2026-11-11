"use client";

import { motion } from "framer-motion";
import { Heart, Phone, MapPin, Store as StoreIcon } from "lucide-react";
import { Store } from "@/data/stores";
import { cn } from "@/lib/utils";

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
  return (
    <motion.article
      layout
      layoutId={store.id}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-forest/10 bg-white shadow-sm transition-shadow hover:shadow-glass-sm"
    >
      <button
        type="button"
        onClick={() => onSelect(store)}
        className="flex flex-1 flex-col p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-inset"
      >
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest/5 text-forest">
            <StoreIcon className="h-5 w-5" />
          </div>
          <span className="rounded-full bg-sand px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-ink-muted">
            {store.category}
          </span>
        </div>
        <h3 className="font-serif text-lg font-medium text-forest leading-snug group-hover:text-forest-600 transition-colors">
          {store.name}
        </h3>
        <p className="mt-1 text-sm text-ink-muted">Shop {store.shopNumber}</p>
        {store.description && (
          <p className="mt-2 text-sm text-ink/70 line-clamp-2">{store.description}</p>
        )}
      </button>
      <div className="flex items-center justify-between border-t border-forest/5 px-4 py-3">
        <div className="flex items-center gap-3">
          {store.phone && (
            <a
              href={`tel:${store.phone.replace(/\s/g, "")}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs text-ink-muted hover:text-forest transition-colors"
              aria-label={`Call ${store.name}`}
            >
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Call</span>
            </a>
          )}
          <button
            type="button"
            onClick={() => onSelect(store)}
            className="flex items-center gap-1.5 text-xs text-ink-muted hover:text-forest transition-colors"
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
              ? "text-terracotta bg-terracotta/10"
              : "text-ink-muted hover:text-terracotta hover:bg-terracotta/5"
          )}
          aria-label={isFavourite ? `Remove ${store.name} from favourites` : `Save ${store.name} to favourites`}
        >
          <Heart className={cn("h-4 w-4", isFavourite && "fill-current")} />
        </button>
      </div>
    </motion.article>
  );
}
