import type { Metadata } from 'next';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import Hero from '@/components/heroes/HeroVariantB';
import TrustBar from '@/components/TrustBar';
import ImageSlider, { type SliderImage } from '@/components/ImageSlider';
import UseCases from '@/components/UseCases';
import ProductShowcase from '@/components/ProductShowcase';
import CalculatorPromo from '@/components/CalculatorPromo';
import MoreProductsComingSoon from '@/components/MoreProductsComingSoon';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import StickyBuyBar from '@/components/StickyBuyBar';
import CartExitPopup from '@/components/CartExitPopup';
import { BRAND, capacityLabel } from '@/lib/product-claims';

// 6 product renders voor de homepage gallery.
const homepageSliderImages: SliderImage[] = [
  { src: '/images/product-hero.jpg', alt: `${BRAND.product} — hero, matte black ${capacityLabel()} power bank` },
  { src: '/images/product-angle.jpg', alt: `${BRAND.product} — angled view tonen vorm en gevlochten draaglus` },
  { src: '/images/product-top.jpg', alt: `${BRAND.product} — top view met LED-display zichtbaar` },
  { src: '/images/product-ports.jpg', alt: `${BRAND.product} — poorten close-up: 4× USB-A, 1× USB-C, 1× Micro-USB` },
  { src: '/images/product-dark.jpg', alt: `${BRAND.product} — dark studio shot` },
  { src: '/images/product-isometric.jpg', alt: `${BRAND.product} — isometric productshot` },
];

export const metadata: Metadata = {
  title: `${BRAND.product} — ${capacityLabel()} power bank | ${BRAND.wordmark}`,
  description: `${capacityLabel()}. Zes devices tegelijk. Gebouwd voor wie niet kan stoppen. ${BRAND.wordmark} Titan X premium power bank.`,
  alternates: { canonical: 'https://titan-banks.com/nl' },
};

export default function Home() {
  return (
    <main className="relative bg-[#0A0A0A] overflow-x-hidden">
      <JsonLd />
      <AnnouncementBar />
      <Navigation />
      <Hero />
      <TrustBar />

      {/* Brand-narrative: product visuals gallery */}
      <section className="py-20 lg:py-24 bg-[#0A0A0A]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-[#FF6B00]" />
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#888888]">
                {BRAND.product} · gallery
              </span>
              <div className="w-6 h-px bg-[#FF6B00]" />
            </div>
            <h2
              className="font-display uppercase text-white"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 0.9 }}
            >
              Every angle. Every detail.
            </h2>
          </div>
          <ImageSlider images={homepageSliderImages} aspectRatio="4/3" />
        </div>
      </section>

      <UseCases />
      <ProductShowcase />
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
