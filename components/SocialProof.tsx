'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: '4.9',     numericTarget: 4.9,   isFloat: true,  suffix: '',  unit: '★',  label: '2.400+ Reviews' },
  { value: '10.000+', numericTarget: 10000, isFloat: false, suffix: '+', unit: '',   label: 'Tevreden klanten' },
  { value: 'Gratis',  numericTarget: null,  isFloat: false, suffix: '',  unit: '',   label: 'Verzending NL/BE' },
  { value: '30',      numericTarget: 30,    isFloat: false, suffix: '',  unit: 'd',  label: 'Retourgarantie' },
  { value: '2',       numericTarget: 2,     isFloat: false, suffix: '',  unit: 'jr', label: 'Fabrieksgarantie' },
];

type Stat = typeof stats[0];

function StatValue({ stat, inView }: { stat: Stat; inView: boolean }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!inView || stat.numericTarget === null) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1);
      return;
    }
    let rafId: number;
    const duration = 1400;
    const startTime = performance.now();

    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      setProgress(1 - Math.pow(1 - p, 3));
      if (p < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, stat.numericTarget]);

  if (stat.numericTarget === null) return <>{stat.value}</>;

  const current = stat.numericTarget * progress;
  const formatted = stat.isFloat
    ? current.toFixed(1).replace('.', ',')
    : stat.numericTarget >= 1000
      ? Math.floor(current).toLocaleString('nl-NL')
      : Math.floor(current).toString();

  return <>{formatted}{progress >= 1 ? stat.suffix : ''}</>;
}

export default function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="relative border-y border-white/[0.04] overflow-hidden" style={{ background: 'rgba(255,255,255,0.012)' }}>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FF8C00]/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-9">
        <div className="grid grid-cols-3 sm:grid-cols-5">
          {stats.map((s, i) => {
            let borderClass = '';
            if (i === 1 || i === 2 || i === 4) borderClass = 'border-l border-white/[0.05]';
            if (i === 3) borderClass = 'border-t border-white/[0.05] sm:border-t-0 sm:border-l sm:border-white/[0.05]';
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className={`flex flex-col items-center justify-center py-3 px-2 sm:px-4 text-center ${borderClass}`}
              >
                <div className="flex items-baseline gap-0.5 mb-1">
                  <span className="font-display text-xl sm:text-2xl text-white leading-none">
                    <StatValue stat={s} inView={inView} />
                  </span>
                  {s.unit && <span className="font-display text-base sm:text-lg leading-none" style={{ color: '#FF8C00' }}>{s.unit}</span>}
                </div>
                <span className="section-label text-[0.55rem] sm:text-[0.65rem]">{s.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FF8C00]/60 to-transparent" />
    </div>
  );
}
