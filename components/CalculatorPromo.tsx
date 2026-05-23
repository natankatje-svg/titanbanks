'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, BatteryCharging } from 'lucide-react';
import { BRAND, capacityLabel } from '@/lib/product-claims';

const examples = [
  { label: 'iPhone 16 Pro Max', value: '~7×' },
  { label: 'iPad Pro 13"', value: '~3×' },
  { label: 'MacBook Air M3', value: '~2×' },
  { label: 'GoPro Hero 12', value: '~20×' },
];

export default function CalculatorPromo() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative bg-[#0A0A0A] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl border border-[#2A2A2A] bg-[#121212] overflow-hidden"
        >
          <div
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'rgba(255,107,0,0.10)' }}
          />

          <div className="relative p-8 md:p-12 grid md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-5">
                <BatteryCharging className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[#FF6B00]">
                  Power Calculator
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold leading-[0.95] mb-5">
                Hoeveel keer laadt {BRAND.product}<br className="hidden md:block" /> jouw devices?
              </h2>
              <p className="text-[#A0A0A0] text-base leading-relaxed mb-6 max-w-xl">
                Kies welke devices je meeneemt. Wij berekenen hoeveel laadbeurten je krijgt uit{' '}
                {capacityLabel()} — conservatief, transparant.
              </p>

              <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-8 max-w-md">
                {examples.map((ex) => (
                  <div key={ex.label} className="flex items-baseline gap-2">
                    <span className="font-display text-xl font-bold text-white tabular-nums">{ex.value}</span>
                    <span className="text-[#888888] text-sm">{ex.label}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/calculator"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#FF6B00] hover:text-white transition-colors"
              >
                Open de calculator
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="hidden md:block">
              <div className="font-display text-[7rem] leading-none text-[#1F1F1F] select-none tabular-nums">
                50K
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
