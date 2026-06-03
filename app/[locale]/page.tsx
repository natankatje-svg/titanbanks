import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import Hero from '@/components/heroes/HeroVariantB';
import ProductSpotlight from '@/components/home/ProductSpotlight';
import WhatsInside from '@/components/home/WhatsInside';
import UseCasesGrid from '@/components/home/UseCasesGrid';
import FAQ from '@/components/FAQ';
import FinalDrop from '@/components/home/FinalDrop';
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
 * Homepage V4 — landingpage in de Gigi-template-STIJL (layout, compositie,
 * pills, 2-regelige koppen, 4-koloms stat-strip, hover-fill cards, watermarks),
 * vertaald naar TitanBanks dark silent-luxury (#0A0A0A + oranje #FF6B00 +
 * Manrope). Buy-now via Ecwid; alle claims via lib/product-claims SSOT.
 *
 * Sectie-flow (mapt op de template, secties in `components/home/`):
 *  1. Navigation       — sticky header
 *  2. Hero             — split: 2-regelige kop + pill-CTA's + benefit-pills + product
 *  3. ProductSpotlight — "Choose your fuel": product + feature-chips + Bestel
 *  4. WhatsInside      — "Formula & Benefits": 4-koloms stat-strip + watermark
 *  5. UseCasesGrid     — "Activations": hover-fill use-case cards
 *  6. FAQ              — laatste twijfels wegnemen
 *  7. FinalDrop        — "Ready to level up": grote koop-CTA-band
 *  8. Footer + StickyBuyBar — persistente koop-CTA
 *
 * Bewust NIET overgenomen: de Instagram-feed met like-counts (pre-launch geen
 * echte metrics; verzonnen aantallen zijn verboden).
 */
export default function Home() {
  return (
    <main className="relative bg-[#0A0A0A] overflow-x-hidden">
      <JsonLd />
      <Navigation />
      <Hero />
      <ProductSpotlight />
      <WhatsInside />
      <UseCasesGrid />
      <FAQ />
      <FinalDrop />
      <Footer />
      <StickyBuyBar />
    </main>
  );
}
