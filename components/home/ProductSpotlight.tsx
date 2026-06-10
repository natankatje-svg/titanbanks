'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, BatteryCharging, Plug, Cable, Gauge } from 'lucide-react';
import { useEcwid } from '@/components/EcwidProvider';
import { Eyebrow } from '@/components/home/primitives';
import {
  BRAND,
  SPECS,
  TBD,
  LAUNCH_STATE,
  capacityLabel,
  portsLabelCompact,
  priceLabel,
  safe,
} from '@/lib/product-claims';

const EASE = [0.16, 1, 0.3, 1] as const;

// Feature-chips uit SSOT — geen verboden claims (nooit een specifiek wattage).
const FEATURES = [
  { icon: BatteryCharging, label: `${capacityLabel()} capaciteit` },
  { icon: Plug, label: `${SPECS.simultaneousDevices.value} apparaten tegelijk` },
  { icon: Cable, label: portsLabelCompact() },
  { icon: Gauge, label: 'Snellaad via USB-C' },
] as const;

/**
 * ProductSpotlight — template-sectie 3 ("Choose your fuel" / flavours-card),
 * vertaald naar één-product TitanBanks: groot productbeeld in een gradient-card
 * links, info + feature-chips + prijs + Bestel-pill rechts.
 */
export default function ProductSpotlight() {
  const reduce = useReducedMotion();
  const { addToCart } = useEcwid();
  const price = priceLabel();
  const isWaitlist = LAUNCH_STATE.waitlistMode;

  return (
    <section className="relative bg-[#0A0A0A] py-20 lg:py-28 overflow-hidden border-t border-white/[0.07]">
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-12 lg:mb-16">
          <Eyebrow className="mb-5">Ons product</Eyebrow>
          <h2
            className="font-display font-extrabold uppercase leading-[0.92] tracking-[-0.035em] text-white"
            style={{ fontSize: 'clamp(2.1rem, 5vw, 3.8rem)' }}
          >
            Eén powerbank.
            <br />
            <span className="text-gradient-orange">Geen compromis.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-10 items-center">
          {/* Product card */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="group relative rounded-3xl border border-white/[0.08] overflow-hidden transition-colors duration-500 hover:border-[#FF8C00]/25"
            style={{
              background:
                'radial-gradient(ellipse 90% 80% at 50% 35%, rgba(255,140,0,0.12) 0%, transparent 62%), linear-gradient(160deg, #161616 0%, #0C0C0C 100%)',
            }}
          >
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/images/titanx/cutout/hero-warm-rim-cutout.png"
                alt={`${BRAND.text} ${BRAND.product} — ${capacityLabel()} power bank, matte black met warm rim-licht`}
                fill
                sizes="(max-width: 768px) 90vw, 45vw"
                className="object-contain object-center p-10 lg:p-12 select-none transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              {/* zachte vloer-gloed onder het product */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-[18%] bottom-[8%] h-[14%] rounded-[50%] blur-2xl"
                style={{ background: 'rgba(255,140,0,0.10)' }}
              />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            <h3
              className="font-display font-extrabold uppercase tracking-[-0.035em] text-white leading-none mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}
            >
              {BRAND.product}
            </h3>
            <p className="font-body text-[#A0A0A0] text-base leading-relaxed max-w-md mb-7">
              {capacityLabel()} in matte black. Laadt tot {SPECS.simultaneousDevices.value} apparaten
              tegelijk, met ingebouwde USB-C en Lightning kabels, LED-display en zaklamp. Gebouwd om
              mee te nemen.
            </p>

            {/* Feature-chips */}
            <div className="grid grid-cols-2 gap-2.5 mb-8 max-w-md">
              {FEATURES.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-2"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#FF8C00' }} aria-hidden />
                  <span className="font-display text-[0.78rem] font-bold text-white/90 tracking-tight leading-tight">
                    {label}
                  </span>
                </span>
              ))}
            </div>

            {/* Prijs + CTA */}
            <div className="flex flex-wrap items-center gap-4">
              {price && (
                <span
                  className="font-display font-extrabold text-white leading-none"
                  style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}
                >
                  {price}
                </span>
              )}
              <button
                onClick={() => (isWaitlist ? (window.location.href = '#waitlist') : addToCart())}
                className="btn-orange group"
                style={{ padding: '0.9rem 1.8rem', fontSize: '0.95rem' }}
              >
                <span>Bestel nu</span>
                <ArrowRight className="w-[15px] h-[15px] transition-transform group-hover:translate-x-0.5" aria-hidden />
              </button>
            </div>
            <p className="font-body text-[#8A8A8A] text-xs mt-3 inline-flex items-center gap-1.5">
              <Check className="w-3 h-3 text-emerald-400" aria-hidden />
              {safe(TBD.returnPolicyDays) ?? 14} dagen retour · {SPECS.warrantyYears.value} jaar garantie · veilig betalen
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
