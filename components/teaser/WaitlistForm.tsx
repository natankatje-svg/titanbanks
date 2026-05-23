'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function WaitlistForm() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    setMessage('');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
        return;
      }
      setStatus('success');
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  }

  return (
    <section
      id="waitlist"
      ref={ref}
      className="relative bg-black py-32 lg:py-44 overflow-hidden"
    >
      {/* Larger ambient orange halo behind the form — the page's final exhale */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          width: 'min(900px, 95vw)',
          height: 'min(900px, 95vw)',
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(circle, rgba(255,107,0,0.20) 0%, rgba(255,107,0,0.06) 40%, transparent 75%)',
          filter: 'blur(100px)',
          mixBlendMode: 'screen',
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-xl mx-auto px-6 text-center"
      >
        <div className="section-label mb-5 flex items-center gap-3 justify-center">
          <div className="w-6 h-px bg-[#FF6B00]" />
          <span>05 · Waitlist</span>
          <div className="w-6 h-px bg-[#FF6B00]" />
        </div>
        <h2
          className="font-display uppercase text-white mb-5"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 5rem)', lineHeight: 0.82, letterSpacing: '-0.025em' }}
        >
          The drop is coming.
        </h2>
        <div
          className="h-[2px] w-24 mx-auto mb-7 origin-center"
          style={{ background: 'linear-gradient(to right, transparent, #FF6B00, transparent)' }}
        />
        <p className="font-body text-gray-400 text-lg leading-relaxed mb-10 max-w-md mx-auto">
          Waitlist gets the link before launch. Limited first run.
        </p>

        <div
          className="glass-card rounded-2xl p-6 lg:p-8 text-left"
          style={{ border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={onSubmit}
                className="flex flex-col gap-3"
              >
                <label htmlFor="waitlist-email" className="section-label text-gray-400">
                  Email
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    id="waitlist-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'submitting'}
                    className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white font-body placeholder:text-gray-600 focus:outline-none focus:border-[#FF6B00]/60 focus:ring-1 focus:ring-[#FF6B00]/30 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-orange flex items-center justify-center gap-2 disabled:opacity-60"
                    style={{ padding: '0.85rem 1.6rem' }}
                  >
                    {status === 'submitting' ? 'Joining…' : 'Join waitlist'}
                    {status !== 'submitting' && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
                <p className="font-body text-xs text-gray-500 mt-1">
                  One launch email. Unsubscribe in one click.{' '}
                  <a href="/privacy" className="underline hover:text-gray-300">Privacy</a>.
                </p>
                {status === 'error' && message && (
                  <p className="font-body text-sm text-red-400 mt-2">{message}</p>
                )}
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center py-6"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{ background: 'rgba(255,107,0,0.12)', border: '1px solid rgba(255,107,0,0.3)' }}
                >
                  <Check className="w-6 h-6" style={{ color: '#FF6B00' }} />
                </div>
                <h3 className="font-display uppercase text-white text-2xl mb-2">You&rsquo;re on the list.</h3>
                <p className="font-body text-gray-400 max-w-sm">We&rsquo;ll email once. Then never again, unless you ask.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
