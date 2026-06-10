import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import MaisonNav from '@/components/atelier/MaisonNav';
import ShopGallery from '@/components/shop/ShopGallery';
import BuyBox from '@/components/BuyBox';
import EditorialSpread from '@/components/atelier/EditorialSpread';
import AtelierNumbers from '@/components/atelier/AtelierNumbers';
import Colophon from '@/components/atelier/Colophon';
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
 * /shop — build/atelier: couture-PDP boven de fold (sticky galerij +
 * BuyBox), daarna editorial spread, numbers, colofon en FAQ.
 */
export default function ShopPage() {
  return (
    // GEEN overflow-x-hidden op main (breekt position:sticky galerij-pin).
    <main className="relative bg-titan-bg">
      <JsonLd />
      <MaisonNav />

      {/* PDP — boven de fold */}
      <section className="relative bg-titan-bg pb-16 pt-10 lg:pb-24 lg:pt-14">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <h1 className="sr-only">{BRAND.text} {BRAND.product}</h1>
          <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            <div className="lg:sticky lg:top-28">
              <ShopGallery />
            </div>
            <BuyBox embedded />
          </div>
        </div>
      </section>

      <EditorialSpread />
      <AtelierNumbers />
      <Colophon />
      <FAQ />
      <Footer />
      <StickyBuyBar />
    </main>
  );
}
