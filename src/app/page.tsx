"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Shield, Clock, Store } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

const words = ["Modern", "alpine", "lifestyle."];

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
            className="h-full w-full object-cover"
          >
            <source src="https://cdn.coverr.co/videos/coverr-shopping-mall-exterior-5644/1080p.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-forest/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-terracotta/25 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-white">
          <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp} className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-sand/80">
            Ezulwini Valley · Eswatini
          </motion.p>

          <h1 className="max-w-3xl font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight">
            {words.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
            <br />
            <motion.span
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block text-sand"
            >
              African sun.
            </motion.span>
          </h1>

          <motion.p custom={3} initial="hidden" animate="visible" variants={fadeUp} className="mt-6 max-w-xl text-lg text-white/85 leading-relaxed">
            The Gables is more than a shopping centre. It is the digital concierge and lifestyle heart of Ezulwini — 96+ brands, free secure parking, cinema, banking and the valley’s finest open-air retail experience.
          </motion.p>

          <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" variant="terracotta" className="gap-2">
              <Link href="/directory">Explore Directory <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              <Link href="/leasing">Lease a Space</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-forest/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
            {[
              { icon: Store, label: "96+ Tenants", sub: "Fashion · Food · Services" },
              { icon: Clock, label: "Open 7 Days", sub: "From 09:00 daily" },
              { icon: Shield, label: "24hr Security", sub: "On-site police post" },
              { icon: MapPin, label: "24,115 m²", sub: "Free secure parking" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest/5 text-forest">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-serif text-lg font-medium text-forest">{item.label}</p>
                  <p className="text-sm text-ink-muted">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-forest text-balance">The centre of choice in the Ezulwini Valley</h2>
            <p className="mt-4 text-lg text-ink-muted leading-relaxed">Situated close to two national parks and perfectly connected to Mbabane, Matsapha and Manzini. Dutch-inspired architecture, curated courts, and a lifestyle that feels both elevated and rooted.</p>
            <div className="mt-8"><Button asChild variant="outline"><Link href="/about">Discover the story</Link></Button></div>
          </div>
        </div>
      </section>

      <section className="bg-forest text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-balance">Join the 96+ brands defining the Ezulwini retail experience</h2>
          <p className="mt-4 max-w-xl mx-auto text-white/75">Premium footfall, free parking, strong anchors and a growing lifestyle destination. Enquire about available retail and office space.</p>
          <div className="mt-8"><Button asChild size="lg" variant="terracotta"><Link href="/leasing">Start your enquiry</Link></Button></div>
        </div>
      </section>

      <footer className="border-t border-forest/10 bg-sand py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-forest text-white font-serif text-sm font-semibold">G</div>
              <span className="font-serif text-lg text-forest">The Gables</span>
            </div>
            <p className="text-sm text-ink-muted text-center md:text-left">MR103, Shebas Rocks, Ezulwini · Kingdom of Eswatini</p>
            <p className="text-xs text-ink-muted">© {new Date().getFullYear()} The Gables Shopping Centre</p>
          </div>
        </div>
      </footer>
    </>
  );
}
