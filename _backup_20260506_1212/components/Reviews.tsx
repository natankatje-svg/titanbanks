'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Thomas V.',
    role: 'Backpacker · 34 landen',
    avatar: 'TV',
    rating: 5,
    title: '"Beste aankoop van mijn reisleven."',
    text: 'Ik nam de Titan X mee op een 3-maanden trip door Zuidoost-Azië. Geen enkele keer zonder stroom geweest. De ingebouwde kabels zijn genialiteit in het kwadraat — nooit meer zoeken.',
    location: 'Bangkok, Thailand',
    accent: '#00E5FF',
  },
  {
    name: 'Sarah M.',
    role: 'Festival organisator',
    avatar: 'SM',
    rating: 5,
    title: '"Onmisbaar op elk festival."',
    text: 'Drie dagen Tomorrowland, constant streamen en foto\'s uploaden. Titan X deed het gewoon. En die LED flashlight was perfect om s\'nachts mijn locker te vinden. Nooit meer een ander merk.',
    location: 'Boom, België',
    accent: '#a855f7',
  },
  {
    name: 'Daan K.',
    role: 'Freelance developer',
    avatar: 'DK',
    rating: 5,
    title: '"Mijn laptop en phone altijd opgeladen."',
    text: 'Ik werk vanuit cafés en treinen. De 22.5W fast charge houdt mijn MacBook en iPhone tegelijk bijgetankt. Die LED display is geweldig — precies weten wat er nog in zit.',
    location: 'Amsterdam, NL',
    accent: '#FFD700',
  },
  {
    name: 'Lisa R.',
    role: 'Outdoor fotograaf',
    avatar: 'LR',
    rating: 5,
    title: '"Camera, drone, phone — allemaal op één lading."',
    text: 'Voor mijn outdoor shoots loop ik soms 10+ uur rond. Camera body, drone controller, telefoon — de Titan X laadt ze allemaal. En de flashlight? Onmisbaar bij zonsondergang shoots.',
    location: 'Nationaal Park, NL',
    accent: '#4ade80',
  },
  {
    name: 'Mark de B.',
    role: 'Vader van 3 kinderen',
    avatar: 'MB',
    rating: 5,
    title: '"Rust tijdens gezinsvakanties."',
    text: 'Met drie kinderen op vakantie = constant apparaten opladen. Tablets, telefoons, Nintendo Switch — de Titan X houdt alles bij. De capaciteit is ongelooflijk voor de prijs.',
    location: 'Rotterdam, NL',
    accent: '#FF6B35',
  },
  {
    name: 'Emma S.',
    role: 'Verpleegkundige · nachtdiensten',
    avatar: 'ES',
    rating: 5,
    title: '"Altijd bereikbaar, ook in noodsituaties."',
    text: 'Als verpleegkundige moet ik altijd bereikbaar zijn. De Titan X is mijn zekerheid. Die SOS flashlight-modus is een slimme toevoeging die ik hoop nooit nodig te hebben — maar fijn dat hij er is.',
    location: 'Utrecht, NL',
    accent: '#f43f5e',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

export default function Reviews() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="reviews" ref={ref} className="relative py-28 lg:py-40 bg-[#080808] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-yellow-400/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-yellow-400/8 border border-yellow-400/20 rounded-full px-4 py-2 mb-6">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span className="text-yellow-400 text-xs font-bold tracking-[0.15em] uppercase">
              Reviews
            </span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black tracking-tight text-white mb-5">
            Wat klanten{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FFD700, #FF6B35)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              zeggen
            </span>
          </h2>

          {/* Aggregate score */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-white text-2xl font-black">4.9</span>
            <span className="text-gray-500 text-sm">/ 5.0 · 2.400+ reviews</span>
          </div>
        </motion.div>

        {/* Review grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="glass-card rounded-3xl p-7 flex flex-col gap-5 relative overflow-hidden group cursor-default"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                style={{ background: `radial-gradient(circle at 20% 20%, ${review.accent}08 0%, transparent 60%)` }}
              />

              {/* Quote icon */}
              <Quote
                className="absolute top-6 right-6 w-8 h-8 opacity-10"
                style={{ color: review.accent }}
              />

              {/* Header */}
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
                  style={{ background: `${review.accent}18`, color: review.accent, border: `1px solid ${review.accent}30` }}
                >
                  {review.avatar}
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{review.name}</div>
                  <div className="text-gray-600 text-xs">{review.role}</div>
                </div>
              </div>

              {/* Stars */}
              <StarRating count={review.rating} />

              {/* Title */}
              <div className="text-white font-bold text-base leading-snug">{review.title}</div>

              {/* Text */}
              <p className="text-gray-500 text-sm leading-relaxed flex-1">{review.text}</p>

              {/* Location */}
              <div className="flex items-center gap-1.5 pt-1 border-t border-white/[0.05]">
                <span className="text-gray-700 text-xs">📍</span>
                <span className="text-gray-600 text-xs">{review.location}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Verified badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-10"
        >
          <div className="inline-flex items-center gap-2 text-gray-600 text-sm">
            <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            </div>
            Alle reviews zijn geverifieerde aankopen
          </div>
        </motion.div>
      </div>
    </section>
  );
}
