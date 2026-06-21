import SectionCard from '@/features/detail/components/SectionCard'
import ReviewSection from '@/features/detail/components/ReviewSection'
import { useItemReviews } from '@/features/detail/hooks/useItemReviews'

type GuestReviewsCardProps = {
    type: 'track' | 'album'
    itemId: string
}

export const GuestReviewsCard = ({ type, itemId }: GuestReviewsCardProps) => {
    const { reviews } = useItemReviews(type, itemId)

    return (
        <SectionCard label={`reviews (${reviews.length})`}>
            <ReviewSection reviews={reviews} readOnly />
        </SectionCard>
    )
}
