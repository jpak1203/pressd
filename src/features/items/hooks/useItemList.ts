import { useMemo } from 'react'
import { useSpotifySearch } from '@/features/search-results/hooks/useSpotifySearch'
import type { ItemFilters, ItemDecadeFilter } from '@/components/item-filter-bar/types'
import type { TrackDetail, AlbumDetail } from '@/features/detail/types/detail'
import type { SpotifySearchResponse } from '@/services/spotify/types'

export type ItemKind = 'track' | 'album'

export type ListItem = TrackDetail | AlbumDetail

const decadeToYearRange = (
    decade: ItemDecadeFilter
): { start: number; end: number } | null => {
    if (decade === 'upcoming') return { start: new Date().getFullYear() + 1, end: 9999 }
    const start = parseInt(decade.replace('s', ''), 10)
    if (Number.isNaN(start)) return null
    return { start, end: start + 9 }
}

const mapTrack = (t: SpotifySearchResponse['tracks'][number]): TrackDetail => ({
    type: 'track',
    id: t.id,
    name: t.name,
    image: t.image_url,
    artists: t.artists,
    album: { id: t.album.id, name: t.album.name },
    duration_ms: t.duration_ms,
    release_date: t.release_date,
    external_url: t.external_url,
})

const mapAlbum = (a: SpotifySearchResponse['albums'][number]): AlbumDetail => ({
    type: 'album',
    id: a.id,
    name: a.name,
    image: a.image,
    artists: a.artists,
    release_date: a.release_date,
    total_tracks: a.total_tracks,
    album_type: a.album_type,
    external_url: a.external_url,
})

type UseItemListOptions = {
    kind: ItemKind
    filters: ItemFilters
    fallback: ListItem[]
    limit?: number
}

type UseItemListResult = {
    items: ListItem[]
    isLoading: boolean
    hasMore: boolean
    setQuery: (q: string) => void
    query: string
}

export const useItemList = ({
    kind,
    filters,
    fallback,
    limit = 20,
}: UseItemListOptions): UseItemListResult => {
    const spotify = useSpotifySearch({ type: kind, limit })

    const items = useMemo((): ListItem[] => {
        const hasQuery = spotify.query.trim().length >= 2

        const raw: ListItem[] = hasQuery
            ? kind === 'track'
                ? (spotify.data?.tracks ?? []).map(mapTrack)
                : (spotify.data?.albums ?? []).map(mapAlbum)
            : fallback

        const range = filters.decade ? decadeToYearRange(filters.decade) : null

        return raw.filter((item) => {
            if (range) {
                if (!item.release_date) return false
                const year = parseInt(item.release_date.slice(0, 4), 10)
                if (Number.isNaN(year) || year < range.start || year > range.end) return false
            }
            return true
        })
    }, [kind, spotify.query, spotify.data, filters.decade, fallback])

    return {
        items,
        isLoading: spotify.isLoading,
        hasMore: false,
        setQuery: spotify.setQuery,
        query: spotify.query,
    }
}
