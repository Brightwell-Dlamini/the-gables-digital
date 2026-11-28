'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Shield,
  Clock,
  Store,
  Film,
  Utensils,
  Landmark,
  Car,
  Sun,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhyTheGables } from '@/components/WhyTheGables';
import { PromotionsStrip } from '@/components/PromotionsStrip';
import { useAdmin } from '@/store/admin';
import { mediaBySlot } from '@/lib/media/defaults';
import { communityEvents, showtimes } from '@/data/events';
import { cn } from '@/lib/utils';

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

const words = ['Come', 'for', 'the', 'brands.'];
const words2 = ['Stay', 'for', 'the', 'vibe.'];

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
  {
    src: 'https://images.unsplash.com/photo-1555529902-5261145633bf?w=900&q=80',
    alt: 'Friends shopping',
    caption: 'Saturday energy',
    tall: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1607083206869-4c79715e227f?w=800&q=80',
    alt: 'Happy shopper',
    caption: 'Treat yourself',
    tall: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    alt: 'Restaurant friends',
    caption: 'Table for four',
    tall: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1523381294911-8d03ceec8d2b?w=800&q=80',
    alt: 'Fashion',
    caption: 'New season finds',
    tall: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    alt: 'Retail floor',
    caption: 'On the floor',
    tall: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
    alt: 'Coffee',
    caption: 'Meet · sip · stay',
    tall: false,
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

const tickerA = [
  'Open today · 09:00 – 18:00',
  'Free secure parking',
  '96+ brands on the floor',
  'Movie Zone · showtimes live',
  'Pick n Pay · Woolworths · Shoprite',
  'Courtyard dining open',
  'Banking strip ready',
  'Family-friendly · 24hr security',
];

const tickerB = [
  'Fashion · Food · Film',
  'Ezulwini Valley · MR103',
  'Shop · dine · linger',
  'Clicks · spas · self-care',
  'Tonight at Movie Zone',
  'Anchors you trust',
  'Open-air courts',
  'Come for the brands',
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
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-[88svh] sm:min-h-[92vh] flex items-center sm:items-end overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/45 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-terracotta/30 via-transparent to-transparent" />
        </div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute right-[8%] top-[20%] z-[5] hidden h-28 w-28 rounded-full border border-white/20 bg-white/5 backdrop-blur-md sm:block"
          animate={{ y: [0, -20, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-[5%] top-[36%] z-[5] hidden h-16 w-16 rounded-full bg-terracotta/35 blur-sm sm:block"
          animate={{ y: [0, 16, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute bottom-[26%] right-[16%] z-[5] hidden h-12 w-12 rounded-full border-2 border-sand/35 sm:block"
          animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:pb-16 sm:pt-32 text-white">
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: easeOut }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/12 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-sand backdrop-blur-md shadow-lg shadow-black/15"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terracotta opacity-80" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-terracotta" />
            </span>
            Open today · Ezulwini Valley
          </motion.div>

          <h1 className="max-w-4xl font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight overflow-hidden">
            {words.map((word, i) => (
              <motion.span
                key={`w1-${word}`}
                initial={{ opacity: 0, y: '120%', rotate: -4 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.85, ease: easeOut }}
                className="inline-block mr-[0.22em]"
              >
                {word}
              </motion.span>
            ))}
            <br />
            {words2.map((word, i) => (
              <motion.span
                key={`w2-${word}`}
                initial={{ opacity: 0, y: '120%', rotate: 3 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: 0.52 + i * 0.1, duration: 0.85, ease: easeOut }}
                className={cn(
                  'inline-block mr-[0.22em]',
                  word === 'vibe.' && 'text-sand italic'
                )}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.98, duration: 0.7, ease: easeOut }}
            className="mt-7 max-w-xl text-base sm:text-lg text-white/90 leading-relaxed"
          >
            96+ brands, free parking, cinema, banking and courtyard dining — the
            happy heart of Ezulwini under the African sun.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.12, duration: 0.65, ease: easeOut }}
            className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <Button
              asChild
              size="lg"
              variant="terracotta"
              className="gap-2 rounded-full btn-lift shadow-lg shadow-terracotta/30"
            >
              <Link href="/directory">
                Explore the mall <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/35 bg-white/12 text-white hover:bg-white/20 hover:text-white backdrop-blur-md"
            >
              <Link href="/events">What&apos;s on today</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.32, duration: 0.55, ease: easeOut }}
            className="mt-10 flex flex-wrap gap-2"
          >
            {['96+ brands', 'Free parking', 'Movie Zone', 'Food court', 'Banking', 'Open-air'].map(
              (chip, i) => (
                <motion.span
                  key={chip}
                  initial={{ opacity: 0, scale: 0.7, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    delay: 1.38 + i * 0.07,
                    type: 'spring',
                    stiffness: 260,
                    damping: 14,
                  }}
                  whileHover={{ scale: 1.06, y: -2 }}
                  className="cursor-default rounded-full border border-white/25 bg-white/12 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-sand backdrop-blur-md"
                >
                  {chip}
                </motion.span>
              )
            )}
          </motion.div>
        </div>
      </section>

      {/* PLACEHOLDER - truncated intentionally for tool size; full file will be restored */}
      <div className="p-12 text-center text-forest">Loading elevated sections…</div>
    </>
  );
}
