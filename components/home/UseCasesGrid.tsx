'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Eyebrow } from '@/components/home/primitives';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Beeldgedreven use-case mozaïek (cinematische "feature stages").
 * Foto's = goedgekeurde launch-set raws (geen product-hallucinaties), web-ready
 * webp in /images/titanx/gallery/. Variërende spans + aspect-ratio's geven het
 * ritme; tekst ligt als overlay op een donkere scrim onderin elk beeld.
 * Geen luchtvaart-scenario's (50.000 mAh > ICAO-cabinelimiet).
 */
const USE_CASES = [
  {
    title: 'Road trips',
    desc: 'Camera, telefoon en speakers blijven aan — één power bank voor de hele rit.',
    src: '/images/titanx/gallery/road-trips.webp',
    alt: 'Titan X in de cup-holder van een auto, nachtelijke stad op de achtergrond',
    span: 'lg:col-span-4',
    aspect: 'aspect-[4/5] sm:aspect-[16/10]',
    pos: 'object-center',
  },
  {
    title: 'Outdoor',
    desc: 'Aan je rugzak geklikt. GPS, camera en zaklamp als de zon ondergaat.',
    src: '/images/titanx/gallery/outdoor.webp',
    alt: 'Titan X met oranje draaglus geklikt aan een rugzak in de natuur',
    span: 'lg:col-span-2',
    aspect: 'aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto',
    pos: 'object-[center_42%]',
  },
  {
    title: 'Festivals & kamperen',
    desc: 'Drie dagen, nul zorgen. Iedereen laadt mee.',
    src: '/images/titanx/gallery/festivals.webp',
    alt: 'Titan X op een campingtafel in de avond',
    span: 'lg:col-span-2',
    aspect: 'aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5]',
    pos: 'object-[center_55%]',
  },
  {
    title: 'Creators & gaming',
    desc: 'Stream, game en maak content zonder onderbreking.',
    src: '/images/titanx/gallery/creators.webp',
    alt: 'Titan X op een bureau-setup met warm licht',
    span: 'lg:col-span-2',
    aspect: 'aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5]',
    pos: 'object-center',
  },
  {
    title: 'Werk & school',
    desc: 'Telefoon bijna leeg in de trein? Snellaad via de ingebouwde USB-C kabel.',
    src: '/images/titanx/gallery/werk.webp',
    alt: 'Titan X in een café',
    span: 'lg:col-span-2',
    aspect: 'aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5]',
    pos: 'object-center',
  },
  {
    title: 'Noodgevallen',
    desc: 'Stroomuitval of autopech — de zaklamp geeft licht, 50.000 mAh geeft je dagen.',
    src: '/images/titanx/gallery/nood.webp',
    alt: 'Titan X op een nachtkastje als noodstroom in huis',
    span: 'lg:col-span-6',
    aspect: 'aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/8]',
    pos: 'object-[center_58%]',
  },
] as const;

export default function UseCasesGrid() {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-[#0A0A0A] py-20 lg:py-32 overflow-hidden border-t border-white/[0.06]">
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-12 lg:mb-16 max-w-2xl">
          <Eyebrow className="mb-5">Waarvoor</Eyebrow>
          <h2
            className="font-display font-extrabold uppercase leading-[0.92] tracking-[-0.035em] text-white"
            style={{ fontSize: 'clamp(2.1rem, 5vw, 3.8rem)' }}
          >
            Gemaakt om
            <br />
            <span className="text-gradient-orange">mee te nemen.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 lg:gap-5">
          {USE_CASES.map((uc, i) => (
            <motion.article
              key={uc.title}
              initial={reduce ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: EASE }}
              className={`group relative overflow-hidden rounded-[1.75rem] border border-white/[0.06] bg-[#111111] ${uc.span}`}
            >
              <div className={`relative w-full h-full ${uc.aspect}`}>
                <Image
                  src={uc.src}
                  alt={uc.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={`object-cover ${uc.pos} transition-transform duration-[1400ms] ease-out group-hover:scale-[1.045]`}
                />
              </div>

              {/* scrim — leesbaarheid van de overlay-tekst */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%]"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.38) 45%, transparent 100%)',
                }}
              />

              {/* tekst-overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
                <h3 className="font-display text-xl lg:text-2xl font-extrabold uppercase tracking-[-0.02em] text-white leading-none mb-2">
                  {uc.title}
                </h3>
                <p className="font-body text-[#C9C9C9] text-sm leading-relaxed max-w-md">
                  {uc.desc}
                </p>
              </div>

              {/* warme rand bij hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[1.75rem] border border-[#FF8C00]/0 transition-colors duration-500 group-hover:border-[#FF8C00]/30"
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
