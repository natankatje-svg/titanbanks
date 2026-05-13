'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, X, Minus } from 'lucide-react';

type CellValue = 'yes' | 'no' | 'partial' | string;

const rows: { feature: string; titanX: CellValue; standard: CellValue }[] = [
  { feature: 'Capaciteit', titanX: '50.000 mAh', standard: '10.000 mAh' },
  { feature: 'Fast Charging (PD 22.5W)', titanX: 'yes', standard: 'partial' },
  { feature: 'Smart LED Percentage Display', titanX: 'yes', standard: 'no' },
  { feature: 'Ingebouwde kabels (3x)', titanX: 'yes', standard: 'no' },
  { feature: 'LED Flashlight', titanX: 'yes', standard: 'no' },
  { feature: 'Outdoor Strap Houder', titanX: 'yes', standard: 'no' },
  { feature: 'Aantal output poorten', titanX: '5 poorten', standard: '2 poorten' },
  { feature: 'Meerdere apparaten tegelijk', titanX: 'yes', standard: 'partial' },
  { feature: 'Premium build quality', titanX: 'yes', standard: 'no' },
  { feature: 'Garantie', titanX: '2 jaar', standard: 'Onbekend' },
];

function Cell({ value, isTitan }: { value: CellValue; isTitan: boolean }) {
  if (value === 'yes') {
    return (
      <div className="flex justify-center">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center"
          style={isTitan ? { background: '#0EB5C81a', border: '1px solid #0EB5C840' } : { background: '#ffffff0a', border: '1px solid #ffffff15' }}
        >
          <Check className="w-4 h-4" style={{ color: isTitan ? '#0EB5C8' : '#6b7280' }} />
        </div>
      </div>
    );
  }

  if (value === 'no') {
    return (
      <div className="flex justify-center">
        <div className="w-7 h-7 rounded-full flex items-center justify-center bg-white/[0.03] border border-white/[0.06]">
          <X className="w-4 h-4 text-gray-700" />
        </div>
      </div>
    );
  }

  if (value === 'partial') {
    return (
      <div className="flex justify-center">
        <div className="w-7 h-7 rounded-full flex items-center justify-center bg-white/[0.03] border border-white/[0.06]">
          <Minus className="w-4 h-4 text-gray-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <span
        className="text-sm font-bold"
        style={{ color: isTitan ? '#0EB5C8' : '#6b7280' }}
      >
        {value}
      </span>
    </div>
  );
}

export default function Comparison() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="relative py-28 lg:py-40 bg-[#080808] overflow-hidden">
      {/* Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6">
            <span className="text-gray-400 text-xs font-bold tracking-[0.15em] uppercase">
              Vergelijking
            </span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black tracking-tight text-white mb-5">
            Titan X vs.{' '}
            <span className="text-gray-600">de rest</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-xl mx-auto leading-relaxed">
            De cijfers liegen niet. Zie zelf waarom de Titan X in een andere klasse speelt.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card rounded-3xl overflow-hidden border border-white/[0.07]"
        >
          {/* Table header */}
          <div className="grid grid-cols-[1fr_140px_140px] border-b border-white/[0.06]">
            <div className="px-6 py-5 text-gray-600 text-sm font-semibold uppercase tracking-wider">
              Feature
            </div>
            {/* Titan X header — highlighted */}
            <div
              className="px-4 py-5 text-center relative"
              style={{ background: 'rgba(0,229,255,0.05)', borderLeft: '1px solid rgba(0,229,255,0.12)' }}
            >
              <div className="text-[#0EB5C8] text-xs font-black tracking-[0.1em] uppercase">
                Titan X
              </div>
              <div
                className="mt-1 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: '#0EB5C820', color: '#0EB5C8', border: '1px solid #0EB5C830' }}
              >
                Premium
              </div>
            </div>
            <div
              className="px-4 py-5 text-center"
              style={{ borderLeft: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="text-gray-600 text-xs font-bold tracking-[0.1em] uppercase">
                Standaard
              </div>
              <div className="mt-1 text-[10px] text-gray-700">Powerbank</div>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
              className={`grid grid-cols-[1fr_140px_140px] ${
                i < rows.length - 1 ? 'border-b border-white/[0.04]' : ''
              } hover:bg-white/[0.015] transition-colors duration-200`}
            >
              <div className="px-6 py-4 text-gray-300 text-sm font-medium">{row.feature}</div>
              <div
                className="px-4 py-4 flex items-center justify-center"
                style={{ background: 'rgba(0,229,255,0.02)', borderLeft: '1px solid rgba(0,229,255,0.08)' }}
              >
                <Cell value={row.titanX} isTitan={true} />
              </div>
              <div
                className="px-4 py-4 flex items-center justify-center"
                style={{ borderLeft: '1px solid rgba(255,255,255,0.04)' }}
              >
                <Cell value={row.standard} isTitan={false} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-8">
          {[
            { icon: <Check className="w-3 h-3 text-[#0EB5C8]" />, label: 'Aanwezig' },
            { icon: <Minus className="w-3 h-3 text-gray-600" />, label: 'Gedeeltelijk' },
            { icon: <X className="w-3 h-3 text-gray-700" />, label: 'Afwezig' },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full glass-card flex items-center justify-center">
                {l.icon}
              </div>
              <span className="text-gray-600 text-xs">{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
