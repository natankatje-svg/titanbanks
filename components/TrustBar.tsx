'use client';

import { Shield, Package, RefreshCcw, Star } from 'lucide-react';

const items = [
  { Icon: Shield,     text: 'SSL Beveiligd',               color: '#0EB5C8' },
  { Icon: Package,    text: 'Gratis Verzending NL/BE',     color: '#FF8C00' },
  { Icon: RefreshCcw, text: '30 Dagen Retour',             color: '#EAB308' },
  { Icon: Star,       text: '4.9 / 5.0 · 2.400+ Reviews', color: '#4ade80' },
];

const paymentMethods = ['iDEAL', 'Visa', 'Mastercard', 'PayPal', 'Klarna'];

export default function TrustBar() {
  return (
    <div
      className="relative border-b border-white/[0.04] overflow-hidden"
      style={{ background: 'rgba(14,181,200,0.015)' }}
    >
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
              <span className="font-mono-titan text-[0.68rem] uppercase tracking-widest text-gray-400">{text}</span>
              {i < items.length - 1 && (
                <span className="hidden sm:block w-px h-3.5 bg-white/[0.08] ml-6" />
              )}
            </div>
          ))}
        </div>

        {/* Payment methods row */}
        <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-white/[0.04] flex-wrap">
          <span className="font-mono-titan text-[0.55rem] uppercase tracking-widest text-gray-700">Betalen via:</span>
          {paymentMethods.map((method) => (
            <span
              key={method}
              className="font-mono-titan text-[0.6rem] px-2 py-0.5 rounded"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                color: '#9CA3AF',
              }}
            >
              {method}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
