'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
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

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * PulseHero — de "reactor": het halo-beeld in een zwevende cirkel met twee
 * traag draaiende orbit-ringen, omringd door roterende energie-blobs en
 * embers. Links de Unbounded-kop + pulserende CTA. Copy = bestaande strings.
 */
export default function PulseHero() {
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
  const price = priceLabel();

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#080808]">
      {/* roterende energie-blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="pulse-blob absolute -left-[18%] top-[30%] h-[640px] w-[640px] opacity-60" style={{ ['--blob-dur' as string]: '30s' }} />
        <div className="pulse-blob absolute -right-[14%] -top-[18%] h-[560px] w-[560px] opacity-50" style={{ ['--blob-dur' as string]: '24s' }} />
        <EmberDrift />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-12 px-6 pb-16 pt-28 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:pb-20 lg:pt-24">
        {/* tekst */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="order-2 flex flex-col items-start lg:order-1 lg:col-span-5"
        >
          <span className="font-mono text-[0.66rem] uppercase tracking-[0.26em] text-white/55">
            {BRAND.wordmark} · {BRAND.product}
          </span>

          <h1
            className="mt-5 font-display uppercase leading-[1.04] text-white [text-wrap:balance]"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.4rem)' }}
          >
            {t('motto_lead')}
            <br />
            <span className="text-titan-accent text-glow-orange">{t('motto_accent')}</span>
          </h1>

          <p className="mt-6 max-w-md font-body text-base leading-relaxed text-[#B9B9B9] lg:text-lg">
            {capacityFormatted} mAh. {t('spec_icons.devices', { n: SPECS.simultaneousDevices.value })} tegelijk.{' '}
            {t('tagline_accent')}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button onClick={onBuy} className="btn-pulse group" aria-label={`${isWaitlist ? t('cta_waitlist') : t('cta_buy_now')} ${price ?? ''}`}>
              <span>{isWaitlist ? t('cta_waitlist') : t('cta_buy_now')}</span>
              {price && <span className="opacity-80">· {price}</span>}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </button>
            <a href="#specs" className="btn-pulse-ghost">
              {t('cta_view_specs')}
            </a>
          </div>

          {/* stat-chips — vullen de linkerkolom + scanbare USP's (bestaande termen) */}
          <div className="mt-8 flex flex-wrap gap-2.5">
            {[
              `${capacityFormatted} mAh`,
              t('spec_icons.devices', { n: SPECS.simultaneousDevices.value }),
              t('spec_icons.label_fastcharge'),
              t('spec_icons.display'),
            ].map((label) => (
              <span
                key={label}
                className="rounded-full border border-white/[0.12] bg-white/[0.04] px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/75 backdrop-blur-sm"
              >
                {label}
              </span>
            ))}
          </div>

          <p className="mt-6 font-body text-[12px] text-[#9C9C9C]">
            {t('trust_inline', { days: safe(TBD.returnPolicyDays) ?? 14 })}
          </p>

          {/* betaal-vertrouwen — stil, vult de lege onderruimte */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {['iDEAL', 'Apple Pay', 'Klarna', 'Visa', 'Mastercard', 'PayPal'].map((m) => (
              <span key={m} className="rounded border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[0.56rem] text-[#8E8E8E]">
                {m}
              </span>
            ))}
          </div>
        </motion.div>

        {/* reactor — zwevende cirkel + orbit-ringen. GEEN entrance-fade: dit is
            het LCP-element; opacity:0 in SSR laat LCP wachten op hydration
            (gemeten: +6s op trage mobiel). Direct zichtbaar = snelste paint. */}
        <div className="order-1 flex items-center justify-center lg:order-2 lg:col-span-7">
          <div className="relative aspect-square w-[88vw] max-w-[460px] lg:max-w-[640px]">
            {/* orbit-ringen — drie lagen + twee satellieten */}
            <svg aria-hidden viewBox="0 0 100 100" className="pulse-ring absolute -inset-[6%] h-[112%] w-[112%]">
              <circle cx="50" cy="50" r="48.5" fill="none" stroke="rgba(255,140,0,0.4)" strokeWidth="0.35" strokeDasharray="2.4 4.2" />
              <circle cx="98.5" cy="50" r="0.9" fill="#FF8C00" />
            </svg>
            <svg aria-hidden viewBox="0 0 100 100" className="pulse-ring-rev absolute -inset-[13%] h-[126%] w-[126%]">
              <circle cx="50" cy="50" r="48.5" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.25" strokeDasharray="0.7 6.5" />
              <circle cx="50" cy="1.5" r="1.1" fill="#FF8C00" />
            </svg>
            <svg aria-hidden viewBox="0 0 100 100" className="pulse-ring absolute -inset-[20%] h-[140%] w-[140%]" style={{ animationDuration: '70s' }}>
              <circle cx="50" cy="50" r="48.5" fill="none" stroke="rgba(255,140,0,0.12)" strokeWidth="0.2" strokeDasharray="0.4 9" />
              <circle cx="1.5" cy="50" r="0.7" fill="rgba(255,170,80,0.9)" />
            </svg>

            {/* pulserende buitengloed */}
            <div aria-hidden className="hero-glow-pulse absolute inset-[6%] rounded-full" style={{ boxShadow: '0 0 130px rgba(255,140,0,0.35)' }} />

            {/* zwevend halo-product in cirkel */}
            <div className="pulse-float absolute inset-0 overflow-hidden rounded-full border border-white/[0.12] shadow-[0_0_110px_rgba(255,140,0,0.3)]">
              <Image
                src="/images/titanx/gallery/v2/energy-halo.webp"
                alt={`${BRAND.text} ${BRAND.product} — ${capacityFormatted} mAh power bank met gloeiende lichtring`}
                fill
                priority
                sizes="(max-width: 1024px) 88vw, 640px"
                className="object-cover object-[52%_38%] scale-[1.12]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* onderfade naar volgende sectie */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-28" style={{ background: 'linear-gradient(to bottom, transparent, #080808)' }} />
    </section>
  );
}
