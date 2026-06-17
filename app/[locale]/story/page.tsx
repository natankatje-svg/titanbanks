import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PageShell from '@/components/pulse/PageShell';
import Kicker from '@/components/pulse/Kicker';
import { BRAND, TBD, SPECS, safe } from '@/lib/product-claims';
import { buildPageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n/routing';

const META: Record<string, { title: string; description: string }> = {
  nl: {
    title: 'Ons verhaal — waarom TitanBanks bestaat | TITANBANKS',
    description:
      'TitanBanks bouwt premium powerbanks zonder wegwerp-mentaliteit. Lees waarom we de Titan X maakten: eerlijk gemeten 50.000 mAh, gemaakt om mee te gaan.',
  },
  en: {
    title: 'Our story — why TitanBanks exists | TITANBANKS',
    description:
      'TitanBanks builds premium power banks without the throwaway mentality. Read why we made the Titan X: honestly measured 50,000 mAh, built to last.',
  },
  de: {
    title: 'Unsere Geschichte — warum es TitanBanks gibt | TITANBANKS',
    description:
      'TitanBanks baut Premium-Powerbanks ohne Wegwerf-Mentalität. Warum wir die Titan X gebaut haben: ehrlich gemessene 50.000 mAh, gebaut für die Dauer.',
  },
};

// Bestaande story-copy (was hardcoded NL in StorySection) + vertalingen.
const STORY: Record<string, { kicker: string; title: string; accent: string; paragraphs: string[]; engineering: string; warrantyTitle: string; warrantyBody: string; band: { title: string; accent: string } }> = {
  nl: {
    kicker: 'Ons verhaal',
    title: 'Waarom we de Titan X',
    accent: 'gebouwd hebben.',
    paragraphs: [
      'TitanBanks is begonnen vanuit één frustratie: power banks worden verkocht als wegwerp-accessoire. Goedkoop plastic. Misleidende mAh-cijfers. Geen zekerheid hoe lang ze meegaan.',
      'De Titan X is het tegenovergestelde. Eén product. Eerlijk gemeten capaciteit. Matte black afwerking die niet binnen drie maanden bekrast oogt. Gemaakt om mee te gaan, niet weg te gooien.',
      'We verkopen direct, zonder retail-marge. Wat hier staat is de eerste batch — beperkt op voorraad omdat we eerst willen testen of het werkt zoals beloofd, voordat we opschalen.',
    ],
    engineering: 'Engineering & compliance',
    warrantyTitle: 'jaar fabrieksgarantie',
    warrantyBody: 'Defect onder normale gebruiksomstandigheden? Wij vervangen of repareren.',
    band: { title: 'Klaar voor je eigen', accent: 'Titan X?' },
  },
  en: {
    kicker: 'Our story',
    title: 'Why we built',
    accent: 'the Titan X.',
    paragraphs: [
      'TitanBanks started from a single frustration: power banks are sold as throwaway accessories. Cheap plastic. Misleading mAh figures. No certainty about how long they last.',
      'The Titan X is the opposite. One product. Honestly measured capacity. A matte black finish that does not look scratched within three months. Built to last, not to throw away.',
      'We sell direct, without retail margins. What you see here is the first batch — limited stock, because we want to prove it works as promised before we scale up.',
    ],
    engineering: 'Engineering & compliance',
    warrantyTitle: 'year manufacturer warranty',
    warrantyBody: 'Defective under normal use? We replace or repair.',
    band: { title: 'Ready for your own', accent: 'Titan X?' },
  },
  de: {
    kicker: 'Unsere Geschichte',
    title: 'Warum wir die Titan X',
    accent: 'gebaut haben.',
    paragraphs: [
      'TitanBanks entstand aus einer einzigen Frustration: Powerbanks werden als Wegwerf-Zubehör verkauft. Billiges Plastik. Irreführende mAh-Angaben. Keine Gewissheit, wie lange sie halten.',
      'Die Titan X ist das Gegenteil. Ein Produkt. Ehrlich gemessene Kapazität. Mattschwarzes Finish, das nicht nach drei Monaten zerkratzt aussieht. Gebaut für die Dauer, nicht für die Tonne.',
      'Wir verkaufen direkt, ohne Handelsmarge. Was du hier siehst, ist die erste Charge — bewusst limitiert, weil wir erst beweisen wollen, dass alles hält, was wir versprechen.',
    ],
    engineering: 'Engineering & Compliance',
    warrantyTitle: 'Jahre Herstellergarantie',
    warrantyBody: 'Defekt bei normalem Gebrauch? Wir ersetzen oder reparieren.',
    band: { title: 'Bereit für deine eigene', accent: 'Titan X?' },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = META[locale] ?? META.nl;
  return buildPageMetadata({ locale, path: 'story', ...copy });
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const tMission = await getTranslations({ locale, namespace: 'mission' });
  const story = STORY[locale] ?? STORY.nl;
  const certs = safe(TBD.certifications);
  const values = tMission.raw('values') as string[];

  return (
    <PageShell
      kicker={story.kicker}
      title={story.title}
      accent={story.accent}
      orderBand={story.band}
    >
      {/* verhaal */}
      <section className="relative border-t border-white/[0.07] bg-[#080808] py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-6 space-y-6">
          {story.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="font-body text-lg leading-relaxed text-[#B9B9B9]">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* missie + waarden (bestaande mission-namespace) */}
      <section className="relative border-t border-white/[0.07] bg-[#080808] py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <Kicker>{tMission('eyebrow')}</Kicker>
          <h2 className="mt-3 font-display uppercase leading-[1.06] text-white [text-wrap:balance]" style={{ fontSize: 'clamp(1.7rem, 3.4vw, 2.8rem)' }}>
            {tMission('title')}
          </h2>
          <p className="mt-5 font-body text-base leading-relaxed text-[#B9B9B9] lg:text-lg">
            {tMission('intro')}
          </p>
          <p className="mt-10 font-mono text-[0.64rem] uppercase tracking-[0.24em] text-white/55">
            {tMission('values_label')}
          </p>
          <ul className="mt-4 space-y-3.5">
            {values.map((v) => (
              <li key={v.slice(0, 24)} className="flex items-start gap-3 font-body text-base leading-relaxed text-[#C9C9C9]">
                <span aria-hidden className="mt-2.5 h-px w-5 shrink-0 bg-titan-accent" />
                {v}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* engineering & compliance (SSOT) */}
      <section className="relative border-t border-white/[0.07] bg-[#080808] py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <Kicker>{story.engineering}</Kicker>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {certs && certs.length > 0 && (
              <div className="rounded-2xl border border-white/[0.1] bg-[#0C0C0C] p-6">
                <p className="font-body font-semibold text-white">{locale === 'de' ? 'Zertifizierungen' : locale === 'en' ? 'Certifications' : 'Certificeringen'}</p>
                <p className="mt-1.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-[#9A9A9A]">{certs.join(' · ')}</p>
              </div>
            )}
            <div className="rounded-2xl border border-white/[0.1] bg-[#0C0C0C] p-6">
              <p className="font-body font-semibold text-white">{SPECS.warrantyYears.value} {story.warrantyTitle}</p>
              <p className="mt-1.5 font-body text-sm leading-relaxed text-[#9A9A9A]">{story.warrantyBody}</p>
            </div>
          </div>
          <p className="mt-6 font-body text-sm text-[#A0A0A0]">
            {BRAND.text} · NamaCorp VOF · KvK {safe(TBD.kvkNumber) ?? '—'}
          </p>
        </div>
      </section>
    </PageShell>
  );
}
