"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  ArrowUpRight,
  MapPin,
  Store,
  Film,
  KeyRound,
  Compass,
  Info,
  MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggles } from "@/components/ThemeToggles";
import { useFavourites } from "@/store/favourites";

const easeOut = [0.16, 1, 0.3, 1] as const;

type Destination = {
  href: string;
  label: string;
  short: string;
  hint: string;
  img: string;
  icon: typeof Store;
};

const destinations: Destination[] = [
  {
    href: "/directory",
    label: "Directory",
    short: "Directory",
    hint: "96+ brands & services",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=70",
    icon: Store,
  },
  {
    href: "/events",
    label: "Events & Lifestyle",
    short: "Events",
    hint: "Cinema · community · moments",
    img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3b2?w=600&q=70",
    icon: Film,
  },
  {
    href: "/leasing",
    label: "Lease a Space",
    short: "Lease",
    hint: "Join the brands people return for",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=70",
    icon: KeyRound,
  },
  {
    href: "/visit",
    label: "Visit",
    short: "Visit",
    hint: "Hours · parking · directions",
    img: "https://images.unsplash.com/photo-1555529902-5261145633bf?w=600&q=70",
    icon: Compass,
  },
  {
    href: "/about",
    label: "About",
    short: "About",
    hint: "The story of the valley centre",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=70",
    icon: Info,
  },
  {
    href: "/contact",
    label: "Contact",
    short: "Contact",
    hint: "Talk to the team",
    img: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=600&q=70",
    icon: MessageCircle,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const favCount = useFavourites((s) => s.ids.length);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const activeHref =
    destinations.find(
      (d) => pathname === d.href || (d.href !== "/" && pathname.startsWith(d.href))
    )?.href ?? null;

  const pinHref = hovered ?? activeHref;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile board is open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // Close on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-500",
          scrolled ? "py-2" : "py-3 sm:py-4"
        )}
      >
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          {/* Floating glass pill */}
          <div
            className={cn(
              "relative flex items-center justify-between gap-3 rounded-full px-3 sm:px-4 transition-all duration-500",
              scrolled
                ? "border border-forest/10 bg-sand/85 py-2 shadow-[0_8px_32px_rgba(15,46,31,0.10)] backdrop-blur-2xl"
                : "border border-transparent bg-transparent py-1.5"
            )}
          >
            {/* Logo */}
            <Link
              href="/"
              className="group relative z-10 flex shrink-0 items-center gap-2.5"
              onClick={() => setMobileOpen(false)}
            >
              <motion.div
                className="relative flex h-9 w-9 items-center justify-center rounded-full bg-forest text-white font-serif text-lg font-semibold"
                whileHover={{ scale: 1.06 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              >
                G
                {scrolled && (
                  <motion.span
                    layoutId="logo-ring"
                    className="pointer-events-none absolute -inset-1 rounded-full border border-terracotta/40"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                )}
              </motion.div>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-base sm:text-lg font-medium tracking-tight text-forest">
                  The Gables
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                  Ezulwini
                </span>
              </div>
            </Link>

            {/* Desktop destinations + magnetic pin */}
            <LayoutGroup>
              <nav
                className="relative hidden items-center gap-0.5 md:flex"
                aria-label="Main"
                onMouseLeave={() => setHovered(null)}
              >
                {destinations.map((d) => {
                  const isActive = activeHref === d.href;
                  const isPinned = pinHref === d.href;
                  return (
                    <Link
                      key={d.href}
                      href={d.href}
                      onMouseEnter={() => setHovered(d.href)}
                      className={cn(
                        "relative z-10 px-3.5 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200",
                        isActive || hovered === d.href
                          ? "text-forest"
                          : "text-ink/65 hover:text-forest"
                      )}
                    >
                      <span
                        className={cn(
                          "relative inline-block transition-[letter-spacing] duration-300",
                          (isActive || hovered === d.href) && "tracking-wide"
                        )}
                      >
                        {d.short}
                      </span>
                      {isPinned && (
                        <motion.span
                          layoutId="nav-pin"
                          className="absolute -bottom-0.5 left-3 right-3 h-[3px] rounded-full bg-terracotta"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 28,
                          }}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </LayoutGroup>

            {/* Actions */}
            <div className="relative z-10 flex items-center gap-1.5 sm:gap-2">
              <ThemeToggles />

              <Link
                href="/directory?favs=1"
                className="relative hidden rounded-full p-2 text-forest/70 transition-colors hover:bg-forest/5 hover:text-forest sm:inline-flex"
                aria-label={`Favourites${favCount ? `, ${favCount} saved` : ""}`}
              >
                <Heart className="h-4.5 w-4.5 h-[18px] w-[18px]" />
                {favCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-terracotta px-1 text-[10px] font-bold text-white">
                    {favCount > 9 ? "9+" : favCount}
                  </span>
                )}
              </Link>

              <Button
                asChild
                variant="terracotta"
                size="sm"
                className="hidden rounded-full px-4 shadow-sm sm:inline-flex btn-lift"
              >
                <Link href="/leasing">Enquire to Lease</Link>
              </Button>

              {/* Mobile menu trigger — animated marks */}
              <button
                type="button"
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-forest transition-colors hover:bg-forest/5 md:hidden"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? "Close menu" : "Open destinations"}
                aria-expanded={mobileOpen}
              >
                <span className="sr-only">Menu</span>
                <span className="flex flex-col items-center justify-center gap-[5px]">
                  <motion.span
                    animate={
                      mobileOpen
                        ? { rotate: 45, y: 7, width: 18 }
                        : { rotate: 0, y: 0, width: 18 }
                    }
                    className="block h-[1.5px] rounded-full bg-forest origin-center"
                    transition={{ duration: 0.28, ease: easeOut }}
                  />
                  <motion.span
                    animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                    className="block h-[1.5px] w-3 rounded-full bg-forest"
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    animate={
                      mobileOpen
                        ? { rotate: -45, y: -7, width: 18 }
                        : { rotate: 0, y: 0, width: 14 }
                    }
                    className="block h-[1.5px] rounded-full bg-forest origin-center"
                    transition={{ duration: 0.28, ease: easeOut }}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── MOBILE DESTINATION BOARD ───────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="destination-board"
            role="dialog"
            aria-modal="true"
            aria-label="Destinations"
            className="fixed inset-0 z-[60] flex flex-col md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 overflow-hidden bg-forest">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1555529902-5261145633bf?w=1200&q=60"
                alt=""
                className="h-full w-full object-cover opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-forest/95 via-forest/90 to-forest" />
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
              />
            </div>

            {/* Top bar */}
            <div className="relative z-10 flex items-center justify-between px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-2">
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-sand backdrop-blur-md">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Open · Free parking
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
                aria-label="Close destinations"
              >
                <motion.span
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.35 }}
                  className="relative block h-4 w-4"
                >
                  <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 rotate-45 rounded-full bg-white" />
                  <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 -rotate-45 rounded-full bg-white" />
                </motion.span>
              </button>
            </div>

            {/* Destination list */}
            <nav
              className="relative z-10 flex-1 overflow-y-auto px-4 py-4"
              aria-label="Destinations"
            >
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.4 }}
                className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-sand/50"
              >
                Where to next
              </motion.p>

              <ul className="space-y-1.5">
                {destinations.map((d, i) => {
                  const Icon = d.icon;
                  const isActive = activeHref === d.href;
                  return (
                    <motion.li
                      key={d.href}
                      initial={{ opacity: 0, x: -28, y: 8 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{
                        delay: 0.12 + i * 0.055,
                        duration: 0.5,
                        ease: easeOut,
                      }}
                    >
                      <Link
                        href={d.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "group flex items-center gap-3.5 rounded-2xl border p-2.5 pr-3 transition-colors",
                          isActive
                            ? "border-terracotta/40 bg-white/12"
                            : "border-white/10 bg-white/[0.04] hover:bg-white/[0.09]"
                        )}
                      >
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={d.img}
                            alt=""
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-forest/35 mix-blend-multiply" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-white drop-shadow" />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-serif text-xl leading-tight text-white tracking-tight">
                            {d.label}
                          </p>
                          <p className="mt-0.5 text-xs text-white/55">{d.hint}</p>
                        </div>
                        <ArrowUpRight
                          className={cn(
                            "h-4 w-4 shrink-0 transition-all duration-300",
                            isActive
                              ? "text-terracotta translate-x-0 opacity-100"
                              : "text-white/30 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                          )}
                        />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Sticky bottom bar */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.45, ease: easeOut }}
              className="relative z-10 border-t border-white/10 bg-forest/80 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <Link
                  href="/directory?favs=1"
                  onClick={() => setMobileOpen(false)}
                  className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/15"
                  aria-label={`Favourites${favCount ? `, ${favCount} saved` : ""}`}
                >
                  <Heart className="h-5 w-5" />
                  {favCount > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-terracotta px-1 text-[10px] font-bold text-white">
                      {favCount > 9 ? "9+" : favCount}
                    </span>
                  )}
                </Link>
                <Button
                  asChild
                  variant="terracotta"
                  className="h-12 flex-1 rounded-full text-sm font-semibold shadow-lg shadow-terracotta/25"
                >
                  <Link href="/leasing" onClick={() => setMobileOpen(false)}>
                    Enquire to Lease
                  </Link>
                </Button>
                <a
                  href="https://maps.google.com/?q=The+Gables+Shopping+Centre+Ezulwini"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/15"
                  aria-label="Directions"
                >
                  <MapPin className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
