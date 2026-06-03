'use client';

import { useTranslations } from 'next-intl';
import {
  FeatureCarousel,
  type Step,
  type ImageSet,
} from '@/components/ui/animated-feature-carousel';

/**
 * TitanFeatureCarousel — TitanBanks-specifieke wrapper rondom de animated
 * feature-carousel. Vier stappen tonen achtereen wat Titan X anders maakt:
 *
 *   1. Capaciteit (50.000 mAh)            — slot-02 cutout + capacity hero
 *   2. Multi-device (4× USB-A + kabels)   — ports top-down + lifestyle-auto
 *   3. Fast charge (22.5W)                — hero-warm-rim (cinematic warm)
 *   4. Build (matte black + zaklamp)      — usp-display-control (zaklamp aan)
 *
 * Auto-cycle elke 6 sec, klikbare step-pills voor manual advance, dark-
 * luxury theming via animated-feature-carousel (oranje accent in plaats
 * van de upstream sky-blue).
 *
 * Vervangt InContextScenes — beide secties hebben overlappende intent
 * (visuele showcase onder hero) maar de animated variant is dynamischer
 * en behoudt aandacht beter dan een statisch 2×2 grid.
 */
export default function TitanFeatureCarousel() {
  const t = useTranslations('feature_carousel');

  const steps: readonly Step[] = [
    {
      id: 'capacity',
      name: t('steps.capacity.name'),
      title: t('steps.capacity.title'),
      description: t('steps.capacity.description'),
    },
    {
      id: 'devices',
      name: t('steps.devices.name'),
      title: t('steps.devices.title'),
      description: t('steps.devices.description'),
    },
    {
      id: 'fastcharge',
      name: t('steps.fastcharge.name'),
      title: t('steps.fastcharge.title'),
      description: t('steps.fastcharge.description'),
    },
    {
      id: 'build',
      name: t('steps.build.name'),
      title: t('steps.build.title'),
      description: t('steps.build.description'),
    },
  ] as const;

  const image: ImageSet = {
    alt: t('image_alt'),
    // WebP-varianten: deze carousel rendert via een rauwe <img> (geen
    // next/image-optimalisatie), dus de bron moet zelf licht zijn. .webp
    // bespaart hier ~95% t.o.v. de PNG-bronnen (zie scripts/_optimize-images).
    // Step 1 — Capaciteit: cutout-product + spotlight hero
    step1img1: '/images/titanx/cutout/slot-02-cutout.webp',
    step1img2: '/images/titanx/clean/usp-capacity.webp',
    // Step 2 — Multi-device: ports top-down + lifestyle context
    step2img1: '/images/titanx/clean/usp-multi-device.webp',
    step2img2: '/images/titanx/clean/lifestyle-auto.webp',
    // Step 3 — Fast charge: cinematic warm-rim shot
    step3img: '/images/titanx/cutout/hero-warm-rim-cutout.webp',
    // Step 4 — Build quality + zaklamp: flashlight glow
    step4img: '/images/titanx/clean/usp-display-control.webp',
  };

  return (
    <section
      className="relative bg-[#070707] py-16 lg:py-24 overflow-hidden"
      aria-label={t('section_label')}
    >
      {/* Subtiele top-rule, consistent met andere V3 secties */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(255,107,0,0.35), transparent)',
        }}
        aria-hidden
      />

      <div className="relative max-w-5xl mx-auto px-4 lg:px-6">
        <FeatureCarousel steps={steps} image={image} interval={6000} />
      </div>
    </section>
  );
}
