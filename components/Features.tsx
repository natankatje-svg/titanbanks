'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { BatteryCharging, Zap, Gauge, Link2, Sun, Wind, ArrowRight } from 'lucide-react';
import { useEcwid } from './EcwidProvider';

const features = [
  {
    icon: BatteryCharging,
    color: '#0EB5C8',
    title: '50.000mAh',
    sub: 'Massive Capaciteit',
    description: 'Laad je smartphone tot 12× op. iPad, laptop, camera — allemaal op één lading.',
    badge: '12× opladen',
    image: '/images/product-isometric.jpg',
    large: true,
  },
  {
    icon: Zap,
    color: '#EAB308',
    title: 'PD 22.5W',
    sub: 'Fast Charge',
    description: 'Van 0% naar 80% in minder dan een uur. PD + QC 3.0 voor elk apparaat.',
    badge: 'QC 3.0 + PD',
    image: null,
    large: false,
  },
  {
    icon: Gauge,
    color: '#0EB5C8',
    title: 'Smart Display',
    sub: 'LED Percentage',
    description: 'Exact batterijpercentage — geen gok meer. Altijd precies weten wat er in zit.',
    badge: '% in één oogopslag',
    image: '/images/product-hero.jpg',
    imageAlt: 'Titan X smart LED display toont exact batterijpercentage van de powerbank',
    large: false,
  },
  {
    icon: Link2,
    color: '#FF8C00',
    title: 'Kabels Ingebouwd',
    sub: 'USB-C & Lightning',
    description: 'Nooit meer losse kabels kwijtraken. Altijd klaar om te laden.',
    badge: '2 kabels ingebouwd',
    image: '/images/product-angle.jpg',
    imageAlt: 'Titan X ingebouwde USB-C en Lightning kabels — nooit meer losse kabels kwijt',
    large: false,
  },
  {
    icon: Sun,
    color: '#EAB308',
    title: 'LED Flashlight',
    sub: 'Ultra-bright',
    description: 'Krachtige ingebouwde zaklamp. SOS-modus, hoog/laag, één druk.',
    badge: 'Ultra-bright beam',
    image: null,
    large: false,
  },
  {
    icon: Wind,
    color: '#FF8C00',
    title: 'Outdoor Strap',
    sub: 'Clip & Go',
    description: 'Vastmaakbaar aan elke rugzak of riem. Nooit zonder stroom onderweg.',
    badge: 'Outdoor ready',
    image: null,
    large: false,
  },
];

