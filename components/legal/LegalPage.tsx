import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useTranslations } from 'next-intl';
import type { LegalDocument } from '@/lib/legal-content';

interface LegalPageProps {
  document: LegalDocument;
}

export default function LegalPage({ document }: LegalPageProps) {
  const t = useTranslations('legal');

  return (
    <main className="relative bg-[#0A0A0A] text-[#F5F5F5] min-h-screen overflow-x-hidden">
      <Navigation />
      <section className="pt-32 pb-24 px-6 max-w-3xl mx-auto">
        {/* Eyebrow */}
        <div className="mb-5 flex items-center gap-3">
          <div className="w-6 h-px bg-[#FF8C00]" />
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#888888]">
            {document.eyebrow}
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-display uppercase text-white mb-6"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 4.2rem)', lineHeight: 0.92 }}
        >
          {document.title}
        </h1>

        {/* Last updated */}
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#666666] mb-8">
          {t('last_updated')}: {document.lastUpdated}
        </p>

        {/* Banners */}
        <div className="space-y-3 mb-10">
          {document.preliminaryTranslation && (
            <div className="border border-[#0EB5C8]/30 bg-[#0EB5C8]/[0.05] rounded-lg px-5 py-4 text-sm text-[#9CD9E2]">
              <strong className="text-[#0EB5C8]">{t('banner_translation_label')}:</strong>{' '}
              {t('banner_translation_body')}
            </div>
          )}
          {document.juristReviewPending && (
            <div className="border border-[#EAB308]/30 bg-[#EAB308]/[0.05] rounded-lg px-5 py-4 text-sm text-[#E7CE7A]">
              <strong className="text-[#EAB308]">{t('banner_review_label')}:</strong>{' '}
              {t('banner_review_body')}
            </div>
          )}
        </div>

        {/* Intro */}
        {document.intro && (
          <p className="text-[#C0C0C0] text-base lg:text-lg leading-relaxed mb-10">
            {document.intro}
          </p>
        )}

        {/* Table of contents */}
        {document.toc && document.toc.length > 0 && (
          <nav
            aria-label={t('toc_label')}
            className="mb-12 border border-white/[0.08] bg-white/[0.02] rounded-lg p-5"
          >
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#888888] mb-3">
              {t('toc_label')}
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {document.toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="font-body text-sm text-[#FF8C00] hover:text-white underline underline-offset-4 decoration-[#FF8C00]/40 hover:decoration-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Sections */}
        <div className="space-y-12">
          {document.sections.map((section, i) => (
            <article
              key={i}
              id={section.id}
              className="scroll-mt-28"
            >
              <h2 className="font-display text-2xl md:text-3xl text-white mb-4 leading-tight">
                {section.heading}
              </h2>
              {section.paragraphs?.map((p, j) => (
                <p
                  key={j}
                  className="font-body text-[#B5B5B5] text-base leading-relaxed mb-4 last:mb-0"
                >
                  {p}
                </p>
              ))}
              {section.list && section.list.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {section.list.map((item, k) => (
                    <li
                      key={k}
                      className="font-body text-[#B5B5B5] text-base leading-relaxed pl-5 relative"
                    >
                      <span
                        className="absolute left-0 top-[0.7em] w-2 h-px bg-[#FF8C00]"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-white/[0.06]">
          <p className="font-body text-sm text-[#666666] leading-relaxed">
            {t('footer_contact_prefix')}{' '}
            <a
              href="mailto:info@titan-banks.com"
              className="text-[#FF8C00] underline underline-offset-4 hover:text-white transition-colors"
            >
              info@titan-banks.com
            </a>
            .
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
