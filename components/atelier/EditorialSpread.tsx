'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useEcwid } from '@/components/EcwidProvider';
import { BRAND, SPECS, LAUNCH_STATE, capacityLabel, priceLabel } from '@/lib/product-claims';

const EASE = [0.25, 1, 0.5, 1] as const;

/**
 * EditorialSpread — magazine-opening: groot campagnebeeld links (hotel-stil-
 * leven), rechts een smalle redactionele kolom met Bodoni-openingszin
 * (bestaande kop), lopende tekst (bestaande beschrijving) en prijs + CTA-link.
 */
export default function EditorialSpread() {
  const reduce = useReducedMotion();
  const { addToCart } = useEcwid();
  const price = priceLabel();

  const onBuy = () => {
    if (LAUNCH_STATE.waitlistMode) {
      window.location.href = '#waitlist';
      return;
    }
    addToCart();
  };

  return (
    <section className="relative border-t border-white/[0.08] bg-[#080808] py-20 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 lg:grid-cols-12 lg:gap-0 lg:px-10">
        {/* beeld — bleed naar links */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative lg:col-span-7"
        >
          <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/3.4]">
            <Image
              src="/images/titanx/gallery/v2/life-hotel.webp"
              alt={`${BRAND.product} stilleven op een hotelkamer`}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
          </div>
          <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-white/35">
            {BRAND.product} — {SPECS.finish.value}
          </p>
        </motion.div>

        {/* redactionele kolom */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="lg:col-span-4 lg:col-start-9"
        >
          <h2 className="font-display leading-[1.08] text-white [text-wrap:balance]" style={{ fontSize: 'clamp(2.1rem, 3.6vw, 3.3rem)' }}>
            Eén powerbank.
            <br />
            <em className="italic text-titan-accent">Geen compromis.</em>
          </h2>
          <span className="mt-7 block h-px w-12 bg-titan-accent/70" aria-hidden />
          <p className="mt-7 font-body text-base leading-[1.8] text-[#B5B5B5]">
            {capacityLabel()} in matte black. Laadt tot {SPECS.simultaneousDevices.value} apparaten
            tegelijk, met ingebouwde USB-C en Lightning kabels, LED-display en zaklamp. Gebouwd om
            mee te nemen.
          </p>
          <div className="mt-9 flex items-center gap-6">
            {price && <span className="font-display text-2xl italic text-white">{price}</span>}
            <button onClick={onBuy} className="link-hairline">
              Bestel nu
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