export default function Features() {
  const { addToCart } = useEcwid();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.06 });
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: cardScroll } = useScroll({ target: cardRef, offset: ['start end', 'end start'] });
  const cardImgY = useTransform(cardScroll, [0, 1], ['-10%', '10%']);

  return (
    <section id="functies" ref={ref} className="relative bg-[#050505] py-24 lg:py-36 overflow-hidden">
      {/* Bridge from TrustBar teal tint */}
      <div
        className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(14,181,200,0.015), transparent)' }}
      />

      {/* Ambient top glow */}
      <div
        className="absolute -top-px left-1/2 -translate-x-1/2 w-[900px] h-[280px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,140,0,0.055) 0%, transparent 65%)' }}
      />
      {/* Bottom fade into FlashlightSection */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(2,2,2,0.6), transparent)' }}
      />


      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-2xl"
        >
          <div className="section-label mb-4 flex items-center gap-3">
            <div className="w-6 h-px bg-[#0EB5C8]" />
            <span>02 — Features</span>
          </div>
          <h2 className="font-display uppercase text-white mb-4" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', lineHeight: 0.88, letterSpacing: '-0.01em' }}>
            GEBOUWD<br />VOOR <span className="text-gradient-orange">MEER</span>
          </h2>
          <p className="font-body text-gray-400 text-lg leading-relaxed">
            Zes features. Eén powerbank. Alles wat je nodig hebt, perfect uitgevoerd.
          </p>
        </motion.div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Large card — spans 1 col on left, 2 rows */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65 }}
            className="lg:row-span-2 group glass-card rounded-3xl overflow-hidden relative flex flex-col"
          ref={cardRef}
          >
            {/* Hover teal glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(circle at 50% 30%, rgba(14,181,200,0.07) 0%, transparent 65%)' }}
            />
            <div className="relative h-60 lg:h-72 overflow-hidden flex-shrink-0">
              <motion.div style={{ y: cardImgY }} className="absolute inset-0 scale-[1.12]">
                <Image src="/images/feature-multidevice.jpg" alt="Titan X 50.000mAh powerbank laadt smartphone, tablet, laptop en camera tegelijk op" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-center" />
              </motion.div>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 60%, #111111)' }} />
            </div>
            <div className="p-7 flex flex-col flex-1" style={{ position: 'relative', zIndex: 1 }}>
              <span className="font-mono-titan text-xs uppercase tracking-widest mb-3" style={{ color: '#0EB5C8' }}>12× opladen</span>
              <h3 className="font-display uppercase text-white mb-2" style={{ fontSize: '2.2rem', lineHeight: 0.9 }}>50.000<br />mAh</h3>
              <p className="font-body text-gray-500 text-sm leading-relaxed mt-3">
                Laad je smartphone tot 12× op. iPad, laptop, camera — allemaal op één lading. De Titan X is de krachtcentrale die je overal meeneemt.
              </p>
              <div className="mt-auto pt-5 border-t border-white/[0.06] flex items-center gap-2">
                <BatteryCharging className="w-4 h-4" style={{ color: '#0EB5C8' }} />
                {/* TODO: replace [GEWICHT] and [AFMETINGEN] with real product specs */}
              <span className="font-mono-titan text-xs text-gray-600">50.000 mAh · 185 Wh · [GEWICHT]g · [AFMETINGEN]mm</span>
              </div>
            </div>
          </motion.div>

          {/* Right col: 2×2 small cards */}
          {features.slice(1, 5).map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.08 + i * 0.07 }}
                className="group glass-card rounded-3xl overflow-hidden relative flex flex-col"
              >
                {feat.image && (
                  <div className="relative h-36 overflow-hidden flex-shrink-0">
                    <Image src={feat.image} alt={'imageAlt' in feat && feat.imageAlt ? feat.imageAlt : feat.title} fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, #111111)' }} />
                  </div>
                )}
                <div className={`p-6 flex flex-col flex-1 ${!feat.image ? 'relative overflow-hidden' : ''}`}>
                  {!feat.image && (
                    <>
                      <div className="absolute inset-0 rounded-3xl pointer-events-none"
                        style={{ background: `radial-gradient(circle at 30% 40%, ${feat.color}06 0%, transparent 60%)` }}
                      />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                        style={{ background: `radial-gradient(circle at 30% 40%, ${feat.color}10 0%, transparent 60%)` }}
                      />
                    </>
                  )}
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${feat.color}12`, border: `1px solid ${feat.color}22` }}>
                      <Icon className="w-5 h-5" style={{ color: feat.color }} />
                    </div>
                    <span className="font-mono-titan text-[10px] uppercase tracking-widest" style={{ color: feat.color }}>{feat.badge}</span>
                  </div>
                  <h3 className="font-display uppercase text-white text-2xl leading-none mb-1">{feat.title}</h3>
                  <p className="font-mono-titan text-xs mb-3" style={{ color: feat.color }}>{feat.sub}</p>
                  <p className="font-body text-gray-500 text-sm leading-relaxed">{feat.description}</p>
                </div>
              </motion.div>
            );
          })}

          {/* Last card — full width bottom */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1 group glass-card rounded-3xl p-6 flex flex-col relative overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none rounded-3xl"
              style={{ background: 'radial-gradient(circle at 30% 40%, rgba(255,140,0,0.04) 0%, transparent 60%)' }}
            />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
              style={{ background: 'radial-gradient(circle at 30% 40%, rgba(255,140,0,0.10) 0%, transparent 60%)' }}
            />
            <div className="flex items-start justify-between mb-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,140,0,0.1)', border: '1px solid rgba(255,140,0,0.2)' }}>
                <Wind className="w-5 h-5" style={{ color: '#FF8C00' }} />
              </div>
              <span className="font-mono-titan text-[10px] uppercase tracking-widest" style={{ color: '#FF8C00' }}>Outdoor ready</span>
            </div>
            <h3 className="font-display uppercase text-white text-2xl leading-none mb-1">Strap Holder</h3>
            <p className="font-mono-titan text-xs mb-3" style={{ color: '#FF8C00' }}>Clip & Go</p>
            <p className="font-body text-gray-500 text-sm leading-relaxed">Vastmaakbaar aan elke rugzak of riem. De oranje strap is meer dan een handgreep — het is jouw lifeline.</p>
          </motion.div>
        </div>
        {/* Mid-page CTA nudge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16 pt-14 border-t border-white/[0.05]"
        >
          <p className="font-body text-gray-500 text-sm text-center sm:text-left">
            Overtuigd? Bestel de Titan X vandaag —{' '}
            <span style={{ color: '#FF8C00' }}>−31% korting</span>, gratis verzending.
          </p>
          <button
            onClick={addToCart}
            className="btn-ghost flex-shrink-0 flex items-center gap-2"
            style={{ padding: '0.6rem 1.4rem', fontSize: '0.85rem' }}
          >
            Naar bestelling
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
