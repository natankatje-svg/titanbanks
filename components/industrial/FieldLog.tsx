'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { BRAND } from '@/lib/product-claims';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * FieldLog — use-cases als technisch logboek: genummerde rijen met hairlines;
 * de actieve rij (hover/tap) toont de bijbehorende goedgekeurde productfoto in
 * het preview-paneel rechts. Compleet ander patroon dan een card-grid.
 * Copy = bestaande use-case-strings; foto's = uitsluitend "Goede images".
 */
const ENTRIES = [
  {
    title: 'Road trips',
    desc: 'Camera, telefoon en speakers blijven aan — één power bank voor de hele rit.',
    src: '/images/titanx/gallery/v2/life-car.webp',
    alt: `${BRAND.product} in de cup-holder van een auto bij nacht`,
  },
  {
    title: 'Festivals',
    desc: 'Drie dagen, nul zorgen. Telefoon, oordopjes en camera blijven de hele tijd aan.',
    src: '/images/titanx/gallery/v2/life-festival.webp',
    alt: `${BRAND.product} op een festival in de avond`,
  },
  {
    title: 'Werk & school',
    desc: 'Telefoon bijna leeg in de trein? Snellaad via de ingebouwde USB-C kabel.',
    src: '/images/titanx/gallery/v2/life-train.webp',
    alt: `${BRAND.product} in de trein`,
  },
  {
    title: 'Outdoor',
    desc: 'GPS, camera en de ingebouwde zaklamp als back-up wanneer de zon ondergaat.',
    src: '/images/titanx/gallery/v2/life-backpack.webp',
    alt: `${BRAND.product} aan een rugzak in de natuur`,
  },
  {
    title: 'Noodgevallen',
    desc: 'Stroomuitval of autopech — de zaklamp geeft licht, 50.000 mAh geeft je dagen.',
    src: '/images/titanx/gallery/v2/energy-halo.webp',
    alt: `${BRAND.product} met gloeiende oranje lichtring`,
  },
] as const;

export default function FieldLog() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <section className="relative border-t border-white/[0.08] bg-[#080808] py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-10 lg:mb-14"
        >
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-titan-accent">
            Waarvoor
          </span>
          <h2 className="mt-3 font-display uppercase leading-[0.95] text-white" style={{ fontSize: 'clamp(2rem, 4.6vw, 3.6rem)' }}>
            Gemaakt om <span className="text-titan-accent">mee te nemen.</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* logboek-rijen */}
          <div className="lg:col-span-7">
            <div className="border-t border-white/[0.1]">
              {ENTRIES.map((e, i) => (
                <button
                  key={e.title}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`group block w-full border-b border-white/[0.1] py-5 text-left transition-colors lg:py-6 ${
                    active === i ? 'bg-titan-accent/[0.05]' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-baseline gap-4 px-1">
                    <span className={`font-mono text-[0.65rem] ${active === i ? 'text-titan-accent' : 'text-white/30'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className={`font-display text-lg uppercase tracking-wide transition-colors lg:text-2xl ${
                        active === i ? 'text-titan-accent' : 'text-white'
                      }`}>
                        {e.title}
                      </h3>
                      <p className="mt-1.5 max-w-xl font-body text-sm leading-relaxed text-[#9C9C9C]">
                        {e.desc}
                      </p>
                    </div>
                    <span className={`hidden font-mono text-[0.6rem] uppercase tracking-[0.14em] sm:block ${
                      active === i ? 'text-titan-accent' : 'text-white/25'
                    }`}>
                      {active === i ? '● LIVE' : '—'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* preview-paneel — wisselt mee met actieve rij */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <div className="relative aspect-[4/5] overflow-hidden border border-white/[0.1]">
                {ENTRIES.map((e, i) => (
                  <Image
                    key={e.src}
                    src={e.src}
                    alt={e.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 38vw"
                    className={`object-cover transition-opacity duration-300 ${
                      active === i ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/[0.1] bg-black/80 px-4 py-2.5 backdrop-blur-sm">
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/75">
                    {ENTRIES[active].title}
                  </span>
                  <span className="font-mono text-[0.58rem] text-titan-accent">
                    LOG {String(active + 1).padStart(2, '0')}/{String(ENTRIES.length).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
