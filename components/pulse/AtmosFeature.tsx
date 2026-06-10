'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useEcwid } from '@/components/EcwidProvider';
import { LAUNCH_STATE, BRAND } from '@/lib/product-claims';
import { TiltCard, ParallaxImg } from '@/components/pulse/motion';
import Kicker from '@/components/pulse/Kicker';
import { ArrowRight } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

export type AtmosFeatureProps = {
  kicker: string;
  title: string;
  accent: string;
  body: string;
  /** Productloos sfeerbeeld — full-bleed parallax-achtergrond. Weglaten/null = donkere sectie op puur zwart. */
  atmosphere?: string | null;
  /** Goedgekeurde productfoto — zwevende tilt-card op de voorgrond. */
  product: string;
  productAlt: string;
  productPos?: string;
  flip?: boolean;
};

/**
 * AtmosFeature — use-case-sectie met zwevende 3D-tilt productfoto. Met
 * `atmosphere` = full-bleed sfeerbeeld (productloos, parallax) als
 * achtergrond; zonder = donkere sectie op puur zwart, zodat sfeerbanden
 * elkaar afwisselen i.p.v. opstapelen.
 */
export default function AtmosFeature({
  kicker,
  title,
  accent,
  body,
  atmosphere = null,
  product,
  productAlt,
  productPos = 'object-center',
  flip = false,
}: AtmosFeatureProps) {
  const reduce = useReducedMotion();
  const { addToCart } = useEcwid();
  const onBuy = () => {
    if (LAUNCH_STATE.waitlistMode) {
      window.location.href = '#waitlist';
      return;
    }
    addToCart();
  };

  return (
    <section className={`relative overflow-hidden border-t border-white/[0.07] py-20 lg:py-28 ${atmosphere ? '' : 'bg-[#080808]'}`}>
      {/* sfeer-achtergrond met parallax (alleen bij sfeerband-variant) */}
      {atmosphere && (
        <div aria-hidden className="absolute inset-0">
          <ParallaxImg className="h-full">
            <Image src={atmosphere} alt="" fill sizes="100vw" className="object-cover" />
          </ParallaxImg>
          {/* scrims voor leesbaarheid */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #080808 0%, rgba(8,8,8,0.25) 30%, rgba(8,8,8,0.45) 75%, #080808 100%)' }} />
          <div
            className="absolute inset-0"
            style={{
              background: flip
                ? 'linear-gradient(to left, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.45) 45%, transparent 70%)'
                : 'linear-gradient(to right, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.45) 45%, transparent 70%)',
            }}
          />
        </div>
      )}

      <div className="relative flex items-center">
        <div className="mx-auto grid w-full max-w-[1440px] items-center gap-10 px-6 lg:grid-cols-2 lg:px-10">
          {/* copy */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE }}
            className={flip ? 'lg:order-2' : ''}
          >
            <Kicker>{kicker}</Kicker>
            <h2 className="mt-3 font-display uppercase leading-[1.06] text-white [text-wrap:balance]" style={{ fontSize: 'clamp(1.9rem, 4vw, 3.2rem)', ...(atmosphere ? { textShadow: '0 2px 30px rgba(0,0,0,0.6)' } : {}) }}>
              {title} <span className="text-titan-accent">{accent}</span>
            </h2>
            <p className="mt-5 max-w-md font-body text-base leading-relaxed text-[#C9C9C9]" style={atmosphere ? { textShadow: '0 1px 14px rgba(0,0,0,0.7)' } : undefined}>
              {body}
            </p>
            <button onClick={onBuy} className="group mt-7 inline-flex items-center gap-2 font-body text-sm font-600 text-white transition-colors hover:text-titan-accent">
              <span className="underline decoration-white/30 underline-offset-4 group-hover:decoration-titan-accent/60">Bestel nu</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </button>
          </motion.div>

          {/* zwevende product-tilt-card */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className={`flex justify-center ${flip ? 'lg:order-1 lg:justify-start' : 'lg:justify-end'}`}
          >
            <TiltCard className="w-[78%] max-w-[380px] overflow-hidden rounded-2xl border border-white/[0.14] shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_50px_rgba(255,140,0,0.12)]">
              <div className="relative aspect-[4/5]">
                <Image
                  src={product}
                  alt={`${BRAND.product} — ${productAlt}`}
                  fill
                  sizes="(max-width: 1024px) 78vw, 380px"
                  className={`object-cover ${productPos}`}
                />
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
