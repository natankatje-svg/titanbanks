import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import ShopGallery from '@/components/shop/ShopGallery';
import BuyBox from '@/components/BuyBox';
import FeatureStages from '@/components/home/FeatureStages';
import SpecTable from '@/components/home/SpecTable';
import ShippingReturnsWarranty from '@/components/ShippingReturnsWarranty';
import FAQ from '@/components/FAQ';
import StickyBuyBar from '@/components/StickyBuyBar';
import { BRAND } from '@/lib/product-claims';
import { buildPageMetadata } from '@/lib/seo';

const SHOP_META: Record<string, { title: string; description: string }> = {
  nl: {
    title: 'Titan X kopen — 50.000 mAh power bank | TitanBanks',
    description:
      'Bestel Titan X. 50.000 mAh matte black power bank. Tot 6 apparaten tegelijk laden. TITANBANKS.',
  },
  en: {
    title: 'Buy Titan X — 50,000 mAh power bank | TitanBanks',
    description:
      'Order Titan X. 50,000 mAh matte black power bank. Charge up to 6 devices at once. TITANBANKS.',
  },
  de: {
    title: 'Titan X kaufen — 50.000 mAh Powerbank | TitanBanks',
    description:
      'Titan X bestellen. 50.000 mAh mattschwarze Powerbank. Bis zu 6 Geräte gleichzeitig. TITANBANKS.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = SHOP_META[locale] ?? SHOP_META.nl;
  return buildPageMetadata({ locale, path: 'shop', ...copy });
}

/**
 * /shop V3 — PDP-first: koopbeslissing boven de fold. 2-koloms PDP (galerij
 * links sticky, BuyBox rechts), daarna de gedeelde bewijs- en conversielagen.
 * Galerij = uitsluitend goedgekeurde launch-set fotografie.
 */
export default function ShopPage() {
  return (
    // GEEN overflow-x-hidden op main: breekt position:sticky (galerij-pin).
    <main className="relative bg-titan-surface">
      <JsonLd />
      <Navigation />

      {/* PDP — boven de fold */}
      <section className="relative bg-titan-surface pt-28 lg:pt-36 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="sr-only">{BRAND.text} {BRAND.product}</h1>
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-12 items-start">
            <div className="lg:sticky lg:top-24">
              <ShopGallery />
            </div>
            <BuyBox embedded />
          </div>
        </div>
      </section>

      <FeatureStages />
      <SpecTable />
      <ShippingReturnsWarranty />
      <FAQ />
      <Footer />
      <StickyBuyBar />
    </main>
  );
}
