import { useCallback, useEffect, useState } from 'react'
import { fetchItemStats, type ItemStats } from '@/features/detail/api/detailApi'

const EMPTY_STATS: ItemStats = {
    average: null,
    ratingCount: 0,
    likeCount: 0,
}

// Guest-visible aggregate stats (average rating, rating count, like count) for a
// track or album. `refetch` is passed to usePersistInteractions so the numbers
// refresh after the logged-in user rates or likes the item.
export const useItemStats = (type: 'track' | 'album', id: string | undefined) => {
    const [stats, setStats] = useState<ItemStats>(EMPTY_STATS)

    const refetch = useCallback(() => {
        if (!id) return
        fetchItemStats(type, id)
            .then(setStats)
            .catch((err: unknown) =>
                console.warn('Failed to fetch item stats:', err)
            )
    }, [type, id])

    useEffect(() => {
        refetch()
    }, [refetch])

    return { stats, refetch }
}
