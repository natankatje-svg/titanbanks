'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('tb-cookie-consent')) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('tb-cookie-consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('tb-cookie-consent', 'declined');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:w-[340px] z-[60]"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <div
            className="rounded-2xl p-5"
            style={{
              background: 'rgba(12,12,12,0.97)',
              border: '1px solid rgba(255,255,255,0.09)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.7)',
            }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Cookie className="w-4 h-4 flex-shrink-0" style={{ color: '#FF6B00' }} />
                <p className="font-body text-white font-semibold text-sm">Cookies & Privacy</p>
              </div>
              <button
                onClick={decline}
                className="text-gray-600 hover:text-gray-300 transition-colors flex-shrink-0 -mt-0.5 -mr-0.5 p-0.5"
                aria-label="Weigeren en sluiten"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="font-body text-gray-500 text-xs leading-relaxed mb-4">
              We gebruiken cookies om de website te verbeteren en anonieme statistieken bij te houden.
              Lees ons{' '}
              <a
                href="#"
                className="text-gray-400 underline hover:text-gray-200 transition-colors"
              >
                privacybeleid
              </a>
              .
            </p>
            <div className="flex gap-2">
              <button
                onClick={accept}
                className="btn-orange flex-1 text-center justify-center"
                style={{ padding: '0.5rem 0.75rem', fontSize: '0.75rem' }}
              >
                Accepteren
              </button>
              <button
                onClick={decline}
                className="btn-ghost flex-1 text-center justify-center"
                style={{ padding: '0.5rem 0.75rem', fontSize: '0.75rem' }}
              >
                Weigeren
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
