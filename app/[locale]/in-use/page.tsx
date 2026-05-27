import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import UseCases from '@/components/UseCases';
import LifestyleStrip from '@/components/LifestyleStrip';
import { BRAND } from '@/lib/product-claims';

export const metadata: Metadata = {
  title: `In Use — ${BRAND.product} | ${BRAND.text}`,
  description: 'Road trips, festivals, outdoor, werk en noodgevallen. Waar Titan X thuis is.',
  alternates: { canonical: 'https://titan-banks.com/in-use' },
};

export default function InUsePage() {
  return (
    <main className="relative bg-[#0A0A0A] overflow-x-hidden">
      <Navigation />
      <div className="pt-24">
        <UseCases />
        <LifestyleStrip />
      </div>
      <Footer />
    </main>
  );
}
