'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useEcwid } from './EcwidProvider';

const navLinksDefault = [
  { label: 'Functies',  href: '#functies',  id: 'functies'  },
  { label: 'Gebruik',   href: '#gebruik',   id: 'gebruik'   },
  { label: 'Showcase',  href: '#showcase',  id: 'showcase'  },
  { label: 'Reviews',   href: '#reviews',   id: 'reviews'   },
  { label: 'FAQ',       href: '#faq',       id: 'faq'       },
];

const navLinksTeaser = [
  { label: 'Specs',     href: '#capacity',  id: 'capacity'  },
  { label: 'Waitlist',  href: '#waitlist',  id: 'waitlist'  },
];

function Logo() {
  return (
    <Image
      src="/branding/logo-white-tight.png"
      alt="TitanBanks"
      width={1746}
      height={320}
      className="h-10 w-auto block"
      priority
    />
  );
}

export default function Navigation({ mode = 'shop' }: { mode?: 'shop' | 'teaser' }) {
  const { addToCart } = useEcwid();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeId, setActiveId]   = useState('');
  const navLinks = mode === 'teaser' ? navLinksTeaser : navLinksDefault;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Track which section is in view */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/95 backdrop-blur-xl border-b border-white/[0.05]' : 'bg-transparent'
      }`}
    >
      <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-[height] duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>
        <a href="/" className="hover:opacity-80 transition-opacity duration-200">
          <Logo />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                className="relative font-body text-[0.82rem] font-medium tracking-[0.07em] transition-colors duration-200"
                style={{ color: isActive ? '#fff' : '#9CA3AF' }}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px]"
                    style={{ background: '#FF8C00' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        <div className="hidden md:flex relative">
          {mode === 'teaser' ? (
            <a href="#waitlist" className="btn-orange" style={{ padding: '0.6rem 1.6rem', fontSize: '0.85rem' }}>
              Join waitlist
            </a>
          ) : (
            <>
              <button onClick={addToCart} className="btn-orange" style={{ padding: '0.6rem 1.6rem', fontSize: '0.85rem' }}>
                Bestel Nu
              </button>
              <span
                className="absolute -top-2.5 -right-2.5 font-mono-titan text-white leading-none rounded-full px-1.5 py-0.5"
                style={{ background: '#FF8C00', fontSize: '0.65rem', letterSpacing: '0.06em' }}
              >
                −31%
              </span>
            </>
          )}
        </div>

        <button
          className="md:hidden text-white p-2 -mr-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-[#020202]/99 backdrop-blur-xl border-t border-white/[0.05] overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-5">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="font-display text-2xl uppercase tracking-wide transition-colors"
                  style={{ color: activeId === link.id ? '#FF8C00' : '#D1D5DB' }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              {mode === 'teaser' ? (
                <motion.a
                  href="#waitlist"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 }}
                  className="btn-orange mt-2 justify-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Join waitlist
                </motion.a>
              ) : (
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 }}
                  className="btn-orange mt-2 justify-center"
                  onClick={() => { addToCart(); setMenuOpen(false); }}
                >
                  Bestel Nu
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
