'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useReducedMotion, animate } from 'framer-motion';
import { SPECS } from '@/lib/product-claims';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * DataPanel — de capaciteits-USP als technisch datapaneel: vier cellen met
 * grote mono-cijfers (snelle count-up bij inView, reduced-motion: statisch),
 * hairline-verdeeld. Copy = bestaande WhatsInside-strings.
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
      duration: 1.1,
      delay: index * 0.08,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, cell.value, index]);

  return (
    <div ref={ref} className="group relative border border-white/[0.08] bg-[#0A0A0A] p-6 transition-colors hover:border-titan-accent/40 lg:p-8">
      <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-white/30">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-mono text-4xl font-700 tabular-nums text-white transition-colors group-hover:text-titan-accent lg:text-6xl">
          {cell.format(Math.min(shown, cell.value))}
        </span>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-titan-accent">
          {cell.unit}
        </span>
      </div>
      <p className="mt-3 font-display text-sm uppercase text-white">{cell.label}</p>
      <p className="mt-1.5 font-body text-sm leading-relaxed text-[#8A8A8A]">{cell.desc}</p>
    </div>
  );
}

export default function DataPanel() {
  const reduce = useReducedMotion();
  return (
    <section className="relative border-t border-white/[0.08] bg-[#080808] py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-10 flex flex-col gap-4 lg:mb-14 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-titan-accent">
              Wat erin zit
            </span>
            <h2 className="mt-3 font-display uppercase leading-[0.95] text-white" style={{ fontSize: 'clamp(2rem, 4.6vw, 3.6rem)' }}>
              Pure <span className="text-titan-accent">capaciteit.</span>
            </h2>
          </div>
          <p className="max-w-md font-body text-base leading-relaxed text-[#9C9C9C] lg:text-right">
            Geen ruis, geen loze specs. Vier getallen die bepalen of je onderweg zonder stroom komt
            te zitten — of niet.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {CELLS.map((cell, i) => (
            <Cell key={cell.label} cell={cell} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
