import { useCallback } from 'react'
import type { ItemDetail } from '../types/detail'
import { useDetailInteractions } from './useDetailInteractions'
import {
    upsertRating,
    deleteRating,
    insertDiaryEntry,
} from '@/features/profile/api/profileApi'

const getItemMeta = (item: ItemDetail) => ({
    item_type: item.type as 'track' | 'album' | 'artist',
    spotify_id: item.id,
    name: item.name,
    image_url: item.image ?? null,
    artist_name:
        item.type !== 'artist' ? (item.artists[0]?.name ?? null) : null,
    release_date: item.type === 'artist' ? null : (item.release_date ?? null),
})

export const usePersistInteractions = (
    itemKey: string,
    item: ItemDetail | null,
    profileId: string | null
) => {
    const detail = useDetailInteractions(itemKey)

    const setRating = useCallback(
        (rating: number | null) => {
            detail.setRating(rating)
            if (!profileId || !item) return
            const meta = getItemMeta(item)
            if (meta.item_type === 'artist') return
            if (rating === null) {
                deleteRating(profileId, meta.item_type, meta.spotify_id).catch(
                    console.error
                )
            } else {
                upsertRating(
                    profileId,
                    {
                        item_type: meta.item_type,
                        spotify_id: meta.spotify_id,
                        name: meta.name,
                        image_url: meta.image_url,
                        artist_name: meta.artist_name,
                        release_date: meta.release_date,
                    },
                    rating
                ).catch(console.error)
                insertDiaryEntry(profileId, {
                    action: 'rated',
                    ...meta,
                    rating,
                }).catch(console.error)
            }
        },
        [detail.setRating, profileId, item]
    )

    const toggleLike = useCallback(() => {
        const wasLiked = detail.interactions.liked
        detail.toggleLike()
        if (!profileId || !item || wasLiked) return
        insertDiaryEntry(profileId, {
            action: 'liked',
            ...getItemMeta(item),
        }).catch(console.error)
    }, [detail.toggleLike, detail.interactions.liked, profileId, item])

    const toggleListened = useCallback(() => {
        const wasListened = detail.interactions.listened
        detail.toggleListened()
        if (!profileId || !item || wasListened) return
        insertDiaryEntry(profileId, {
            action: 'listened',
            ...getItemMeta(item),
        }).catch(console.error)
    }, [detail.toggleListened, detail.interactions.listened, profileId, item])

    const toggleWantToListen = useCallback(() => {
        const wasWant = detail.interactions.wantToListen
        detail.toggleWantToListen()
        if (!profileId || !item || wasWant) return
        insertDiaryEntry(profileId, {
            action: 'want_to_listen',
            ...getItemMeta(item),
        }).catch(console.error)
    }, [
        detail.toggleWantToListen,
        detail.interactions.wantToListen,
        profileId,
        item,
    ])

    const addReview = useCallback(
        (text: string, rating: number | null) => {
            detail.addReview(text, rating)
            if (!profileId || !item) return
            insertDiaryEntry(profileId, {
                action: 'reviewed',
                ...getItemMeta(item),
                rating,
                review_text: text,
            }).catch(console.error)
        },
        [detail.addReview, profileId, item]
    )

    return {
        interactions: detail.interactions,
        setRating,
        toggleLike,
        toggleListened,
        toggleWantToListen,
        addReview,
        removeReview: detail.removeReview,
        addLogEntry: detail.addLogEntry,
    }
}
