import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import SocialProof from '@/components/SocialProof';
import TrustBar from '@/components/TrustBar';
import Features from '@/components/Features';
import FlashlightSection from '@/components/FlashlightSection';
import UseCases from '@/components/UseCases';
import ProductShowcase from '@/components/ProductShowcase';
import Comparison from '@/components/Comparison';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import StickyBuyBar from '@/components/StickyBuyBar';
import CookieBanner from '@/components/CookieBanner';
import JsonLd from '@/components/JsonLd';
import Hero from '@/components/heroes/HeroVariantB';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Titan X — Preview (intern) | TitanBanks',
};

export default function PreviewPage() {
  return (
    <main className="relative bg-[#0A0A0A] overflow-x-hidden">
      <JsonLd />
      <Navigation />
      <Hero />
      <SocialProof />
      <TrustBar />
      <Features />
      <FlashlightSection />
      <UseCases />
      <ProductShowcase />
      <Reviews />
      <Comparison />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyBuyBar />
      <CookieBanner />
    </main>
  );
}
