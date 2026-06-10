// Dedicated OG-image 1200×630: donker canvas met subtiele oranje gloed,
// goedgekeurde productfoto (studio-orangegel, volledig zichtbaar) rechts en
// het witte logo links. Gebruik: node scripts/make-og-image.mjs
import sharp from 'sharp';

const W = 1200;
const H = 630;

const glow = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g" cx="72%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#FF8C00" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#080808" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#080808"/>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect x="0" y="${H - 3}" width="${W}" height="3" fill="#FF8C00"/>
</svg>`);

const corner = Buffer.from(
  '<svg width="560" height="560"><rect width="560" height="560" rx="28" ry="28" fill="#fff"/></svg>'
);
const product = await sharp('public/images/titanx/gallery/v2/studio-orangegel.webp')
  .resize(560, 560, { fit: 'inside' })
  .composite([{ input: corner, blend: 'dest-in' }])
  .png()
  .toBuffer();

const logo = await sharp('public/branding/logo-white-tight.png')
  .resize(430, null, { fit: 'inside' })
  .toBuffer();

const logoMeta = await sharp(logo).metadata();

await sharp(glow)
  .composite([
    { input: product, left: W - 560 - 60, top: Math.round((H - 560) / 2) },
    { input: logo, left: 80, top: Math.round(H / 2 - (logoMeta.height ?? 80) / 2) },
  ])
  .jpeg({ quality: 88 })
  .toFile('public/images/og-image.jpg');

console.log('OK -> public/images/og-image.jpg');
