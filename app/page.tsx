import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import HeroTeaser from '@/components/teaser/HeroTeaser';
import UspSections from '@/components/teaser/UspSections';
import LifestyleStrip from '@/components/teaser/LifestyleStrip';
import WaitlistForm from '@/components/teaser/WaitlistForm';

export const metadata: Metadata = {
  title: 'Titan X — Outlast the day. | TITANBANKS',
  description:
    '50.000 mAh. Six devices at once. The drop is coming. Join the TITANBANKS waitlist for the first batch of the Titan X power bank.',
  alternates: { canonical: 'https://titan-banks.com/' },
};

export default function Home() {
  return (
    <main className="relative bg-black overflow-x-hidden">
      <JsonLd />
      <Navigation mode="teaser" />
      <HeroTeaser />
      <UspSections />
      <LifestyleStrip />
      <WaitlistForm />
      <Footer />
    </main>
  );
}
