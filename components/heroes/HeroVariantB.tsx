'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, Check, ChevronDown } from 'lucide-react';
import { useEcwid } from '../EcwidProvider';
import {
  BRAND,
  SPECS,
  TBD,
  LAUNCH_STATE,
  safe,
  priceLabel,
  anchorPriceLabel,
  capacityLabel,
} from '@/lib/product-claims';

const baseTrust = ['Veilig betalen', `${SPECS.warrantyYears.value} jaar garantie`];
const optionalTrust: string[] = [];
const returnDays = safe(TBD.returnPolicyDays);
if (returnDays && returnDays > 0) optionalTrust.push(`${returnDays} dagen retour`);
const shippingCountries = safe(TBD.freeShippingCountries);
if (shippingCountries && shippingCountries.length > 0) {
  optionalTrust.push(`Gratis verzending ${shippingCountries.join(' / ')}`);
}
const trust = [...optionalTrust, ...baseTrust];

const specs = [
  { value: SPECS.capacityMah.value.toLocaleString('nl-NL'), unit: ' mAh', label: 'Capaciteit' },
  { value: SPECS.simultaneousDevices.value.toString(), unit: '×', label: 'Devices' },
  { value: 'LED', unit: '', label: 'Display' },
];

export default function HeroVariantB() {
  const { addToCart } = useEcwid();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY    = useTransform(scrollYProgress, [0, 1], [0, 55]);
  const contentFade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] text-white"
    >
      {/* Layer 0 — Particle Drift ambient background video. Mobile uses
          object-cover center-crop of the same 16:9 source. */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/hero/titan-x-particle-drift-poster.jpg"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center motion-reduce:hidden pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <source src="/hero/titan-x-particle-drift-16x9.mp4" type="video/mp4" />
      </video>

      {/* Layer 1 — base dark overlay */}
      <div className="absolute inset-0 bg-black/40" style={{ zIndex: 1 }} />

      {/* Layer 2 — radial vignette: open center, dark edges */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 2,
          background:
            'radial-gradient(ellipse 75% 70% at 50% 52%, rgba(5,5,5,0.05) 0%, rgba(5,5,5,0.55) 55%, rgba(5,5,5,0.95) 100%)',
        }}
      />

      {/* Layer 2 — top/bottom hard fades */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]/95"
        style={{ zIndex: 2 }}
      />

      {/* Layer 2 — grid */}
      <div
        className="absolute inset-0 grid-pattern opacity-[0.12] pointer-events-none"
        style={{ zIndex: 2 }}
      />

      {/* Layer 2 — ambient orange glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none"
        style={{ zIndex: 2, background: 'rgba(255,107,0,0.04)' }}
      />

      {/* Layer 10 — main content */}
      <motion.div
        style={{ y: contentY, opacity: contentFade, zIndex: 10 }}
        className="relative flex flex-col items-center text-center w-full max-w-3xl mx-auto px-6 pt-24 pb-14"
      >
        {/* Status badge — Volume mark + availability. Confident editorial
            two-segment pill: archival white "VOL. 01 / ∞" left of a thin
            orange hairline, orange "NU BESCHIKBAAR" right. The mark signals
            "first of a line" without needing an announcement bar. */}
        {(LAUNCH_STATE.waitlistMode || priceLabel()) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="flex items-center rounded-full px-4 py-1.5 mb-5"
            style={{
              background: 'rgba(255,107,0,0.06)',
              border: '1px solid rgba(255,107,0,0.22)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-white/85">
              Vol.&nbsp;01&nbsp;/&nbsp;∞
            </span>
            <span
              aria-hidden="true"
              className="mx-3 inline-block h-3 w-px"
              style={{ background: 'rgba(255,107,0,0.55)' }}
            />
            <span
              className="font-mono text-[0.7rem] uppercase tracking-[0.22em]"
              style={{ color: '#FF6B00' }}
            >
              {LAUNCH_STATE.waitlistMode ? 'Pre-launch · eerste batch' : 'Nu beschikbaar'}
            </span>
          </motion.div>
        )}

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="h-px w-7" style={{ background: 'linear-gradient(to right, transparent, #FF6B00)' }} />
          <span className="section-label tracking-[0.22em]">{BRAND.product} · {capacityLabel()} power bank</span>
          <div className="h-px w-7" style={{ background: 'linear-gradient(to left, transparent, #FF6B00)' }} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.78, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="font-display uppercase leading-[0.88] tracking-[-0.01em] mb-3"
          style={{ fontSize: 'clamp(3.2rem, 10vw, 7rem)' }}
        >
          <span className="block text-white">NOOIT MEER</span>
          <span className="block text-gradient-orange">ZONDER STROOM</span>
        </motion.h1>

        {/* Accent rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
          className="h-px w-16 mb-7 origin-center"
          style={{ background: 'linear-gradient(to right, transparent, #FF6B00, transparent)' }}
        />

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-body text-gray-300 text-base leading-relaxed mb-8 max-w-md"
        >
          {capacityLabel()} in matte black. LED-display met exact percentage, ingebouwde
          zaklamp en tot {SPECS.simultaneousDevices.value} devices tegelijk. Gebouwd voor wie niet kan stoppen.
        </motion.p>

        {/* Hero foreground bewust leeg gelaten — de Particle Drift video
            mag het canvas dragen. Productshots staan in de gallery-sectie
            direct hieronder. */}

        {/* Price + CTA — prijs alleen renderen wanneer CONFIRMED */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.44 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-5 w-full justify-center"
        >
          {priceLabel() && (
            <div className="flex flex-col items-center sm:items-start gap-1">
              <div className="flex items-end gap-2.5">
                <span
                  className="font-display leading-none text-white"
                  style={{ fontSize: 'clamp(2.4rem, 7vw, 3rem)' }}
                >
                  {priceLabel()}
                </span>
                {anchorPriceLabel() && (
                  <div className="flex flex-col items-start gap-1 mb-[3px]">
                    <span className="font-body text-gray-500 text-sm line-through leading-none">
                      {anchorPriceLabel()}
                    </span>
                  </div>
                )}
              </div>
              <span className="font-body text-gray-600 text-[10px]">incl. BTW</span>
            </div>
          )}
          {LAUNCH_STATE.waitlistMode ? (
            <a href="#waitlist" className="btn-orange w-full sm:w-auto">
              <Zap className="w-[18px] h-[18px] fill-white flex-shrink-0" />
              Join waitlist
            </a>
          ) : (
            <button onClick={addToCart} className="btn-orange w-full sm:w-auto">
              <Zap className="w-[18px] h-[18px] fill-white flex-shrink-0" />
              Bestel {BRAND.product}
            </button>
          )}
        </motion.div>

        {/* Secondary CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-5"
        >
          <a
            href="#functies"
            className="btn-ghost inline-flex items-center gap-2"
            style={{ padding: '0.6rem 1.6rem', fontSize: '0.82rem' }}
          >
            Ontdek alle features
            <ChevronDown className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.54 }}
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 mb-9"
        >
          {trust.map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <Check className="w-3 h-3 flex-shrink-0" style={{ color: '#0EB5C8' }} />
              <span className="font-body text-gray-400 text-[12px] leading-none">{t}</span>
            </span>
          ))}
        </motion.div>

        {/* Specs bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.62 }}
          className="flex w-full max-w-sm sm:max-w-md overflow-hidden"
          style={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          {specs.map((s, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col items-center py-[14px] gap-1"
              style={{
                background: 'rgba(255,255,255,0.025)',
                backdropFilter: 'blur(8px)',
                borderRight: i < specs.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}
            >
              <div className="font-display text-[1.15rem] leading-none text-white">
                {s.value}<span style={{ color: '#FF6B00' }}>{s.unit}</span>
              </div>
              <div className="font-mono-titan text-gray-500 text-[11px] uppercase tracking-[0.16em]">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 6, 0], opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
      >
        <span className="section-label tracking-[0.28em]">Ontdek</span>
        <div className="w-px h-6 relative overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-x-0 top-0 h-full"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,107,0,0.6), transparent)' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
