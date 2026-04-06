import { useEffect, useState } from 'react'
import { fetchAlbumTracks } from '@/features/detail/api/detailApi'
import { fetchAlbumTracksFromEdge } from '@/services/spotify/service'
import type { AlbumDetail, AlbumTrackItem } from '@/features/detail/types/detail'

type AlbumTracksState = {
    tracks: AlbumTrackItem[]
    isLoading: boolean
    error: string | null
}

export const useAlbumTracks = (
    album: AlbumDetail | null
): AlbumTracksState => {
    const [state, setState] = useState<AlbumTracksState>({
        tracks: [],
        isLoading: album !== null,
        error: null,
    })

    useEffect(() => {
        if (!album) return

        setState({ tracks: [], isLoading: true, error: null })
        const controller = new AbortController()
        fetchAlbumTracks(album.id, (id) =>
            fetchAlbumTracksFromEdge(id, controller.signal)
        )
            .then((tracks) => setState({ tracks, isLoading: false, error: null }))
            .catch((err: unknown) => {
                if (err instanceof Error && err.name === 'AbortError') return
                const message = err instanceof Error ? err.message : 'Failed to load tracks'
                setState({ tracks: [], isLoading: false, error: message })
            })
        return () => controller.abort()
    }, [album?.id])

    return state
}
