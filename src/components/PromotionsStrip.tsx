"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Megaphone } from "lucide-react";
import { promotions } from "@/data/promotions";
import { Button } from "@/components/ui/button";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function PromotionsStrip() {
  const featured = promotions.filter((p) => p.featured);

  return (
    <section className="relative py-16 sm:py-22 bg-sand/50 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-terracotta/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
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
              className="mt-2 font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-forest tracking-tight"
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
            <Button asChild variant="outline" size="sm" className="self-start sm:self-auto">
              <Link href="/events" className="gap-2">
                View all events
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {featured.map((promo, i) => (
            <motion.article
              key={promo.id}
              initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.12,
                type: "spring",
                stiffness: 130,
                damping: 16,
              }}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}
              className="group relative overflow-hidden rounded-2xl border border-forest/10 bg-white p-6 sm:p-8 shadow-sm hover:shadow-glass transition-shadow"
            >
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-terracotta/5 transition-transform duration-500 group-hover:scale-150" />
              <span className="relative inline-block rounded-full bg-terracotta/12 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-terracotta">
                {promo.tag}
              </span>
              <h3 className="relative mt-3 font-serif text-xl sm:text-2xl font-medium text-forest">
                {promo.title}
              </h3>
              <p className="relative mt-2 text-sm text-ink-muted leading-relaxed max-w-md">
                {promo.summary}
              </p>
              {promo.href && (
                <Link
                  href={promo.href}
                  className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-forest transition-colors hover:text-terracotta"
                >
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
