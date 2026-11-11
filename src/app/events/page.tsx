"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Film, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockShowtimes = [
  { title: "The Wild Horizon", times: ["14:00", "17:15", "20:30"], rating: "PG-13" },
  { title: "Valley of Stars", times: ["13:30", "16:45", "19:50"], rating: "PG" },
  { title: "Night at the Gables", times: ["15:00", "18:20", "21:00"], rating: "16" },
];

const events = [
  {
    title: "Spring into Action",
    date: "Ongoing",
    description: "Celebrate the arrival of spring with special offers across fashion and lifestyle stores.",
  },
  {
    title: "School Excursions Welcome",
    date: "By arrangement",
    description: "The Gables welcomes school groups and tour buses. Contact us to plan your visit.",
  },
  {
    title: "Solar Future",
    date: "Coming soon",
    description: "Rooftop solar installation underway — a major step toward cleaner energy for the centre.",
  },
];

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-sand">
      <section className="border-b border-forest/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-ink-muted">Lifestyle</p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-forest tracking-tight">
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
            Current showtimes (mock data). Book tickets at the cinema box office or enquire via the centre.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockShowtimes.map((film) => (
              <motion.div
                key={film.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif text-lg font-medium">{film.title}</h3>
                  <span className="rounded bg-white/10 px-2 py-0.5 text-xs">{film.rating}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {film.times.map((t) => (
                    <span key={t} className="rounded-md bg-white/10 px-2.5 py-1 text-sm tabular-nums">
                      {t}
                    </span>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-5 border-white/20 text-white hover:bg-white/10 hover:text-white"
                >
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
            <Calendar className="h-6 w-6 text-forest" />
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-forest">Community Board</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event.title}
                className="rounded-xl border border-forest/10 bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-terracotta">{event.date}</p>
                <h3 className="mt-2 font-serif text-xl font-medium text-forest">{event.title}</h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">{event.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-forest/10 bg-white py-12">
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
