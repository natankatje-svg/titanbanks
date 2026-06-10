import type { ReactNode } from 'react';

/**
 * Kicker — het vaste mono-label boven elke sectiekop. Eén bron voor maat,
 * tracking en accentkleur zodat alle secties hetzelfde ritme houden.
 */
export default function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[0.64rem] uppercase tracking-[0.24em] text-titan-accent">
      {children}
    </span>
  );
}
