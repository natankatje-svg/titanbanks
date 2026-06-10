'use client';

import { useState, FormEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

interface RoadmapItem {
  label: string;
  name: string;
  tagline: string;
  status: string;
}

export default function MoreProductsComingSoon() {
  const t = useTranslations('more_products_coming_soon');
  const items = t.raw('items') as RoadmapItem[];
  const [email, setEmail] = useState('');
  const [state, setState] = useState<SubmitState>('idle');
  const prefersReducedMotion = useReducedMotion();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || state === 'submitting') return;
    setState('submitting');
    try {
      // Placeholder until Mailchimp wiring lands (Day 7).
      await new Promise((r) => setTimeout(r, 500));
      setState('success');
      setEmail('');
    } catch {
      setState('error');
    }
  }

  return (
    <section className="relative py-28 lg:py-40 bg-[#080808] overflow-hidden">
      {/* Faint atmospheric glow — much subtler than before */}
      <div
        aria-hidden
        className="absolute left-1/2 top-0 -translate-x-1/2 w-[820px] h-[280px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(255,140,0,0.045) 0%, transparent 65%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Header — asymmetric: eyebrow left, volume mark right */}
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-5 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-6 h-px bg-[#FF8C00]" />
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-[#9A9A9A]">
              {t('eyebrow')}
            </span>
          </div>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-[#5F5F5F]">
            {t('volume_mark')}
          </span>
        </div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="font-display uppercase text-white leading-[0.92] mb-6 max-w-3xl"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 4.8rem)' }}
        >
          {t('title')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-body text-[#A0A0A0] text-base lg:text-lg leading-relaxed max-w-2xl mb-16"
        >
          {t('intro')}
        </motion.p>

        {/* Roadmap list — typographic, asymmetric, archival */}
        <ol className="border-t border-white/[0.06]">
          {items.map((item, i) => {
            const isActive = i === 0;
            return (
              <motion.li
                key={i}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="relative grid grid-cols-[3.5rem_1fr_auto] sm:grid-cols-[5rem_1fr_auto] items-baseline gap-4 sm:gap-8 py-7 border-b border-white/[0.06]"
                style={isActive ? { background: 'linear-gradient(to right, rgba(255,140,0,0.04), transparent 60%)' } : undefined}
              >
                {/* Active row accent — thin orange rule at the left edge */}
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute left-0 top-3 bottom-3 w-px"
                    style={{ background: 'linear-gradient(to bottom, transparent, #FF8C00, transparent)' }}
                  />
                )}

                {/* Volume number */}
                <span
                  className={`font-display leading-none ${
                    isActive ? 'text-white' : 'text-[#3F3F3F]'
                  }`}
                  style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
                >
                  {item.label}
                </span>

                {/* Name + tagline */}
                <div className="min-w-0">
                  <h3
                    className={`font-display uppercase tracking-tight mb-1.5 ${
                      isActive ? 'text-white' : 'text-[#6F6F6F]'
                    }`}
                    style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2rem)', lineHeight: 1 }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className={`font-body text-sm sm:text-base leading-snug ${
                      isActive ? 'text-[#B5B5B5]' : 'text-[#5A5A5A]'
                    }`}
                  >
                    {item.tagline}
                  </p>
                </div>

                {/* Status */}
                <span
                  className={`font-mono text-[0.65rem] uppercase tracking-[0.22em] whitespace-nowrap ${
                    isActive ? 'text-[#FF8C00]' : 'text-[#5F5F5F]'
                  }`}
                >
                  {item.status}
                </span>
              </motion.li>
            );
          })}
        </ol>

        {/* Magazine-style subscribe footer */}
        <div className="mt-16 pt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-md">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-[#9A9A9A] mb-3">
              {t('signup_label')}
            </p>
            <p className="font-display text-white text-2xl lg:text-3xl leading-tight">
              {t('signup_prompt')}
            </p>
          </div>

          <div className="md:min-w-[360px] md:max-w-md md:w-1/2">
            {state === 'success' ? (
              <div className="flex items-center gap-3 border-b border-emerald-400/30 pb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="font-body text-emerald-300 text-sm leading-tight">
                  {t('cta_success')}
                </span>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex items-center gap-3 border-b border-white/[0.12] focus-within:border-[#FF8C00]/55 transition-colors">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('email_placeholder')}
                  aria-label={t('email_placeholder')}
                  className="flex-1 min-w-0 bg-transparent border-0 px-0 py-3 font-body text-white placeholder:text-[#5F5F5F] focus:outline-none text-sm"
                />
                <button
                  type="submit"
                  disabled={state === 'submitting'}
                  aria-label={t('cta_button')}
                  className="group flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-white hover:text-[#FF8C00] disabled:opacity-50 transition-colors py-3"
                >
                  {state === 'submitting' ? t('cta_sending') : t('cta_button')}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </form>
            )}
            {state === 'error' && (
              <p className="mt-2 font-body text-xs text-[#FCA5A5]">{t('cta_error')}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
