// =============================================
// Power Calculator — Device-capaciteiten
// =============================================
// mAh-waarden zijn publieke battery specs van de fabrikant of dpreview/iFixit.
// We hanteren een conservatieve efficiency-factor voor Titan X-output
// (zie EFFICIENCY constante). Output toont aantal volledige laadbeurten.

import { SPECS } from './product-claims';

export interface CalculatorDevice {
  id: string;
  category: 'phone' | 'tablet' | 'laptop' | 'audio' | 'camera' | 'wearable' | 'other';
  label: string;
  /** Batterijcapaciteit in mAh @ 3.7V equivalent. Laptops zijn in mAh @ ~11.4V genormaliseerd naar 3.7V. */
  capacityMah: number;
  /** Optioneel: link naar bron */
  source?: string;
}

export const DEVICES: CalculatorDevice[] = [
  // Phones (battery mAh ex.: gsmarena / Apple specs)
  { id: 'iphone-15',      category: 'phone',   label: 'iPhone 15',                capacityMah: 3349 },
  { id: 'iphone-15-pro',  category: 'phone',   label: 'iPhone 15 Pro',            capacityMah: 3274 },
  { id: 'iphone-15-pro-max', category: 'phone', label: 'iPhone 15 Pro Max',       capacityMah: 4422 },
  { id: 'iphone-16',      category: 'phone',   label: 'iPhone 16',                capacityMah: 3561 },
  { id: 'iphone-16-pro-max', category: 'phone', label: 'iPhone 16 Pro Max',       capacityMah: 4685 },
  { id: 'pixel-8',        category: 'phone',   label: 'Google Pixel 8',           capacityMah: 4575 },
  { id: 'samsung-s24',    category: 'phone',   label: 'Samsung Galaxy S24',       capacityMah: 4000 },
  { id: 'samsung-s24-ultra', category: 'phone', label: 'Samsung Galaxy S24 Ultra', capacityMah: 5000 },

  // Tablets
  { id: 'ipad-air-11',    category: 'tablet',  label: 'iPad Air 11" (M2)',        capacityMah: 7606 },
  { id: 'ipad-pro-11',    category: 'tablet',  label: 'iPad Pro 11" (M4)',        capacityMah: 8160 },
  { id: 'ipad-pro-13',    category: 'tablet',  label: 'iPad Pro 13" (M4)',        capacityMah: 10290 },

  // Laptops (genormaliseerd naar 3.7V equivalent: Wh × 1000 / 3.7)
  // MacBook Air 13" M3 = 52.6 Wh ≈ 14.216 mAh
  { id: 'macbook-air-13', category: 'laptop',  label: 'MacBook Air 13" (M3)',     capacityMah: 14216 },
  { id: 'macbook-pro-14', category: 'laptop',  label: 'MacBook Pro 14" (M3)',     capacityMah: 19324 },
  // Dell XPS 13 = 51 Wh ≈ 13.784 mAh
  { id: 'dell-xps-13',    category: 'laptop',  label: 'Dell XPS 13',              capacityMah: 13784 },

  // Audio
  { id: 'airpods-pro-2',  category: 'audio',   label: 'AirPods Pro 2 (case)',     capacityMah: 519 },
  { id: 'airpods-max',    category: 'audio',   label: 'AirPods Max',              capacityMah: 1133 },
  { id: 'sony-1000xm5',   category: 'audio',   label: 'Sony WH-1000XM5',          capacityMah: 1200 },

  // Cameras / Action
  { id: 'gopro-hero-12',  category: 'camera',  label: 'GoPro Hero 12',            capacityMah: 1720 },
  { id: 'sony-a7-iv',     category: 'camera',  label: 'Sony α7 IV (NP-FZ100)',    capacityMah: 2280 },
  { id: 'dji-mini-4-pro', category: 'camera',  label: 'DJI Mini 4 Pro (battery)', capacityMah: 2590 },

  // Wearables
  { id: 'apple-watch-9',  category: 'wearable', label: 'Apple Watch Series 9',    capacityMah: 308 },
  { id: 'garmin-fenix-7', category: 'wearable', label: 'Garmin Fenix 7',          capacityMah: 510 },

  // Other
  { id: 'nintendo-switch', category: 'other',  label: 'Nintendo Switch',          capacityMah: 4310 },
  { id: 'steam-deck',     category: 'other',   label: 'Steam Deck',               capacityMah: 11800 },
  { id: 'kindle',         category: 'other',   label: 'Kindle Paperwhite',        capacityMah: 1700 },
];

/**
 * Conservatieve efficiency-factor voor energieverlies (heat, voltage conversion,
 * charging circuitry). Industriestandaard: 65–75% voor consumer power banks.
 * We gebruiken 70% en disclaimer eronder.
 */
export const EFFICIENCY = 0.7;

/** Beschikbare mAh-capaciteit voor output, na efficiency-verlies. */
export const TITAN_X_USABLE_MAH = Math.floor(SPECS.capacityMah.value * EFFICIENCY);

export interface CalculationResult {
  /** Per-device aantal volledige laadbeurten */
  perDevice: Array<{ device: CalculatorDevice; charges: number }>;
  /** Totaal verbruikte mAh als alle devices één keer geladen worden */
  totalMahOnePass: number;
  /** Hoeveel keer kun je alle gekozen devices samen volledig laden? */
  combinedCycles: number;
  /** Resterende mAh na 1 combined cycle */
  remainingMahAfterOneCycle: number;
}

export function calculate(devices: CalculatorDevice[]): CalculationResult {
  if (devices.length === 0) {
    return {
      perDevice: [],
      totalMahOnePass: 0,
      combinedCycles: 0,
      remainingMahAfterOneCycle: TITAN_X_USABLE_MAH,
    };
  }

  const perDevice = devices.map((d) => ({
    device: d,
    charges: Math.floor(TITAN_X_USABLE_MAH / d.capacityMah),
  }));

  const totalMahOnePass = devices.reduce((sum, d) => sum + d.capacityMah, 0);
  const combinedCycles = Math.floor(TITAN_X_USABLE_MAH / totalMahOnePass);
  const remainingMahAfterOneCycle = TITAN_X_USABLE_MAH - totalMahOnePass;

  return { perDevice, totalMahOnePass, combinedCycles, remainingMahAfterOneCycle };
}

export const CATEGORY_LABELS: Record<CalculatorDevice['category'], string> = {
  phone: 'Smartphone',
  tablet: 'Tablet',
  laptop: 'Laptop',
  audio: 'Audio',
  camera: 'Camera',
  wearable: 'Wearable',
  other: 'Overig',
};
