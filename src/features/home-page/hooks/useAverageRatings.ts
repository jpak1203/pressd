import { useEffect, useState } from 'react'
import type { ItemDetail } from '@/features/detail/types/detail'
import { fetchAverageRatings } from '@/features/detail/api/detailApi'

export const useAverageRatings = (items: ItemDetail[]) => {
    const [ratings, setRatings] = useState<Map<string, number>>(new Map())

    useEffect(() => {
        const ratable = items
            .filter(
                (i): i is Exclude<ItemDetail, { type: 'artist' }> =>
                    i.type !== 'artist'
            )
            .map((i) => ({ type: i.type as 'track' | 'album', id: i.id }))

        if (ratable.length === 0) return

        fetchAverageRatings(ratable)
            .then(setRatings)
            .catch(() => {})
    }, [items])

    return ratings
}
