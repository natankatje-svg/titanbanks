import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import Hero from '@/components/heroes/HeroVariantB';
import TrustBar from '@/components/TrustBar';
import ProductShowcase from '@/components/ProductShowcase';
import FAQ from '@/components/FAQ';
import StickyBuyBar from '@/components/StickyBuyBar';
import CalculatorPromo from '@/components/CalculatorPromo';
import CartExitPopup from '@/components/CartExitPopup';
import { BRAND, capacityLabel } from '@/lib/product-claims';

export const metadata: Metadata = {
  title: `${BRAND.product} kopen — ${capacityLabel()} power bank | ${BRAND.text}`,
  description: `Bestel ${BRAND.product}. ${capacityLabel()} matte black power bank. Tot 6 devices tegelijk. ${BRAND.wordmark}.`,
  alternates: { canonical: 'https://titan-banks.com/shop' },
};

export default function ShopPage() {
  return (
    <main className="relative bg-[#0A0A0A] overflow-x-hidden">
      <JsonLd />
      <Navigation />
      <Hero />
      <TrustBar />
      <ProductShowcase />
      <CalculatorPromo />
      <FAQ />
      <Footer />
      <StickyBuyBar />
      <CartExitPopup enabledPaths={['/shop']} />
    </main>
  );
}
