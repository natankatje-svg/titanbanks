import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import Hero from '@/components/heroes/HeroVariantB';
import TrustBar from '@/components/TrustBar';
import ImageSlider, { type SliderImage } from '@/components/ImageSlider';
import BuyBox from '@/components/BuyBox';
import ProductShowcase from '@/components/ProductShowcase';
import PortsVisual from '@/components/PortsVisual';
import ShippingReturnsWarranty from '@/components/ShippingReturnsWarranty';
import FAQ from '@/components/FAQ';
import StickyBuyBar from '@/components/StickyBuyBar';
import { BRAND, capacityLabel } from '@/lib/product-claims';
import { buildPageMetadata } from '@/lib/seo';

// 8 product renders voor de PDP image slider. Mix van studio + lifestyle + detail.
const pdpSliderImages: SliderImage[] = [
  { src: '/images/product-hero.jpg', alt: `${BRAND.product} — hero, matte black ${capacityLabel()} power bank` },
  { src: '/images/product-angle.jpg', alt: `${BRAND.product} — angled view tonen vorm en gevlochten draaglus` },
  { src: '/images/product-top.jpg', alt: `${BRAND.product} — top view met LED-display zichtbaar` },
  { src: '/images/product-ports.jpg', alt: `${BRAND.product} — 4× USB-A poorten plus ingebouwde USB-C en Lightning kabels` },
  { src: '/images/product-ports-angle.jpg', alt: `${BRAND.product} — poorten en zaklamp detail` },
  { src: '/images/product-dark.jpg', alt: `${BRAND.product} — dark studio shot` },
  { src: '/images/product-isometric.jpg', alt: `${BRAND.product} — isometric productshot` },
  { src: '/images/feature-multidevice.jpg', alt: `${BRAND.product} — laadt smartphone, tablet en laptop tegelijk` },
];

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

export default function ShopPage() {
  return (
    <main className="relative bg-[#0A0A0A] overflow-x-hidden">
      <JsonLd />
      <Navigation />
      <Hero />
      <TrustBar />

      {/* V2 sectie 7 — Image slider met listing-style renders */}
      <section className="py-16 lg:py-20 bg-[#0A0A0A]">
        <div className="max-w-5xl mx-auto px-6">
          <ImageSlider images={pdpSliderImages} aspectRatio="4/3" />
        </div>
      </section>

      {/* V2 sectie 8 — BuyBox: apart conversion-block, prijs + qty + CTA */}
      <BuyBox />

      {/* Existing — 4 detail rows */}
      <ProductShowcase />

      {/* V2 sectie 8 — Ports & features diagram */}
      <PortsVisual />

      {/* V2 sectie 8 — Shipping/Returns/Warranty summary cards */}
      <ShippingReturnsWarranty />

      <FAQ />
      <Footer />
      <StickyBuyBar />
    </main>
  );
}
