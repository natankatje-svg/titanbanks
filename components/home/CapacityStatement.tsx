'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEcwid } from '@/components/EcwidProvider';
import { SPECS, LAUNCH_STATE } from '@/lib/product-claims';

/**
 * CapacityStatement — het energieke USP-hart van akte 1: "50.000" telt op
 * terwijl je scrollt (sticky runway + scrub), op viewport-vullende Manrope-
 * schaal met een warme gloed-puls. Copy = bestaande WhatsInside-strings.
 * Reduced-motion: geen runway-effect, statisch eindgetal.
 */
export default function CapacityStatement() {
  const reduce = useReducedMotion();
  const { addToCart } = useEcwid();
  const ref = useRef<HTMLElement>(null);
  const target = SPECS.capacityMah.value; // 50000 (SSOT)
  const [shown, setShown] = useState(reduce ? target : 0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  // Count-up over het eerste deel van de runway; daarna rust het getal.
  const count = useTransform(scrollYProgress, [0.02, 0.45], [0, target]);
  const glow = useTransform(scrollYProgress, [0.02, 0.45, 1], [0.1, 0.45, 0.3]);

  useMotionValueEvent(count, 'change', (v) => {
    if (!reduce) setShown(Math.min(target, Math.round(v / 100) * 100));
  });

  const onBuy = () => {
    if (LAUNCH_STATE.waitlistMode) {
      window.location.href = '#waitlist';
      return;
    }
    addToCart();
  };

  return (
    <section
      ref={ref}
      className="relative bg-titan-bg border-y border-white/[0.06]"
      style={{ height: reduce ? 'auto' : '165vh', position: 'relative' }}
    >
      <div
        className={`${reduce ? 'relative py-28' : 'sticky top-0 h-screen'} flex items-center justify-center overflow-hidden`}
      >
        {/* warme gloed achter het getal — scrub-gestuurd */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[40vh] rounded-full blur-[140px]"
          style={{ background: 'rgba(255,140,0,1)', opacity: reduce ? 0.25 : glow }}
        />

        <div className="relative max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
          {/* kicker — bestaande sectie-string */}
          <span className="inline-flex items-center gap-3 mb-6">
            <span aria-hidden className="h-px w-6 bg-titan-accent/80" />
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/55">
              Wat erin zit
            </span>
            <span aria-hidden className="h-px w-6 bg-titan-accent/80" />
          </span>

          {/* het getal — viewport-schaal, tabular zodat de cijfers niet dansen */}
          <div
            className="font-display font-extrabold text-white leading-none tracking-[-0.035em] tabular-nums"
            style={{ fontSize: 'clamp(4.5rem, 17vw, 15rem)', textShadow: '0 0 80px rgba(255,140,0,0.25)' }}
            aria-label={`${target.toLocaleString('nl-NL')} mAh`}
          >
            {shown.toLocaleString('nl-NL')}
            <span className="font-mono text-titan-accent align-top ml-3 lg:ml-5" style={{ fontSize: 'clamp(1.1rem, 3vw, 2.4rem)', letterSpacing: '0.1em' }}>
              mAh
            </span>
          </div>

          {/* bestaande WhatsInside-copy */}
          <p className="font-display text-white font-bold uppercase tracking-[-0.02em] text-xl lg:text-3xl mt-8 mb-3 [text-wrap:balance]">
            Pure <span className="text-gradient-orange">capaciteit.</span>
          </p>
          <p className="font-body text-[#A0A0A0] text-base lg:text-lg leading-relaxed max-w-xl">
            Genoeg om dagen door te komen, niet uren. Geen ruis, geen loze specs.
          </p>

          {/* stille uitgangs-CTA */}
          <button
            onClick={onBuy}
            className="group mt-9 inline-flex items-center gap-2 font-body text-sm text-white/70 transition-colors hover:text-titan-accent"
          >
            <span className="underline underline-offset-4 decoration-white/30 group-hover:decoration-titan-accent/50">
              Bestel nu
            </span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
