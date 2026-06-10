'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { useEcwid } from './EcwidProvider';
import LanguageSwitcher from './LanguageSwitcher';
import { BRAND } from '@/lib/product-claims';

interface NavLink {
  /** Translation-key onder messages.navigation.* */
  tKey: string;
  /** Pad zonder locale-prefix (next-intl Link voegt /<locale>/ vooraan toe) */
  href: string;
}

const navLinks: NavLink[] = [
  { tKey: 'order', href: '/#bestel' },
  { tKey: 'technology', href: '/technology' },
  { tKey: 'story', href: '/story' },
  { tKey: 'support', href: '/support' },
];

function Logo() {
  return (
    <Image
      src="/branding/logo-white-tight.png"
      alt={BRAND.wordmark}
      width={1746}
      height={320}
      className="h-7 w-auto block"
      priority
    />
  );
}

/**
 * Zwevende pill-navigatie (Apple 980px-radius): blur-pill los van de rand,
 * logo links · links midden · BESTEL rechts. Wordt compacter + dichter bij
 * scroll. Mobiel: pill + uitklappend rounded paneel eronder.
 */
export default function Navigation() {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const { addToCart } = useEcwid();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  function NavLinkItem({ link }: { link: NavLink }) {
    const active = pathname.startsWith(link.href);
    const className = `relative font-body text-[0.8rem] font-medium uppercase tracking-[0.12em] transition-colors duration-200 hover:text-white ${
      active ? 'text-white' : 'text-[#C5C5C5]'
    }`;
    return (
      <Link href={link.href} className={className}>
        {t(link.tKey)}
        {active && (
          <motion.div
            layoutId="nav-indicator"
            className="absolute -bottom-1.5 left-0 right-0 h-px bg-titan-accent"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </Link>
    );
  }

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 z-50 flex justify-center px-4 transition-[top] duration-300 ${
        scrolled ? 'top-2.5' : 'top-4'
      }`}
    >
      <div className="w-full max-w-5xl">
        <nav
          className={`flex items-center justify-between rounded-pill border px-4 lg:px-6 transition-all duration-300 ${
            scrolled
              ? 'h-12 border-white/[0.1] bg-[#0A0A0A]/90'
              : 'h-14 border-white/[0.07] bg-[#0A0A0A]/65'
          } backdrop-blur-xl`}
        >
          <Link href="/" className="hover:opacity-80 transition-opacity duration-200 flex-shrink-0" aria-label={BRAND.wordmark}>
            <Logo />
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <NavLinkItem key={link.href} link={link} />
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={() => addToCart()}
              className="btn-orange"
              style={{ padding: '0.5rem 1.3rem', fontSize: '0.75rem', letterSpacing: '0.06em' }}
            >
              {t('cta_buy')}
            </button>
          </div>

          {/* Mobiel: Buy CTA + menu-toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => addToCart()}
              className="btn-orange"
              style={{ padding: '0.42rem 0.95rem', fontSize: '0.7rem', letterSpacing: '0.06em' }}
            >
              {t('cta_buy')}
            </button>
            <button
              className="text-white p-2 -mr-1"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobiel uitklap-paneel — zelfde pill-taal, rounded paneel onder de bar */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden mt-2 overflow-hidden rounded-stage border border-white/[0.08] bg-[#0A0A0A]/95 backdrop-blur-xl"
            >
              <div className="px-6 py-7 flex flex-col gap-5">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      className="font-display text-2xl font-extrabold uppercase tracking-[-0.02em] text-[#D1D5DB] hover:text-titan-accent transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {t(link.tKey)}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-4 mt-2 border-t border-white/[0.06]">
                  <LanguageSwitcher variant="full" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
