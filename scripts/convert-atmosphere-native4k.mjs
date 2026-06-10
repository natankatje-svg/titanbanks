// Native-4k sfeerbeelden (5504x3072) -> scherpe webp's op 3072px breed.
import sharp from 'sharp';

const names = process.argv.slice(2);
for (const n of names) {
  const i = await sharp('public/images/atmosphere/' + n + '-src.png')
    .resize({ width: 3072, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile('public/images/atmosphere/' + n + '.webp');
  console.log(n + '.webp', Math.round(i.size / 1024) + 'KB', i.width + 'x' + i.height);
}
