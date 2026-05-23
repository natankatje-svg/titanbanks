'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Zap } from 'lucide-react';
import {
  DEVICES,
  CATEGORY_LABELS,
  calculate,
  TITAN_X_USABLE_MAH,
  EFFICIENCY,
  type CalculatorDevice,
} from '@/lib/calculator-devices';
import { BRAND, SPECS, LAUNCH_STATE } from '@/lib/product-claims';
import { useEcwid } from './EcwidProvider';

export default function Calculator() {
  const { addToCart } = useEcwid();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] =
    useState<CalculatorDevice['category'] | 'all'>('all');

  const selected = useMemo(
    () => selectedIds.map((id) => DEVICES.find((d) => d.id === id)).filter(Boolean) as CalculatorDevice[],
    [selectedIds]
  );

  const result = useMemo(() => calculate(selected), [selected]);

  const filtered = useMemo(
    () => (activeCategory === 'all' ? DEVICES : DEVICES.filter((d) => d.category === activeCategory)),
    [activeCategory]
  );

  const toggle = (id: string) =>
    setSelectedIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const clearAll = () => setSelectedIds([]);

  const handleCta = () => {
    if (LAUNCH_STATE.waitlistMode) {
      window.location.href = '/#waitlist';
    } else {
      addToCart();
    }
  };

  const categories: Array<{ id: 'all' | CalculatorDevice['category']; label: string }> = [
    { id: 'all', label: 'Alle' },
    { id: 'phone', label: CATEGORY_LABELS.phone },
    { id: 'tablet', label: CATEGORY_LABELS.tablet },
    { id: 'laptop', label: CATEGORY_LABELS.laptop },
    { id: 'audio', label: CATEGORY_LABELS.audio },
    { id: 'camera', label: CATEGORY_LABELS.camera },
    { id: 'wearable', label: CATEGORY_LABELS.wearable },
    { id: 'other', label: CATEGORY_LABELS.other },
  ];

  return (
    <section className="relative bg-[#0A0A0A] text-[#F5F5F5] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#888888] mb-4">
            Power Calculator
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.92] mb-6">
            Hoeveel keer laadt {BRAND.product}<br />jouw devices?
          </h1>
          <p className="text-[#A0A0A0] text-lg max-w-2xl leading-relaxed">
            Kies je devices. Wij berekenen hoeveel laadbeurten je krijgt uit{' '}
            {SPECS.capacityMah.value.toLocaleString('nl-NL')} mAh — conservatief, met een
            efficiency-factor van {Math.round(EFFICIENCY * 100)}%.
          </p>
        </div>

        {/* Result panel */}
        <motion.div
          layout
          className="border border-[#2A2A2A] rounded-2xl p-6 md:p-8 mb-10 bg-[#121212]"
        >
          {selected.length === 0 ? (
            <div className="py-4 text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-[#666666] mb-2">
                Begin met selecteren
              </p>
              <p className="text-[#A0A0A0]">
                Kies hieronder welke devices je meeneemt. De berekening verschijnt hier live.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-[#FF6B00] mb-3">
                  Met jouw selectie
                </p>
                <div className="space-y-2 mb-4">
                  {result.perDevice.map(({ device, charges }) => (
                    <div key={device.id} className="flex items-baseline gap-3">
                      <span className="font-display text-2xl md:text-3xl font-bold text-white">
                        {charges}×
                      </span>
                      <span className="text-[#A0A0A0]">{device.label}</span>
                      <span className="font-mono text-xs text-[#666666]">
                        ({device.capacityMah.toLocaleString('nl-NL')} mAh)
                      </span>
                    </div>
                  ))}
                </div>
                {selected.length > 1 && (
                  <p className="font-mono text-xs text-[#888888] leading-relaxed">
                    Of, als je alles tegelijk meeneemt:{' '}
                    <span className="text-[#FF6B00]">
                      ~{result.combinedCycles} volledige set{result.combinedCycles === 1 ? '' : 's'}
                    </span>{' '}
                    + {Math.max(0, result.remainingMahAfterOneCycle).toLocaleString('nl-NL')} mAh
                    over voor extra opladen.
                  </p>
                )}
              </div>
              <div className="flex md:flex-col items-stretch gap-2">
                <button onClick={handleCta} className="btn-orange whitespace-nowrap">
                  <Zap className="w-4 h-4 fill-white" />
                  {LAUNCH_STATE.waitlistMode ? 'Join waitlist' : `Bestel ${BRAND.product}`}
                </button>
                <button
                  onClick={clearAll}
                  className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#888888] hover:text-white px-3 py-2"
                >
                  Wissen
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Disclaimer */}
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-[#666666] mb-10 leading-relaxed max-w-3xl">
          Indicatief. Werkelijke autonomie hangt af van charging-efficiency, kabel,
          batterij-conditie, gebruikspatroon en omgevingstemperatuur. Berekend op basis van{' '}
          {TITAN_X_USABLE_MAH.toLocaleString('nl-NL')} mAh bruikbare output ({Math.round(EFFICIENCY * 100)}%
          van de {SPECS.capacityMah.value.toLocaleString('nl-NL')} mAh nominale capaciteit).
        </p>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`font-mono text-[0.65rem] uppercase tracking-[0.2em] px-3 py-2 rounded-full border transition-colors ${
                activeCategory === cat.id
                  ? 'border-[#FF6B00] text-[#FF6B00] bg-[#FF6B00]/10'
                  : 'border-[#2A2A2A] text-[#888888] hover:border-[#666666] hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Device grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((device) => {
              const isSelected = selectedIds.includes(device.id);
              return (
                <motion.button
                  key={device.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  onClick={() => toggle(device.id)}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-[#FF6B00] bg-[#FF6B00]/10'
                      : 'border-[#2A2A2A] bg-[#121212] hover:border-[#666666]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p
                        className={`font-body text-sm font-medium leading-tight mb-1 ${
                          isSelected ? 'text-white' : 'text-[#D1D5DB]'
                        }`}
                      >
                        {device.label}
                      </p>
                      <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[#666666]">
                        {device.capacityMah.toLocaleString('nl-NL')} mAh
                      </p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? 'border-[#FF6B00] bg-[#FF6B00] text-black'
                          : 'border-[#3A3A3A] text-[#666666]'
                      }`}
                    >
                      {isSelected ? <X className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
