import type { Metadata } from 'next';
import { Barlow_Condensed, Plus_Jakarta_Sans, DM_Mono } from 'next/font/google';
import EcwidProvider from '@/components/EcwidProvider';
import './globals.css';

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Titan X Powerbank – 50.000mAh | TitanBanks',
  description:
    'De meest krachtige powerbank ooit. 50.000mAh, PD 22.5W fast charge, smart LED display, ingebouwde kabels en LED flashlight. Gebouwd voor reizigers, avonturiers en professionals.',
  keywords: 'powerbank, titan x, titanbanks, 50000mah, fast charge, outdoor powerbank, reizen',
  metadataBase: new URL('https://www.titanbanks.nl'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Titan X – Nooit Meer Zonder Stroom | TitanBanks',
    description: '50.000mAh premium powerbank met fast charging, smart display en ingebouwde kabels. Gratis verzending. 30 dagen retour.',
    type: 'website',
    url: 'https://www.titanbanks.nl',
    siteName: 'TitanBanks',
    locale: 'nl_NL',
    images: [
      {
        url: '/images/feature-marketing.jpg',
        width: 1200,
        height: 630,
        alt: 'Titan X – 50.000mAh Premium Powerbank | TitanBanks',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Titan X – Nooit Meer Zonder Stroom | TitanBanks',
    description: '50.000mAh premium powerbank met fast charging, smart LED display en ingebouwde kabels.',
    images: ['/images/feature-marketing.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${barlowCondensed.variable} ${plusJakartaSans.variable} ${dmMono.variable}`}>
      <body className="bg-[#080808] text-white antialiased">
        <EcwidProvider>{children}</EcwidProvider>
      </body>
    </html>
  );
}
