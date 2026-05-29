import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import Hero from '@/components/heroes/HeroVariantB';
import TitanFeatureCarousel from '@/components/TitanFeatureCarousel';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import StickyBuyBar from '@/components/StickyBuyBar';
import { BRAND, capacityLabel } from '@/lib/product-claims';

export const metadata: Metadata = {
  title: `${BRAND.product} — ${capacityLabel()} power bank | ${BRAND.wordmark}`,
  description: `${capacityLabel()}. Eerste batch beperkt. ${BRAND.wordmark} Titan X premium power bank — bestel nu.`,
  alternates: { canonical: 'https://titan-banks.com/nl' },
};

/**
 * Homepage V3 — minimal one-pager voor maximale conversie op de eerste
 * batch (100 units). Eén product, één doel, één pad naar checkout.
 *
 * Sectie-volgorde bewust kort gehouden:
 *  1. Hero — alles boven de fold (cutout, prijs, CTA, scarcity badge)
 *  2. FAQ — top 4 vragen om laatste twijfels weg te nemen
 *  3. FinalCTA — herhaling van CTA voor wie scrolde maar nog niet kocht
 *  4. Footer + StickyBuyBar (sticky-on-scroll CTA blijft persistent zichtbaar)
 *
 * Verwijderd t.o.v. V2-homepage: TrustBar, UseCases, FeatureBento,
 * FeatureShowcaseCarousel, MoreProductsComingSoon. Die surfaces verkopen
 * niet meer aandacht dan ze opeisen voor een 100-unit-batch.
 */
export default function Home() {
  return (
    <main className="relative bg-[#0A0A0A] overflow-x-hidden">
      <JsonLd />
      <Navigation />
      <Hero />
      <TitanFeatureCarousel />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyBuyBar />
    </main>
  );
}
