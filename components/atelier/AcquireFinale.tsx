'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Minus, Plus, Check } from 'lucide-react';
import { useEcwid } from '@/components/EcwidProvider';
import { SPECS, TBD, LAUNCH_STATE, priceLabel, safe } from '@/lib/product-claims';

const EASE = [0.25, 1, 0.5, 1] as const;

/**
 * AcquireFinale — de couture-sluiting: gecentreerd op zwart met de aurora-
 * energie heel laag gedimd, Bodoni-slotvraag met italic accent, prijs groot,
 * aantal + gevulde CTA, trust als stille caps-regel.
 */
export default function AcquireFinale() {
  const reduce = useReducedMotion();
  const { addToCart } = useEcwid();
  const [qty, setQty] = useState(1);
  const price = priceLabel();
  const isWaitlist = LAUNCH_STATE.waitlistMode;

  const onBuy = () => {
    if (isWaitlist) {
      window.location.href = '#waitlist';
      return;
    }
    addToCart(qty);
  };

  return (
    <section className="relative overflow-hidden border-t border-white/[0.08] bg-[#080808] py-24 lg:py-36">
      {/* aurora-energie, heel stil */}
      <div className="absolute inset-0 opacity-25" aria-hidden>
        <Image
          src="/images/titanx/gallery/v2/energy-aurora.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 45%, rgba(8,8,8,0.5) 0%, #080808 85%)' }} />
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative mx-auto flex max-w-2xl flex-col items-center px-6 text-center"
      >
        <span className="font-body text-[0.66rem] uppercase tracking-[0.3em] text-titan-accent">
          Eerste batch · {SPECS.warrantyYears.value} jaar garantie
        </span>
        <span className="maison-rule my-7" aria-hidden />

        <h2 className="font-display leading-[1.04] text-white [text-wrap:balance]" style={{ fontSize: 'clamp(2.6rem, 5.6vw, 5rem)' }}>
          Klaar om <em className="italic text-titan-accent">op te laden?</em>
        </h2>
        <p className="mt-6 max-w-md font-body text-base leading-relaxed text-[#B5B5B5]">
          {SPECS.capacityMah.value.toLocaleString('nl-NL')} mAh in matte black. Beperkte eerste
          batch — bestel nu en raak nooit meer zonder stroom.
        </p>

        {price && (
          <div className="mt-10 font-display text-5xl italic text-white lg:text-6xl">{price}</div>
        )}
        <span className="mt-2 font-body text-[0.62rem] uppercase tracking-[0.22em] text-white/40">
          incl. BTW
        </span>

        <div className="mt-8 flex flex-col items-center gap-5 sm:flex-row">
          {!isWaitlist && (
            <div className="inline-flex items-stretch border border-white/[0.18]">
              <button
                onClick={() => setQty((v) => Math.max(1, v - 1))}
                aria-label="Minder"
                className="px-4 text-[#A0A0A0] transition-colors hover:text-white"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="min-w-[58px] px-4 py-3.5 text-center font-display text-xl text-white">{qty}</span>
              <button
                onClick={() => setQty((v) => Math.min(5, v + 1))}
                aria-label="Meer"
                className="px-4 text-[#A0A0A0] transition-colors hover:text-white"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
          <button onClick={onBuy} className="btn-atelier">
            Bestel nu
          </button>
        </div>

        <p className="mt-8 font-body text-[0.66rem] uppercase tracking-[0.18em] leading-loose text-white/45">
          <Check className="mr-1.5 inline h-3 w-3 text-emerald-400" aria-hidden />
          {safe(TBD.returnPolicyDays) ?? 14} dagen retour · iDEAL · Klarna · veilig betalen
        </p>
      </motion.div>
    </section>
  );
}
