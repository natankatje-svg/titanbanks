'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { SPECS } from '@/lib/product-claims';

interface Counter {
  numericTarget: number | null;
  fallback: string;
  unit: string;
  label: string;
}

const counters: Counter[] = [
  {
    numericTarget: SPECS.capacityMah.value,
    fallback: SPECS.capacityMah.value.toLocaleString('nl-NL'),
    unit: 'mAh',
    label: 'Capaciteit',
  },
  {
    numericTarget: SPECS.simultaneousDevices.value,
    fallback: SPECS.simultaneousDevices.value.toString(),
    unit: 'devices',
    label: 'Tegelijk laden',
  },
  {
    numericTarget: SPECS.portsUsbA.value + SPECS.portsUsbC.value,
    fallback: (SPECS.portsUsbA.value + SPECS.portsUsbC.value).toString(),
    unit: 'output poorten',
    label: 'USB-A en USB-C',
  },
  {
    numericTarget: SPECS.warrantyYears.value,
    fallback: SPECS.warrantyYears.value.toString(),
    unit: 'jaar',
    label: 'Garantie',
  },
];

function CountingValue({ target, inView }: { target: number | null; inView: boolean }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!inView || target === null) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
  }, [inView, target]);

  if (target === null) return null;
  const current = target * progress;
  return <>{target >= 1000 ? Math.floor(current).toLocaleString('nl-NL') : Math.floor(current)}</>;
}

export default function CounterStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });

  return (
    <section
      ref={ref}
      className="relative border-y border-white/[0.05] bg-[#0A0A0A]"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FF6B00]/35 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FF6B00]/35 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-6">
          {counters.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`flex flex-col items-center justify-center text-center ${
                i > 0 ? 'sm:border-l sm:border-white/[0.05]' : ''
              }`}
            >
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="font-display text-3xl sm:text-4xl text-white leading-none tabular-nums">
                  <CountingValue target={c.numericTarget} inView={inView} />
                </span>
                <span className="font-mono text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.18em] leading-none text-[#FF6B00]">
                  {c.unit}
                </span>
              </div>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#888888]">
                {c.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
