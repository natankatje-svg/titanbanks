import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import SocialProof from '@/components/SocialProof';
import Features from '@/components/Features';
import FlashlightSection from '@/components/FlashlightSection';
import UseCases from '@/components/UseCases';
import ProductShowcase from '@/components/ProductShowcase';
import Comparison from '@/components/Comparison';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative bg-[#080808] overflow-x-hidden">
      <Navigation />
      <Hero />
      <SocialProof />
      <Features />
      <FlashlightSection />
      <UseCases />
      <ProductShowcase />
      <Comparison />
      <Reviews />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
