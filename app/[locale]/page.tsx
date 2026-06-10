import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import MaisonNav from '@/components/atelier/MaisonNav';
import PulseHero from '@/components/pulse/PulseHero';
import StatPulse from '@/components/pulse/StatPulse';
import TiltGallery from '@/components/pulse/TiltGallery';
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
      '50.000 mAh. Tot 6 apparaten tegelijk laden. Matte black premium power bank van TITANBANKS — bestel nu.',
  },
  en: {
    title: 'Titan X — 50,000 mAh power bank | TITANBANKS',
    description:
      '50,000 mAh. Charge up to 6 devices at once. Matte black premium power bank by TITANBANKS — order now.',
  },
  de: {
    title: 'Titan X — 50.000 mAh Powerbank | TITANBANKS',
    description:
      '50.000 mAh. Bis zu 6 Geräte gleichzeitig laden. Mattschwarze Premium-Powerbank von TITANBANKS — jetzt bestellen.',
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
export default function Home() {
  return (
    // GEEN overflow-x-hidden op main (breekt position:sticky); body clipt op X.
    <main className="relative bg-titan-bg">
      <JsonLd />
      <MaisonNav />
      <PulseHero />
      <StatPulse />
      <TiltGallery />
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
        kicker="Festivals"
        title="Drie dagen,"
        accent="nul zorgen."
        body="Telefoon, oordopjes en camera blijven de hele tijd aan."
        atmosphere="/images/atmosphere/festival.webp"
        product="/images/titanx/gallery/v2/life-festival.webp"
        productAlt="op een festival in de avond"
        productPos="object-[center_55%]"
        flip
      />
      <AtmosFeature
        kicker="Werk & school"
        title="Telefoon bijna leeg"
        accent="in de trein?"
        body="Snellaad via de ingebouwde USB-C kabel."
        atmosphere="/images/atmosphere/rain.webp"
        product="/images/titanx/gallery/v2/life-train.webp"
        productAlt="in de trein"
      />
      <AtmosBreak
        atmosphere="/images/atmosphere/mountains.webp"
        kicker="Outdoor"
        line="GPS, camera en de ingebouwde zaklamp als back-up wanneer de zon ondergaat."
      />
      <SpecsPulse />
      <FAQ />
      <AtmosBreak
        atmosphere="/images/atmosphere/starfield.webp"
        kicker="Titan X"
        line="Never at 0."
      />
      <FinalePulse />
      <Footer />
      <StickyBuyBar />
    </main>
  );
}
