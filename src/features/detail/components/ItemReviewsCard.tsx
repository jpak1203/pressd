import SectionCard from '@/features/detail/components/SectionCard'
import ReviewSection from '@/features/detail/components/ReviewSection'
import { useItemReviews } from '@/features/detail/hooks/useItemReviews'

type ItemReviewsCardProps = {
    type: 'track' | 'album'
    itemId: string
    // When set, the viewer's own reviews are excluded (they're shown in the
    // editable "your activity" section instead) and the card is labelled
    // "community reviews". Guests pass null/undefined and see every review.
    excludeProfileId?: string | null
}

export const ItemReviewsCard = ({
    type,
    itemId,
    excludeProfileId,
}: ItemReviewsCardProps) => {
    const { reviews } = useItemReviews(type, itemId, excludeProfileId)
    const label = excludeProfileId
        ? `community reviews (${reviews.length})`
        : `reviews (${reviews.length})`

    return (
        <SectionCard label={label}>
            <ReviewSection reviews={reviews} readOnly />
        </SectionCard>
    )
}
