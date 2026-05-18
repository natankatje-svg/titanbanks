'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

export default function HeroTeaser() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY    = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentFade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const imageScale  = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] w-full flex items-end justify-center overflow-hidden bg-black text-white"
    >
      {/* Full-bleed product image as section background */}
      <motion.div
        style={{ scale: imageScale }}
        className="absolute inset-0"
      >
        <Image
          src="/images/titanx/clean/hero-warm-rim.png"
          alt="Titan X 50.000 mAh powerbank by TITANBANKS"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
      </motion.div>

      {/* Vignette + bottom fade to pure black so next section bleeds in */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 45%, transparent 0%, rgba(0,0,0,0.35) 55%, #000 95%)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[40vh] pointer-events-none"
        style={{ background: 'linear-gradient(to top, #000 0%, rgba(0,0,0,0.85) 35%, transparent 100%)' }}
      />
      <div
        className="absolute inset-x-0 top-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)' }}
      />

      {/* Content — bottom-anchored over the image */}
      <motion.div
        style={{ y: contentY, opacity: contentFade }}
        className="relative z-10 w-full max-w-3xl mx-auto px-6 pb-24 lg:pb-32 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-3 mb-8 justify-center"
        >
          <div className="h-px w-7" style={{ background: 'linear-gradient(to right, transparent, #FF8C00)' }} />
          <span className="section-label tracking-[0.22em]">TITANBANKS · Titan X</span>
          <div className="h-px w-7" style={{ background: 'linear-gradient(to left, transparent, #FF8C00)' }} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.78, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="font-display uppercase leading-[0.82] tracking-[-0.025em] mb-3"
          style={{
            fontSize: 'clamp(4rem, 11vw, 9.5rem)',
            textShadow: '0 4px 40px rgba(0,0,0,0.65)',
          }}
        >
          <span className="block text-white">OUTLAST</span>
          <span className="block text-white">THE</span>
          <span className="block text-gradient-orange">DAY.</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
          className="h-[2px] w-24 mb-7 mx-auto origin-center"
          style={{ background: 'linear-gradient(to right, transparent, #FF8C00, transparent)' }}
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-body text-gray-200 text-base lg:text-lg leading-relaxed mb-10 max-w-md mx-auto"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7)' }}
        >
          50.000 mAh in your bag. Six devices at once. Days, not hours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.44 }}
          className="flex flex-col sm:flex-row items-center gap-4 justify-center"
        >
          <a href="#waitlist" className="btn-orange" style={{ padding: '0.95rem 2.2rem' }}>
            Join the waitlist
          </a>
          <a href="#capacity" className="btn-ghost" style={{ padding: '0.95rem 2.2rem' }}>
            See the spec
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ opacity: { delay: 1.1, duration: 0.5 }, y: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-gray-500 pointer-events-none"
      >
        <span className="font-mono-titan text-[10px] uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}
