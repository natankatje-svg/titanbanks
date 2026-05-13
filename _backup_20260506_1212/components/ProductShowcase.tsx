'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Zap, Gauge, Sun, Link2, Check } from 'lucide-react';

const showcaseItems = [
  {
    id: 'display',
    eyebrow: 'Smart LED Display',
    title: 'Altijd precies weten hoeveel stroom je hebt.',
    description:
      'Het smart LED-display toont exact het batterijpercentage. Of je nu op reis bent of thuis: geen gok meer — je weet altijd wanneer je moet opladen.',
    bullets: [
      'Exact percentage in één oogopslag',
      'Helder leesbaar in donker én daglicht',
      'Toont in- en uitlaadstatus realtime',
    ],
    accent: '#0EB5C8',
    icon: Gauge,
    imageSide: 'right',
    image: '/images/product-hero.jpg',
    imageAlt: 'Titan X LED display',
  },
  {
    id: 'multidevice',
    eyebrow: 'Laad alles tegelijk op',
    title: 'Van smartphone tot tablet. Alles op één lading.',
    description:
      'Telefoon, tablet, handheld console, oordopjes — de Titan X laadt ze allemaal tegelijk. Vijf poorten, één powerbank, geen compromis.',
    bullets: [
      'Tot 5 apparaten tegelijkertijd',
      'USB-C PD + meerdere USB-A outputs',
      '50.000mAh = 12× een smartphone opladen',
    ],
    accent: '#FFD700',
    icon: Zap,
    imageSide: 'left',
    image: '/images/feature-multidevice.jpg',
    imageAlt: 'Titan X charging meerdere apparaten',
  },
  {
    id: 'strap',
    eyebrow: 'Outdoor Strap & Portabiliteit',
    title: 'Vastgemaakt aan je rugzak. Altijd bij je.',
    description:
      'De oranje strap maakt de Titan X bevestigbaar aan elke rugzak, tas of riem. Compact genoeg voor je broekzak, krachtig genoeg voor je expeditie.',
    bullets: [
      'Premium oranje carabiner strap inbegrepen',
      'Geschikt voor rugzakken, tassen en riemen',
      'Compact design — groot genoeg voor 50.000mAh',
    ],
    accent: '#FF6B35',
    icon: Link2,
    imageSide: 'right',
    image: '/images/product-angle.jpg',
    imageAlt: 'Titan X outdoor strap holder',
  },
  {
    id: 'flashlight',
    eyebrow: 'LED Flashlight',
    title: 'Krachtig licht. Altijd bij je.',
    description:
      'De ingebouwde ultra-bright LED flashlight is geen bijzaak — het is een volwaardige zaklamp. Camping, pech, noodgeval: de Titan X verlicht je weg.',
    bullets: [
      'Ultra-bright LED beam',
      '3 standen: hoog · laag · SOS-knippering',
      'Geactiveerd met één druk op de knop',
    ],
    accent: '#FFD700',
    icon: Sun,
    imageSide: 'left',
    image: '/images/feature-flashlight.jpg',
    imageAlt: 'Titan X LED flashlight + strap outdoor',
  },
];

function ShowcaseRow({ item, index }: { item: (typeof showcaseItems)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const Icon = item.icon;
  const isLeft = item.imageSide === 'left';

  return (
    <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -60 : 60 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className={isLeft ? 'lg:order-1' : 'lg:order-2'}
      >
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            boxShadow: `0 0 0 1px rgba(255,255,255,0.05), 0 30px 60px rgba(0,0,0,0.6), 0 0 60px ${item.accent}0a`,
          }}
        >
          <Image
            src={item.image}
            alt={item.imageAlt}
            width={600}
            height={500}
            className="object-cover w-full"
            style={{ display: 'block' }}
          />
          {/* Colour tint overlay to tie image into section accent */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 70% 70%, ${item.accent}08 0%, transparent 60%)`,
            }}
          />
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 60 : -60 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? 60 : -60 }}
        transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={isLeft ? 'lg:order-2' : 'lg:order-1'}
      >
        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6"
          style={{ background: `${item.accent}12`, border: `1px solid ${item.accent}28` }}
        >
          <Icon className="w-3.5 h-3.5" style={{ color: item.accent }} />
          <span
            className="text-xs font-bold tracking-[0.15em] uppercase"
            style={{ color: item.accent }}
          >
            {item.eyebrow}
          </span>
        </div>

        <h3 className="text-4xl lg:text-5xl font-black text-white leading-[1.05] mb-5">
          {item.title}
        </h3>

        <p className="text-gray-400 text-lg leading-relaxed mb-8">{item.description}</p>

        <ul className="space-y-3.5">
          {item.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <div
                className="mt-0.5 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ background: `${item.accent}15`, border: `1px solid ${item.accent}30` }}
              >
                <Check className="w-3 h-3" style={{ color: item.accent }} />
              </div>
              <span className="text-gray-300 text-base">{b}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default function ProductShowcase() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <section id="showcase" className="relative py-28 lg:py-40 bg-[#080808] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_30%_at_50%_50%,rgba(0,229,255,0.025)_0%,transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-6 space-y-28 lg:space-y-40">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-[#0EB5C8]/8 border border-[#0EB5C8]/20 rounded-full px-4 py-2 mb-6">
            <span className="text-[#0EB5C8] text-xs font-bold tracking-[0.15em] uppercase">
              Product Showcase
            </span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black tracking-tight text-white mb-5">
            Elk detail{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #0EB5C8, #0099BB)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              telt
            </span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
            De Titan X is ontworpen van binnenuit. Geen onnodige extra's — alleen wat je
            echt nodig hebt, perfect uitgevoerd.
          </p>
        </motion.div>

        {showcaseItems.map((item, i) => (
          <ShowcaseRow key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
