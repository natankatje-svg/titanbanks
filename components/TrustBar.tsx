'use client';

import { Shield, Package, RefreshCcw, ShieldCheck } from 'lucide-react';
import { SPECS, TBD, safe } from '@/lib/product-claims';

const paymentMethods = ['iDEAL', 'Apple Pay', 'Klarna', 'Visa', 'Mastercard', 'PayPal'];

export default function TrustBar() {
  const shippingCountries = safe(TBD.freeShippingCountries);
  const returnDays = safe(TBD.returnPolicyDays);

  const items: Array<{ Icon: typeof Shield; text: string; color: string }> = [
    { Icon: Shield, text: 'SSL Beveiligd', color: '#0EB5C8' },
  ];

  if (shippingCountries && shippingCountries.length > 0) {
    items.push({
      Icon: Package,
      text: `Gratis verzending ${shippingCountries.join(' / ')}`,
      color: '#FF6B00',
    });
  }
  if (returnDays && returnDays > 0) {
    items.push({ Icon: RefreshCcw, text: `${returnDays} dagen retour`, color: '#EAB308' });
  }

  items.push({
    Icon: ShieldCheck,
    text: `${SPECS.warrantyYears.value} jaar fabrieksgarantie`,
    color: '#22c55e',
  });

  return (
    <div className="relative border-b border-white/[0.05] overflow-hidden bg-[rgba(14,181,200,0.015)]">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-center flex-wrap gap-x-8 gap-y-2.5">
          {items.map(({ Icon, text, color }, i) => (
            <div key={text} className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}18`, border: `1px solid ${color}28` }}
              >
                <Icon className="w-3 h-3" style={{ color }} />
              </div>
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
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-[#666666]">
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
