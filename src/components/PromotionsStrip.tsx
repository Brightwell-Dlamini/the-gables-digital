"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Megaphone, ArrowUpRight } from "lucide-react";
import { promotions } from "@/data/promotions";
import { Button } from "@/components/ui/button";

const easeOut = [0.16, 1, 0.3, 1] as const;
const spring = { type: "spring" as const, stiffness: 140, damping: 16 };

const promoImages = [
  "https://images.unsplash.com/photo-1607083206869-4c79715e227f?w=800&q=80",
  "https://images.unsplash.com/photo-1555529902-5261145633bf?w=800&q=80",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
];

export function PromotionsStrip() {
  const featured = promotions.filter((p) => p.featured);

  return (
    <section className="relative py-16 sm:py-24 bg-sand overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-terracotta/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-forest/8 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xs font-semibold uppercase tracking-[0.22em] text-terracotta flex items-center gap-2"
            >
              <Megaphone className="h-4 w-4" />
              What&apos;s on
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06, duration: 0.65, ease: easeOut }}
              className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-forest tracking-tight"
            >
              Deals, drops & moments
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="mt-2 text-sm text-ink-muted max-w-sm"
            >
              Fresh reasons to swing by this week.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, type: "spring", stiffness: 180 }}
          >
            <Button asChild variant="outline" className="rounded-full gap-1.5">
              <Link href="/events">
                View all events <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(featured.length ? featured : promotions).slice(0, 4).map((promo, i) => (
            <motion.article
              key={promo.id ?? promo.title}
              initial={{ opacity: 0, y: 36, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09, ...spring }}
              whileHover={{ y: -8, transition: { duration: 0.22 } }}
              className="group relative overflow-hidden rounded-2xl aspect-[3/4] shadow-sm ring-1 ring-forest/5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={promoImages[i % promoImages.length]}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/50 to-forest/10" />
              <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 backdrop-blur-sm">
                <ArrowUpRight className="h-4 w-4" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                {promo.tag && (
                  <span className="mb-2 inline-block rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm">
                    {promo.tag}
                  </span>
                )}
                <h3 className="font-serif text-xl font-medium leading-snug">
                  {promo.title}
                </h3>
                {promo.summary && (
                  <p className="mt-1.5 text-sm text-white/80 line-clamp-2">
                    {promo.summary}
                  </p>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
