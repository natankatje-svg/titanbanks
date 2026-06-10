'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Eyebrow } from '@/components/home/primitives';
import {
  SPECS,
  TBD,
  safe,
  capacityLabel,
  portsLabel,
} from '@/lib/product-claims';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * SpecTable — de Anker-laag: alle specificaties scanbaar in één tabel,
 * volledig uit de claims-SSOT (geen enkele nieuwe claim). Mono-waarden,
 * hairline-rijen, twee kolommen op desktop.
 */
export default function SpecTable() {
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

  const mid = Math.ceil(rows.length / 2);
  const cols = [rows.slice(0, mid), rows.slice(mid)];

  return (
    <section className="relative bg-black py-20 lg:py-32 overflow-hidden border-t border-white/[0.07]">
      {/* subtiele warme vloer-gloed */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[260px]"
        style={{ background: 'radial-gradient(ellipse 70% 100% at 50% 100%, rgba(255,140,0,0.05) 0%, transparent 60%)' }}
      />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-12 lg:mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <Eyebrow className="mb-5">Specs</Eyebrow>
            <h2
              className="font-display font-extrabold uppercase leading-[0.92] tracking-[-0.035em] text-white [text-wrap:balance]"
              style={{ fontSize: 'clamp(2.1rem, 5vw, 3.8rem)' }}
            >
              Alles wat je nodig hebt.
              <br />
              <span className="text-gradient-orange">Niets dat je niet nodig hebt.</span>
            </h2>
          </div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="grid lg:grid-cols-2 gap-x-16"
        >
          {cols.map((col, ci) => (
            <dl key={ci}>
              {col.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-6 border-b border-white/[0.07] py-4 lg:py-5"
                >
                  <dt className="font-body text-sm text-[#9C9C9C]">{row.label}</dt>
                  <dd className="font-mono text-[0.78rem] uppercase tracking-[0.08em] text-white text-right">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
