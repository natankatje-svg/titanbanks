'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, RefreshCcw, BadgeCheck, Package } from 'lucide-react';
import { SPECS, TBD, safe } from '@/lib/product-claims';

const EASE = [0.16, 1, 0.3, 1] as const;
const PAYMENT_METHODS = ['iDEAL', 'Apple Pay', 'Klarna', 'Visa', 'Mastercard', 'PayPal'];

/**
 * TrustWall — pre-launch vertrouwen zonder fake reviews: garanties, retour,
 * certificeringen en betaalmethoden (alle waarden uit de SSOT / bestaande
 * strings). Vier stille blokken + betaalchips.
 */
export default function TrustWall() {
  const reduce = useReducedMotion();
  const returnDays = safe(TBD.returnPolicyDays) ?? 14;
  const certs = safe(TBD.certifications) ?? [];

  const blocks = [
    {
      Icon: RefreshCcw,
      title: `${returnDays} dagen retour`,
      desc: 'Niet tevreden? Retourneren zonder vragen.',
    },
    {
      Icon: ShieldCheck,
      title: `${SPECS.warrantyYears.value} jaar fabrieksgarantie`,
      desc: 'Fabrieksgarantie op elke Titan X.',
    },
    {
      Icon: BadgeCheck,
      title: certs.join(' · '),
      desc: 'Gecertificeerd en getest.',
    },
    {
      Icon: Package,
      title: 'Verzending uit Nederland',
      desc: 'Verzending NL · 1-3 werkdagen.',
    },
  ];

  return (
    <section className="relative bg-titan-surface py-16 lg:py-24 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-stage overflow-hidden bg-white/[0.06]"
        >
          {blocks.map(({ Icon, title, desc }) => (
            <div key={title} className="bg-titan-surface p-6 lg:p-8 flex flex-col gap-3">
              <Icon className="w-5 h-5 text-titan-accent" aria-hidden />
              <span className="font-display text-sm lg:text-base font-bold uppercase tracking-tight text-white leading-tight">
                {title}
              </span>
              <span className="font-body text-[#8A8A8A] text-sm leading-relaxed">{desc}</span>
            </div>
          ))}
        </motion.div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-[#8A8A8A] mr-1">
            Betalen via
          </span>
          {PAYMENT_METHODS.map((m) => (
            <span
              key={m}
              className="font-mono text-[0.6rem] px-2.5 py-1 rounded text-[#9CA3AF] border border-white/[0.07] bg-white/[0.03]"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
