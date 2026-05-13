'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const useCases = [
  {
    emoji: '✈️',
    title: 'Reizen',
    subtitle: 'Voor de globetrotter',
    description:
      'Van Amsterdam naar Bangkok zonder stressmoment. De Titan X laadt je telefoon, tablet en koptelefoon op één vlucht. Vliegtuigveilig, compact en krachtig.',
    gradient: 'from-blue-500/10 to-cyan-500/5',
    border: 'border-blue-500/15',
    accent: '#00E5FF',
  },
  {
    emoji: '🏕️',
    title: 'Outdoor & Camping',
    subtitle: 'Voor de avonturier',
    description:
      'GPS, camera, zaklamp — allemaal gevoed door de Titan X. De LED flashlight is je noodfunctie als de zon ondergaat. Gemaakt voor diegenen die verder gaan.',
    gradient: 'from-green-500/10 to-emerald-500/5',
    border: 'border-green-500/15',
    accent: '#4ade80',
  },
  {
    emoji: '🎵',
    title: 'Festivals',
    subtitle: 'Non-stop genieten',
    description:
      'Drie dagen festival, nul zorgen. De ingebouwde kabels laden je telefoon razendsnel op — ook in de moshpit. Geen powerbank-rij meer bij de laadpaal.',
    gradient: 'from-purple-500/10 to-pink-500/5',
    border: 'border-purple-500/15',
    accent: '#a855f7',
  },
  {
    emoji: '🎮',
    title: 'Gaming & Content',
    subtitle: 'Voor creators & gamers',
    description:
      'Stream, game en maak content zonder onderbreking. De Titan X voorziet je phone en tablet van constante energie — fast charge als je even pauze hebt.',
    gradient: 'from-red-500/10 to-orange-500/5',
    border: 'border-red-500/15',
    accent: '#f97316',
  },
  {
    emoji: '💼',
    title: 'Werk & School',
    subtitle: 'Voor de professional',
    description:
      'Laptop bijna leeg in de trein? Geen probleem. De Titan X laadt ook laptops en tablets op. Één powerbank voor je hele werkdag, meeting na meeting.',
    gradient: 'from-amber-500/10 to-yellow-500/5',
    border: 'border-amber-500/15',
    accent: '#FFD700',
  },
  {
    emoji: '🚨',
    title: 'Noodgevallen',
    subtitle: 'Altijd bereikbaar',
    description:
      'Stroom uitval, auto pech of een noodsituatie — de Titan X houdt je verbonden. LED flashlight geeft noodlicht. 50.000mAh geeft je dagen energie.',
    gradient: 'from-rose-500/10 to-red-500/5',
    border: 'border-rose-500/15',
    accent: '#f43f5e',
  },
];

export default function UseCases() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="gebruik" ref={ref} className="relative py-28 lg:py-40 bg-[#080808] overflow-hidden">
      {/* Divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-orange-500/8 border border-orange-500/20 rounded-full px-4 py-2 mb-6">
            <span className="text-orange-400 text-xs font-bold tracking-[0.15em] uppercase">
              Overal inzetbaar
            </span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black tracking-tight text-white mb-5">
            Jouw leven,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FF6B35, #FFD700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              jouw power
            </span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Of je nu door Azië backpact, op een festival staat of een deadline haalt — de Titan X
            past zich aan jou aan.
          </p>
        </motion.div>

        {/* Use case grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className={`relative rounded-3xl p-8 border bg-gradient-to-br ${uc.gradient} ${uc.border} overflow-hidden group cursor-default`}
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-white/[0.015] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />

              {/* Emoji */}
              <div className="text-5xl mb-5 block">{uc.emoji}</div>

              {/* Subtitle */}
              <div
                className="text-xs font-bold tracking-[0.15em] uppercase mb-2"
                style={{ color: uc.accent }}
              >
                {uc.subtitle}
              </div>

              {/* Title */}
              <h3 className="text-white text-2xl font-black mb-3">{uc.title}</h3>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed">{uc.description}</p>

              {/* Corner decoration */}
              <div
                className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                style={{ background: uc.accent }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
