'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from '@/components/ui/carousel';
import { BRAND, capacityLabel } from '@/lib/product-claims';

/**
 * ShopGallery — PDP-galerij uit de goedgekeurde launch-set: embla-hoofdslider
 * + klikbare thumbnail-strip (gesynct via de carousel-api). Studio eerst,
 * daarna kabels/energie/lifestyle.
 */
const IMAGES = [
  { src: '/images/titanx/gallery/v2/studio-orangegel.webp', alt: `${BRAND.product} in warm oranje gel-licht — matte black ${capacityLabel()} power bank` },
  { src: '/images/titanx/gallery/v2/studio-marble.webp', alt: `${BRAND.product} op marmer, premium studiolicht` },
  { src: '/images/titanx/gallery/v2/studio-gobo.webp', alt: `${BRAND.product} in daglicht, LED-display zichtbaar` },
  { src: '/images/titanx/gallery/v2/studio-ports-dark.webp', alt: `${BRAND.product} — 4× USB-A poorten plus ingebouwde kabels, top-down` },
  { src: '/images/titanx/gallery/v2/cables-cinematic.webp', alt: `${BRAND.product} met beide ingebouwde kabels uitgetrokken` },
  { src: '/images/titanx/gallery/v2/studio-slab.webp', alt: `${BRAND.product} op stenen plaat in warm licht` },
  { src: '/images/titanx/gallery/v2/energy-halo.webp', alt: `${BRAND.product} met gloeiende oranje lichtring` },
  { src: '/images/titanx/gallery/v2/life-backpack.webp', alt: `${BRAND.product} met draaglus aan een rugzak` },
  { src: '/images/titanx/gallery/v2/life-car.webp', alt: `${BRAND.product} in de cup-holder van een auto` },
  { src: '/images/titanx/gallery/v2/studio-frostedacrylic.webp', alt: `${BRAND.product} op frosted acryl` },
] as const;

export default function ShopGallery() {
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
    <div>
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {IMAGES.map((img, i) => (
            <CarouselItem key={img.src}>
              <div className="relative aspect-[4/5] sm:aspect-square overflow-hidden rounded-stage border border-white/[0.07] bg-[#111111]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-4 right-4 flex gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>

      {/* Thumbnail-strip */}
      <div className="mt-3 grid grid-cols-5 gap-2">
        {IMAGES.slice(0, 10).map((img, i) => (
          <button
            key={img.src}
            onClick={() => api?.scrollTo(i)}
            aria-label={`Toon foto ${i + 1}`}
            className={`relative aspect-square overflow-hidden rounded-lg border transition-colors ${
              current === i
                ? 'border-titan-accent/70'
                : 'border-white/[0.07] hover:border-white/25'
            }`}
          >
            <Image src={img.src} alt="" fill sizes="10vw" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
