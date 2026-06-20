'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { useEcwid } from '@/components/EcwidProvider';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { BRAND } from '@/lib/product-claims';

const LEFT_LINKS = [
  { tKey: 'order', href: '/#bestel' },
  { tKey: 'technology', href: '/technology' },
] as const;
const RIGHT_LINKS = [
  { tKey: 'story', href: '/story' },
  { tKey: 'support', href: '/support' },
] as const;

/**
 * MaisonNav — couture-header: logo gecentreerd als maison-merkteken,
 * menu links/rechts in kleine getrackte caps, hairline eronder.
 * Bestel = hairline-link rechts (de gevulde CTA leeft in de cover/finale).
 */
export default function MaisonNav() {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const { addToCart } = useEcwid();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  const NavA = ({ tKey, href }: { tKey: string; href: string }) => {
    const active = pathname.startsWith(href);
    return (
      <Link
        href={href}
        className={`font-body text-[0.68rem] uppercase tracking-[0.24em] transition-colors ${
          active ? 'text-titan-accent' : 'text-white/65 hover:text-white'
        }`}
      >
        {t(tKey)}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.1] bg-[#080808]/92 backdrop-blur-md">
      <div className="mx-auto grid h-[72px] max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-5 lg:px-10">
        {/* links */}
        <div className="hidden items-center gap-8 md:flex">
          {LEFT_LINKS.map((l) => (
            <NavA key={l.href} {...l} />
          ))}
        </div>
        <button
          className="-ml-2 p-2 text-white md:hidden justify-self-start"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* maison-merkteken — gecentreerd logo */}
        <Link href="/" aria-label={BRAND.wordmark} className="justify-self-center transition-opacity hover:opacity-80">
          <Image
            src="/branding/logo-white-tight.png"
            alt={BRAND.wordmark}
            width={1746}
            height={320}
            className="block h-6 w-auto lg:h-7"
            priority
          />
        </Link>

        {/* rechts */}
        <div className="hidden items-center justify-end gap-8 md:flex">
          {RIGHT_LINKS.map((l) => (
            <NavA key={l.href} {...l} />
          ))}
          <Link
            href="/cart"
            aria-label={t('cart')}
            className={`transition-colors ${
              pathname.startsWith('/cart') ? 'text-titan-accent' : 'text-white/65 hover:text-white'
            }`}
          >
            <ShoppingCart className="h-[1.05rem] w-[1.05rem]" aria-hidden />
          </Link>
          <LanguageSwitcher />
          <button onClick={() => addToCart()} className="link-hairline" style={{ paddingBottom: '0.25rem' }}>
            {t('cta_buy')}
          </button>
        </div>
        <div className="flex items-center gap-3 justify-self-end md:hidden">
          <Link
            href="/cart"
            aria-label={t('cart')}
            className={`p-1 transition-colors ${
              pathname.startsWith('/cart') ? 'text-titan-accent' : 'text-white/80 hover:text-titan-accent'
            }`}
          >
            <ShoppingCart className="h-5 w-5" aria-hidden />
          </Link>
          <button
            onClick={() => addToCart()}
            className="link-hairline"
            style={{ paddingBottom: '0.2rem', fontSize: '0.62rem' }}
          >
            {t('cta_buy')}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="md:hidden overflow-hidden border-t border-white/[0.08] bg-[#080808]"
          >
            <div className="flex flex-col px-6 py-5">
              {[...LEFT_LINKS, ...RIGHT_LINKS].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-white/[0.06] py-4 font-display text-2xl italic text-white last:border-b-0 hover:text-titan-accent transition-colors"
                >
                  {t(l.tKey)}
                </Link>
              ))}
              <div className="pt-5">
                <LanguageSwitcher variant="full" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
