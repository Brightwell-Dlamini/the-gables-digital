"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    label: "Retail frontage",
    caption: "High-visibility shopfront along the main court.",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&q=80",
  },
  {
    id: 2,
    label: "Open plan interior",
    caption: "Flexible shell ready for fashion, F&B or services fit-out.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80",
  },
  {
    id: 3,
    label: "Court outlook",
    caption: "Daylight and footfall from the open-air promenade.",
    img: "https://images.unsplash.com/photo-1555529902-5261145633bf?w=1400&q=80",
  },
  {
    id: 4,
    label: "Service & back-of-house",
    caption: "Loading access and practical infrastructure for operators.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80",
  },
];

export function SpaceTour() {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  const prev = () => setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));

  return (
    <div className="overflow-hidden rounded-2xl border border-forest/10 bg-white shadow-glass">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-forest">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.img}
              alt={slide.label}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-end p-6 sm:p-10 text-center text-white">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-terracotta">
                Available space · Preview
              </p>
              <p className="mt-2 font-serif text-2xl sm:text-3xl md:text-4xl font-medium">
                {slide.label}
              </p>
              <p className="mt-2 max-w-md text-sm text-white/80">{slide.caption}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={prev}
          className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-white/15 p-2.5 text-white backdrop-blur-md transition hover:bg-white/25"
          aria-label="Previous view"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-white/15 p-2.5 text-white backdrop-blur-md transition hover:bg-white/25"
          aria-label="Next view"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`View ${s.label}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-6 bg-terracotta" : "w-1.5 bg-white/40 hover:bg-white/70"
              )}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-forest/8 px-4 py-3 sm:px-5">
        <p className="text-xs text-ink-muted">
          <span className="font-semibold text-forest">{index + 1}</span>
          <span className="mx-1 text-ink-muted/50">/</span>
          {slides.length} · Space tour
        </p>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-terracotta">
          <Maximize2 className="h-3.5 w-3.5" />
          Interactive preview
        </span>
      </div>
    </div>
  );
}
