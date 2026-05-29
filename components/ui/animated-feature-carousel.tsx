'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useState,
  type MouseEvent,
} from 'react';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  type MotionStyle,
  type MotionValue,
  type Variants,
} from 'framer-motion';

import { cn } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────

type WrapperStyle = MotionStyle & {
  '--x': MotionValue<string>;
  '--y': MotionValue<string>;
};

export interface ImageSet {
  step1img1: string;
  step1img2: string;
  step2img1: string;
  step2img2: string;
  step3img: string;
  step4img: string;
  alt: string;
}

export interface Step {
  id: string;
  name: string;
  title: string;
  description: string;
}

export interface FeatureCarouselProps {
  /** Step-content (4 stappen vereist) — eyebrow, title, description per step. */
  steps: readonly Step[];
  /** Image set met 6 srcs (steps 1+2 hebben 2 imgs, steps 3+4 hebben 1 img). */
  image: ImageSet;
  /** Auto-cycle interval (ms). Default 5000. */
  interval?: number;
  /** className override op outer wrapper. */
  className?: string;
  /** Image position-className overrides per stap (vervangen de defaults). */
  step1img1Class?: string;
  step1img2Class?: string;
  step2img1Class?: string;
  step2img2Class?: string;
  step3imgClass?: string;
  step4imgClass?: string;
}

interface StepImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

interface AnimatedStepImageProps extends StepImageProps {
  preset?: AnimationPreset;
  delay?: number;
}

// ─── Animation presets ─────────────────────────────────────────────────────

const ANIMATION_PRESETS = {
  fadeInScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { type: 'spring', stiffness: 300, damping: 25, mass: 0.5 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { type: 'spring', stiffness: 300, damping: 25, mass: 0.5 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { type: 'spring', stiffness: 300, damping: 25, mass: 0.5 },
  },
} as const;

type AnimationPreset = keyof typeof ANIMATION_PRESETS;

// ─── Hooks ─────────────────────────────────────────────────────────────────

function useNumberCycler(totalSteps: number, interval: number) {
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setCurrentNumber((prev) => (prev + 1) % totalSteps);
    }, interval);
    return () => clearTimeout(timerId);
  }, [currentNumber, totalSteps, interval]);

  const setStep = useCallback(
    (stepIndex: number) => setCurrentNumber(stepIndex % totalSteps),
    [totalSteps],
  );

  return { currentNumber, setStep };
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  return isMobile;
}

// ─── Icon ──────────────────────────────────────────────────────────────────

function IconCheck({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <path d="m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z" />
    </svg>
  );
}

const stepVariants: Variants = {
  inactive: { scale: 0.92, opacity: 0.65 },
  active: { scale: 1, opacity: 1 },
};

// ─── Step image ────────────────────────────────────────────────────────────

const StepImage = forwardRef<HTMLImageElement, StepImageProps>(
  ({ src, alt, className, style, ...props }, ref) => {
    return (
      <img
        ref={ref}
        alt={alt}
        className={className}
        src={src}
        style={{ position: 'absolute', userSelect: 'none', maxWidth: 'unset', ...style }}
        {...props}
      />
    );
  },
);
StepImage.displayName = 'StepImage';

const MotionStepImage = motion(StepImage);

const AnimatedStepImage = ({
  preset = 'fadeInScale',
  delay = 0,
  ...props
}: AnimatedStepImageProps) => {
  const presetConfig = ANIMATION_PRESETS[preset];
  return (
    <MotionStepImage
      {...props}
      {...presetConfig}
      transition={{ ...presetConfig.transition, delay }}
    />
  );
};

// ─── Feature card (text + images container) ───────────────────────────────

