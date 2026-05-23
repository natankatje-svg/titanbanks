'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEcwid } from './EcwidProvider';
import { BRAND, LAUNCH_STATE } from '@/lib/product-claims';

type NavMode = 'shop' | 'teaser' | 'site';

const siteLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Technology', href: '/technology' },
  { label: 'Calculator', href: '/calculator' },
  { label: 'Story', href: '/story' },
  { label: 'Support', href: '/support' },
];

const previewLinks = [
  { label: 'Functies', href: '#functies' },
  { label: 'Gebruik', href: '#gebruik' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
];

const teaserLinks = [
  { label: 'Specs', href: '#capacity' },
  { label: 'Waitlist', href: '#waitlist' },
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
  const pathname = usePathname();
  const inferredMode: NavMode =
    mode ?? (pathname === '/preview' ? 'shop' : pathname === '/' ? 'teaser' : 'site');

  const { addToCart } = useEcwid();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const links =
    inferredMode === 'teaser' ? teaserLinks : inferredMode === 'shop' ? previewLinks : siteLinks;

  const ctaLabel =
    inferredMode === 'teaser' || LAUNCH_STATE.waitlistMode ? 'Join waitlist' : 'Bestel Titan X';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const isInternalRoute = (href: string) => href.startsWith('/');

  const handlePrimaryCta = () => {
    if (inferredMode === 'teaser' || LAUNCH_STATE.waitlistMode) {
      window.location.href = inferredMode === 'site' ? '/#waitlist' : '#waitlist';
      return;
    }
    addToCart();
  };

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
          {links.map((link) => {
            const active = isInternalRoute(link.href) && pathname.startsWith(link.href);
            const className = `relative font-mono text-[0.72rem] uppercase tracking-[0.18em] transition-colors duration-200 hover:text-white ${
              active ? 'text-white' : 'text-[#888888]'
            }`;
            return isInternalRoute(link.href) ? (
              <Link key={link.label} href={link.href} className={className}>
                {link.label}
                {active && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-[#FF6B00]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ) : (
              <a key={link.label} href={link.href} className={className}>
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="hidden md:flex">
          <button
            onClick={handlePrimaryCta}
            className="btn-orange"
            style={{ padding: '0.55rem 1.4rem', fontSize: '0.78rem', letterSpacing: '0.06em' }}
          >
            {ctaLabel}
          </button>
        </div>

        {/* Mobile: Buy CTA always visible in thumb-zone proximity (top right), menu toggle next to it */}
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
              {links.map((link, i) =>
                isInternalRoute(link.href) ? (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      className="font-display text-3xl uppercase tracking-wide text-[#D1D5DB] hover:text-[#FF6B00] transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="font-display text-3xl uppercase tracking-wide text-[#D1D5DB] hover:text-[#FF6B00] transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
