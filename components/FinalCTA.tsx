'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Zap, Shield, RotateCcw, Truck } from 'lucide-react';
import { useEcwid } from './EcwidProvider';

const guarantees = [
  { icon: Shield, label: '2 jaar garantie' },
  { icon: RotateCcw, label: '30 dagen retour' },
  { icon: Truck, label: 'Gratis verzending' },
  { icon: Zap, label: 'Snel geleverd' },
];

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
      style={{ background: 'linear-gradient(180deg, #080808 0%, #0a0a0a 50%, #080808 100%)' }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(255,140,0,0.04)_0%,transparent_70%)]" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#080808] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#080808] to-transparent" />

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
                  alt="Titan X 50.000mAh premium powerbank met smart LED display, PD 22.5W fast charge en ingebouwde kabels"
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
              <span className="block text-white">BESTEL VANDAAG.</span>
              <span className="block text-gradient-orange">MORGEN IN HUIS.</span>
            </h2>

            <p className="font-body text-gray-400 text-lg lg:text-xl leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
              De Titan X is de enige powerbank die je ooit nog nodig hebt. 50.000mAh,
              fast charge, LED display, zaklamp en ingebouwde kabels — alles in één premium device.
            </p>

            {/* Stock signal */}
            <div className="flex flex-col gap-1.5 mb-5 items-center lg:items-start">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#4ade80' }} />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span className="font-mono-titan text-[0.68rem] uppercase tracking-widest text-green-400">Op voorraad — vandaag besteld, morgen in huis</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-3 h-3 text-gray-700 flex-shrink-0" />
                <span className="font-mono-titan text-[0.63rem] uppercase tracking-widest text-gray-600">
                  Bestel voor <span className="text-gray-400">23:59</span> → morgen in huis
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex flex-col items-center lg:items-start gap-1 mb-8">
              <div className="flex items-baseline gap-4 justify-center lg:justify-start">
                <span className="font-display text-white" style={{ fontSize: '3.5rem', lineHeight: 1 }}>€89,95</span>
                <span className="font-body text-gray-600 text-xl line-through">€129,95</span>
                <div
                  className="rounded-full px-3 py-1"
                  style={{ background: 'rgba(255,140,0,0.12)', border: '1px solid rgba(255,140,0,0.28)' }}
                >
                  <span className="font-mono-titan text-sm" style={{ color: '#FF8C00' }}>−31%</span>
                </div>
              </div>
              <span className="font-body text-gray-600 text-xs">incl. BTW</span>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center lg:justify-start">
              <button onClick={addToCart} className="btn-orange flex items-center gap-2.5 px-10 py-5 text-xl">
                <Zap className="w-5 h-5 fill-white text-white" />
                Bestel Titan X
              </button>
              <a
                href="#reviews"
                className="btn-ghost flex items-center justify-center px-8 py-5 text-lg"
              >
                Lees reviews
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
