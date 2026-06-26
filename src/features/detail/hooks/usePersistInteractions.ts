import { useCallback, useEffect, useRef, useState } from 'react'
import type {
    ItemDetail,
    ItemInteraction,
} from '@/features/detail/types/detail'
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

export type LogItemOpts = {
    listenedAt?: string
    rating?: number | null
    liked: boolean
    reviewText?: string
}

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
    item: ItemDetail | null,
    profileId: string | null,
    // Fired after a rating or like is persisted so callers can refresh the
    // aggregate, guest-visible stats (average, rating count, like count).
    onStatsChanged?: () => void
) => {
    // Supabase-backed state for logged-in users. Guests (profileId === null) never
    // load or persist anything — interactions stay at the empty default and every
    // mutator is a no-op, so no data leaks across sessions on a shared browser.
    const [dbInteractions, setDbInteractions] =
        useState<ItemInteraction>(defaultInteraction)

    // Synchronous mirror of state so rapid clicks derive from the freshest value.
    const stateRef = useRef(dbInteractions)
    useEffect(() => {
        stateRef.current = dbInteractions
    }, [dbInteractions])

    useEffect(() => {
        if (!profileId || !item) return

        const itemType = item.type
        const spotifyId = item.id
        const isRatable = itemType !== 'artist'
        let cancelled = false

        Promise.all([
            isRatable
                ? fetchItemRating(
                      profileId,
                      itemType as 'track' | 'album',
                      spotifyId
                  )
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
                if (cancelled) return
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
                if (cancelled) return
                console.warn('Failed to load interactions from Supabase:', err)
            })

        return () => {
            cancelled = true
        }
    }, [profileId, item?.id, item?.type])

    // -------------------------------------------------------------------------
    // Logged-in actions — optimistic update + Supabase write
    // -------------------------------------------------------------------------

    const setRating = useCallback(
        (rating: number | null) => {
            if (!profileId || !item) return
            const meta = getItemMeta(item)
            if (meta.item_type === 'artist') return

            setDbInteractions((prev) => ({
                ...prev,
                rating,
                ...(rating !== null
                    ? { listened: true, wantToListen: false }
                    : {}),
            }))
            const wasListened = stateRef.current.listened
            stateRef.current = {
                ...stateRef.current,
                rating,
                ...(rating !== null
                    ? { listened: true, wantToListen: false }
                    : {}),
            }

            if (rating === null) {
                deleteRating(profileId, meta.item_type, meta.spotify_id)
                    .then(() => onStatsChanged?.())
                    .catch(() => errorToast('Failed to remove rating.'))
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
                )
                    .then(() => onStatsChanged?.())
                    .catch(() => errorToast('Failed to save rating.'))
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
        [profileId, item, onStatsChanged]
    )

    const toggleLike = useCallback(() => {
        if (!profileId || !item) return
        const meta = getItemMeta(item)
        const liked = !stateRef.current.liked
        stateRef.current = { ...stateRef.current, liked }
        setDbInteractions((prev) => ({ ...prev, liked }))
        upsertItemInteraction(profileId, meta.item_type, meta.spotify_id, {
            liked,
        }).catch(() => errorToast('Failed to save.'))
        // Refresh stats once the diary 'liked' row (the source the like count is
        // read from) has been written or removed.
        if (liked) {
            insertDiaryEntry(profileId, { action: 'liked', ...meta })
                .then(() => onStatsChanged?.())
                .catch(() => errorToast('Failed to log diary entry.'))
        } else {
            deleteItemDiaryEntriesByAction(
                profileId,
                meta.item_type,
                meta.spotify_id,
                'liked'
            )
                .then(() => onStatsChanged?.())
                .catch(() => {})
        }
    }, [profileId, item, onStatsChanged])

    const toggleListened = useCallback(() => {
        if (!profileId || !item) return
        const meta = getItemMeta(item)
        const listened = !stateRef.current.listened
        const wantToListen = listened ? false : stateRef.current.wantToListen
        const hadWantToListen = stateRef.current.wantToListen
        stateRef.current = { ...stateRef.current, listened, wantToListen }
        setDbInteractions((prev) => ({ ...prev, listened, wantToListen }))
        upsertItemInteraction(profileId, meta.item_type, meta.spotify_id, {
            listened,
            want_to_listen: wantToListen,
        }).catch(() => errorToast('Failed to save.'))
        if (listened) {
            insertDiaryEntry(profileId, { action: 'listened', ...meta }).catch(
                () => errorToast('Failed to log diary entry.')
            )
            if (hadWantToListen) {
                deleteItemDiaryEntriesByAction(
                    profileId,
                    meta.item_type,
                    meta.spotify_id,
                    'want_to_listen'
                ).catch(() => {})
            }
        } else {
            deleteItemDiaryEntriesByAction(
                profileId,
                meta.item_type,
                meta.spotify_id,
                'listened'
            ).catch(() => {})
        }
    }, [profileId, item])

    const toggleWantToListen = useCallback(() => {
        if (!profileId || !item) return
        const meta = getItemMeta(item)
        const wantToListen = !stateRef.current.wantToListen
        const listened = wantToListen ? false : stateRef.current.listened
        const hadListened = stateRef.current.listened
        stateRef.current = { ...stateRef.current, wantToListen, listened }
        setDbInteractions((prev) => ({ ...prev, wantToListen, listened }))
        upsertItemInteraction(profileId, meta.item_type, meta.spotify_id, {
            want_to_listen: wantToListen,
            listened,
        }).catch(() => errorToast('Failed to save.'))
        if (wantToListen) {
            insertDiaryEntry(profileId, {
                action: 'want_to_listen',
                ...meta,
            }).catch(() => errorToast('Failed to log diary entry.'))
            if (hadListened) {
                deleteItemDiaryEntriesByAction(
                    profileId,
                    meta.item_type,
                    meta.spotify_id,
                    'listened'
                ).catch(() => {})
            }
        } else {
            deleteItemDiaryEntriesByAction(
                profileId,
                meta.item_type,
                meta.spotify_id,
                'want_to_listen'
            ).catch(() => {})
        }
    }, [profileId, item])

    const addReview = useCallback(
        (text: string, rating: number | null) => {
            if (!profileId || !item) return
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
        [profileId, item]
    )

    const removeReview = useCallback(
        (reviewId: string) => {
            if (!profileId) return
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
        [profileId, item]
    )

    const logItem = useCallback(
        (opts: LogItemOpts) => {
            if (!profileId || !item) return

            const meta = getItemMeta(item)
            const createdAt = opts.listenedAt
                ? new Date(`${opts.listenedAt}T00:00:00`).toISOString()
                : new Date().toISOString()
            const prevState = stateRef.current
            const nextRating = opts.rating ?? null

            setDbInteractions((prev) => ({
                ...prev,
                listened: true,
                wantToListen: false,
                liked: opts.liked,
                rating: nextRating,
            }))
            stateRef.current = {
                ...prevState,
                listened: true,
                wantToListen: false,
                liked: opts.liked,
                rating: nextRating,
            }

            upsertItemInteraction(profileId, meta.item_type, meta.spotify_id, {
                listened: true,
                want_to_listen: false,
                liked: opts.liked,
            }).catch(() => errorToast('Failed to save.'))

            if (prevState.wantToListen) {
                deleteItemDiaryEntriesByAction(
                    profileId,
                    meta.item_type,
                    meta.spotify_id,
                    'want_to_listen'
                ).catch(() => {})
            }

            insertDiaryEntry(profileId, {
                action: 'listened',
                ...meta,
                created_at: createdAt,
            }).catch(() => errorToast('Failed to log diary entry.'))

            if (opts.liked !== prevState.liked) {
                if (opts.liked) {
                    insertDiaryEntry(profileId, {
                        action: 'liked',
                        ...meta,
                        created_at: createdAt,
                    })
                        .then(() => onStatsChanged?.())
                        .catch(() => errorToast('Failed to log diary entry.'))
                } else {
                    deleteItemDiaryEntriesByAction(
                        profileId,
                        meta.item_type,
                        meta.spotify_id,
                        'liked'
                    )
                        .then(() => onStatsChanged?.())
                        .catch(() => {})
                }
            }

            if (nextRating != null && meta.item_type !== 'artist') {
                const rateableType = meta.item_type as 'track' | 'album'
                upsertRating(
                    profileId,
                    {
                        item_type: rateableType,
                        spotify_id: meta.spotify_id,
                        name: meta.name,
                        image_url: meta.image_url,
                        artist_name: meta.artist_name,
                        release_date: meta.release_date,
                    },
                    nextRating
                )
                    .then(() => onStatsChanged?.())
                    .catch(() => errorToast('Failed to save rating.'))
                insertDiaryEntry(profileId, {
                    action: 'rated',
                    ...meta,
                    rating: nextRating,
                    created_at: createdAt,
                }).catch(() => errorToast('Failed to log diary entry.'))
            } else if (
                nextRating == null &&
                prevState.rating != null &&
                meta.item_type !== 'artist'
            ) {
                deleteRating(profileId, meta.item_type, meta.spotify_id)
                    .then(() => onStatsChanged?.())
                    .catch(() => errorToast('Failed to remove rating.'))
                deleteItemDiaryEntriesByAction(
                    profileId,
                    meta.item_type,
                    meta.spotify_id,
                    'rated'
                ).catch(() => {})
            }

            if (opts.reviewText && meta.item_type !== 'artist') {
                const rateableType = meta.item_type as 'track' | 'album'
                insertReview(profileId, {
                    item_type: rateableType,
                    spotify_id: meta.spotify_id,
                    name: meta.name,
                    image_url: meta.image_url,
                    artist_name: meta.artist_name,
                    rating: opts.rating ?? null,
                    body: opts.reviewText,
                })
                    .then(() =>
                        fetchUserReviewsForItem(
                            profileId,
                            rateableType,
                            meta.spotify_id
                        )
                    )
                    .then((rows) =>
                        setDbInteractions((prev) => ({
                            ...prev,
                            reviews: rows.map((r) => ({
                                id: r.id,
                                text: r.body,
                                rating: r.rating,
                                date: r.created_at,
                            })),
                        }))
                    )
                    .catch(() => errorToast('Failed to save review.'))
                insertDiaryEntry(profileId, {
                    action: 'reviewed',
                    ...meta,
                    rating: opts.rating ?? null,
                    review_text: opts.reviewText,
                    created_at: createdAt,
                }).catch(() => errorToast('Failed to log diary entry.'))
            }
        },
        [profileId, item, onStatsChanged]
    )

    return {
        interactions: dbInteractions,
        setRating,
        toggleLike,
        toggleListened,
        toggleWantToListen,
        addReview,
        removeReview,
        logItem,
    }
}
