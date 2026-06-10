'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { BRAND, portsLabel } from '@/lib/product-claims';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * SystemView — het laad-systeem als technisch tweeluik: poortencluster
 * (top-down) + de ingebouwde kabels (cinematische render), met genummerde
 * specificatie-bullets. Copy = bestaande ProductShowcase/SSOT-strings.
 */
const FRAMES = [
  {
    src: '/images/titanx/gallery/v2/studio-ports-dark.webp',
    alt: `${BRAND.product} — poortencluster top-down: 4× USB-A`,
    caption: portsLabel(),
    aspect: 'aspect-square',
  },
  {
    src: '/images/titanx/gallery/v2/cables-cinematic.webp',
    alt: `${BRAND.product} — beide ingebouwde kabels uitgetrokken`,
    caption: 'Ingebouwde USB-C + Lightning kabels',
    aspect: 'aspect-square',
  },
] as const;

const BULLETS = [
  'Tot 6 apparaten tegelijkertijd',
  'Ingebouwde USB-C + Lightning kabels',
  '50.000 mAh capaciteit',
] as const;

export default function SystemView() {
  const reduce = useReducedMotion();

  return (
    <section className="relative border-t border-white/[0.08] bg-[#0A0A0A] py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* tekstkolom */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex flex-col justify-center lg:col-span-4"
          >
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-titan-accent">
              Multi-device
            </span>
            <h2 className="mt-3 font-display uppercase leading-[0.95] text-white [text-wrap:balance]" style={{ fontSize: 'clamp(1.9rem, 4vw, 3.2rem)' }}>
              Tot 6 devices <span className="text-titan-accent">tegelijk.</span>
            </h2>
            <p className="mt-5 font-body text-base leading-relaxed text-[#9C9C9C]">
              Smartphone, tablet, oordopjes, camera — alles tegelijk via 4× USB-A poorten
              plus 2 ingebouwde kabels (USB-C en Lightning).
            </p>
            <ul className="mt-7 space-y-0 border-t border-white/[0.08]">
              {BULLETS.map((b, i) => (
                <li key={b} className="flex items-center gap-3 border-b border-white/[0.08] py-3.5">
                  <span className="font-mono text-[0.6rem] text-titan-accent">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-body text-sm text-gray-300">{b}</span>
                  <Check className="ml-auto h-3.5 w-3.5 text-titan-accent" aria-hidden />
                </li>
              ))}
            </ul>
          </motion.div>

          {/* tweeluik */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
            {FRAMES.map((f, i) => (
              <motion.figure
                key={f.src}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
                className="group relative overflow-hidden border border-white/[0.08]"
              >
                <div className={`relative ${f.aspect}`}>
                  <Image
                    src={f.src}
                    alt={f.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="flex items-center justify-between gap-3 border-t border-white/[0.08] bg-[#080808] px-4 py-3">
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/70">
                    {f.caption}
                  </span>
                  <span className="font-mono text-[0.58rem] text-titan-accent">FIG.{i + 1}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
