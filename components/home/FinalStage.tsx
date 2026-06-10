'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Minus, Plus } from 'lucide-react';
import { useEcwid } from '@/components/EcwidProvider';
import { SPECS, TBD, LAUNCH_STATE, priceLabel, safe } from '@/lib/product-claims';

const EASE = [0.16, 1, 0.3, 1] as const;
const PAYMENT_METHODS = ['iDEAL', 'Apple Pay', 'Klarna', 'Visa', 'Mastercard', 'PayPal'];

/**
 * FinalStage — de cinematische sluiting: E04-halo (gloeiende lichtring om het
 * product) full-bleed met trage Ken-Burns, en een mini-buybox (prijs + qty +
 * CTA + betaaliconen) — de Anker-sluiting in een Apple-jas.
 */
export default function FinalStage() {
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
    <section className="relative bg-black py-24 lg:py-36 overflow-hidden border-t border-white/[0.06]">
      {/* BG — halo-foto met trage zoom; rechts zichtbaar, links scrim voor de buybox */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <Image
          src="/images/titanx/gallery/v2/energy-halo.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[70%_38%] final-drop-zoom"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.75) 42%, rgba(0,0,0,0.35) 68%, rgba(0,0,0,0.25) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, #000 100%)',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-xl"
        >
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-titan-accent mb-5 inline-block">
            Eerste batch · {SPECS.warrantyYears.value} jaar garantie
          </span>
          <h2
            className="font-display font-extrabold uppercase leading-[0.92] tracking-[-0.035em] text-white mb-5 [text-wrap:balance]"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)', textShadow: '0 2px 40px rgba(0,0,0,0.6)' }}
          >
            Klaar om
            <br />
            <span className="text-gradient-orange">op te laden?</span>
          </h2>
          <p className="font-body text-[#C9C9C9] text-lg leading-relaxed max-w-md mb-9" style={{ textShadow: '0 1px 18px rgba(0,0,0,0.7)' }}>
            {SPECS.capacityMah.value.toLocaleString('nl-NL')} mAh in matte black. Beperkte eerste
            batch — bestel nu en raak nooit meer zonder stroom.
          </p>

          {/* Mini-buybox */}
          <div className="rounded-stage border border-white/[0.1] bg-black/55 backdrop-blur-md p-5 lg:p-6 max-w-md">
            <div className="flex items-center justify-between gap-4 mb-4">
              {price && (
                <div>
                  <span className="font-display font-extrabold text-white leading-none" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>
                    {price}
                  </span>
                  <span className="block font-body text-[#8A8A8A] text-xs mt-1">incl. BTW</span>
                </div>
              )}
              {!isWaitlist && (
                <div className="inline-flex items-stretch rounded-lg overflow-hidden border border-white/[0.1]">
                  <button
                    onClick={() => setQty((v) => Math.max(1, v - 1))}
                    aria-label="Minder"
                    className="px-3 hover:bg-white/[0.05] transition-colors text-[#A0A0A0]"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 py-2.5 font-display text-lg text-white min-w-[52px] text-center">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((v) => Math.min(5, v + 1))}
                    aria-label="Meer"
                    className="px-3 hover:bg-white/[0.05] transition-colors text-[#A0A0A0]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={onBuy}
              className="btn-orange group w-full justify-center mb-4"
              style={{ padding: '1rem 1.6rem', fontSize: '0.95rem' }}
            >
              <span>Bestel nu</span>
              <ArrowRight className="w-[15px] h-[15px] transition-transform group-hover:translate-x-1" aria-hidden />
            </button>

            <div className="flex flex-wrap items-center gap-1.5 justify-center mb-3">
              {PAYMENT_METHODS.map((m) => (
                <span
                  key={m}
                  className="font-mono text-[0.58rem] px-2 py-0.5 rounded text-[#9CA3AF] border border-white/[0.08] bg-white/[0.04]"
                >
                  {m}
                </span>
              ))}
            </div>
            <p className="font-body text-[#B5B5B5] text-[11px] text-center leading-relaxed">
              <Check className="inline w-3 h-3 text-emerald-400 mr-1" aria-hidden />
              {safe(TBD.returnPolicyDays) ?? 14} dagen retour · {SPECS.warrantyYears.value} jaar garantie · veilig betalen
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
