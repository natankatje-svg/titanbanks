import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import TickerBar from '@/components/industrial/TickerBar';
import NavBar from '@/components/industrial/NavBar';
import HeroConsole from '@/components/industrial/HeroConsole';
import MarqueeBand from '@/components/industrial/MarqueeBand';
import DataPanel from '@/components/industrial/DataPanel';
import SystemView from '@/components/industrial/SystemView';
import FieldLog from '@/components/industrial/FieldLog';
import SpecSheet from '@/components/industrial/SpecSheet';
import TrustStrip from '@/components/industrial/TrustStrip';
import FAQ from '@/components/FAQ';
import OrderConsole from '@/components/industrial/OrderConsole';
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
 * Homepage V6 — "INDUSTRIAL POWER UNIT": equipment-grade spec-sheet-design
 * (blueprint-raster, annotatie-callouts, mono-data, safety-orange console-CTA's).
 * Archivo Black / Archivo / JetBrains Mono. Alle productbeelden uit de
 * goedgekeurde launch-set; alle claims via lib/product-claims SSOT.
 *
 * Flow: Ticker → Nav → HeroConsole (callouts + order-console ATF) →
 * MarqueeBand → DataPanel (count-up) → SystemView → FieldLog (live preview) →
 * SpecSheet → TrustStrip → FAQ → OrderConsole → Footer + StickyBuyBar.
 */
export default function Home() {
  return (
    // GEEN overflow-x-hidden op main (breekt position:sticky); body clipt op X.
    <main className="relative bg-titan-bg">
      <JsonLd />
      <TickerBar />
      <NavBar />
      <HeroConsole />
      <MarqueeBand />
      <DataPanel />
      <SystemView />
      <FieldLog />
      <SpecSheet />
      <TrustStrip />
      <FAQ />
      <OrderConsole />
      <Footer />
      <StickyBuyBar />
    </main>
  );
}
