"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  { id: 1, label: "Retail frontage", caption: "High-visibility shopfront along the main court.", gradient: "from-forest via-forest-600 to-forest-800" },
  { id: 2, label: "Open plan interior", caption: "Flexible shell ready for fashion, F&B or services fit-out.", gradient: "from-forest-700 via-forest to-terracotta/40" },
  { id: 3, label: "Court outlook", caption: "Daylight and footfall from the open-air promenade.", gradient: "from-sand via-forest-100 to-forest-600" },
  { id: 4, label: "Service & back-of-house", caption: "Loading access and practical infrastructure for operators.", gradient: "from-ink via-forest-800 to-forest" },
];

export function SpaceTour() {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const prev = () => setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));

  return (
    <div className="overflow-hidden rounded-2xl border border-forest/10 bg-white shadow-glass-sm dark:border-white/10 dark:bg-forest-800">
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className={cn("absolute inset-0 bg-gradient-to-br", slide.gradient)}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">Available space · Preview</p>
              <p className="mt-2 font-serif text-2xl sm:text-3xl font-medium">{slide.label}</p>
              <p className="mt-2 max-w-md text-sm text-white/80">{slide.caption}</p>
            </div>
          </motion.div>
        </AnimatePresence>
        <button type="button" onClick={prev} className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 text-forest shadow-md hover:bg-white dark:bg-forest-900/90 dark:text-sand" aria-label="Previous view">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button type="button" onClick={next} className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 text-forest shadow-md hover:bg-white dark:bg-forest-900/90 dark:text-sand" aria-label="Next view">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="flex items-center justify-center gap-2 px-4 py-3">
        {slides.map((s, i) => (
          <button key={s.id} type="button" onClick={() => setIndex(i)} className={cn("h-1.5 rounded-full transition-all", i === index ? "w-6 bg-terracotta" : "w-1.5 bg-forest/20 dark:bg-sand/30")} aria-label={`View ${s.label}`} aria-current={i === index} />
        ))}
      </div>
    </div>
  );
}
