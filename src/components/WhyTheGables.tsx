"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const pillars = [
  {
    title: "Open-air lifestyle",
    copy: "Dutch-inspired courts, mountain air and an easy flow between fashion, food and film.",
    path: "M4 16c4-8 8-8 12 0s8 8 12 0",
  },
  {
    title: "Anchored convenience",
    copy: "Pick n Pay, Woolworths, Shoprite, Clicks and a full banking strip under one roof line.",
    path: "M4 12h4l2-4 3 8 2-4h5",
  },
  {
    title: "Valley connected",
    copy: "Minutes from Mantenga, Mlilwane and the road between Mbabane and Manzini.",
    path: "M3 18c3-10 6-10 9 0s6 10 9 0",
  },
];

function AnimatedPath({ d, delay }: { d: string; delay: number }) {
  return (
    <motion.svg viewBox="0 0 32 24" className="h-10 w-14 text-terracotta" fill="none" aria-hidden>
      <motion.path
        d={d}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.svg>
  );
}

export function WhyTheGables() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section ref={ref} className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-sm font-medium uppercase tracking-[0.2em] text-ink-muted">
            Why The Gables
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.08 }} className="mt-2 font-serif text-3xl sm:text-4xl font-medium text-forest text-balance">
            The centre of choice in the Ezulwini Valley
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.14 }} className="mt-4 text-lg text-ink-muted leading-relaxed">
            Situated close to two national parks and perfectly connected to Mbabane, Matsapha and Manzini. Curated courts, free secure parking and a lifestyle that feels elevated and rooted.
          </motion.p>
        </div>
        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }} className="rounded-2xl border border-forest/10 bg-sand/50 p-6">
              <AnimatedPath d={p.path} delay={0.25 + i * 0.12} />
              <h3 className="mt-4 font-serif text-xl font-medium text-forest">{p.title}</h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{p.copy}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline">
            <Link href="/about">Discover the story</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
