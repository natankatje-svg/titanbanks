'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Plus, Minus, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEcwid } from './EcwidProvider';
import {
  BRAND,
  SPECS,
  TBD,
  LAUNCH_STATE,
  safe,
  priceLabel,
  anchorPriceLabel,
} from '@/lib/product-claims';

const PAYMENT_METHODS = ['iDEAL', 'Apple Pay', 'Klarna', 'Visa', 'Mastercard', 'PayPal'];

/**
 * `embedded` — rendert alleen de kaart (zonder section/container) in één
 * kolom, voor gebruik als rechterkolom van de PDP op /shop.
 */
export default function BuyBox({ embedded = false }: { embedded?: boolean }) {
  const t = useTranslations('buy_box');
  const { addToCart } = useEcwid();
  const [qty, setQty] = useState(1);

  const inWaitlistMode = LAUNCH_STATE.waitlistMode;
  const returnDays = safe(TBD.returnPolicyDays) ?? 14;
  const warrantyYears = SPECS.warrantyYears.value;
  const price = priceLabel();
  const anchor = anchorPriceLabel();

  const onBuy = () => {
    if (inWaitlistMode) {
      window.location.href = '#waitlist';
      return;
    }
    addToCart(qty);
  };

  const card = (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={embedded ? 'rounded-stage p-7 lg:p-8' : 'rounded-3xl p-8 lg:p-12'}
          style={{
            background:
              'radial-gradient(ellipse 80% 90% at 18% 0%, rgba(255,140,0,0.05) 0%, transparent 55%), #111111',
            border: '1px solid rgba(255,140,0,0.18)',
          }}
        >
          <div className={embedded ? 'grid grid-cols-1 gap-8' : 'grid lg:grid-cols-2 gap-10 items-center'}>
            {/* Left: heading + price */}
            <div>
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-6 h-px bg-[#FF8C00]" />
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#9A9A9A]">
                  {t('eyebrow')}
                </span>
              </div>

              <h3
                className="font-display uppercase text-white mb-5 leading-[0.9]"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
              >
                {BRAND.product}
              </h3>

              {price && (
                <div className="flex items-end gap-3 mb-3">
                  <span
                    className="font-display text-white leading-none"
                    style={{ fontSize: 'clamp(2.4rem, 6vw, 3.4rem)' }}
                  >
                    {price}
                  </span>
                  {anchor && (
                    <span className="font-body text-[#8A8A8A] text-base line-through mb-2">
                      {anchor}
                    </span>
                  )}
                </div>
              )}
              <p className="font-body text-[#8A8A8A] text-xs mb-6">
                {t('incl_vat')}
              </p>

              {/* In-stock indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
                style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-emerald-300">
                  {t('in_stock')}
                </span>
              </div>

              <p className="font-body text-[#A0A0A0] text-sm leading-relaxed max-w-md">
                {t('shipping_line', { days: returnDays, years: warrantyYears })}
              </p>
            </div>

            {/* Right: quantity + CTA */}
            <div>
              {!inWaitlistMode && (
                <div className="mb-5">
                  <label className="block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#9A9A9A] mb-3">
                    {t('quantity')}
                  </label>
                  <div className="inline-flex items-stretch rounded-lg overflow-hidden border border-white/[0.08]">
                    <button
                      onClick={() => setQty((v) => Math.max(1, v - 1))}
                      aria-label="Minder"
                      className="px-4 hover:bg-white/[0.04] transition-colors text-[#A0A0A0]"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-6 py-3 font-display text-xl text-white min-w-[64px] text-center">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty((v) => Math.min(5, v + 1))}
                      aria-label="Meer"
                      className="px-4 hover:bg-white/[0.04] transition-colors text-[#A0A0A0]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={onBuy}
                className="btn-orange w-full justify-center mb-4"
                style={{ padding: '0.95rem 1.6rem', fontSize: '0.85rem' }}
              >
                <Zap className="w-[18px] h-[18px] fill-white flex-shrink-0" />
                {inWaitlistMode ? t('cta_waitlist') : t('cta_add_to_cart')}
              </button>

              {/* Payment methods */}
              <div className="flex flex-wrap items-center gap-1.5 justify-center mb-4">
                {PAYMENT_METHODS.map((m) => (
                  <span
                    key={m}
                    className="font-mono text-[0.6rem] px-2 py-0.5 rounded text-[#9CA3AF] border border-white/[0.07] bg-white/[0.03]"
                  >
                    {m}
                  </span>
                ))}
              </div>

              <p className="font-body text-[#8A8A8A] text-[11px] text-center leading-relaxed">
                <Check className="inline w-3 h-3 text-emerald-400 mr-1" />
                {t('secure_checkout')}
              </p>
            </div>
          </div>
        </motion.div>
  );

  if (embedded) return card;

  return (
    <section className="relative py-16 lg:py-20 bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto px-6">{card}</div>
    </section>
  );
}
