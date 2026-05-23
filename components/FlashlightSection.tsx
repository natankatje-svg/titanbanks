'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import { Sun, Zap, Layers } from 'lucide-react';

export default function FlashlightSection() {
  const ref = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const inView = useInView(textRef, { once: true, amount: 0.25 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);

  return (
    <section ref={ref} className="relative overflow-hidden clip-diag-both" style={{ minHeight: '95vh', background: '#020202' }}>
      {/* Full-bleed product image */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 scale-[1.18]">
        <Image src="/images/product-dark.jpg" alt="Titan X powerbank in het donker met geactiveerde ultra-bright LED flashlight" fill sizes="100vw" priority className="object-cover object-center" style={{ opacity: 0.5 }} />
      </motion.div>

      {/* Layered overlays */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(100deg, #020202 35%, rgba(2,2,2,0.6) 60%, transparent 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #020202 0%, transparent 40%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #020202 0%, transparent 25%)' }} />


      {/* Content */}
      <motion.div style={{ y: textY }} className="relative z-10 flex items-center min-h-[95vh]">
        <div ref={textRef} className="max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="max-w-3xl">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="section-label mb-6 flex items-center gap-3"
            >
              <div className="w-6 h-px bg-[#FF6B00]" />
              <span>03 — LED Flashlight</span>
              <div className="w-2 h-2 rounded-full bg-[#FF6B00]" />
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display uppercase leading-[0.82] tracking-[-0.02em] text-white mb-8"
              style={{ fontSize: 'clamp(4rem, 10vw, 9rem)' }}
            >
              ALS HET<br />DONKER<br /><span className="text-gradient-orange">WORDT.</span>
            </motion.h2>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="font-body text-gray-400 text-xl leading-relaxed mb-10 max-w-xl"
            >
              De ingebouwde zaklamp is geen bijzaak. Een volwaardige LED-lamp,
              ingebouwd in de power bank. Camping, pech, onverwacht donker — een druk op de knop.
            </motion.p>

            {/* Feature pills — geen SOS-claim tot bevestigd */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-3"
            >
              {[
                { Icon: Sun, label: 'LED-beam', color: '#EAB308' },
                { Icon: Zap, label: 'Eén druk op knop', color: '#FF6B00' },
                { Icon: Layers, label: 'Werkt onafhankelijk', color: '#0EB5C8' },
              ].map((item) => (
                <div key={item.label}
                  className="flex items-center gap-2.5 rounded-full px-5 py-2.5"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <item.Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: item.color }} />
                  <span className="font-body text-white/75 text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
