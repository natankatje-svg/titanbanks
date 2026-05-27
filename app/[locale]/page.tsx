import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import Hero from '@/components/heroes/HeroVariantB';
import TrustBar from '@/components/TrustBar';
import UseCases from '@/components/UseCases';
import FeatureBento from '@/components/FeatureBento';
import FeatureShowcaseCarousel from '@/components/FeatureShowcaseCarousel';
import MoreProductsComingSoon from '@/components/MoreProductsComingSoon';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import StickyBuyBar from '@/components/StickyBuyBar';
import { BRAND, capacityLabel } from '@/lib/product-claims';

export const metadata: Metadata = {
  title: `${BRAND.product} — ${capacityLabel()} power bank | ${BRAND.wordmark}`,
  description: `${capacityLabel()}. Zes devices tegelijk. Gebouwd voor wie niet kan stoppen. ${BRAND.wordmark} Titan X premium power bank.`,
  alternates: { canonical: 'https://titan-banks.com/nl' },
};

export default function Home() {
  return (
    <main className="relative bg-[#0A0A0A] overflow-x-hidden">
      <JsonLd />
      <Navigation />
      <Hero />

      {/* Desktop-only feature-carousel sectie onder de hero. Mobile heeft
          de carousel al binnen de hero zelf (compact). Hidden op mobile
          om duplicatie te vermijden. */}
      <section className="hidden lg:block relative bg-[#0A0A0A] py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <FeatureShowcaseCarousel idPrefix="hero-desktop" />
        </div>
      </section>

      <TrustBar />
      <UseCases />
      <FeatureBento />
      <MoreProductsComingSoon />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyBuyBar />
    </main>
  );
}
