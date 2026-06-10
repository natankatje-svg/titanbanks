'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Battery, Smartphone, Lightbulb, Layers, Shield, Cable } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SPECS, BRAND, capacityLabel } from '@/lib/product-claims';

/**
 * FeatureBento — Apple-style asymmetric bento grid van Titan X kerncapaciteiten.
 *
 * Gebaseerd op de ui-ux-pro-max skill-aanbeveling "Bento Grid Showcase":
 * modular cards, asymmetrische verdeling, generous whitespace within, donker
 * met subtle gradient-borders. Vervangt de eerdere ProductShowcase 4-row
 * stack op de homepage met meer ritme + moderner feel.
 */

interface BentoCardProps {
  /** Tailwind grid-col-span instructie (op md+). */
  span: string;
  /** Tailwind grid-row-span instructie (op md+). */
  rowSpan?: string;
  eyebrow: string;
  icon?: React.ReactNode;
  /** Hoofdstat — bv. "50.000". Renders extra-large in display font. */
  stat?: string;
  /** Eenheid achter de stat — bv. "mAh". Renders kleiner ernaast. */
  unit?: string;
  title: string;
  body: string;
  accent?: 'orange' | 'teal' | 'gold' | 'neutral';
  /** Extra ambient effect — bv. radial glow */
  glow?: boolean;
}

const accentColors = {
  orange: { text: '#FF8C00', glow: 'rgba(255,140,0,0.16)', rule: '#FF8C00' },
  teal: { text: '#0EB5C8', glow: 'rgba(14,181,200,0.14)', rule: '#0EB5C8' },
  gold: { text: '#EAB308', glow: 'rgba(234,179,8,0.14)', rule: '#EAB308' },
  neutral: { text: '#E5E5E5', glow: 'rgba(255,255,255,0.05)', rule: 'rgba(255,255,255,0.25)' },
};

function BentoCard({
  span,
  rowSpan,
  eyebrow,
  icon,
  stat,
  unit,
  title,
  body,
  accent = 'neutral',
  glow = false,
}: BentoCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const c = accentColors[accent];

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`${span} ${rowSpan ?? ''} group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-gradient-to-br from-white/[0.025] to-white/[0.005] hover:border-white/[0.12] transition-colors duration-300`}
    >
      {/* Subtle accent ambient */}
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full blur-[80px] opacity-70"
          style={{ background: c.glow }}
        />
      )}

      {/* Accent corner hairline */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 w-8 h-px"
        style={{ background: c.rule }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 h-8 w-px"
        style={{ background: c.rule }}
      />

      <div className="relative h-full flex flex-col p-7 md:p-8">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          {icon && (
            <span
              className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center border border-white/[0.08]"
              style={{ background: 'rgba(255,255,255,0.025)', color: c.text }}
            >
              {icon}
            </span>
          )}
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-[#888888]">
            {eyebrow}
          </span>
        </div>

        {/* Hero stat (optional) */}
        {stat && (
          <div className="mb-5 flex items-baseline gap-2">
            <span
              className="font-display leading-none text-white"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 4.6rem)', letterSpacing: '-0.03em' }}
            >
              {stat}
            </span>
            {unit && (
              <span
                className="font-mono uppercase tracking-[0.18em] text-base"
                style={{ color: c.text }}
              >
                {unit}
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h3
          className="font-display text-white leading-tight mb-2"
          style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)', letterSpacing: '-0.01em' }}
        >
          {title}
        </h3>

        {/* Body */}
        <p className="font-body text-[#9A9A9A] text-sm leading-relaxed mt-auto">
          {body}
        </p>
      </div>
    </motion.div>
  );
}

export default function FeatureBento() {
  const t = useTranslations('feature_bento');
  const capacity = SPECS.capacityMah.value.toLocaleString('nl-NL');

  return (
    <section className="relative py-24 lg:py-36 bg-[#080808] overflow-hidden">
      {/* Atmospheric ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        style={{
          background:
            'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(255,140,0,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header — asymmetric to match bento ritme */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-8 mb-14 items-end">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-[#FF8C00]" />
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-[#9A9A9A]">
                {t('eyebrow')}
              </span>
            </div>
            <h2
              className="font-display uppercase text-white leading-[0.92]"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', letterSpacing: '-0.02em' }}
            >
              {t('title')}
            </h2>
          </div>
          <p className="font-body text-[#A0A0A0] text-base lg:text-lg leading-relaxed max-w-2xl md:justify-self-end">
            {t('intro', { product: BRAND.product, capacity: capacityLabel() })}
          </p>
        </div>

        {/* Bento grid — 4 cols x 4 rows on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-[auto_auto_auto] gap-4 md:gap-5">
          {/* HERO card — capacity (2x2) */}
          <BentoCard
            span="md:col-span-2"
            rowSpan="md:row-span-2"
            eyebrow={t('cards.capacity.eyebrow')}
            icon={<Battery className="w-4 h-4" />}
            stat={capacity}
            unit="mAh"
            title={t('cards.capacity.title')}
            body={t('cards.capacity.body')}
            accent="orange"
            glow
          />

          {/* Devices (2x1 wide) */}
          <BentoCard
            span="md:col-span-2"
            eyebrow={t('cards.devices.eyebrow')}
            icon={<Smartphone className="w-4 h-4" />}
            stat={SPECS.simultaneousDevices.value.toString()}
            unit={t('cards.devices.unit')}
            title={t('cards.devices.title')}
            body={t('cards.devices.body')}
            accent="teal"
          />

          {/* Ports (1x1) */}
          <BentoCard
            span="md:col-span-1"
            eyebrow={t('cards.ports.eyebrow')}
            icon={<Cable className="w-4 h-4" />}
            stat="6"
            unit={t('cards.ports.unit')}
            title={t('cards.ports.title')}
            body={t('cards.ports.body')}
            accent="neutral"
          />

          {/* Flashlight (1x1) */}
          <BentoCard
            span="md:col-span-1"
            eyebrow={t('cards.flashlight.eyebrow')}
            icon={<Lightbulb className="w-4 h-4" />}
            title={t('cards.flashlight.title')}
            body={t('cards.flashlight.body')}
            accent="gold"
            glow
          />

          {/* Design — wide */}
          <BentoCard
            span="md:col-span-2"
            eyebrow={t('cards.design.eyebrow')}
            icon={<Layers className="w-4 h-4" />}
            title={t('cards.design.title')}
            body={t('cards.design.body')}
            accent="neutral"
          />

          {/* Warranty */}
          <BentoCard
            span="md:col-span-2"
            eyebrow={t('cards.warranty.eyebrow')}
            icon={<Shield className="w-4 h-4" />}
            stat={SPECS.warrantyYears.value.toString()}
            unit={t('cards.warranty.unit')}
            title={t('cards.warranty.title')}
            body={t('cards.warranty.body')}
            accent="orange"
          />
        </div>
      </div>
    </section>
  );
}
