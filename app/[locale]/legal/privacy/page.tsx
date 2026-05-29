import type { Metadata } from 'next';
import LegalPage from '@/components/legal/LegalPage';
import { getPrivacyContent } from '@/lib/legal-content';
import type { Locale } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Privacy | TITANBANKS',
  alternates: { canonical: 'https://titan-banks.com/legal/privacy' },
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const document = getPrivacyContent(locale);
  return <LegalPage document={document} />;
}
