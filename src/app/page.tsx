'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/store/admin';
import { mediaBySlot } from '@/lib/media/defaults';
import { LandingBody } from '@/components/home/LandingBody';
import { cn } from '@/lib/utils';

const easeOut = [0.16, 1, 0.3, 1] as const;
const words = ['Come', 'for', 'the', 'brands.'];
const words2 = ['Stay', 'for', 'the', 'vibe.'];

export default function HomePage() {
  const media = useAdmin((s) => s.media);
  const heroVideo = mediaBySlot(media, 'hero_video');
  const heroPoster = mediaBySlot(media, 'hero_poster');
  const videoSrc = heroVideo?.url;
  const posterSrc =
    heroVideo?.poster_url ||
    heroPoster?.url ||
    'https://images.unsplash.com/photo-1555529902-5261145633bf?w=1600&q=80';

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

        {/* Floating orbs */}
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
              <Link href="/events">What's on today</Link>
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

      <LandingBody />
    </>
  );
}
