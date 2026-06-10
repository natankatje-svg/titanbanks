'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useEcwid } from '@/components/EcwidProvider';
import EmberDrift from '@/components/home/EmberDrift';
import {
  BRAND,
  SPECS,
  TBD,
  LAUNCH_STATE,
  priceLabel,
  safe,
} from '@/lib/product-claims';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Hero V6 — "obsidian vitrine": het vaste embers-beeld full-bleed, met de
 * complete content-stack ONDER-LINKS (Apple Watch Ultra-compositie). Eén
 * oranje pill als enige gevulde CTA, prijs als ghost-label ernaast, en de
 * specs als één stille mono-regel i.p.v. pill-soep. Scroll-cue onderaan.
 *
 * Performance: één statisch beeld als LCP-element (`priority`) — geen WebGL.
 */
export default function HeroVariantB() {
  const locale = useLocale();
  const t = useTranslations('hero');
  const { addToCart } = useEcwid();
  const reduce = useReducedMotion();

  const isWaitlist = LAUNCH_STATE.waitlistMode;
  const onBuy = () => {
    if (isWaitlist) {
      window.location.href = '#waitlist';
      return;
    }
    addToCart();
  };

  const capacityFormatted = SPECS.capacityMah.value.toLocaleString(locale);
  const batchSize = 100;
  const price = priceLabel();

  // Eén stille mono-specregel (content-regel: nooit een specifiek wattage).
  const specLine = [
    `${capacityFormatted} mAh`,
    t('spec_icons.devices', { n: SPECS.simultaneousDevices.value }),
    t('spec_icons.label_fastcharge'),
    t('spec_icons.display'),
  ].join('  ·  ');

  return (
    <section className="relative flex items-end overflow-hidden bg-[#0A0A0A] text-white min-h-[100svh]">
      {/* BG — embers-fotoachtergrond (LCP-element, vast hero-beeld) */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Image
          src="/images/titanx/hero-embers.jpg"
          alt={`${BRAND.text} ${BRAND.product} — ${capacityFormatted} mAh power bank op een podium`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center] lg:object-center"
        />
      </div>

      {/* Scrim — links + onder donker voor de bottom-left stack, rechts blijft het product vrij */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            'linear-gradient(to right, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.6) 34%, rgba(8,8,8,0.18) 58%, rgba(8,8,8,0) 75%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            'linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, rgba(8,8,8,0) 26%, rgba(8,8,8,0) 55%, rgba(8,8,8,0.85) 88%, #0A0A0A 100%)',
        }}
      />
      {/* Mobiel — extra demping voor leesbaarheid over het beeld */}
      <div className="absolute inset-0 bg-[#0A0A0A]/30 lg:bg-transparent pointer-events-none" style={{ zIndex: 1 }} />

      {/* Energie-effecten — links begrensd zodat ze niet over het product lopen */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 5 }}>
        <div
          className="hero-glow-pulse hidden lg:block absolute bottom-[18%] left-[10%] w-[480px] h-[480px] rounded-full blur-[120px]"
          style={{ background: 'rgba(255,140,0,0.2)' }}
        />
        <div className="absolute inset-y-0 left-0 w-[58%] overflow-hidden">
          <div
            className="hero-sweep absolute top-[-20%] left-0 h-[140%] w-[140px] blur-2xl"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,150,60,0.28), transparent)' }}
          />
        </div>
        <EmberDrift />
      </div>

      {/* CONTENT — onder-links (Apple-compositie) */}
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10 pb-20 lg:pb-24 pt-36" style={{ zIndex: 10 }}>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col items-start text-left max-w-2xl"
        >
          {/* Kicker — productnaam + stille batch-status op één regel */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-5">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-white/50">
              {BRAND.wordmark} · {BRAND.product}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-titan-accent" aria-hidden />
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-white/45">
                {t('stock_badge', { count: batchSize })}
              </span>
            </span>
          </div>

          {/* Headline — 2 regels, accent op regel 2, Apple-schaal */}
          <h1
            className="font-display font-extrabold uppercase leading-[0.94] tracking-[-0.035em] text-white mb-7 [text-wrap:balance]"
            style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', textShadow: '0 2px 30px rgba(0,0,0,0.5)' }}
          >
            {t('motto_lead')}
            <br />
            <span className="text-gradient-orange text-glow-orange">{t('motto_accent')}</span>
          </h1>

          {/* CTA-cluster — één gevulde pill + prijs-ghost + stille specs-link */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 mb-6">
            <button
              onClick={onBuy}
              className="btn-orange group"
              style={{ padding: '0.95rem 2rem', fontSize: '0.95rem' }}
              aria-label={`${isWaitlist ? t('cta_waitlist') : t('cta_buy_now')} ${price ?? ''}`}
            >
              <span>{isWaitlist ? t('cta_waitlist') : t('cta_buy_now')}</span>
              <ArrowRight className="w-[15px] h-[15px] transition-transform group-hover:translate-x-0.5" aria-hidden />
            </button>
            {price && (
              <span className="font-body text-white/90 text-lg" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.6)' }}>
                {price}
              </span>
            )}
            <Link
              href="/shop"
              locale={locale}
              className="font-body text-sm text-white/65 underline underline-offset-4 decoration-white/30 transition-colors hover:text-titan-accent hover:decoration-titan-accent/50"
            >
              {t('cta_view_specs')}
            </Link>
          </div>

          {/* Specs — één stille mono-regel i.p.v. pills */}
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-white/55 mb-3">
            {specLine}
          </p>

          {/* Trust mini */}
          <p className="font-body text-[#B0B0B0] text-[12px] lg:text-[13px]">
            {t('trust_inline', { days: safe(TBD.returnPolicyDays) ?? 14 })}
          </p>
        </motion.div>
      </div>

      {/* Scroll-cue — gecentreerd onderaan */}
      <motion.div
        aria-hidden
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1 text-white/35"
        style={{ zIndex: 10 }}
      >
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
