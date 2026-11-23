"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { promotions } from "@/data/promotions";
import { Button } from "@/components/ui/button";

export function PromotionsStrip() {
  const featured = promotions.filter((p) => p.featured);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-ink-muted flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-terracotta" />
              What's on
            </p>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-forest tracking-tight">
              Promotions & news
            </h2>
          </div>
          <Button asChild variant="outline" size="sm" className="self-start sm:self-auto">
            <Link href="/events" className="gap-2">
              View all events
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {featured.map((promo, i) => (
            <motion.article
              key={promo.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-forest/10 bg-sand p-6 sm:p-8"
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
