"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Film, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { showtimes, communityEvents } from "@/data/events";

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-sand dark:bg-forest-900">
      <section className="border-b border-forest/10 bg-white dark:border-white/10 dark:bg-forest-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-ink-muted">Lifestyle</p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-forest tracking-tight dark:text-sand">
            Events & Entertainment
          </h1>
          <p className="mt-3 max-w-2xl text-ink-muted leading-relaxed">
            Cinema, community events and seasonal promotions at The Gables.
          </p>
        </div>
      </section>

      <section className="bg-forest text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Film className="h-6 w-6 text-terracotta" />
            <h2 className="font-serif text-2xl sm:text-3xl font-medium">Movie Zone</h2>
          </div>
          <p className="text-white/70 mb-8 max-w-xl">
            Current showtimes (sample schedule). Book tickets at the cinema box office or enquire via the centre.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {showtimes.map((film) => (
              <motion.div
                key={film.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif text-lg font-medium">{film.title}</h3>
                  <span className="rounded bg-white/10 px-2 py-0.5 text-xs shrink-0">{film.rating}</span>
                </div>
                {film.genre && <p className="mt-1 text-xs text-white/50">{film.genre}</p>}
                <div className="mt-4 flex flex-wrap gap-2">
                  {film.times.map((t) => (
                    <span key={t} className="rounded-md bg-white/10 px-2.5 py-1 text-sm tabular-nums">{t}</span>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-5 border-white/20 text-white hover:bg-white/10 hover:text-white">
                  Book Tickets
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Calendar className="h-6 w-6 text-forest dark:text-sand" />
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-forest dark:text-sand">Community Board</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {communityEvents.map((event) => (
              <article key={event.id} className="rounded-xl border border-forest/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-forest-800">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-terracotta">{event.date}</p>
                  {event.tag && (
                    <span className="rounded-full bg-forest/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-forest dark:bg-white/10 dark:text-sand">
                      {event.tag}
                    </span>
                  )}
                </div>
                <h3 className="mt-2 font-serif text-xl font-medium text-forest dark:text-sand">{event.title}</h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">{event.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-forest/10 bg-white py-12 dark:border-white/10 dark:bg-forest-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-ink-muted mb-4">Looking for a space to host your next event?</p>
          <Button asChild variant="terracotta">
            <Link href="/leasing" className="gap-2">
              Enquire about leasing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
