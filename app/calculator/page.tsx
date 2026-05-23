import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Calculator from '@/components/Calculator';
import { BRAND, capacityLabel } from '@/lib/product-claims';

export const metadata: Metadata = {
  title: `Power Calculator — Hoeveel keer laadt ${BRAND.product}? | ${BRAND.text}`,
  description: `Kies je devices en zie hoeveel keer ${capacityLabel()} ze oplaadt. Conservatieve, transparante berekening.`,
};

export default function CalculatorPage() {
  return (
    <main className="relative min-h-screen bg-[#0A0A0A] text-[#F5F5F5] overflow-x-hidden">
      <Navigation />
      <div className="pt-24">
        <Calculator />
      </div>
      <Footer />
    </main>
  );
}
