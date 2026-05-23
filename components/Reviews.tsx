'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Hourglass } from 'lucide-react';
import { LAUNCH_STATE } from '@/lib/product-claims';

// Pre-launch: geen verzonnen klantreviews meer.
// Bij Brand-rules: "Never invent reviews / counts" (forbidden_claims.md).
// Na launch: vul deze sectie met geverifieerde Trustpilot/Google reviews via API.

export default function Reviews() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  if (LAUNCH_STATE.isPreLaunch) {
    return (
      <section id="reviews" ref={ref} className="relative py-24 lg:py-36 bg-[#0A0A0A] overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,107,0,0.05) 0%, transparent 65%)' }}
        />

        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-[#FF6B00]" />
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#888888]">
                Reviews · in afwachting
              </span>
              <div className="w-6 h-px bg-[#FF6B00]" />
            </div>

            <h2
              className="font-display uppercase text-white mb-6"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', lineHeight: 0.92 }}
            >
              Echte reviews,<br />na de eerste batch.
            </h2>

            <p className="font-body text-[#A0A0A0] text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Titan X is pre-launch. We tonen alleen geverifieerde Trustpilot- en
              Google-reviews — zodra eerste batch verzonden is. Geen verzonnen
              quotes, geen fake aggregate.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a href="#waitlist" className="btn-orange">
                Kom op de waitlist
              </a>
              <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#666666]">
                <Hourglass className="inline w-3 h-3 mr-2" />
                Eerste batch: verzending bij launch
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // Post-launch: render echte reviews uit API.
  // TODO: connect to Trustpilot / Google Reviews API.
  return (
    <section id="reviews" ref={ref} className="relative py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 text-center text-[#888888]">
        Reviews worden geladen…
      </div>
    </section>
  );
}
