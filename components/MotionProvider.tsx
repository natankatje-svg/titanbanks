'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Globale Framer-Motion-config. `reducedMotion="user"` laat élke motion-component
 * de OS-instelling "verminder beweging" respecteren: transform- en layout-
 * animaties (slide/scale/parallax) worden uitgezet, opacity-fades blijven subtiel
 * behouden. Vervangt de noodzaak om in elke component los `useReducedMotion()` te
 * gaten — dekt hero, FAQ, sticky bar, mobiel menu, contactform, etc. in één keer.
 * CSS-keyframe-animaties worden apart afgevangen in globals.css.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
