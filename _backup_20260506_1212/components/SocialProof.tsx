'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: '50.000', unit: 'mAh', label: 'Capaciteit' },
  { value: '4.9', unit: '★', label: '2.400+ Reviews' },
  { value: '10.000+', unit: '', label: 'Tevreden klanten' },
  { value: '22.5', unit: 'W', label: 'Fast Charge' },
  { value: '2 jaar', unit: '', label: 'Garantie' },
];

export default function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div
      ref={ref}
      className="relative border-y border-white/[0.05] overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.015)' }}
    >
      {/* subtle orange line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF8C00]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-7">
        <div className="flex flex-wrap items-center justify-center lg:justify-between gap-6 lg:gap-0">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center px-6"
            >
              <div className="flex items-baseline gap-1 leading-none mb-1">
                <span className="text-white text-2xl font-black tracking-tight">{stat.value}</span>
                {stat.unit && (
                  <span className="text-[#FF8C00] text-lg font-black">{stat.unit}</span>
                )}
              </div>
              <span className="text-gray-600 text-xs uppercase tracking-widest font-medium">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF8C00]/40 to-transparent" />
    </div>
  );
}
