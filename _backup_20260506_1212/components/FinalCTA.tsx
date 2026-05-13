'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Zap, Shield, RotateCcw, Truck } from 'lucide-react';

const guarantees = [
  { icon: Shield, label: '2 jaar garantie' },
  { icon: RotateCcw, label: '30 dagen retour' },
  { icon: Truck, label: 'Gratis verzending' },
  { icon: Zap, label: 'Snel geleverd' },
];

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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

      {/* Animated glow rings */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border pointer-events-none"
        style={{ borderColor: 'rgba(255,140,0,0.2)' }}
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.03, 0.07, 0.03] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border pointer-events-none"
        style={{ borderColor: 'rgba(255,140,0,0.1)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Product image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-[3rem] blur-3xl scale-110 pointer-events-none"
                style={{ background: 'rgba(255,140,0,0.12)' }}
              />
              <div
                className="relative rounded-[2.5rem] overflow-hidden"
                style={{ boxShadow: '0 0 0 1px rgba(255,140,0,0.1), 0 40px 80px rgba(0,0,0,0.8)' }}
              >
                <Image
                  src="/images/product-isometric.jpg"
                  alt="Titan X Powerbank – bestel nu"
                  width={520}
                  height={480}
                  className="object-cover w-full"
                  style={{ display: 'block', maxWidth: '480px' }}
                />
                <div className="absolute inset-0 pointer-events-none rounded-[2.5rem]"
                  style={{ boxShadow: 'inset 0 0 40px rgba(8,8,8,0.2)' }}
                />
              </div>
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
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8"
              style={{ background: 'rgba(255,140,0,0.1)', border: '1px solid rgba(255,140,0,0.28)' }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: '#FF8C00' }}
                />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#FF8C00' }} />
              </span>
              <span className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: '#FF8C00' }}>
                Bestel vandaag · Direct leverbaar
              </span>
            </div>

            {/* Headline */}
            <h2
              className="font-black leading-[0.9] tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
            >
              <span className="block text-white">NEVER RUN OUT</span>
              <span
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #FF8C00 20%, #EAB308 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                OF POWER AGAIN
              </span>
            </h2>

            <p className="text-gray-400 text-lg lg:text-xl leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
              De Titan X is de enige powerbank die je ooit nog nodig hebt. 50.000mAh,
              fast charge, LED display, zaklamp en ingebouwde kabels — alles in één premium device.
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-8 justify-center lg:justify-start">
              <span className="text-5xl font-black text-white">€89,95</span>
              <span className="text-gray-600 text-xl line-through">€129,95</span>
              <div
                className="rounded-full px-3 py-1"
                style={{ background: 'rgba(255,140,0,0.12)', border: '1px solid rgba(255,140,0,0.28)' }}
              >
                <span className="text-sm font-bold" style={{ color: '#FF8C00' }}>−31%</span>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center lg:justify-start">
              <a
                href="#"
                className="flex items-center justify-center gap-2.5 font-black px-10 py-5 rounded-full text-xl transition-all duration-300 hover:scale-105 text-white"
                style={{
                  background: 'linear-gradient(135deg, #FF8C00, #E07800)',
                  boxShadow: '0 12px 40px rgba(255,140,0,0.4)',
                }}
              >
                <Zap className="w-6 h-6 fill-white text-white" />
                Bestel Titan X
              </a>
              <a
                href="#reviews"
                className="flex items-center justify-center border border-white/15 hover:border-white/30 text-white/80 hover:text-white font-semibold px-8 py-5 rounded-full text-lg transition-all duration-300 hover:bg-white/[0.04]"
              >
                Lees reviews
              </a>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-3">
              {guarantees.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 glass-card rounded-2xl px-4 py-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(255,140,0,0.1)' }}
                  >
                    <Icon className="w-4 h-4" style={{ color: '#FF8C00' }} />
                  </div>
                  <span className="text-gray-300 text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
