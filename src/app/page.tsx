'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight, Shield, Clock, Store, Film, Utensils, Landmark, Car, Sun, ShoppingBag,
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

const popIn = {
  hidden: { opacity: 0, scale: 0.88, y: 20 },
  visible: (i: number) => ({
    opacity: 1, scale: 1, y: 0,
    transition: { delay: i * 0.08, ...spring },
  }),
};

const words = ['Come', 'for', 'the', 'brands.'];
const words2 = ['Stay', 'for', 'the', 'vibe.'];

const loveNotes = [
  { quote: 'Saturday mornings start here.', who: 'The regulars' },
  { quote: 'Best courtyard energy in the valley.', who: 'Food court crew' },
  { quote: 'Kids run free. Parents actually relax.', who: 'Families' },
  { quote: 'One loop. Everything sorted.', who: 'Weekday warriors' },
];

const categories = [
  { label: 'Fashion', hint: 'Labels, looks & local style', href: '/directory?cat=Fashion', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80' },
  { label: 'Food & Dining', hint: 'Courtyard flavours all day', href: '/directory?cat=Food%20%26%20Dining', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&q=80' },
  { label: 'Health & Beauty', hint: 'Clicks · spas · self-care', href: '/directory?cat=Health%20%26%20Beauty', img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=900&q=80' },
  { label: 'Entertainment', hint: 'Movie Zone & more', href: '/events', img: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3b2?w=900&q=80' },
];

const lifestyleShots = [
  { src: 'https://images.unsplash.com/photo-1555529902-5261145633bf?w=900&q=80', alt: 'Friends shopping', caption: 'Saturday energy', tall: true },
  { src: 'https://images.unsplash.com/photo-1607083206869-4c79715e227f?w=800&q=80', alt: 'Happy shopper', caption: 'Treat yourself', tall: false },
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80', alt: 'Restaurant friends', caption: 'Table for four', tall: false },
  { src: 'https://images.unsplash.com/photo-1523381294911-8d03ceec8d2b?w=800&q=80', alt: 'Fashion', caption: 'New season finds', tall: true },
  { src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80', alt: 'Retail floor', caption: 'On the floor', tall: false },
  { src: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80', alt: 'Coffee', caption: 'Meet · sip · stay', tall: false },
];

const visitPoints = [
  { icon: Car, title: 'Park free. Shop easy.', copy: '24,115 m² of open-air retail with on-site security and a simple loop off the MR103.' },
  { icon: Sun, title: 'Valley light, all day', copy: 'Dutch-inspired courts designed for mountain air — shop, dine and linger outdoors.' },
  { icon: Landmark, title: 'Everything under one roof-line', copy: 'Pick n Pay, Woolworths, Shoprite, Clicks and a full banking strip in one place.' },
];

export default function HomePage() {
  const media = useAdmin((s) => s.media);
  const heroVideo = mediaBySlot(media, 'hero_video');
  const heroPoster = mediaBySlot(media, 'hero_poster');
  const videoSrc = heroVideo?.url;
  const posterSrc = heroVideo?.poster_url || heroPoster?.url || 'https://images.unsplash.com/photo-1555529902-5261145633bf?w=1600&q=80';
  const nextEvents = communityEvents.slice(0, 3);
  const films = showtimes.slice(0, 3);

  return (
    <>
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {videoSrc ? (
            <video autoPlay muted loop playsInline poster={posterSrc} className="h-full w-full object-cover scale-105">
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={posterSrc} alt="Happy shoppers at The Gables" className="h-full w-full object-cover scale-105" />
          )}
          <div className="absolute inset-0 bg-forest/55 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-terracotta/25 via-transparent to-transparent" />
        </div>
        <motion.div aria-hidden className="pointer-events-none absolute right-[8%] top-[22%] z-[5] hidden h-24 w-24 rounded-full border border-white/20 bg-white/5 backdrop-blur-md sm:block" animate={{ y: [0, -18, 0], rotate: [0, 6, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div aria-hidden className="pointer-events-none absolute left-[6%] top-[38%] z-[5] hidden h-16 w-16 rounded-full bg-terracotta/30 blur-sm sm:block" animate={{ y: [0, 14, 0], scale: [1, 1.08, 1] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div aria-hidden className="pointer-events-none absolute bottom-[28%] right-[18%] z-[5] hidden h-10 w-10 rounded-full border-2 border-sand/40 sm:block" animate={{ y: [0, -10, 0], x: [0, 6, 0] }} transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }} />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-32 text-white">
          <motion.div initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.55, ease: easeOut }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/12 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-sand backdrop-blur-md shadow-lg shadow-black/10">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terracotta opacity-80" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-terracotta" />
            </span>
            Open today · Ezulwini Valley
          </motion.div>
          <h1 className="max-w-4xl font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight overflow-hidden">
            {words.map((word, i) => (
              <motion.span key={`w1-${word}`} initial={{ opacity: 0, y: '120%', rotate: -3 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ delay: 0.1 + i * 0.1, duration: 0.85, ease: easeOut }} className="inline-block mr-[0.22em]">{word}</motion.span>
            ))}
            <br />
            {words2.map((word, i) => (
              <motion.span key={`w2-${word}`} initial={{ opacity: 0, y: '120%', rotate: 2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ delay: 0.52 + i * 0.1, duration: 0.85, ease: easeOut }} className={cn('inline-block mr-[0.22em]', word === 'vibe.' && 'text-sand italic')}>{word}</motion.span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.98, duration: 0.7, ease: easeOut }} className="mt-7 max-w-xl text-base sm:text-lg text-white/90 leading-relaxed">
            96+ brands, free parking, cinema, banking and courtyard dining — the happy heart of Ezulwini under the African sun.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.12, duration: 0.65, ease: easeOut }} className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
            <Button asChild size="lg" variant="terracotta" className="gap-2 btn-lift shadow-lg shadow-terracotta/30">
              <Link href="/directory">Explore the mall <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/35 bg-white/12 text-white hover:bg-white/20 hover:text-white backdrop-blur-md">
              <Link href="/events">What's on today</Link>
            </Button>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.32, duration: 0.55, ease: easeOut }} className="mt-10 flex flex-wrap gap-2">
            {['96+ brands', 'Free parking', 'Movie Zone', 'Food court', 'Banking', 'Open-air'].map((chip, i) => (
              <motion.span key={chip} initial={{ opacity: 0, scale: 0.7, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 1.38 + i * 0.07, type: 'spring', stiffness: 260, damping: 14 }} whileHover={{ scale: 1.06, y: -2 }} className="cursor-default rounded-full border border-white/25 bg-white/12 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-sand backdrop-blur-md">{chip}</motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="relative overflow-hidden bg-terracotta text-white">
        <div className="flex animate-[marquee_22s_linear_infinite] whitespace-nowrap py-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em]">
          {['Open today · 09:00 – 18:00', 'Free secure parking', '96+ brands on the floor', 'Movie Zone · showtimes live', 'Pick n Pay · Woolworths · Shoprite', 'Courtyard dining open', 'Banking strip ready', 'Family-friendly · 24hr security'].concat(['Open today · 09:00 – 18:00', 'Free secure parking', '96+ brands on the floor', 'Movie Zone · showtimes live', 'Pick n Pay · Woolworths · Shoprite', 'Courtyard dining open']).map((t, i) => (
            <span key={`a-${i}`} className="mx-5 inline-flex items-center gap-2.5"><span className="h-1.5 w-1.5 rounded-full bg-white/90" />{t}</span>
          ))}
        </div>
        <div className="flex animate-[marquee_28s_linear_infinite] whitespace-nowrap border-t border-white/15 py-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-white/85" style={{ animationDirection: 'reverse' }}>
          {['Fashion · Food · Film', 'Ezulwini Valley · MR103', 'Shop · dine · linger', 'Clicks · spas · self-care', 'Tonight at Movie Zone', 'Anchors you trust', 'Open-air courts', 'Come for the brands'].concat(['Fashion · Food · Film', 'Ezulwini Valley · MR103', 'Shop · dine · linger', 'Clicks · spas · self-care', 'Tonight at Movie Zone', 'Anchors you trust']).map((t, i) => (
            <span key={`b-${i}`} className="mx-5 inline-flex items-center gap-2.5"><span className="h-1.5 w-1.5 rounded-full bg-sand/80" />{t}</span>
          ))}
        </div>
      </div>

      <section className="relative overflow-hidden bg-white py-10 sm:py-12 border-b border-forest/8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-5 sm:overflow-visible">
            {loveNotes.map((note, i) => (
              <motion.blockquote key={note.who} initial={{ opacity: 0, y: 28, scale: 0.94 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08, type: 'spring', stiffness: 160, damping: 16 }} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="min-w-[240px] snap-start shrink-0 rounded-2xl border border-forest/10 bg-sand/50 p-5 sm:min-w-0">
                <p className="font-serif text-lg sm:text-xl text-forest leading-snug">&ldquo;{note.quote}&rdquo;</p>
                <footer className="mt-3 text-xs font-semibold uppercase tracking-wider text-terracotta">— {note.who}</footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand py-14 sm:py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-center text-center gap-3">
            <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-xs font-semibold uppercase tracking-[0.22em] text-terracotta">Life at The Gables</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06, duration: 0.65, ease: easeOut }} className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-forest text-balance">Real people. Real mall days.</motion.h2>
            <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 }} className="max-w-md text-ink-muted">Bags, laughs, coffee, film — the everyday magic of showing up.</motion.p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2">
            {lifestyleShots.map((shot, i) => (
              <motion.figure key={shot.caption} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={popIn} whileHover={{ scale: 1.02, transition: { duration: 0.35 } }} className={cn('group relative overflow-hidden rounded-2xl shadow-sm', shot.tall ? 'aspect-[3/4] lg:row-span-2 lg:aspect-auto lg:min-h-[440px]' : 'aspect-[4/3] sm:aspect-square')}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={shot.src} alt={shot.alt} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/10 to-transparent opacity-90 transition group-hover:opacity-100" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <span className="inline-block rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-sand backdrop-blur-sm mb-1.5 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">Caught on camera</span>
                  <p className="font-serif text-base sm:text-lg text-white drop-shadow-md">{shot.caption}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-forest/8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 py-12 md:grid-cols-4 md:gap-8">
            {[{ icon: Store, label: '96+', sub: 'Brands & services' }, { icon: Clock, label: '7 days', sub: 'Open from 09:00' }, { icon: Shield, label: '24hr', sub: 'On-site security' }, { icon: ShoppingBag, label: 'Free', sub: 'Secure parking' }].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 28, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.55, ease: easeOut }} className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-terracotta/10 text-terracotta"><item.icon className="h-5 w-5" /></div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-medium text-forest leading-none">{item.label}</p>
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
              <motion.p initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="section-eyebrow">Directory</motion.p>
              <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06, duration: 0.65, ease: easeOut }} className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-forest text-balance">Where do you feel like going?</motion.h2>
              <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12, duration: 0.55 }} className="mt-3 max-w-md text-ink-muted leading-relaxed">Fashion run, food court hang, movie night, or a quick beauty stop — pick a mood.</motion.p>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.15, ...spring }}>
              <Button asChild variant="outline" className="self-start sm:self-auto gap-1.5"><Link href="/directory">Full directory <ArrowRight className="h-4 w-4" /></Link></Button>
            </motion.div>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat, i) => (
              <motion.div key={cat.label} initial={{ opacity: 0, y: 48, rotate: i % 2 === 0 ? -2.5 : 2.5, scale: 0.94 }} whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: i * 0.1, type: 'spring', stiffness: 120, damping: 14 }} whileHover={{ y: -8, rotate: i % 2 === 0 ? -1 : 1, transition: { duration: 0.25 } }}>
                <Link href={cat.href} className="group relative block overflow-hidden rounded-2xl aspect-[3/4] shadow-glass-sm ring-1 ring-forest/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cat.img} alt={cat.label} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.12]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/30 to-transparent" />
                  <div className="absolute top-4 right-4 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">Go</div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <p className="font-serif text-xl sm:text-2xl font-medium tracking-tight">{cat.label}</p>
                    <p className="mt-1 text-sm text-white/80">{cat.hint}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-sand opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">Browse <ArrowRight className="h-3.5 w-3.5" /></span>
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
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="section-eyebrow">This week</motion.p>
              <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06, duration: 0.65, ease: easeOut }} className="mt-2 font-serif text-3xl sm:text-4xl font-medium text-forest">What's on</motion.h2>
              <ul className="mt-8 space-y-4">
                {nextEvents.map((ev, i) => (
                  <motion.li key={ev.id} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-xl border border-forest/10 bg-sand/40 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-terracotta">{ev.date}</p>
                    <p className="mt-1 font-serif text-lg text-forest">{ev.title}</p>
                    <p className="mt-1 text-sm text-ink-muted line-clamp-2">{ev.description}</p>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-6"><Link href="/events" className="inline-flex items-center gap-1.5 text-sm font-medium text-forest hover:text-terracotta">Full programme <ArrowRight className="h-3.5 w-3.5" /></Link></div>
            </div>
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl overflow-hidden border border-forest/10 bg-forest text-white">
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 text-terracotta"><Film className="h-5 w-5" /><span className="text-xs font-semibold uppercase tracking-wider">Movie Zone</span></div>
                  <h3 className="mt-3 font-serif text-2xl font-medium">Tonight's films</h3>
                  <ul className="mt-6 space-y-4">
                    {films.map((f, i) => (
                      <motion.li key={f.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }}>
                        <div className="flex justify-between gap-3"><p className="font-medium">{f.title}</p><span className="text-xs rounded bg-terracotta/90 px-2 py-0.5 shrink-0">{f.rating}</span></div>
                        <p className="mt-1 text-sm text-white/60">{f.times?.join(' · ')}</p>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="border-t border-white/10 mt-6 pt-4"><Link href="/events" className="inline-flex items-center gap-1.5 text-sm font-medium text-terracotta hover:text-sand">Full programme <ArrowRight className="h-3.5 w-3.5" /></Link></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1600&q=80" alt="Food and friends" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-forest/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/65 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl text-white">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm"><Utensils className="h-3.5 w-3.5" />Food court & dining</motion.div>
            <motion.h2 initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08, duration: 0.7, ease: easeOut }} className="mt-5 font-serif text-3xl sm:text-4xl md:text-5xl font-medium leading-tight text-balance">Pause for the plate</motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.16, duration: 0.6 }} className="mt-4 text-lg text-white/85 leading-relaxed">Quick bites between errands or a long lunch under the mountain light — the courts are built for lingering.</motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.24 }}>
              <Button asChild size="lg" variant="terracotta" className="mt-8 gap-2 btn-lift"><Link href="/directory?cat=Food%20%26%20Dining">Find dining <ArrowRight className="h-4 w-4" /></Link></Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-sand">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="section-eyebrow">Plan your visit</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06, duration: 0.65, ease: easeOut }} className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-forest text-balance">Easy to reach. Hard to leave.</motion.h2>
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 }} className="mt-4 text-ink-muted leading-relaxed">On the MR103 between Mbabane and Manzini — minutes from Mantenga and Mlilwane, with free parking and 24-hour security.</motion.p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {visitPoints.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55, ease: easeOut }} whileHover={{ y: -4 }} className="rounded-2xl border border-forest/10 bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-terracotta/10 text-terracotta"><p.icon className="h-5 w-5" /></div>
                <h3 className="mt-4 font-serif text-xl font-medium text-forest">{p.title}</h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">{p.copy}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline" className="gap-1.5"><Link href="/visit">Visit guide <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 sm:py-32 bg-forest text-white">
        <div className="absolute -right-20 top-0 h-64 w-64 rounded-full bg-terracotta/20 blur-3xl" />
        <div className="absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-sand/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-xs font-semibold uppercase tracking-[0.22em] text-sand/60">For retailers</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06, duration: 0.7, ease: easeOut }} className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-balance leading-tight">Join the brands people come back for</motion.h2>
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.14 }} className="mt-5 max-w-xl mx-auto text-white/70 leading-relaxed">Premium footfall, free parking, strong anchors and a lifestyle destination that keeps growing — built for brands that want to belong in the valley.</motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.22 }} className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" variant="terracotta" className="btn-lift"><Link href="/leasing">Start your enquiry</Link></Button>
              <Button asChild size="lg" variant="outline" className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"><Link href="/about">Why The Gables</Link></Button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
