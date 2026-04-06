import { useEffect, useState } from 'react'
import type { ItemDetail } from '@/features/detail/types/detail'
import { fetchAverageRatings } from '@/features/detail/api/detailApi'

export const useAverageRatings = (items: ItemDetail[]) => {
    const [ratings, setRatings] = useState<Map<string, number>>(new Map())
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const ratable = items
            .filter(
                (i): i is Exclude<ItemDetail, { type: 'artist' }> =>
                    i.type !== 'artist'
            )
            .map((i) => ({ type: i.type as 'track' | 'album', id: i.id }))

        if (ratable.length === 0) {
            setIsLoading(false)
            return
        }

        setIsLoading(true)
        fetchAverageRatings(ratable)
            .then((map) => {
                setRatings(map)
                setIsLoading(false)
            })
            .catch((err: unknown) => {
                console.warn('Failed to fetch average ratings:', err)
                setIsLoading(false)
            })
    }, [items])

    return { ratings, isLoading }
}
