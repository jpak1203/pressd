import { useCallback, useState } from 'react'
import type { ItemInteraction, Review } from '@/features/detail/types/detail'

const STORAGE_KEY = 'pressd_interactions'

const getStorageData = (): Record<string, ItemInteraction> => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? (JSON.parse(raw) as Record<string, ItemInteraction>) : {}
    } catch {
        return {}
    }
}

const setStorageData = (data: Record<string, ItemInteraction>): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

const defaultInteraction: ItemInteraction = {
    rating: null,
    liked: false,
    listened: false,
    wantToListen: false,
    reviews: [],
    logEntries: [],
}

export const useDetailInteractions = (itemKey: string) => {
    const [interactions, setInteractions] = useState<ItemInteraction>(() => {
        const data = getStorageData()
        return data[itemKey] ?? { ...defaultInteraction }
    })

    const persist = useCallback(
        (updated: ItemInteraction) => {
            const data = getStorageData()
            data[itemKey] = updated
            setStorageData(data)
            setInteractions(updated)
        },
        [itemKey]
    )

    const setRating = useCallback(
        (rating: number | null) =>
            persist({
                ...interactions,
                rating,
                ...(rating !== null
                    ? { listened: true, wantToListen: false }
                    : {}),
            }),
        [interactions, persist]
    )

    const toggleLike = useCallback(
        () => persist({ ...interactions, liked: !interactions.liked }),
        [interactions, persist]
    )

    const toggleListened = useCallback(() => {
        const listened = !interactions.listened
        persist({
            ...interactions,
            listened,
            wantToListen: listened ? false : interactions.wantToListen,
        })
    }, [interactions, persist])

    const toggleWantToListen = useCallback(() => {
        const wantToListen = !interactions.wantToListen
        persist({
            ...interactions,
            wantToListen,
            listened: wantToListen ? false : interactions.listened,
        })
    }, [interactions, persist])

    const addReview = useCallback(
        (text: string, rating: number | null) => {
            const newReview: Review = {
                id: crypto.randomUUID(),
                text,
                rating,
                date: new Date().toISOString(),
            }
            persist({
                ...interactions,
                reviews: [newReview, ...interactions.reviews],
            })
        },
        [interactions, persist]
    )

    const removeReview = useCallback(
        (reviewId: string) => {
            persist({
                ...interactions,
                reviews: interactions.reviews.filter((r) => r.id !== reviewId),
            })
        },
        [interactions, persist]
    )

    return {
        interactions,
        setRating,
        toggleLike,
        toggleListened,
        toggleWantToListen,
        addReview,
        removeReview,
    }
}
