import { useEffect, useState } from 'react'
import { fetchAlbumTracks } from '@/features/detail/api/detailApi'
import { fetchAlbumTracksFromEdge } from '@/services/spotify/service'
import type { AlbumDetail, AlbumTrackItem } from '@/features/detail/types/detail'

type AlbumTracksState = {
    tracks: AlbumTrackItem[]
    isLoading: boolean
}

export const useAlbumTracks = (
    album: AlbumDetail | null
): AlbumTracksState => {
    const [state, setState] = useState<AlbumTracksState>({
        tracks: [],
        isLoading: album !== null,
    })

    useEffect(() => {
        if (!album) return

        setState({ tracks: [], isLoading: true })
        const controller = new AbortController()
        fetchAlbumTracks(album.id, (id) =>
            fetchAlbumTracksFromEdge(id, controller.signal)
        )
            .then((tracks) => setState({ tracks, isLoading: false }))
            .catch((err: unknown) => {
                if (err instanceof Error && err.name === 'AbortError') return
                setState({ tracks: [], isLoading: false })
            })
        return () => controller.abort()
    }, [album?.id])

    return state
}
