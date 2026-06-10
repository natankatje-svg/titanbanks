import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import MaisonNav from '@/components/atelier/MaisonNav';
import CoverHero from '@/components/atelier/CoverHero';
import EditorialSpread from '@/components/atelier/EditorialSpread';
import AtelierNumbers from '@/components/atelier/AtelierNumbers';
import LookBook from '@/components/atelier/LookBook';
import Colophon from '@/components/atelier/Colophon';
import FAQ from '@/components/FAQ';
import AcquireFinale from '@/components/atelier/AcquireFinale';
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
 * Homepage — build/atelier "ATELIER NOIR": dark-luxury editorial in
 * fashion-campagnestijl. Bodoni Moda (Didone, italic accenten) + Hanken
 * Grotesk; maison-nav met gecentreerd logo; campagne-cover met het
 * halo-juweel; look-book-platen; colofon-specs; couture-finale.
 * Copy/claims/logo identiek; productbeelden uit de goedgekeurde set.
 */
export default function Home() {
  return (
    // GEEN overflow-x-hidden op main (breekt position:sticky); body clipt op X.
    <main className="relative bg-titan-bg">
      <JsonLd />
      <MaisonNav />
      <CoverHero />
      <EditorialSpread />
      <AtelierNumbers />
      <LookBook />
      <Colophon />
      <FAQ />
      <AcquireFinale />
      <Footer />
      <StickyBuyBar />
    </main>
  );
}
