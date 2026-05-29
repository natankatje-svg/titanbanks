'use client';

import { useTranslations } from 'next-intl';
import { FeatureCarousel, type CarouselStep } from '@/components/ui/feature-carousel';

interface FeatureShowcaseCarouselProps {
  /** Compacte mode voor mobile-in-hero. Default false (volle desktop sectie). */
  compact?: boolean;
  /** Unique idPrefix wanneer er meerdere instances op één pagina staan
   *  (mobile-hero + desktop-section gebruiken dezelfde data). */
  idPrefix?: string;
  className?: string;
}

/**
 * FeatureShowcaseCarousel — TitanBanks-specifieke wrapper rondom de generieke
 * FeatureCarousel. Definieert de 4 productfeatures, koppelt copy aan i18n
 * en mappt elke step aan een transparante cutout-PNG zodat het product
 * mooi tegen de dark-gradient card-achtergrond blendt.
 *
 * Wordt op twee plekken gebruikt:
 *   - mobile-hero (compact prop) — vervangt de statische cutout-laag
 *   - desktop homepage — eigen sectie onder de hero, full-size showcase
 */
export default function FeatureShowcaseCarousel({
  compact = false,
  idPrefix = 'features',
  className,
}: FeatureShowcaseCarouselProps) {
  const t = useTranslations('hero.carousel');

  const steps: CarouselStep[] = [
    {
      id: 'capacity',
      name: t('steps.capacity.name'),
      title: t('steps.capacity.title'),
      description: t('steps.capacity.description'),
      image: '/images/titanx/cutout/slot-02-cutout.png',
      alt: t('steps.capacity.alt'),
    },
    {
      id: 'lifestyle',
      name: t('steps.lifestyle.name'),
      title: t('steps.lifestyle.title'),
      description: t('steps.lifestyle.description'),
      image: '/images/titanx/cutout/slot-05-cutout.png',
      alt: t('steps.lifestyle.alt'),
    },
    {
      id: 'build',
      name: t('steps.build.name'),
      title: t('steps.build.title'),
      description: t('steps.build.description'),
      image: '/images/titanx/cutout/slot-03-cutout.png',
      alt: t('steps.build.alt'),
    },
    {
      id: 'benefits',
      name: t('steps.benefits.name'),
      title: t('steps.benefits.title'),
      description: t('steps.benefits.description'),
      image: '/images/titanx/cutout/slot-09-cutout.png',
      alt: t('steps.benefits.alt'),
    },
  ];

  return (
    <FeatureCarousel
      steps={steps}
      compact={compact}
      idPrefix={idPrefix}
      className={className}
    />
  );
}
