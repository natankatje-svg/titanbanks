/**
 * EmberDrift — subtiele, zwevende oranje vonkjes als hero-overlay.
 *
 * CSS-only (keyframe `emberRise` in globals.css) → goedkoop, GPU-composited,
 * en respecteert prefers-reduced-motion (zie globals). Bewust géén SVG-stripes
 * meer: dit blijft links-begrensd door de container die de hero meegeeft, zodat
 * de elementen NIET over de powerbank (rechts) heen lopen.
 *
 * Deterministische posities (geen Math.random) → geen hydration-mismatch.
 */

type P = { left: number; top: number; size: number; dur: number; delay: number; drift: number };

// ~30 vonkjes, verspreid over het linker-veld — energieker, fellere sparks.
const PARTICLES: P[] = [
  { left: 6, top: 70, size: 5, dur: 7.5, delay: 0.0, drift: 16 },
  { left: 12, top: 40, size: 3, dur: 9, delay: 1.4, drift: -12 },
  { left: 18, top: 82, size: 6, dur: 6.8, delay: 2.2, drift: 20 },
  { left: 9, top: 55, size: 2, dur: 10, delay: 3.1, drift: 10 },
  { left: 24, top: 30, size: 4, dur: 8.5, delay: 0.8, drift: -16 },
  { left: 30, top: 66, size: 5, dur: 7.2, delay: 2.7, drift: 14 },
  { left: 21, top: 48, size: 2, dur: 11, delay: 4.0, drift: -9 },
  { left: 36, top: 78, size: 6, dur: 6.5, delay: 1.1, drift: 18 },
  { left: 15, top: 22, size: 3, dur: 10.5, delay: 5.2, drift: 12 },
  { left: 42, top: 58, size: 4, dur: 8, delay: 3.6, drift: -14 },
  { left: 33, top: 38, size: 2, dur: 9.5, delay: 1.9, drift: 10 },
  { left: 48, top: 72, size: 5, dur: 7.4, delay: 4.6, drift: 16 },
  { left: 27, top: 88, size: 4, dur: 7, delay: 0.4, drift: -11 },
  { left: 4, top: 34, size: 3, dur: 10.2, delay: 2.4, drift: 13 },
  { left: 39, top: 26, size: 2, dur: 10.8, delay: 5.8, drift: -10 },
  { left: 45, top: 44, size: 4, dur: 8.8, delay: 3.0, drift: 12 },
  { left: 2, top: 60, size: 3, dur: 9.2, delay: 1.2, drift: 9 },
  { left: 10, top: 90, size: 5, dur: 6.6, delay: 4.2, drift: 17 },
  { left: 16, top: 64, size: 2, dur: 11.5, delay: 2.0, drift: -8 },
  { left: 22, top: 14, size: 3, dur: 10.0, delay: 6.4, drift: 11 },
  { left: 28, top: 52, size: 4, dur: 7.8, delay: 0.9, drift: -13 },
  { left: 34, top: 86, size: 6, dur: 6.4, delay: 3.4, drift: 19 },
  { left: 40, top: 70, size: 3, dur: 9.0, delay: 5.0, drift: 12 },
  { left: 46, top: 32, size: 2, dur: 11.2, delay: 2.6, drift: -9 },
  { left: 51, top: 56, size: 4, dur: 8.2, delay: 1.7, drift: 14 },
  { left: 7, top: 46, size: 2, dur: 10.6, delay: 4.8, drift: 8 },
  { left: 13, top: 76, size: 4, dur: 7.6, delay: 2.9, drift: -15 },
  { left: 19, top: 36, size: 3, dur: 9.4, delay: 6.0, drift: 11 },
  { left: 31, top: 20, size: 2, dur: 10.4, delay: 3.8, drift: -10 },
  { left: 43, top: 84, size: 5, dur: 6.9, delay: 5.5, drift: 16 },
];

export default function EmberDrift({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`absolute inset-y-0 left-0 w-[56%] overflow-hidden pointer-events-none ${className}`}>
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="ember-particle"
          style={
            {
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              '--ember-dur': `${p.dur}s`,
              '--ember-delay': `${p.delay}s`,
              '--ember-drift': `${p.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
