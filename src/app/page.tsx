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

const loveNotes = [
  { quote: 'Saturday mornings start here.', who: 'The regulars' },
  { quote: 'Best courtyard energy in the valley.', who: 'Food court crew' },
  { quote: 'Kids run free. Parents actually relax.', who: 'Families' },
  { quote: 'One loop. Everything sorted.', who: 'Weekday warriors' },
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
    alt: 'Friends shopping with bags',
    caption: 'Saturday energy',
    tall: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1607083206869-4c79715e227f?w=800&q=80',
    alt: 'Happy shopper with bags',
    caption: 'Treat yourself',
    tall: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    alt: 'Friends at a restaurant',
    caption: 'Table for four',
    tall: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1523381294911-8d03ceec8d2b?w=800&q=80',
    alt: 'Fashion browsing',
    caption: 'New season finds',
    tall: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    alt: 'Busy retail floor',
    caption: 'On the floor',
    tall: false,
  },
  {
    src: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
    alt: 'Coffee and catch-up',
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

        {/* Floating playful orbs */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute right-[8%] top-[22%] z-[5] hidden h-24 w-24 rounded-full border border-white/20 bg-white/5 backdrop-blur-md sm:block"
          animate={{ y: [0, -18, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-[6%] top-[38%] z-[5] hidden h-16 w-16 rounded-full bg-terracotta/30 blur-sm sm:block"
          animate={{ y: [0, 14, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute bottom-[28%] right-[18%] z-[5] hidden h-10 w-10 rounded-full border-2 border-sand/40 sm:block"
          animate={{ y: [0, -10, 0], x: [0, 6, 0] }}
          transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-32 text-white">
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: easeOut }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/12 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-sand backdrop-blur-md shadow-lg shadow-black/10"
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
                initial={{ opacity: 0, y: '120%', rotate: -3 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{
                  delay: 0.1 + i * 0.1,
                  duration: 0.85,
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
                initial={{ opacity: 0, y: '120%', rotate: 2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{
                  delay: 0.52 + i * 0.1,
                  duration: 0.85,
                  ease: easeOut,
                }}
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
            96+ brands, free parking, cinema, banking and courtyard dining —
            the happy heart of Ezulwini under the African sun.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.12, duration: 0.65, ease: easeOut }}
            className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <Button asChild size="lg" variant="terracotta" className="gap-2 btn-lift shadow-lg shadow-terracotta/30">
              <Link href="/directory">
                Explore the mall <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/35 bg-white/12 text-white hover:bg-white/20 hover:text-white backdrop-blur-md"
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
                  transition={{ delay: 1.38 + i * 0.07, type: 'spring', stiffness: 260, damping: 14 }}
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

      {/* PLACEHOLDER_REST - truncated for size; full file needs complete push */}
      <div className="p-8 text-center text-forest">Loading full homepage sections…</div>
    </>
  );
}
