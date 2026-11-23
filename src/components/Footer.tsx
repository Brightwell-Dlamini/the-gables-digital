import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

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
      { href: "/about#sustainability", label: "Sustainability" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-forest/10 bg-forest text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 font-serif text-lg font-semibold transition-colors group-hover:bg-terracotta">
                G
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-xl font-medium tracking-tight">
                  The Gables
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                  Ezulwini
                </span>
              </div>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-white/70 leading-relaxed">
              Modern alpine lifestyle meets African sun. The digital concierge
              and lifestyle heart of the Ezulwini Valley.
            </p>
          </div>

          {footerLinks.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/80 transition-colors hover:text-terracotta"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
              Visit us
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" />
                <span>
                  MR103, Shebas Rocks
                  <br />
                  Ezulwini, Eswatini
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-terracotta" />
                <span>Mon–Fri 09:00–17:00 · Sat 09:00–14:00 · Sun 09:00–13:00</span>
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

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} The Gables Shopping Centre. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/50">
            <span>Free secure parking</span>
            <span aria-hidden>·</span>
            <span>On-site police post</span>
            <span aria-hidden>·</span>
            <span>24hr security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
