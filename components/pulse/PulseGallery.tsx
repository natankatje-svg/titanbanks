'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from '@/components/ui/carousel';
import { BRAND, SPECS, capacityLabel, portsLabelCompact } from '@/lib/product-claims';
import Kicker from '@/components/pulse/Kicker';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * PulseGallery — volwaardige productgalerij op de homepage (vervangt de
 * 4-cards TiltGallery nu /shop weg is): grote embla-viewer + klikbare
 * thumbnail-strip, gesynct via de carousel-api. Captions = bestaande
 * spec-taal uit de claims-SSOT. Geen tilt op de viewer (botst met
 * embla-drag); glare via .card-shine.
 */
const SLIDES = [
  {
    src: '/images/titanx/gallery/v2/studio-orangegel.webp',
    alt: `${BRAND.product} in warm oranje gel-licht — matte black ${capacityLabel()} power bank`,
    caption: `${BRAND.product} — ${SPECS.finish.value}`,  },
  {
    src: '/images/titanx/gallery/v2/studio-marble.webp',
    alt: `${BRAND.product} op marmer, premium studiolicht`,
    caption: SPECS.finish.value,  },
  {
    src: '/images/titanx/gallery/v2/studio-gobo.webp',
    alt: `${BRAND.product} in daglicht, LED-display zichtbaar`,
    caption: 'LED-display',  },
  {
    src: '/images/titanx/gallery/v2/studio-ports-dark.webp',
    alt: `${BRAND.product} — 4× USB-A poorten plus ingebouwde kabels, top-down`,
    caption: portsLabelCompact(),  },
  {
    src: '/images/titanx/gallery/v2/cables-cinematic.webp',
    alt: `${BRAND.product} met beide ingebouwde kabels uitgetrokken`,
    caption: 'Ingebouwde kabels',  },
  {
    src: '/images/titanx/gallery/v2/studio-slab.webp',
    alt: `${BRAND.product} op stenen plaat in warm licht`,
    caption: capacityLabel(),  },
  {
    src: '/images/titanx/gallery/v2/life-backpack.webp',
    alt: `${BRAND.product} met draaglus aan een rugzak`,
    caption: 'Draaglus',  },
  {
    src: '/images/titanx/gallery/v2/studio-frostedacrylic.webp',
    alt: `${BRAND.product} op frosted acryl`,
    caption: `${BRAND.wordmark} · ${BRAND.product}`,  },
] as const;

export default function PulseGallery() {
  const reduce = useReducedMotion();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback((a: NonNullable<CarouselApi>) => {
    setCurrent(a.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api, onSelect]);

  return (
    <section className="relative border-t border-white/[0.07] bg-[#080808] py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mb-10 flex flex-col gap-4 lg:mb-12 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <Kicker>Ons product</Kicker>
            <h2 className="mt-3 font-display uppercase leading-[1.05] text-white" style={{ fontSize: 'clamp(1.8rem, 3.8vw, 3rem)' }}>
              Eén powerbank. <span className="text-titan-accent">Geen compromis.</span>
            </h2>
          </div>
          <p className="max-w-md font-body text-base leading-relaxed text-[#9C9C9C] lg:text-right">
            {capacityLabel()} in matte black. Laadt tot {SPECS.simultaneousDevices.value} apparaten
            tegelijk, met ingebouwde USB-C en Lightning kabels, LED-display en zaklamp.
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-[1100px]"
        >
          {/* viewer */}
          <div className="card-shine overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0C0C0C]">
            <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
              <CarouselContent>
                {SLIDES.map((s) => (
                  <CarouselItem key={s.src}>
                    {/* contain-stage: de hele foto altijd zichtbaar, nooit afgesneden */}
                    <div className="relative aspect-[4/5] sm:aspect-[4/3]">
                      <div
                        aria-hidden
                        className="absolute inset-0"
                        style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 45%, rgba(255,140,0,0.06), transparent 70%)' }}
                      />
                      <Image
                        src={s.src}
                        alt={s.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 1100px"
                        className="object-contain p-3 sm:p-4"
                      />
                      <span className="absolute bottom-3 left-4 rounded bg-black/55 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/85 backdrop-blur-sm">
                        {s.caption}
                      </span>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute bottom-4 right-4 flex gap-2">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          </div>

          {/* thumbnail-strip */}
          <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-8">
            {SLIDES.map((s, i) => (
              <button
                key={s.src}
                onClick={() => api?.scrollTo(i)}
                aria-label={`Toon foto ${i + 1}`}
                className={`relative aspect-square overflow-hidden rounded-lg border transition-colors ${
                  current === i
                    ? 'border-titan-accent/70'
                    : 'border-white/[0.07] hover:border-white/25'
                }`}
              >
                <Image src={s.src} alt="" fill sizes="(max-width: 640px) 22vw, 130px" className="object-cover" />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
