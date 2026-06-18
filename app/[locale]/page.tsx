import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import MaisonNav from '@/components/atelier/MaisonNav';
import PulseHero from '@/components/pulse/PulseHero';
import ProductListing from '@/components/pulse/ProductListing';
import StatPulse from '@/components/pulse/StatPulse';
import MarqueeBand from '@/components/industrial/MarqueeBand';
import AtmosFeature from '@/components/pulse/AtmosFeature';
import AtmosBreak from '@/components/pulse/AtmosBreak';
import SpecsPulse from '@/components/pulse/SpecsPulse';
import FAQ from '@/components/FAQ';
import FinalePulse from '@/components/pulse/FinalePulse';
import StickyBuyBar from '@/components/StickyBuyBar';
import { buildPageMetadata } from '@/lib/seo';

// Per-locale homepage-copy. NL is primair; EN/DE eigen teksten zodat Google
// niet de NL-title voor alle locales toont (was de oude bug).
const HOME_META: Record<string, { title: string; description: string }> = {
  nl: {
    title: 'Titan X — 50.000 mAh power bank | TITANBANKS',
    description:
      '50.000 mAh power bank met ingebouwde USB-C + Lightning kabels en LED-display. Laad tot 6 apparaten tegelijk. Matte black, direct uit voorraad leverbaar.',
  },
  en: {
    title: 'Titan X — 50,000 mAh power bank | TITANBANKS',
    description:
      '50,000 mAh power bank with built-in USB-C + Lightning cables and an LED display. Charge up to 6 devices at once. Matte black, in stock and ships fast.',
  },
  de: {
    title: 'Titan X — 50.000 mAh Powerbank | TITANBANKS',
    description:
      '50.000 mAh Powerbank mit integrierten USB-C- und Lightning-Kabeln und LED-Display. Lade bis zu 6 Geräte gleichzeitig. Mattschwarz, sofort lieferbar.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = HOME_META[locale] ?? HOME_META.nl;
  return buildPageMetadata({ locale, path: '', ...copy });
}

/**
 * Homepage — build/pulse "PULSE": motion-first dark energy-tech.
 * Unbounded/Geist; MaisonNav-layout (Natans keuze) behouden; reactor-hero
 * met orbit-ringen + blobs + embers; count-up energiecellen; 3D-tilt
 * gallery; parallax-sfeerbanden (productloze Higgsfield-beelden) met
 * zwevende productfoto's; pulserende CTA's. Copy/claims/logo ongewijzigd.
 */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    // GEEN overflow-x-hidden op main (breekt position:sticky); body clipt op X.
    <main className="relative bg-titan-bg">
      <JsonLd locale={locale} />
      <MaisonNav />
      <PulseHero />
      {/* Volledige live Ecwid product-listing (galerij + prijs + specs +
          beschrijving + CTA) direct onder de hero. */}
      <ProductListing />
      <StatPulse />
      <MarqueeBand />
      <AtmosFeature
        kicker="Road trips"
        title="Camera, telefoon en speakers"
        accent="blijven aan."
        body="Eén power bank voor de hele rit."
        atmosphere="/images/atmosphere/highway.webp"
        product="/images/titanx/gallery/v2/life-car.webp"
        productAlt="in de cup-holder van een auto bij nacht"
      />
      <AtmosFeature
        kicker="Werk & school"
        title="Telefoon bijna leeg"
        accent="in de trein?"
        body="Snellaad via de ingebouwde USB-C kabel."
        product="/images/titanx/gallery/v2/life-train.webp"
        productAlt="in de trein"
        flip
      />
      <AtmosFeature
        kicker="Festivals"
        title="Drie dagen,"
        accent="nul zorgen."
        body="Telefoon, oordopjes en camera blijven de hele tijd aan."
        atmosphere="/images/atmosphere/festival.webp"
        product="/images/titanx/gallery/v2/life-festival.webp"
        productAlt="op een festival in de avond"
        productPos="object-[center_55%]"
      />
      <SpecsPulse />
      <FAQ />
      <AtmosBreak kicker="Titan X" line="Never at 0." />
      <FinalePulse />
      <Footer />
      <StickyBuyBar />
    </main>
  );
}
