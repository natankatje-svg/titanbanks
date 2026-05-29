import type { Metadata } from 'next';
import LegalPage from '@/components/legal/LegalPage';
import { getPoliciesContent } from '@/lib/legal-content';
import type { Locale } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Verzending, retour, garantie & cookies | TITANBANKS',
  alternates: { canonical: 'https://titan-banks.com/legal/policies' },
};

export default async function PoliciesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const document = getPoliciesContent(locale);
  return <LegalPage document={document} />;
}
