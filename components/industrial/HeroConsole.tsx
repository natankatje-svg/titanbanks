'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useEcwid } from '@/components/EcwidProvider';
import {
  BRAND,
  SPECS,
  TBD,
  LAUNCH_STATE,
  priceLabel,
  portsLabelCompact,
  safe,
} from '@/lib/product-claims';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * HeroConsole — industrial spec-sheet hero (revamp): GEEN full-bleed foto meer.
 * Links: gestapelde Archivo-Black kop + order-console (prijs/CTA/trust).
 * Rechts: nieuw hero-beeld (studio-orangegel) op blueprint-raster mét
 * technische annotatie-callouts naar de echte USP's (display/poorten/strap).
 * Copy = bestaande strings + SSOT-labels; geen wattage, geen luchtvaart.
 */
const CALLOUTS = [
  // posities in % t.o.v. het beeldframe (desktop); afgestemd op wat ZICHTBAAR
  // is in studio-orangegel: display links, poorten-top, strap rechts.
  { label: 'LED-display', x: 30, y: 38, side: 'left' as const },
  { label: '4× USB-A', x: 56, y: 14, side: 'right' as const },
  { label: 'Draaglus', x: 68, y: 55, side: 'right' as const },
  { label: 'Matte black', x: 34, y: 76, side: 'left' as const },
];

export default function HeroConsole() {
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
  const batchSize = 100;

  return (
    <section className="relative overflow-hidden bg-[#080808] blueprint-grid">
      {/* warme gloed rechtsboven — enige zachte element, gekoppeld aan het beeld */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full blur-[160px]"
        style={{ background: 'rgba(255,140,0,0.14)' }}
      />

      <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-5 pb-16 pt-10 lg:grid-cols-12 lg:gap-6 lg:px-8 lg:pb-24 lg:pt-16">
        {/* ── LINKS: type + console ── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="flex flex-col justify-center lg:col-span-6 xl:col-span-5"
        >
          {/* serial-regel */}
          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/45">
            <span>{BRAND.wordmark}</span>
            <span className="text-titan-accent">/</span>
            <span>{BRAND.product}</span>
            <span className="text-titan-accent">/</span>
            <span>{SPECS.finish.value}</span>
          </div>

          {/* gestapelde kop — bestaande motto-strings */}
          <h1
            className="font-display uppercase leading-[0.9] text-white [text-wrap:balance]"
            style={{ fontSize: 'clamp(2.9rem, 6.2vw, 5.6rem)' }}
          >
            {t('motto_lead')}
            <br />
            <span className="text-titan-accent">{t('motto_accent')}</span>
          </h1>

          {/* subregel — bestaande copy-onderdelen */}
          <p className="mt-6 max-w-md font-body text-base leading-relaxed text-[#B5B5B5] lg:text-lg">
            {capacityFormatted} mAh. {t('spec_icons.devices', { n: SPECS.simultaneousDevices.value })} tegelijk.{' '}
            {t('tagline_accent')}
          </p>

          {/* ORDER-CONSOLE — paneel met corner ticks */}
          <div className="corner-ticks mt-9 max-w-md border border-white/[0.12] bg-black/60 p-5 backdrop-blur-sm">
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <div>
                {price && (
                  <span className="font-display text-3xl text-white lg:text-4xl">{price}</span>
                )}
                <span className="ml-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/40">
                  incl. BTW
                </span>
              </div>
              <span className="inline-flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/50">
                <span className="h-1.5 w-1.5 rounded-full bg-titan-accent" aria-hidden />
                {t('stock_badge', { count: batchSize })}
              </span>
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row">
              <button
                onClick={onBuy}
                className="btn-console group flex-1"
                aria-label={`${isWaitlist ? t('cta_waitlist') : t('cta_buy_now')} ${price ?? ''}`}
              >
                <span>{isWaitlist ? t('cta_waitlist') : t('cta_buy_now')}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </button>
              <Link href="/shop" locale={locale} className="btn-console-ghost flex-1 text-center">
                {t('cta_view_specs')}
              </Link>
            </div>

            <p className="mt-4 font-body text-[12px] text-[#9C9C9C]">
              {t('trust_inline', { days: safe(TBD.returnPolicyDays) ?? 14 })}
            </p>
          </div>

          {/* mono-specregel */}
          <p className="mt-6 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/45">
            {capacityFormatted} mAh · {t('spec_icons.devices', { n: SPECS.simultaneousDevices.value })} ·{' '}
            {t('spec_icons.label_fastcharge')} · {t('spec_icons.display')}
          </p>
        </motion.div>

        {/* ── RECHTS: product op raster met annotatie-callouts ── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="relative lg:col-span-6 xl:col-span-7"
        >
          <div className="relative mx-auto aspect-square w-full max-w-[640px]">
            {/* frame */}
            <div className="absolute inset-0 border border-white/[0.1]" aria-hidden />
            {/* meet-merktekens op het frame */}
            <div aria-hidden className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-titan-accent" />
            <div aria-hidden className="absolute bottom-0 left-1/2 h-2 w-px -translate-x-1/2 bg-titan-accent" />
            <div aria-hidden className="absolute left-0 top-1/2 h-px w-2 -translate-y-1/2 bg-titan-accent" />
            <div aria-hidden className="absolute right-0 top-1/2 h-px w-2 -translate-y-1/2 bg-titan-accent" />

            <Image
              src="/images/titanx/gallery/v2/studio-orangegel.webp"
              alt={`${BRAND.text} ${BRAND.product} — ${capacityFormatted} mAh power bank, matte black met oranje draaglus`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 54vw"
              className="object-cover p-px"
            />

            {/* annotatie-callouts — desktop */}
            <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
              {CALLOUTS.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: reduce ? 0 : 0.6 + i * 0.18, duration: 0.4 }}
                  className="absolute"
                  style={{ left: `${c.x}%`, top: `${c.y}%` }}
                >
                  <div className={`flex items-center ${c.side === 'left' ? 'flex-row-reverse' : ''}`}>
                    <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                      <span className="absolute h-2.5 w-2.5 rounded-full border border-titan-accent" />
                      <span className="h-1 w-1 rounded-full bg-titan-accent" />
                    </span>
                    <span className={`h-px w-10 bg-titan-accent/60 ${c.side === 'left' ? 'mr-0.5' : 'ml-0.5'}`} />
                    <span
                      className={`whitespace-nowrap border border-white/[0.14] bg-black/80 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/85 backdrop-blur-sm ${
                        c.side === 'left' ? 'mr-1.5' : 'ml-1.5'
                      }`}
                    >
                      {c.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* frame-onderschrift */}
            <div className="absolute inset-x-0 -bottom-7 flex items-center justify-between font-mono text-[0.58rem] uppercase tracking-[0.18em] text-white/35" aria-hidden>
              <span>{BRAND.product} / {SPECS.finish.value}</span>
              <span>{capacityFormatted} mAh</span>
            </div>
          </div>

          {/* mobiel: callout-labels als chips onder het beeld */}
          <div className="mt-10 flex flex-wrap gap-2 lg:hidden">
            {[`${capacityFormatted} mAh`, 'LED-display', portsLabelCompact(), 'Draaglus'].map((l) => (
              <span
                key={l}
                className="border border-white/[0.14] bg-black/60 px-2.5 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white/80"
              >
                {l}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
