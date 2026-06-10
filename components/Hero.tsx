'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Zap, ArrowDown, BatteryCharging, Sun } from 'lucide-react';
import { useEcwid } from './EcwidProvider';
import {
  BRAND,
  SPECS,
  LAUNCH_STATE,
  priceLabel,
  anchorPriceLabel,
  capacityLabel,
} from '@/lib/product-claims';

// Badges: alleen CONFIRMED specs. Geen "Smart Display" / "Outdoor Strap"
// als marketing-USP — die zijn descriptief, niet onderscheidend.
const badges = [
  { label: capacityLabel(), color: '#FF8C00' },
  { label: `${SPECS.simultaneousDevices.value} devices tegelijk`, color: '#0EB5C8' },
  { label: 'LED-display', color: '#EAB308' },
  { label: 'Ingebouwde zaklamp', color: '#FF8C00' },
];

export default function Hero() {
  const { addToCart } = useEcwid();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#050505] clip-diag-down"
      style={{ paddingBottom: 'calc(5vw + 2rem)' }}
    >
      {/* Grid + radial atmosphere */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 70% 60%, rgba(255,140,0,0.06) 0%, transparent 70%)' }}
      />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 40% 40% at 10% 80%, rgba(14,181,200,0.04) 0%, transparent 60%)' }}
      />
      {/* Decorative section number */}
      <div className="section-number absolute -top-4 -left-4 select-none pointer-events-none">01</div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-8 grid lg:grid-cols-[42%_58%] gap-0 items-center"
      >
        {/* ── LEFT: Copy ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
          className="relative z-10 text-center lg:text-left pr-0 lg:pr-8"
        >
          {/* Section label */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            className="section-label mb-6 flex items-center gap-3 justify-center lg:justify-start"
          >
            <div className="w-6 h-px bg-[#FF8C00]" />
            <span>01 — Titan X Powerbank</span>
          </motion.div>

          {/* Massive condensed headline */}
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}
            className="font-display leading-[0.85] tracking-[-0.02em] mb-8 uppercase"
            style={{ fontSize: 'clamp(4.5rem, 10vw, 9rem)' }}
          >
            <span className="block text-white">NOOIT</span>
            <span className="block text-white">MEER</span>
            <span className="block text-white">ZONDER</span>
            <span className="block text-gradient-orange">STROOM</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            className="font-body text-gray-400 text-base lg:text-lg leading-relaxed mb-10 max-w-md mx-auto lg:mx-0"
          >
            <span className="text-white font-semibold">{capacityLabel()}</span> in matte black.
            Tot {SPECS.simultaneousDevices.value} devices tegelijk. LED-display met exact percentage.
            Gebouwd voor wie niet kan stoppen.
          </motion.p>

          {/* Price block — alleen renderen als prijs CONFIRMED */}
          {priceLabel() && (
            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } } }}
              className="flex items-center gap-3 mb-6 justify-center lg:justify-start"
            >
              <span className="font-display text-3xl text-white leading-none">{priceLabel()}</span>
              {anchorPriceLabel() && (
                <span className="font-body text-gray-600 text-base line-through leading-none">
                  {anchorPriceLabel()}
                </span>
              )}
            </motion.div>
          )}

          {/* CTAs */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            className="flex flex-col sm:flex-row gap-4 mb-10 justify-center lg:justify-start"
          >
            {LAUNCH_STATE.waitlistMode ? (
              <a href="#waitlist" className="btn-orange">
                <Zap className="w-5 h-5 fill-white" />
                Join waitlist
              </a>
            ) : (
              <button onClick={() => addToCart()} className="btn-orange">
                <Zap className="w-5 h-5 fill-white" />
                Bestel {BRAND.product}
              </button>
            )}
            <a href="#functies" className="btn-ghost">
              Bekijk specs
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5, delay: 0.3 } } }}
            className="flex flex-wrap gap-2 justify-center lg:justify-start"
          >
            {badges.map((b) => (
              <span
                key={b.label}
                className="font-body text-xs font-medium px-3 py-1.5 rounded-full border"
                style={{ color: b.color, borderColor: `${b.color}30`, background: `${b.color}0a` }}
              >
                {b.label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Product image ── */}
        <div className="relative flex items-center justify-center lg:justify-end mt-16 lg:mt-0">
          {/* Glow aura */}
          <motion.div
            animate={{ opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-[420px] h-[420px] rounded-full blur-[80px] pointer-events-none"
            style={{ background: 'rgba(255,140,0,0.12)' }}
          />
          <div className="absolute w-[260px] h-[260px] rounded-full blur-[60px] pointer-events-none translate-x-16 -translate-y-20"
            style={{ background: 'rgba(14,181,200,0.07)' }}
          />

          {/* Product */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.88, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-[500px]"
          >
            {/* Versterkt oranje spotlight achter product */}
            <div
              className="absolute inset-[5%] rounded-full blur-3xl pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 58%, rgba(255,140,0,0.14) 0%, rgba(255,140,0,0.06) 50%, transparent 75%)',
              }}
            />

            {/* Mask-container: faded witte achtergrond → transparant aan de randen */}
            <div
              className="relative z-10"
              style={{
                WebkitMaskImage:
                  'radial-gradient(ellipse 90% 88% at 50% 48%, black 38%, rgba(0,0,0,0.85) 56%, rgba(0,0,0,0.3) 70%, transparent 84%)',
                maskImage:
                  'radial-gradient(ellipse 90% 88% at 50% 48%, black 38%, rgba(0,0,0,0.85) 56%, rgba(0,0,0,0.3) 70%, transparent 84%)',
              }}
            >
              <Image
                src="/images/product-hero.jpg"
                alt="TitanBanks Titan X – 50.000mAh Powerbank"
                width={1000}
                height={1180}
                className="w-full h-auto object-contain"
                priority
              />
            </div>

            {/* Stage floor glow — warme grondreflectie onder powerbank */}
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 h-10 blur-2xl pointer-events-none"
              style={{ width: '55%', background: 'rgba(255,140,0,0.22)' }}
            />
          </motion.div>

          {/* Floating badges */}
          <motion.div
            animate={{ y: [-7, 7, -7] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-0 lg:-left-8 top-12 glass-card rounded-2xl px-4 py-3 z-20"
            style={{ border: '1px solid rgba(14,181,200,0.22)' }}
          >
            <div className="flex items-center gap-2 mb-0.5">
              <Zap className="w-3 h-3 flex-shrink-0" style={{ color: '#0EB5C8' }} />
              <div className="font-display text-sm uppercase tracking-wide" style={{ color: '#0EB5C8' }}>Fast Charge</div>
            </div>
            <div className="font-mono-titan text-gray-500 text-xs pl-5">Ingebouwde kabel</div>
          </motion.div>

          <motion.div
            animate={{ y: [7, -7, 7] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
            className="absolute right-0 lg:-right-4 top-1/3 glass-card rounded-2xl px-4 py-3 z-20"
            style={{ border: '1px solid rgba(255,140,0,0.22)' }}
          >
            <div className="flex items-center gap-2 mb-0.5">
              <Sun className="w-3 h-3 flex-shrink-0" style={{ color: '#FF8C00' }} />
              <div className="font-display text-sm uppercase tracking-wide" style={{ color: '#FF8C00' }}>LED Flashlight</div>
            </div>
            <div className="font-mono-titan text-gray-500 text-xs pl-5">Ultra-bright beam</div>
          </motion.div>

          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
            className="absolute left-4 lg:-left-4 bottom-16 glass-card rounded-2xl px-4 py-3 z-20"
            style={{ border: '1px solid rgba(234,179,8,0.22)' }}
          >
            <div className="flex items-center gap-2 mb-0.5">
              <BatteryCharging className="w-3 h-3 flex-shrink-0" style={{ color: '#EAB308' }} />
              <div className="font-display text-sm uppercase tracking-wide" style={{ color: '#EAB308' }}>{capacityLabel()}</div>
            </div>
            <div className="font-mono-titan text-gray-500 text-xs pl-5">{SPECS.simultaneousDevices.value} devices tegelijk</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 9, 0], opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[6vw] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="section-label">Scroll</span>
        <ArrowDown className="w-4 h-4 text-gray-600" />
      </motion.div>
    </section>
  );
}
