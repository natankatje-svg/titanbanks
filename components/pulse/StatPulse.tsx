'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion, animate } from 'framer-motion';
import { SPECS } from '@/lib/product-claims';
import Kicker from '@/components/pulse/Kicker';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * StatPulse — de cijfers als energiecellen: count-up bij inView, gloed-puls
 * achter het actieve cijfer, shine-sweep bij hover. Weave-textuur (productloos
 * sfeerbeeld) heel subtiel als ondergrond. Copy = bestaande strings.
 */
const CELLS = [
  {
    value: SPECS.capacityMah.value,
    format: (v: number) => v.toLocaleString('nl-NL'),
    unit: 'mAh',
    label: 'Capaciteit',
    desc: 'Genoeg om dagen door te komen, niet uren.',
  },
  {
    value: SPECS.simultaneousDevices.value,
    format: (v: number) => v.toString(),
    unit: 'apparaten',
    label: 'Tegelijk laden',
    desc: 'Via 4× USB-A plus ingebouwde USB-C en Lightning kabels.',
  },
  {
    value: SPECS.portsUsbA.value,
    format: (v: number) => v.toString(),
    unit: '× USB-A',
    label: 'Poorten',
    desc: 'Plus snellaad via de ingebouwde USB-C kabel.',
  },
  {
    value: SPECS.warrantyYears.value,
    format: (v: number) => v.toString(),
    unit: 'jaar',
    label: 'Garantie',
    desc: 'Fabrieksgarantie op elke Titan X.',
  },
] as const;

function Cell({ cell, index }: { cell: (typeof CELLS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? cell.value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, cell.value, {
      duration: 1.2,
      delay: index * 0.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, cell.value, index]);

  return (
    <div
      ref={ref}
      className="card-shine group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0C0C0C]/80 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-titan-accent/40 lg:p-8"
    >
      {/* gloed achter cijfer */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-6 -top-8 h-32 w-32 rounded-full blur-[50px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'rgba(255,140,0,0.3)' }}
      />
      <div className="relative flex items-baseline gap-2">
        <span className="font-display text-4xl tabular-nums text-white transition-colors duration-300 group-hover:text-titan-accent lg:text-5xl">
          {cell.format(Math.min(shown, cell.value))}
        </span>
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-titan-accent">
          {cell.unit}
        </span>
      </div>
      <p className="relative mt-3 font-body text-sm font-600 uppercase tracking-[0.08em] text-white">
        {cell.label}
      </p>
      <p className="relative mt-1.5 font-body text-sm leading-relaxed text-[#9A9A9A]">{cell.desc}</p>
    </div>
  );
}

export default function StatPulse() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden border-t border-white/[0.07] bg-[#080808] py-20 lg:py-28">
      {/* weave-textuur — heel subtiel */}
      <div aria-hidden className="absolute inset-0 opacity-[0.16]">
        <Image src="/images/atmosphere/weave.webp" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #080808 0%, rgba(8,8,8,0.55) 50%, #080808 100%)' }} />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mb-10 flex flex-col gap-4 lg:mb-12 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <Kicker>Wat erin zit</Kicker>
            <h2 className="mt-3 font-display uppercase leading-[1.05] text-white" style={{ fontSize: 'clamp(1.8rem, 3.8vw, 3rem)' }}>
              Pure <span className="text-titan-accent">capaciteit.</span>
            </h2>
          </div>
          <p className="max-w-md font-body text-base leading-relaxed text-[#9C9C9C] lg:text-right">
            Geen ruis, geen loze specs. Vier getallen die bepalen of je onderweg zonder stroom komt
            te zitten — of niet.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CELLS.map((cell, i) => (
            <Cell key={cell.label} cell={cell} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
