import type { Metadata } from 'next';
import LegalPage from '@/components/legal/LegalPage';
import { getTermsContent } from '@/lib/legal-content';
import type { Locale } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Algemene voorwaarden | TITANBANKS',
  alternates: { canonical: 'https://titan-banks.com/legal/terms' },
};

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const document = getTermsContent(locale);
  return <LegalPage document={document} />;
}
