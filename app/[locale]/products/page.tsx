import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MoreProductsComingSoon from '@/components/MoreProductsComingSoon';
import { Link } from '@/i18n/routing';
import { BRAND, capacityLabel } from '@/lib/product-claims';
import type { Locale } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Producten | TITANBANKS',
  description: 'Alle TitanBanks producten. Begin met Titan X — meer komt eraan.',
  alternates: { canonical: 'https://titan-banks.com/products' },
};

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products_page' });

  return (
    <main className="relative bg-[#0A0A0A] text-[#F5F5F5] min-h-screen overflow-x-hidden">
      <Navigation />
      <section className="pt-32 pb-16 px-6 max-w-5xl mx-auto">
        <div className="mb-5 flex items-center gap-3">
          <div className="w-6 h-px bg-[#FF6B00]" />
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#888888]">
            {t('eyebrow')}
          </span>
        </div>
        <h1
          className="font-display uppercase text-white mb-8"
          style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5rem)', lineHeight: 0.92 }}
        >
          {t('title')}
        </h1>
        <p className="text-[#C0C0C0] text-base lg:text-lg leading-relaxed max-w-2xl mb-14">
          {t('intro')}
        </p>

        {/* Titan X card */}
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 items-center border border-white/[0.08] bg-white/[0.015] rounded-2xl p-6 md:p-10 mb-16">
          <div className="relative aspect-square max-w-sm mx-auto md:mx-0 w-full">
            <Image
              src="/images/product-hero.jpg"
              alt={`${BRAND.product} — ${capacityLabel()} matte black power bank`}
              fill
              className="object-contain"
              sizes="(min-width: 768px) 40vw, 80vw"
            />
          </div>
          <div>
            <span className="inline-block font-mono text-[0.6rem] uppercase tracking-[0.25em] text-emerald-300 bg-emerald-400/[0.08] border border-emerald-400/30 rounded-full px-3 py-1 mb-4">
              · {t('current_label')}
            </span>
            <h2
              className="font-display uppercase text-white mb-4"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', lineHeight: 0.92 }}
            >
              {BRAND.product}
            </h2>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#888888] mb-5">
              {capacityLabel()} · 4× USB-A + ingebouwde kabels · 2 jaar garantie
            </p>
            <p className="font-body text-[#B5B5B5] leading-relaxed mb-6 max-w-md">
              Premium powerbank in matte black. Zes devices tegelijk via 4× USB-A poorten plus
              2 ingebouwde intrekbare kabels (USB-C en Lightning). LED-display met exact
              percentage, ingebouwde zaklamp.
            </p>
            <Link
              href="/shop"
              className="btn-orange inline-block"
              style={{ padding: '0.75rem 1.6rem', fontSize: '0.8rem', letterSpacing: '0.08em' }}
            >
              {t('cta_view')}
            </Link>
          </div>
        </div>
      </section>

      <MoreProductsComingSoon />
      <Footer />
    </main>
  );
}
