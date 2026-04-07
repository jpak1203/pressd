import { useEffect } from 'react'
import { useSpotifySearch } from '@/features/search-results/hooks/useSpotifySearch'
import { useUserSearch } from '@/features/search-results/hooks/useUserSearch'
import { usePlaylistSearch } from '@/features/search-results/hooks/usePlaylistSearch'
import type { SearchFilter } from '@/features/search-results/types/search-results'
import type { SpotifySearchType } from '@/services/spotify/types'

const getSpotifyType = (filter: SearchFilter): SpotifySearchType => {
    if (filter === 'tracks') return 'track'
    if (filter === 'albums') return 'album'
    if (filter === 'artists') return 'artist'
    return 'track,artist,album'
}

const isSpotifyFilter = (filter: SearchFilter): boolean =>
    filter === 'all' ||
    filter === 'tracks' ||
    filter === 'albums' ||
    filter === 'artists'

export const useUnifiedSearch = (query: string, filter: SearchFilter) => {
    const isAll = filter === 'all'
    const spotifyLimit = isAll ? 5 : 10
    const supabaseLimit = isAll ? 5 : 20

    const spotify = useSpotifySearch({
        type: getSpotifyType(filter),
        limit: spotifyLimit,
        enabled: isSpotifyFilter(filter),
    })

    const users = useUserSearch({
        query,
        enabled: filter === 'all' || filter === 'members',
        limit: supabaseLimit,
    })

    const playlists = usePlaylistSearch({
        query,
        enabled: filter === 'all' || filter === 'playlists',
        limit: supabaseLimit,
    })

    useEffect(() => {
        spotify.setQuery(query)
    }, [query, spotify.setQuery])

    const isAnyLoading = spotify.isLoading || users.isLoading || playlists.isLoading

    return {
        spotify,
        users,
        playlists,
        isAnyLoading,
    }
}
