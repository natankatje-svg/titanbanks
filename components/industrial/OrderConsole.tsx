'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Minus, Plus } from 'lucide-react';
import { useEcwid } from '@/components/EcwidProvider';
import { SPECS, TBD, LAUNCH_STATE, priceLabel, safe } from '@/lib/product-claims';

const EASE = [0.22, 1, 0.36, 1] as const;
const PAYMENT_METHODS = ['iDEAL', 'Apple Pay', 'Klarna', 'Visa', 'Mastercard', 'PayPal'];

/**
 * OrderConsole — de industriële sluiting: zwart paneel met oranje corner-ticks,
 * links de slotvraag (bestaande copy), rechts het bestelpaneel (prijs/qty/CTA/
 * betaalrij). De halo-foto gedimd als energie-laag rechts.
 */
export default function OrderConsole() {
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
    <section className="relative overflow-hidden border-t border-white/[0.08] bg-black py-16 lg:py-28">
      {/* halo-energie rechts, gedimd */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[55%] opacity-50" aria-hidden>
        <Image
          src="/images/titanx/gallery/v2/energy-halo.webp"
          alt=""
          fill
          sizes="55vw"
          className="object-cover object-[center_30%]"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #000 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.35) 100%)' }} />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="corner-ticks grid gap-10 border border-white/[0.12] bg-black/70 p-6 backdrop-blur-sm lg:grid-cols-2 lg:gap-14 lg:p-12"
        >
          {/* links — slotvraag */}
          <div className="flex flex-col justify-center">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-titan-accent">
              Eerste batch · {SPECS.warrantyYears.value} jaar garantie
            </span>
            <h2 className="mt-4 font-display uppercase leading-[0.92] text-white [text-wrap:balance]" style={{ fontSize: 'clamp(2.4rem, 5.4vw, 4.4rem)' }}>
              Klaar om <span className="text-titan-accent">op te laden?</span>
            </h2>
            <p className="mt-5 max-w-md font-body text-base leading-relaxed text-[#B5B5B5] lg:text-lg">
              {SPECS.capacityMah.value.toLocaleString('nl-NL')} mAh in matte black. Beperkte eerste
              batch — bestel nu en raak nooit meer zonder stroom.
            </p>
          </div>

          {/* rechts — bestelpaneel */}
          <div className="flex flex-col justify-center">
            <div className="border border-white/[0.12] bg-[#0A0A0A] p-5 lg:p-7">
              <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
                <div>
                  {price && <span className="font-display text-3xl text-white lg:text-4xl">{price}</span>}
                  <span className="block pt-1 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/40">
                    incl. BTW
                  </span>
                </div>
                {!isWaitlist && (
                  <div className="inline-flex items-stretch border border-white/[0.14]">
                    <button
                      onClick={() => setQty((v) => Math.max(1, v - 1))}
                      aria-label="Minder"
                      className="px-3.5 text-[#A0A0A0] transition-colors hover:bg-white/[0.05] hover:text-white"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-[56px] px-4 py-3 text-center font-mono text-lg font-700 text-white">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty((v) => Math.min(5, v + 1))}
                      aria-label="Meer"
                      className="px-3.5 text-[#A0A0A0] transition-colors hover:bg-white/[0.05] hover:text-white"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>

              <button onClick={onBuy} className="btn-console group w-full" style={{ padding: '1.1rem 1.6rem' }}>
                <span>Bestel nu</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </button>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
                {PAYMENT_METHODS.map((m) => (
                  <span key={m} className="border border-white/[0.1] bg-white/[0.03] px-2 py-0.5 font-mono text-[0.58rem] text-[#9CA3AF]">
                    {m}
                  </span>
                ))}
              </div>
              <p className="mt-3.5 text-center font-body text-[11px] leading-relaxed text-[#9C9C9C]">
                <Check className="mr-1 inline h-3 w-3 text-emerald-400" aria-hidden />
                {safe(TBD.returnPolicyDays) ?? 14} dagen retour · {SPECS.warrantyYears.value} jaar garantie · veilig betalen
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
