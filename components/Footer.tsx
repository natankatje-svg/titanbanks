import Image from 'next/image';
import Link from 'next/link';
import { BRAND, TBD, safe } from '@/lib/product-claims';

const linkGroups: Array<{ heading: string; items: Array<{ label: string; href: string }> }> = [
  {
    heading: 'Product',
    items: [
      { label: 'Shop', href: '/shop' },
      { label: 'Technology', href: '/technology' },
      { label: 'Calculator', href: '/calculator' },
      { label: 'In Use', href: '/in-use' },
    ],
  },
  {
    heading: 'Bedrijf',
    items: [
      { label: 'Story', href: '/story' },
      { label: 'Reviews', href: '/reviews' },
      { label: 'Support', href: '/support' },
    ],
  },
  {
    heading: 'Juridisch',
    items: [
      { label: 'Privacybeleid', href: '/privacy' },
      { label: 'Algemene voorwaarden', href: '/support#terms' },
      { label: 'Cookiebeleid', href: '/privacy#cookies' },
    ],
  },
];

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

export default function Footer() {
  const kvk = safe(TBD.kvkNumber);
  const address = safe(TBD.businessAddress);

  return (
    <footer className="relative bg-[#0A0A0A] border-t border-white/[0.05]">
      <div className="h-px bg-gradient-to-r from-transparent via-[#FF6B00]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-5">
              <FooterLogo />
            </div>
            <p className="font-body text-[#888888] text-sm leading-relaxed max-w-xs">
              Premium power banks. Gebouwd voor wie niet kan stoppen.
            </p>
          </div>

          {linkGroups.map(({ heading, items }) => (
            <div key={heading}>
              <h4 className="font-mono text-white/60 text-[0.65rem] uppercase tracking-[0.2em] mb-4">
                {heading}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="font-body text-[#888888] hover:text-white text-sm transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.05] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
            <p className="text-[#666666] text-sm">
              © {new Date().getFullYear()} {BRAND.text}. Alle rechten voorbehouden.
            </p>
            {(kvk || address) && (
              <>
                <span className="hidden sm:block w-px h-3.5 bg-white/[0.07]" />
                <p className="font-mono text-[#666666] text-[0.6rem] uppercase tracking-[0.2em]">
                  {kvk && <>KvK: <span className="text-[#888888]">{kvk}</span></>}
                  {kvk && address && <span className="mx-2 opacity-40">·</span>}
                  {address && <span className="text-[#888888]">{address}</span>}
                </p>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#666666] text-xs">Veilig betalen · iDEAL · Apple Pay · Visa · Mastercard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
