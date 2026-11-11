"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/directory", label: "Directory" },
  { href: "/events", label: "Events & Lifestyle" },
  { href: "/leasing", label: "Lease a Space" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "glass shadow-glass-sm py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-white font-serif text-lg font-semibold transition-transform group-hover:scale-105">
            G
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-lg font-medium tracking-tight text-forest">
              The Gables
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-ink-muted">
              Ezulwini
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/80 transition-colors hover:text-forest"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden rounded-full p-2 text-forest/70 transition-colors hover:bg-forest/5 hover:text-forest sm:inline-flex"
            aria-label="Saved favourites"
          >
            <Heart className="h-5 w-5" />
          </button>

          <Button
            asChild
            variant="terracotta"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Link href="/leasing">Enquire to Lease</Link>
          </Button>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-forest md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t border-forest/10 bg-sand/95 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2.5 text-base font-medium text-forest hover:bg-forest/5"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 border-t border-forest/10 pt-3">
                <Button asChild variant="terracotta" className="w-full">
                  <Link href="/leasing" onClick={() => setMobileOpen(false)}>
                    Enquire to Lease
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
