'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

// FAQ-antwoorden zijn handmatig geredigeerd om verzonnen claims te vermijden.
// Geen specifieke aantallen "12× smartphone", geen SOS-modus tot bevestigd,
// geen retractable kabels tot bevestigd, geen wattage-specifieke claims.
const faqs = [
  {
    q: 'Hoe vaak kan ik mijn devices opladen met Titan X?',
    a: 'Titan X heeft een capaciteit van 50.000 mAh — voor de meeste smartphones meerdere volledige laadbeurten, voor tablets enkele en voor moderne laptops 1–2 keer (via USB-C).',
  },
  {
    q: 'Welke apparaten kan ik opladen?',
    a: 'Vrijwel alle USB-apparaten: smartphones (iPhone, Android), tablets, laptops via USB-C, draadloze oordopjes, smartwatches, camera\'s en meer. Via 4× USB-A, 1× USB-C output en 1× Micro-USB input laad je tot 6 devices tegelijk.',
  },
  {
    q: 'Hoe snel laadt Titan X mijn devices?',
    a: 'Titan X ondersteunt snellaad via USB-C. Sluit een compatibel device aan en het juiste protocol wordt automatisch herkend. We publiceren de exacte wattage zodra die definitief is bevestigd — geen ongebaseerde getallen tot dan.',
  },
  {
    q: 'Hoe lang duurt het opladen van Titan X zelf?',
    a: 'Via de USB-C ingang gaat het sneller dan via USB-A. We adviseren de power bank \'s nachts op te laden zodat hij overdag altijd klaar is. Exacte oplaadduur wordt bevestigd in de specs zodra getest in finale productie-units.',
  },
  {
    q: 'Heeft Titan X een garantie?',
    a: 'Ja, 2 jaar fabrieksgarantie. Bij defecten onder normale gebruiksomstandigheden zorgen wij voor reparatie of vervanging. Neem contact op via klantenservice voor garantieclaims.',
  },
  {
    q: 'Hoe gebruik ik de ingebouwde zaklamp?',
    a: 'Houd de power-button kort ingedrukt om de zaklamp te activeren. De zaklamp werkt onafhankelijk van de oplaadfunctie. De exacte bedieningssequentie (standen, SOS) wordt bevestigd in de handleiding bij verzending van de eerste batch.',
  },
];

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="border-b border-white/[0.06] last:border-0 -ml-3 pl-3"
      style={{
        borderLeft: `2px solid ${open ? 'rgba(14,181,200,0.45)' : 'transparent'}`,
        background: open ? 'rgba(14,181,200,0.02)' : 'transparent',
        transition: 'border-color 0.3s ease, background-color 0.3s ease',
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
      >
        <span className="font-body text-white font-semibold text-base lg:text-lg leading-snug group-hover:text-[#0EB5C8] transition-colors duration-200">
          {faq.q}
        </span>
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 mt-0.5"
          style={{
            background: open ? 'rgba(14,181,200,0.1)' : 'rgba(255,255,255,0.04)',
            border: open ? '1px solid rgba(14,181,200,0.3)' : '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {open ? (
            <Minus className="w-4 h-4" style={{ color: '#0EB5C8' }} />
          ) : (
            <Plus className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-gray-400 text-base leading-relaxed pb-6 max-w-3xl">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="faq" ref={ref} className="relative py-24 lg:py-36 bg-[#0A0A0A] overflow-hidden">
      {/* Ambient teal glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[260px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(14,181,200,0.035) 0%, transparent 65%)' }}
      />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="section-label mb-4 flex items-center gap-3 justify-center">
            <div className="w-6 h-px bg-[#0EB5C8]" />
            <span>11 — FAQ</span>
          </div>
          <h2 className="font-display uppercase text-white mb-5" style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', lineHeight: 0.88 }}>
            ALLES WAT JE WIL <span className="text-gradient-teal">WETEN</span>
          </h2>
          <p className="font-body text-gray-400 text-lg leading-relaxed">
            Staat jouw vraag er niet bij?{' '}
            <a
              href="mailto:hello@titan-banks.com"
              className="text-[#0EB5C8] underline underline-offset-2 hover:text-white transition-colors duration-200"
            >
              Mail ons
            </a>
            {' '}of stuur een DM via{' '}
            <a
              href="#"
              className="text-[#0EB5C8] underline underline-offset-2 hover:text-white transition-colors duration-200"
            >
              @titanbanks
            </a>
            .
          </p>
        </motion.div>

        {/* FAQ list */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card rounded-3xl px-8 lg:px-12"
        >
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
