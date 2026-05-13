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

// ── Hero variant selector ──────────────────────────────────────────
// Uncomment ONE of the lines below to switch between hero variants.
//import Hero from '@/components/heroes/HeroVariantA'; // A: split left-copy / right-product (original)
import Hero from '@/components/heroes/HeroVariantB'; // B: centered cinematic — full-bleed dark bg + stats bar
// import Hero from '@/components/heroes/HeroVariantC'; // C: bold split — lifestyle image right, copy + product left
// ──────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="relative bg-[#080808] overflow-x-hidden">
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
