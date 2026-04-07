import { useCallback, useEffect, useState } from 'react'
import { fetchAverageRatings } from '@/features/detail/api/detailApi'

export const useItemAverageRating = (
    type: 'track' | 'album',
    id: string | undefined
) => {
    const [averageRating, setAverageRating] = useState<number | null>(null)

    const refetch = useCallback(() => {
        if (!id) return
        fetchAverageRatings([{ type, id }])
            .then((map) => setAverageRating(map.get(`${type}:${id}`) ?? null))
            .catch((err: unknown) => console.warn('Failed to fetch average rating:', err))
    }, [type, id])

    useEffect(() => {
        refetch()
    }, [refetch])

    return { averageRating, refetch }
}
