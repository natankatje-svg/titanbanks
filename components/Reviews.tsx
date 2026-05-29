'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Hourglass, Star, ShieldCheck } from 'lucide-react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { LAUNCH_STATE } from '@/lib/product-claims';
import { REVIEWS, averageRating, totalReviews, type Locale } from '@/lib/reviews';

/*
  Drie-staten render:
  - REVIEWS.length === 0 && isPreLaunch → pre-launch placeholder (waitlist)
  - REVIEWS.length === 0 && !isPreLaunch → "binnenkort"-state (post-launch, voor delivery)
  - REVIEWS.length > 0  → render echte reviews uit lib/reviews.ts SSOT

  HelpfulCrowd (Ecwid app) zal post-delivery email-flow voor verified-buyer
  reviews verzorgen op termijn. Tot dan beheren we hand-gecureerde reviews
  via lib/reviews.ts.
*/

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} van 5 sterren`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4"
          fill={i < rating ? '#FF8C00' : 'transparent'}
          stroke={i < rating ? '#FF8C00' : '#3A3A3A'}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, locale }: { review: (typeof REVIEWS)[number]; locale: Locale }) {
  const quote = review.quote[locale] ?? review.quote.nl;
  return (
    <article className="glass-card p-7 flex flex-col gap-4 text-left">
      <header className="flex items-center justify-between gap-3">
        <StarRow rating={review.rating} />
        {review.verifiedBuyer && (
          <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#0EB5C8]">
            <ShieldCheck className="w-3 h-3" />
            Verified buyer
          </span>
        )}
      </header>
      <blockquote className="font-body text-[#D5D5D5] text-base leading-relaxed">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <footer className="flex items-center gap-3 mt-auto pt-2 border-t border-white/[0.06]">
        {review.photoSrc && (
          <Image
            src={review.photoSrc}
            alt=""
            width={36}
            height={36}
            className="w-9 h-9 rounded-full object-cover"
          />
        )}
        <div className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-[#9A9A9A]">
          {review.name}
          {review.location && <> &middot; {review.location}</>}
        </div>
        <time
          dateTime={review.date}
          className="ml-auto font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#666666]"
        >
          {review.date}
        </time>
      </footer>
    </article>
  );
}

export default function Reviews() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const locale = useLocale() as Locale;

  // STATE 3: echte reviews aanwezig
  if (REVIEWS.length > 0) {
    const avg = averageRating();
    return (
      <section id="reviews" ref={ref} className="relative py-24 lg:py-32 bg-[#0A0A0A] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-[#FF6B00]" />
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#888888]">
                10 — Reviews
              </span>
              <div className="w-6 h-px bg-[#FF6B00]" />
            </div>
            <h2
              className="font-display uppercase text-white mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 0.95 }}
            >
              Wat eerste kopers zeggen
            </h2>
            {avg != null && (
              <div className="inline-flex items-center gap-3 font-body text-[#C5C5C5]">
                <StarRow rating={Math.round(avg)} />
                <span className="font-mono text-sm">
                  {avg.toFixed(1)} / 5 &middot; {totalReviews()} review{totalReviews() === 1 ? '' : 's'}
                </span>
              </div>
            )}
          </motion.header>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
              >
                <ReviewCard review={r} locale={locale} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // STATE 1: pre-launch, geen reviews
  if (LAUNCH_STATE.isPreLaunch) {
    return (
      <section id="reviews" ref={ref} className="relative py-24 lg:py-36 bg-[#0A0A0A] overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,107,0,0.05) 0%, transparent 65%)' }}
        />
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-[#FF6B00]" />
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#888888]">
                Reviews · in afwachting
              </span>
              <div className="w-6 h-px bg-[#FF6B00]" />
            </div>
            <h2
              className="font-display uppercase text-white mb-6"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', lineHeight: 0.92 }}
            >
              Echte reviews,
              <br />
              na de eerste batch.
            </h2>
            <p className="font-body text-[#A0A0A0] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Titan X is pre-launch. We tonen alleen verified-buyer reviews — geen
              verzonnen quotes, geen fake aggregate. Eerste echte reviews verschijnen
              hier zodra de eerste batch verzonden is.
            </p>
            <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#666666]">
              <Hourglass className="inline w-3 h-3 mr-2" />
              Eerste batch: verzending bij launch
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // STATE 2: post-launch, nog geen reviews ontvangen (window tussen eerste verzending en eerste review)
  return (
    <section id="reviews" ref={ref} className="relative py-24 bg-[#0A0A0A]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-[#FF6B00]" />
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#888888]">
            10 — Reviews
          </span>
          <div className="w-6 h-px bg-[#FF6B00]" />
        </div>
        <h2
          className="font-display uppercase text-white mb-4"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 0.95 }}
        >
          Reviews komen binnenkort.
        </h2>
        <p className="font-body text-[#A0A0A0] text-base leading-relaxed max-w-xl mx-auto">
          Eerste batch is verzonden. Verified-buyer reviews verschijnen hier
          binnen 7–14 dagen na delivery — geen verzonnen quotes, geen fake aggregate.
        </p>
      </div>
    </section>
  );
}
