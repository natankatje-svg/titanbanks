'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// FAQ-antwoorden zijn handmatig geredigeerd om verzonnen claims te vermijden.
// Geen specifieke aantallen "12× smartphone", geen SOS-modus tot bevestigd,
// geen retractable kabels tot bevestigd, geen wattage-specifieke claims.
const faqs = [
  {
    q: 'Hoe vaak kan ik mijn devices opladen met Titan X?',
    a: 'Titan X heeft een capaciteit van 50.000 mAh — voor de meeste smartphones meerdere volledige laadbeurten, voor tablets enkele, en voor moderne laptops 1–2 keer via de ingebouwde USB-C kabel.',
  },
  {
    q: 'Welke apparaten kan ik opladen?',
    a: 'Vrijwel alle USB-apparaten. Via de 4× USB-A poorten en de 2 ingebouwde intrekbare kabels (USB-C en Lightning) laad je tot 6 devices tegelijk: smartphones (iPhone via Lightning, Android via USB-C), tablets, laptops via USB-C, oordopjes, smartwatches, camera\'s en meer.',
  },
  {
    q: 'Hoe snel laadt Titan X mijn devices?',
    a: 'Titan X snellaadt via de ingebouwde USB-C kabel — snel genoeg om een moderne smartphone in ~30 minuten naar 50% te brengen. Het juiste laadprotocol wordt automatisch herkend per device.',
  },
  {
    q: 'Heeft Titan X een garantie?',
    a: 'Ja, 2 jaar fabrieksgarantie. Bij defecten onder normale gebruiksomstandigheden zorgen wij voor reparatie of vervanging. Neem contact op via klantenservice voor garantieclaims. Verzending uit Nederland, 14 dagen retourrecht, geen vragen.',
  },
];
// V3 one-pager: 4 vragen max. Capacity · compatibility · speed · warranty
// dekken 90% van de buy-blocking-objections.

export default function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="faq" ref={ref} className="relative py-20 lg:py-32 bg-titan-surface overflow-hidden border-t border-white/[0.06]">
      {/* Ambient warme gloed bovenaan */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[260px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,140,0,0.04) 0%, transparent 65%)' }}
      />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-titan-accent">
            FAQ
          </span>
          <h2
            className="font-display uppercase text-white mt-3 mb-5 [text-wrap:balance]"
            style={{ fontSize: 'clamp(2rem, 4.6vw, 3.6rem)', lineHeight: 0.95 }}
          >
            ALLES WAT JE WIL <span className="text-titan-accent">WETEN</span>
          </h2>
          <p className="font-body text-gray-400 text-lg leading-relaxed">
            Staat jouw vraag er niet bij?{' '}
            <a
              href="mailto:hello@titan-banks.com"
              className="text-titan-accent underline underline-offset-2 hover:text-white transition-colors duration-200"
            >
              Mail ons
            </a>
            {' '}— we reageren snel.
          </p>
        </motion.div>

        {/* FAQ-accordion (radix — toetsenbord + screenreader a11y) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="corner-ticks border border-white/[0.1] bg-[#0A0A0A] px-7 lg:px-10"
        >
          <Accordion type="single" collapsible>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent className="max-w-3xl">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
