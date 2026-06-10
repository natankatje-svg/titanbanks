'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Usb, Cable, Plug } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { BRAND } from '@/lib/product-claims';

interface PortRow {
  Icon: typeof Usb;
  titleKey: string;
  descKey: string;
  accent: string;
}

const PORT_ROWS: PortRow[] = [
  { Icon: Usb, titleKey: 'usb_a', descKey: 'usb_a_desc', accent: '#FF8C00' },
  { Icon: Cable, titleKey: 'usb_c', descKey: 'usb_c_desc', accent: '#FF8C00' },
  { Icon: Plug, titleKey: 'micro_usb', descKey: 'micro_usb_desc', accent: '#FF8C00' },
];

export default function PortsVisual() {
  const t = useTranslations('ports_visual');

  return (
    <section className="relative py-24 lg:py-32 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-[#FF8C00]" />
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#888888]">
              {t('eyebrow')}
            </span>
            <div className="w-6 h-px bg-[#FF8C00]" />
          </div>
          <h2
            className="font-display uppercase text-white"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4rem)', lineHeight: 0.9 }}
          >
            {t('title')}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl overflow-hidden"
            style={{
              boxShadow:
                '0 0 0 1px rgba(255,255,255,0.05), 0 30px 60px rgba(0,0,0,0.6), 0 0 60px rgba(255,140,0,0.05)',
            }}
          >
            <Image
              src="/images/product-ports.jpg"
              alt={`${BRAND.product} — 4× USB-A poorten plus ingebouwde USB-C en Lightning kabels`}
              width={900}
              height={700}
              className="w-full h-auto object-cover"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 60%, rgba(255,140,0,0.05) 0%, transparent 60%)',
              }}
            />
          </motion.div>

          {/* Right: ports list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {PORT_ROWS.map(({ Icon, titleKey, descKey, accent }) => (
              <div key={titleKey} className="flex gap-4">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${accent}15`,
                    border: `1px solid ${accent}30`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: accent }} />
                </div>
                <div>
                  <h3 className="font-display text-white text-xl uppercase tracking-wide mb-1">
                    {t(titleKey)}
                  </h3>
                  <p className="font-body text-[#A0A0A0] text-sm leading-relaxed">
                    {t(descKey)}
                  </p>
                </div>
              </div>
            ))}

            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#666666] pt-4 border-t border-white/[0.05]">
              {t('footnote')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
