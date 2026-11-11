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

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=The+Gables+Shopping+Centre+Ezulwini+Shop+${encodeURIComponent(store.shopNumber)}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4 pr-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-ink-muted mb-1">
                {store.category}
              </p>
              <DialogTitle className="text-2xl">{store.name}</DialogTitle>
              <DialogDescription className="mt-1">
                Shop {store.shopNumber}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {store.description && (
          <p className="text-sm text-ink/80 leading-relaxed">{store.description}</p>
        )}

        <div className="space-y-3 pt-2">
          {store.phone && (
            <a
              href={`tel:${store.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 rounded-lg border border-forest/10 px-4 py-3 text-sm font-medium text-forest transition-colors hover:bg-forest/5"
            >
              <Phone className="h-4 w-4 shrink-0" />
              <span>{store.phone}</span>
              <span className="ml-auto text-xs text-ink-muted">Tap to call</span>
            </a>
          )}

          {store.email && (
            <a
              href={`mailto:${store.email}`}
              className="flex items-center gap-3 rounded-lg border border-forest/10 px-4 py-3 text-sm font-medium text-forest transition-colors hover:bg-forest/5"
            >
              <span className="text-ink-muted">@</span>
              <span className="truncate">{store.email}</span>
            </a>
          )}

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-forest/10 px-4 py-3 text-sm font-medium text-forest transition-colors hover:bg-forest/5"
          >
            <MapPin className="h-4 w-4 shrink-0" />
            <span>Get Directions</span>
            <ExternalLink className="ml-auto h-3.5 w-3.5 text-ink-muted" />
          </a>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            className="flex-1 gap-2"
            onClick={() => onToggleFavourite?.(store.id)}
          >
            <Heart
              className={cn(
                "h-4 w-4",
                isFavourite && "fill-terracotta text-terracotta"
              )}
            />
            {isFavourite ? "Saved" : "Save to Favourites"}
          </Button>
          <Button
            variant="terracotta"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
