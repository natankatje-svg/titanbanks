'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Zap, BatteryCharging, Plug, Gauge } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useEcwid } from '@/components/EcwidProvider';
import { FloatingPaths } from '@/components/ui/background-paths';
import { MeshGradientBg } from '@/components/ui/mesh-gradient-bg';
import {
  BRAND,
  SPECS,
  TBD,
  LAUNCH_STATE,
  priceLabel,
  safe,
} from '@/lib/product-claims';

// 4 spec-icons — geen tekstparagrafen, geen bullets, geen dropdown.
// Pure number+icon=instant signal voor scannen. Volgorde = belangrijk:
// capaciteit (de hook), poorten (de utility), watts (de speed), feature (de plus).
const SPEC_ICONS = [
  { icon: BatteryCharging, key: 'capacity' },
  { icon: Plug, key: 'devices' },
  { icon: Gauge, key: 'fastcharge' },
  { icon: Zap, key: 'display' },
] as const;

/**
 * HeroVariantB — V3 minimal conversion hero.
 *
 * Eén scherm, één doel: BESTEL NU.
 *
 * Compositie:
 * - Stock badge (scarcity-driver: "eerste batch · N beschikbaar")
 * - Product cutout links (desktop) / top (mobile)
 * - TITAN X massive heading + tagline
 * - 4 spec-icons als horizontale rij (geen prose)
 * - Prijs + grote oranje CTA
 * - Trust-strip mini (verzending · retour · veilig betalen)
 *
 * Verwijderd t.o.v. V2: brand-chip met volume-marker, USP-bullet-prose,
 * specs-dropdown, motto. Alles wat informeert in plaats van converteert.
 */
