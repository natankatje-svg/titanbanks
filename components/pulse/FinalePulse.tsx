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
 * FinalePulse — slot: de vloeiende energie-golven (productloos sfeerbeeld)
 * als levende achtergrond met Ken-Burns, gecentreerde kop, prijs, qty en
 * pulserende CTA. Copy = bestaande strings.
 */
export default function FinalePulse() {
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
    <section id="bestel" className="relative scroll-mt-20 overflow-hidden border-t border-white/[0.07] bg-black py-24 lg:py-36">
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/images/atmosphere/energy.webp"
          alt=""
          fill
          sizes="100vw"
          className="final-drop-zoom object-cover opacity-70"
        />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.75) 60%, #000 100%)' }} />
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative mx-auto flex max-w-2xl flex-col items-center px-6 text-center"
      >
        <span className="font-mono text-[0.64rem] uppercase tracking-[0.24em] text-titan-accent">
          Eerste batch · {SPECS.warrantyYears.value} jaar garantie
        </span>
        <h2
          className="mt-4 font-display uppercase leading-[1.06] text-white [text-wrap:balance]"
          style={{ fontSize: 'clamp(2.2rem, 4.8vw, 4rem)', textShadow: '0 2px 40px rgba(0,0,0,0.7)' }}
        >
          Klaar om <span className="text-titan-accent text-glow-orange">op te laden?</span>
        </h2>
        <p className="mt-5 max-w-md font-body text-base leading-relaxed text-[#C9C9C9]" style={{ textShadow: '0 1px 16px rgba(0,0,0,0.8)' }}>
          {SPECS.capacityMah.value.toLocaleString('nl-NL')} mAh in matte black. Beperkte eerste
          batch — bestel nu en raak nooit meer zonder stroom.
        </p>

        {price && <div className="mt-9 font-display text-4xl text-white lg:text-5xl">{price}</div>}
        <span className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/45">incl. BTW</span>

        <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row">
          {!isWaitlist && (
            <div className="inline-flex items-stretch rounded-full border border-white/[0.18] bg-black/40 backdrop-blur-sm">
              <button
                onClick={() => setQty((v) => Math.max(1, v - 1))}
                aria-label="Minder"
                className="px-4 text-[#A0A0A0] transition-colors hover:text-white"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="min-w-[54px] px-3 py-3 text-center font-display text-lg text-white">{qty}</span>
              <button
                onClick={() => setQty((v) => Math.min(5, v + 1))}
                aria-label="Meer"
                className="px-4 text-[#A0A0A0] transition-colors hover:text-white"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
          <button onClick={onBuy} className="btn-pulse group">
            <span>Bestel nu</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </button>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-1.5">
          {PAYMENT_METHODS.map((m) => (
            <span key={m} className="rounded-full border border-white/[0.12] bg-black/40 px-2.5 py-1 font-mono text-[0.58rem] text-[#9CA3AF] backdrop-blur-sm">
              {m}
            </span>
          ))}
        </div>
        <p className="mt-4 font-body text-[11px] leading-relaxed text-[#B5B5B5]">
          <Check className="mr-1 inline h-3 w-3 text-emerald-400" aria-hidden />
          {safe(TBD.returnPolicyDays) ?? 14} dagen retour · {SPECS.warrantyYears.value} jaar garantie · veilig betalen
        </p>
      </motion.div>
    </section>
  );
}
