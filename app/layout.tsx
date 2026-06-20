import type { Metadata } from 'next';
import { Unbounded, Figtree, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import EcwidProvider from '@/components/EcwidProvider';
import GA4Loader from '@/components/GA4Loader';
import ConsentBanner from '@/components/ConsentBanner';
import { LiveProductProvider } from '@/components/LiveProductProvider';
import ThirdPartyErrorGuard from '@/components/ThirdPartyErrorGuard';
import SiteJsonLd from '@/components/SiteJsonLd';
import MotionProvider from '@/components/MotionProvider';
import { getLiveProduct } from '@/lib/ecwid-storefront';
import './globals.css';

// PULSE type-systeem (build/pulse):
// display = Unbounded (expressief, rond-tech, energiek),
// body    = Figtree (moderne neutrale grotesk),
// mono    = JetBrains Mono (labels/specs).
const unbounded = Unbounded({
  subsets: ['latin'],
  // (main's Manrope-gewicht-trim is achterhaald: pulse gebruikt Unbounded,
  //  die 500/600/700 daadwerkelijk rendert in koppen/CTA's.)
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

// Root-fallback; locale-pagina's overschrijven dit via buildPageMetadata.
export const metadata: Metadata = {
  title: 'Titan X — 50.000 mAh Power Bank | TitanBanks',
  description:
    'The Titan X by TitanBanks. 50.000 mAh. Six devices at once. Built for festivals, road trips, and workdays without an outlet.',
  metadataBase: new URL('https://titan-banks.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Titan X — TITANBANKS',
    description: '50.000 mAh. Six devices at once. Built for days without an outlet.',
    type: 'website',
    url: 'https://titan-banks.com',
    siteName: 'TitanBanks',
    locale: 'nl_NL',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Titan X — 50.000 mAh power bank by TITANBANKS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Titan X — TITANBANKS',
    description: '50.000 mAh. Six devices at once. Built for days without an outlet.',
    images: ['/images/og-image.jpg'],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // getLocale() valt terug op defaultLocale ('nl') voor non-locale routes (/preview, /preview2).
  // NextIntlClientProvider zit hier (i.p.v. in [locale]/layout) zodat /preview ook
  // messages krijgt — die vallen terug naar NL via i18n/request.ts.
  const locale = await getLocale();
  const messages = await getMessages();
  // Eén live read per render (ISR-gecached 300s in getLiveProduct) — gedeeld
  // met alle client-componenten via de provider. Valt intern terug op
  // product-claims als Ecwid down is.
  const liveProduct = await getLiveProduct();
  return (
    <html lang={locale} className={`${unbounded.variable} ${figtree.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-black text-white antialiased">
        <SiteJsonLd locale={locale} />
        <ThirdPartyErrorGuard />
        <GA4Loader />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LiveProductProvider value={liveProduct}>
            <MotionProvider>
              <EcwidProvider>{children}</EcwidProvider>
              <ConsentBanner />
            </MotionProvider>
          </LiveProductProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
