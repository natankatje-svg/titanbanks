'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';

export default function FlashlightSection() {
  const ref = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ minHeight: '90vh', background: '#050505' }}>
      {/* Full-bleed product image with parallax */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 scale-110"
      >
        <Image
          src="/images/product-dark.jpg"
          alt="Titan X LED Flashlight"
          fill
          className="object-cover object-center"
          style={{ opacity: 0.55 }}
          priority={false}
        />
      </motion.div>

      {/* Dark gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/60" />

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-[90vh]">
        <div className="max-w-7xl mx-auto px-6 py-32">
          <div ref={textRef} className="max-w-2xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 border"
                style={{ background: 'rgba(255,140,0,0.1)', borderColor: 'rgba(255,140,0,0.3)' }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF8C00] animate-pulse" />
                <span className="text-[#FF8C00] text-xs font-bold tracking-[0.15em] uppercase">
                  LED Flashlight
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-black leading-[0.88] tracking-tight mb-8"
              style={{ fontSize: 'clamp(3.5rem, 8vw, 6.5rem)' }}
            >
              <span className="block text-white">ALS HET</span>
              <span className="block text-white">DONKER</span>
              <span
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #FF8C00 0%, #FFD700 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                WORDT.
              </span>
            </motion.h2>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-gray-400 text-xl leading-relaxed mb-10 max-w-lg"
            >
              De ingebouwde ultra-bright LED flashlight is geen bijzaak — het is een volwaardige zaklamp.
              Camping, pech onderweg, noodsituaties. De Titan X verlicht altijd je weg.
            </motion.p>

            {/* Feature bullets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {[
                { label: 'Ultra-bright beam', icon: '☀️' },
                { label: 'SOS-modus ingebouwd', icon: '🆘' },
                { label: 'Één druk op de knop', icon: '⚡' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2.5 rounded-full px-5 py-2.5 border"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    borderColor: 'rgba(255,255,255,0.1)',
                  }}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-white/80 text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
