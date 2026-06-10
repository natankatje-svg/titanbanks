'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Eyebrow, Watermark } from '@/components/home/primitives';
import { SPECS } from '@/lib/product-claims';

const EASE = [0.16, 1, 0.3, 1] as const;

// 4-koloms stat-strip (template "What's Inside"). Cijfers uit SSOT; korte NL-copy.
const STATS = [
  {
    value: SPECS.capacityMah.value.toLocaleString('nl-NL'),
    unit: 'mAh',
    label: 'Capaciteit',
    desc: 'Genoeg om dagen door te komen, niet uren.',
  },
  {
    value: SPECS.simultaneousDevices.value.toString(),
    unit: 'apparaten',
    label: 'Tegelijk laden',
    desc: 'Via 4× USB-A plus ingebouwde USB-C en Lightning kabels.',
  },
  // Content-regel: geen specifiek wattage — poorten-stat i.p.v. watt-getal.
  {
    value: SPECS.portsUsbA.value.toString(),
    unit: '× USB-A',
    label: 'Poorten',
    desc: 'Plus snellaad via de ingebouwde USB-C kabel.',
  },
  {
    value: SPECS.warrantyYears.value.toString(),
    unit: 'jaar',
    label: 'Garantie',
    desc: 'Fabrieksgarantie op elke Titan X.',
  },
] as const;

/**
 * WhatsInside — template-sectie 4 ("Formula & Benefits" / 4-koloms stat-strip),
 * donker uitgevoerd met een gigantisch faint watermark-woord voor diepte.
 */
export default function WhatsInside() {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-[#080808] py-20 lg:py-28 overflow-hidden border-y border-white/[0.06]">
      <Watermark className="top-1/2 -translate-y-1/2">POWER</Watermark>

      {/* ambient top glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[300px]"
        style={{ background: 'radial-gradient(ellipse 70% 100% at 50% 0%, rgba(255,140,0,0.05) 0%, transparent 60%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-8 mb-14 lg:mb-20 items-end">
          <div>
            <Eyebrow className="mb-5">Wat erin zit</Eyebrow>
            <h2
              className="font-display font-extrabold uppercase leading-[0.92] tracking-[-0.035em] text-white"
              style={{ fontSize: 'clamp(2.1rem, 5vw, 3.8rem)' }}
            >
              Pure
              <br />
              <span className="text-gradient-orange">capaciteit.</span>
            </h2>
          </div>
          <p className="font-body text-[#A0A0A0] text-base lg:text-lg leading-relaxed max-w-xl md:justify-self-end">
            Geen ruis, geen loze specs. Vier getallen die bepalen of je onderweg zonder stroom komt te
            zitten — of niet.
          </p>
        </div>

        {/* 4-koloms stat-strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden bg-white/[0.06]">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              className="bg-[#0A0A0A] p-7 lg:p-9 flex flex-col"
            >
              <div className="flex items-baseline gap-1.5 mb-3">
                <span
                  className="font-display font-extrabold text-white leading-none tracking-[-0.035em]"
                  style={{ fontSize: 'clamp(2.6rem, 5vw, 4.2rem)' }}
                >
                  {s.value}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#FF8C00]">
                  {s.unit}
                </span>
              </div>
              <span className="font-display text-base font-bold uppercase tracking-tight text-white mb-1.5">
                {s.label}
              </span>
              <span className="font-body text-[#8A8A8A] text-sm leading-relaxed">{s.desc}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
