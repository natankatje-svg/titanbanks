import type { ReactNode } from 'react';
import MaisonNav from '@/components/atelier/MaisonNav';
import Footer from '@/components/Footer';
import Kicker from '@/components/pulse/Kicker';
import OrderBand from '@/components/pulse/OrderBand';

/**
 * PageShell — gedeeld pulse-skelet voor subpagina's: MaisonNav + compacte
 * page-hero (kicker + display-kop + intro) + secties + optionele OrderBand +
 * Footer. Server component; secties leveren hun eigen motion.
 */
export default function PageShell({
  kicker,
  title,
  accent,
  intro,
  children,
  orderBand,
}: {
  kicker: string;
  title: string;
  /** Laatste woord(en) van de kop in accentkleur. */
  accent?: string;
  intro?: string;
  children: ReactNode;
  /** Kop voor de bestel-band onderaan; weglaten = geen band. */
  orderBand?: { title: string; accent: string };
}) {
  return (
    <main className="relative bg-[#080808]">
      <MaisonNav />
      <section className="relative overflow-hidden pb-14 pt-28 lg:pb-20 lg:pt-36">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 0%, rgba(255,140,0,0.07), transparent 65%)' }}
        />
        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
          <Kicker>{kicker}</Kicker>
          <h1
            className="mt-4 max-w-4xl font-display uppercase leading-[1.04] text-white [text-wrap:balance]"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4.2rem)' }}
          >
            {title} {accent && <span className="text-titan-accent">{accent}</span>}
          </h1>
          {intro && (
            <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-[#B9B9B9] lg:text-lg">
              {intro}
            </p>
          )}
        </div>
      </section>
      {children}
      {orderBand && <OrderBand title={orderBand.title} accent={orderBand.accent} />}
      <Footer />
    </main>
  );
}
