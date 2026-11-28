'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  Film,
  Utensils,
  Landmark,
  Car,
  Sun,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhyTheGables } from '@/components/WhyTheGables';
import { PromotionsStrip } from '@/components/PromotionsStrip';
import { communityEvents, showtimes } from '@/data/events';

const spring = { type: 'spring' as const, stiffness: 140, damping: 16 };
const easeOut = [0.16, 1, 0.3, 1] as const;

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

export function LandingLower() {
  const nextEvents = communityEvents.slice(0, 3);
  const films = showtimes.slice(0, 3);

  return (
    <>
      <WhyTheGables />
      <PromotionsStrip />

      <section className="relative overflow-hidden py-24 sm:py-32 bg-forest text-white">
        <div className="absolute inset-0 opacity-[0.18]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3b2?w=1600&q=70" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-forest via-forest/92 to-forest" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            <div>
              <motion.p initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-xs font-semibold uppercase tracking-[0.22em] text-terracotta">Tonight & this week</motion.p>
              <motion.h2 initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06, duration: 0.65, ease: easeOut }} className="mt-2 font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-balance leading-[1.05]">What&apos;s on<br className="hidden sm:block" /> at the mall</motion.h2>
              <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 }} className="mt-4 text-white/75 max-w-md leading-relaxed">Cinema nights, community moments and the energy that keeps the courts alive after dark.</motion.p>
              <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-8">
                <Button asChild variant="terracotta" className="rounded-full gap-2 btn-lift"><Link href="/events">Full programme <ArrowRight className="h-4 w-4" /></Link></Button>
              </motion.div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, ...spring }} className="rounded-2xl border border-white/12 bg-white/8 p-5 backdrop-blur-md">
                <div className="flex items-center gap-2 text-terracotta"><Film className="h-4 w-4" /><span className="text-xs font-semibold uppercase tracking-wider">Movie Zone</span></div>
                <ul className="mt-5 space-y-4">
                  {films.map((f) => (
                    <li key={f.title} className="border-b border-white/10 pb-3 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-serif text-lg leading-snug">{f.title}</p>
                        <span className="shrink-0 rounded bg-terracotta/90 px-2 py-0.5 text-[10px] font-bold">{f.rating}</span>
                      </div>
                      <p className="mt-1 text-sm text-white/55">{f.times?.join(' · ')}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.18, ...spring }} className="rounded-2xl border border-white/12 bg-white/8 p-5 backdrop-blur-md">
                <div className="flex items-center gap-2 text-terracotta"><Users className="h-4 w-4" /><span className="text-xs font-semibold uppercase tracking-wider">Community</span></div>
                <ul className="mt-5 space-y-4">
                  {nextEvents.map((e) => (
                    <li key={e.id} className="border-b border-white/10 pb-3 last:border-0 last:pb-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-terracotta/90">{e.date}</p>
                      <p className="mt-1 font-serif text-lg leading-snug">{e.title}</p>
                    </li>
                  ))}
                </ul>
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
          <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/70 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl text-white">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <Utensils className="h-3.5 w-3.5" /> Food court & dining
            </motion.div>
            <h2 className="mt-5 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] text-balance overflow-hidden">
              {['Pause', 'for', 'the', 'plate'].map((w, i) => (
                <motion.span key={w} initial={{ opacity: 0, y: '110%' }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.09, duration: 0.7, ease: easeOut }} className="inline-block mr-[0.22em]">{w}</motion.span>
              ))}
            </h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.6 }} className="mt-4 text-lg text-white/85 leading-relaxed">
              Quick bites between errands or a long lunch under the mountain light — the courts are built for lingering.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
              <Button asChild size="lg" variant="terracotta" className="mt-8 gap-2 rounded-full btn-lift"><Link href="/directory?cat=Food%20%26%20Dining">Find dining <ArrowRight className="h-4 w-4" /></Link></Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 bg-sand">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="section-eyebrow">Plan your visit</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06, duration: 0.65, ease: easeOut }} className="mt-2 font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-forest text-balance leading-[1.05]">Easy to reach.<br />Hard to leave.</motion.h2>
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 }} className="mt-4 text-ink-muted leading-relaxed">On the MR103 between Mbabane and Manzini — minutes from Mantenga and Mlilwane, with free parking and 24-hour security.</motion.p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            {visitPoints.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 36, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, ...spring }} whileHover={{ y: -6, transition: { duration: 0.22 } }} className="group rounded-2xl border border-forest/10 bg-white p-6 sm:p-7 shadow-sm hover:shadow-glass transition-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-terracotta/10 text-terracotta transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"><p.icon className="h-5 w-5" /></div>
                <h3 className="mt-5 font-serif text-xl font-medium text-forest">{p.title}</h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">{p.copy}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12 text-center">
            <Button asChild variant="outline" className="rounded-full gap-1.5"><Link href="/visit">Visit guide <ArrowRight className="h-4 w-4" /></Link></Button>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 sm:py-32 bg-forest text-white">
        <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-terracotta/25 blur-3xl" />
        <div className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-sand/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-xs font-semibold uppercase tracking-[0.22em] text-sand/55">For retailers</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.06, duration: 0.7, ease: easeOut }} className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-balance leading-[1.05]">Join the brands<br className="hidden sm:block" /> people come back for</motion.h2>
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.14 }} className="mt-5 max-w-xl mx-auto text-white/70 leading-relaxed">Premium footfall, free parking, strong anchors and a lifestyle destination that keeps growing — built for brands that want to belong in the valley.</motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.22 }} className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" variant="terracotta" className="rounded-full btn-lift"><Link href="/leasing">Start your enquiry</Link></Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"><Link href="/about">Why The Gables</Link></Button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
