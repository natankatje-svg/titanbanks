// Herontwerp v2: converteert ALLE goedgekeurde beelden uit "Goede images"
// naar web-ready webp in public/images/titanx/gallery/v2/ met genormaliseerde
// kebab-case namen. 1536px breed (native), q80 — next/image downscalet per device.
import sharp from 'sharp';
import { mkdirSync, readdirSync } from 'node:fs';
import path from 'node:path';

const SRC = path.resolve(
  'outputs/social/instagram/2026-06-03_launch_set/_hybrid/final/Goede images'
);
const OUT = path.resolve('public/images/titanx/gallery/v2');
mkdirSync(OUT, { recursive: true });

// Expliciete naam-mapping (voorspelbaar in code); onbekende files vallen terug
// op een geslugificeerde bestandsnaam zodat nieuwe toevoegingen niet breken.
const NAMES = {
  'E01_energy_aurora.png': 'energy-aurora',
  'E04_energy_embers.png': 'energy-embers',
  'E04_energy_halo.png': 'energy-halo',
  'L02_life_train.png': 'life-train',
  'L03_life_ledge.png': 'life-ledge',
  'L03_life_picnic.png': 'life-picnic',
  'L04_life_hotel.png': 'life-hotel',
  'L05_life_festival.png': 'life-festival',
  'L06_life_books.png': 'life-books',
  'L07_life_backpack.png': 'life-backpack',
  'L09_life_car.png': 'life-car',
  'L10_life_gym.png': 'life-gym',
  'S01_studio_marble.png': 'studio-marble',
  'S03_studio_slab.png': 'studio-slab',
  'S09_studio_gobo.png': 'studio-gobo',
  'S10_studio_frostedacrylic.png': 'studio-frostedacrylic',
  'S10_studio_orangegel.png': 'studio-orangegel',
  'S12_studio_ports_dark.png': 'studio-ports-dark',
};

const slug = (f) =>
  f.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const files = readdirSync(SRC).filter((f) => /\.(png|jpe?g)$/i.test(f));
console.log(files.length, 'bronbeelden gevonden');
for (const f of files) {
  // de losse Higgsfield-render krijgt een sprekende naam
  const name = NAMES[f] ?? (f.startsWith('hf_') ? 'cables-cinematic' : slug(f));
  const out = path.join(OUT, name + '.webp');
  const info = await sharp(path.join(SRC, f))
    .resize({ width: 1536, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(out);
  console.log(name + '.webp', Math.round(info.size / 1024) + 'KB', info.width + 'x' + info.height);
}
