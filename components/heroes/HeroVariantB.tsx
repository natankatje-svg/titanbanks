'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Truck, RotateCcw, ChevronDown } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { FloatingPaths } from '@/components/ui/background-paths';
import { MeshGradientBg } from '@/components/ui/mesh-gradient-bg';
import FeatureShowcaseCarousel from '@/components/FeatureShowcaseCarousel';
import {
  BRAND,
  SPECS,
  TBD,
  LAUNCH_STATE,
  priceLabel,
  anchorPriceLabel,
  portsLabel,
  safe,
} from '@/lib/product-claims';

// USP keys → i18n labels. Volgorde = render-volgorde. Alle waardes via SSOT,
// nooit hardcoded. Garantie-claim weg per request, fast-charge erbij.
const USP_KEYS = ['capacity', 'devices', 'fastcharge', 'display', 'flashlight'] as const;
type UspKey = (typeof USP_KEYS)[number];

// Spec-rows in de dropdown. Numerieke waardes via SSOT, taal-afhankelijke
// labels via t() — anders renderen NL-strings ('Ja', 'matte black') ook op
// EN/DE pagina's. Wordt aangeroepen vanuit de component zodat `t` in scope is.
function buildSpecRows(
  locale: string,
  t: (key: string) => string,
) {
  const wattage = safe(TBD.fastChargeWattage);
  const weight = safe(TBD.weightGrams);
  const dims = safe(TBD.dimensionsMm);
  const certs = safe(TBD.certifications) ?? [];
  // Wh-waarde bewust niet getoond (50000 × 3.7V = 185 Wh > 100 Wh ICAO-limiet);
  // marketplace policy-scanners hoeven dat niet aan capaciteits-string te kunnen aflezen.
  return [
    { key: 'capacity', value: `${SPECS.capacityMah.value.toLocaleString(locale)} mAh` },
    { key: 'ports', value: portsLabel() },
    { key: 'fastcharge', value: wattage ? `${wattage}W max` : null },
    { key: 'display', value: SPECS.hasLedDisplay.value ? t('spec_values.led_percent') : null },
    { key: 'flashlight', value: SPECS.hasFlashlight.value ? t('spec_values.yes') : null },
    { key: 'cables', value: safe(TBD.hasRetractableCables) ? t('spec_values.retractable') : null },
    { key: 'finish', value: t('spec_values.finish_matte_black') },
    { key: 'weight', value: weight ? `${weight} g` : null },
    { key: 'dimensions', value: dims },
    { key: 'certifications', value: certs.length > 0 ? certs.join(' · ') : null },
  ].filter((r) => r.value !== null) as { key: string; value: string }[];
}

