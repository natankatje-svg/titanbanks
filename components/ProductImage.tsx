import Image, { type ImageProps } from 'next/image';
import { type CSSProperties } from 'react';

type Treatment = 'auto' | 'mask-radial' | 'flat' | 'glow';

interface ProductImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  /**
   * Visual treatment voor product-PNGs met onbekende/witte achtergrond:
   * - 'mask-radial': zachte radial mask voor white-bg PNGs (default voor /images/product-*)
   * - 'glow': warme oranje rim-light achter het product
   * - 'flat': geen treatment (voor reeds-zwart of WebP-bestanden)
   * - 'auto': kies op basis van src
   */
  treatment?: Treatment;
  /** Plaats een warme floor-glow onder het product */
  floorGlow?: boolean;
  containerClassName?: string;
  containerStyle?: CSSProperties;
}

const MASK_RADIAL =
  'radial-gradient(ellipse 90% 88% at 50% 48%, black 38%, rgba(0,0,0,0.85) 56%, rgba(0,0,0,0.3) 70%, transparent 84%)';

function inferTreatment(src: string): Treatment {
  // /images/product-* zijn de OEM white-bg PNG's — masken
  if (/\/images\/product-/.test(src)) return 'mask-radial';
  // /images/titanx/ bevat hero-shots, deels al rim-lit
  if (/\/images\/titanx\//.test(src)) return 'mask-radial';
  return 'flat';
}

/**
 * Centrale wrapper rond next/image die white-bg OEM-PNG's
 * cinematic-zwart maakt via mask + optionele warme glow.
 *
 * Bij vervanging door Higgsfield-gegenereerde black-on-black shots
 * kan treatment='flat' worden gebruikt, geen verdere veranderingen nodig.
 */
export default function ProductImage({
  src,
  treatment = 'auto',
  floorGlow = false,
  className,
  containerClassName,
  containerStyle,
  ...rest
}: ProductImageProps) {
  const resolved: Treatment = treatment === 'auto' ? inferTreatment(src) : treatment;

  const maskStyle =
    resolved === 'mask-radial'
      ? {
          WebkitMaskImage: MASK_RADIAL,
          maskImage: MASK_RADIAL,
        }
      : undefined;

  return (
    <div
      className={['relative inline-block', containerClassName].filter(Boolean).join(' ')}
      style={containerStyle}
    >
      {resolved === 'glow' && (
        <div
          aria-hidden
          className="absolute inset-[5%] rounded-full blur-3xl pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 55%, rgba(255,140,0,0.18) 0%, rgba(255,140,0,0.06) 50%, transparent 75%)',
          }}
        />
      )}

      <div className="relative z-10" style={maskStyle}>
        <Image
          src={src}
          className={className}
          {...rest}
        />
      </div>

      {floorGlow && (
        <div
          aria-hidden
          className="absolute bottom-2 left-1/2 -translate-x-1/2 h-8 blur-2xl pointer-events-none"
          style={{ width: '55%', background: 'rgba(255,140,0,0.20)' }}
        />
      )}
    </div>
  );
}
