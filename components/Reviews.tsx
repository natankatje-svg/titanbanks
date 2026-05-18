'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote, CheckCircle2, MapPin } from 'lucide-react';

const reviews = [
  {
    name: 'Thomas V.',
    role: 'Backpacker · 34 landen',
    avatar: 'TV',
    rating: 5,
    title: '"Beste aankoop van mijn reisleven."',
    text: 'Ik nam de Titan X mee op een 3-maanden trip door Zuidoost-Azië. Geen enkele keer zonder stroom geweest. De ingebouwde kabels zijn genialiteit in het kwadraat — nooit meer zoeken.',
    location: 'Bangkok, Thailand',
    accent: '#0EB5C8',
    platform: 'Trustpilot',
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
    platform: 'Google',
  },
  {
    name: 'Daan K.',
    role: 'Freelance developer',
    avatar: 'DK',
    rating: 5,
    title: '"Mijn laptop en phone altijd opgeladen."',
    text: 'Ik werk vanuit cafés en treinen. De fast charging houdt mijn MacBook en iPhone tegelijk bijgetankt. Die LED display is geweldig — precies weten wat er nog in zit.',
    location: 'Amsterdam, NL',
    accent: '#FFD700',
    platform: 'Trustpilot',
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
    platform: 'Google',
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
    platform: 'Trustpilot',
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
    platform: 'Trustpilot',
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
    <section id="reviews" ref={ref} className="relative py-24 lg:py-36 bg-[#0c0c0c] overflow-hidden">
      {/* Ambient gold glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(234,179,8,0.04) 0%, transparent 65%)' }}
      />


      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <div className="section-label mb-4 flex items-center gap-3 justify-center">
            <div className="w-6 h-px bg-[#EAB308]" />
            <span>10 — Reviews</span>
          </div>
          <h2 className="font-display uppercase text-white mb-6" style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', lineHeight: 0.88 }}>
            WAT KLANTEN <span className="text-gradient-gold">ZEGGEN</span>
          </h2>

          {/* Aggregate score */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-display text-white text-3xl">4.9</span>
              <span className="font-body text-gray-500 text-sm">/ 5.0 · 2.400+ reviews</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <p className="font-mono-titan text-[0.6rem] uppercase tracking-widest text-gray-600">
                Geverifieerde aankopen
              </p>
              <span className="w-px h-3 bg-white/[0.08]" />
              <a
                href="#"
                className="font-mono-titan text-[0.6rem] uppercase tracking-widest text-gray-600 hover:text-[#EAB308] transition-colors duration-200 underline underline-offset-2"
              >
                Trustpilot
              </a>
              <span className="w-px h-3 bg-white/[0.08]" />
              <a
                href="#"
                className="font-mono-titan text-[0.6rem] uppercase tracking-widest text-gray-600 hover:text-[#EAB308] transition-colors duration-200 underline underline-offset-2"
              >
                Google Reviews
              </a>
            </div>
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
              whileHover={{ y: -3, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
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
                  className="w-11 h-11 rounded-full flex items-center justify-center font-mono-titan text-sm flex-shrink-0 font-semibold"
                  style={{ background: `${review.accent}18`, color: review.accent, border: `1px solid ${review.accent}30` }}
                >
                  {review.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <div className="font-body text-white font-semibold text-sm">{review.name}</div>
                    <CheckCircle2 className="w-3 h-3 flex-shrink-0" style={{ color: '#22c55e' }} />
                  </div>
                  <div className="font-mono-titan text-gray-600 text-xs">{review.role}</div>
                </div>
              </div>

              {/* Stars */}
              <StarRating count={review.rating} />

              {/* Title */}
              <div className="font-body text-white font-semibold text-sm leading-snug">{review.title}</div>

              {/* Text */}
              <p className="font-body text-gray-500 text-sm leading-relaxed flex-1">{review.text}</p>

              {/* Location + Platform */}
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.05]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-2.5 h-2.5 text-gray-700 flex-shrink-0" />
                  <span className="font-mono-titan text-gray-600 text-[0.6rem] uppercase tracking-wide">{review.location}</span>
                </div>
                <span
                  className="font-mono-titan text-[0.5rem] uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                  style={review.platform === 'Trustpilot'
                    ? { background: 'rgba(0,182,122,0.1)', color: '#00b67a', border: '1px solid rgba(0,182,122,0.2)' }
                    : { background: 'rgba(66,133,244,0.1)', color: '#4285F4', border: '1px solid rgba(66,133,244,0.2)' }
                  }
                >
                  {review.platform}
                </span>
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
          <div className="inline-flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" style={{ color: '#22c55e' }} />
            <span className="font-mono-titan text-gray-600 text-xs uppercase tracking-widest">
              Alle reviews zijn geverifieerde aankopen
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
