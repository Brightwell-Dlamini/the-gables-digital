"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Car, Clock, Bus, Shield, Phone, ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const easeOut = [0.16, 1, 0.3, 1] as const;

const hours = [
  { day: "Monday – Friday", time: "09:00 – 17:00" },
  { day: "Saturday", time: "09:00 – 14:00" },
  { day: "Sunday", time: "09:00 – 13:00" },
];

const access = [
  {
    icon: Car,
    title: "Free secure parking",
    body: "Ample on-site parking with 24-hour security and an on-site police post.",
  },
  {
    icon: Bus,
    title: "Buses & tour groups",
    body: "Coach-friendly access and drop-off. School and tour groups are welcome.",
  },
  {
    icon: Shield,
    title: "Safe & family-friendly",
    body: "Well-lit courts, clear wayfinding and a family atmosphere in the valley.",
  },
];

export default function VisitPage() {
  return (
    <div className="min-h-screen bg-sand">
      <section className="relative min-h-[48vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1555529902-5261145633bf?w=1600&q=80"
            alt="The Gables exterior"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-forest/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/45 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-14 pt-28 text-white">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sand backdrop-blur-sm"
          >
            <MapPin className="h-3.5 w-3.5 text-terracotta" />
            Ezulwini · MR103
          </motion.p>
          <h1 className="mt-4 max-w-3xl font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight overflow-hidden">
            {["Easy", "to", "reach.", "Hard", "to", "leave."].map((w, i) => (
              <motion.span
                key={w + i}
                initial={{ opacity: 0, y: "110%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + i * 0.08,
                  duration: 0.7,
                  ease: easeOut,
                }}
                className="inline-block mr-[0.2em]"
              >
                {w}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-5 max-w-lg text-white/85 leading-relaxed"
          >
            On the MR103 between Mbabane and Manzini — minutes from Mantenga and
            Mlilwane, with free parking and 24-hour security.
          </motion.p>
        </div>
      </section>

      <section className="py-16 sm:py-22">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="section-eyebrow"
              >
                Opening hours
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-2 font-serif text-3xl sm:text-4xl font-medium text-forest"
              >
                When we&apos;re open
              </motion.h2>
              <ul className="mt-8 space-y-3">
                {hours.map((h, i) => (
                  <motion.li
                    key={h.day}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-center justify-between rounded-xl border border-forest/10 bg-white px-5 py-4 shadow-sm"
                  >
                    <span className="flex items-center gap-2.5 text-sm font-medium text-forest">
                      <Clock className="h-4 w-4 text-terracotta" />
                      {h.day}
                    </span>
                    <span className="font-serif text-lg tabular-nums text-forest">
                      {h.time}
                    </span>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-6 flex flex-wrap gap-3"
              >
                <Button asChild variant="terracotta" className="rounded-full gap-1.5 btn-lift">
                  <a
                    href="https://maps.google.com/?q=The+Gables+Shopping+Centre+Ezulwini"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Maps <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-full gap-1.5">
                  <a href="tel:+26824161600">
                    <Phone className="h-4 w-4" /> Call centre
                  </a>
                </Button>
              </motion.div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-4">
                {access.map((a, i) => (
                  <motion.div
                    key={a.title}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.09, duration: 0.55, ease: easeOut }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="flex gap-4 rounded-2xl border border-forest/10 bg-white p-5 sm:p-6 shadow-sm hover:shadow-glass transition-shadow"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-terracotta/10 text-terracotta">
                      <a.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-medium text-forest">
                        {a.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-ink-muted leading-relaxed">
                        {a.body}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-forest/10 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-eyebrow"
          >
            Find us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-2 font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-forest text-balance"
          >
            MR103, Shebas Rocks · Ezulwini
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-3 text-ink-muted"
          >
            Kingdom of Eswatini · Between Mbabane and Manzini
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <Button asChild variant="outline" className="rounded-full gap-1.5">
              <Link href="/directory">
                Explore the mall <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
