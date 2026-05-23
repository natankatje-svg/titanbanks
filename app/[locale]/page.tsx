import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import Hero from '@/components/heroes/HeroVariantB';
import TrustBar from '@/components/TrustBar';
import UseCases from '@/components/UseCases';
import FeatureBento from '@/components/FeatureBento';
import CalculatorPromo from '@/components/CalculatorPromo';
import MoreProductsComingSoon from '@/components/MoreProductsComingSoon';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import StickyBuyBar from '@/components/StickyBuyBar';
import CartExitPopup from '@/components/CartExitPopup';
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
      <TrustBar />
      <UseCases />
      <FeatureBento />
      <CalculatorPromo />
      <MoreProductsComingSoon />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyBuyBar />
      <CartExitPopup enabledPaths={['/nl', '/en', '/de', '/nl/shop', '/en/shop', '/de/shop']} />
    </main>
  );
}
