'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Gedeelde design-primitives voor de homepage, in TitanBanks silent-luxury:
 *  - Eyebrow: stil kicker-systeem — kort oranje streepje + mono caps. Bewust
 *    géén pill/border/ping-dot meer: dat las als badge-lawaai op elke sectie.
 *  - SectionHeading: 2-regelige ultra-bold uppercase kop, accent op regel 2.
 *  - Watermark: gigantisch faint woord als diepte-laag achter een sectie.
 * Tokens: bg #0A0A0A/#141214, accent #FF8C00, Manrope (font-display, max 800).
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export function Eyebrow({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span aria-hidden className="h-px w-6 bg-[#FF8C00]/80" />
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/55">
        {children}
      </span>
    </span>
  );
}

/**
 * Pill-knop in ghost-stijl (rounded-full, hairline border) — secundaire CTA,
 * complement van de bestaande `.btn-orange` (primaire oranje pill).
 */
export function PillGhost({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/20 px-6 py-3 font-display text-sm font-extrabold uppercase tracking-[0.08em] text-white transition-colors hover:border-white/50 hover:bg-white/5 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * 2-regelige sectie-kop. `kicker` = kleine mono-eyebrow optioneel apart.
 * Regel 2 krijgt het oranje accent (template: accent op 2e regel).
 */
export function SectionHeading({
  lineOne,
  lineTwo,
  align = 'left',
  className = '',
  size = 'lg',
}: {
  lineOne: string;
  lineTwo?: string;
  align?: 'left' | 'center';
  className?: string;
  size?: 'lg' | 'xl';
}) {
  const reduce = useReducedMotion();
  const sizeClass =
    size === 'xl'
      ? 'text-[clamp(2.6rem,7vw,5.5rem)]'
      : 'text-[clamp(2.1rem,5vw,3.8rem)]';

  return (
    <motion.h2
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`font-display font-extrabold uppercase leading-[0.92] tracking-[-0.035em] text-white [text-wrap:balance] ${sizeClass} ${
        align === 'center' ? 'text-center' : ''
      } ${className}`}
    >
      {lineOne}
      {lineTwo && (
        <>
          <br />
          <span className="text-gradient-orange">{lineTwo}</span>
        </>
      )}
    </motion.h2>
  );
}

/**
 * Gigantisch, bijna onzichtbaar achtergrondwoord (template-detail) voor diepte.
 * Absoluut gepositioneerd; parent moet `relative overflow-hidden` zijn.
 */
export function Watermark({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display font-extrabold uppercase leading-none tracking-[-0.035em] ${className}`}
      style={{
        fontSize: 'clamp(8rem, 26vw, 26rem)',
        color: 'rgba(255,255,255,0.02)',
      }}
    >
      {children}
    </span>
  );
}
