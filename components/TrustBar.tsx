'use client';

import { Shield, Package, RefreshCcw, ShieldCheck } from 'lucide-react';
import { SPECS, TBD, safe } from '@/lib/product-claims';

const paymentMethods = ['iDEAL', 'Apple Pay', 'Klarna', 'Visa', 'Mastercard', 'PayPal'];

export default function TrustBar() {
  const shippingCountries = safe(TBD.freeShippingCountries);
  const returnDays = safe(TBD.returnPolicyDays);

  // Eén accent-taal: monochrome iconen, geen kleur-carrousel (teal/goud/groen).
  const items: Array<{ Icon: typeof Shield; text: string }> = [
    { Icon: Shield, text: 'SSL Beveiligd' },
  ];

  if (shippingCountries && shippingCountries.length > 0) {
    items.push({
      Icon: Package,
      text: `Gratis verzending ${shippingCountries.join(' / ')}`,
    });
  }
  if (returnDays && returnDays > 0) {
    items.push({ Icon: RefreshCcw, text: `${returnDays} dagen retour` });
  }

  items.push({
    Icon: ShieldCheck,
    text: `${SPECS.warrantyYears.value} jaar fabrieksgarantie`,
  });

  return (
    <div className="relative border-b border-white/[0.05] overflow-hidden bg-white/[0.015]">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-center flex-wrap gap-x-8 gap-y-2.5">
          {items.map(({ Icon, text }, i) => (
            <div key={text} className="flex items-center gap-2">
              <Icon className="w-3.5 h-3.5 flex-shrink-0 text-[#FF8C00]/80" />
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#A0A0A0]">
                {text}
              </span>
              {i < items.length - 1 && (
                <span className="hidden sm:block w-px h-3.5 bg-white/[0.08] ml-6" />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-white/[0.05] flex-wrap">
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-[#8A8A8A]">
            Betalen via
          </span>
          {paymentMethods.map((method) => (
            <span
              key={method}
              className="font-mono text-[0.6rem] px-2 py-0.5 rounded text-[#9CA3AF] border border-white/[0.07] bg-white/[0.04]"
            >
              {method}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
