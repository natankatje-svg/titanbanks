'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { Eyebrow } from '@/components/home/primitives';
import { useEcwid } from '@/components/EcwidProvider';
import {
  BRAND,
  SPECS,
  LAUNCH_STATE,
  capacityLabel,
  portsLabelCompact,
  priceLabel,
} from '@/lib/product-claims';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * GalleryRail — het object als museumvitrine: horizontale embla-rail met de
 * goedgekeurde studiofotografie, mono-captions uit de bestaande spec-taal.
 * Vervangt ProductSpotlight; de productinfo + prijs + CTA staan in de header.
 */
const SLIDES = [
  {
    src: '/images/titanx/gallery/v2/studio-orangegel.webp',
    alt: `${BRAND.product} in warm oranje gel-licht`,
    caption: `${BRAND.product} — ${SPECS.finish.value}`,
  },
  {
    src: '/images/titanx/gallery/v2/studio-marble.webp',
    alt: `${BRAND.product} op marmer, premium studiolicht`,
    caption: 'Premium build',
  },
  {
    src: '/images/titanx/gallery/v2/studio-slab.webp',
    alt: `${BRAND.product} op stenen plaat in warm licht`,
    caption: capacityLabel(),
  },
  {
    src: '/images/titanx/gallery/v2/studio-frostedacrylic.webp',
    alt: `${BRAND.product} op frosted acryl`,
    caption: BRAND.tagline,
  },
  {
    src: '/images/titanx/gallery/v2/studio-gobo.webp',
    alt: `${BRAND.product} in daglicht met lamellen-schaduw, LED-display zichtbaar`,
    caption: 'LED-display',
  },
  {
    src: '/images/titanx/gallery/v2/studio-ports-dark.webp',
    alt: `${BRAND.product} poortencluster top-down`,
    caption: portsLabelCompact(),
  },
] as const;

export default function GalleryRail() {
  const reduce = useReducedMotion();
  const { addToCart } = useEcwid();
  const price = priceLabel();
  const isWaitlist = LAUNCH_STATE.waitlistMode;

  return (
    <section className="relative bg-black py-20 lg:py-32 overflow-hidden border-t border-white/[0.07]">
      <div className="relative max-w-7xl mx-auto px-6 mb-10 lg:mb-14">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-end">
          <div>
            <Eyebrow className="mb-5">Ons product</Eyebrow>
            <h2
              className="font-display font-extrabold uppercase leading-[0.92] tracking-[-0.035em] text-white [text-wrap:balance]"
              style={{ fontSize: 'clamp(2.1rem, 5vw, 3.8rem)' }}
            >
              Eén powerbank.
              <br />
              <span className="text-gradient-orange">Geen compromis.</span>
            </h2>
          </div>
          <div className="lg:justify-self-end lg:text-right">
            <p className="font-body text-[#A0A0A0] text-base leading-relaxed max-w-md mb-5 lg:ml-auto">
              {capacityLabel()} in matte black. Laadt tot {SPECS.simultaneousDevices.value} apparaten
              tegelijk, met ingebouwde USB-C en Lightning kabels, LED-display en zaklamp. Gebouwd om
              mee te nemen.
            </p>
            <div className="flex flex-wrap items-center gap-4 lg:justify-end">
              {price && (
                <span className="font-display font-extrabold text-white text-2xl leading-none">{price}</span>
              )}
              <button
                onClick={() => (isWaitlist ? (window.location.href = '#waitlist') : addToCart())}
                className="btn-orange group"
                style={{ padding: '0.8rem 1.6rem', fontSize: '0.88rem' }}
              >
                <span>Bestel nu</span>
                <ArrowRight className="w-[14px] h-[14px] transition-transform group-hover:translate-x-0.5" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* De rail — bleed tot de viewport-rand rechts voor het galerie-gevoel */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative pl-6 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
      >
        <Carousel opts={{ align: 'start', dragFree: true }} className="w-full">
          <CarouselContent className="-ml-4 lg:-ml-5">
            {SLIDES.map((s, i) => (
              <CarouselItem
                key={s.src}
                className="pl-4 lg:pl-5 basis-[78%] sm:basis-[46%] lg:basis-[31%]"
              >
                <figure className="group relative overflow-hidden rounded-stage border border-white/[0.07] bg-[#111111]">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 31vw"
                      className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                      loading={i < 2 ? 'eager' : 'lazy'}
                    />
                  </div>
                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between px-5 py-4"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72), transparent)' }}
                  >
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/75">
                      {s.caption}
                    </span>
                    <span className="font-mono text-[0.62rem] text-white/35">
                      {String(i + 1).padStart(2, '0')}/{String(SLIDES.length).padStart(2, '0')}
                    </span>
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex items-center gap-3 pr-6">
            <CarouselPrevious />
            <CarouselNext />
            <span className="ml-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/35 hidden sm:inline">
              Sleep of scroll
            </span>
          </div>
        </Carousel>
      </motion.div>
    </section>
  );
}
