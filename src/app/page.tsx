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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhyTheGables } from '@/components/WhyTheGables';
import { PromotionsStrip } from '@/components/PromotionsStrip';
import { useAdmin } from '@/store/admin';
import { mediaBySlot } from '@/lib/media/defaults';
import { communityEvents, showtimes } from '@/data/events';
import { cn } from '@/lib/utils';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  }),
};

const words = ['Modern', 'alpine', 'lifestyle.'];

const categories = [
  {
    label: 'Fashion',
    hint: 'Labels & local style',
    href: '/directory?cat=Fashion',
    tone: 'from-forest to-forest/80',
  },
  {
    label: 'Food & Dining',
    hint: 'Courtyard flavours',
    href: '/directory?cat=Food%20%26%20Dining',
    tone: 'from-terracotta to-terracotta/80',
  },
  {
    label: 'Health & Beauty',
    hint: 'Clicks · spas · care',
    href: '/directory?cat=Health%20%26%20Beauty',
    tone: 'from-[#5C7A6A] to-[#3D5448]',
  },
  {
    label: 'Entertainment',
    hint: 'Movie Zone & more',
    href: '/events',
    tone: 'from-ink to-ink/80',
  },
];

const visitPoints = [
  {
    icon: Car,
    title: 'Free secure parking',
    copy: '24,115 m² of open-air retail with on-site security and an easy loop from the MR103.',
  },
  {
    icon: Sun,
    title: 'Valley light, all day',
    copy: 'Dutch-inspired courts designed for mountain air — shop, dine and linger outdoors.',
  },
  {
    icon: Landmark,
    title: 'Anchors you trust',
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
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80';

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
              alt="The Gables Shopping Centre"
              className="h-full w-full object-cover scale-105"
            />
          )}
          <div className="absolute inset-0 bg-forest/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/45 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-terracotta/20 via-transparent to-transparent" />
          <div className="absolute inset-0 noise-overlay opacity-[0.06]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 pt-32 text-white">
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-sand/75"
          >
            Ezulwini Valley · Eswatini
          </motion.p>

          <h1 className="max-w-3xl font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.08] tracking-tight">
            {words.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: '100%' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.18 + i * 0.11,
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block mr-[0.22em]"
              >
                {word}
              </motion.span>
            ))}
            <br />
            <motion.span
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.55,
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block text-sand"
            >
              African sun.
            </motion.span>
          </h1>

          <motion.p
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-7 max-w-lg text-base sm:text-lg text-white/85 leading-relaxed"
          >
            The digital concierge and lifestyle heart of Ezulwini — 96+ brands,
            free secure parking, cinema, banking and open-air retail under the
            valley sky.
          </motion.p>

          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <Button asChild size="lg" variant="terracotta" className="gap-2 btn-lift">
              <Link href="/directory">
                Explore Directory <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/25 bg-white/5 text-white hover:bg-white/12 hover:text-white backdrop-blur-sm"
            >
              <Link href="/leasing">Lease a Space</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Live energy strip — denser, faster, dual-row mall vibe */}
      <div className="relative overflow-hidden border-b border-forest/10 bg-forest text-white">
        <div className="flex animate-[marquee_28s_linear_infinite] whitespace-nowrap py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-sand/90">
          {[
            'Open today · 09:00 – 18:00',
            'Free secure parking',
            '96+ brands on the floor',
            'Movie Zone · showtimes live',
            'Pick n Pay · Woolworths · Shoprite',
            'Banking strip open',
            'Courtyard dining · full service',
            'Ezulwini Valley · MR103',
            'Family-friendly · 24hr security',
            'Open today · 09:00 – 18:00',
            'Free secure parking',
            '96+ brands on the floor',
            'Movie Zone · showtimes live',
            'Pick n Pay · Woolworths · Shoprite',
            'Banking strip open',
            'Courtyard dining · full service',
          ].map((t, i) => (
            <span key={i} className="mx-5 inline-flex items-center gap-2.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terracotta opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-terracotta" />
              </span>
              {t}
            </span>
          ))}
        </div>
      </div>

      <section className="border-y border-forest/8 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4 md:gap-6">
            {[
              { icon: Store, label: '96+ Tenants', sub: 'Fashion · Food · Services' },
              { icon: Clock, label: 'Open 7 Days', sub: 'From 09:00 daily' },
              { icon: Shield, label: '24hr Security', sub: 'On-site police post' },
              { icon: MapPin, label: '24,115 m²', sub: 'Free secure parking' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex items-start gap-3.5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest/[0.06] text-forest">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-serif text-lg font-medium text-forest leading-tight">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-sm text-ink-muted">{item.sub}</p>
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
              <p className="section-eyebrow">Directory</p>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-medium text-forest text-balance">
                Shop by mood
              </h2>
              <p className="mt-3 max-w-md text-ink-muted leading-relaxed">
                From morning coffee to evening film — find the right court for
                the day.
              </p>
            </div>
            <Button asChild variant="outline" className="self-start sm:self-auto gap-1.5">
              <Link href="/directory">
                Full directory <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.07, duration: 0.55 }}
              >
                <Link
                  href={cat.href}
                  className="group relative block overflow-hidden rounded-2xl aspect-[4/5] shadow-glass-sm"
                >
                  <div
                    className={cn(
                      'absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-105',
                      cat.tone
                    )}
                  />
                  <div className="absolute inset-0 noise-overlay opacity-20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <p className="font-serif text-xl font-medium tracking-tight">
                      {cat.label}
                    </p>
                    <p className="mt-1 text-sm text-white/70">{cat.hint}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-white/90 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
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
              <div className="flex items-center gap-2 text-terracotta">
                <CalendarDays className="h-4 w-4" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em]">
                  On the board
                </p>
              </div>
              <h2 className="mt-3 font-serif text-3xl font-medium text-forest">
                Community & seasons
              </h2>
              <p className="mt-3 text-ink-muted leading-relaxed">
                Promotions, school visits and valley events — always something
                happening under the gables.
              </p>
              <ul className="mt-8 space-y-4">
                {nextEvents.map((ev, i) => (
                  <motion.li
                    key={ev.id}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="group flex gap-4 rounded-xl border border-forest/8 bg-sand/40 p-4 transition hover:border-forest/15 hover:bg-sand/70"
                  >
                    <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-forest text-white">
                      <span className="text-[10px] font-semibold uppercase tracking-wide opacity-70">
                        Event
                      </span>
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
              <Button asChild variant="outline" className="mt-6 gap-1.5">
                <Link href="/events">
                  All events <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div>
              <div className="flex items-center gap-2 text-terracotta">
                <Film className="h-4 w-4" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em]">
                  Movie Zone
                </p>
              </div>
              <h2 className="mt-3 font-serif text-3xl font-medium text-forest">
                Tonight at the cinema
              </h2>
              <p className="mt-3 text-ink-muted leading-relaxed">
                Catch the latest under the valley stars — showtimes updated for
                the week.
              </p>
              <div className="mt-8 overflow-hidden rounded-2xl border border-forest/10 bg-forest text-white shadow-glass">
                <div className="border-b border-white/10 px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/50">
                    Now showing
                  </p>
                </div>
                <ul className="divide-y divide-white/10">
                  {films.map((f) => (
                    <li
                      key={f.title}
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
                    </li>
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-forest/75 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/70 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider backdrop-blur-sm">
              <Utensils className="h-3.5 w-3.5" />
              Food court & dining
            </div>
            <h2 className="mt-5 font-serif text-3xl sm:text-4xl md:text-5xl font-medium leading-tight text-balance">
              Pause for the plate
            </h2>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              From quick bites between errands to a long lunch under the
              mountain light — the courts are built for lingering.
            </p>
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
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-sand">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow">Plan your visit</p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-medium text-forest text-balance">
              Easy to reach. Hard to leave.
            </h2>
            <p className="mt-4 text-ink-muted leading-relaxed">
              On the MR103 between Mbabane and Manzini — minutes from Mantenga
              and Mlilwane, with free parking and 24-hour security.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {visitPoints.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="premium-card p-6 sm:p-7"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-forest/5 text-forest">
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

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" variant="terracotta" className="gap-2">
              <Link href="/visit">
                Hours & directions <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Contact the centre</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-forest text-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sand/60">
              For retailers
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-balance leading-tight">
              Join the 96+ brands defining the Ezulwini retail experience
            </h2>
            <p className="mt-5 max-w-xl mx-auto text-white/70 leading-relaxed">
              Premium footfall, free parking, strong anchors and a growing
              lifestyle destination — built for brands that want to belong in
              the valley.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
