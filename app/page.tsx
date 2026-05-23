import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import HeroTeaser from '@/components/teaser/HeroTeaser';
import CounterStrip from '@/components/CounterStrip';
import UspSections from '@/components/teaser/UspSections';
import LifestyleStrip from '@/components/teaser/LifestyleStrip';
import CalculatorPromo from '@/components/CalculatorPromo';
import WaitlistForm from '@/components/teaser/WaitlistForm';
import { BRAND, capacityLabel } from '@/lib/product-claims';

export const metadata: Metadata = {
  title: `${BRAND.product} — Outlast the day. | ${BRAND.wordmark}`,
  description: `${capacityLabel()}. Six devices at once. The drop is coming. Join the ${BRAND.wordmark} waitlist for the first batch of the ${BRAND.product} power bank.`,
  alternates: { canonical: 'https://titan-banks.com/' },
};

export default function Home() {
  return (
    <main className="relative bg-[#0A0A0A] overflow-x-hidden">
      <JsonLd />
      <Navigation mode="teaser" />
      <HeroTeaser />
      <CounterStrip />
      <UspSections />
      <LifestyleStrip />
      <CalculatorPromo />
      <WaitlistForm />
      <Footer />
    </main>
  );
}
