import type { Metadata } from 'next';
import PageScaffold from '@/components/PageScaffold';
import Reviews from '@/components/Reviews';
import { BRAND } from '@/lib/product-claims';
import { totalReviews } from '@/lib/reviews';

export const metadata: Metadata = {
  title: `Reviews — ${BRAND.product} | ${BRAND.text}`,
  description: 'Wat eerste gebruikers van Titan X vinden.',
};

export default function ReviewsPage() {
  const count = totalReviews();
  const intro =
    count > 0
      ? `${count} verified-buyer review${count === 1 ? '' : 's'} van de eerste batch — geen verzonnen quotes.`
      : 'Verified-buyer reviews verschijnen hier na de eerste batch — geen verzonnen quotes, geen fake aggregate.';

  return (
    <PageScaffold title="Reviews" intro={intro}>
      {/* Reviews-component handelt zelf alle drie de staten af (empty pre-launch,
          empty post-launch, en gevulde grid). Hergebruik vermijdt drift met de
          homepage-versie. */}
      <Reviews />
    </PageScaffold>
  );
}
