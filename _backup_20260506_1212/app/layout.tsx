import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Titan X Powerbank – 50.000mAh | TitanBanks',
  description:
    'De meest krachtige powerbank ooit. 50.000mAh, PD 22.5W fast charge, smart LED display, ingebouwde kabels en LED flashlight. Gebouwd voor reizigers, avonturiers en professionals.',
  keywords: 'powerbank, titan x, titanbanks, 50000mah, fast charge, outdoor powerbank, reizen',
  openGraph: {
    title: 'Titan X – Never Run Out of Power Again',
    description: '50.000mAh premium powerbank met fast charging, smart display en ingebouwde kabels.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={inter.variable}>
      <body className="bg-[#080808] text-white antialiased">{children}</body>
    </html>
  );
}
