'use client';

import { motion } from 'framer-motion';
import { Package, RefreshCcw, ShieldCheck, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { SPECS, TBD, safe } from '@/lib/product-claims';

interface CardSpec {
  Icon: typeof Package;
  titleKey: string;
  bodyKey: string;
  linkKey: string;
  href: string;
  accent: string;
  values?: Record<string, string | number>;
}

export default function ShippingReturnsWarranty() {
  const t = useTranslations('shipping_returns_warranty');
  const returnDays = safe(TBD.returnPolicyDays) ?? 14;
  const warrantyYears = SPECS.warrantyYears.value;

  const cards: CardSpec[] = [
    {
      Icon: Package,
      titleKey: 'shipping_title',
      bodyKey: 'shipping_body',
      linkKey: 'shipping_link',
      href: '/legal/policies#shipping',
      accent: '#FF8C00',
    },
    {
      Icon: RefreshCcw,
      titleKey: 'returns_title',
      bodyKey: 'returns_body',
      linkKey: 'returns_link',
      href: '/legal/policies#returns',
      accent: '#FF8C00',
      values: { days: returnDays },
    },
    {
      Icon: ShieldCheck,
      titleKey: 'warranty_title',
      bodyKey: 'warranty_body',
      linkKey: 'warranty_link',
      href: '/legal/policies#warranty',
      accent: '#FF8C00',
      values: { years: warrantyYears },
    },
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto px-6">
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

        <div className="grid md:grid-cols-3 gap-5">
          {cards.map(({ Icon, titleKey, bodyKey, linkKey, href, accent, values }, i) => (
            <motion.div
              key={titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group rounded-2xl p-6 lg:p-7 flex flex-col"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: `${accent}15`,
                  border: `1px solid ${accent}30`,
                }}
              >
                <Icon className="w-5 h-5" style={{ color: accent }} />
              </div>

              <h3 className="font-display uppercase text-white text-lg lg:text-xl mb-3 leading-tight">
                {t(titleKey, values)}
              </h3>

              <p className="font-body text-[#A0A0A0] text-sm leading-relaxed flex-1 mb-5">
                {t(bodyKey, values)}
              </p>

              <Link
                href={href}
                className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] transition-colors duration-200 hover:text-white"
                style={{ color: accent }}
              >
                {t(linkKey)}
                <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
