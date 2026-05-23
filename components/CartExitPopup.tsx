'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Check } from 'lucide-react';
import { BRAND, LAUNCH_STATE } from '@/lib/product-claims';
import { analytics } from '@/lib/analytics-events';

// Cart-exit popup volgens CRO research:
// - NIET op homepage/PDP eerste bezoek (verlaagt premium-perceptie)
// - WEL op shop-pagina bij intent-to-leave (mouseout naar top boven 100px scroll)
// - Per-sessie 1× tonen (sessionStorage)
// - Email-capture met klein incentive

const SESSION_KEY = 'titanbanks_cartexit_shown';

interface CartExitPopupProps {
  /** Routes waar popup mag triggeren */
  enabledPaths?: string[];
  /** Minimum scroll-percentage voordat popup kan triggeren */
  minScrollPercent?: number;
}

export default function CartExitPopup({
  enabledPaths = ['/shop'],
  minScrollPercent = 25,
}: CartExitPopupProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [armed, setArmed] = useState(false);

  // Alleen actief op enabledPaths en als nog niet getoond dit sessie
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const path = window.location.pathname;
    if (!enabledPaths.some((p) => path.startsWith(p))) return;
    if (window.sessionStorage.getItem(SESSION_KEY) === '1') return;

    // Wacht op minimale scroll voordat popup kan triggeren
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      if (pct >= minScrollPercent) {
        setArmed(true);
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [enabledPaths, minScrollPercent]);

  // Exit-intent detection — mouse boven viewport-top
  useEffect(() => {
    if (!armed) return;
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !open) {
        setOpen(true);
        analytics.cartExitShown();
        window.sessionStorage.setItem(SESSION_KEY, '1');
      }
    };
    document.addEventListener('mouseout', onMouseOut);
    return () => document.removeEventListener('mouseout', onMouseOut);
  }, [armed, open]);

  const dismiss = () => {
    analytics.cartExitDismiss();
    setOpen(false);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    analytics.cartExitSubmit(email);
    // TODO: connect to waitlist API (zelfde endpoint)
    fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: 'cart-exit' }),
    }).catch(() => {
      // silent fail — popup is een nice-to-have
    });
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={dismiss}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-md mx-auto bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-7 md:p-8"
          >
            <button
              onClick={dismiss}
              className="absolute top-3 right-3 p-2 text-[#666666] hover:text-white"
              aria-label="Sluiten"
            >
              <X className="w-4 h-4" />
            </button>

            {submitted ? (
              <div className="text-center py-3">
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ background: 'rgba(255,107,0,0.12)', border: '1px solid rgba(255,107,0,0.3)' }}
                >
                  <Check className="w-6 h-6 text-[#FF6B00]" />
                </div>
                <h3 className="font-display text-2xl text-white mb-2">Bedankt.</h3>
                <p className="text-[#A0A0A0] text-sm">
                  Je krijgt één e-mail bij de launch. Daarna nooit meer, tenzij je vraagt.
                </p>
              </div>
            ) : (
              <>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[#FF6B00] mb-4">
                  Pre-launch toegang
                </p>
                <h3 className="font-display text-2xl md:text-3xl text-white leading-tight mb-3">
                  Wacht — eerste batch is beperkt.
                </h3>
                <p className="text-[#A0A0A0] text-sm leading-relaxed mb-5">
                  {LAUNCH_STATE.waitlistMode
                    ? `${BRAND.product} is pre-launch. Waitlist krijgt de bestel-link voordat de site live gaat.`
                    : `Krijg de eerste batch-link voor anderen. Eén e-mail, dan stilte tot launch.`}
                </p>

                <form onSubmit={submit} className="flex flex-col gap-3">
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="je@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white font-body placeholder:text-[#555555] focus:outline-none focus:border-[#FF6B00]/60 focus:ring-1 focus:ring-[#FF6B00]/30 transition-colors"
                  />
                  <button type="submit" className="btn-orange justify-center">
                    Stuur me de link
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-[#666666] mt-4">
                  Eén launch-mail · 1-klik uitschrijven
                </p>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
