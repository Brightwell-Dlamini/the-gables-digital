"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const pillars = [
  {
    title: "Free secure parking",
    copy: "Park once. Shop the whole centre. 24-hour security and an on-site police post.",
    emoji: "🅿️",
    n: "01",
    accent: "from-terracotta/20 to-transparent",
  },
  {
    title: "Anchors you trust",
    copy: "Pick n Pay, Woolworths, Shoprite, Clicks and a full banking strip. One stop, done.",
    emoji: "🛍️",
    n: "02",
    accent: "from-amber-500/15 to-transparent",
  },
  {
    title: "Valley connected",
    copy: "Minutes from Mantenga, Mlilwane and the road between Mbabane and Manzini.",
    emoji: "🗺️",
    n: "03",
    accent: "from-emerald-500/15 to-transparent",
  },
];

const easeOut = [0.16, 1, 0.3, 1] as const;

export function WhyTheGables() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 sm:py-28 bg-white overflow-hidden relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/3 h-64 w-64 rounded-full bg-terracotta/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-10 h-56 w-56 rounded-full bg-forest/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-terracotta"
          >
            Why The Gables
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.06, ease: easeOut }}
            className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-forest text-balance"
          >
            The place people{" "}
            <span className="relative inline-block">
              actually
              <motion.span
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.55, duration: 0.5, ease: easeOut }}
                className="absolute -bottom-1 left-0 right-0 h-[3px] origin-left rounded-full bg-terracotta/70"
              />
            </span>{" "}
            want to go
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mt-4 text-lg text-ink-muted leading-relaxed"
          >
            Close to two national parks, perfectly linked to Mbabane, Matsapha
            and Manzini. Free parking, curated courts, and a lifestyle that feels
            elevated — and still fun.
          </motion.p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 48, scale: 0.92 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                type: "spring",
                stiffness: 140,
                damping: 16,
                delay: 0.2 + i * 0.12,
              }}
              whileHover={{
                y: -10,
                transition: { duration: 0.25 },
              }}
              className="group relative overflow-hidden rounded-2xl border border-forest/10 bg-sand/40 p-6 sm:p-8 transition-shadow hover:shadow-glass"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${p.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />
              <div className="relative flex items-start justify-between">
                <motion.span
                  initial={{ scale: 0, rotate: -30 }}
                  animate={inView ? { scale: 1, rotate: 0 } : {}}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 14,
                    delay: 0.35 + i * 0.12,
                  }}
                  whileHover={{
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.5 },
                  }}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-md"
                  aria-hidden
                >
                  {p.emoji}
                </motion.span>
                <span className="font-serif text-2xl text-forest/15 group-hover:text-terracotta/30 transition-colors">
                  {p.n}
                </span>
              </div>
              <h3 className="relative mt-6 font-serif text-xl sm:text-2xl font-medium text-forest">
                {p.title}
              </h3>
              <p className="relative mt-2 text-sm text-ink-muted leading-relaxed">
                {p.copy}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Button asChild variant="outline" className="gap-1.5 rounded-full btn-lift">
            <Link href="/about">
              Discover the story <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
