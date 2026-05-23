'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export default function MoreProductsComingSoon() {
  const t = useTranslations('more_products_coming_soon');
  const [email, setEmail] = useState('');
  const [state, setState] = useState<SubmitState>('idle');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || state === 'submitting') return;
    setState('submitting');
    try {
      // Placeholder: Mailchimp integratie volgt Day 6. Voor nu fake delay.
      await new Promise((r) => setTimeout(r, 500));
      setState('success');
      setEmail('');
    } catch {
      setState('error');
    }
  }

  return (
    <section className="relative py-24 lg:py-32 bg-[#0A0A0A] overflow-hidden">
      {/* Ambient orange glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255,107,0,0.06) 0%, transparent 65%)',
        }}
      />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-[#FF6B00]" />
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#888888]">
              Ecosystem
            </span>
            <div className="w-6 h-px bg-[#FF6B00]" />
          </div>

          <h2
            className="font-display uppercase text-white mb-6 leading-[0.9]"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}
          >
            {t('title')}
          </h2>

          <p className="font-body text-[#A0A0A0] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            {t('body')}
          </p>

          {state === 'success' ? (
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-emerald-500/30 bg-emerald-500/5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="font-body text-emerald-300 text-sm">
                {t('cta_success')}
              </span>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('cta_email')}
                aria-label={t('cta_email')}
                className="flex-1 px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-[#666666] focus:outline-none focus:border-[#FF6B00]/40 focus:bg-white/[0.06] transition-colors font-body text-sm"
              />
              <button
                type="submit"
                disabled={state === 'submitting'}
                className="btn-orange flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.8rem' }}
              >
                {t('cta_button')}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
