'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Shield,
  Clock,
  Store,
  ShoppingBag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TodayBoard } from '@/components/home/TodayBoard';

const spring = { type: 'spring' as const, stiffness: 140, damping: 16 };
const easeOut = [0.16, 1, 0.3, 1] as const;

const popIn = {
  hidden: { opacity: 0, scale: 0.9, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: i * 0.07, ...spring },
  }),
};

const loveNotes = [
  { quote: 'Saturday mornings start here.', who: 'The regulars', n: '01' },
  { quote: 'Best courtyard energy in the valley.', who: 'Food court crew', n: '02' },
  { quote: 'Kids run free. Parents actually relax.', who: 'Families', n: '03' },
  { quote: 'One loop. Everything sorted.', who: 'Weekday warriors', n: '04' },
];

const categories = [
  {
    label: 'Fashion',
    hint: 'Labels, looks & local style',
    href: '/directory?cat=Fashion',
    img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80',
  },
  {
    label: 'Food & Dining',
    hint: 'Courtyard flavours all day',
    href: '/directory?cat=Food%20%26%20Dining',
    img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&q=80',
  },
  {
    label: 'Health & Beauty',
    hint: 'Clicks · spas · self-care',
    href: '/directory?cat=Health%20%26%20Beauty',
    img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=900&q=80',
  },
  {
    label: 'Entertainment',
    hint: 'Movie Zone & more',
    href: '/events',
    img: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3b2?w=900&q=80',
  },
];

