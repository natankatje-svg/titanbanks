'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  type MotionStyle,
  type MotionValue,
  type Variants,
} from 'framer-motion';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

type WrapperStyle = MotionStyle & {
  '--x': MotionValue<string>;
  '--y': MotionValue<string>;
};

export interface CarouselStep {
  id: string;
  /** Korte stap-label (tonen in pills) */
  name: string;
  /** Stap-titel binnen card */
  title: string;
  /** Korte description binnen card */
  description: string;
  /** Image src — single image per step (object-contain, blended op donkere bg) */
  image: string;
  /** Alt-text per step */
  alt: string;
}

export interface FeatureCarouselProps {
  /** Stappen in carousel — minimaal 2, maximaal 6 */
  steps: CarouselStep[];
  /** Auto-cycle interval in ms (default 4500) */
  interval?: number;
  /** Compacte mode voor mobile-in-hero — kleinere padding + image-height */
  compact?: boolean;
  /** Eigen className op buitenste wrapper */
  className?: string;
  /** ID prefix voor multi-instance pagina's */
  idPrefix?: string;
}

function useNumberCycler(total: number, interval: number) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const restart = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCurrent((p) => (p + 1) % total);
      restart();
    }, interval);
  }, [interval, total]);

  const setIndex = useCallback(
    (i: number) => {
      setCurrent(i % total);
      restart();
    },
    [total, restart],
  );

  useEffect(() => {
    restart();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [restart]);

  return { current, setIndex };
}

const stepVariants: Variants = {
  inactive: { scale: 0.85, opacity: 0.55 },
  active: { scale: 1, opacity: 1 },
};

const imageVariants = {
  initial: { opacity: 0, scale: 0.94, y: 16 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.94, y: -10 },
};

function StepPills({
  steps,
  current,
  onChange,
}: {
  steps: CarouselStep[];
  current: number;
  onChange: (i: number) => void;
}) {
  return (
    <nav aria-label="Carousel progress" className="flex justify-center">
      <ol className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        {steps.map((step, i) => {
          const isCompleted = current > i;
          const isCurrent = current === i;
          return (
            <motion.li
              key={step.id}
              initial="inactive"
              animate={isCurrent ? 'active' : 'inactive'}
              variants={stepVariants}
              transition={{ duration: 0.3 }}
              className={cn(
                'rounded-full px-2.5 py-1 transition-colors duration-300',
                isCompleted ? 'bg-[#FF8C00]/15' : 'bg-white/[0.06]',
              )}
            >
              <button
                type="button"
                onClick={() => onChange(i)}
                className="flex items-center gap-1.5 focus:outline-none"
                aria-label={`Ga naar ${step.name}`}
                aria-current={isCurrent ? 'step' : undefined}
              >
                <motion.span
                  initial={false}
                  animate={{ scale: isCurrent ? 1.15 : 1 }}
                  className={cn(
                    'flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-mono',
                    isCompleted && 'bg-[#FF8C00] text-white',
                    isCurrent && 'bg-[#FF8C00]/80 text-white',
                    !isCompleted && !isCurrent && 'bg-white/10 text-white/60',
                  )}
                >
                  {isCompleted ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : i + 1}
                </motion.span>
                <span
                  className={cn(
                    'font-mono text-[0.6rem] uppercase tracking-[0.18em] hidden sm:inline',
                    isCurrent ? 'text-[#FF8C00]' : 'text-white/55',
                  )}
                >
                  {step.name}
                </span>
              </button>
            </motion.li>
          );
        })}
      </ol>
    </nav>
  );
}

export function FeatureCarousel({
  steps,
  interval = 4500,
  compact = false,
  className,
  idPrefix = 'feature-carousel',
}: FeatureCarouselProps) {
  const { current, setIndex } = useNumberCycler(steps.length, interval);
  const step = steps[current];

  // Mouse-tracking voor subtiel parallax-glow effect (desktop only)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (compact) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      onMouseMove={onMouseMove}
      style={
        {
          '--x': useMotionTemplate`${mouseX}px`,
          '--y': useMotionTemplate`${mouseY}px`,
        } as WrapperStyle
      }
      className={cn(
        'group relative w-full overflow-hidden rounded-2xl lg:rounded-3xl',
        'border border-white/[0.08]',
        'bg-gradient-to-br from-[#0E0E0E]/95 via-[#0A0A0A]/95 to-[#1A0A02]/95',
        className,
      )}
    >
      {/* Ambient orange glow that follows cursor (desktop only) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 lg:opacity-100 transition-opacity"
        style={{
          background:
            'radial-gradient(400px circle at var(--x) var(--y), rgba(255,140,0,0.10), transparent 70%)',
        }}
      />

      {/* Top — step pills */}
      <div className={cn('relative z-10', compact ? 'pt-3' : 'pt-6 lg:pt-8')}>
        <StepPills steps={steps} current={current} onChange={setIndex} />
      </div>

      {/* Image area */}
      <div
        className={cn(
          'relative w-full overflow-hidden',
          compact ? 'h-[200px] mt-2' : 'h-[280px] lg:h-[420px] mt-4 lg:mt-6',
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${idPrefix}-img-${step.id}`}
            initial={imageVariants.initial}
            animate={imageVariants.animate}
            exit={imageVariants.exit}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={step.image}
              alt={step.alt}
              fill
              priority={current === 0}
              sizes={compact ? '100vw' : '(max-width: 1024px) 100vw, 70vw'}
              className="object-contain object-center select-none"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom — title + description */}
      <div
        className={cn(
          'relative z-10 text-center',
          compact ? 'px-5 pb-5 pt-2' : 'px-8 lg:px-12 pb-8 lg:pb-10 pt-4 lg:pt-6',
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${idPrefix}-text-${step.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3
              className={cn(
                'font-display text-white uppercase tracking-[-0.02em] mb-1.5',
                compact ? 'text-base' : 'text-2xl lg:text-3xl',
              )}
            >
              {step.title}
            </h3>
            <p
              className={cn(
                'font-body text-white/55 mx-auto',
                compact ? 'text-[0.78rem] leading-snug max-w-xs' : 'text-sm lg:text-base leading-relaxed max-w-md',
              )}
            >
              {step.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
