"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Film, Calendar, Car, ArrowRight, Clock } from "lucide-react";
import { showtimes, communityEvents } from "@/data/events";
import { Button } from "@/components/ui/button";

const easeOut = [0.16, 1, 0.3, 1] as const;
const spring = { type: "spring" as const, stiffness: 140, damping: 16 };

export function TodayBoard() {
  const [openLabel, setOpenLabel] = useState("Checking…");
  const [isOpen, setIsOpen] = useState(false);
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Africa/Mbabane" })
      );
      const day = now.getDay();
      let close = 17;
      if (day === 0) close = 13;
      else if (day === 6) close = 14;
      const mins = now.getHours() * 60 + now.getMinutes();
      const open = mins >= 9 * 60 && mins < close * 60;
      setIsOpen(open);
      setOpenLabel(
        open
          ? `Open · closes ${String(close).padStart(2, "0")}:00`
          : "Closed · opens 09:00"
      );
      setTimeStr(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  const nextFilm = showtimes[0];
  const nextEvent = communityEvents[0];

  return (
    <section className="relative py-16 sm:py-20 bg-forest text-white overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-terracotta/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-sand/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-terracotta"
            >
              Live from the courts
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06, duration: 0.65, ease: easeOut }}
              className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight"
            >
              Today at The Gables
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="mt-2 text-white/65 text-sm"
            >
              Real-time pulse of the centre — hours, film, community.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 self-start rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              {isOpen && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              )}
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${
                  isOpen ? "bg-emerald-400" : "bg-red-400"
                }`}
              />
            </span>
            <span className="text-sm font-medium">{openLabel}</span>
            <span className="text-white/40 tabular-nums text-xs">
              {timeStr} SAST
            </span>
          </motion.div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05, ...spring }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="rounded-2xl border border-white/12 bg-white/[0.07] p-5 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 text-terracotta">
              <Clock className="h-4 w-4" />
              <span className="text-[11px] font-semibold uppercase tracking-wider">
                Hours
              </span>
            </div>
            <p className="mt-4 font-serif text-2xl leading-snug">
              {isOpen ? "Come through" : "See you tomorrow"}
            </p>
            <p className="mt-2 text-sm text-white/60">
              Mon–Fri 09–17 · Sat 09–14 · Sun 09–13
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, ...spring }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="rounded-2xl border border-white/12 bg-white/[0.07] p-5 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 text-terracotta">
              <Film className="h-4 w-4" />
              <span className="text-[11px] font-semibold uppercase tracking-wider">
                Movie Zone
              </span>
            </div>
            <p className="mt-4 font-serif text-2xl leading-snug">
              {nextFilm?.title}
            </p>
            <p className="mt-2 text-sm text-white/60">
              {nextFilm?.times?.slice(0, 3).join(" · ")}
              {nextFilm?.rating ? ` · ${nextFilm.rating}` : ""}
            </p>
            <Link
              href="/events"
              className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-terracotta hover:text-sand transition-colors"
            >
              Full lineup <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.19, ...spring }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="rounded-2xl border border-white/12 bg-white/[0.07] p-5 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 text-terracotta">
              <Calendar className="h-4 w-4" />
              <span className="text-[11px] font-semibold uppercase tracking-wider">
                Community
              </span>
            </div>
            <p className="mt-4 font-serif text-2xl leading-snug">
              {nextEvent?.title}
            </p>
            <p className="mt-2 text-sm text-white/60">
              {nextEvent?.date}
              {nextEvent?.tag ? ` · ${nextEvent.tag}` : ""}
            </p>
            <Link
              href="/events"
              className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-terracotta hover:text-sand transition-colors"
            >
              What&apos;s on <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.26, ...spring }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="rounded-2xl border border-terracotta/40 bg-terracotta/20 p-5 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 text-sand">
              <Car className="h-4 w-4" />
              <span className="text-[11px] font-semibold uppercase tracking-wider">
                Getting here
              </span>
            </div>
            <p className="mt-4 font-serif text-2xl leading-snug">
              Free secure parking
            </p>
            <p className="mt-2 text-sm text-white/70">
              MR103 · Shebas Rocks · 24hr security
            </p>
            <Button
              asChild
              size="sm"
              className="mt-4 rounded-full bg-white text-forest hover:bg-sand gap-1.5"
            >
              <Link href="/visit">
                Directions <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
