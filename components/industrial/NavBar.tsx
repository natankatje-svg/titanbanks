'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { useEcwid } from '@/components/EcwidProvider';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { BRAND } from '@/lib/product-claims';

const navLinks = [
  { tKey: 'order', href: '/#bestel' },
  { tKey: 'technology', href: '/technology' },
  { tKey: 'story', href: '/story' },
  { tKey: 'support', href: '/support' },
] as const;

/**
 * NavBar — industrieel: vol-breed, hairline onderrand, mono-uppercase links
 * met index-nummers, vierkante BESTEL-console-knop. Sticky, massief zwart.
 */
export default function NavBar() {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const { addToCart } = useEcwid();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.1] bg-[#080808]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex-shrink-0 transition-opacity hover:opacity-80" aria-label={BRAND.wordmark}>
          <Image
            src="/branding/logo-white-tight.png"
            alt={BRAND.wordmark}
            width={1746}
            height={320}
            className="block h-6 w-auto lg:h-7"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group inline-flex items-baseline gap-1.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] transition-colors ${
                  active ? 'text-titan-accent' : 'text-white/70 hover:text-white'
                }`}
              >
                <span className={`text-[0.55rem] ${active ? 'text-titan-accent' : 'text-white/30 group-hover:text-titan-accent'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {t(link.tKey)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-5">
          <LanguageSwitcher />
          <button onClick={() => addToCart()} className="btn-console" style={{ padding: '0.55rem 1.2rem', fontSize: '0.7rem' }}>
            {t('cta_buy')}
          </button>
        </div>

        <div className="flex md:hidden items-center gap-2.5">
          <button onClick={() => addToCart()} className="btn-console" style={{ padding: '0.5rem 0.9rem', fontSize: '0.65rem' }}>
            {t('cta_buy')}
          </button>
          <button
            className="-mr-1 p-2 text-white"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-white/[0.08] bg-[#080808]"
          >
            <div className="flex flex-col gap-0 px-5 py-4">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline gap-3 border-b border-white/[0.06] py-4 font-display text-xl uppercase text-white last:border-b-0 hover:text-titan-accent transition-colors"
                >
                  <span className="font-mono text-[0.6rem] text-titan-accent">{String(i + 1).padStart(2, '0')}</span>
                  {t(link.tKey)}
                </Link>
              ))}
              <div className="pt-4">
                <LanguageSwitcher variant="full" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
