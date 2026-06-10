import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import Hero from '@/components/heroes/HeroVariantB';
import CapacityStatement from '@/components/home/CapacityStatement';
import GalleryRail from '@/components/home/GalleryRailLazy';
import FeatureStages from '@/components/home/FeatureStages';
import LifeMosaic from '@/components/home/LifeMosaic';
import SpecTable from '@/components/home/SpecTable';
import TrustWall from '@/components/home/TrustWall';
import FAQ from '@/components/FAQ';
import FinalStage from '@/components/home/FinalStage';
import StickyBuyBar from '@/components/StickyBuyBar';
import { buildPageMetadata } from '@/lib/seo';

// Per-locale homepage-copy. NL is primair; EN/DE eigen teksten zodat Google
// niet de NL-title voor alle locales toont (was de oude bug).
const HOME_META: Record<string, { title: string; description: string }> = {
  nl: {
    title: 'Titan X — 50.000 mAh power bank | TITANBANKS',
    description:
      '50.000 mAh. Tot 6 apparaten tegelijk laden. Matte black premium power bank van TITANBANKS — bestel nu.',
  },
  en: {
    title: 'Titan X — 50,000 mAh power bank | TITANBANKS',
    description:
      '50,000 mAh. Charge up to 6 devices at once. Matte black premium power bank by TITANBANKS — order now.',
  },
  de: {
    title: 'Titan X — 50.000 mAh Powerbank | TITANBANKS',
    description:
      '50.000 mAh. Bis zu 6 Geräte gleichzeitig laden. Mattschwarze Premium-Powerbank von TITANBANKS — jetzt bestellen.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = HOME_META[locale] ?? HOME_META.nl;
  return buildPageMetadata({ locale, path: '', ...copy });
}

/**
 * Homepage V5 — "DAGEN, GEEN UREN": drie-akten cinematic met conversie-spine
 * (Apple verleidt boven, Anker sluit onder). Alle productbeelden uit de
 * goedgekeurde launch-set; alle claims via lib/product-claims SSOT.
 *
 * AKTE 1 — verleiden:  Hero (embers, onder-links) → CapacityStatement (scrub)
 * AKTE 2 — bewijzen:   GalleryRail → FeatureStages → LifeMosaic
 * AKTE 3 — sluiten:    SpecTable → TrustWall → FAQ → FinalStage (mini-buybox)
 * Persistente conversie: pill-nav BESTEL + StickyBuyBar (mobiel).
 */
export default function Home() {
  return (
    // GEEN overflow-x-hidden op main: dat maakt main een scroll-container en
    // breekt position:sticky (CapacityStatement-pin). Body clipt al op X.
    <main className="relative bg-titan-surface">
      <JsonLd />
      <Navigation />
      <Hero />
      <CapacityStatement />
      <GalleryRail />
      <FeatureStages />
      <LifeMosaic />
      <SpecTable />
      <TrustWall />
      <FAQ />
      <FinalStage />
      <Footer />
      <StickyBuyBar />
    </main>
  );
}
