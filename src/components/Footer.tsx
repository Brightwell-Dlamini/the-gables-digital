"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ArrowUpRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const easeOut = [0.16, 1, 0.3, 1] as const;
const spring = { type: "spring" as const, stiffness: 140, damping: 16 };

const footerLinks = [
  {
    title: "Explore",
    links: [
      { href: "/directory", label: "Store Directory" },
      { href: "/events", label: "Events & Cinema" },
      { href: "/about", label: "About The Gables" },
      { href: "/visit", label: "Visit & Directions" },
    ],
  },
  {
    title: "Business",
    links: [
      { href: "/leasing", label: "Lease a Space" },
      { href: "/contact", label: "Contact Centre" },
      { href: "/about", label: "Our story" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-forest text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-terracotta/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-sand/10 blur-3xl"
      />

      <div className="relative border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easeOut }}
              className="lg:col-span-8"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sand/50">
                The Gables · Ezulwini
              </p>
              <h2 className="mt-4 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] text-balance">
                Come for the brands.
                <br />
                <span className="text-sand/85 italic">Stay for the valley.</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.55 }}
              className="lg:col-span-4 lg:text-right"
            >
              <p className="text-white/60 text-sm leading-relaxed max-w-xs lg:ml-auto">
                Open-air shopping in the heart of the Ezulwini Valley — free
                parking, strong anchors, and a lifestyle people return for.
              </p>
              <Button
                asChild
                className="mt-6 rounded-full bg-white text-forest hover:bg-sand gap-1.5"
              >
                <Link href="/directory">
                  Explore the directory <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 font-serif text-xl font-semibold transition-colors group-hover:bg-terracotta">
                G
              </div>
              <div>
                <p className="font-serif text-xl font-medium leading-none">
                  The Gables
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/45">
                  Shopping Centre
                </p>
              </div>
            </Link>
            <p className="mt-6 max-w-xs text-sm text-white/60 leading-relaxed">
              Eswatini&apos;s lifestyle destination — fashion, food, film and
              free parking under the mountain light.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href="https://maps.google.com/?q=The+Gables+Shopping+Centre+Ezulwini"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 transition-colors hover:border-white/20 hover:bg-white/[0.07]"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                    Find us
                  </p>
                  <p className="text-sm text-white/85">
                    MR103 · Shebas Rocks · Ezulwini
                  </p>
                </div>
              </a>
              <a
                href="tel:+26824161100"
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 transition-colors hover:border-white/20 hover:bg-white/[0.07]"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                    Call
                  </p>
                  <p className="text-sm text-white/85">+268 2416 1100</p>
                </div>
              </a>
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                    Hours
                  </p>
                  <p className="text-sm text-white/85">
                    Mon–Fri 09–17 · Sat 09–14 · Sun 09–13
                  </p>
                </div>
              </div>
            </div>
          </div>

          {footerLinks.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08, ...spring }}
              className="lg:col-span-2"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sand/45">
                {col.title}
              </p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {l.label}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-y-0.5 translate-x-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, ...spring }}
            className="lg:col-span-4"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sand/45">
              Stay in the loop
            </p>
            <p className="mt-4 font-serif text-2xl sm:text-3xl font-medium leading-snug">
              Events, openings &amp; courtyard moments
            </p>
            <p className="mt-3 text-sm text-white/55 leading-relaxed">
              Follow what&apos;s on — or reach the centre team directly.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button
                asChild
                size="sm"
                className="rounded-full bg-terracotta hover:bg-terracotta/90 gap-1.5"
              >
                <Link href="/events">
                  What&apos;s on <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
              <Button
                asChild
                size="sm"
                variant="outline"
                className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white gap-1.5"
              >
                <Link href="/contact">
                  <Mail className="h-3.5 w-3.5" /> Contact
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} The Gables Shopping Centre · Ezulwini,
            Eswatini
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/40">
            <Link href="/contact" className="hover:text-white/70 transition-colors">
              Contact
            </Link>
            <Link href="/leasing" className="hover:text-white/70 transition-colors">
              Leasing
            </Link>
            <Link href="/visit" className="hover:text-white/70 transition-colors">
              Visit
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
