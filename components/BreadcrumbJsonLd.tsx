import { buildBreadcrumbJsonLd, type BreadcrumbItem } from '@/lib/seo';

/**
 * Rendert BreadcrumbList JSON-LD voor een inner page. De homepage-kruimel zit
 * automatisch in het schema (zie buildBreadcrumbJsonLd) — geef via `trail`
 * alleen de diepere kruimel(s) mee, bijv. [{ name: 'Technologie', path: 'technology' }].
 */
export default function BreadcrumbJsonLd({
  locale,
  trail,
}: {
  locale: string;
  trail: BreadcrumbItem[];
}) {
  const schema = buildBreadcrumbJsonLd(locale, trail);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
