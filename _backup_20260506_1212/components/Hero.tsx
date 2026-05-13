'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Zap, ArrowDown } from 'lucide-react';

const trustBadges = [
  { label: '50.000mAh' },
  { label: 'PD 22.5W Fast Charge' },
  { label: 'Smart LED Display' },
  { label: 'LED Flashlight' },
  { label: 'Outdoor Strap' },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080808]"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_55%_40%,rgba(255,140,0,0.04)_0%,transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_20%_60%,rgba(14,181,200,0.04)_0%,transparent_60%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#080808] to-transparent" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
      >
        {/* ── Left: Copy ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-8">
            <div
              className="flex items-center gap-2 rounded-full px-4 py-2"
              style={{ background: 'rgba(255,140,0,0.1)', border: '1px solid rgba(255,140,0,0.3)' }}
            >
              <Zap className="w-3.5 h-3.5 fill-[#FF8C00]" style={{ color: '#FF8C00' }} />
              <span className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: '#FF8C00' }}>
                Nieuw · Titan X · 50.000mAh
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-black leading-[0.88] tracking-tight mb-6"
            style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)' }}
          >
            <span className="block text-white">NOOIT MEER</span>
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #FF8C00 0%, #FFD700 60%, #FF8C00 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              ZONDER STROOM
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-lg lg:text-xl leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0"
          >
            De Titan X brengt{' '}
            <span className="text-white font-semibold">50.000mAh</span> premium energie met PD
            22.5W fast charge, smart LED display, ingebouwde kabels en LED flashlight. Gebouwd voor
            avonturiers die verder gaan.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start"
          >
            <a
              href="#bestel"
              className="group flex items-center justify-center gap-2 font-black px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 text-white"
              style={{
                background: 'linear-gradient(135deg, #FF8C00, #E07800)',
                boxShadow: '0 8px 30px rgba(255,140,0,0.35)',
              }}
            >
              <Zap className="w-5 h-5 fill-white text-white" />
              Bestel Nu
            </a>
            <a
              href="#functies"
              className="flex items-center justify-center gap-2 border border-white/15 hover:border-white/30 text-white/80 hover:text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:bg-white/[0.04]"
            >
              Bekijk Functies
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-2 justify-center lg:justify-start"
          >
            {trustBadges.map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.07] rounded-full px-4 py-2"
              >
                <div className="w-1 h-1 rounded-full bg-[#FF8C00]" />
                <span className="text-white/60 text-xs font-medium">{b.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: Product Image ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center"
        >
          {/* Glow behind product */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-72 h-72 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'rgba(255,140,0,0.1)' }}
          />
          <div
            className="absolute w-48 h-48 rounded-full blur-2xl translate-x-20 -translate-y-16 pointer-events-none"
            style={{ background: 'rgba(14,181,200,0.06)' }}
          />

          {/* Product image */}
          <motion.div style={{ scale: imageScale }} className="relative z-10 w-full max-w-[460px]">
            <Image
              src="/images/product-hero.jpg"
              alt="TitanBanks Titan X Powerbank – 50.000mAh"
              width={920}
              height={1080}
              className="object-contain w-full h-auto"
              priority
              style={{ filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.7))' }}
            />
          </motion.div>

          {/* Floating badge — fast charge */}
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -left-4 top-16 glass-card rounded-2xl px-4 py-3 shadow-xl z-20"
            style={{ border: '1px solid rgba(14,181,200,0.2)' }}
          >
            <div className="text-xs font-bold mb-0.5" style={{ color: '#0EB5C8' }}>⚡ 22.5W Fast Charge</div>
            <div className="text-gray-500 text-xs">PD + QC 3.0</div>
          </motion.div>

          {/* Floating badge — flashlight */}
          <motion.div
            animate={{ y: [6, -6, 6] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            className="absolute -right-2 top-28 glass-card rounded-2xl px-4 py-3 shadow-xl z-20"
            style={{ border: '1px solid rgba(255,140,0,0.2)' }}
          >
            <div className="text-xs font-bold mb-0.5" style={{ color: '#FF8C00' }}>🔦 LED Flashlight</div>
            <div className="text-gray-500 text-xs">Ultra-bright beam</div>
          </motion.div>

          {/* Floating badge — capacity */}
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="absolute -left-2 bottom-20 glass-card rounded-2xl px-4 py-3 shadow-xl z-20"
            style={{ border: '1px solid rgba(234,179,8,0.2)' }}
          >
            <div className="text-xs font-bold mb-0.5" style={{ color: '#EAB308' }}>🔋 50.000mAh</div>
            <div className="text-gray-500 text-xs">12× smartphone opladen</div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-gray-600 text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-5 h-5 text-gray-600" />
      </motion.div>
    </section>
  );
}
