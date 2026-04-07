import { useCallback, useEffect, useState } from 'react'
import type { ItemDetail, ItemInteraction } from '@/features/detail/types/detail'
import { useDetailInteractions } from './useDetailInteractions'
import {
    upsertRating,
    deleteRating,
    insertDiaryEntry,
    insertReview,
    deleteReview,
    fetchItemInteraction,
    upsertItemInteraction,
    fetchItemRating,
    fetchUserReviewsForItem,
    deleteItemDiaryEntriesByAction,
} from '@/features/profile/api/profileApi'
import { errorToast } from '@/lib/errorToast'

const defaultInteraction: ItemInteraction = {
    rating: null,
    liked: false,
    listened: false,
    wantToListen: false,
    reviews: [],
    logEntries: [],
}

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
    profileId: string | null,
    onRatingWritten?: () => void
) => {
    // Always call — hooks must not be conditional
    const localDetail = useDetailInteractions(itemKey)

    // Supabase-backed state for logged-in users
    const [dbInteractions, setDbInteractions] =
        useState<ItemInteraction>(defaultInteraction)

    useEffect(() => {
        if (!profileId || !item) return

        const itemType = item.type
        const spotifyId = item.id
        const isRatable = itemType !== 'artist'

        Promise.all([
            isRatable
                ? fetchItemRating(profileId, itemType as 'track' | 'album', spotifyId)
                : Promise.resolve(null),
            fetchItemInteraction(profileId, itemType, spotifyId),
            isRatable
                ? fetchUserReviewsForItem(
                      profileId,
                      itemType as 'track' | 'album',
                      spotifyId
                  )
                : Promise.resolve([]),
        ])
            .then(([rating, flags, reviewRows]) => {
                setDbInteractions({
                    rating,
                    liked: flags.liked,
                    listened: flags.listened,
                    wantToListen: flags.want_to_listen,
                    reviews: reviewRows.map((r) => ({
                        id: r.id,
                        text: r.body,
                        rating: r.rating,
                        date: r.created_at,
                    })),
                    logEntries: [],
                })
            })
            .catch((err: unknown) => {
                console.warn('Failed to load interactions from Supabase:', err)
            })
    }, [profileId, item?.id, item?.type])

    // -------------------------------------------------------------------------
    // Logged-in actions — optimistic update + Supabase write
    // -------------------------------------------------------------------------

    const setRating = useCallback(
        (rating: number | null) => {
            if (!profileId || !item) {
                localDetail.setRating(rating)
                return
            }
            const meta = getItemMeta(item)
            if (meta.item_type === 'artist') return

            setDbInteractions((prev) => ({
                ...prev,
                rating,
                ...(rating !== null
                    ? { listened: true, wantToListen: false }
                    : {}),
            }))

            if (rating === null) {
                deleteRating(
                    profileId,
                    meta.item_type,
                    meta.spotify_id
                ).then(() => onRatingWritten?.()).catch(() => errorToast('Failed to remove rating.'))
                deleteItemDiaryEntriesByAction(
                    profileId,
                    meta.item_type,
                    meta.spotify_id,
                    'rated'
                ).catch(() => {})
                upsertItemInteraction(
                    profileId,
                    meta.item_type,
                    meta.spotify_id,
                    {}
                ).catch(() => {})
            } else {
                const wasListened = dbInteractions.listened
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
                ).then(() => onRatingWritten?.()).catch(() => errorToast('Failed to save rating.'))
                insertDiaryEntry(profileId, {
                    action: 'rated',
                    ...meta,
                    rating,
                }).catch(() => errorToast('Failed to log diary entry.'))
                if (!wasListened) {
                    upsertItemInteraction(
                        profileId,
                        meta.item_type,
                        meta.spotify_id,
                        { listened: true, want_to_listen: false }
                    ).catch(() => {})
                    insertDiaryEntry(profileId, {
                        action: 'listened',
                        ...meta,
                    }).catch(() => errorToast('Failed to log diary entry.'))
                }
            }
        },
        [profileId, item, localDetail, dbInteractions.listened]
    )

    const toggleLike = useCallback(() => {
        if (!profileId || !item) {
            localDetail.toggleLike()
            return
        }
        const meta = getItemMeta(item)
        const liked = !dbInteractions.liked
        setDbInteractions((prev) => ({ ...prev, liked }))
        upsertItemInteraction(profileId, meta.item_type, meta.spotify_id, { liked })
            .catch(() => errorToast('Failed to save.'))
        if (liked) {
            insertDiaryEntry(profileId, { action: 'liked', ...meta })
                .catch(() => errorToast('Failed to log diary entry.'))
        } else {
            deleteItemDiaryEntriesByAction(profileId, meta.item_type, meta.spotify_id, 'liked')
                .catch(() => {})
        }
    }, [profileId, item, localDetail, dbInteractions.liked])

    const toggleListened = useCallback(() => {
        if (!profileId || !item) {
            localDetail.toggleListened()
            return
        }
        const meta = getItemMeta(item)
        const listened = !dbInteractions.listened
        const wantToListen = listened ? false : dbInteractions.wantToListen
        setDbInteractions((prev) => ({ ...prev, listened, wantToListen }))
        upsertItemInteraction(profileId, meta.item_type, meta.spotify_id, { listened, want_to_listen: wantToListen })
            .catch(() => errorToast('Failed to save.'))
        if (listened) {
            insertDiaryEntry(profileId, { action: 'listened', ...meta })
                .catch(() => errorToast('Failed to log diary entry.'))
            if (dbInteractions.wantToListen) {
                deleteItemDiaryEntriesByAction(profileId, meta.item_type, meta.spotify_id, 'want_to_listen')
                    .catch(() => {})
            }
        } else {
            deleteItemDiaryEntriesByAction(profileId, meta.item_type, meta.spotify_id, 'listened')
                .catch(() => {})
        }
    }, [profileId, item, localDetail, dbInteractions.listened, dbInteractions.wantToListen])

    const toggleWantToListen = useCallback(() => {
        if (!profileId || !item) {
            localDetail.toggleWantToListen()
            return
        }
        const meta = getItemMeta(item)
        const wantToListen = !dbInteractions.wantToListen
        const listened = wantToListen ? false : dbInteractions.listened
        setDbInteractions((prev) => ({ ...prev, wantToListen, listened }))
        upsertItemInteraction(profileId, meta.item_type, meta.spotify_id, { want_to_listen: wantToListen, listened })
            .catch(() => errorToast('Failed to save.'))
        if (wantToListen) {
            insertDiaryEntry(profileId, { action: 'want_to_listen', ...meta })
                .catch(() => errorToast('Failed to log diary entry.'))
            if (dbInteractions.listened) {
                deleteItemDiaryEntriesByAction(profileId, meta.item_type, meta.spotify_id, 'listened')
                    .catch(() => {})
            }
        } else {
            deleteItemDiaryEntriesByAction(profileId, meta.item_type, meta.spotify_id, 'want_to_listen')
                .catch(() => {})
        }
    }, [profileId, item, localDetail, dbInteractions.wantToListen, dbInteractions.listened])

    const addReview = useCallback(
        (text: string, rating: number | null) => {
            if (!profileId || !item) {
                localDetail.addReview(text, rating)
                return
            }
            const meta = getItemMeta(item)
            if (meta.item_type === 'artist') return
            const rateableType = meta.item_type as 'track' | 'album'

            insertReview(profileId, {
                item_type: rateableType,
                spotify_id: meta.spotify_id,
                name: meta.name,
                image_url: meta.image_url,
                artist_name: meta.artist_name,
                rating,
                body: text,
            })
                .then(() =>
                    fetchUserReviewsForItem(
                        profileId,
                        rateableType,
                        meta.spotify_id
                    )
                )
                .then((reviewRows) => {
                    setDbInteractions((prev) => ({
                        ...prev,
                        reviews: reviewRows.map((r) => ({
                            id: r.id,
                            text: r.body,
                            rating: r.rating,
                            date: r.created_at,
                        })),
                    }))
                })
                .catch(() => errorToast('Failed to save review.'))

            insertDiaryEntry(profileId, {
                action: 'reviewed',
                ...meta,
                rating,
                review_text: text,
            }).catch(() => errorToast('Failed to log diary entry.'))
        },
        [profileId, item, localDetail]
    )

    const removeReview = useCallback(
        (reviewId: string) => {
            if (!profileId) {
                localDetail.removeReview(reviewId)
                return
            }
            setDbInteractions((prev) => ({
                ...prev,
                reviews: prev.reviews.filter((r) => r.id !== reviewId),
            }))
            deleteReview(reviewId).catch(() =>
                errorToast('Failed to delete review.')
            )
            if (item) {
                const meta = getItemMeta(item)
                deleteItemDiaryEntriesByAction(
                    profileId,
                    meta.item_type,
                    meta.spotify_id,
                    'reviewed'
                ).catch(() => {})
            }
        },
        [profileId, item, localDetail]
    )

    if (!profileId) {
        return {
            interactions: localDetail.interactions,
            setRating: localDetail.setRating,
            toggleLike: localDetail.toggleLike,
            toggleListened: localDetail.toggleListened,
            toggleWantToListen: localDetail.toggleWantToListen,
            addReview: localDetail.addReview,
            removeReview: localDetail.removeReview,
        }
    }

    return {
        interactions: dbInteractions,
        setRating,
        toggleLike,
        toggleListened,
        toggleWantToListen,
        addReview,
        removeReview,
    }
}
