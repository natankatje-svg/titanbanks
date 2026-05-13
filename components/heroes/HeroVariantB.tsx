'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Zap, Check, ChevronDown } from 'lucide-react';

const trust = [
  'Gratis verzending',
  '30 dagen retour',
  'Veilig betalen',
  '2 jaar garantie',
];

const specs = [
  { value: '50.000', unit: 'mAh', label: 'Capaciteit'  },
  { value: '22.5',   unit: 'W',   label: 'Fast charge' },
  { value: '5',      unit: '×',   label: 'Poorten'     },
];

export default function HeroVariantB() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY    = useTransform(scrollYProgress, [0, 1], [0, 55]);
  const contentFade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 18, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 18, mass: 0.5 });
  const tiltY = useTransform(springX, [-0.5, 0.5], [-7, 7]);
  const tiltX = useTransform(springY, [-0.5, 0.5], [5, -5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] text-white"
    >
      {/* Layer 0 — video, placed directly in section (no motion wrapper to avoid positioning override) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/product-dark.jpg"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ zIndex: 0 }}
      >
        <source src="/videos/hero-product.mp4" type="video/mp4" />
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
        style={{ zIndex: 2, background: 'rgba(255,140,0,0.04)' }}
      />

      {/* Layer 10 — main content */}
      <motion.div
        style={{ y: contentY, opacity: contentFade, zIndex: 10 }}
        className="relative flex flex-col items-center text-center w-full max-w-3xl mx-auto px-6 pt-24 pb-14"
      >
        {/* Sale badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
          style={{ background: 'rgba(255,140,0,0.1)', border: '1px solid rgba(255,140,0,0.28)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#FF8C00' }} />
          <span className="font-mono-titan text-[0.7rem] uppercase tracking-[0.18em]" style={{ color: '#FF8C00' }}>
            Beperkte aanbieding · −31% korting
          </span>
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="h-px w-7" style={{ background: 'linear-gradient(to right, transparent, #FF8C00)' }} />
          <span className="section-label tracking-[0.22em]">Titan X · 50.000mAh Powerbank</span>
          <div className="h-px w-7" style={{ background: 'linear-gradient(to left, transparent, #FF8C00)' }} />
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
          style={{ background: 'linear-gradient(to right, transparent, #FF8C00, transparent)' }}
        />

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-body text-gray-300 text-base leading-relaxed mb-8 max-w-md"
        >
          50.000mAh premium power met ingebouwde kabels, LED-zaklamp,
          PD 22.5W fast charge en 5 poorten. Eén powerbank voor alles.
        </motion.p>

        {/* Product image — spotlit */}
        <div style={{ perspective: '900px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8 flex items-center justify-center"
          style={prefersReducedMotion ? undefined : { rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' as const }}
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute rounded-full blur-[80px] pointer-events-none"
            style={{
              width: '280px',
              height: '280px',
              background: 'radial-gradient(ellipse, rgba(255,140,0,0.30) 0%, rgba(14,181,200,0.09) 55%, transparent 80%)',
            }}
          />
          <div
            className="absolute rounded-full blur-[50px] opacity-40 pointer-events-none"
            style={{ width: '180px', height: '180px', background: 'rgba(255,140,0,0.14)' }}
          />
          <Image
            src="/images/product-hero.jpg"
            alt="TitanBanks Titan X 50.000mAh powerbank met smart LED display, fast charge en ingebouwde kabels"
            width={900}
            height={1060}
            className="relative z-10 h-auto object-contain"
            style={{
              width: 'clamp(260px, 45vw, 420px)',
              filter: 'drop-shadow(0 28px 56px rgba(0,0,0,0.70)) drop-shadow(0 0 44px rgba(255,140,0,0.28))',
            }}
            priority
          />
        </motion.div>
        </div>

        {/* Price + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.44 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-5 w-full justify-center"
        >
          <div className="flex flex-col items-center sm:items-start gap-1">
            <div className="flex items-end gap-2.5">
              <span
                className="font-display leading-none text-white"
                style={{ fontSize: 'clamp(2.4rem, 7vw, 3rem)' }}
              >
                €89,95
              </span>
              <div className="flex flex-col items-start gap-1 mb-[3px]">
                <span className="font-body text-gray-500 text-sm line-through leading-none">€129,95</span>
                <span
                  className="font-mono-titan text-[10px] rounded-full px-2 py-[2px] leading-none"
                  style={{
                    background: 'rgba(255,140,0,0.11)',
                    border: '1px solid rgba(255,140,0,0.28)',
                    color: '#FF8C00',
                  }}
                >
                  −31% KORTING
                </span>
              </div>
            </div>
            <span className="font-body text-gray-600 text-[10px]">incl. BTW</span>
          </div>
          <a href="#bestel" className="btn-orange w-full sm:w-auto">
            <Zap className="w-[18px] h-[18px] fill-white flex-shrink-0" />
            Bestel Nu
          </a>
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
                {s.value}<span style={{ color: '#FF8C00' }}>{s.unit}</span>
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
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,140,0,0.6), transparent)' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
