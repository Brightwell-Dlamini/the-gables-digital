'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/store/admin';
import { mediaBySlot } from '@/lib/media/defaults';
import { LandingBody } from '@/components/home/LandingBody';

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
      <section className="relative min-h-[88svh] sm:min-h-[94vh] flex items-center sm:items-end overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.12 }}
            animate={{ scale: 1.0 }}
            transition={{ duration: 12, ease: 'easeOut' }}
          >
            {videoSrc ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={posterSrc}
                className="h-full w-full object-cover"
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={posterSrc}
                alt="Happy shoppers at The Gables"
                className="h-full w-full object-cover"
              />
            )}
          </motion.div>
          <div className="absolute inset-0 bg-forest/55 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/50 to-forest/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-terracotta/35 via-transparent to-transparent" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay noise-overlay"
          />
        </div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute right-[6%] top-[18%] z-[5] hidden h-32 w-32 rounded-full border border-white/20 bg-white/5 backdrop-blur-md sm:block"
          animate={{ y: [0, -24, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-[10%] bottom-[28%] z-[5] hidden h-16 w-16 rounded-full bg-terracotta/50 blur-md sm:block"
          animate={{ y: [0, 16, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute right-[22%] bottom-[18%] z-[5] hidden h-10 w-10 rounded-full border border-sand/30 sm:block"
          animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:pb-20 sm:pt-36">
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-sand backdrop-blur-md"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Open today · Ezulwini
          </motion.div>

          <h1 className="mt-6 max-w-4xl font-serif text-[2.75rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white">
            <span className="block overflow-hidden">
              {words.map((w, i) => (
                <motion.span
                  key={`a-${w}`}
                  initial={{ opacity: 0, y: '110%', rotate: 4 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{
                    delay: 0.12 + i * 0.08,
                    duration: 0.85,
                    ease: easeOut,
                  }}
                  className="inline-block mr-[0.22em]"
                >
                  {w}
                </motion.span>
              ))}
            </span>
            <span className="block overflow-hidden mt-1 sm:mt-2 text-sand/90 italic">
              {words2.map((w, i) => (
                <motion.span
                  key={`b-${w}`}
                  initial={{ opacity: 0, y: '110%', rotate: -3 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{
                    delay: 0.48 + i * 0.09,
                    duration: 0.85,
                    ease: easeOut,
                  }}
                  className="inline-block mr-[0.22em]"
                >
                  {w}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.65, ease: easeOut }}
            className="mt-6 max-w-lg text-base sm:text-lg text-white/85 leading-relaxed"
          >
            96+ brands, open-air courts and free parking in the heart of the
            Ezulwini Valley — the mall people actually want to go to.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.55, ease: easeOut }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button
              asChild
              size="lg"
              variant="terracotta"
              className="rounded-full gap-2 btn-lift shadow-lg shadow-terracotta/30"
            >
              <Link href="/directory">
                Explore the directory <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/30 bg-white/5 text-white backdrop-blur-sm hover:bg-white/15 hover:text-white"
            >
              <Link href="/events">What&apos;s on</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.35, duration: 0.6 }}
            className="mt-10 flex flex-wrap gap-2 sm:gap-3"
          >
            {['Free parking', '96+ brands', 'Movie Zone', '24hr security'].map(
              (chip, i) => (
                <motion.span
                  key={chip}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + i * 0.07 }}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm"
                >
                  {chip}
                </motion.span>
              )
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1 text-white/60"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </section>

      <LandingBody />
    </>
  );
}
