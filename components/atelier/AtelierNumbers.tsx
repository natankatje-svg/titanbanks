'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SPECS } from '@/lib/product-claims';

const EASE = [0.25, 1, 0.5, 1] as const;

/**
 * AtelierNumbers — de cijfers als couture-details: enorme Bodoni-cijfers,
 * kleine caps-labels, verticale hairlines. Copy = bestaande WhatsInside-strings.
 */
const NUMBERS = [
  {
    value: SPECS.capacityMah.value.toLocaleString('nl-NL'),
    label: 'mAh capaciteit',
    desc: 'Genoeg om dagen door te komen, niet uren.',
  },
  {
    value: SPECS.simultaneousDevices.value.toString(),
    label: 'apparaten tegelijk',
    desc: 'Via 4× USB-A plus ingebouwde USB-C en Lightning kabels.',
  },
  {
    value: SPECS.warrantyYears.value.toString(),
    label: 'jaar garantie',
    desc: 'Fabrieksgarantie op elke Titan X.',
  },
] as const;

export default function AtelierNumbers() {
  const reduce = useReducedMotion();

  return (
    <section className="relative border-t border-white/[0.08] bg-[#080808] py-20 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-14 text-center lg:mb-20"
        >
          <span className="font-body text-[0.66rem] uppercase tracking-[0.3em] text-white/55">
            Wat erin zit
          </span>
          <h2 className="mt-4 font-display leading-[1.05] text-white" style={{ fontSize: 'clamp(2.2rem, 4.4vw, 4rem)' }}>
            Pure <em className="italic text-titan-accent">capaciteit.</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 divide-y divide-white/[0.08] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {NUMBERS.map((n, i) => (
            <motion.div
              key={n.label}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
              className="px-6 py-10 text-center sm:py-4 lg:px-12"
            >
              <div className="font-display leading-none text-white" style={{ fontSize: 'clamp(3.4rem, 7vw, 6.4rem)' }}>
                {n.value}
              </div>
              <p className="mt-4 font-body text-[0.66rem] uppercase tracking-[0.28em] text-titan-accent">
                {n.label}
              </p>
              <p className="mx-auto mt-3 max-w-[240px] font-body text-sm leading-relaxed text-[#9C9C9C]">
                {n.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
