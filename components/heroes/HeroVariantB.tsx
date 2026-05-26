'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, Check, ChevronDown, Plus, Minus, Truck } from 'lucide-react';
import { useEcwid } from '../EcwidProvider';
import { FloatingPaths } from '@/components/ui/background-paths';
import { MeshGradientBg } from '@/components/ui/mesh-gradient-bg';
import { ProductCard, type ProductImagesProps } from '@/components/ui/product-card';
import {
  BRAND,
  SPECS,
  TBD,
  LAUNCH_STATE,
  safe,
  priceLabel,
  anchorPriceLabel,
  capacityLabel,
} from '@/lib/product-claims';

const baseTrust = ['Veilig betalen', `${SPECS.warrantyYears.value} jaar garantie`];
const optionalTrust: string[] = [];
const returnDays = safe(TBD.returnPolicyDays);
if (returnDays && returnDays > 0) optionalTrust.push(`${returnDays} dagen retour`);
const shippingCountries = safe(TBD.freeShippingCountries);
if (shippingCountries && shippingCountries.length > 0) {
  optionalTrust.push(`Gratis verzending ${shippingCountries.join(' / ')}`);
}
const trust = [...optionalTrust, ...baseTrust];

const specs = [
  { value: SPECS.capacityMah.value.toLocaleString('nl-NL'), unit: ' mAh', label: 'Capaciteit' },
  { value: SPECS.simultaneousDevices.value.toString(), unit: '×', label: 'Devices' },
  { value: 'LED', unit: '', label: 'Display' },
];

// Hero gallery — 8 slides (slot 2-9 marketplace renders).
// Structuur: images[0] = hoofdafbeelding, images[1] = hover-reveal detail.
// thumbnail = product clean shot als thumbnail-navigatie indicator.
const heroGalleryImages: ProductImagesProps[] = [
  {
    id: 'slide-features',
    label: 'Features overzicht',
    thumbnail: '/images/product-hero.jpg',
    images: ['/images/slots/slot-02.png', '/images/product-hero.jpg'],
  },
  {
    id: 'slide-quality',
    label: 'Build quality close-up',
    thumbnail: '/images/product-angle.jpg',
    images: ['/images/slots/slot-03.png', '/images/product-angle.jpg'],
  },
  {
    id: 'slide-dimensions',
    label: 'Afmetingen & schaal',
    thumbnail: '/images/product-top.jpg',
    images: ['/images/slots/slot-04.png', '/images/product-top.jpg'],
  },
  {
    id: 'slide-lifestyle',
    label: 'Lifestyle gebruik',
    thumbnail: '/images/titanx/clean/lifestyle-auto.png',
    images: ['/images/slots/slot-05.png', '/images/titanx/clean/lifestyle-auto.png'],
  },
  {
    id: 'slide-inbox',
    label: "What's in the box",
    thumbnail: '/images/product-dark.jpg',
    images: ['/images/slots/slot-06.png', '/images/product-dark.jpg'],
  },
  {
    id: 'slide-social',
    label: 'Social proof',
    thumbnail: '/images/product-isometric.jpg',
    images: ['/images/slots/slot-07.png', '/images/product-isometric.jpg'],
  },
  {
    id: 'slide-compare',
    label: 'Vergelijking met concurrentie',
    thumbnail: '/images/product-ports.jpg',
    images: ['/images/slots/slot-08.png', '/images/product-ports.jpg'],
  },
  {
    id: 'slide-benefits',
    label: 'Alle voordelen',
    thumbnail: '/images/titanx/clean/usp-build.png',
    images: ['/images/slots/slot-09.png', '/images/titanx/clean/usp-build.png'],
  },
];

const PAYMENT_METHODS = ['iDEAL', 'Apple Pay', 'Klarna', 'Visa', 'Mastercard', 'PayPal'];

