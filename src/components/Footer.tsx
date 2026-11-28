"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";

const easeOut = [0.16, 1, 0.3, 1] as const;

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
        className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-terracotta/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-sand/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: easeOut }}
          className="mb-14 max-w-2xl"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sand/50">
            The Gables · Ezulwini
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-medium leading-tight text-balance">
            Come for the brands.
            <br />
            <span className="text-sand/80 italic">Stay for the valley.</span>
          </h2>
        </motion.div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 font-serif text-lg font-semibold transition-colors group-hover:bg-terracotta">
                G
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-xl font-medium tracking-tight">
                  The Gables
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">
                  Ezulwini
                </span>
              </div>
            </Link>
            <p className="mt-5 max-w-xs text-sm text-white/65 leading-relaxed">
              Modern alpine lifestyle meets African sun. The lifestyle heart of
              the Ezulwini Valley — 96+ brands, free parking, cinema and courts
              built for lingering.
            </p>
          </div>

          {footerLinks.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-white/80 transition-colors hover:text-terracotta"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-white/12 bg-white/[0.05] p-5 backdrop-blur-sm">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                Visit us
              </h3>
              <ul className="mt-4 space-y-3.5 text-sm text-white/80">
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
                  <span>
                    MR103, Shebas Rocks
                    <br />
                    Ezulwini, Eswatini
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
                  <span>
                    Mon–Fri 09:00–17:00
                    <br />
                    Sat 09:00–14:00 · Sun 09:00–13:00
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-terracotta" />
                  <a
                    href="tel:+26824161600"
                    className="hover:text-terracotta transition-colors"
                  >
                    +268 2416 1600
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-terracotta" />
                  <a
                    href="mailto:info@thegables.co.sz"
                    className="hover:text-terracotta transition-colors"
                  >
                    info@thegables.co.sz
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} The Gables Shopping Centre. Ezulwini,
            Eswatini.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-white/45">
            <Link href="/contact" className="hover:text-sand transition-colors">
              Contact
            </Link>
            <Link href="/leasing" className="hover:text-sand transition-colors">
              Leasing
            </Link>
            <a
              href="https://maps.google.com/?q=The+Gables+Shopping+Centre+Ezulwini"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sand transition-colors"
            >
              Directions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
