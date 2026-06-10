import type { Metadata } from 'next';
import { Unbounded, Figtree, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import EcwidProvider from '@/components/EcwidProvider';
import GA4Loader from '@/components/GA4Loader';
import './globals.css';

// PULSE type-systeem (build/pulse):
// display = Unbounded (expressief, rond-tech, energiek),
// body    = Figtree (moderne neutrale grotesk),
// mono    = JetBrains Mono (labels/specs).
const unbounded = Unbounded({
  subsets: ['latin'],
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

export const metadata: Metadata = {
  title: 'Titan X — 50.000 mAh Power Bank | TitanBanks',
  description:
    'The Titan X by TitanBanks. 50.000 mAh. Six devices at once. Built for festivals, road trips, and workdays without an outlet.',
  keywords: 'powerbank, titan x, titanbanks, 50000mah, high capacity powerbank, outdoor powerbank',
  metadataBase: new URL('https://titan-banks.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Titan X — TITANBANKS',
    description: '50.000 mAh. Six devices at once. The drop is coming.',
    type: 'website',
    url: 'https://titan-banks.com',
    siteName: 'TitanBanks',
    locale: 'en_US',
    images: [
      {
        url: '/images/titanx/hero-never-at-0.png',
        width: 1200,
        height: 630,
        alt: 'Titan X — 50.000 mAh power bank by TITANBANKS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Titan X — TITANBANKS',
    description: '50.000 mAh. Six devices at once. The drop is coming.',
    images: ['/images/titanx/hero-never-at-0.png'],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // getLocale() valt terug op defaultLocale ('nl') voor non-locale routes (/preview, /preview2).
  // NextIntlClientProvider zit hier (i.p.v. in [locale]/layout) zodat /preview ook
  // messages krijgt — die vallen terug naar NL via i18n/request.ts.
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale} className={`${unbounded.variable} ${figtree.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-black text-white antialiased">
        <GA4Loader />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <EcwidProvider>{children}</EcwidProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
