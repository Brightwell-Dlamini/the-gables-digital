"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Building2, Shield, Leaf, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const easeOut = [0.16, 1, 0.3, 1] as const;

const pillars = [
  {
    icon: Building2,
    title: "24,115 m² of retail",
    copy: "Open-air courts, Dutch-inspired architecture and a clear flow between fashion, food and film.",
  },
  {
    icon: Shield,
    title: "Safe by design",
    copy: "Free secure parking, 24-hour security and an on-site police post — peace of mind for families.",
  },
  {
    icon: Leaf,
    title: "Valley connected",
    copy: "Minutes from Mantenga and Mlilwane, perfectly linked to Mbabane, Matsapha and Manzini.",
  },
  {
    icon: MapPin,
    title: "96+ brands",
    copy: "Pick n Pay, Woolworths, Shoprite, Clicks and a full banking strip under one roof-line.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-sand">
      <section className="relative min-h-[52vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
            alt="Retail lifestyle"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-forest/65 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/50 to-transparent" />
        </div>
        <motion.div
          aria-hidden
          className="pointer-events-none absolute right-[12%] top-[28%] hidden h-24 w-24 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm sm:block"
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-14 pt-28 text-white">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-terracotta"
          >
            Our story
          </motion.p>
          <h1 className="mt-3 max-w-3xl font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight overflow-hidden">
            {["The", "centre", "of", "choice", "in", "the", "valley"].map(
              (w, i) => (
                <motion.span
                  key={w + i}
                  initial={{ opacity: 0, y: "110%" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 + i * 0.07,
                    duration: 0.7,
                    ease: easeOut,
                  }}
                  className="inline-block mr-[0.2em]"
                >
                  {w}
                </motion.span>
              )
            )}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.55 }}
            className="mt-5 max-w-xl text-white/85 leading-relaxed"
          >
            Value and convenience inspired — rooted in Shebas Rocks, Ezulwini,
            close to two national parks and the road between Mbabane and Manzini.
          </motion.p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <motion.p
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="section-eyebrow"
              >
                Why we exist
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06, duration: 0.65, ease: easeOut }}
                className="mt-2 font-serif text-3xl sm:text-4xl font-medium text-forest text-balance"
              >
                Elevated. Still fun.
              </motion.h2>
            </div>
            <div className="lg:col-span-7 space-y-5">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-lg text-forest leading-relaxed"
              >
                The Gables is a retail and office development in a superb
                location — close to two national parks, well connected by public
                transport, with accommodation options nearby.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="text-ink-muted leading-relaxed"
              >
                Home to well-known stores, restaurants, a cinema, banks and a
                wide range of retail across 24,115 m² and more than 96 tenants.
                Dutch-inspired courts, free secure parking, and a lifestyle that
                feels both elevated and rooted in the valley.
              </motion.p>
            </div>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 32, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.08,
                  type: "spring",
                  stiffness: 140,
                  damping: 16,
                }}
                whileHover={{ y: -6, transition: { duration: 0.22 } }}
                className="rounded-2xl border border-forest/10 bg-white p-6 shadow-sm hover:shadow-glass transition-shadow"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-terracotta/10 text-terracotta">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-serif text-lg font-medium text-forest">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                  {p.copy}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-forest py-20 text-white">
        <div className="absolute -right-16 top-0 h-48 w-48 rounded-full bg-terracotta/25 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl sm:text-4xl font-medium text-balance"
          >
            Ready to experience the valley?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Button asChild variant="terracotta" size="lg" className="rounded-full btn-lift">
              <Link href="/directory">
                Explore the directory <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/visit">Plan your visit</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
