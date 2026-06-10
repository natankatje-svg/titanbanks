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
  { tKey: 'shop', href: '/shop' },
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
      className="h-9 w-auto block"
      priority
    />
  );
}

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
    // font-body (Plus Jakarta Sans) ipv font-mono — mono leest op kleine
    // schermhoogte als 'vet' door de hoge stroke-dichtheid. Body sans-serif
    // op 0.875rem met medium tracking blijft editorial maar leest een stuk
    // rustiger en helderder.
    const className = `relative font-body text-[0.875rem] font-medium uppercase tracking-[0.14em] transition-colors duration-200 hover:text-white ${
      active ? 'text-white' : 'text-[#C5C5C5]'
    }`;
    return (
      <Link href={link.href} className={className}>
        {t(link.tKey)}
        {active && (
          <motion.div
            layoutId="nav-indicator"
            className="absolute -bottom-1.5 left-0 right-0 h-px bg-[#FF8C00]"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </Link>
    );
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/[0.05]'
          : 'bg-transparent'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-[height] duration-300 ${
          scrolled ? 'h-14' : 'h-20'
        }`}
      >
        <Link href="/" className="hover:opacity-80 transition-opacity duration-200" aria-label={BRAND.wordmark}>
          <Logo />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLinkItem key={link.href} link={link} />
          ))}
        </div>

        <div className="hidden md:flex items-center gap-5">
          <LanguageSwitcher />
          <button
            onClick={() => addToCart()}
            className="btn-orange"
            style={{ padding: '0.55rem 1.4rem', fontSize: '0.78rem', letterSpacing: '0.06em' }}
          >
            {t('cta_buy')}
          </button>
        </div>

        {/* Mobile: Buy CTA + menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => addToCart()}
            className="btn-orange"
            style={{ padding: '0.45rem 1rem', fontSize: '0.72rem', letterSpacing: '0.06em' }}
          >
            {t('cta_buy')}
          </button>
          <button
            className="text-white p-2 -mr-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-[#0A0A0A]/98 backdrop-blur-xl border-t border-white/[0.05] overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={link.href}
                    className="font-display text-3xl uppercase tracking-wide text-[#D1D5DB] hover:text-[#FF8C00] transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {t(link.tKey)}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 mt-4 border-t border-white/[0.05]">
                <LanguageSwitcher variant="full" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
