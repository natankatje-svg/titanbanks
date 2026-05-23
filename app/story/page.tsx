import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StorySection from '@/components/StorySection';
import { BRAND } from '@/lib/product-claims';

export const metadata: Metadata = {
  title: `Story — Waarom ${BRAND.text} bestaat`,
  description: `Het verhaal achter ${BRAND.text} en hoe ${BRAND.product} tot stand kwam.`,
  alternates: { canonical: 'https://titan-banks.com/story' },
};

export default function StoryPage() {
  return (
    <main className="relative bg-[#0A0A0A] overflow-x-hidden">
      <Navigation />
      <div className="pt-20">
        <StorySection />
      </div>
      <Footer />
    </main>
  );
}
