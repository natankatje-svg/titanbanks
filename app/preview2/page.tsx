import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';

// Home-flow
import HeroTeaser from '@/components/teaser/HeroTeaser';
import CounterStrip from '@/components/CounterStrip';
import UspSections from '@/components/teaser/UspSections';
import LifestyleStrip from '@/components/teaser/LifestyleStrip';

// Shop / PDP
import HeroVariantB from '@/components/heroes/HeroVariantB';
import TrustBar from '@/components/TrustBar';
import ProductShowcase from '@/components/ProductShowcase';

// Technology
import Features from '@/components/Features';
import FlashlightSection from '@/components/FlashlightSection';
import Comparison from '@/components/Comparison';

// In-Use
import UseCases from '@/components/UseCases';

// Calculator
import Calculator from '@/components/Calculator';
import CalculatorPromo from '@/components/CalculatorPromo';

// Story & Support
import StorySection from '@/components/StorySection';
import FAQ from '@/components/FAQ';

// Conversion bits
import WaitlistForm from '@/components/teaser/WaitlistForm';
import StickyBuyBar from '@/components/StickyBuyBar';
import CartExitPopup from '@/components/CartExitPopup';

import { BRAND, capacityLabel } from '@/lib/product-claims';

export const metadata: Metadata = {
  // Intern review-pagina: niet indexeren en niet in sitemap
  robots: { index: false, follow: false },
  title: `Preview 2 — full concept | ${BRAND.text}`,
  description: `Geconsolideerde review van de complete ${BRAND.product} site. Alle secties op één scrollbare pagina.`,
};

/**
 * Floating Table of Contents — anchor-jumps zodat je op mobiel snel
 * door alle secties kunt navigeren. Stays sticky onder de header.
 */
function Toc() {
  const sections = [
    { id: 'home', label: '01 · Home' },
    { id: 'specs', label: '02 · Specs' },
    { id: 'shop', label: '03 · Shop' },
    { id: 'technology', label: '04 · Tech' },
    { id: 'flashlight', label: '05 · Light' },
    { id: 'in-use', label: '06 · In Use' },
    { id: 'calculator', label: '07 · Calc' },
    { id: 'comparison', label: '08 · vs' },
    { id: 'story', label: '09 · Story' },
    { id: 'faq', label: '10 · FAQ' },
    { id: 'cta', label: '11 · Waitlist' },
  ];

  return (
    <nav
      aria-label="Preview 2 sectie-navigatie"
      className="sticky top-16 z-30 bg-[#0A0A0A]/85 backdrop-blur-md border-b border-[#2A2A2A]"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <ul className="flex gap-1 sm:gap-3 overflow-x-auto py-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] text-[#888888]">
          {sections.map((s) => (
            <li key={s.id} className="flex-shrink-0">
              <a
                href={`#${s.id}`}
                className="block px-2 py-1 rounded hover:text-[#FF6B00] hover:bg-white/5 transition-colors whitespace-nowrap"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/**
 * Visuele "preview" banner bovenaan — laat duidelijk zien dat dit een
 * interne review-URL is, geen klantpagina. Voorkomt verwarring.
 */
function PreviewBanner() {
  return (
    <div className="w-full bg-[#FF6B00] text-black text-center text-xs font-mono uppercase tracking-[0.2em] py-1.5 px-4">
      Preview 2 · interne review · niet indexeerbaar
    </div>
  );
}

/**
 * Sectie-anchor met label. Een unieke ID per blok zodat de TOC erheen
 * kan springen, plus een visuele scheiding tussen de gestapelde
 * route-componenten.
 */
function SectionAnchor({ id, label }: { id: string; label: string }) {
  return (
    <div id={id} className="scroll-mt-32 py-6 px-6 bg-[#0A0A0A] border-t border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <div className="w-8 h-px bg-[#FF6B00]" />
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#888888]">
          {label}
        </p>
      </div>
    </div>
  );
}

export default function Preview2Page() {
  return (
    <main className="relative bg-[#0A0A0A] overflow-x-hidden">
      <JsonLd />
      <PreviewBanner />
      <Navigation />
      <Toc />

      {/* 01 — Home / Landing */}
      <SectionAnchor id="home" label={`01 — Home · ${capacityLabel()} teaser`} />
      <HeroTeaser />

      {/* 02 — Specs counter */}
      <SectionAnchor id="specs" label="02 — Specs counter strip" />
      <CounterStrip />
      <UspSections />
      <LifestyleStrip />

      {/* 03 — Shop / PDP */}
      <SectionAnchor id="shop" label="03 — Shop · PDP variant B" />
      <HeroVariantB />
      <TrustBar />
      <ProductShowcase />

      {/* 04 — Technology */}
      <SectionAnchor id="technology" label="04 — Technology deep-dive" />
      <Features />

      {/* 05 — Flashlight */}
      <SectionAnchor id="flashlight" label="05 — LED zaklamp" />
      <FlashlightSection />

      {/* 06 — In Use */}
      <SectionAnchor id="in-use" label="06 — In gebruik" />
      <UseCases />

      {/* 07 — Calculator */}
      <SectionAnchor id="calculator" label="07 — Power calculator" />
      <Calculator />
      <CalculatorPromo />

      {/* 08 — Comparison */}
      <SectionAnchor id="comparison" label="08 — Vergelijking" />
      <Comparison />

      {/* 09 — Story */}
      <SectionAnchor id="story" label="09 — Founder story" />
      <StorySection />

      {/* 10 — FAQ */}
      <SectionAnchor id="faq" label="10 — FAQ" />
      <FAQ />

      {/* 11 — Waitlist CTA */}
      <SectionAnchor id="cta" label="11 — Waitlist conversie" />
      <WaitlistForm />

      <Footer />
      <StickyBuyBar />
      <CartExitPopup enabledPaths={['/preview2']} />
    </main>
  );
}
