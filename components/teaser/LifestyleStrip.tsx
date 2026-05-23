'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function LifestyleStrip() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={ref} className="relative bg-black overflow-hidden">
      <div className="relative w-full h-[80svh] min-h-[420px] max-h-[720px] overflow-hidden">
        {/* Full-bleed cinematic image with subtle parallax */}
        <motion.div style={{ y: imageY }} className="absolute inset-0 scale-[1.06]">
          <Image
            src="/images/titanx/clean/lifestyle-auto.png"
            alt="Titan X in a car cupholder at night — built for festivals, road trips, and workdays without an outlet"
            fill
            sizes="100vw"
            className="object-cover object-center"
            loading="lazy"
          />
        </motion.div>

        {/* Edge-fades to pure #000 so the image bleeds into adjacent sections without a visible rectangle */}
        <div
          className="absolute inset-x-0 top-0 h-1/3 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, #000 0%, transparent 100%)' }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #000 0%, rgba(0,0,0,0.7) 30%, transparent 100%)' }}
        />
        <div
          className="absolute inset-y-0 left-0 w-[20%] pointer-events-none"
          style={{ background: 'linear-gradient(to right, #000 0%, transparent 100%)' }}
        />
        <div
          className="absolute inset-y-0 right-0 w-[20%] pointer-events-none"
          style={{ background: 'linear-gradient(to left, #000 0%, transparent 100%)' }}
        />

        {/* Copy overlay */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center px-6"
        >
          <div className="text-center max-w-3xl">
            <div className="section-label mb-4 flex items-center gap-3 justify-center">
              <div className="w-6 h-px bg-[#FF6B00]" />
              <span>Made for</span>
              <div className="w-6 h-px bg-[#FF6B00]" />
            </div>
            <p
              className="font-display uppercase text-white"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.6rem)',
                lineHeight: 0.92,
                letterSpacing: '-0.025em',
                textShadow: '0 4px 30px rgba(0,0,0,0.65)',
              }}
            >
              Festivals.<br className="sm:hidden" /> Road trips.<br className="hidden sm:inline" />{' '}
              Workdays without an outlet.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
