'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  MapPin,
  Shield,
  Clock,
  Store,
  Film,
  Utensils,
  CalendarDays,
  Landmark,
  Car,
  Sun,
  Heart,
  ShoppingBag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhyTheGables } from '@/components/WhyTheGables';
import { PromotionsStrip } from '@/components/PromotionsStrip';
import { useAdmin } from '@/store/admin';
import { mediaBySlot } from '@/lib/media/defaults';
import { communityEvents, showtimes } from '@/data/events';
import { cn } from '@/lib/utils';

const spring = { type: 'spring' as const, stiffness: 120, damping: 18 };
const easeOut = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.09, duration: 0.7, ease: easeOut },
  }),
};

const popIn = {
  hidden: { opacity: 0, scale: 0.88, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: i * 0.08, ...spring },
  }),
};

const words = ['Come', 'for', 'the', 'brands.'];
const words2 = ['Stay', 'for', 'the', 'vibe.'];

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
  {
    src: 'https://images.unsplash.com/photo-1555529902-5261145633bf?w=800&q=80',
    alt: 'Friends shopping with bags',
    caption: 'Saturday energy',
  },
  {
    src: 'https://images.unsplash.com/photo-1607083206869-4c79715e227f?w=800&q=80',
    alt: 'Happy shopper with bags',
    caption: 'Treat yourself',
  },
  {
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    alt: 'Friends at a restaurant',
    caption: 'Table for four',
  },
  {
    src: 'https://images.unsplash.com/photo-1523381294911-8d03ceec8d2b?w=800&q=80',
    alt: 'Fashion browsing',
    caption: 'New season finds',
  },
];

const visitPoints = [
  {
    icon: Car,
    title: 'Park free. Shop easy.',
    copy: '24,115 m² of open-air retail with on-site security and a simple loop off the MR103.',
  },
  {
    icon: Sun,
    title: 'Valley light, all day',
    copy: 'Dutch-inspired courts designed for mountain air — shop, dine and linger outdoors.',
  },
  {
    icon: Landmark,
    title: 'Everything under one roof-line',
    copy: 'Pick n Pay, Woolworths, Shoprite, Clicks and a full banking strip in one place.',
  },
];

