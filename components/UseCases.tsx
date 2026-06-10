'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Car, Mountain, Music2, Gamepad2, Briefcase, AlertTriangle } from 'lucide-react';

// Geen luchtvaart-iconen of -copy: 50.000 mAh ≈ 185 Wh, boven de ICAO-limiet
// voor cabine-batterijen. Wel road trips, festivals, outdoor, werk, gaming, noodsituaties.
const useCases = [
  {
    Icon: Car,
    title: 'Road trips',
    sub: 'Voor de overlander',
    accent: '#0EB5C8',
    description: 'Off-grid weken op de baan? Camera, telefoon en speakers blijven aan via Titan X. Eén power bank voor de hele rit.',
  },
  {
    Icon: Mountain,
    title: 'Outdoor',
    sub: 'Voor de avonturier',
    accent: '#4ade80',
    description: 'GPS, camera, zaklamp — gevoed door Titan X. De ingebouwde zaklamp is je back-up als de zon ondergaat.',
  },
  {
    Icon: Music2,
    title: 'Festivals',
    sub: 'Non-stop genieten',
    accent: '#a855f7',
    description: 'Drie dagen festival, nul zorgen. 50.000 mAh houdt je telefoon, oordopjes en camera de hele rit aan.',
  },
  {
    Icon: Gamepad2,
    title: 'Gaming',
    sub: 'Voor creators & gamers',
    accent: '#FF8C00',
    description: 'Stream, game en maak content zonder onderbreking. Snellaad in je pauze.',
  },
  {
    Icon: Briefcase,
    title: 'Werk & School',
    sub: 'Voor de professional',
    accent: '#EAB308',
    description: 'Telefoon bijna leeg in de trein? Titan X snellaadt via de ingebouwde USB-C kabel.',
  },
  {
    Icon: AlertTriangle,
    title: 'Noodgevallen',
    sub: 'Altijd bereikbaar',
    accent: '#f43f5e',
    description: 'Stroomuitval, autopech of onverwacht donker — ingebouwde zaklamp geeft licht. 50.000 mAh geeft je dagen energie.',
  },
];

export default function UseCases() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <section id="gebruik" ref={ref} className="relative py-24 lg:py-36 bg-[#050505] overflow-hidden">
      {/* Ambient center glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(255,140,0,0.03) 0%, transparent 65%)' }}
      />
      {/* Bottom fade into ProductShowcase */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.7), transparent)' }}
      />


      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <div className="section-label mb-4 flex items-center gap-3 justify-center">
            <div className="w-6 h-px bg-[#FF8C00]" />
            <span>04 — Gebruik</span>
          </div>
          <h2 className="font-display uppercase text-white mb-4" style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', lineHeight: 0.88 }}>
            JOUW LEVEN,<br /><span className="text-gradient-orange">JOUW POWER</span>
          </h2>
          <p className="font-body text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Of je nu door Azië backpact, op een festival staat of een deadline haalt — de Titan X past zich aan jou aan.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              whileHover={{ y: -2, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
              className="group relative glass-card rounded-3xl p-7 overflow-hidden cursor-default"
            >
              {/* Hover glow */}
              <div
                className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none"
                style={{ background: uc.accent }}
              />
              {/* Top-left corner accent on hover */}
              <div
                className="absolute top-0 left-0 w-16 h-16 rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ background: `radial-gradient(circle at 0% 0%, ${uc.accent}12, transparent 70%)` }}
              />

              {/* Icon container */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${uc.accent}15`, border: `1px solid ${uc.accent}25` }}
              >
                <uc.Icon className="w-5 h-5" style={{ color: uc.accent }} />
              </div>

              <div className="font-mono-titan text-xs uppercase tracking-widest mb-2" style={{ color: uc.accent }}>{uc.sub}</div>
              <h3 className="font-display uppercase text-white text-3xl leading-none mb-3">{uc.title}</h3>
              <p className="font-body text-gray-500 text-sm leading-relaxed">{uc.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
