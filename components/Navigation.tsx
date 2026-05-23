'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { usePathname as useRawPathname } from 'next/navigation';
import { Link, usePathname } from '@/i18n/routing';
import { useEcwid } from './EcwidProvider';
import LanguageSwitcher from './LanguageSwitcher';
import { BRAND, LAUNCH_STATE } from '@/lib/product-claims';

type NavMode = 'shop' | 'teaser' | 'site';

interface NavLink {
  /** Translation-key onder messages.navigation.*, of null voor anchor-only links */
  tKey: string | null;
  /** Fallback-label voor links zonder t-key (anchors). */
  label?: string;
  /** Voor internal routes: pad zonder locale-prefix. Voor anchors: '#anchor'. */
  href: string;
  /** True = anchor-only link (zelfde page), gebruikt <a> i.p.v. next-intl Link. */
  anchor?: boolean;
}

const siteLinks: NavLink[] = [
  { tKey: 'shop', href: '/shop' },
  { tKey: 'technology', href: '/technology' },
  { tKey: 'calculator', href: '/calculator' },
  { tKey: 'story', href: '/story' },
  { tKey: 'support', href: '/support' },
];

const previewLinks: NavLink[] = [
  { tKey: null, label: 'Functies', href: '#functies', anchor: true },
  { tKey: null, label: 'Gebruik', href: '#gebruik', anchor: true },
  { tKey: null, label: 'Showcase', href: '#showcase', anchor: true },
  { tKey: null, label: 'Reviews', href: '#reviews', anchor: true },
  { tKey: null, label: 'FAQ', href: '#faq', anchor: true },
];

const teaserLinks: NavLink[] = [
  { tKey: null, label: 'Specs', href: '#capacity', anchor: true },
  { tKey: null, label: 'Waitlist', href: '#waitlist', anchor: true },
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

interface NavigationProps {
  mode?: NavMode;
}

export default function Navigation({ mode }: NavigationProps) {
  const t = useTranslations('navigation');
  // rawPathname = volledig pad incl. locale-prefix ('/nl/shop'); pathname = zonder ('/shop').
  // We checken op rawPathname voor /preview detection, op pathname voor active-state.
  const rawPathname = useRawPathname();
  const pathname = usePathname();

  const inferredMode: NavMode =
    mode ?? (rawPathname === '/preview' ? 'shop' : pathname === '/' ? 'teaser' : 'site');

  const { addToCart } = useEcwid();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const links: NavLink[] =
    inferredMode === 'teaser' ? teaserLinks : inferredMode === 'shop' ? previewLinks : siteLinks;

  const ctaLabel =
    inferredMode === 'teaser' || LAUNCH_STATE.waitlistMode ? t('cta_waitlist') : t('cta_buy');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [rawPathname]);

  const handlePrimaryCta = () => {
    if (inferredMode === 'teaser' || LAUNCH_STATE.waitlistMode) {
      // Op site-mode pages navigeren we naar de homepage's waitlist-sectie via
      // next-intl router. Op /preview en teaser is het een anchor binnen page.
      if (inferredMode === 'site') {
        window.location.href = `${rawPathname.split('/').slice(0, 2).join('/')}/#waitlist`;
      } else {
        window.location.href = '#waitlist';
      }
      return;
    }
    addToCart();
  };

  function NavLinkItem({ link }: { link: NavLink }) {
    const label = link.tKey ? t(link.tKey) : link.label ?? '';
    const active = !link.anchor && pathname.startsWith(link.href);
    const className = `relative font-mono text-[0.72rem] uppercase tracking-[0.18em] transition-colors duration-200 hover:text-white ${
      active ? 'text-white' : 'text-[#888888]'
    }`;

    if (link.anchor) {
      return (
        <a href={link.href} className={className}>
          {label}
        </a>
      );
    }
    return (
      <Link href={link.href} className={className}>
        {label}
        {active && (
          <motion.div
            layoutId="nav-indicator"
            className="absolute -bottom-1 left-0 right-0 h-px bg-[#FF6B00]"
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
          {links.map((link, i) => (
            <NavLinkItem key={`${link.href}-${i}`} link={link} />
          ))}
        </div>

        <div className="hidden md:flex items-center gap-5">
          <LanguageSwitcher />
          <button
            onClick={handlePrimaryCta}
            className="btn-orange"
            style={{ padding: '0.55rem 1.4rem', fontSize: '0.78rem', letterSpacing: '0.06em' }}
          >
            {ctaLabel}
          </button>
        </div>

        {/* Mobile: Buy CTA always visible in thumb-zone proximity, menu toggle next to it */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={handlePrimaryCta}
            className="btn-orange"
            style={{ padding: '0.45rem 1rem', fontSize: '0.72rem', letterSpacing: '0.06em' }}
          >
            {ctaLabel}
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
              {links.map((link, i) => {
                const label = link.tKey ? t(link.tKey) : link.label ?? '';
                const Tag = link.anchor ? 'a' : Link;
                return (
                  <motion.div
                    key={`${link.href}-mobile-${i}`}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Tag
                      href={link.href as never}
                      className="font-display text-3xl uppercase tracking-wide text-[#D1D5DB] hover:text-[#FF6B00] transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {label}
                    </Tag>
                  </motion.div>
                );
              })}
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