const lifestyleShots = [
  { src: 'https://images.unsplash.com/photo-1555529902-5261145633bf?w=900&q=80', alt: 'Friends shopping', caption: 'Saturday energy', tall: true },
  { src: 'https://images.unsplash.com/photo-1607083206869-4c79715e227f?w=800&q=80', alt: 'Happy shopper', caption: 'Treat yourself', tall: false },
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80', alt: 'Restaurant friends', caption: 'Table for four', tall: false },
  { src: 'https://images.unsplash.com/photo-1523381294911-8d03ceec8d2b?w=800&q=80', alt: 'Fashion', caption: 'New season finds', tall: true },
  { src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80', alt: 'Retail floor', caption: 'On the floor', tall: false },
  { src: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80', alt: 'Coffee', caption: 'Meet · sip · stay', tall: false },
];

const tickerA = [
  'Open today · 09:00 – 18:00', 'Free secure parking', '96+ brands on the floor',
  'Movie Zone · showtimes live', 'Pick n Pay · Woolworths · Shoprite',
  'Courtyard dining open', 'Banking strip ready', 'Family-friendly · 24hr security',
];

const tickerB = [
  'Fashion · Food · Film', 'Ezulwini Valley · MR103', 'Shop · dine · linger',
  'Clicks · spas · self-care', 'Tonight at Movie Zone', 'Anchors you trust',
  'Open-air courts', 'Come for the brands',
];

export function LandingUpper() {
  return (
    <>
      <div className="relative overflow-hidden bg-terracotta text-white">
        <div className="flex animate-[marquee_22s_linear_infinite] whitespace-nowrap py-3 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em]">
          {[...tickerA, ...tickerA].map((t, i) => (
            <span key={`a-${i}`} className="mx-5 inline-flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
              {t}
            </span>
          ))}
        </div>
        <div
          className="flex animate-[marquee_28s_linear_infinite] whitespace-nowrap border-t border-white/15 py-3 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-white/85"
          style={{ animationDirection: 'reverse' }}
        >
          {[...tickerB, ...tickerB].map((t, i) => (
            <span key={`b-${i}`} className="mx-5 inline-flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-sand/80" />
              {t}
            </span>
          ))}
        </div>
      </div>

      <TodayBoard />

      <section className="relative overflow-hidden bg-white py-12 sm:py-16 border-b border-forest/8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-terracotta"
          >
            Heard on the courts
          </motion.p>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-5 sm:overflow-visible">
            {loveNotes.map((note, i) => (
              <motion.blockquote
                key={note.who}
                initial={{ opacity: 0, y: 32, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, ...spring }}
                whileHover={{ y: -6, transition: { duration: 0.22 } }}
                className="group relative min-w-[260px] snap-start shrink-0 overflow-hidden rounded-2xl border border-forest/10 bg-sand/40 p-5 sm:min-w-0 hover:border-forest/20 hover:shadow-glass transition-shadow"
              >
                <span className="font-serif text-3xl text-terracotta/25 leading-none group-hover:text-terracotta/40 transition-colors">
                  {note.n}
                </span>
                <p className="mt-3 font-serif text-lg sm:text-xl text-forest leading-snug">
                  &ldquo;{note.quote}&rdquo;
                </p>
                <footer className="mt-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-terracotta">
                  <span className="h-px flex-1 bg-terracotta/25" />
                  {note.who}
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand py-16 sm:py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-center text-center gap-3">
            <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-xs font-semibold uppercase tracking-[0.22em] text-terracotta">
              Life at The Gables
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06, duration: 0.65, ease: easeOut }} className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-forest text-balance">
              Real people. Real mall days.
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 }} className="max-w-md text-ink-muted">
              Bags, laughs, coffee, film — the everyday magic of showing up.
            </motion.p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2">
            {lifestyleShots.map((shot, i) => (
              <motion.figure
                key={shot.caption}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={popIn}
                whileHover={{ scale: 1.02, transition: { duration: 0.35 } }}
                className={cn(
                  'group relative overflow-hidden rounded-2xl shadow-sm',
                  shot.tall
                    ? 'aspect-[3/4] lg:row-span-2 lg:aspect-auto lg:min-h-[440px]'
                    : 'aspect-[4/3] sm:aspect-square'
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={shot.src} alt={shot.alt} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/15 to-transparent opacity-90" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <span className="mb-1.5 inline-block rounded-full border border-white/20 bg-white/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-sand backdrop-blur-sm opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    Caught on camera
                  </span>
                  <p className="font-serif text-base sm:text-lg text-white drop-shadow-md">{shot.caption}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-6 sm:-mt-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="grid grid-cols-2 gap-3 rounded-3xl border border-forest/10 bg-white/90 p-5 shadow-[0_12px_40px_rgba(15,46,31,0.10)] backdrop-blur-xl sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-forest/10 sm:p-6"
          >
            {[
              { icon: Store, label: '96+', sub: 'Brands & services' },
              { icon: Clock, label: '7 days', sub: 'Open from 09:00' },
              { icon: Shield, label: '24hr', sub: 'On-site security' },
              { icon: ShoppingBag, label: 'Free', sub: 'Secure parking' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 + i * 0.06 }}
                className="flex flex-col items-center text-center gap-1.5 sm:px-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
                  <item.icon className="h-[18px] w-[18px]" />
                </div>
                <p className="font-serif text-2xl sm:text-3xl font-medium text-forest leading-none">{item.label}</p>
                <p className="text-xs text-ink-muted">{item.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-sand">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <motion.p initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="section-eyebrow">
                Directory
              </motion.p>
              <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06, duration: 0.65, ease: easeOut }} className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-forest text-balance">
                Where do you feel like going?
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12, duration: 0.55 }} className="mt-3 max-w-md text-ink-muted leading-relaxed">
                Fashion run, food court hang, movie night, or a quick beauty stop — pick a mood.
              </motion.p>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.15, ...spring }}>
              <Button asChild variant="outline" className="rounded-full self-start sm:self-auto gap-1.5">
                <Link href="/directory">Full directory <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </motion.div>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 48, rotate: i % 2 === 0 ? -2.5 : 2.5, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 120, damping: 14 }}
                whileHover={{ y: -10, rotate: i % 2 === 0 ? -1 : 1, transition: { duration: 0.25 } }}
              >
                <Link href={cat.href} className="group relative block overflow-hidden rounded-2xl aspect-[3/4] shadow-glass-sm ring-1 ring-forest/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cat.img} alt={cat.label} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.12]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/30 to-transparent" />
                  <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-sm opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <p className="font-serif text-xl sm:text-2xl font-medium tracking-tight">{cat.label}</p>
                    <p className="mt-1 text-sm text-white/80">{cat.hint}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-sand opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      Browse <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
