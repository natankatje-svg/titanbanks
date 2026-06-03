'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useEcwid } from '@/components/EcwidProvider';
import { Watermark } from '@/components/home/primitives';
import { BRAND, SPECS, TBD, LAUNCH_STATE, priceLabel, safe } from '@/lib/product-claims';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * FinalDrop — template-sectie 7 (newsletter/CTA "Ready to level up"), vertaald
 * naar de TitanBanks koop-CTA: gecentreerde 2-regelige ultra-bold kop met
 * accent, giant watermark, één grote oranje pill naar Ecwid-checkout.
 */
export default function FinalDrop() {
  const reduce = useReducedMotion();
  const { addToCart } = useEcwid();
  const price = priceLabel();
  const isWaitlist = LAUNCH_STATE.waitlistMode;

  return (
    <section className="relative bg-[#0A0A0A] py-24 lg:py-36 overflow-hidden border-t border-white/[0.06]">
      <Watermark className="top-1/2 -translate-y-1/2">{BRAND.product}</Watermark>

      {/* sterke oranje ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[160px]"
        style={{ background: 'rgba(255,107,0,0.12)' }}
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative max-w-4xl mx-auto px-6 text-center flex flex-col items-center"
      >
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[#FF6B00] mb-5">
          Eerste batch · {SPECS.warrantyYears.value} jaar garantie
        </span>
        <h2
          className="font-display font-extrabold uppercase leading-[0.88] tracking-tighter text-white mb-6"
          style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)' }}
        >
          Klaar om
          <br />
          <span className="text-gradient-orange">op te laden?</span>
        </h2>
        <p className="font-body text-[#A0A0A0] text-lg leading-relaxed max-w-lg mb-10">
          {SPECS.capacityMah.value.toLocaleString('nl-NL')} mAh in matte black. Beperkte eerste
          batch — bestel nu en raak nooit meer zonder stroom.
        </p>

        <button
          onClick={() => (isWaitlist ? (window.location.href = '#waitlist') : addToCart())}
          className="btn-orange group"
          style={{ padding: '1.15rem 2.4rem', fontSize: '1.05rem' }}
        >
          <span>Bestel nu</span>
          {price && <span className="opacity-90">· {price}</span>}
          <ArrowRight className="w-[17px] h-[17px] transition-transform group-hover:translate-x-1" aria-hidden />
        </button>

        <p className="font-body text-[#666666] text-xs mt-5 inline-flex items-center gap-1.5">
          <Check className="w-3 h-3 text-emerald-400" aria-hidden />
          {safe(TBD.returnPolicyDays) ?? 14} dagen retour · iDEAL · Klarna · veilig betalen
        </p>
      </motion.div>
    </section>
  );
}
