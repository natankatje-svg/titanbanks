'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { BatteryCharging, Zap, Gauge, Link2, Sun, Wind } from 'lucide-react';

const features = [
  {
    icon: BatteryCharging,
    color: '#0EB5C8',
    glow: 'rgba(14,181,200,0.15)',
    title: 'Massive 50.000mAh',
    description:
      'Laad je smartphone tot 12× op. iPad, laptop, camera — allemaal op één lading. De Titan X is de krachtcentrale die je overal meeneemt.',
    badge: '12× opladen',
    image: '/images/product-isometric.jpg',
  },
  {
    icon: Zap,
    color: '#EAB308',
    glow: 'rgba(234,179,8,0.12)',
    title: 'PD 22.5W Fast Charge',
    description:
      'Zowel PD 22.5W als QC 3.0 fast charging — voor telefoon, tablet én laptop. Van 0% naar 80% in minder dan een uur.',
    badge: 'QC 3.0 + PD',
    image: null,
  },
  {
    icon: Gauge,
    color: '#0EB5C8',
    glow: 'rgba(14,181,200,0.12)',
    title: 'Smart LED Display',
    description:
      'Geen gok meer. Het smart LED-display toont exact hoeveel procent er nog in zit. Altijd precies weten wanneer je moet opladen.',
    badge: 'Exact percentage',
    image: '/images/product-hero.jpg',
  },
  {
    icon: Link2,
    color: '#FF8C00',
    glow: 'rgba(255,140,0,0.12)',
    title: 'Ingebouwde Kabels',
    description:
      'USB-C en Lightning — allemaal ingebouwd. Geen losse kabels meer kwijtraken. Altijd klaar, altijd verbonden.',
    badge: '2 kabels ingebouwd',
    image: '/images/product-angle.jpg',
  },
  {
    icon: Sun,
    color: '#EAB308',
    glow: 'rgba(234,179,8,0.15)',
    title: 'Sterke LED Flashlight',
    description:
      'Een krachtige ingebouwde LED-flashlight voor wanneer het donker wordt. Camping, noodgevallen of een zoektocht — altijd licht.',
    badge: 'Ultra-bright',
    image: null,
  },
  {
    icon: Wind,
    color: '#FF8C00',
    glow: 'rgba(255,140,0,0.15)',
    title: 'Outdoor Strap Holder',
    description:
      'De ingebouwde strap-houder maakt de Titan X vastmaakbaar aan elke rugzak, tas of riem. Gemakkelijk mee te nemen, altijd bij de hand.',
    badge: 'Clip & go',
    image: null,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Features() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <section id="functies" ref={ref} className="relative py-28 lg:py-40 bg-[#080808] overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(14,181,200,0.025)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6"
            style={{ background: 'rgba(14,181,200,0.08)', border: '1px solid rgba(14,181,200,0.2)' }}
          >
            <span className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: '#0EB5C8' }}>
              Alles in één
            </span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black tracking-tight text-white mb-5">
            Gebouwd voor{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FF8C00, #EAB308)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              meer
            </span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Zes features. Eén powerbank. De Titan X combineert alles wat je nodig hebt in een strak,
            premium ontwerp.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group relative glass-card rounded-3xl overflow-hidden cursor-default flex flex-col"
              >
                {/* Image strip */}
                {feat.image && (
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={feat.image}
                      alt={feat.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0d0d]/20 to-[#0d0d0d]" />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at 50% 100%, ${feat.glow} 0%, transparent 70%)`,
                      }}
                    />
                  </div>
                )}

                <div className="p-8 flex flex-col flex-1">
                  {/* Hover glow on no-image cards */}
                  {!feat.image && (
                    <div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 30% 40%, ${feat.glow} 0%, transparent 60%)`,
                      }}
                    />
                  )}

                  <div
                    className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${feat.color}12`, border: `1px solid ${feat.color}25` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: feat.color }} />
                  </div>

                  <div className="inline-flex items-center mb-3">
                    <span
                      className="text-[10px] font-bold tracking-[0.15em] uppercase rounded-full px-3 py-1"
                      style={{
                        color: feat.color,
                        background: `${feat.color}12`,
                        border: `1px solid ${feat.color}20`,
                      }}
                    >
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-white text-xl font-bold mb-3 leading-tight">{feat.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feat.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
