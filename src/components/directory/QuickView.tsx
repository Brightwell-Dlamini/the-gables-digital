"use client";

import { Phone, MapPin, Heart, ExternalLink } from "lucide-react";
import { Store } from "@/data/stores";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { categoryPalette, storeMonogram } from "@/lib/storeLogo";

interface QuickViewProps {
  store: Store | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isFavourite?: boolean;
  onToggleFavourite?: (id: string) => void;
}

export function QuickView({
  store,
  open,
  onOpenChange,
  isFavourite = false,
  onToggleFavourite,
}: QuickViewProps) {
  if (!store) return null;

  const palette = categoryPalette(store.category);
  const mono = storeMonogram(store.name);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=The+Gables+Shopping+Centre+Ezulwini+Shop+${encodeURIComponent(store.shopNumber)}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md overflow-hidden p-0">
        <div className="relative flex h-28 items-center justify-center" style={{ backgroundColor: palette.bg }}>
          <div className="pointer-events-none absolute inset-0 opacity-25" style={{ background: "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)" }} />
          {store.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={store.logoUrl} alt="" className="relative z-[1] max-h-16 max-w-[50%] object-contain" />
          ) : (
            <span className="relative z-[1] font-serif text-4xl font-medium tracking-tight" style={{ color: palette.fg }}>
              {mono}
            </span>
          )}
        </div>
        <div className="p-6">
          <DialogHeader className="text-left">
            <p className="text-xs font-medium uppercase tracking-wider text-ink-muted">{store.category}</p>
            <DialogTitle className="text-2xl text-forest">{store.name}</DialogTitle>
            <DialogDescription className="mt-1">Shop {store.shopNumber}</DialogDescription>
          </DialogHeader>
          {store.description && (
            <p className="mt-4 text-sm leading-relaxed text-ink/80">{store.description}</p>
          )}
          <div className="mt-5 space-y-3">
            {store.phone && (
              <a href={`tel:${store.phone.replace(/\s/g, "")}`} className="flex items-center gap-2.5 text-sm text-forest hover:text-terracotta transition-colors">
                <Phone className="h-4 w-4 text-terracotta" />
                {store.phone}
              </a>
            )}
            {store.email && (
              <a href={`mailto:${store.email}`} className="flex items-center gap-2.5 text-sm text-forest hover:text-terracotta transition-colors break-all">
                <ExternalLink className="h-4 w-4 text-terracotta shrink-0" />
                {store.email}
              </a>
            )}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button variant="terracotta" size="sm" className="gap-1.5" onClick={() => onToggleFavourite?.(store.id)}>
              <Heart className={cn("h-4 w-4", isFavourite && "fill-current")} />
              {isFavourite ? "Saved" : "Save"}
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5" asChild>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                <MapPin className="h-4 w-4" /> Map
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
