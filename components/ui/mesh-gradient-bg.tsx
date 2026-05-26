'use client';

import { MeshGradient } from '@paper-design/shaders-react';

/**
 * MeshGradientBg — WebGL-gerenderde animated mesh gradient als hero background.
 *
 * Puur achtergrond-laag zonder eigen content; bedoeld als Layer 0 in HeroVariantB.
 * Kleuren: TitanBanks brand palette — bijna-zwart, brand-oranje, teal, donker-teal.
 *
 * Twee lagen:
 *  1. Solide mesh — vloeiende kleurovergang op laag-medium snelheid
 *  2. Wireframe overlay — subtle grid op lagere opacity voor diepte
 */
export function MeshGradientBg() {
  return (
    /* Wrapper op opacity 0.55 — gradient is subtiel, fungeert als
       warm ambient licht achter de FloatingPaths, niet als hoofdelement. */
    <div className="absolute inset-0 w-full h-full" style={{ opacity: 0.55 }}>
      {/* Laag A — puur warm-oranje gradient, geen teal/blauw */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={[
          '#050505', // bijna-zwart brand bg
          '#FF6B00', // brand oranje
          '#7A3000', // gebrand donker-oranje
          '#1C0800', // bijna-zwart met oranje ondertoon
          '#3D1600', // donker amber
        ]}
        speed={0.2}
        backgroundColor="#050505"
      />

      {/* Laag B — wireframe overlay, puur oranje tint, lage opacity */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.12 }}
        colors={[
          '#050505',
          '#FF8C00',
          '#FF6B00',
          '#5C2200',
        ]}
        speed={0.12}
        wireframe
        backgroundColor="transparent"
      />
    </div>
  );
}
