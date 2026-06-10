'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ParallaxImg } from '@/components/pulse/motion';
import Kicker from '@/components/pulse/Kicker';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * AtmosBreak — smalle parallax-sfeerband (productloos beeld) met één regel
 * use-case-copy als overlay. Pure adem + sfeer tussen secties.
 */
export default function AtmosBreak({
  atmosphere,
  kicker,
  line,
}: {
  atmosphere: string;
  kicker: string;
  line: string;
}) {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-white/[0.07] py-24 lg:py-36">
      <div aria-hidden className="absolute inset-0">
        <ParallaxImg className="h-full">
          <Image src={atmosphere} alt="" fill sizes="100vw" className="object-cover" />
        </ParallaxImg>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #080808 0%, rgba(8,8,8,0.4) 35%, rgba(8,8,8,0.4) 65%, #080808 100%)' }} />
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative mx-auto max-w-3xl px-6 text-center"
      >
        <Kicker>{kicker}</Kicker>
        <p
          className="mt-4 font-display uppercase leading-[1.15] text-white [text-wrap:balance]"
          style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.6rem)', textShadow: '0 2px 30px rgba(0,0,0,0.7)' }}
        >
          {line}
        </p>
      </motion.div>
    </section>
  );
}
