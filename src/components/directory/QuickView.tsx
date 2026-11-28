"use client";

import { Phone, MapPin, Heart, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
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
      <DialogContent className="sm:max-w-md overflow-hidden p-0 gap-0 border-forest/10 shadow-2xl">
        <div
          className="relative flex h-36 items-center justify-center overflow-hidden"
          style={{ backgroundColor: palette.bg }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)",
            }}
          />
          <div
            className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-60"
            style={{
              background: `radial-gradient(circle, ${palette.accent}, transparent 70%)`,
            }}
          />
          {store.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={store.logoUrl}
              alt=""
              className="relative z-[1] max-h-16 max-w-[50%] object-contain"
            />
          ) : (
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 16 }}
              className="relative z-[1] font-serif text-5xl font-medium tracking-tight"
              style={{ color: palette.fg }}
            >
              {mono}
            </motion.span>
          )}
          <span className="absolute bottom-3 left-4 rounded-full border border-white/25 bg-white/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
            {store.category}
          </span>
        </div>

        <div className="p-6">
          <DialogHeader className="text-left space-y-1">
            <DialogTitle className="font-serif text-2xl text-forest tracking-tight">
              {store.name}
            </DialogTitle>
            <DialogDescription className="text-sm text-ink-muted leading-relaxed">
              {store.description ||
                `Find ${store.name} at The Gables, Ezulwini.`}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-5 space-y-3">
            {store.shopNumber && (
              <div className="flex items-center gap-3 rounded-xl border border-forest/8 bg-sand/50 px-3.5 py-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-terracotta" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                    Unit
                  </p>
                  <p className="text-sm font-medium text-forest">
                    Shop {store.shopNumber}
                  </p>
                </div>
              </div>
            )}
            {store.phone && (
              <a
                href={`tel:${store.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 rounded-xl border border-forest/8 bg-sand/50 px-3.5 py-2.5 transition-colors hover:border-terracotta/30 hover:bg-terracotta/5"
              >
                <Phone className="h-4 w-4 shrink-0 text-terracotta" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                    Call
                  </p>
                  <p className="text-sm font-medium text-forest">{store.phone}</p>
                </div>
              </a>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button
              asChild
              variant="terracotta"
              className="rounded-full gap-1.5 flex-1 btn-lift"
            >
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                Directions <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
            <Button
              type="button"
              variant="outline"
              className={cn(
                "rounded-full gap-1.5",
                isFavourite && "border-terracotta/40 text-terracotta"
              )}
              onClick={() => onToggleFavourite?.(store.id)}
            >
              <Heart
                className={cn("h-4 w-4", isFavourite && "fill-current")}
              />
              {isFavourite ? "Saved" : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
