import Image from 'next/image';
import { Instagram, Facebook } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';
import { BRAND, TBD, safe } from '@/lib/product-claims';
import { SOCIALS } from '@/lib/brand-links';

function FooterLogo() {
  return (
    <Image
      src="/branding/logo-white-tight.png"
      alt={BRAND.wordmark}
      width={1746}
      height={320}
      className="h-8 w-auto block"
    />
  );
}

interface FooterLink {
  /** Translation-key voor het label (onder messages.navigation.*) */
  tKey: string;
  /** Pad zonder locale-prefix */
  href: string;
}

interface LegalLink {
  /** Translation-key voor het label (onder messages.footer.*) */
  tKey: string;
  href: string;
}

const productLinks: FooterLink[] = [
  { tKey: 'order', href: '/#bestel' },
  { tKey: 'technology', href: '/technology' },
];

const companyLinks: FooterLink[] = [
  { tKey: 'story', href: '/story' },
  { tKey: 'support', href: '/support' },
  { tKey: 'contact', href: '/contact' },
];

const legalLinks: LegalLink[] = [
  { tKey: 'legal_privacy', href: '/legal/privacy' },
  { tKey: 'legal_terms', href: '/legal/terms' },
  { tKey: 'legal_policies', href: '/legal/policies' },
];

export default function Footer() {
  const tNav = useTranslations('navigation');
  const tFooter = useTranslations('footer');
  const kvk = safe(TBD.kvkNumber);
  const btw = safe(TBD.btwNumber);
  const entity = safe(TBD.legalEntity);
  // Bewust GEEN adres: TBD.businessAddress is het huisadres en mag niet publiek
  // (keuze Natan). Zakelijk postadres volgt vóór publieke launch.

  return (
    <footer className="relative bg-[#0A0A0A] border-t border-white/[0.05]">
      <div className="h-px bg-gradient-to-r from-transparent via-[#FF8C00]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-5">
              <FooterLogo />
            </div>
            <p className="font-body text-[#9A9A9A] text-sm leading-relaxed max-w-xs">
              {tFooter('tagline')}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={SOCIALS.instagram}
                target="_blank"
                rel="noopener"
                aria-label="TitanBanks op Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] text-[#9A9A9A] transition-colors hover:border-titan-accent/50 hover:text-titan-accent"
              >
                <Instagram className="h-4 w-4" aria-hidden />
              </a>
              <a
                href={SOCIALS.facebook}
                target="_blank"
                rel="noopener"
                aria-label="TitanBanks op Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] text-[#9A9A9A] transition-colors hover:border-titan-accent/50 hover:text-titan-accent"
              >
                <Facebook className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-white/60 text-[0.65rem] uppercase tracking-[0.2em] mb-4">
              {tFooter('group_product')}
            </h4>
            <ul className="space-y-3">
              {productLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-body text-[#9A9A9A] hover:text-white text-sm transition-colors duration-200"
                  >
                    {tNav(item.tKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-white/60 text-[0.65rem] uppercase tracking-[0.2em] mb-4">
              {tFooter('group_company')}
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-body text-[#9A9A9A] hover:text-white text-sm transition-colors duration-200"
                  >
                    {tNav(item.tKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-white/60 text-[0.65rem] uppercase tracking-[0.2em] mb-4">
              {tFooter('group_legal')}
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-body text-[#9A9A9A] hover:text-white text-sm transition-colors duration-200"
                  >
                    {tFooter(item.tKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.05] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
            <p className="text-[#A0A0A0] text-sm">
              © {new Date().getFullYear()} {BRAND.text}. {tFooter('copyright')}
            </p>
            {(entity || kvk || btw) && (
              <>
                <span className="hidden sm:block w-px h-3.5 bg-white/[0.07]" />
                <p className="font-mono text-[#A0A0A0] text-[0.6rem] uppercase tracking-[0.2em]">
                  {entity && (
                    <span className="text-[#9A9A9A]">
                      {entity} <span className="opacity-60">(h.o.d.n. {BRAND.wordmark})</span>
                    </span>
                  )}
                  {entity && kvk && <span className="mx-2 opacity-40">·</span>}
                  {kvk && <>KvK: <span className="text-[#9A9A9A]">{kvk}</span></>}
                  {kvk && btw && <span className="mx-2 opacity-40">·</span>}
                  {btw && <>BTW: <span className="text-[#9A9A9A]">{btw}</span></>}
                </p>
              </>
            )}
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher variant="full" />
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[#A0A0A0] text-xs">{tFooter('payment_line')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
