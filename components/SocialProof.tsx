'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { SPECS } from '@/lib/product-claims';

// Pre-launch SocialProof: geen verzonnen aantallen, alleen bevestigde specs.
// Bij launch: hier kunnen echte aggregate review-scores komen (via API).

interface Stat {
  value: string;
  numericTarget: number | null;
  isFloat: boolean;
  suffix: string;
  unit: string;
  label: string;
}

const stats: Stat[] = [
  {
    value: SPECS.capacityMah.value.toLocaleString('nl-NL'),
    numericTarget: SPECS.capacityMah.value,
    isFloat: false,
    suffix: '',
    unit: 'mAh',
    label: 'Capaciteit',
  },
  {
    value: SPECS.simultaneousDevices.value.toString(),
    numericTarget: SPECS.simultaneousDevices.value,
    isFloat: false,
    suffix: '',
    unit: 'devices',
    label: 'Tegelijk laden',
  },
  {
    value: SPECS.simultaneousDevices.value.toString(),
    numericTarget: SPECS.simultaneousDevices.value,
    isFloat: false,
    suffix: '',
    unit: 'devices',
    label: '4× USB-A + USB-C/Lightning kabels',
  },
  {
    value: SPECS.warrantyYears.value.toString(),
    numericTarget: SPECS.warrantyYears.value,
    isFloat: false,
    suffix: '',
    unit: 'jr',
    label: 'Fabrieksgarantie',
  },
];

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

  return (
    <>
      {formatted}
      {progress >= 1 ? stat.suffix : ''}
    </>
  );
}

export default function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div
      ref={ref}
      className="relative border-y border-white/[0.05] overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.012)' }}
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FF8C00]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-9">
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className={`flex flex-col items-center justify-center py-3 px-2 sm:px-4 text-center ${
                i > 0 ? 'sm:border-l sm:border-white/[0.05]' : ''
              } ${i === 2 ? 'border-t sm:border-t-0 border-white/[0.05]' : ''} ${
                i === 3 ? 'border-t sm:border-t-0 border-white/[0.05]' : ''
              }`}
            >
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-display text-2xl sm:text-3xl text-white leading-none">
                  <StatValue stat={s} inView={inView} />
                </span>
                {s.unit && (
                  <span
                    className="font-mono text-[0.6rem] sm:text-[0.7rem] uppercase tracking-widest leading-none ml-1"
                    style={{ color: '#FF8C00' }}
                  >
                    {s.unit}
                  </span>
                )}
              </div>
              <span className="font-mono text-[0.55rem] sm:text-[0.65rem] uppercase tracking-[0.2em] text-[#888888]">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FF8C00]/40 to-transparent" />
    </div>
  );
}
