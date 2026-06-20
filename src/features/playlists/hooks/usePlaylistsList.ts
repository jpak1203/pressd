import { useEffect, useState } from 'react'
import { usePlaylistSearch } from '@/features/search-results/hooks/usePlaylistSearch'
import type { PlaylistSearchResult } from '@/features/search-results/types/search-results'
import type { PlaylistTimeFrame } from '@/features/playlists/types/playlists'
import { popularPlaylists } from '@/features/playlists/data/playlistsData'

type UsePlaylistsListOptions = {
    timeFrame: PlaylistTimeFrame
    query: string
    pageSize?: number
}

type UsePlaylistsListResult = {
    data: PlaylistSearchResult[]
    isLoading: boolean
    hasMore: boolean
}

export const usePlaylistsList = ({
    query,
    pageSize = 20,
}: UsePlaylistsListOptions): UsePlaylistsListResult => {
    const [fallback, setFallback] = useState<PlaylistSearchResult[]>([])

    const search = usePlaylistSearch({
        query,
        enabled: query.trim().length >= 2,
        limit: pageSize,
    })

    useEffect(() => {
        setFallback(popularPlaylists.slice(0, pageSize))
    }, [pageSize])

    const hasQuery = query.trim().length >= 2
    const data = hasQuery ? search.data : fallback

    return {
        data,
        isLoading: hasQuery ? search.isLoading : false,
        hasMore: false,
    }
}
