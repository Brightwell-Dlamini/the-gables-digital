"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const pillars = [
  {
    title: "Open-air lifestyle",
    copy: "Dutch-inspired courts, mountain air and an easy flow between fashion, food and film — sunshine included.",
    emoji: "☀️",
  },
  {
    title: "Everything you need",
    copy: "Pick n Pay, Woolworths, Shoprite, Clicks and a full banking strip. One stop, done.",
    emoji: "🛍️",
  },
  {
    title: "Valley connected",
    copy: "Minutes from Mantenga, Mlilwane and the road between Mbabane and Manzini.",
    emoji: "🗺️",
  },
];

const easeOut = [0.16, 1, 0.3, 1] as const;

export function WhyTheGables() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.06, ease: easeOut }}
            className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-forest text-balance"
          >
            The place people actually want to go
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.14 }}
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
              initial={{ opacity: 0, y: 40, scale: 0.94 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.18 + i * 0.12,
                ease: easeOut,
              }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="rounded-2xl border border-forest/10 bg-sand/60 p-6 sm:p-7 transition-shadow hover:shadow-glass"
            >
              <motion.span
                initial={{ scale: 0, rotate: -20 }}
                animate={inView ? { scale: 1, rotate: 0 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 16,
                  delay: 0.3 + i * 0.12,
                }}
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm"
                aria-hidden
              >
                {p.emoji}
              </motion.span>
              <h3 className="mt-4 font-serif text-xl font-medium text-forest">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                {p.copy}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55 }}
          className="mt-12 text-center"
        >
          <Button asChild variant="outline" className="gap-1.5">
            <Link href="/about">
              Discover the story <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
