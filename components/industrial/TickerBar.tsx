'use client';

import { BRAND, capacityLabel } from '@/lib/product-claims';

/**
 * TickerBar — dunne safety-orange band bovenaan met doorlopende mono-ticker.
 * Inhoud = uitsluitend bestaande merkteksten (product, capaciteit, tagline,
 * strap-tekst). Reduced-motion: animatie uit (statisch zichtbaar).
 */
const ITEMS = [
  `${BRAND.wordmark} · ${BRAND.product}`,
  capacityLabel().toUpperCase(),
  BRAND.tagline.toUpperCase(),
  'POWER BANK',
];

export default function TickerBar() {
  const line = ITEMS.join('   •   ');
  return (
    <div className="relative z-[55] h-7 overflow-hidden bg-titan-accent" aria-hidden>
      <div className="ticker-track h-7 items-center">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="px-4 font-mono text-[0.62rem] font-700 uppercase tracking-[0.22em] text-[#080808] leading-7"
          >
            {line}&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}
