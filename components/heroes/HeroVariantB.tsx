'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Zap, BatteryCharging, Plug, Gauge } from 'lucide-react';
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

// Benefit-badges (pill-rij onder de CTA's). Volgorde = USP-rangorde:
// capaciteit → devices → snellaad → display.
const BENEFITS = [
  { icon: BatteryCharging, key: 'capacity' },
  { icon: Plug, key: 'devices' },
  { icon: Gauge, key: 'fastcharge' },
  { icon: Zap, key: 'display' },
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * HeroVariantB — V5 hero met full-bleed embers-fotoachtergrond.
 *
 * Achtergrond = `hero-embers.jpg`: de echte Titan X op een podium met oranje
 * embers (E04), uitgebreid naar 16:9 (origineel product + podium ongewijzigd,
 * randen generatief geoutpaint). Tekst + CTA's liggen links over de donkere
 * negatieve ruimte; het product staat rechts in het beeld.
 *
 * Performance: één statisch beeld als LCP-element (`priority`) — géén WebGL,
 * géén RAF-animaties meer in de hero. Donkere scrims voor leesbaarheid + een
 * onderfade die naadloos overgaat in de volgende sectie (#0A0A0A).
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

  // Content-regel: nooit een specifiek wattage tonen — alleen "fast charge".
  const benefitLabel = (key: string) => {
    switch (key) {
      case 'capacity':
        return `${capacityFormatted} mAh`;
      case 'devices':
        return t('spec_icons.devices', { n: SPECS.simultaneousDevices.value });
      case 'fastcharge':
        return t('spec_icons.label_fastcharge');
      default:
        return t('spec_icons.display');
    }
  };

  return (
    <section className="relative flex items-center overflow-hidden bg-[#0A0A0A] text-white min-h-[100svh] lg:min-h-[94vh]">
      {/* BG — embers-fotoachtergrond (LCP-element) */}
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

      {/* Scrim — links donker voor leesbaarheid, rechts transparant (product zichtbaar) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            'linear-gradient(to right, #0A0A0A 0%, rgba(10,10,10,0.82) 28%, rgba(10,10,10,0.45) 52%, rgba(10,10,10,0) 72%)',
        }}
      />
      {/* Scrim — verticale diepte + naadloze onderovergang naar de volgende sectie */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            'linear-gradient(to bottom, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0) 30%, rgba(10,10,10,0) 72%, #0A0A0A 100%)',
        }}
      />
      {/* Mobiel — extra globale demping zodat tekst leesbaar blijft over het beeld */}
      <div className="absolute inset-0 bg-[#0A0A0A]/35 lg:bg-transparent pointer-events-none" style={{ zIndex: 1 }} />

      {/* Bewegende energie-effecten — allemaal LINKS begrensd zodat ze niet over
          de powerbank (rechts) lopen. CSS-only, mobiel + desktop. */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 5 }}>
        {/* pulserende warme gloed achter de kop — alleen desktop (mobiel scheelt
            een geanimeerde 120px-blur op de compositor; de foto draagt daar al warmte) */}
        <div
          className="hero-glow-pulse hidden lg:block absolute top-1/2 left-[12%] -translate-y-1/2 w-[480px] h-[480px] rounded-full blur-[120px]"
          style={{ background: 'rgba(255,140,0,0.22)' }}
        />
        {/* diagonale licht-sweep (links begrensd) */}
        <div className="absolute inset-y-0 left-0 w-[58%] overflow-hidden">
          <div
            className="hero-sweep absolute top-[-20%] left-0 h-[140%] w-[140px] blur-2xl"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,150,60,0.28), transparent)' }}
          />
        </div>
        {/* zwevende vonkjes */}
        <EmberDrift />
      </div>

      {/* CONTENT — links */}
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-28" style={{ zIndex: 10 }}>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col items-start text-left max-w-xl lg:max-w-[560px]"
        >
          {/* Statusregel — batch-info als stil mono-label (geen badge-lawaai) */}
          <span className="inline-flex items-center gap-2.5 mb-7">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#FF8C00]" aria-hidden />
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/60">
              {t('stock_badge', { count: batchSize })}
            </span>
          </span>

          {/* Kicker — productnaam */}
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-white/45 mb-4">
            {BRAND.wordmark} · {BRAND.product}
          </span>

          {/* Headline — 2 regels, accent op regel 2 */}
          <h1
            className="font-display font-extrabold uppercase leading-[0.92] tracking-[-0.035em] text-white mb-6"
            style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)', textShadow: '0 2px 30px rgba(0,0,0,0.45)' }}
          >
            {t('motto_lead')}
            <br />
            <span className="text-gradient-orange text-glow-orange">{t('motto_accent')}</span>
          </h1>

          {/* Subcopy */}
          <p className="font-body text-[#C8C8C8] text-base lg:text-lg leading-relaxed max-w-md mb-8">
            {capacityFormatted} mAh.{' '}
            {t('spec_icons.devices', { n: SPECS.simultaneousDevices.value })} tegelijk.{' '}
            {t('tagline_accent')}
          </p>

          {/* CTA-rij */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <button
              onClick={onBuy}
              className="btn-orange group"
              style={{ padding: '0.95rem 1.8rem', fontSize: '0.95rem' }}
              aria-label={`${isWaitlist ? t('cta_waitlist') : t('cta_buy_now')} ${priceLabel() ?? ''}`}
            >
              <Zap className="w-[16px] h-[16px] fill-white" aria-hidden />
              <span>{isWaitlist ? t('cta_waitlist') : t('cta_buy_now')}</span>
              {priceLabel() && <span className="opacity-90">· {priceLabel()}</span>}
              <ArrowRight className="w-[15px] h-[15px] transition-transform group-hover:translate-x-0.5" aria-hidden />
            </button>
            <Link
              href="/shop"
              locale={locale}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/25 px-6 py-3 font-display text-sm font-extrabold uppercase tracking-[0.08em] text-white transition-colors hover:border-white/60 hover:bg-white/5 backdrop-blur-sm"
            >
              {t('cta_view_specs')}
            </Link>
          </div>

          {/* Benefit-badges — pill-rij */}
          <div className="flex flex-wrap gap-2 mb-6">
            {BENEFITS.map(({ icon: Icon, key }) => (
              <span
                key={key}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  backdropFilter: 'blur(6px)',
                }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: '#FF8C00' }} strokeWidth={2} aria-hidden />
                <span className="font-display text-[0.8rem] font-bold text-white tracking-tight">
                  {benefitLabel(key)}
                </span>
              </span>
            ))}
          </div>

          {/* Trust mini */}
          <p className="font-body text-[#B0B0B0] text-[12px] lg:text-[13px]">
            {t('trust_inline', { days: safe(TBD.returnPolicyDays) ?? 14 })}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