export default function HeroVariantB() {
  const locale = useLocale();
  const t = useTranslations('hero');
  const { addToCart } = useEcwid();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const contentFade = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  const isWaitlist = LAUNCH_STATE.waitlistMode;
  const onBuy = () => {
    if (isWaitlist) {
      window.location.href = '#waitlist';
      return;
    }
    addToCart();
  };

  // Stock — eerste batch hardcoded op 100 totdat Ecwid stock-feed live is.
  // Wanneer de Ecwid integratie binnen is: vervang door fetch naar
  // /api/stock dat de live count uit Ecwid trekt.
  const batchSize = 100;

  const capacityFormatted = SPECS.capacityMah.value.toLocaleString(locale);
  const wattage = safe(TBD.fastChargeWattage) ?? 22.5;

  return (
    <section
      ref={ref}
      className="relative flex flex-col overflow-hidden bg-[#050505] text-white min-h-[100svh] lg:min-h-[92vh]"
    >
      {/* Layer 0 — MeshGradient WebGL background */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <MeshGradientBg />
      </div>

      {/* Layer 2 — radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            'radial-gradient(ellipse 80% 70% at 35% 55%, rgba(5,5,5,0.0) 0%, rgba(5,5,5,0.45) 60%, rgba(5,5,5,0.95) 100%)',
        }}
      />

      {/* Layer 2 — top/bottom fades */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]/95 pointer-events-none"
        style={{ zIndex: 2 }}
      />

      {/* Layer 2 — ambient orange aura stack */}
      <div
        className="absolute top-[44%] left-[27%] -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] rounded-full blur-[240px] pointer-events-none"
        style={{ zIndex: 2, background: 'rgba(255,107,0,0.10)' }}
      />
      <div
        className="absolute top-[46%] left-[26%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[180px] pointer-events-none"
        style={{ zIndex: 2, background: 'rgba(255,120,30,0.13)' }}
      />

      {/* Layer 2 — subtle FloatingPaths */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        <FloatingPaths position={1} />
      </div>

      {/* Layer 3 — DESKTOP absolute product cutout (left half) */}
      {/* Desktop cutout — gecentreerd BINNEN het visuele linker-helft canvas.
          De grid hieronder geeft de rechter-helft aan content; deze layer
          spans dezelfde linker-helft maar centreert het product daarin met
          object-center i.p.v. tegen de viewport-rand te plakken.
          Subtiele idle-float animatie (±5px over 7s) geeft het product
          leven zonder afleiding — respect prefers-reduced-motion via
          motion.div animate-prop. */}
      <motion.div
        aria-hidden
        className="hidden lg:block absolute lg:inset-y-0 lg:left-0 lg:w-1/2 pointer-events-none"
        style={{ zIndex: 3 }}
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Image
          src="/images/titanx/cutout/slot-02-cutout.png"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-contain object-center select-none [mask-image:linear-gradient(to_right,black_0%,black_82%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,black_0%,black_82%,transparent_100%)]"
        />
      </motion.div>

      {/* Layer 10 — content */}
      <motion.div
        style={{ y: contentY, opacity: contentFade, zIndex: 10 }}
        className="relative w-full max-w-7xl mx-auto px-6 lg:px-10 pt-20 lg:pt-24 pb-12 lg:pb-20 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-x-12 items-center"
      >
        <div aria-hidden className="hidden lg:block lg:min-h-[520px]" />

        <div className="flex flex-col items-start text-left max-w-xl lg:max-w-[560px]">
          {/* Stock badge BOVENAAN op mobile — eerste indruk = scarcity-hook.
              Op desktop blijft de logische volgorde gelijk (de absolute
              cutout-laag links domineert visueel sowieso). */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4 lg:mb-5 self-start"
            style={{
              background: 'rgba(255,107,0,0.08)',
              border: '1px solid rgba(255,107,0,0.28)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF6B00] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B00]" />
            </span>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white">
              {t('stock_badge', { count: batchSize })}
            </span>
          </motion.div>

          {/* MOBILE-only cutout in-flow — na de scarcity-badge zodat de
              eerste-indruk-hierarchy klopt: badge → product → naam → CTA. */}
          <div className="lg:hidden relative w-full h-[200px] mb-3">
            <Image
              src="/images/titanx/cutout/slot-02-cutout.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-contain object-center select-none"
            />
          </div>

          {/* PRODUCT NAME — single anchor */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-white uppercase leading-[0.88] tracking-[-0.035em] mb-2 lg:mb-3"
            style={{ fontSize: 'clamp(2.6rem, 7.4vw, 6.5rem)' }}
          >
            {BRAND.product}
          </motion.h1>

          {/* Tagline — one-liner, no paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="font-display uppercase tracking-[-0.01em] mb-6 lg:mb-9 text-white/85"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', lineHeight: 1, fontWeight: 700 }}
          >
            <span>{capacityFormatted} mAh. </span>
            <span className="text-gradient-orange">{t('tagline_accent')}</span>
          </motion.p>

          {/* Spec-icons grid — 2×2 op mobile (tekst leesbaar), 1×4 op lg+
              (horizontale scan-row). Voorkomt cramped wrappen van "50.000 mAh"
              op kleine viewports. */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.28 } } }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2 lg:gap-3 mb-6 lg:mb-8 w-full"
          >
            {SPEC_ICONS.map(({ icon: Icon, key }) => (
              <motion.div
                key={key}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-xl"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Icon className="w-4 h-4 lg:w-[18px] lg:h-[18px]" style={{ color: '#FF6B00' }} strokeWidth={2} aria-hidden />
                <span className="font-display text-white text-[0.78rem] lg:text-[0.9rem] tracking-tight text-center leading-tight">
                  {key === 'capacity' && `${capacityFormatted} mAh`}
                  {key === 'devices' && t('spec_icons.devices', { n: SPECS.simultaneousDevices.value })}
                  {key === 'fastcharge' && `${wattage}W`}
                  {key === 'display' && t('spec_icons.display')}
                </span>
                <span className="font-mono text-[0.5rem] lg:text-[0.55rem] uppercase tracking-[0.18em] text-white/35 leading-none mt-0.5">
                  {key === 'capacity' && t('spec_icons.label_capacity')}
                  {key === 'devices' && t('spec_icons.label_devices')}
                  {key === 'fastcharge' && t('spec_icons.label_fastcharge')}
                  {key === 'display' && t('spec_icons.label_display')}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Price + huge primary CTA — one decisive row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-col w-full max-w-[440px] gap-2.5 mb-4 lg:mb-5"
          >
            <button
              onClick={onBuy}
              className="btn-orange group inline-flex items-center justify-between gap-3 w-full"
              style={{ padding: '1.05rem 1.5rem', fontSize: '0.9rem' }}
              aria-label={`${isWaitlist ? t('cta_waitlist') : t('cta_buy_now')} ${priceLabel() ?? ''}`}
            >
              <span className="flex items-center gap-2.5">
                <Zap className="w-[16px] h-[16px] fill-white flex-shrink-0" aria-hidden />
                <span className="font-display tracking-[0.12em] uppercase">
                  {isWaitlist ? t('cta_waitlist') : t('cta_buy_now')}
                </span>
              </span>
              <span className="flex items-center gap-2">
                {priceLabel() && (
                  <span className="font-display text-[1.05rem] lg:text-[1.15rem] font-bold">
                    {priceLabel()}
                  </span>
                )}
                <ArrowRight className="w-[15px] h-[15px] transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </button>
            {/* Backup-link voor klanten die /shop willen openen voor extra info */}
            <Link
              href="/shop"
              locale={locale}
              className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-white/40 hover:text-white/70 transition-colors text-center"
            >
              {t('view_full_listing')}
            </Link>
          </motion.div>

          {/* Trust mini — één regel, geen iconen-stack */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="font-body text-[#9A9A9A] text-[12px] lg:text-[13px]"
          >
            {t('trust_inline', { days: safe(TBD.returnPolicyDays) ?? 14 })}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
