'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Car, Mountain, Music2, Gamepad2, Briefcase, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { Eyebrow } from '@/components/home/primitives';

const EASE = [0.16, 1, 0.3, 1] as const;

// Geen luchtvaart (50.000 mAh ≈ 185 Wh, boven ICAO-cabinelimiet). Road trips,
// outdoor, festivals, gaming, werk, noodgevallen.
const USE_CASES = [
  { Icon: Car, title: 'Road trips', desc: 'Camera, telefoon en speakers blijven aan — één power bank voor de hele rit.' },
  { Icon: Mountain, title: 'Outdoor', desc: 'GPS, camera en de ingebouwde zaklamp als back-up wanneer de zon ondergaat.' },
  { Icon: Music2, title: 'Festivals', desc: 'Drie dagen, nul zorgen. Telefoon, oordopjes en camera blijven de hele tijd aan.' },
  { Icon: Gamepad2, title: 'Creators & gaming', desc: 'Stream, game en maak content zonder onderbreking. Snellaad in je pauze.' },
  { Icon: Briefcase, title: 'Werk & school', desc: 'Laptop bijna leeg in de trein? Laadt ook laptops via de ingebouwde USB-C kabel.' },
  { Icon: AlertTriangle, title: 'Noodgevallen', desc: 'Stroomuitval of autopech — de zaklamp geeft licht, 50.000 mAh geeft je dagen.' },
] as const;

/**
 * UseCasesGrid — template-sectie 5 ("Activations" / 4-koloms card-grid),
 * met hover-fill: kaart wordt oranje, tekst wordt zwart (template-interactie).
 */
export default function UseCasesGrid() {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-[#0A0A0A] py-20 lg:py-28 overflow-hidden border-t border-white/[0.07]">
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-14 lg:mb-16 max-w-2xl">
          <Eyebrow className="mb-5">Waarvoor</Eyebrow>
          <h2
            className="font-display font-extrabold uppercase leading-[0.92] tracking-[-0.035em] text-white"
            style={{ fontSize: 'clamp(2.1rem, 5vw, 3.8rem)' }}
          >
            Gemaakt om
            <br />
            <span className="text-gradient-orange">mee te nemen.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {USE_CASES.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
              className="group relative rounded-2xl p-7 lg:p-8 border border-white/[0.08] bg-[#121212] overflow-hidden transition-all duration-500 hover:border-[#FF8C00]/35 hover:bg-[#161310] hover:shadow-[0_12px_48px_rgba(255,140,0,0.07)] cursor-default"
            >
              {/* warme gloed die bij hover van onderaf opkomt — silent luxury,
                  geen volledige oranje fill */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: 'radial-gradient(ellipse 90% 100% at 50% 110%, rgba(255,140,0,0.12) 0%, transparent 65%)' }}
              />
              <div className="relative flex items-start justify-between mb-6">
                <span
                  className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 bg-white/[0.03] transition-colors duration-500 group-hover:border-[#FF8C00]/30 group-hover:bg-[#FF8C00]/[0.06]"
                >
                  <uc.Icon className="w-5 h-5 text-[#FF8C00]" aria-hidden />
                </span>
                <ArrowUpRight className="w-5 h-5 text-white/25 transition-all duration-500 group-hover:text-[#FF8C00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </div>
              <h3 className="relative font-display text-2xl font-extrabold uppercase tracking-tight text-white leading-none mb-3">
                {uc.title}
              </h3>
              <p className="relative font-body text-[#9A9A9A] text-sm leading-relaxed transition-colors duration-500 group-hover:text-[#C0C0C0]">
                {uc.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
