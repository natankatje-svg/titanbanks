'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  SPECS,
  TBD,
  safe,
  capacityLabel,
  portsLabel,
} from '@/lib/product-claims';

const EASE = [0.25, 1, 0.5, 1] as const;
const PAYMENT_METHODS = ['iDEAL', 'Apple Pay', 'Klarna', 'Visa', 'Mastercard', 'PayPal'];

/**
 * Colophon — specificaties als stil colofon: kleine caps, hairline-regels,
 * twee kolommen. Onderaan trust + betaalmethoden als één tekstregel.
 * Alles uit de claims-SSOT.
 */
export default function Colophon() {
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

  return (
    <section className="relative border-t border-white/[0.08] bg-[#080808] py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-12 text-center"
        >
          <span className="font-body text-[0.66rem] uppercase tracking-[0.3em] text-white/55">Specs</span>
          <h2 className="mt-4 font-display leading-[1.05] text-white" style={{ fontSize: 'clamp(2.2rem, 4.4vw, 4rem)' }}>
            Elk detail <em className="italic text-titan-accent">telt.</em>
          </h2>
        </motion.div>

        <div className="grid gap-x-16 lg:grid-cols-2">
          {[rows.slice(0, mid), rows.slice(mid)].map((col, ci) => (
            <dl key={ci}>
              {col.map((row) => (
                <div key={row.label} className="flex items-baseline justify-between gap-6 border-b border-white/[0.08] py-4">
                  <dt className="font-body text-[0.68rem] uppercase tracking-[0.2em] text-white/45">{row.label}</dt>
                  <dd className="text-right font-body text-sm text-white/90">{row.value}</dd>
                </div>
              ))}
            </dl>
          ))}
        </div>

        <p className="mt-10 text-center font-body text-[0.68rem] uppercase tracking-[0.18em] leading-loose text-white/45">
          {safe(TBD.returnPolicyDays) ?? 14} dagen retour · {SPECS.warrantyYears.value} jaar fabrieksgarantie ·
          Verzending NL 1-3 werkdagen
          <span className="mx-3 text-titan-accent">·</span>
          {PAYMENT_METHODS.join(' · ')}
        </p>
      </div>
    </section>
  );
}
