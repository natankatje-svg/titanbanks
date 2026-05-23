'use client';

import { useRef, Fragment } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Zap, Gauge, Sun, Link2, Check } from 'lucide-react';

const showcaseItems = [
  {
    id: 'display',
    eyebrow: '05 — LED-display',
    title: 'EXACT PERCENTAGE. ALTIJD.',
    description: 'LED-display met exact batterijpercentage. Geen 4-bars schatting — een nummer.',
    bullets: ['Exact percentage in één oogopslag', 'Leesbaar in donker én daglicht', 'In- en uitlaadstatus realtime'],
    accent: '#0EB5C8',
    icon: Gauge,
    imageSide: 'right',
    image: '/images/product-hero.jpg',
    imageAlt: 'Titan X LED-display toont exact batterijpercentage',
  },
  {
    id: 'multidevice',
    eyebrow: '06 — Multi-device',
    title: 'TOT 6 DEVICES TEGELIJK.',
    description: 'Smartphone, tablet, oordopjes, camera, laptop — alles tegelijk via 4× USB-A, 1× USB-C en Micro-USB input.',
    bullets: ['Tot 6 apparaten tegelijkertijd', 'USB-C output voor snellaad', '50.000 mAh capaciteit'],
    accent: '#EAB308',
    icon: Zap,
    imageSide: 'left',
    image: '/images/feature-multidevice.jpg',
    imageAlt: 'Titan X laadt smartphone, tablet en laptop tegelijk via meerdere poorten',
  },
  {
    id: 'strap',
    eyebrow: '07 — Draaglus',
    title: 'KLIK VAST. PAK MEE.',
    description: 'Oranje gevlochten draaglus met embossed "POWER BANK". Bevestigbaar aan rugzak, tas of riem.',
    bullets: ['Oranje gevlochten draaglus', 'Bevestigbaar aan rugzak of tas', 'Embossed wordmark'],
    accent: '#FF6B00',
    icon: Link2,
    imageSide: 'right',
    image: '/images/product-angle.jpg',
    imageAlt: 'Titan X met oranje gevlochten draaglus bevestigd aan rugzak',
  },
  {
    id: 'flashlight',
    eyebrow: '08 — Zaklamp',
    title: 'INGEBOUWD. ALTIJD BIJ.',
    description: 'Krachtige ingebouwde zaklamp. Camping, pech, donker — een druk op de knop.',
    bullets: ['Krachtige LED-beam', 'Werkt onafhankelijk van laden', 'Eén druk om te activeren'],
    accent: '#EAB308',
    icon: Sun,
    imageSide: 'left',
    image: '/images/feature-flashlight.jpg',
    imageAlt: 'Titan X ingebouwde zaklamp',
  },
];

function Row({ item, index }: { item: (typeof showcaseItems)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.18 });
  const Icon = item.icon;
  const isLeft = item.imageSide === 'left';

  return (
    <div ref={ref} className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className={`${isLeft ? 'lg:order-1' : 'lg:order-2'} relative`}
      >
        {/* Accent line on edge */}
        <div className={`absolute ${isLeft ? 'left-0' : 'right-0'} top-8 bottom-8 w-[2px] rounded-full`}
          style={{ background: `linear-gradient(to bottom, transparent, ${item.accent}, transparent)` }}
        />
        <div className="relative rounded-2xl overflow-hidden"
          style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.05), 0 30px 60px rgba(0,0,0,0.6), 0 0 50px ${item.accent}0a` }}
        >
          <Image src={item.image} alt={item.imageAlt} width={640} height={520} className="object-cover w-full block" />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at 60% 70%, ${item.accent}08 0%, transparent 60%)` }}
          />
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={isLeft ? 'lg:order-2' : 'lg:order-1'}
      >
        <div className="section-label mb-5 flex items-center gap-3">
          <Icon className="w-3.5 h-3.5" style={{ color: item.accent }} />
          <span>{item.eyebrow}</span>
        </div>

        <h3 className="font-display uppercase text-white leading-[0.88] mb-5 tracking-[-0.01em]"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
        >
          {item.title}
        </h3>

        <p className="font-body text-gray-400 text-lg leading-relaxed mb-8">{item.description}</p>

        <ul className="space-y-3">
          {item.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <div className="mt-1 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ background: `${item.accent}15`, border: `1px solid ${item.accent}30` }}>
                <Check className="w-3 h-3" style={{ color: item.accent }} />
              </div>
              <span className="font-body text-gray-300 text-base">{b}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default function ProductShowcase() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, amount: 0.4 });

  return (
    <section id="showcase" className="relative py-24 lg:py-36 bg-[#0A0A0A] overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 space-y-16 sm:space-y-24 lg:space-y-36">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <div className="section-label mb-4 flex items-center gap-3 justify-center">
            <div className="w-6 h-px bg-[#0EB5C8]" />
            <span>05–08 — Product Showcase</span>
          </div>
          <h2 className="font-display uppercase text-white" style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', lineHeight: 0.88 }}>
            ELK DETAIL <span className="text-gradient-teal">TELT</span>
          </h2>
        </motion.div>

        {showcaseItems.map((item, i) => (
          <Fragment key={item.id}>
            <Row item={item} index={i} />
            {i < showcaseItems.length - 1 && (
              <div className="flex items-center justify-center gap-3">
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.04)' }} />
                <div className="flex gap-1.5">
                  <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(255,107,0,0.2)' }} />
                  <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(255,107,0,0.4)' }} />
                  <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(255,107,0,0.2)' }} />
                </div>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.04)' }} />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
