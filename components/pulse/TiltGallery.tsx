'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { TiltCard } from '@/components/pulse/motion';
import { BRAND, capacityLabel, portsLabelCompact, SPECS } from '@/lib/product-claims';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * TiltGallery — vier studioshots als interactieve 3D-tilt-cards met
 * glare-sweep en mono-captions (bestaande spec-taal).
 */
const SHOTS = [
  {
    src: '/images/titanx/gallery/v2/studio-orangegel.webp',
    alt: `${BRAND.product} in warm oranje gel-licht`,
    caption: `${BRAND.product} — ${SPECS.finish.value}`,
    pos: 'object-center',
  },
  {
    src: '/images/titanx/gallery/v2/studio-gobo.webp',
    alt: `${BRAND.product} in daglicht, LED-display zichtbaar`,
    caption: 'LED-display',
    pos: 'object-[center_40%]',
  },
  {
    src: '/images/titanx/gallery/v2/studio-ports-dark.webp',
    alt: `${BRAND.product} poortencluster top-down`,
    caption: portsLabelCompact(),
    pos: 'object-center',
  },
  {
    src: '/images/titanx/gallery/v2/cables-cinematic.webp',
    alt: `${BRAND.product} met beide ingebouwde kabels uitgetrokken`,
    caption: 'Ingebouwde kabels',
    pos: 'object-[center_45%]',
  },
] as const;

export default function TiltGallery() {
  const reduce = useReducedMotion();

  return (
    <section className="relative border-t border-white/[0.07] bg-[#080808] py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mb-10 flex flex-col gap-4 lg:mb-12 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <span className="font-mono text-[0.64rem] uppercase tracking-[0.24em] text-titan-accent">
              Ons product
            </span>
            <h2 className="mt-3 font-display uppercase leading-[1.05] text-white" style={{ fontSize: 'clamp(1.8rem, 3.8vw, 3rem)' }}>
              Eén powerbank. <span className="text-titan-accent">Geen compromis.</span>
            </h2>
          </div>
          <p className="max-w-md font-body text-base leading-relaxed text-[#9C9C9C] lg:text-right">
            {capacityLabel()} in matte black. Laadt tot {SPECS.simultaneousDevices.value} apparaten
            tegelijk, met ingebouwde USB-C en Lightning kabels, LED-display en zaklamp.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SHOTS.map((s, i) => (
            <motion.div
              key={s.src}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: EASE }}
            >
              {/* float op een eigen wrapper — botst anders met de framer-tilt-transform */}
              <div className="pulse-float-soft" style={{ ['--float-delay' as string]: `${i * 0.9}s` }}>
              <TiltCard className="overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0C0C0C]">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className={`object-cover ${s.pos}`}
                  />
                  <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }} />
                  <span className="absolute bottom-3.5 left-4 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/80">
                    {s.caption}
                  </span>
                </div>
              </TiltCard>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