export default function HomePage() {
  const media = useAdmin((s) => s.media);
  const heroVideo = mediaBySlot(media, 'hero_video');
  const heroPoster = mediaBySlot(media, 'hero_poster');
  const videoSrc = heroVideo?.url;
  const posterSrc =
    heroVideo?.poster_url ||
    heroPoster?.url ||
    'https://images.unsplash.com/photo-1555529902-5261145633bf?w=1600&q=80';

  const nextEvents = communityEvents.slice(0, 3);
  const films = showtimes.slice(0, 3);

  return (
    <>
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {videoSrc ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={posterSrc}
              className="h-full w-full object-cover scale-105"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={posterSrc}
              alt="Happy shoppers at The Gables"
              className="h-full w-full object-cover scale-105"
            />
          )}
          <div className="absolute inset-0 bg-forest/55 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-terracotta/25 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-32 text-white">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-sand backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terracotta opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-terracotta" />
            </span>
            Open today · Ezulwini Valley
          </motion.div>

          <h1 className="max-w-4xl font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight overflow-hidden">
            {words.map((word, i) => (
              <motion.span
                key={`w1-${word}`}
                initial={{ opacity: 0, y: '110%' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.12 + i * 0.09,
                  duration: 0.8,
                  ease: easeOut,
                }}
                className="inline-block mr-[0.22em]"
              >
                {word}
              </motion.span>
            ))}
            <br />
            {words2.map((word, i) => (
              <motion.span
                key={`w2-${word}`}
                initial={{ opacity: 0, y: '110%' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5 + i * 0.09,
                  duration: 0.8,
                  ease: easeOut,
                }}
                className={cn(
                  'inline-block mr-[0.22em]',
                  word === 'vibe.' && 'text-sand'
                )}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.7, ease: easeOut }}
            className="mt-7 max-w-xl text-base sm:text-lg text-white/90 leading-relaxed"
          >
            96+ brands, free parking, cinema, banking and courtyard dining —
            the happy heart of Ezulwini under the African sun.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.65, ease: easeOut }}
            className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <Button asChild size="lg" variant="terracotta" className="gap-2 btn-lift">
              <Link href="/directory">
                Explore the mall <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-white/10 text-white hover:bg-white/18 hover:text-white backdrop-blur-sm"
            >
              <Link href="/events">What&apos;s on today</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <div className="relative overflow-hidden bg-terracotta text-white">
        <div className="flex animate-[marquee_24s_linear_infinite] whitespace-nowrap py-3 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em]">
          {[
            'Open today · 09:00 – 18:00',
            'Free secure parking',
            '96+ brands on the floor',
            'Movie Zone · showtimes live',
            'Pick n Pay · Woolworths · Shoprite',
            'Courtyard dining open',
            'Banking strip ready',
            'Family-friendly · 24hr security',
            'Open today · 09:00 – 18:00',
            'Free secure parking',
            '96+ brands on the floor',
            'Movie Zone · showtimes live',
            'Pick n Pay · Woolworths · Shoprite',
            'Courtyard dining open',
          ].map((t, i) => (
            <span key={i} className="mx-5 inline-flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
              {t}
            </span>
          ))}
        </div>
      </div>

      <section className="bg-sand py-10 sm:py-14 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.22em] text-terracotta"
          >
            Life at The Gables
          </motion.p>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {lifestyleShots.map((shot, i) => (
              <motion.figure
                key={shot.caption}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={popIn}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shot.src}
                  alt={shot.alt}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-3 left-3 right-3 font-serif text-sm sm:text-base text-white">
                  {shot.caption}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-forest/8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 py-12 md:grid-cols-4 md:gap-8">
            {[
              { icon: Store, label: '96+', sub: 'Brands & stores' },
              { icon: Clock, label: '7 days', sub: 'Open from 09:00' },
              { icon: Shield, label: '24hr', sub: 'On-site security' },
              { icon: ShoppingBag, label: 'Free', sub: 'Secure parking' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 28, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.55, ease: easeOut }}
                className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-3"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-terracotta/10 text-terracotta">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-medium text-forest leading-none">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm text-ink-muted">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-sand">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <motion.p
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="section-eyebrow"
              >
                Directory
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06, duration: 0.65, ease: easeOut }}
                className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-forest text-balance"
              >
                Where do you feel like going?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12, duration: 0.55 }}
                className="mt-3 max-w-md text-ink-muted leading-relaxed"
              >
                Fashion run, food court hang, movie night, or a quick beauty stop —
                pick a mood.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, ...spring }}
            >
              <Button asChild variant="outline" className="self-start sm:self-auto gap-1.5">
                <Link href="/directory">
                  Full directory <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 40, rotate: -1 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: i * 0.09, duration: 0.65, ease: easeOut }}
              >
                <Link
                  href={cat.href}
                  className="group relative block overflow-hidden rounded-2xl aspect-[3/4] shadow-glass-sm"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.img}
                    alt={cat.label}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <p className="font-serif text-xl sm:text-2xl font-medium tracking-tight">
                      {cat.label}
                    </p>
                    <p className="mt-1 text-sm text-white/75">{cat.hint}</p>
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

      <WhyTheGables />

      <PromotionsStrip />

      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 text-terracotta"
              >
                <CalendarDays className="h-4 w-4" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em]">
                  On the board
                </p>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06, duration: 0.6, ease: easeOut }}
                className="mt-3 font-serif text-3xl sm:text-4xl font-medium text-forest"
              >
                Always something on
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12 }}
                className="mt-3 text-ink-muted leading-relaxed"
              >
                Promotions, school visits, valley events — the courts stay busy.
              </motion.p>
              <ul className="mt-8 space-y-4">
                {nextEvents.map((ev, i) => (
                  <motion.li
                    key={ev.id}
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.55, ease: easeOut }}
                    className="group flex gap-4 rounded-2xl border border-forest/8 bg-sand/50 p-4 transition hover:border-terracotta/30 hover:bg-sand hover:shadow-glass-sm"
                  >
                    <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-terracotta text-white">
                      <Heart className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-terracotta">
                        {ev.date}
                        {ev.tag ? ` · ${ev.tag}` : ''}
                      </p>
                      <p className="mt-0.5 font-medium text-forest">{ev.title}</p>
                      <p className="mt-1 line-clamp-2 text-sm text-ink-muted">
                        {ev.description}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Button asChild variant="outline" className="mt-6 gap-1.5">
                  <Link href="/events">
                    All events <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 text-terracotta"
              >
                <Film className="h-4 w-4" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em]">
                  Movie Zone
                </p>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06, duration: 0.6, ease: easeOut }}
                className="mt-3 font-serif text-3xl sm:text-4xl font-medium text-forest"
              >
                Tonight at the cinema
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12 }}
                className="mt-3 text-ink-muted leading-relaxed"
              >
                Catch the latest under the valley stars.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.65, ease: easeOut }}
                className="mt-8 overflow-hidden rounded-2xl border border-forest/10 bg-forest text-white shadow-glass"
              >
                <div className="border-b border-white/10 px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/50">
                    Now showing
                  </p>
                </div>
                <ul className="divide-y divide-white/10">
                  {films.map((f, i) => (
                    <motion.li
                      key={f.title}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                      className="flex items-center justify-between gap-4 px-5 py-4"
                    >
                      <div>
                        <p className="font-medium">{f.title}</p>
                        <p className="mt-0.5 text-xs text-white/55">
                          {f.rating}
                          {f.genre ? ` · ${f.genre}` : ''}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm tabular-nums text-sand/90">
                        {f.times.join(' · ')}
                      </p>
                    </motion.li>
                  ))}
                </ul>
                <div className="border-t border-white/10 px-5 py-4">
                  <Link
                    href="/events"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-terracotta hover:text-sand transition-colors"
                  >
                    Full programme <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1600&q=80"
            alt="Food and friends"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-forest/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/65 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl text-white">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm"
            >
              <Utensils className="h-3.5 w-3.5" />
              Food court & dining
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08, duration: 0.7, ease: easeOut }}
              className="mt-5 font-serif text-3xl sm:text-4xl md:text-5xl font-medium leading-tight text-balance"
            >
              Pause for the plate
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16, duration: 0.6 }}
              className="mt-4 text-lg text-white/85 leading-relaxed"
            >
              Quick bites between errands or a long lunch under the mountain light —
              the courts are built for lingering.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.24 }}
            >
              <Button
                asChild
                size="lg"
                variant="terracotta"
                className="mt-8 gap-2 btn-lift"
              >
                <Link href="/directory?cat=Food%20%26%20Dining">
                  Find dining <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-sand">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="section-eyebrow"
            >
              Plan your visit
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06, duration: 0.65, ease: easeOut }}
              className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-forest text-balance"
            >
              Easy to reach. Hard to leave.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="mt-4 text-ink-muted leading-relaxed"
            >
              On the MR103 between Mbabane and Manzini — minutes from Mantenga and
              Mlilwane, with free parking and 24-hour security.
            </motion.p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {visitPoints.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 32, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: easeOut }}
                className="premium-card p-6 sm:p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-terracotta/10 text-terracotta">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-medium text-forest">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                  {p.copy}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 flex flex-wrap items-center justify-center gap-3"
          >
            <Button asChild size="lg" variant="terracotta" className="gap-2">
              <Link href="/visit">
                Hours & directions <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Contact the centre</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="bg-forest text-white py-20 sm:py-24 overflow-hidden relative">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-terracotta/20 blur-3xl" />
        <div className="absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-sand/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-semibold uppercase tracking-[0.22em] text-sand/60"
            >
              For retailers
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06, duration: 0.7, ease: easeOut }}
              className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-balance leading-tight"
            >
              Join the brands people come back for
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14 }}
              className="mt-5 max-w-xl mx-auto text-white/70 leading-relaxed"
            >
              Premium footfall, free parking, strong anchors and a lifestyle
              destination that keeps growing — built for brands that want to
              belong in the valley.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.22 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
            >
              <Button asChild size="lg" variant="terracotta" className="btn-lift">
                <Link href="/leasing">Start your enquiry</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/about">Why The Gables</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
