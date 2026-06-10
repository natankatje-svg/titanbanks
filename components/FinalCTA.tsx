'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Zap, Shield, RotateCcw, Truck } from 'lucide-react';
import { useEcwid } from './EcwidProvider';
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

const guarantees: Array<{ icon: typeof Shield; label: string }> = [
  { icon: Shield, label: `${SPECS.warrantyYears.value} jaar garantie` },
];

const returnDays = safe(TBD.returnPolicyDays);
if (returnDays && returnDays > 0) {
  guarantees.push({ icon: RotateCcw, label: `${returnDays} dagen retour` });
}
const shippingCountries = safe(TBD.freeShippingCountries);
if (shippingCountries && shippingCountries.length > 0) {
  guarantees.push({ icon: Truck, label: `Gratis verzending ${shippingCountries.join(' / ')}` });
}

export default function FinalCTA() {
  const { addToCart } = useEcwid();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section
      id="bestel"
      ref={ref}
      className="relative py-28 lg:py-40 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #0a0a0a 50%, #0A0A0A 100%)' }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(255,140,0,0.04)_0%,transparent_70%)]" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0A0A0A] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0A] to-transparent" />

      {/* Ambient glow rings — CSS animated for compositor-thread perf */}
      <div className="ring-pulse-inner absolute left-1/2 top-1/2 w-[600px] h-[600px] rounded-full border pointer-events-none"
        style={{ borderColor: 'rgba(255,140,0,0.2)' }} />
      <div className="ring-pulse-outer absolute left-1/2 top-1/2 w-[900px] h-[900px] rounded-full border pointer-events-none"
        style={{ borderColor: 'rgba(255,140,0,0.1)' }} />


      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Product image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-[500px]">
              {/* Versterkt oranje spotlight achter product */}
              <div
                className="glow-pulse absolute inset-[8%] rounded-full blur-3xl pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 55%, rgba(255,140,0,0.22) 0%, rgba(255,140,0,0.08) 50%, transparent 75%)',
                  animationDuration: '6s',
                }}
              />

              {/* Mask-container: faded witte achtergrond → transparant aan de randen */}
              <motion.div
                style={{
                  y: imgY,
                  WebkitMaskImage:
                    'radial-gradient(ellipse 92% 88% at 50% 50%, black 38%, rgba(0,0,0,0.85) 56%, rgba(0,0,0,0.3) 70%, transparent 84%)',
                  maskImage:
                    'radial-gradient(ellipse 92% 88% at 50% 50%, black 38%, rgba(0,0,0,0.85) 56%, rgba(0,0,0,0.3) 70%, transparent 84%)',
                }}
                className="relative z-10"
              >
                <Image
                  src="/images/product-isometric.jpg"
                  alt="Titan X 50.000 mAh premium powerbank met smart LED display en ingebouwde retractable kabels"
                  width={520}
                  height={480}
                  className="object-contain w-full h-auto"
                  style={{ display: 'block' }}
                />
              </motion.div>

              {/* Stage floor glow — warme grondreflectie onder powerbank */}
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 h-10 blur-2xl pointer-events-none"
                style={{ width: '55%', background: 'rgba(255,140,0,0.25)' }}
              />
            </div>
          </motion.div>

          {/* Right — Copy & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center lg:text-left"
          >
            {/* Eyebrow */}
            <div className="section-label mb-6 flex items-center gap-3">
              <div className="w-6 h-px bg-[#FF8C00]" />
              <span>12 — Bestel Nu</span>
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#FF8C00' }} />
              </span>
            </div>

            {/* Headline */}
            <h2
              className="font-display uppercase leading-[0.88] mb-6"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
            >
              {LAUNCH_STATE.waitlistMode ? (
                <>
                  <span className="block text-white">{BRAND.product.toUpperCase()}</span>
                  <span className="block text-gradient-orange">DE EERSTE BATCH.</span>
                </>
              ) : (
                <>
                  <span className="block text-white">BESTEL {BRAND.product.toUpperCase()}</span>
                  <span className="block text-gradient-orange">EN BEN ER KLAAR VOOR.</span>
                </>
              )}
            </h2>

            <p className="font-body text-gray-400 text-lg lg:text-xl leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
              {capacityLabel()}. {SPECS.simultaneousDevices.value} devices tegelijk. LED-display
              met exact percentage. Matte black. Gebouwd voor wie niet kan stoppen.
            </p>

            {/* Price block — alleen renderen wanneer CONFIRMED */}
            {priceLabel() && (
              <div className="flex flex-col items-center lg:items-start gap-1 mb-8">
                <div className="flex items-baseline gap-4 justify-center lg:justify-start">
                  <span className="font-display text-white" style={{ fontSize: '3.5rem', lineHeight: 1 }}>
                    {priceLabel()}
                  </span>
                  {anchorPriceLabel() && (
                    <span className="font-body text-gray-600 text-xl line-through">
                      {anchorPriceLabel()}
                    </span>
                  )}
                </div>
                <span className="font-body text-gray-600 text-xs">incl. BTW</span>
              </div>
            )}

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center lg:justify-start">
              {LAUNCH_STATE.waitlistMode ? (
                <a href="#waitlist" className="btn-orange flex items-center gap-2.5 px-10 py-5 text-xl">
                  <Zap className="w-5 h-5 fill-white text-white" />
                  Join waitlist
                </a>
              ) : (
                <button onClick={() => addToCart()} className="btn-orange flex items-center gap-2.5 px-10 py-5 text-xl">
                  <Zap className="w-5 h-5 fill-white text-white" />
                  Bestel {BRAND.product}
                </button>
              )}
              <a
                href="#functies"
                className="btn-ghost flex items-center justify-center px-8 py-5 text-lg"
              >
                Bekijk specs
              </a>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-3">
              {guarantees.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 glass-card rounded-2xl px-4 py-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(255,140,0,0.1)' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: '#FF8C00' }} />
                  </div>
                  <span className="font-body text-gray-300 text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>

            {/* Payment methods */}
            <div className="flex items-center gap-2 mt-5 flex-wrap justify-center lg:justify-start">
              <span className="font-mono-titan text-[0.58rem] uppercase tracking-widest text-gray-700 mr-1">
                Betalen via:
              </span>
              {['iDEAL', 'Visa', 'Mastercard', 'PayPal', 'Klarna'].map((method) => (
                <span
                  key={method}
                  className="font-mono-titan text-[0.6rem] px-2 py-1 rounded-md"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#6B7280',
                  }}
                >
                  {method}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
