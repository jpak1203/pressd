import { useEffect, useState } from 'react'
import { fetchAverageRatings } from '@/features/detail/api/detailApi'

export const useItemAverageRating = (
    type: 'track' | 'album',
    id: string | undefined
) => {
    const [averageRating, setAverageRating] = useState<number | null>(null)

    useEffect(() => {
        if (!id) return
        fetchAverageRatings([{ type, id }])
            .then((map) => setAverageRating(map.get(`${type}:${id}`) ?? null))
            .catch(() => {})
    }, [type, id])

    return averageRating
}