function FeatureCard({
  children,
  step,
  steps,
}: {
  children: React.ReactNode;
  step: number;
  steps: readonly Step[];
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isMobile = useIsMobile();

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (isMobile) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className="animated-cards group relative w-full rounded-2xl"
      onMouseMove={handleMouseMove}
      style={
        {
          '--x': useMotionTemplate`${mouseX}px`,
          '--y': useMotionTemplate`${mouseY}px`,
        } as WrapperStyle
      }
    >
      {/* Cursor-tracked ambient glow (desktop) */}
      <div
        className="pointer-events-none absolute inset-0 hidden md:block opacity-100 rounded-3xl"
        style={{
          background:
            'radial-gradient(380px circle at var(--x) var(--y), rgba(255,107,0,0.12), transparent 70%)',
        }}
      />

      <div className="relative w-full overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[#0E0E0E]/95 via-[#0A0A0A]/95 to-[#1A0A02]/95 transition-colors duration-300">
        <div className="m-6 lg:m-10 min-h-[420px] lg:min-h-[460px] w-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              className="relative z-10 flex w-full flex-col gap-3 md:w-3/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="font-mono text-[0.65rem] uppercase tracking-[0.3em]"
                style={{ color: '#FF6B00' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {steps[step].name}
              </motion.div>
              <motion.h3
                className="font-display text-white uppercase tracking-[-0.02em] leading-[1.05] text-2xl md:text-3xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {steps[step].title}
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-body text-sm md:text-base leading-relaxed text-white/55">
                  {steps[step].description}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          {children}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Steps nav (pills onder de card) ──────────────────────────────────────

function StepsNav({
  steps: stepItems,
  current,
  onChange,
}: {
  steps: readonly Step[];
  current: number;
  onChange: (index: number) => void;
}) {
  return (
    <nav aria-label="Progress" className="flex justify-center px-4">
      <ol className="flex w-full flex-wrap items-center justify-center gap-2" role="list">
        {stepItems.map((step, stepIdx) => {
          const isCompleted = current > stepIdx;
          const isCurrent = current === stepIdx;
          return (
            <motion.li
              key={step.id}
              initial="inactive"
              animate={isCurrent ? 'active' : 'inactive'}
              variants={stepVariants}
              transition={{ duration: 0.3 }}
            >
              <button
                type="button"
                className={cn(
                  'group flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF6B00] focus-visible:ring-offset-black',
                  isCurrent
                    ? 'bg-[#FF6B00] text-white'
                    : 'bg-white/[0.06] text-white/65 hover:bg-white/[0.10] hover:text-white',
                )}
                onClick={() => onChange(stepIdx)}
                aria-current={isCurrent ? 'step' : undefined}
              >
                <span
                  className={cn(
                    'flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-all duration-300 text-[10px] font-mono',
                    isCompleted
                      ? 'bg-[#FF6B00] text-white'
                      : isCurrent
                      ? 'bg-white/20 text-white'
                      : 'bg-white/10 text-white/65 group-hover:bg-white/20',
                  )}
                >
                  {isCompleted ? <IconCheck className="h-3 w-3" /> : <span>{stepIdx + 1}</span>}
                </span>
                <span className="hidden sm:inline-block font-mono text-[0.65rem] uppercase tracking-[0.2em]">
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

// ─── Default image positioning classes ─────────────────────────────────────

const defaultClasses = {
  img: 'rounded-xl border border-white/[0.08] shadow-2xl shadow-black/40 object-cover',
  step1img1: 'w-[44%] left-[2%] top-[25%]',
  step1img2: 'w-[52%] left-[45%] top-[12%]',
  step2img1: 'w-[48%] left-[3%] top-[20%]',
  step2img2: 'w-[44%] left-[52%] top-[35%]',
  step3img: 'w-[88%] left-[6%] top-[18%]',
  step4img: 'w-[88%] left-[6%] top-[18%]',
} as const;

// ─── Main component ───────────────────────────────────────────────────────

export function FeatureCarousel({
  steps,
  image,
  interval = 5000,
  className,
  step1img1Class = defaultClasses.step1img1,
  step1img2Class = defaultClasses.step1img2,
  step2img1Class = defaultClasses.step2img1,
  step2img2Class = defaultClasses.step2img2,
  step3imgClass = defaultClasses.step3img,
  step4imgClass = defaultClasses.step4img,
}: FeatureCarouselProps) {
  const { currentNumber: step, setStep } = useNumberCycler(steps.length, interval);

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="relative w-full h-full">
            <AnimatedStepImage
              alt={image.alt}
              className={cn(defaultClasses.img, step1img1Class)}
              src={image.step1img1}
              preset="slideInLeft"
            />
            <AnimatedStepImage
              alt={image.alt}
              className={cn(defaultClasses.img, step1img2Class)}
              src={image.step1img2}
              preset="slideInRight"
              delay={0.1}
            />
          </div>
        );
      case 1:
        return (
          <div className="relative w-full h-full">
            <AnimatedStepImage
              alt={image.alt}
              className={cn(defaultClasses.img, step2img1Class)}
              src={image.step2img1}
              preset="fadeInScale"
            />
            <AnimatedStepImage
              alt={image.alt}
              className={cn(defaultClasses.img, step2img2Class)}
              src={image.step2img2}
              preset="fadeInScale"
              delay={0.1}
            />
          </div>
        );
      case 2:
        return (
          <AnimatedStepImage
            alt={image.alt}
            className={cn(defaultClasses.img, step3imgClass)}
            src={image.step3img}
            preset="fadeInScale"
          />
        );
      case 3:
        return (
          <AnimatedStepImage
            alt={image.alt}
            className={cn(defaultClasses.img, step4imgClass)}
            src={image.step4img}
            preset="fadeInScale"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn('flex flex-col gap-8 lg:gap-12 w-full max-w-4xl mx-auto p-4', className)}>
      <FeatureCard step={step} steps={steps}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            {...ANIMATION_PRESETS.fadeInScale}
            className="w-full h-full absolute inset-0"
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </FeatureCard>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <StepsNav current={step} onChange={setStep} steps={steps} />
      </motion.div>
    </div>
  );
}
