'use client';

import { ShieldCheck, RefreshCcw, BadgeCheck, Package } from 'lucide-react';
import { SPECS, TBD, safe } from '@/lib/product-claims';

const PAYMENT_METHODS = ['iDEAL', 'Apple Pay', 'Klarna', 'Visa', 'Mastercard', 'PayPal'];

/**
 * TrustStrip — pre-launch vertrouwen als één industriële strip: vier cellen
 * (retour/garantie/certificeringen/verzending) + vierkante betaalchips.
 * Alle waarden uit de SSOT / bestaande strings; geen reviews (geen fake).
 */
export default function TrustStrip() {
  const returnDays = safe(TBD.returnPolicyDays) ?? 14;
  const certs = safe(TBD.certifications) ?? [];

  const cells = [
    { Icon: RefreshCcw, label: `${returnDays} dagen retour` },
    { Icon: ShieldCheck, label: `${SPECS.warrantyYears.value} jaar fabrieksgarantie` },
    { Icon: BadgeCheck, label: certs.join(' · ') },
    { Icon: Package, label: 'Verzending NL · 1-3 werkdagen' },
  ];

  return (
    <section className="relative border-t border-white/[0.08] bg-[#080808]">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
        <div className="grid grid-cols-2 border-x border-white/[0.08] lg:grid-cols-4">
          {cells.map(({ Icon, label }, i) => (
            <div
              key={label}
              className={`flex items-center gap-3 border-b border-white/[0.08] px-4 py-5 lg:px-6 ${
                i < cells.length - 1 ? 'lg:border-r' : ''
              } ${i % 2 === 0 ? 'border-r lg:border-r' : ''}`}
            >
              <Icon className="h-4 w-4 flex-shrink-0 text-titan-accent" aria-hidden />
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-white/80">
                {label}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 border-x border-white/[0.08] px-4 py-4">
          <span className="mr-1 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-white/40">
            Betalen via
          </span>
          {PAYMENT_METHODS.map((m) => (
            <span
              key={m}
              className="border border-white/[0.1] bg-white/[0.03] px-2.5 py-1 font-mono text-[0.6rem] text-[#9CA3AF]"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
