'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'Hoe vaak kan ik mijn telefoon opladen met de Titan X?',
    a: 'De Titan X heeft een capaciteit van 50.000mAh. Afhankelijk van het type smartphone kun je een moderne iPhone of Android gemiddeld 10–12 keer volledig opladen. Een tablet laad je 3–5 keer volledig op. Voor oudere of kleinere telefoons zijn nog meer oplaadcycli mogelijk.',
  },
  {
    q: 'Is de Titan X toegestaan in het vliegtuig?',
    a: 'Ja, de Titan X is toegestaan als handbagage in de meeste vliegtuigen. Lithium-accu\'s tot 100Wh zijn doorgaans zonder beperkingen toegestaan. Accu\'s van 100–160Wh (zoals de Titan X) zijn in de meeste gevallen ook toegestaan, maar check altijd de specifieke regels van jouw luchtvaartmaatschappij. Vervoer de powerbank altijd in handbagage, nooit in het ruim.',
  },
  {
    q: 'Hoe werkt het fast charging systeem?',
    a: 'De Titan X ondersteunt zowel Power Delivery (PD) 22.5W als Quick Charge (QC) 3.0. Sluit je een compatibel apparaat aan via de USB-C poort, dan detecteert de Titan X automatisch het snelste laadprotocol en geeft maximaal 22.5W af. Voor smartphones die QC 3.0 ondersteunen, verloopt het opladen via USB-A net zo snel. Zonder fast charge-compatibel apparaat wordt gewoon standaardsnelheid gebruikt.',
  },
  {
    q: 'Welke apparaten kan ik opladen met de Titan X?',
    a: 'De Titan X is geschikt voor vrijwel alle USB-apparaten: smartphones (iPhone, Android), tablets (iPad, Samsung), laptops (via USB-C PD), Nintendo Switch, Bluetooth oordopjes, smartwatches, camera\'s, GoPro\'s en meer. Door de 5 uitgangspoorten kun je tot 5 apparaten tegelijkertijd opladen.',
  },
  {
    q: 'Hoe lang duurt het opladen van de Titan X zelf?',
    a: 'Het opladen van de Titan X zelf duurt via de USB-C ingang (PD 22.5W input) gemiddeld 8–10 uur voor een volledige oplaadcyclus van 0% naar 100%. Via een standaard USB-A charger duurt dit langer (12–16 uur). We raden aan de Titan X \'s nachts op te laden zodat hij overdag altijd klaar is.',
  },
  {
    q: 'Heeft de Titan X een garantie?',
    a: 'Ja, alle TitanBanks producten worden geleverd met 2 jaar fabrieksgarantie. Bij defecten die onder normale gebruiksomstandigheden ontstaan, zorgen wij voor gratis reparatie of vervanging. Neem contact op via onze klantenservice voor garantieclaims.',
  },
  {
    q: 'Hoe gebruik ik de ingebouwde LED flashlight?',
    a: 'De LED flashlight activeer je door de powerknop 2 seconden ingedrukt te houden. Eén keer drukken schakelt naar de lage stand, nogmaals drukken naar hoog, en een derde keer activeert de SOS-knipperstand. Nog een keer drukken schakelt de flashlight uit. De flashlight werkt ook wanneer de powerbank zelf niet wordt gebruikt voor opladen.',
  },
];

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="border-b border-white/[0.06] last:border-0"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
      >
        <span className="text-white font-semibold text-base lg:text-lg leading-snug group-hover:text-[#00E5FF] transition-colors duration-200">
          {faq.q}
        </span>
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 mt-0.5"
          style={{
            background: open ? '#00E5FF1a' : 'rgba(255,255,255,0.04)',
            border: open ? '1px solid #00E5FF30' : '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {open ? (
            <Minus className="w-4 h-4 text-[#00E5FF]" />
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
    <section id="faq" ref={ref} className="relative py-28 lg:py-40 bg-[#080808] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6">
            <span className="text-gray-400 text-xs font-bold tracking-[0.15em] uppercase">
              Veelgestelde vragen
            </span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black tracking-tight text-white mb-5">
            Alles wat je wil{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00E5FF, #0099BB)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              weten
            </span>
          </h2>
          <p className="text-gray-400 text-xl leading-relaxed">
            Staat jouw vraag er niet bij? Stuur ons een bericht via Instagram of e-mail.
          </p>
        </motion.div>

        {/* FAQ list */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card rounded-3xl px-8 lg:px-12 divide-y-0"
        >
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