export default function HeroVariantB() {
  const locale = useLocale();
  const t = useTranslations('hero');
  const [specsOpen, setSpecsOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const contentFade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const ctaHref = LAUNCH_STATE.waitlistMode ? '#waitlist' : '/shop';
  const ctaLabel = LAUNCH_STATE.waitlistMode ? t('cta_waitlist') : t('cta_claim');
  const specRows = buildSpecRows(locale, t);
  // Locale-aware number formatting — EN krijgt "50,000 mAh", NL/DE krijgen "50.000 mAh"
  const capacityValue = `${SPECS.capacityMah.value.toLocaleString(locale)} mAh`;
  const fastChargeValue = `${safe(TBD.fastChargeWattage) ?? 22.5}W`;

  return (
    <section
      ref={ref}
      className="relative flex flex-col overflow-hidden bg-[#050505] text-white min-h-[92vh]"
    >
      {/* Layer 0 — MeshGradient WebGL background: brand-oranje × teal × zwart. */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <MeshGradientBg />
      </div>

      {/* Layer 2 — radial vignette: opent het centrum, drukt randen dicht. */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 2,
          background:
            'radial-gradient(ellipse 80% 70% at 35% 55%, rgba(5,5,5,0.0) 0%, rgba(5,5,5,0.42) 60%, rgba(5,5,5,0.95) 100%)',
        }}
      />

      {/* Layer 2 — top/bottom hard fades */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]/95 pointer-events-none"
        style={{ zIndex: 2 }}
      />

      {/* Layer 2 — grid pattern */}
      <div
        className="absolute inset-0 grid-pattern opacity-[0.09] pointer-events-none"
        style={{ zIndex: 2 }}
      />

      {/* Layer 2 — AMBIENT GLOW STACK: drie gestapelde halo's rondom het
          productgebied. Vergroot en geïntensifieerd zodat de cutout natuurlijk
          in de mesh "ademt" i.p.v. erop gepleisterd lijkt.
          - Halo A (1500px): brede zachte aura voor "atmospheric bloom"
          - Halo B (900px): mid-range warmte direct rondom product
          - Halo C (420px): hot-spot pal achter het product voor rim-light */}
      <div
        className="absolute top-[44%] left-[27%] -translate-x-1/2 -translate-y-1/2 w-[1500px] h-[1500px] rounded-full blur-[240px] pointer-events-none"
        style={{ zIndex: 2, background: 'rgba(255,107,0,0.10)' }}
      />
      <div
        className="absolute top-[46%] left-[26%] -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[180px] pointer-events-none"
        style={{ zIndex: 2, background: 'rgba(255,120,30,0.14)' }}
      />
      <div
        className="absolute top-[48%] left-[24%] -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full blur-[120px] pointer-events-none"
        style={{ zIndex: 2, background: 'rgba(255,140,55,0.22)' }}
      />

      {/* Layer 2 — FloatingPaths: oranje SVG-lijnen ÓNDER het product als
          ambient verticality (boven mesh, onder image). */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {/* Layer 3 — DESKTOP absolute product cutout (slot-02-cutout, transparante
          alpha). De mesh + glow + paths schijnen door de transparante delen
          heen; geen mix-blend-mode nodig. Mobile heeft eigen in-flow Image. */}
      <div
        aria-hidden
        className="hidden lg:block absolute lg:inset-y-0 lg:-left-[6%] lg:right-auto lg:w-[68%] pointer-events-none"
        style={{ zIndex: 3 }}
      >
        <Image
          src="/images/titanx/cutout/slot-02-cutout.png"
          alt=""
          fill
          priority
          sizes="68vw"
          className={[
            'object-contain object-left select-none',
            // subtiele right-edge fade voor zachte overgang naar content-kolom
            '[mask-image:linear-gradient(to_right,black_0%,black_72%,transparent_100%)]',
            '[-webkit-mask-image:linear-gradient(to_right,black_0%,black_72%,transparent_100%)]',
          ].join(' ')}
        />
      </div>

      {/* Layer 10 — content grid. Op mobile één kolom met cutout in flow
          bovenaan; op lg+ split grid. */}
      <motion.div
        style={{ y: contentY, opacity: contentFade, zIndex: 10 }}
        className="relative w-full max-w-7xl mx-auto px-6 lg:px-10 pt-16 lg:pt-24 pb-14 lg:pb-20 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-x-12 items-center"
      >
        <div aria-hidden className="hidden lg:block lg:min-h-[480px]" />

        <div className="flex flex-col items-start text-left max-w-xl lg:max-w-[560px] lg:pl-2">
          {/* MOBILE-only feature-carousel — vervangt de statische cutout.
              4-stap auto-cycling slider met cutouts + i18n copy. Compact
              size zodat CTA-button above-the-fold blijft op iPhone-viewport. */}
          <FeatureShowcaseCarousel
            compact
            idPrefix="hero-mobile"
            className="lg:hidden mb-4 -mt-1"
          />

          {/* Featured-product eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="flex items-center gap-3 mb-3 lg:mb-4"
          >
            <div
              className="h-px w-7"
              style={{ background: 'linear-gradient(to right, transparent, #FF6B00)' }}
            />
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-[#9A9A9A]">
              {t('featured_product')}
            </span>
          </motion.div>

          {/* PRODUCT NAME */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-white uppercase leading-[0.88] tracking-[-0.035em] mb-2 lg:mb-3"
            style={{ fontSize: 'clamp(2.4rem, 7.4vw, 6.5rem)' }}
          >
            {BRAND.product}
          </motion.h1>

          {/* Motto */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="font-display uppercase tracking-[-0.01em] mb-5 lg:mb-9"
            style={{
              fontSize: 'clamp(0.95rem, 2.1vw, 1.7rem)',
              lineHeight: 1,
              fontWeight: 700,
            }}
          >
            <span className="text-white/90">{t('motto_lead')} </span>
            <span className="text-gradient-orange">{t('motto_accent')}</span>
          </motion.p>

          {/* USP bullets — stagger reveal, value + tail */}
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05, delayChildren: 0.28 } },
            }}
            className="flex flex-col gap-1.5 lg:gap-2.5 mb-5 lg:mb-10 w-full"
          >
            {USP_KEYS.map((key: UspKey) => {
              const value =
                key === 'capacity'
                  ? capacityValue
                  : key === 'fastcharge'
                  ? fastChargeValue
                  : t(`usps.${key}.value`);
              const tail = t(`usps.${key}.tail`);
              return (
                <motion.li
                  key={key}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="flex items-baseline gap-2.5 lg:gap-3"
                >
                  <Check
                    className="w-[12px] h-[12px] lg:w-[14px] lg:h-[14px] flex-shrink-0 translate-y-[2px]"
                    style={{ color: '#FF6B00' }}
                    strokeWidth={2.5}
                  />
                  <span className="leading-snug">
                    <span className="font-display text-white text-[0.85rem] lg:text-[1.02rem] tracking-tight">
                      {value}
                    </span>
                    <span className="font-body text-white/55 text-[0.8rem] lg:text-[0.95rem]"> {tail}</span>
                  </span>
                </motion.li>
              );
            })}
          </motion.ul>

          {/* CTA + price */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.55 }}
            className="flex flex-row items-center gap-4 lg:gap-5 mb-4 lg:mb-7"
          >
            <Link
              href={ctaHref}
              locale={locale}
              className="btn-orange group inline-flex items-center justify-center gap-2.5"
              style={{ padding: '1rem 1.9rem', fontSize: '0.82rem' }}
            >
              <span className="font-display tracking-[0.16em] uppercase">{ctaLabel}</span>
              <ArrowRight className="w-[16px] h-[16px] transition-transform group-hover:translate-x-0.5" />
            </Link>

            {priceLabel() && (
              <div className="flex items-baseline gap-2.5">
                <span
                  className="font-display leading-none text-white"
                  style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.4rem)', fontWeight: 700 }}
                >
                  {priceLabel()}
                </span>
                {anchorPriceLabel() && (
                  <span className="font-body text-gray-500 text-sm line-through leading-none">
                    {anchorPriceLabel()}
                  </span>
                )}
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-white/40 ml-1">
                  {t('price_incl_vat')}
                </span>
              </div>
            )}
          </motion.div>

          {/* Trust strip — verzending + retour (garantie weg per request) */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-3"
          >
            <span className="inline-flex items-center gap-1.5 font-body text-[#9A9A9A] text-[12px]">
              <Truck className="w-3.5 h-3.5 text-[#0EB5C8] flex-shrink-0" />
              {t('trust_shipping')}
            </span>
            <span aria-hidden className="hidden sm:inline-block h-3 w-px bg-white/15" />
            <span className="inline-flex items-center gap-1.5 font-body text-[#9A9A9A] text-[12px]">
              <RotateCcw className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              {t('trust_returns', { days: safe(TBD.returnPolicyDays) ?? 14 })}
            </span>
          </motion.div>

          {/* SPECS DROPDOWN — disclosure, opent met height/opacity animatie. */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="w-full mt-2"
          >
            <button
              type="button"
              onClick={() => setSpecsOpen((v) => !v)}
              aria-expanded={specsOpen}
              aria-controls="hero-specs-panel"
              className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/70 hover:text-white transition-colors"
            >
              <span>{specsOpen ? t('specs_close') : t('specs_open')}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${specsOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence initial={false}>
              {specsOpen && (
                <motion.div
                  id="hero-specs-panel"
                  key="specs"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <dl
                    className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 rounded-xl p-4 lg:p-5"
                    style={{
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {specRows.map((row) => (
                      <div key={row.key} className="flex items-baseline justify-between gap-3 border-b border-white/[0.05] pb-2 last:border-0">
                        <dt className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#888]">
                          {t(`specs.${row.key}`)}
                        </dt>
                        <dd className="font-display text-white text-[0.85rem] tracking-tight text-right">
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
