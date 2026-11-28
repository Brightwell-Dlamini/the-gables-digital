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
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhyTheGables } from '@/components/WhyTheGables';
import { PromotionsStrip } from '@/components/PromotionsStrip';
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

export function LandingBody() {
  const nextEvents = communityEvents.slice(0, 3);
  const films = showtimes.slice(0, 3);

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

      {/* Remainder of landing sections kept in production via prior deploy; Community uses Users icon */}
      <WhyTheGables />
      <PromotionsStrip />

      <section className="relative overflow-hidden py-20 sm:py-28 bg-forest text-white">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terracotta">Tonight & this week</p>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl md:text-5xl font-medium">What&apos;s on at the mall</h2>
              <Button asChild variant="terracotta" className="mt-8 rounded-full gap-2 btn-lift">
                <Link href="/events">Full programme <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/12 bg-white/8 p-5 backdrop-blur-md">
                <div className="flex items-center gap-2 text-terracotta">
                  <Film className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Movie Zone</span>
                </div>
                <ul className="mt-5 space-y-4">
                  {films.map((f) => (
                    <li key={f.title} className="border-b border-white/10 pb-3 last:border-0">
                      <p className="font-serif text-lg">{f.title}</p>
                      <p className="mt-1 text-sm text-white/55">{f.times?.join(' · ')}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/12 bg-white/8 p-5 backdrop-blur-md">
                <div className="flex items-center gap-2 text-terracotta">
                  <Users className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Community</span>
                </div>
                <ul className="mt-5 space-y-4">
                  {nextEvents.map((e) => (
                    <li key={e.id} className="border-b border-white/10 pb-3 last:border-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-terracotta/90">{e.date}</p>
                      <p className="mt-1 font-serif text-lg">{e.title}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
