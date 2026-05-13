'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Zap, ArrowDown, Shield, Wifi } from 'lucide-react';

const features = [
  { icon: Zap,    label: 'PD 22.5W Fast Charge', color: '#EAB308' },
  { icon: Shield, label: '18-maanden garantie',   color: '#0EB5C8' },
  { icon: Wifi,   label: 'Smart LED Display',      color: '#FF8C00' },
];

export default function HeroVariantC() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-[#050505]"
    >
      {/* Right-side full-height lifestyle image */}
      <motion.div
        style={{ y: bgY }}
        className="absolute top-0 right-0 w-full lg:w-[55%] h-full z-0"
      >
        <Image
          src="/images/feature-flashlight.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Gradient mask — heavy on left, light on right */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, #050505 0%, rgba(5,5,5,0.85) 30%, rgba(5,5,5,0.3) 60%, rgba(5,5,5,0.5) 100%)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-[#050505]/80" />
      </motion.div>

      {/* Grid on left side */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none z-[1]" />

      {/* Orange glow on far left */}
      <div className="absolute top-1/2 -left-32 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none z-[1]"
        style={{ background: 'rgba(255,140,0,0.06)' }}
      />

      {/* Content: left column */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 min-h-screen flex items-center"
      >
        <div className="max-w-7xl mx-auto px-6 pt-28 pb-16 w-full grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {/* Section marker */}
            <motion.div
              variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-px" style={{ background: 'linear-gradient(to right, #FF8C00, transparent)' }} />
              <span className="section-label">De Titan X Powerbank</span>
            </motion.div>

            {/* Headline — vertical stack, condensed */}
            <motion.h1
              variants={{ hidden: { opacity: 0, x: -32 }, visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } } }}
              className="font-display uppercase leading-[0.82] tracking-[-0.025em] mb-6"
              style={{ fontSize: 'clamp(4rem, 9vw, 8.5rem)' }}
            >
              <span className="block text-white">POWER</span>
              <span className="block text-white">ZONDER</span>
              <span className="block text-gradient-orange">GRENZEN</span>
            </motion.h1>

            {/* Accent rule */}
            <motion.div
              variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.6, delay: 0.1 } } }}
              className="h-[2px] w-24 mb-8 origin-left"
              style={{ background: 'linear-gradient(to right, #FF8C00, transparent)' }}
            />

            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              className="font-body text-gray-400 text-base lg:text-lg leading-relaxed mb-10 max-w-sm"
            >
              <span className="text-white font-semibold">50.000mAh</span> ruwe kracht.
              Ingebouwde USB-C & Lightning kabels, LED zaklamp,
              5 oplaadpoorten. Voor elke expeditie.
            </motion.p>

            {/* Price */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="font-display text-4xl text-white leading-none">€89,95</span>
              <span className="font-body text-gray-600 text-base line-through">€129,95</span>
              <span className="font-mono-titan text-xs rounded-full px-2.5 py-1"
                style={{ background: 'rgba(255,140,0,0.12)', border: '1px solid rgba(255,140,0,0.25)', color: '#FF8C00' }}>
                −31%
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <a href="#bestel" className="btn-orange">
                <Zap className="w-5 h-5 fill-white" />
                Bestel Nu
              </a>
              <a href="#functies" className="btn-ghost">
                Meer Info
              </a>
            </motion.div>

            {/* Feature pills */}
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } } }}
              className="flex flex-col gap-2.5"
            >
              {features.map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color }} />
                  </div>
                  <span className="font-body text-sm text-gray-400">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: product image floating in front of background */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex items-center justify-center relative"
          >
            <div className="absolute w-[350px] h-[350px] rounded-full blur-[80px] pointer-events-none"
              style={{ background: 'rgba(255,140,0,0.1)' }}
            />
            <Image
              src="/images/product-isometric.jpg"
              alt="TitanBanks Titan X – poorten overzicht"
              width={700}
              height={700}
              className="w-full max-w-[480px] h-auto object-contain relative z-10 rounded-2xl"
              style={{ filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.9)) drop-shadow(0 0 40px rgba(255,140,0,0.12))' }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 9, 0], opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="section-label">Scroll</span>
        <ArrowDown className="w-4 h-4 text-gray-600" />
      </motion.div>
    </section>
  );
}
