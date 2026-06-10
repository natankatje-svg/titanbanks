'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useEcwid } from '@/components/EcwidProvider';
import { LAUNCH_STATE } from '@/lib/product-claims';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * FeatureStages — drie full-bleed bewijs-stages (Apple feature cards),
 * om-en-om beeld/tekst. Copy = de bestaande ProductShowcase-teksten;
 * beelden = goedgekeurde set (S09 gobo / hf-kabels / L07 backpack).
 * Signatuur-motion: clip-path beeldreveal per stage.
 */
const STAGES = [
  {
    id: 'display',
    eyebrow: 'LED-display',
    title: 'EXACT PERCENTAGE. ALTIJD.',
    description: 'LED-display met exact batterijpercentage. Geen 4-bars schatting — een nummer.',
    bullets: ['Exact percentage in één oogopslag', 'Leesbaar in donker én daglicht', 'In- en uitlaadstatus realtime'],
    image: '/images/titanx/gallery/v2/studio-gobo.webp',
    imageAlt: 'Titan X in daglicht, LED-display toont exact batterijpercentage',
    imagePos: 'object-[center_40%]',
    side: 'right' as const,
  },
  {
    id: 'multidevice',
    eyebrow: 'Multi-device',
    title: 'TOT 6 DEVICES TEGELIJK.',
    description: 'Smartphone, tablet, oordopjes, camera, laptop — alles tegelijk via 4× USB-A poorten plus 2 ingebouwde kabels (USB-C en Lightning).',
    bullets: ['Tot 6 apparaten tegelijkertijd', 'Ingebouwde USB-C + Lightning kabels', '50.000 mAh capaciteit'],
    image: '/images/titanx/gallery/v2/cables-cinematic.webp',
    imageAlt: 'Titan X met beide ingebouwde kabels uitgetrokken, cinematisch licht',
    imagePos: 'object-center',
    side: 'left' as const,
  },
  {
    id: 'strap',
    eyebrow: 'Draaglus',
    title: 'KLIK VAST. PAK MEE.',
    description: 'Oranje gevlochten draaglus met embossed "POWER BANK". Bevestigbaar aan rugzak, tas of riem.',
    bullets: ['Oranje gevlochten draaglus', 'Bevestigbaar aan rugzak of tas', 'Embossed wordmark'],
    image: '/images/titanx/gallery/v2/life-backpack.webp',
    imageAlt: 'Titan X met oranje draaglus geklikt aan een rugzak in de natuur',
    imagePos: 'object-[center_42%]',
    side: 'right' as const,
  },
];

function Stage({ stage, onBuy }: { stage: (typeof STAGES)[0]; onBuy: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.22 });
  const reduce = useReducedMotion();
  const imageLeft = stage.side === 'left';

  return (
    <div ref={ref} className="grid lg:grid-cols-5 gap-8 lg:gap-14 items-center">
      {/* Beeld — clip-path reveal */}
      <motion.div
        initial={reduce ? false : { clipPath: 'inset(8% 12% 8% 12% round 1.75rem)', opacity: 0.4 }}
        animate={
          inView || reduce
            ? { clipPath: 'inset(0% 0% 0% 0% round 1.75rem)', opacity: 1 }
            : undefined
        }
        transition={{ duration: 1, ease: EASE }}
        className={`relative lg:col-span-3 ${imageLeft ? 'lg:order-1' : 'lg:order-2'}`}
      >
        <div className="relative aspect-[4/3] lg:aspect-[16/11] overflow-hidden rounded-stage border border-white/[0.06]">
          <Image
            src={stage.image}
            alt={stage.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className={`object-cover ${stage.imagePos}`}
          />
        </div>
      </motion.div>

      {/* Tekst */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 28 }}
        animate={inView || reduce ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
        className={`lg:col-span-2 ${imageLeft ? 'lg:order-2' : 'lg:order-1'}`}
      >
        <span className="inline-flex items-center gap-3 mb-5">
          <span aria-hidden className="h-px w-6 bg-titan-accent/80" />
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/55">
            {stage.eyebrow}
          </span>
        </span>

        <h3
          className="font-display font-extrabold uppercase text-white leading-[0.94] tracking-[-0.03em] mb-5 [text-wrap:balance]"
          style={{ fontSize: 'clamp(1.9rem, 3.6vw, 3rem)' }}
        >
          {stage.title}
        </h3>

        <p className="font-body text-[#A0A0A0] text-base lg:text-lg leading-relaxed mb-7">
          {stage.description}
        </p>

        <ul className="space-y-3 mb-8">
          {stage.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <Check className="mt-1 w-4 h-4 flex-shrink-0 text-titan-accent" aria-hidden />
              <span className="font-body text-gray-300 text-base">{b}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={onBuy}
          className="group inline-flex items-center gap-2 font-body text-sm text-white/70 transition-colors hover:text-titan-accent"
        >
          <span className="underline underline-offset-4 decoration-white/30 group-hover:decoration-titan-accent/50">
            Bestel nu
          </span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </button>
      </motion.div>
    </div>
  );
}

export default function FeatureStages() {
  const { addToCart } = useEcwid();
  const onBuy = () => {
    if (LAUNCH_STATE.waitlistMode) {
      window.location.href = '#waitlist';
      return;
    }
    addToCart();
  };

  return (
    <section className="relative bg-titan-surface py-24 lg:py-36 overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 space-y-24 lg:space-y-36">
        {STAGES.map((stage) => (
          <Stage key={stage.id} stage={stage} onBuy={onBuy} />
        ))}
      </div>
    </section>
  );
}
