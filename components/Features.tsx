'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { BatteryCharging, Zap, Gauge, Plug, Sun, Wind, ArrowRight } from 'lucide-react';
import { useEcwid } from './EcwidProvider';
import {
  BRAND,
  SPECS,
  TBD,
  LAUNCH_STATE,
  safe,
  capacityLabel,
  portsLabel,
} from '@/lib/product-claims';

const hasRetractableCables = safe(TBD.hasRetractableCables) ?? false;

const features = [
  {
    icon: BatteryCharging,
    color: '#0EB5C8',
    title: capacityLabel(),
    sub: 'Capaciteit',
    description: `Het verschil tussen "vandaag" en "deze week". Tot ${SPECS.simultaneousDevices.value} devices tegelijk laden via ${portsLabel()}.`,
    badge: `${SPECS.simultaneousDevices.value} devices tegelijk`,
    image: '/images/product-isometric.jpg',
    large: true,
  },
  {
    icon: Zap,
    color: '#EAB308',
    title: 'Snellaad',
    sub: 'Power on demand',
    description: 'Power waar je hem nodig hebt, op het moment dat je hem nodig hebt.',
    badge: 'Snel laden',
    image: null,
    large: false,
  },
  {
    icon: Gauge,
    color: '#0EB5C8',
    title: 'LED-display',
    sub: 'Exact percentage',
    description: 'Geen 4-bars gok. Het exacte percentage, altijd zichtbaar.',
    badge: '% in één oogopslag',
    image: '/images/product-hero.jpg',
    imageAlt: 'Titan X LED-display met exact batterijpercentage',
    large: false,
  },
  // "Kabels ingebouwd" alleen tonen als bevestigd
  ...(hasRetractableCables
    ? [
        {
          icon: Plug,
          color: '#FF6B00',
          title: 'Kabels aan boord',
          sub: 'Niet zoeken',
          description: 'Nooit meer een losse kabel zoeken. Ze zitten in het product.',
          badge: 'Ingebouwd',
          image: '/images/product-angle.jpg',
          imageAlt: 'Titan X ingebouwde kabels',
          large: false,
        },
      ]
    : [
        {
          icon: Plug,
          color: '#FF6B00',
          title: portsLabel(),
          sub: 'Connectiviteit',
          description: `${SPECS.portsUsbA.value}× USB-A · ${SPECS.portsUsbC.value}× USB-C · ${SPECS.portsMicroUsb.value}× Micro-USB voor input. Alles wat je hebt, past.`,
          badge: 'Poorten',
          image: '/images/product-ports.jpg',
          imageAlt: 'Titan X poorten — USB-A, USB-C en Micro-USB',
          large: false,
        },
      ]),
  {
    icon: Sun,
    color: '#EAB308',
    title: 'Ingebouwde zaklamp',
    sub: 'Wanneer je hem nodig hebt',
    description: 'Krachtige zaklamp ingebouwd. Een druk op de knop.',
    badge: 'On board',
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
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,107,0,0.055) 0%, transparent 65%)' }}
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
              <span className="font-mono-titan text-xs uppercase tracking-widest mb-3" style={{ color: '#0EB5C8' }}>
                {SPECS.simultaneousDevices.value} devices tegelijk
              </span>
              <h3 className="font-display uppercase text-white mb-2" style={{ fontSize: '2.2rem', lineHeight: 0.9 }}>
                {SPECS.capacityMah.value.toLocaleString('nl-NL')}<br />mAh
              </h3>
              <p className="font-body text-gray-500 text-sm leading-relaxed mt-3">
                {SPECS.capacityMah.value.toLocaleString('nl-NL')} mAh in matte black. {portsLabel()}.
                Tot {SPECS.simultaneousDevices.value} devices tegelijk. De krachtcentrale die je niet ziet aankomen.
              </p>
              <div className="mt-auto pt-5 border-t border-white/[0.06] flex items-center gap-2">
                <BatteryCharging className="w-4 h-4" style={{ color: '#0EB5C8' }} />
                <span className="font-mono-titan text-xs text-gray-600">
                  {capacityLabel()} · {portsLabel()}
                  {safe(TBD.weightGrams) ? ` · ${safe(TBD.weightGrams)}g` : ''}
                  {safe(TBD.dimensionsMm) ? ` · ${safe(TBD.dimensionsMm)}` : ''}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right col: 2×2 small cards (skip first = large) */}
          {features.slice(1).map((feat, i) => {
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

        </div>
        {/* Mid-page CTA nudge — geen fake discount, geen onbevestigde shipping-belofte */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16 pt-14 border-t border-white/[0.05]"
        >
          <p className="font-body text-gray-500 text-sm text-center sm:text-left">
            {LAUNCH_STATE.waitlistMode
              ? `${BRAND.product} is pre-launch — kom op de waitlist en mis de eerste batch niet.`
              : `Klaar voor ${BRAND.product}? Bekijk de specs en bestel.`}
          </p>
          {LAUNCH_STATE.waitlistMode ? (
            <a
              href="#waitlist"
              className="btn-ghost flex-shrink-0 flex items-center gap-2"
              style={{ padding: '0.6rem 1.4rem', fontSize: '0.85rem' }}
            >
              Join waitlist
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          ) : (
            <button
              onClick={() => addToCart()}
              className="btn-ghost flex-shrink-0 flex items-center gap-2"
              style={{ padding: '0.6rem 1.4rem', fontSize: '0.85rem' }}
            >
              Naar bestelling
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
