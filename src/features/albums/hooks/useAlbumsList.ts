import { useMemo } from 'react'
import { useSpotifySearch } from '@/features/search-results/hooks/useSpotifySearch'
import type { AlbumFilters, AlbumDecadeFilter } from '@/features/albums/types/albums'
import type { AlbumDetail } from '@/features/detail/types/detail'
import { popularAlbumsThisWeek } from '@/features/albums/data/albumsData'

const decadeToYearRange = (
    decade: AlbumDecadeFilter
): { start: number; end: number } | null => {
    if (decade === 'upcoming') return { start: new Date().getFullYear() + 1, end: 9999 }
    const start = parseInt(decade.replace('s', ''))
    return { start, end: start + 9 }
}

type UseAlbumsListResult = {
    albums: AlbumDetail[]
    isLoading: boolean
    hasMore: boolean
    setQuery: (q: string) => void
    query: string
}

export const useAlbumsList = (filters: AlbumFilters): UseAlbumsListResult => {
    const spotify = useSpotifySearch({ type: 'album', limit: 20 })

    const albums = useMemo((): AlbumDetail[] => {
        const hasQuery = spotify.query.trim().length >= 2

        const raw: AlbumDetail[] = hasQuery
            ? (spotify.data?.albums ?? []).map((a) => ({
                  type: 'album' as const,
                  id: a.id,
                  name: a.name,
                  image: a.image,
                  artists: a.artists,
                  release_date: a.release_date,
                  total_tracks: a.total_tracks,
                  album_type: a.album_type,
                  external_url: a.external_url,
              }))
            : popularAlbumsThisWeek

        return raw.filter((album) => {
            if (filters.decade) {
                const year = parseInt(album.release_date.slice(0, 4))
                const range = decadeToYearRange(filters.decade)
                if (range && (year < range.start || year > range.end)) return false
            }
            return true
        })
    }, [spotify.query, spotify.data, filters])

    return {
        albums,
        isLoading: spotify.isLoading,
        hasMore: false,
        setQuery: spotify.setQuery,
        query: spotify.query,
    }
}