export default function HeroVariantB() {
  const { addToCart } = useEcwid();
  const [qty, setQty] = useState(1);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  // Content fades + drifts naar boven naarmate je scrolt — niet te aggressief
  // zodat alle conversie-elementen (price/CTA) gewoon bereikbaar blijven.
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const contentFade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const onBuy = () => {
    if (LAUNCH_STATE.waitlistMode) {
      window.location.href = '#waitlist';
      return;
    }
    addToCart(qty);
  };

  return (
    <section
      ref={ref}
      className="relative flex flex-col overflow-hidden bg-[#050505] text-white"
    >
      {/* Layer 0 — MeshGradient WebGL background: brand-oranje × teal × zwart.
          Twee mesh-lagen: solide basis + subtiele wireframe overlay voor diepte. */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <MeshGradientBg />
      </div>

      {/* Layer 2 — radial vignette: open center, dark edges */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 2,
          background:
            'radial-gradient(ellipse 75% 70% at 50% 52%, rgba(5,5,5,0.05) 0%, rgba(5,5,5,0.55) 55%, rgba(5,5,5,0.95) 100%)',
        }}
      />

      {/* Layer 2 — top/bottom hard fades */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]/95"
        style={{ zIndex: 2 }}
      />

      {/* Layer 2 — grid pattern */}
      <div
        className="absolute inset-0 grid-pattern opacity-[0.10] pointer-events-none"
        style={{ zIndex: 2 }}
      />

      {/* Layer 2 — ambient orange glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[760px] rounded-full blur-[160px] pointer-events-none"
        style={{ zIndex: 2, background: 'rgba(255,107,0,0.07)' }}
      />

      {/* Layer 3 — FloatingPaths: oranje SVG-lijnanimaties als ambient texture.
          Beide richtingen (position 1 en -1) voor symmetrische compositie.
          Opacity is laag gehouden (max ~0.45 per pad) zodat de video en tekst
          niet concurreren met de animatie. */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {/* Layer 10 — main content. Section is taller than viewport: hero stack
          (brand → product name → motto → carousel → conversion) leeft op
          één doorlopende compositie. */}
      <motion.div
        style={{ y: contentY, opacity: contentFade, zIndex: 10 }}
        className="relative w-full max-w-6xl mx-auto px-6 pt-28 pb-16 flex flex-col items-center text-center"
      >
        {/* Brand chip — combineert wordmark + volume + status in één
            editorial-mark. Maakt expliciet: TitanBanks is het merk, Titan X
            is het featured product daaronder. */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="flex items-center rounded-full px-4 py-1.5 mb-7"
          style={{
            background: 'rgba(255,107,0,0.06)',
            border: '1px solid rgba(255,107,0,0.22)',
            backdropFilter: 'blur(6px)',
          }}
        >
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-white">
            {BRAND.wordmark}
          </span>
          <span
            aria-hidden
            className="mx-3 inline-block h-3 w-px"
            style={{ background: 'rgba(255,107,0,0.5)' }}
          />
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-white/75">
            Vol.&nbsp;01&nbsp;/&nbsp;∞
          </span>
          <span
            aria-hidden
            className="mx-3 inline-block h-3 w-px"
            style={{ background: 'rgba(255,107,0,0.5)' }}
          />
          <span
            className="font-mono text-[0.7rem] uppercase tracking-[0.22em]"
            style={{ color: '#FF6B00' }}
          >
            {LAUNCH_STATE.waitlistMode ? 'Pre-launch · eerste batch' : 'Nu beschikbaar'}
          </span>
        </motion.div>

        {/* Featured-product eyebrow — small caps, signals what comes next */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="h-px w-7" style={{ background: 'linear-gradient(to right, transparent, #FF6B00)' }} />
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-[#9A9A9A]">
            Featured product
          </span>
          <div className="h-px w-7" style={{ background: 'linear-gradient(to left, transparent, #FF6B00)' }} />
        </motion.div>

        {/* PRODUCT NAME — primary heading, het hoofd-anker van de hero */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-white uppercase leading-[0.9] tracking-[-0.04em] mb-3"
          style={{ fontSize: 'clamp(3.6rem, 11vw, 8rem)' }}
        >
          {BRAND.product}
        </motion.h1>

        {/* Product motto — supports the product name without competing */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="font-display uppercase tracking-[-0.01em] mb-10"
          style={{ fontSize: 'clamp(1.3rem, 2.8vw, 2.1rem)', lineHeight: 1, fontWeight: 700 }}
        >
          <span className="text-white/90">Nooit meer </span>
          <span className="text-gradient-orange">zonder stroom.</span>
        </motion.p>

        {/* GALLERY — ProductCard structuur: hover-reveal + thumbnail navigatie.
            Slot 2-9 marketplace renders als hoofdafbeelding, clean product shots
            als hover-reveal en thumbnail indicator. */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-3xl mb-12"
        >
          <ProductCard
            id="hero-gallery"
            images={heroGalleryImages}
            aspectClass="aspect-[4/3]"
            showThumbs
          />
        </motion.div>

        {/* Below-carousel content — functions als een echte listing:
            stock-badge, recap, price, qty-selector, primary CTA, payment
            methods, secure-checkout note, trust badges, specs.
            Quantity wordt doorgegeven aan addToCart → Ecwid order →
            ChannelDock → fulfilment center. */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.42 }}
          className="w-full max-w-xl flex flex-col items-center"
        >
          {/* In-stock badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
            style={{
              background: 'rgba(34,197,94,0.08)',
              border: '1px solid rgba(34,197,94,0.25)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-emerald-300">
              Op voorraad · eerste batch
            </span>
          </div>

          {/* Compact recap-paragraph */}
          <p className="font-body text-gray-300 text-base leading-relaxed mb-7 text-center">
            {capacityLabel()} in matte black. LED-display met exact percentage, ingebouwde
            zaklamp en tot {SPECS.simultaneousDevices.value} devices tegelijk. Gebouwd voor
            wie niet kan stoppen.
          </p>

          {/* Listing block — price + qty + CTA, glass-card stijl voor focus */}
          {(priceLabel() || LAUNCH_STATE.waitlistMode) && (
            <div
              className="w-full rounded-2xl p-5 sm:p-6 mb-4"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,107,0,0.05) 0%, rgba(14,181,200,0.025) 100%)',
                border: '1px solid rgba(255,107,0,0.18)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
                {/* Price */}
                {priceLabel() && (
                  <div className="flex flex-col items-center sm:items-start gap-1">
                    <div className="flex items-end gap-2.5">
                      <span
                        className="font-display leading-none text-white"
                        style={{ fontSize: 'clamp(2.4rem, 6vw, 3rem)', fontWeight: 700 }}
                      >
                        {priceLabel()}
                      </span>
                      {anchorPriceLabel() && (
                        <span className="font-body text-gray-500 text-sm line-through leading-none mb-[3px]">
                          {anchorPriceLabel()}
                        </span>
                      )}
                    </div>
                    <span className="font-body text-gray-500 text-[10px]">incl. BTW</span>
                  </div>
                )}

                {/* Qty selector — passed through to Ecwid → ChannelDock */}
                {!LAUNCH_STATE.waitlistMode && (
                  <div className="flex flex-col items-center sm:items-start gap-2">
                    <label className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-[#888888]">
                      Aantal
                    </label>
                    <div className="inline-flex items-stretch rounded-lg overflow-hidden border border-white/[0.10]">
                      <button
                        onClick={() => setQty((v) => Math.max(1, v - 1))}
                        aria-label="Minder"
                        className="px-3 hover:bg-white/[0.05] transition-colors text-[#A0A0A0]"
                        type="button"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-5 py-2.5 font-display text-lg text-white min-w-[56px] text-center">
                        {qty}
                      </span>
                      <button
                        onClick={() => setQty((v) => Math.min(5, v + 1))}
                        aria-label="Meer"
                        className="px-3 hover:bg-white/[0.05] transition-colors text-[#A0A0A0]"
                        type="button"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Primary CTA */}
              <button
                onClick={onBuy}
                className="btn-orange w-full justify-center mt-5"
                style={{ padding: '0.9rem 1.6rem', fontSize: '0.85rem' }}
              >
                <Zap className="w-[18px] h-[18px] fill-white flex-shrink-0" />
                {LAUNCH_STATE.waitlistMode ? 'Join waitlist' : `Bestel ${BRAND.product}`}
              </button>

              {/* Payment methods row */}
              <div className="flex flex-wrap items-center gap-1.5 justify-center mt-4">
                {PAYMENT_METHODS.map((m) => (
                  <span
                    key={m}
                    className="font-mono text-[0.58rem] uppercase tracking-[0.1em] px-2 py-0.5 rounded text-[#9CA3AF] border border-white/[0.07] bg-white/[0.03]"
                  >
                    {m}
                  </span>
                ))}
              </div>

              {/* Secure checkout + shipping line */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-5 mt-4 text-center">
                <span className="inline-flex items-center gap-1.5 font-body text-[#888888] text-[11px]">
                  <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  Veilig betalen
                </span>
                <span className="inline-flex items-center gap-1.5 font-body text-[#888888] text-[11px]">
                  <Truck className="w-3 h-3 text-[#0EB5C8] flex-shrink-0" />
                  Verzending uit NL · 1-3 werkdagen
                </span>
              </div>
            </div>
          )}

          {/* Secondary CTA */}
          <a
            href="#functies"
            className="btn-ghost inline-flex items-center gap-2 mb-7"
            style={{ padding: '0.6rem 1.6rem', fontSize: '0.82rem' }}
          >
            Ontdek alle features
            <ChevronDown className="w-3.5 h-3.5" />
          </a>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 mb-8">
            {trust.map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Check className="w-3 h-3 flex-shrink-0" style={{ color: '#0EB5C8' }} />
                <span className="font-body text-gray-400 text-[12px] leading-none">{t}</span>
              </span>
            ))}
          </div>

          {/* Specs bar */}
          <div
            className="flex w-full max-w-sm sm:max-w-md overflow-hidden"
            style={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            {specs.map((s, i) => (
              <div
                key={i}
                className="flex-1 flex flex-col items-center py-[14px] gap-1"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  backdropFilter: 'blur(8px)',
                  borderRight: i < specs.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}
              >
                <div className="font-display text-[1.15rem] leading-none text-white">
                  {s.value}
                  <span style={{ color: '#FF6B00' }}>{s.unit}</span>
                </div>
                <div className="font-mono-titan text-gray-500 text-[11px] uppercase tracking-[0.16em]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
