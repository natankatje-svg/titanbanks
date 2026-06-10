'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Eyebrow } from '@/components/home/primitives';
import { BRAND } from '@/lib/product-claims';

const EASE = [0.16, 1, 0.3, 1] as const;

type PhotoTile = {
  kind: 'photo';
  title: string;
  desc?: string;
  src: string;
  alt: string;
  span: string;
  aspect: string;
  pos: string;
};
type TypoTile = {
  kind: 'typo';
  title: string;
  desc: string;
  span: string;
};
type Tile = PhotoTile | TypoTile;

/**
 * LifeMosaic — beeldgedreven use-case mozaïek met uitsluitend goedgekeurde
 * productfotografie. Copy = bestaande use-case-strings; de Noodgevallen-tegel
 * is bewust typografisch (geen goedgekeurd beeld voor die context = geen beeld).
 */
const TILES: Tile[] = [
  {
    kind: 'photo',
    title: 'Road trips',
    desc: 'Camera, telefoon en speakers blijven aan — één power bank voor de hele rit.',
    src: '/images/titanx/gallery/v2/life-car.webp',
    alt: `${BRAND.product} in de cup-holder van een auto, nachtelijke stad op de achtergrond`,
    span: 'lg:col-span-4',
    aspect: 'aspect-[4/5] sm:aspect-[16/10]',
    pos: 'object-center',
  },
  {
    kind: 'photo',
    title: 'Festivals',
    desc: 'Drie dagen, nul zorgen. Telefoon, oordopjes en camera blijven de hele tijd aan.',
    src: '/images/titanx/gallery/v2/life-festival.webp',
    alt: `${BRAND.product} op een festival in de avond`,
    span: 'lg:col-span-2',
    aspect: 'aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto',
    pos: 'object-[center_55%]',
  },
  {
    kind: 'photo',
    title: 'Werk & school',
    desc: 'Telefoon bijna leeg in de trein? Snellaad via de ingebouwde USB-C kabel.',
    src: '/images/titanx/gallery/v2/life-train.webp',
    alt: `${BRAND.product} in de trein`,
    span: 'lg:col-span-2',
    aspect: 'aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5]',
    pos: 'object-center',
  },
  {
    kind: 'photo',
    title: 'Outdoor',
    desc: 'GPS, camera en de ingebouwde zaklamp als back-up wanneer de zon ondergaat.',
    src: '/images/titanx/gallery/v2/life-ledge.webp',
    alt: `${BRAND.product} op een richel in de schemering`,
    span: 'lg:col-span-2',
    aspect: 'aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5]',
    pos: 'object-[center_50%]',
  },
  {
    kind: 'typo',
    title: 'Noodgevallen',
    desc: 'Stroomuitval of autopech — de zaklamp geeft licht, 50.000 mAh geeft je dagen.',
    span: 'lg:col-span-2',
  },
  {
    kind: 'photo',
    title: BRAND.tagline,
    src: '/images/titanx/gallery/v2/life-gym.webp',
    alt: `${BRAND.product} op een bank in de sportschool`,
    span: 'lg:col-span-6',
    aspect: 'aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/8]',
    pos: 'object-[center_55%]',
  },
];

export default function LifeMosaic() {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-titan-surface py-20 lg:py-32 overflow-hidden border-t border-white/[0.06]">
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
          {TILES.map((tile, i) => (
            <motion.article
              key={tile.title}
              initial={reduce ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: EASE }}
              className={`group relative overflow-hidden rounded-stage border border-white/[0.06] ${
                tile.kind === 'photo' ? 'bg-[#111111]' : 'bg-titan-card'
              } ${tile.span}`}
            >
              {tile.kind === 'photo' ? (
                <>
                  <div className={`relative w-full h-full ${tile.aspect}`}>
                    <Image
                      src={tile.src}
                      alt={tile.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className={`object-cover ${tile.pos} transition-transform duration-[1400ms] ease-out group-hover:scale-[1.045]`}
                    />
                  </div>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%]"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.38) 45%, transparent 100%)',
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
                    <h3 className="font-display text-xl lg:text-2xl font-extrabold uppercase tracking-[-0.02em] text-white leading-none mb-2">
                      {tile.title}
                    </h3>
                    {tile.desc && (
                      <p className="font-body text-[#C9C9C9] text-sm leading-relaxed max-w-md">
                        {tile.desc}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                /* Typografische tegel — Noodgevallen (bewust zonder beeld) */
                <div className="relative flex h-full min-h-[260px] flex-col justify-between p-6 lg:p-7">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
                    style={{
                      background:
                        'radial-gradient(ellipse 90% 100% at 50% 110%, rgba(255,140,0,0.1) 0%, transparent 65%)',
                    }}
                  />
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-titan-accent">
                    Ingebouwde zaklamp
                  </span>
                  <div className="relative">
                    <h3 className="font-display text-xl lg:text-2xl font-extrabold uppercase tracking-[-0.02em] text-white leading-none mb-2">
                      {tile.title}
                    </h3>
                    <p className="font-body text-[#C9C9C9] text-sm leading-relaxed">{tile.desc}</p>
                  </div>
                </div>
              )}

              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-stage border border-titan-accent/0 transition-colors duration-500 group-hover:border-titan-accent/30"
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
