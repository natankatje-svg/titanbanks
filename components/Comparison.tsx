'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, X, Minus } from 'lucide-react';

type CellValue = 'yes' | 'no' | 'partial' | string;

const rows: { feature: string; titanX: CellValue; standard: CellValue }[] = [
  { feature: 'Capaciteit',                       titanX: '50.000 mAh',  standard: '10.000 mAh' },
  { feature: 'Fast Charging (PD 22.5W)',          titanX: 'yes',         standard: 'partial'     },
  { feature: 'Smart LED Percentage Display',      titanX: 'yes',         standard: 'no'          },
  { feature: 'Ingebouwde kabels (2×)',            titanX: 'yes',         standard: 'no'          },
  { feature: 'LED Flashlight',                    titanX: 'yes',         standard: 'no'          },
  { feature: 'Outdoor Strap Houder',              titanX: 'yes',         standard: 'no'          },
  { feature: 'Aantal output poorten',             titanX: '5 poorten',   standard: '2 poorten'   },
  { feature: 'Meerdere apparaten tegelijk',       titanX: 'yes',         standard: 'partial'     },
  { feature: 'Premium build quality',             titanX: 'yes',         standard: 'no'          },
  { feature: 'Garantie',                          titanX: '2 jaar',      standard: 'Onbekend'    },
];

function Cell({ value, isTitan }: { value: CellValue; isTitan: boolean }) {
  const color = isTitan ? '#0EB5C8' : '#374151';
  if (value === 'yes') return (
    <div className="flex justify-center">
      <div className="w-7 h-7 rounded-full flex items-center justify-center"
        style={isTitan ? { background: 'rgba(14,181,200,0.12)', border: '1px solid rgba(14,181,200,0.3)' } : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <Check className="w-4 h-4" style={{ color }} />
      </div>
    </div>
  );
  if (value === 'no') return (
    <div className="flex justify-center">
      <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
        <X className="w-4 h-4 text-gray-700" />
      </div>
    </div>
  );
  if (value === 'partial') return (
    <div className="flex justify-center">
      <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
        <Minus className="w-4 h-4 text-gray-600" />
      </div>
    </div>
  );
  return (
    <div className="text-center">
      <span className="font-mono-titan text-sm font-medium" style={{ color: isTitan ? '#0EB5C8' : '#4B5563' }}>{value}</span>
    </div>
  );
}

export default function Comparison() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <section ref={ref} className="relative py-24 lg:py-36 bg-[#050505] overflow-hidden">
      {/* Ambient teal glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(14,181,200,0.04) 0%, transparent 65%)' }}
      />

      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <div className="section-label mb-4 flex items-center gap-3">
            <div className="w-6 h-px bg-[#0EB5C8]" />
            <span>09 — Vergelijking</span>
          </div>
          <h2 className="font-display uppercase text-white" style={{ fontSize: 'clamp(2.8rem, 7vw, 5rem)', lineHeight: 0.88 }}>
            TITAN X VS. <span className="text-white/20">DE REST</span>
          </h2>
        </motion.div>

        <div className="relative overflow-x-auto scrollbar-none -mx-6 px-6 sm:mx-0 sm:px-0">
          {/* Mobile scroll fade hint */}
          <div className="sm:hidden absolute right-0 top-0 bottom-0 w-12 pointer-events-none z-10"
            style={{ background: 'linear-gradient(to right, transparent, #050505)' }}
          />
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="glass-card rounded-3xl overflow-hidden min-w-[480px]"
          style={{ border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Table header */}
          <div className="grid grid-cols-[1fr_130px_130px] border-b border-white/[0.06]">
            <div className="px-6 py-5 section-label">Feature</div>
            <div className="px-4 py-5 text-center" style={{ background: 'rgba(14,181,200,0.05)', borderLeft: '1px solid rgba(14,181,200,0.15)' }}>
              <div className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 mb-2"
                style={{ background: 'rgba(14,181,200,0.12)', border: '1px solid rgba(14,181,200,0.25)' }}>
                <span className="font-mono-titan text-[9px] uppercase tracking-widest" style={{ color: '#0EB5C8' }}>★ Beste keuze</span>
              </div>
              <div className="font-display uppercase text-sm tracking-widest" style={{ color: '#0EB5C8' }}>Titan X</div>
              <div className="font-mono-titan text-[10px] mt-0.5" style={{ color: '#0EB5C8', opacity: 0.55 }}>Premium</div>
            </div>
            <div className="px-4 py-5 text-center" style={{ borderLeft: '1px solid rgba(255,255,255,0.04)' }}>
              <div className="h-[24px] mb-2" />{/* spacer to align with badge */}
              <div className="font-display uppercase text-xs tracking-widest text-gray-600">Standaard</div>
              <div className="font-mono-titan text-[10px] mt-0.5 text-gray-700">Powerbank</div>
            </div>
          </div>

          {rows.map((row, i) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.35, delay: 0.15 + i * 0.04 }}
              className={`grid grid-cols-[1fr_130px_130px] hover:bg-white/[0.015] transition-colors duration-200 ${i < rows.length - 1 ? 'border-b border-white/[0.04]' : ''}`}
            >
              <div className="px-6 py-4 font-body text-gray-300 text-sm font-medium">{row.feature}</div>
              <div className="px-4 py-4 flex items-center justify-center" style={{ background: 'rgba(14,181,200,0.02)', borderLeft: '1px solid rgba(14,181,200,0.07)' }}>
                <Cell value={row.titanX} isTitan={true} />
              </div>
              <div className="px-4 py-4 flex items-center justify-center" style={{ borderLeft: '1px solid rgba(255,255,255,0.03)' }}>
                <Cell value={row.standard} isTitan={false} />
              </div>
            </motion.div>
          ))}
        </motion.div>
        </div>

        <div className="flex items-center justify-center gap-6 mt-8">
          {[
            { icon: <Check className="w-3 h-3" style={{ color: '#0EB5C8' }} />, label: 'Aanwezig' },
            { icon: <Minus className="w-3 h-3 text-gray-600" />, label: 'Gedeeltelijk' },
            { icon: <X className="w-3 h-3 text-gray-700" />, label: 'Afwezig' },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full glass-card flex items-center justify-center">{l.icon}</div>
              <span className="font-body text-gray-500 text-xs">{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
