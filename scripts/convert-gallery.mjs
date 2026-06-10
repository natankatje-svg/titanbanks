// Eenmalige conversie: goedgekeurde launch-set raws -> public/images/titanx/gallery/*.webp
// Bron: outputs/social/instagram/2026-06-03_launch_set/_hybrid/final (incl. "Goede images")
// 1536px breed behouden (native), webp q80 — next/image doet per-device downscaling.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const SRC = path.resolve('outputs/social/instagram/2026-06-03_launch_set/_hybrid/final');
const GOEDE = path.join(SRC, 'Goede images');
const OUT = path.resolve('public/images/titanx/gallery');
mkdirSync(OUT, { recursive: true });

const MAP = [
  [path.join(SRC, 'L09_life_car.png'), 'road-trips.webp'],
  [path.join(GOEDE, 'L07_life_backpack.png'), 'outdoor.webp'],
  [path.join(SRC, 'L04_life_camp.png'), 'festivals.webp'],
  [path.join(SRC, 'L01_life_desk.png'), 'creators.webp'],
  [path.join(SRC, 'L02_life_cafe.png'), 'werk.webp'],
  [path.join(SRC, 'L05_life_nightstand.png'), 'nood.webp'],
  [path.join(GOEDE, 'S10_studio_orangegel.png'), 'stage-orangegel.webp'],
  [path.join(GOEDE, 'S09_studio_gobo.png'), 'stage-gobo.webp'],
  [path.join(GOEDE, 'E03_energy_beam.png'), 'final-beam.webp'],
  [path.join(GOEDE, 'S12_studio_ports_dark.png'), 'ports-dark.webp'],
];

for (const [src, name] of MAP) {
  const out = path.join(OUT, name);
  const info = await sharp(src).resize({ width: 1536, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);
  console.log(name, Math.round(info.size / 1024) + 'KB', info.width + 'x' + info.height);
}
