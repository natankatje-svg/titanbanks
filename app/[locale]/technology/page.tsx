import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import JsonLd from '@/components/JsonLd';
import PageShell from '@/components/pulse/PageShell';
import FeatureRows, { type FeatureRow } from '@/components/pulse/FeatureRows';
import SpecsPulse from '@/components/pulse/SpecsPulse';
import { BRAND } from '@/lib/product-claims';
import { buildPageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

// Per-locale SEO-copy. Keywords: "powerbank 50.000 mAh", "usb-c powerbank",
// "powerbank met ingebouwde kabels" — claims komen uit de SSOT-teksten.
const META: Record<string, { title: string; description: string }> = {
  nl: {
    title: 'Technologie — powerbank 50.000 mAh met ingebouwde kabels | TITANBANKS',
    description:
      'De techniek achter de Titan X: 50.000 mAh capaciteit, 4× USB-A plus ingebouwde USB-C en Lightning kabels, LED-display met exact percentage en zaklamp.',
  },
  en: {
    title: 'Technology — 50,000 mAh power bank with built-in cables | TITANBANKS',
    description:
      'The engineering behind the Titan X: 50,000 mAh capacity, 4× USB-A plus built-in USB-C and Lightning cables, LED display with exact percentage and flashlight.',
  },
  de: {
    title: 'Technologie — 50.000 mAh Powerbank mit integrierten Kabeln | TITANBANKS',
    description:
      'Die Technik hinter der Titan X: 50.000 mAh Kapazität, 4× USB-A plus integrierte USB-C- und Lightning-Kabel, LED-Display mit exaktem Prozentwert und Taschenlampe.',
  },
};

const HERO: Record<string, { kicker: string; title: string; accent: string; intro: string; band: { title: string; accent: string } }> = {
  nl: {
    kicker: 'Technologie',
    title: 'De techniek achter',
    accent: '50.000 mAh.',
    intro:
      'Geen marketing-fantasie — alleen wat erin zit. Dit is hoe de Titan X powerbank dagenlang stroom levert aan zes apparaten tegelijk.',
    band: { title: 'Overtuigd door', accent: 'de techniek?' },
  },
  en: {
    kicker: 'Technology',
    title: 'The engineering behind',
    accent: '50,000 mAh.',
    intro:
      'No marketing fiction — just what is inside. This is how the Titan X power bank keeps six devices charged for days.',
    band: { title: 'Convinced by', accent: 'the engineering?' },
  },
  de: {
    kicker: 'Technologie',
    title: 'Die Technik hinter',
    accent: '50.000 mAh.',
    intro:
      'Keine Marketing-Fantasie — nur, was drin ist. So versorgt die Titan X Powerbank tagelang sechs Geräte gleichzeitig mit Strom.',
    band: { title: 'Überzeugt von', accent: 'der Technik?' },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = META[locale] ?? META.nl;
  return buildPageMetadata({ locale, path: 'technology', ...copy });
}

export default async function TechnologyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'feature_bento' });
  const hero = HERO[locale] ?? HERO.nl;

  const rows: FeatureRow[] = [
    {
      kicker: t('cards.capacity.eyebrow'),
      title: t('cards.capacity.title'),
      body: t('cards.capacity.body'),
      img: '/images/titanx/gallery/v2/studio-slab.webp',
      alt: `${BRAND.product} — 50.000 mAh power bank op stenen plaat in warm licht`,
    },
    {
      kicker: t('cards.devices.eyebrow'),
      title: t('cards.devices.title'),
      body: t('cards.devices.body'),
      img: '/images/titanx/gallery/v2/studio-ports-dark.webp',
      alt: `${BRAND.product} — 4× USB-A poorten plus ingebouwde kabels, top-down`,
    },
    {
      kicker: t('cards.ports.eyebrow'),
      title: t('cards.ports.title'),
      body: t('cards.ports.body'),
      img: '/images/titanx/gallery/v2/cables-cinematic.webp',
      alt: `${BRAND.product} — ingebouwde USB-C en Lightning kabels uitgetrokken`,
    },
    {
      kicker: t('cards.flashlight.eyebrow'),
      title: t('cards.flashlight.title'),
      body: t('cards.flashlight.body'),
      img: '/images/titanx/gallery/v2/studio-gobo.webp',
      alt: `${BRAND.product} — LED-display met exact percentage in daglicht`,
    },
    {
      kicker: t('cards.design.eyebrow'),
      title: t('cards.design.title'),
      body: t('cards.design.body'),
      img: '/images/titanx/gallery/v2/life-backpack.webp',
      alt: `${BRAND.product} — matte black power bank met draaglus aan een rugzak`,
    },
  ];

  return (
    <PageShell
      kicker={hero.kicker}
      title={hero.title}
      accent={hero.accent}
      intro={hero.intro}
      orderBand={hero.band}
    >
      <JsonLd />
      <FeatureRows rows={rows} />
      <SpecsPulse />
    </PageShell>
  );
}
