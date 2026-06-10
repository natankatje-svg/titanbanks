'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface SliderImage {
  src: string;
  alt: string;
}

interface ImageSliderProps {
  images: SliderImage[];
  /** Toon thumbnails-strip onder de slider (default true) */
  withThumbnails?: boolean;
  /** Aspect ratio van slides — default 4:3 */
  aspectRatio?: '4/3' | '1/1' | '16/9' | '3/2';
  /** Loop oneindig door (default true) */
  loop?: boolean;
  /** Auto-advance interval in ms; 0 = uit (default 0) */
  autoplayMs?: number;
  className?: string;
}

const ASPECT_CLASS: Record<NonNullable<ImageSliderProps['aspectRatio']>, string> = {
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
  '16/9': 'aspect-video',
  '3/2': 'aspect-[3/2]',
};

export default function ImageSlider({
  images,
  withThumbnails = true,
  aspectRatio = '4/3',
  loop = true,
  autoplayMs = 0,
  className = '',
}: ImageSliderProps) {
  const [mainRef, mainApi] = useEmblaCarousel({ loop, align: 'start' });
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const [selected, setSelected] = useState(0);

  const onThumbClick = useCallback(
    (i: number) => {
      if (!mainApi || !thumbApi) return;
      mainApi.scrollTo(i);
    },
    [mainApi, thumbApi]
  );

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbApi) return;
    const idx = mainApi.selectedScrollSnap();
    setSelected(idx);
    thumbApi.scrollTo(idx);
  }, [mainApi, thumbApi]);

  useEffect(() => {
    if (!mainApi) return;
    onSelect();
    mainApi.on('select', onSelect).on('reInit', onSelect);
  }, [mainApi, onSelect]);

  useEffect(() => {
    if (!mainApi || autoplayMs <= 0) return;
    const id = setInterval(() => mainApi.scrollNext(), autoplayMs);
    return () => clearInterval(id);
  }, [mainApi, autoplayMs]);

  const prev = () => mainApi?.scrollPrev();
  const next = () => mainApi?.scrollNext();

  if (images.length === 0) return null;

  return (
    <div className={`relative ${className}`}>
      {/* Main slider */}
      <div className="overflow-hidden rounded-2xl" ref={mainRef}>
        <div className="flex">
          {images.map((img, i) => (
            <div
              key={`${img.src}-${i}`}
              className={`flex-[0_0_100%] min-w-0 ${ASPECT_CLASS[aspectRatio]} relative bg-[#0A0A0A]`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-contain"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows (desktop, hidden on mobile) */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous"
            className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center text-white transition-all hover:scale-105"
            style={{
              background: 'rgba(12,12,12,0.7)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center text-white transition-all hover:scale-105"
            style={{
              background: 'rgba(12,12,12,0.7)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Thumbnails strip */}
      {withThumbnails && images.length > 1 && (
        <div className="mt-3 overflow-hidden" ref={thumbRef}>
          <div className="flex gap-2">
            {images.map((img, i) => (
              <button
                key={`thumb-${img.src}-${i}`}
                onClick={() => onThumbClick(i)}
                aria-label={`Slide ${i + 1}`}
                className={`flex-[0_0_72px] sm:flex-[0_0_88px] aspect-square relative rounded-lg overflow-hidden transition-all ${
                  selected === i
                    ? 'ring-2 ring-[#FF8C00] opacity-100'
                    : 'opacity-50 hover:opacity-80 ring-1 ring-white/10'
                }`}
              >
                <Image
                  src={img.src}
                  alt=""
                  fill
                  sizes="88px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Dots — alleen tonen als geen thumbnails-strip */}
      {!withThumbnails && images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={`dot-${i}`}
              onClick={() => onThumbClick(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                selected === i ? 'w-6 bg-[#FF8C00]' : 'w-1.5 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
