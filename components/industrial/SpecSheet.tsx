'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  SPECS,
  TBD,
  safe,
  capacityLabel,
  portsLabel,
} from '@/lib/product-claims';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * SpecSheet — het volledige specificatieblad als technisch document:
 * geïndexeerde mono-rijen, hairlines, hover-tint. Alles uit de claims-SSOT.
 */
export default function SpecSheet() {
  const reduce = useReducedMotion();

  const rows: Array<{ label: string; value: string }> = [
    { label: 'Capaciteit', value: capacityLabel() },
    { label: 'Tegelijk laden', value: `${SPECS.simultaneousDevices.value} apparaten` },
    { label: 'Poorten', value: portsLabel() },
    { label: 'Fast charge', value: 'Via ingebouwde USB-C kabel' },
    { label: 'Display', value: 'LED — exact percentage' },
    { label: 'Zaklamp', value: SPECS.hasFlashlight.value ? 'Ingebouwd' : '—' },
    { label: 'Finish', value: SPECS.finish.value },
    { label: 'Draaglus', value: 'Oranje geweven, embossed "POWER BANK"' },
    ...(safe(TBD.weightGrams) ? [{ label: 'Gewicht', value: `${TBD.weightGrams.value} g` }] : []),
    ...(safe(TBD.dimensionsMm) ? [{ label: 'Afmetingen', value: TBD.dimensionsMm.value }] : []),
    ...(safe(TBD.certifications)
      ? [{ label: 'Certificeringen', value: TBD.certifications.value.join(' · ') }]
      : []),
    { label: 'Garantie', value: `${SPECS.warrantyYears.value} jaar fabrieksgarantie` },
    ...(safe(TBD.returnPolicyDays)
      ? [{ label: 'Retour', value: `${TBD.returnPolicyDays.value} dagen` }]
      : []),
  ];

  return (
    <section className="relative border-t border-white/[0.08] bg-[#0A0A0A] py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-10 flex flex-col gap-3 lg:mb-12 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-titan-accent">
              Specs
            </span>
            <h2 className="mt-3 font-display uppercase leading-[0.95] text-white" style={{ fontSize: 'clamp(2rem, 4.6vw, 3.6rem)' }}>
              Elk detail <span className="text-titan-accent">telt.</span>
            </h2>
          </div>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/35">
            Spec-sheet / {rows.length} regels
          </span>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="corner-ticks border border-white/[0.1]"
        >
          <dl className="grid grid-cols-1 lg:grid-cols-2">
            {rows.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-baseline gap-4 border-b border-white/[0.07] px-5 py-4 transition-colors hover:bg-titan-accent/[0.05] lg:px-6 ${
                  i % 2 === 0 ? 'lg:border-r' : ''
                }`}
              >
                <span className="w-7 flex-shrink-0 font-mono text-[0.58rem] text-white/25">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <dt className="flex-1 font-body text-sm text-[#9C9C9C]">{row.label}</dt>
                <dd className="text-right font-mono text-[0.72rem] uppercase tracking-[0.06em] text-white">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
