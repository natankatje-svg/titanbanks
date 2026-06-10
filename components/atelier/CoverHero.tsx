'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useEcwid } from '@/components/EcwidProvider';
import {
  BRAND,
  SPECS,
  TBD,
  LAUNCH_STATE,
  priceLabel,
  safe,
} from '@/lib/product-claims';

const EASE = [0.25, 1, 0.5, 1] as const;

/**
 * CoverHero — campagne-cover: het halo-beeld als couture-juweel achter een
 * gecentreerde Bodoni-kop (accentregel in italic oranje). Eén gevulde CTA
 * met prijs + hairline-specs-link; trustregel eronder. Copy = bestaande strings.
 */
export default function CoverHero() {
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
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#080808]">
      {/* cover-beeld — halo als juweel, gedimd met vignet */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/images/titanx/gallery/v2/energy-halo.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_42%] opacity-70"
        />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 45%, transparent 30%, rgba(8,8,8,0.88) 78%, #080808 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0.15) 30%, rgba(8,8,8,0.2) 62%, #080808 100%)' }} />
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center"
      >
        {/* maison-regel */}
        <span className="font-body text-[0.66rem] uppercase tracking-[0.34em] text-white/60">
          {BRAND.wordmark} — {BRAND.product}
        </span>
        <span className="maison-rule my-7" aria-hidden />

        {/* campagne-kop — Bodoni, accent in italic oranje */}
        <h1
          className="font-display leading-[1.02] text-white [text-wrap:balance]"
          style={{ fontSize: 'clamp(3rem, 7.5vw, 6.8rem)', textShadow: '0 2px 50px rgba(0,0,0,0.75)' }}
        >
          {t('motto_lead')}
          <br />
          <em className="italic text-titan-accent">{t('motto_accent')}</em>
        </h1>

        {/* sub — bestaande copy-onderdelen */}
        <p className="mt-7 max-w-md font-body text-base font-400 leading-relaxed text-[#C9C9C9] lg:text-lg">
          {capacityFormatted} mAh. {t('spec_icons.devices', { n: SPECS.simultaneousDevices.value })} tegelijk.{' '}
          {t('tagline_accent')}
        </p>

        {/* CTA-duo */}
        <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
          <button onClick={onBuy} className="btn-atelier" aria-label={`${isWaitlist ? t('cta_waitlist') : t('cta_buy_now')} ${price ?? ''}`}>
            {isWaitlist ? t('cta_waitlist') : t('cta_buy_now')}
            {price && <span className="font-display normal-case italic tracking-normal">— {price}</span>}
          </button>
          <Link href="/shop" locale={locale} className="link-hairline">
            {t('cta_view_specs')}
          </Link>
        </div>

        {/* trust */}
        <p className="mt-8 font-body text-[12px] text-[#9C9C9C]">
          {t('trust_inline', { days: safe(TBD.returnPolicyDays) ?? 14 })}
        </p>
      </motion.div>

      {/* scroll-lijn onderaan */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2" aria-hidden>
        <span className="maison-rule block !h-10 opacity-60" />
      </div>
    </section>
  );
}
