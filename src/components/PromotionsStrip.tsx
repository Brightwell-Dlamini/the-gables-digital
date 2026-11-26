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
    <section className="py-16 sm:py-20 bg-sand/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xs font-semibold uppercase tracking-[0.22em] text-terracotta flex items-center gap-2"
            >
              <Megaphone className="h-4 w-4" />
              What's on
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06, duration: 0.6, ease: easeOut }}
              className="mt-2 font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-forest tracking-tight"
            >
              Deals, drops & moments
            </motion.h2>
          </div>
          <Button asChild variant="outline" size="sm" className="self-start sm:self-auto">
            <Link href="/events" className="gap-2">
              View all events
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {featured.map((promo, i) => (
            <motion.article
              key={promo.id}
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: easeOut }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="group relative overflow-hidden rounded-2xl border border-forest/10 bg-white p-6 sm:p-8 shadow-sm hover:shadow-glass transition-shadow"
            >
              <span className="inline-block rounded-full bg-terracotta/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-terracotta">
                {promo.tag}
              </span>
              <h3 className="mt-3 font-serif text-xl sm:text-2xl font-medium text-forest">
                {promo.title}
              </h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed max-w-md">
                {promo.summary}
              </p>
              {promo.href && (
                <Link
                  href={promo.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-forest transition-colors hover:text-terracotta"
                >
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
