'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, Minus, Plus, Truck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEcwid } from '@/components/EcwidProvider';
import { useLiveProduct } from '@/components/LiveProductProvider';
import { SPECS, LAUNCH_STATE, capacityLabel } from '@/lib/product-claims';
import Kicker from '@/components/pulse/Kicker';

const EASE = [0.22, 1, 0.36, 1] as const;
const PAYMENT_METHODS = ['iDEAL', 'Mollie', 'Apple Pay', 'Klarna', 'Visa', 'Mastercard'];

/**
 * ProductListing — de volledige LIVE Ecwid product-listing direct onder de
 * hero: fotogalerij (carousel) + naam + live prijs/actie + voorraad + key
 * specs + live productbeschrijving + add-to-cart CTA. Alles wat Ecwid kent
 * komt live uit getLiveProduct(); de CTA voegt toe via het Ecwid-script.
 *
 * Valt elegant terug: zonder live beelden verbergt de galerij zich, zonder
 * live prijs vult product-claims de fallback.
 */
export default function ProductListing() {
  const t = useTranslations('hero');
  const reduce = useReducedMotion();
  const { addToCart } = useEcwid();
  const live = useLiveProduct();

  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const images = live?.images ?? [];
  const hasImages = images.length > 0;
  const count = images.length;
  const current = hasImages ? images[active] : null;
  const go = (dir: number) => setActive((i) => (i + dir + count) % count);

  const name = live?.name ?? `${SPECS.capacityMah.value.toLocaleString('nl-NL')} mAh Power Bank`;
  const price = live?.priceFormatted ?? null;
  const comparePrice = live?.compareAtFormatted ?? null;
  const inStock = live?.inStock ?? true;
  const isWaitlist = LAUNCH_STATE.waitlistMode;

  // Live specs uit Ecwid-attributes; fallback op enkele kern-claims.
  const specChips =
    live?.attributes && live.attributes.length > 0
      ? live.attributes.slice(0, 6)
      : [
          { name: 'Capaciteit', value: capacityLabel() },
          { name: 'Devices tegelijk', value: String(SPECS.simultaneousDevices.value) },
          { name: 'Afwerking', value: SPECS.finish.value },
        ];

  const onBuy = () => {
    if (isWaitlist) {
      window.location.href = '#waitlist';
      return;
    }
    addToCart(qty);
  };

  return (
    <section
      id="product"
      aria-label="Productdetails"
      className="relative scroll-mt-20 overflow-hidden border-t border-white/[0.06] bg-[#080808] py-16 lg:py-24"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 55% 70% at 50% 20%, rgba(255,140,0,0.06), transparent 65%)' }}
      />
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-6 lg:grid-cols-2 lg:gap-14 lg:px-10"
      >
        {/* ── Galerij ── */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          {hasImages && current ? (
            <>
              <div className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-b from-white/[0.05] to-transparent ring-1 ring-white/[0.06]">
                <Image
                  key={current.url}
                  src={current.url}
                  alt={current.alt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 560px"
                  className="object-cover"
                  priority={false}
                />
                {count > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      aria-label="Vorige foto"
                      className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.14] bg-black/45 text-white/80 backdrop-blur-sm transition hover:border-titan-accent/60 hover:text-white lg:opacity-0 lg:group-hover:opacity-100"
                    >
                      <ChevronLeft className="h-5 w-5" aria-hidden />
                    </button>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      aria-label="Volgende foto"
                      className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.14] bg-black/45 text-white/80 backdrop-blur-sm transition hover:border-titan-accent/60 hover:text-white lg:opacity-0 lg:group-hover:opacity-100"
                    >
                      <ChevronRight className="h-5 w-5" aria-hidden />
                    </button>
                    <span className="absolute bottom-3 right-4 rounded-full bg-black/45 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/70 backdrop-blur-sm">
                      {active + 1} / {count}
                    </span>
                  </>
                )}
              </div>

              {count > 1 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {images.map((img, i) => (
                    <button
                      type="button"
                      key={img.url}
                      onClick={() => setActive(i)}
                      aria-label={`Foto ${i + 1}`}
                      aria-current={i === active}
                      className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg transition ${
                        i === active
                          ? 'ring-2 ring-titan-accent'
                          : 'opacity-60 ring-1 ring-white/[0.1] hover:opacity-100'
                      }`}
                    >
                      <Image src={img.url} alt="" fill sizes="64px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="aspect-square w-full rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.06]" />
          )}
        </div>

        {/* ── Koop-paneel ── */}
        <div className="flex flex-col">
          <Kicker>{capacityLabel()} · {SPECS.finish.value}</Kicker>
          <h2
            className="mt-3 font-display uppercase leading-[1.05] text-white [text-wrap:balance]"
            style={{ fontSize: 'clamp(1.9rem, 3.6vw, 3rem)' }}
          >
            {name}
          </h2>

          {/* Prijs */}
          {price && (
            <div className="mt-5 flex flex-wrap items-baseline gap-3">
              <span className="font-display text-4xl text-white">{price}</span>
              {comparePrice && (
                <span className="font-display text-2xl text-white/40 line-through">{comparePrice}</span>
              )}
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/45">incl. BTW</span>
            </div>
          )}

          {/* Voorraad */}
          <div className="mt-3 flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${inStock ? 'bg-emerald-400' : 'bg-red-400'}`} />
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#9A9A9A]">
              {inStock ? 'Op voorraad · klaar voor verzending' : 'Tijdelijk uitverkocht'}
            </span>
          </div>

          {/* Key specs */}
          <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {specChips.map((s) => (
              <li key={s.name} className="flex flex-col border-l border-white/[0.1] pl-3">
                <span className="font-mono text-[0.56rem] uppercase tracking-[0.16em] text-white/40">{s.name}</span>
                <span className="font-body text-sm text-[#D4D4D4]">{s.value}</span>
              </li>
            ))}
          </ul>

          {/* Qty + CTA */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            {!isWaitlist && (
              <div className="inline-flex items-stretch self-start rounded-full border border-white/[0.18] bg-white/[0.02]">
                <button onClick={() => setQty((v) => Math.max(1, v - 1))} aria-label="Minder" className="px-4 text-[#A0A0A0] transition-colors hover:text-white">
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="min-w-[48px] px-2 py-3 text-center font-display text-lg text-white">{qty}</span>
                <button onClick={() => setQty((v) => Math.min(5, v + 1))} aria-label="Meer" className="px-4 text-[#A0A0A0] transition-colors hover:text-white">
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
            <button onClick={onBuy} className="btn-pulse group grow justify-center sm:grow-0">
              <span>{isWaitlist ? t('cta_waitlist') : t('cta_buy_now')}</span>
              {price && <span className="opacity-80">· {price}</span>}
            </button>
          </div>

          {/* Trust — bewust GEEN garantie/retour-claims hier (op verzoek minimaal
              houden). De wettelijke herroepings-/garantie-info blijft op
              /legal/policies + algemene voorwaarden. */}
          <div className="mt-6 flex items-center gap-2 text-[12px] text-[#B5B5B5]">
            <Truck className="h-3.5 w-3.5 text-titan-accent" aria-hidden />
            <span>Verzending vanuit Nederland · veilig betalen</span>
          </div>

          {/* Betaalmethodes */}
          <div className="mt-5 flex flex-wrap items-center gap-1.5">
            {PAYMENT_METHODS.map((m) => (
              <span key={m} className="rounded border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[0.56rem] text-[#8E8E8E]">
                {m}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Live productbeschrijving uit Ecwid (uitklapbaar) ── */}
      {live?.descriptionHtml && (
        <div className="relative mx-auto mt-12 max-w-[820px] px-6 lg:mt-16 lg:px-10">
          <button
            type="button"
            onClick={() => setDetailsOpen((v) => !v)}
            aria-expanded={detailsOpen}
            aria-controls="product-details-body"
            className="group flex w-full items-center justify-between gap-3 border-y border-white/[0.08] py-5 text-left transition-colors hover:border-white/[0.18]"
          >
            <span className="flex items-center gap-3">
              <span className="h-px w-6 bg-titan-accent" />
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-white/70 transition-colors group-hover:text-white">
                Productdetails &amp; specs
              </span>
            </span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-white/55 transition-transform duration-300 group-hover:text-white ${detailsOpen ? 'rotate-180' : ''}`}
              aria-hidden
            />
          </button>
          <div
            id="product-details-body"
            hidden={!detailsOpen}
            className="pt-6 pb-2 font-body text-[#B5B5B5] [&_a]:text-titan-accent [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-white [&_h3]:mb-2 [&_h3]:mt-7 [&_h3]:font-display [&_h3]:text-lg [&_h3]:text-white [&_li]:relative [&_li]:mb-1.5 [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.7em] [&_li]:before:h-px [&_li]:before:w-2 [&_li]:before:bg-titan-accent [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:mb-5 [&_ul]:mt-2"
            dangerouslySetInnerHTML={{ __html: live.descriptionHtml }}
          />
        </div>
      )}
    </section>
  );
}
