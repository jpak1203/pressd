import { useMemo } from 'react'
import { useSpotifySearch } from '@/features/search-results/hooks/useSpotifySearch'
import type { TrackFilters, TrackDecadeFilter } from '@/features/tracks/types/tracks'
import type { TrackDetail } from '@/features/detail/types/detail'
import { popularTracksThisWeek } from '@/features/tracks/data/tracksData'

const decadeToYearRange = (
    decade: TrackDecadeFilter
): { start: number; end: number } | null => {
    if (decade === 'upcoming') return { start: new Date().getFullYear() + 1, end: 9999 }
    const start = parseInt(decade.replace('s', ''))
    return { start, end: start + 9 }
}

type UseTracksListResult = {
    tracks: TrackDetail[]
    isLoading: boolean
    hasMore: boolean
    setQuery: (q: string) => void
    query: string
}

export const useTracksList = (filters: TrackFilters): UseTracksListResult => {
    const spotify = useSpotifySearch({ type: 'track', limit: 20 })

    const tracks = useMemo((): TrackDetail[] => {
        const hasQuery = spotify.query.trim().length >= 2

        const raw: TrackDetail[] = hasQuery
            ? (spotify.data?.tracks ?? []).map((t) => ({
                  type: 'track' as const,
                  id: t.id,
                  name: t.name,
                  image: t.image_url,
                  artists: t.artists,
                  album: { id: t.album.id, name: t.album.name },
                  duration_ms: t.duration_ms,
                  release_date: t.release_date,
                  external_url: t.external_url,
              }))
            : popularTracksThisWeek

        return raw.filter((track) => {
            if (filters.decade && track.release_date) {
                const year = parseInt(track.release_date.slice(0, 4))
                const range = decadeToYearRange(filters.decade)
                if (range && (year < range.start || year > range.end)) return false
            }
            return true
        })
    }, [spotify.query, spotify.data, filters])

    return {
        tracks,
        isLoading: spotify.isLoading,
        hasMore: false,
        setQuery: spotify.setQuery,
        query: spotify.query,
    }
}
