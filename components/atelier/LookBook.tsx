'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useEcwid } from '@/components/EcwidProvider';
import { BRAND, LAUNCH_STATE } from '@/lib/product-claims';

const EASE = [0.25, 1, 0.5, 1] as const;

type Plate = {
  src: string;
  alt: string;
  caption: string;
  body: string;
  layout: 'wide' | 'portrait-right' | 'portrait-left';
};

/**
 * LookBook — campagneplaten in magazine-ritme: breed / portret-rechts /
 * portret-links, met italic Bodoni-captions (bestaande use-case-copy) en
 * een stille bestel-link per plaat. Uitsluitend goedgekeurde fotografie.
 */
const PLATES: Plate[] = [
  {
    src: '/images/titanx/gallery/v2/life-car.webp',
    alt: `${BRAND.product} in de cup-holder van een auto bij nacht`,
    caption: 'Road trips',
    body: 'Camera, telefoon en speakers blijven aan — één power bank voor de hele rit.',
    layout: 'wide',
  },
  {
    src: '/images/titanx/gallery/v2/life-backpack.webp',
    alt: `${BRAND.product} aan een rugzak in de natuur`,
    caption: 'Outdoor',
    body: 'GPS, camera en de ingebouwde zaklamp als back-up wanneer de zon ondergaat.',
    layout: 'portrait-right',
  },
  {
    src: '/images/titanx/gallery/v2/life-festival.webp',
    alt: `${BRAND.product} op een festival in de avond`,
    caption: 'Festivals',
    body: 'Drie dagen, nul zorgen. Telefoon, oordopjes en camera blijven de hele tijd aan.',
    layout: 'portrait-left',
  },
  {
    src: '/images/titanx/gallery/v2/studio-gobo.webp',
    alt: `${BRAND.product} in daglicht, LED-display zichtbaar`,
    caption: 'Exact percentage. Altijd.',
    body: 'LED-display met exact batterijpercentage. Geen 4-bars schatting — een nummer.',
    layout: 'wide',
  },
];

function PlateView({ plate, index, onBuy }: { plate: Plate; index: number; onBuy: () => void }) {
  const reduce = useReducedMotion();
  const numeral = `Nº ${index + 1}`;

  const captionBlock = (
    <div className="flex flex-col justify-end">
      <span className="font-body text-[0.62rem] uppercase tracking-[0.3em] text-white/40">{numeral}</span>
      <h3 className="mt-3 font-display text-3xl italic leading-tight text-white lg:text-4xl">
        {plate.caption}
      </h3>
      <p className="mt-4 max-w-sm font-body text-sm leading-[1.8] text-[#9C9C9C]">{plate.body}</p>
      <button onClick={onBuy} className="link-hairline mt-6 self-start">
        Bestel nu
      </button>
    </div>
  );

  if (plate.layout === 'wide') {
    return (
      <motion.figure
        initial={reduce ? false : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <div className="relative aspect-[4/5] sm:aspect-[21/10]">
          <Image src={plate.src} alt={plate.alt} fill sizes="100vw" className="object-cover object-[center_55%]" />
        </div>
        <figcaption className="mx-auto mt-6 grid max-w-[1440px] gap-2 px-0 lg:grid-cols-2">
          <h3 className="font-display text-3xl italic leading-tight text-white lg:text-4xl">
            <span className="mr-4 align-middle font-body text-[0.62rem] not-italic uppercase tracking-[0.3em] text-white/40">{numeral}</span>
            {plate.caption}
          </h3>
          <div className="lg:justify-self-end lg:text-right">
            <p className="max-w-md font-body text-sm leading-[1.8] text-[#9C9C9C] lg:ml-auto">{plate.body}</p>
            <button onClick={onBuy} className="link-hairline mt-4">
              Bestel nu
            </button>
          </div>
        </figcaption>
      </motion.figure>
    );
  }

  const portraitRight = plate.layout === 'portrait-right';
  return (
    <motion.figure
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="grid items-end gap-8 lg:grid-cols-12"
    >
      <div className={`relative aspect-[4/5] lg:col-span-6 ${portraitRight ? 'lg:order-2 lg:col-start-7' : 'lg:order-1'}`}>
        <Image src={plate.src} alt={plate.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
      </div>
      <div className={`lg:col-span-4 ${portraitRight ? 'lg:order-1 lg:col-start-2' : 'lg:order-2 lg:col-start-8'}`}>
        {captionBlock}
      </div>
    </motion.figure>
  );
}

export default function LookBook() {
  const { addToCart } = useEcwid();
  const onBuy = () => {
    if (LAUNCH_STATE.waitlistMode) {
      window.location.href = '#waitlist';
      return;
    }
    addToCart();
  };

  return (
    <section className="relative border-t border-white/[0.08] bg-[#080808] py-20 lg:py-32">
      <div className="mx-auto max-w-[1440px] space-y-20 px-6 lg:space-y-32 lg:px-10">
        <div className="text-center">
          <span className="font-body text-[0.66rem] uppercase tracking-[0.3em] text-white/55">Waarvoor</span>
          <h2 className="mt-4 font-display leading-[1.05] text-white" style={{ fontSize: 'clamp(2.2rem, 4.4vw, 4rem)' }}>
            Gemaakt om <em className="italic text-titan-accent">mee te nemen.</em>
          </h2>
        </div>
        {PLATES.map((p, i) => (
          <PlateView key={p.src} plate={p} index={i} onBuy={onBuy} />
        ))}
      </div>
    </section>
  );
}
