'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useEcwid } from '@/components/EcwidProvider';
import { SPECS, TBD, LAUNCH_STATE, priceLabel, safe } from '@/lib/product-claims';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * FinalDrop — cinematische slot-CTA: de goedgekeurde "energy beam"-foto
 * (verticale oranje lichtbundel achter het product) full-bleed als stage,
 * met een trage Ken-Burns-zoom (CSS-only, reduced-motion-gated in globals)
 * en een donkere scrim zodat kop + CTA strak leesbaar blijven.
 */
export default function FinalDrop() {
  const reduce = useReducedMotion();
  const { addToCart } = useEcwid();
  const price = priceLabel();
  const isWaitlist = LAUNCH_STATE.waitlistMode;

  return (
    <section className="relative bg-black py-28 lg:py-44 overflow-hidden border-t border-white/[0.06]">
      {/* BG — energy beam met trage zoom */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <Image
          src="/images/titanx/gallery/final-beam.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_26%] final-drop-zoom"
        />
        {/* scrims — donker genoeg voor AA-tekst, beam blijft gloeien */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.62) 70%, #000 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 52%, rgba(0,0,0,0.55) 0%, transparent 70%)',
          }}
        />
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative max-w-4xl mx-auto px-6 text-center flex flex-col items-center"
      >
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[#FF8C00] mb-5">
          Eerste batch · {SPECS.warrantyYears.value} jaar garantie
        </span>
        <h2
          className="font-display font-extrabold uppercase leading-[0.92] tracking-[-0.035em] text-white mb-6"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', textShadow: '0 2px 40px rgba(0,0,0,0.6)' }}
        >
          Klaar om
          <br />
          <span className="text-gradient-orange">op te laden?</span>
        </h2>
        <p
          className="font-body text-[#C9C9C9] text-lg leading-relaxed max-w-lg mb-10"
          style={{ textShadow: '0 1px 18px rgba(0,0,0,0.7)' }}
        >
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

        <p className="font-body text-[#B5B5B5] text-xs mt-5 inline-flex items-center gap-1.5" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.8)' }}>
          <Check className="w-3 h-3 text-emerald-400" aria-hidden />
          {safe(TBD.returnPolicyDays) ?? 14} dagen retour · iDEAL · Klarna · veilig betalen
        </p>
      </motion.div>
    </section>
  );
}
