import { useEffect, useState } from 'react'
import type { Review } from '@/features/detail/types/detail'
import { fetchReviewsForItem } from '@/features/profile/api/profileApi'

/**
 * Read-only access to reviews for an item, available to anyone (including
 * logged-out guests). Returns reviews newest-first in the shared `Review` shape.
 * Pass `excludeProfileId` to drop the viewer's own reviews — used on the detail
 * page so a signed-in user's editable reviews (rendered separately) aren't
 * duplicated in the community list.
 */
export const useItemReviews = (
    type: 'track' | 'album',
    spotifyId: string | undefined,
    excludeProfileId?: string | null
) => {
    const [reviews, setReviews] = useState<Review[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!spotifyId) return
        let active = true
        setIsLoading(true)
        fetchReviewsForItem(type, spotifyId)
            .then((rows) => {
                if (!active) return
                setReviews(
                    rows
                        .filter((r) =>
                            excludeProfileId
                                ? r.profile_id !== excludeProfileId
                                : true
                        )
                        .map((r) => ({
                            id: r.id,
                            text: r.body,
                            rating: r.rating,
                            date: r.created_at,
                        }))
                )
            })
            .catch(() => {
                if (active) setReviews([])
            })
            .finally(() => {
                if (active) setIsLoading(false)
            })
        return () => {
            active = false
        }
    }, [type, spotifyId, excludeProfileId])

    return { reviews, isLoading }
}
