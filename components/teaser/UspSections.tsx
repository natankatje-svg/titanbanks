'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type Usp = {
  id: string;
  eyebrow: string;
  metric: string;
  metricSub?: string;
  headline: string;
  body: string;
};

const usps: Usp[] = [
  {
    id: 'capacity',
    eyebrow: '01 · Capacity',
    metric: '50.000',
    metricSub: 'mAh',
    headline: 'But that is not the point.',
    body: 'Engineered to outlast your day. And the next.',
  },
  {
    id: 'multi-device',
    eyebrow: '02 · Multi-device',
    metric: '6',
    metricSub: 'devices · at once',
    headline: 'Six devices. One power bank.',
    body: '4 ports. 2 built-in retractable cables. All in parallel.',
  },
  {
    id: 'display-control',
    eyebrow: '03 · Display & control',
    metric: 'LED',
    metricSub: 'always on',
    headline: 'Always know where you stand.',
    body: 'Exact battery percentage on the display. Power button. Built-in flashlight.',
  },
  {
    id: 'build',
    eyebrow: '04 · Build',
    metric: 'Matte',
    metricSub: 'black finish',
    headline: 'Every detail has a reason.',
    body: 'Built to last.',
  },
];

function UspBlock({ usp, index }: { usp: Usp; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const halo = index % 2 === 0 ? 'left' : 'right';

  return (
    <section
      id={usp.id}
      ref={ref}
      className="relative bg-black py-32 lg:py-44 overflow-hidden"
    >
      {/* Ambient halo — alternates side, mimics the contact-sheet orange light bleed */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          [halo]: '-10%',
          width: 'min(720px, 80vw)',
          height: 'min(720px, 80vw)',
          transform: 'translateY(-50%)',
          background:
            'radial-gradient(circle, rgba(255,140,0,0.18) 0%, rgba(255,140,0,0.05) 45%, transparent 75%)',
          filter: 'blur(100px)',
          mixBlendMode: 'screen',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Metric — typographic centerpiece */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative flex flex-col items-start lg:items-center justify-center"
          >
            <div
              aria-hidden
              className="font-display uppercase text-gradient-orange leading-none"
              style={{
                fontSize: 'clamp(5rem, 18vw, 14rem)',
                letterSpacing: '-0.04em',
                textShadow: '0 0 80px rgba(255,140,0,0.18)',
              }}
            >
              {usp.metric}
            </div>
            {usp.metricSub && (
              <div
                className="font-mono-titan text-xs uppercase tracking-[0.3em] mt-3"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                {usp.metricSub}
              </div>
            )}
          </motion.div>

          {/* Copy block */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="section-label mb-4 flex items-center gap-3">
              <div className="w-6 h-px bg-[#FF8C00]" />
              <span>{usp.eyebrow}</span>
            </div>
            <h2
              className="font-display uppercase text-white mb-5"
              style={{
                fontSize: 'clamp(2rem, 4.4vw, 3.4rem)',
                lineHeight: 0.88,
                letterSpacing: '-0.02em',
              }}
            >
              {usp.headline}
            </h2>
            <div
              className="h-[2px] w-16 mb-5 origin-left"
              style={{ background: 'linear-gradient(to right, #FF8C00, transparent)' }}
            />
            <p className="font-body text-gray-400 text-base lg:text-lg leading-relaxed max-w-md">
              {usp.body}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function UspSections() {
  return (
    <>
      {usps.map((usp, i) => (
        <UspBlock key={usp.id} usp={usp} index={i} />
      ))}
    </>
  );
}
