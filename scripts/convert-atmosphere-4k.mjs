// Converteert de 4k-upscales van de sfeerbeelden naar scherpe webp's (2560w).
import sharp from 'sharp';
import { existsSync } from 'node:fs';

const names = process.argv.slice(2);
for (const n of names.length ? names : ['highway', 'festival', 'mountains', 'energy', 'weave']) {
  const src = 'public/images/atmosphere/' + n + '-4k.png';
  if (!existsSync(src)) {
    console.log(n, 'OVERGESLAGEN (geen 4k-bron)');
    continue;
  }
  const i = await sharp(src)
    .resize({ width: 2560, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile('public/images/atmosphere/' + n + '.webp');
  console.log(n + '.webp', Math.round(i.size / 1024) + 'KB', i.width + 'x' + i.height);
}
