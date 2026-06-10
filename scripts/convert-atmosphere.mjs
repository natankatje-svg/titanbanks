// Converteert de gegenereerde sfeerbeelden (productloos) naar webp.
import sharp from 'sharp';

for (const n of ['highway', 'festival', 'mountains', 'energy', 'weave']) {
  const i = await sharp('public/images/atmosphere/' + n + '.png')
    .webp({ quality: 82 })
    .toFile('public/images/atmosphere/' + n + '.webp');
  console.log(n + '.webp', Math.round(i.size / 1024) + 'KB', i.width + 'x' + i.height);
}
