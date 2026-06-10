'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import Kicker from '@/components/pulse/Kicker';

const EASE = [0.22, 1, 0.36, 1] as const;

export type FeatureRow = {
  kicker: string;
  title: string;
  body: string;
  /** Goedgekeurd productbeeld uit /images/titanx/gallery/v2/. */
  img: string;
  alt: string;
};

/**
 * FeatureRows — afwisselende beeld/copy-rijen op puur zwart voor
 * subpagina's (pulse-stijl: hairlines, kickers, zachte entrance-fades).
 * Beelden tonen volledig (contain) op een donkere stage — nooit afgesneden.
 */
export default function FeatureRows({ rows }: { rows: FeatureRow[] }) {
  const reduce = useReducedMotion();

  return (
    <section className="relative border-t border-white/[0.07] bg-[#080808]">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        {rows.map((row, i) => {
          const flip = i % 2 === 1;
          return (
            <div
              key={row.title}
              className={`grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20 ${i > 0 ? 'border-t border-white/[0.07]' : ''}`}
            >
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6, ease: EASE }}
                className={flip ? 'lg:order-2' : ''}
              >
                <Kicker>{row.kicker}</Kicker>
                <h2 className="mt-3 font-display uppercase leading-[1.06] text-white [text-wrap:balance]" style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.6rem)' }}>
                  {row.title}
                </h2>
                <p className="mt-5 max-w-md font-body text-base leading-relaxed text-[#C9C9C9]">
                  {row.body}
                </p>
              </motion.div>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
                className={`flex justify-center ${flip ? 'lg:order-1 lg:justify-start' : 'lg:justify-end'}`}
              >
                <div className="card-shine relative aspect-[4/5] w-[82%] max-w-[420px] overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0C0C0C] shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_50px_rgba(255,140,0,0.1)]">
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 45%, rgba(255,140,0,0.06), transparent 70%)' }}
                  />
                  <Image
                    src={row.img}
                    alt={row.alt}
                    fill
                    sizes="(max-width: 1024px) 82vw, 420px"
                    className="object-contain p-3"
                  />
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
