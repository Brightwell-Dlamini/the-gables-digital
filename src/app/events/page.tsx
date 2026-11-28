"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Film, Calendar, ArrowRight, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { showtimes, communityEvents } from "@/data/events";

const easeOut = [0.16, 1, 0.3, 1] as const;
const spring = { type: "spring" as const, stiffness: 140, damping: 16 };

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-sand">
      <section className="relative overflow-hidden min-h-[48vh] flex items-end">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3b2?w=1600&q=80"
            alt="Cinema"
            className="h-full w-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-forest/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/45 to-transparent" />
        </div>
        <motion.div
          aria-hidden
          className="pointer-events-none absolute right-[12%] top-[28%] z-[5] hidden h-24 w-24 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm sm:block"
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-14 pt-28 text-white">
          <motion.p
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta backdrop-blur-sm"
          >
            <Ticket className="h-3.5 w-3.5" />
            Lifestyle
          </motion.p>
          <h1 className="mt-5 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight max-w-3xl overflow-hidden">
            {["What's", "on", "at", "The", "Gables"].map((w, i) => (
              <motion.span
                key={w + i}
                initial={{ opacity: 0, y: "110%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.09, duration: 0.75, ease: easeOut }}
                className="inline-block mr-[0.22em]"
              >
                {w}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.55 }}
            className="mt-5 max-w-xl text-white/85 leading-relaxed"
          >
            Cinema nights, community moments and seasonal energy — the courts
            never sit still.
          </motion.p>
        </div>
      </section>

      <section className="bg-forest text-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <Film className="h-6 w-6 text-terracotta" />
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium">
                  Movie Zone
                </h2>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="mt-2 text-white/70 max-w-xl"
              >
                Tonight&apos;s lineup. Book at the box office or ask at the info desk.
              </motion.p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {showtimes.map((film, i) => (
              <motion.div
                key={film.title}
                initial={{ opacity: 0, y: 32, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, ...spring }}
                whileHover={{ y: -6, transition: { duration: 0.22 } }}
                className="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.06] p-5 backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-terracotta/15 transition-transform duration-500 group-hover:scale-150" />
                <div className="relative flex items-start justify-between gap-2">
                  <h3 className="font-serif text-lg font-medium leading-snug">
                    {film.title}
                  </h3>
                  <span className="shrink-0 rounded bg-terracotta/90 px-2 py-0.5 text-[10px] font-bold">
                    {film.rating}
                  </span>
                </div>
                {film.genre && (
                  <p className="relative mt-1 text-xs text-white/50">{film.genre}</p>
                )}
                <div className="relative mt-5 flex flex-wrap gap-2">
                  {film.times.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-white/10 px-2.5 py-1 text-sm tabular-nums"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="relative mt-5 border-white/20 text-white hover:bg-white/10 hover:text-white gap-1.5 rounded-full"
                >
                  <Ticket className="h-3.5 w-3.5" />
                  Book tickets
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <Calendar className="h-6 w-6 text-terracotta" />
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-forest"
            >
              Community board
            </motion.h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {communityEvents.map((event, i) => (
              <motion.article
                key={event.id}
                initial={{ opacity: 0, y: 36, rotate: i % 2 === 0 ? -1 : 1 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, ...spring }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="rounded-2xl border border-forest/10 bg-white p-6 shadow-sm hover:shadow-glass transition-shadow"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-terracotta">
                    {event.date}
                  </p>
                  {event.tag && (
                    <span className="rounded-full bg-terracotta/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-terracotta">
                      {event.tag}
                    </span>
                  )}
                </div>
                <h3 className="mt-3 font-serif text-xl font-medium text-forest">
                  {event.title}
                </h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                  {event.description}
                </p>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-14 text-center"
          >
            <Button asChild variant="outline" className="rounded-full gap-1.5">
              <Link href="/contact">
                Host an event here <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
