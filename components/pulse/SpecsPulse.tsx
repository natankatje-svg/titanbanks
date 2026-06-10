'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  SPECS,
  TBD,
  safe,
  capacityLabel,
  portsLabel,
} from '@/lib/product-claims';
import Kicker from '@/components/pulse/Kicker';

const EASE = [0.22, 1, 0.36, 1] as const;
const PAYMENT_METHODS = ['iDEAL', 'Apple Pay', 'Klarna', 'Visa', 'Mastercard', 'PayPal'];

/**
 * SpecsPulse — volledige specificaties, scanbaar met glow-hover per rij +
 * trust/betaalregel. Alles uit de claims-SSOT.
 */
export default function SpecsPulse() {
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
    <section id="specs" className="relative scroll-mt-20 border-t border-white/[0.07] bg-[#080808] py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mb-10 lg:mb-12"
        >
          <Kicker>Specs</Kicker>
          <h2 className="mt-3 font-display uppercase leading-[1.05] text-white" style={{ fontSize: 'clamp(1.8rem, 3.8vw, 3rem)' }}>
            Elk detail <span className="text-titan-accent">telt.</span>
          </h2>
        </motion.div>

        <div className="grid gap-x-14 lg:grid-cols-2">
          {[rows.slice(0, mid), rows.slice(mid)].map((col, ci) => (
            <dl key={ci}>
              {col.map((row) => (
                <div
                  key={row.label}
                  className="group flex items-baseline justify-between gap-6 rounded-lg border-b border-white/[0.07] px-3 py-4 transition-colors duration-200 hover:bg-titan-accent/[0.06]"
                >
                  <dt className="font-body text-sm text-[#9C9C9C] transition-colors group-hover:text-white">{row.label}</dt>
                  <dd className="text-right font-mono text-[0.74rem] uppercase tracking-[0.05em] text-white transition-colors group-hover:text-titan-accent">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          ))}
        </div>

        <p className="mt-9 text-center font-mono text-[0.62rem] uppercase tracking-[0.16em] leading-loose text-white/45">
          {safe(TBD.returnPolicyDays) ?? 14} dagen retour · {SPECS.warrantyYears.value} jaar fabrieksgarantie · Verzending NL 1-3 werkdagen
          <span className="mx-2.5 text-titan-accent">●</span>
          {PAYMENT_METHODS.join(' · ')}
        </p>
      </div>
    </section>
  );
}
