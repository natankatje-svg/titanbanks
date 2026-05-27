import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import Features from '@/components/Features';
import FlashlightSection from '@/components/FlashlightSection';
import Comparison from '@/components/Comparison';
import { BRAND } from '@/lib/product-claims';

export const metadata: Metadata = {
  title: `Technology — ${BRAND.product} | ${BRAND.text}`,
  description: 'De engineering achter Titan X. Capaciteit, snellaad, poorten, build.',
  alternates: { canonical: 'https://titan-banks.com/technology' },
};

export default function TechnologyPage() {
  return (
    <main className="relative bg-[#0A0A0A] overflow-x-hidden">
      <JsonLd />
      <Navigation />
      <div className="pt-24">
        <Features />
        <FlashlightSection />
        <Comparison />
      </div>
      <Footer />
    </main>
  );
}
