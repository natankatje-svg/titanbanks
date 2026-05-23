import type { Metadata } from 'next';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import HeroTeaser from '@/components/teaser/HeroTeaser';
import CounterStrip from '@/components/CounterStrip';
import UspSections from '@/components/teaser/UspSections';
import LifestyleStrip from '@/components/teaser/LifestyleStrip';
import CalculatorPromo from '@/components/CalculatorPromo';
import MoreProductsComingSoon from '@/components/MoreProductsComingSoon';
import ImageSlider, { type SliderImage } from '@/components/ImageSlider';
import WaitlistForm from '@/components/teaser/WaitlistForm';
import { BRAND, capacityLabel } from '@/lib/product-claims';

// 6 product renders uit /public/images/ — bestaande assets uit Day 1 audit.
const homepageSliderImages: SliderImage[] = [
  { src: '/images/product-hero.jpg', alt: `${BRAND.product} — hero shot, matte black ${capacityLabel()} power bank` },
  { src: '/images/product-angle.jpg', alt: `${BRAND.product} — angled view tonen vorm en gevlochten draaglus` },
  { src: '/images/product-top.jpg', alt: `${BRAND.product} — top view met LED-display zichtbaar` },
  { src: '/images/product-ports.jpg', alt: `${BRAND.product} — poorten close-up: 4× USB-A, 1× USB-C, 1× Micro-USB` },
  { src: '/images/product-dark.jpg', alt: `${BRAND.product} — dark studio shot` },
  { src: '/images/product-isometric.jpg', alt: `${BRAND.product} — isometric productshot` },
];

export const metadata: Metadata = {
  title: `${BRAND.product} — Outlast the day. | ${BRAND.wordmark}`,
  description: `${capacityLabel()}. Six devices at once. The drop is coming. Join the ${BRAND.wordmark} waitlist for the first batch of the ${BRAND.product} power bank.`,
  alternates: { canonical: 'https://titan-banks.com/nl' },
};

export default function Home() {
  return (
    <main className="relative bg-[#0A0A0A] overflow-x-hidden">
      <JsonLd />
      <AnnouncementBar />
      <Navigation mode="teaser" />
      <HeroTeaser />
      <CounterStrip />
      <UspSections />

      {/* V2 Day 4 — productvisuals slider, drives naar /shop */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-[#FF6B00]" />
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#888888]">
                Product · {BRAND.product}
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

      <LifestyleStrip />
      <CalculatorPromo />
      <MoreProductsComingSoon />
      <WaitlistForm />
      <Footer />
    </main>
  );
}
