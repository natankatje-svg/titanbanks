'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';

const navLinks = [
  { label: 'Functies', href: '#functies' },
  { label: 'Gebruik', href: '#gebruik' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
];

function TitanBanksWordmark() {
  return (
    <span className="flex items-center font-black text-xl tracking-tight select-none">
      <span style={{ color: '#9CA3AF' }}>T</span>
      <Zap className="w-3 h-[18px] mx-[1px]" style={{ color: '#EAB308', fill: '#EAB308', position: 'relative', top: '1px' }} />
      <span style={{ color: '#9CA3AF' }}>TAN</span>
      <span style={{ color: '#0EB5C8' }}>BANKS</span>
    </span>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#080808]/96 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/" className="hover:opacity-80 transition-opacity duration-200">
          <TitanBanksWordmark />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-500 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#bestel"
            className="font-bold px-6 py-2.5 rounded-full text-sm text-white transition-all duration-200 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #FF8C00, #E07800)',
              boxShadow: '0 4px 16px rgba(255,140,0,0.3)',
            }}
          >
            Bestel Nu
          </a>
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
            className="md:hidden bg-[#080808]/98 backdrop-blur-xl border-t border-white/[0.06] overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-5">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-gray-300 hover:text-white text-xl font-semibold tracking-tight"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#bestel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-2 font-bold px-6 py-4 rounded-full text-center text-lg text-white"
                style={{ background: 'linear-gradient(135deg, #FF8C00, #E07800)' }}
                onClick={() => setMenuOpen(false)}
              >
                Bestel Nu
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
