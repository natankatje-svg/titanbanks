'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import { useEcwid } from './EcwidProvider';
import {
  BRAND,
  LAUNCH_STATE,
  priceLabel,
  anchorPriceLabel,
  capacityLabel,
} from '@/lib/product-claims';

export default function StickyBuyBar() {
  const { addToCart } = useEcwid();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const price = priceLabel();
  const anchor = anchorPriceLabel();
  const isWaitlist = LAUNCH_STATE.waitlistMode;

  const handleCta = () => {
    if (isWaitlist) {
      const target = document.getElementById('waitlist');
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      addToCart();
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <div
            className="border-t px-4 py-3"
            style={{
              background: 'rgba(10,10,10,0.96)',
              backdropFilter: 'blur(20px)',
              borderColor: 'rgba(255,140,0,0.35)',
            }}
          >
            <div className="flex items-center gap-3 max-w-sm mx-auto">
              <div className="flex-1 min-w-0">
                {price ? (
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-white text-xl leading-none">{price}</span>
                    {anchor && (
                      <span className="font-body text-gray-600 text-sm line-through leading-none">
                        {anchor}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="font-display text-white text-xl leading-none">{BRAND.product}</span>
                )}
                <div className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-[#9A9A9A] mt-0.5">
                  {capacityLabel()} · matte black
                </div>
              </div>
              <button
                onClick={handleCta}
                className="btn-console flex-shrink-0"
                style={{ padding: '0.7rem 1.4rem', fontSize: '0.75rem' }}
              >
                <Zap className="w-3.5 h-3.5 fill-[#080808]" />
                {isWaitlist ? 'Waitlist' : 'Bestel'}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
