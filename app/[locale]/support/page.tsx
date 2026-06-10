import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import { Mail, Shield, RefreshCcw, Package } from 'lucide-react';
import { BRAND, SPECS, TBD, safe } from '@/lib/product-claims';

export const metadata: Metadata = {
  title: `Support — ${BRAND.product} | ${BRAND.text}`,
  description: 'FAQ, garantie, retour, shipping en contact voor Titan X.',
  alternates: { canonical: 'https://titan-banks.com/support' },
};

export default function SupportPage() {
  const returnDays = safe(TBD.returnPolicyDays);
  const shipping = safe(TBD.freeShippingCountries);

  return (
    <main className="relative bg-[#0A0A0A] text-[#F5F5F5] overflow-x-hidden">
      <Navigation />
      <section className="pt-32 pb-16 px-6 max-w-4xl mx-auto">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#888888] mb-4">
          {BRAND.text} · Support
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-bold leading-[0.95] mb-8">
          Hier helpen we je.
        </h1>
        <p className="text-[#A0A0A0] text-lg leading-relaxed max-w-2xl mb-12">
          Antwoorden op de meest gestelde vragen, voorwaarden voor garantie en retour,
          en hoe je ons bereikt.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <a
            href="mailto:hello@titan-banks.com"
            className="border border-[#2A2A2A] rounded-xl p-5 hover:border-[#FF8C00] transition-colors group"
          >
            <Mail className="w-5 h-5 text-[#FF8C00] mb-3" />
            <p className="font-body text-white font-semibold mb-1">E-mail</p>
            <p className="text-[#888888] text-sm">hello@titan-banks.com</p>
          </a>

          <div className="border border-[#2A2A2A] rounded-xl p-5">
            <Shield className="w-5 h-5 text-[#4ade80] mb-3" />
            <p className="font-body text-white font-semibold mb-1">Garantie</p>
            <p className="text-[#888888] text-sm">{SPECS.warrantyYears.value} jaar fabrieksgarantie</p>
          </div>

          {returnDays && returnDays > 0 && (
            <div className="border border-[#2A2A2A] rounded-xl p-5">
              <RefreshCcw className="w-5 h-5 text-[#EAB308] mb-3" />
              <p className="font-body text-white font-semibold mb-1">Retour</p>
              <p className="text-[#888888] text-sm">{returnDays} dagen retourrecht</p>
            </div>
          )}

          {shipping && shipping.length > 0 && (
            <div className="border border-[#2A2A2A] rounded-xl p-5">
              <Package className="w-5 h-5 text-[#0EB5C8] mb-3" />
              <p className="font-body text-white font-semibold mb-1">Verzending</p>
              <p className="text-[#888888] text-sm">
                Gratis verzending {shipping.join(' / ')}
              </p>
            </div>
          )}
        </div>
      </section>
      <FAQ />
      <Footer />
    </main>
  );
}
