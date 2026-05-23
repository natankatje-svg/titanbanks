import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// NextIntlClientProvider zit in app/layout.tsx (root) zodat /preview en /preview2
// ook messages krijgen. Hier alleen locale-validatie en setRequestLocale voor SSG.
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <>{children}</>;
}
