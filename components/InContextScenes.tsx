'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

/**
 * InContextScenes — visual-storytelling sectie onder de V3 hero.
 *
 * 4 grote kaarten in een 2×2 grid (desktop) / 1-col stack (mobile) die
 * laten zien WAAR en WAAROM iemand de Titan X zou kopen, zonder de
 * conversie-focus van de hero te vertroebelen. Geen tabs, geen auto-cycle,
 * geen carousel-state — pure visuele continue scroll.
 *
 * Verwacht 4 i18n-keys onder `scenes.cards.{key}.{title,description}`.
 * Foto's leven in public/images/titanx/clean/ — al on-brand TitanBanks
 * product photography, geen marketing-text overlays.
 */

const SCENES: Array<{
  key: 'capacity' | 'lifestyle' | 'ports' | 'flashlight';
  image: string;
  alt: string;
}> = [
  {
    key: 'capacity',
    image: '/images/titanx/clean/usp-capacity.png',
    alt: 'Titan X power bank in spotlight — LED-display op 100%',
  },
  {
    key: 'lifestyle',
    image: '/images/titanx/clean/lifestyle-auto.png',
    alt: 'Titan X in auto-cup-holder, stad bij nacht',
  },
  {
    key: 'ports',
    image: '/images/titanx/clean/usp-multi-device.png',
    alt: '4× USB-A poorten en ingebouwde USB-C/Lightning kabels top-down',
  },
  {
    key: 'flashlight',
    image: '/images/titanx/clean/usp-display-control.png',
    alt: 'Titan X ingebouwde zaklamp brandend in donker',
  },
];

export default function InContextScenes() {
  const t = useTranslations('scenes');

  return (
    <section className="relative bg-[#070707] py-20 lg:py-28 overflow-hidden">
      {/* Subtiele top-rule + ambient warmth — sluit aan op hero-aesthetic */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,140,0,0.35), transparent)' }}
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        {/* Section header — eyebrow + één-regel statement, geen prose */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="inline-block font-mono text-[0.65rem] uppercase tracking-[0.3em] text-[#FF8C00] mb-3">
            {t('eyebrow')}
          </span>
          <h2
            className="font-display text-white uppercase tracking-[-0.02em] leading-[0.95]"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            {t('title')}
          </h2>
        </motion.div>

        {/* 2×2 grid — geen tabs, geen interactie, pure visual story */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
          {SCENES.map((scene, idx) => (
            <motion.article
              key={scene.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.6,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0E0E0E]"
            >
              {/* Image — 4:3 aspect voor consistente card-hoogte. Subtiele
                  zoom-in op hover (desktop) voor leven zonder afleidings-motion. */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={scene.image}
                  alt={scene.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
                  className="object-cover object-center transition-transform duration-700 ease-out lg:group-hover:scale-[1.04]"
                />
                {/* Bottom-fade overlay zorgt dat copy leesbaar blijft */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to bottom, transparent 50%, rgba(14,14,14,0.85) 90%, #0E0E0E 100%)',
                  }}
                />
              </div>

              {/* Copy — title + één-regel description */}
              <div className="relative px-5 py-5 lg:px-6 lg:py-6">
                <h3
                  className="font-display text-white uppercase tracking-[-0.01em] mb-1.5"
                  style={{ fontSize: 'clamp(1rem, 1.6vw, 1.3rem)', lineHeight: 1.1 }}
                >
                  {t(`cards.${scene.key}.title`)}
                </h3>
                <p className="font-body text-white/55 text-[0.85rem] lg:text-[0.92rem] leading-snug">
                  {t(`cards.${scene.key}.description`)}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
