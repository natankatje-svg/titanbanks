'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { useEcwid } from '@/components/EcwidProvider';
import { useLiveProduct } from '@/components/LiveProductProvider';
import { LAUNCH_STATE, priceLabel } from '@/lib/product-claims';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * OrderBand — smalle bestel-band onderaan subpagina's: kop + prijs + CTA op
 * puur zwart met subtiele gloed. Compacte tegenhanger van FinalePulse (die
 * blijft exclusief voor de homepage-finale).
 */
export default function OrderBand({ title, accent }: { title: string; accent: string }) {
  const t = useTranslations('hero');
  const reduce = useReducedMotion();
  const { addToCart } = useEcwid();
  const live = useLiveProduct();
  const price = live?.priceFormatted || priceLabel();
  const comparePrice = live?.compareAtFormatted ?? null;

  const onBuy = () => {
    if (LAUNCH_STATE.waitlistMode) {
      window.location.href = '#waitlist';
      return;
    }
    addToCart();
  };

  return (
    <section className="relative overflow-hidden border-t border-white/[0.07] bg-[#080808] py-20 lg:py-28">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 50% 70% at 50% 55%, rgba(255,140,0,0.08), transparent 70%)' }}
      />
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative mx-auto flex max-w-2xl flex-col items-center px-6 text-center"
      >
        <h2 className="font-display uppercase leading-[1.06] text-white [text-wrap:balance]" style={{ fontSize: 'clamp(1.9rem, 4vw, 3.2rem)' }}>
          {title} <span className="text-titan-accent">{accent}</span>
        </h2>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <button onClick={onBuy} className="btn-pulse group" aria-label={`${t('cta_buy_now')} ${price ?? ''}`}>
            <span>{t('cta_buy_now')}</span>
            {price && (
              <span className="opacity-80">
                · {price}
                {comparePrice && <span className="ml-1.5 text-white/45 line-through">{comparePrice}</span>}
              </span>
            )}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
