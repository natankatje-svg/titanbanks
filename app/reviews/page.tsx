import type { Metadata } from 'next';
import PageScaffold from '@/components/PageScaffold';
import { BRAND, LAUNCH_STATE } from '@/lib/product-claims';

export const metadata: Metadata = {
  title: `Reviews — ${BRAND.product} | ${BRAND.text}`,
  description: 'Wat eerste gebruikers van Titan X vinden.',
};

export default function ReviewsPage() {
  return (
    <PageScaffold
      title="Reviews"
      intro={
        LAUNCH_STATE.isPreLaunch
          ? 'Titan X is nog pre-launch. Echte reviews verschijnen hier na de eerste batch.'
          : 'Wat eerste gebruikers van Titan X vinden.'
      }
    />
  );
}
