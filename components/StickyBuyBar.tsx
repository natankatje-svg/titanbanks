'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Star } from 'lucide-react';

export default function StickyBuyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
              background: 'rgba(5,5,5,0.96)',
              backdropFilter: 'blur(20px)',
              borderColor: 'rgba(255,140,0,0.35)',
            }}
          >
            <div className="flex items-center gap-3 max-w-sm mx-auto">
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-white text-xl leading-none">€89,95</span>
                  <span className="font-body text-gray-600 text-sm line-through leading-none">€129,95</span>
                  <span className="font-mono-titan text-[0.65rem] rounded-full px-1.5 py-0.5 leading-none" style={{ background: 'rgba(255,140,0,0.12)', color: '#FF8C00', border: '1px solid rgba(255,140,0,0.25)' }}>−31%</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                  <span className="font-mono-titan text-gray-500 text-[0.58rem] tracking-wide">4.9 · 2.400+ reviews</span>
                  <span className="font-body text-gray-700 text-[0.58rem]">incl. BTW</span>
                </div>
              </div>
              <a
                href="#bestel"
                className="btn-orange flex-shrink-0"
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.85rem' }}
              >
                <Zap className="w-3.5 h-3.5 fill-white" />
                Bestel Nu
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
