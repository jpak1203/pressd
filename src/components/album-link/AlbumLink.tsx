import { type ReactNode, type MouseEvent, useCallback, useRef } from 'react'
import { Link, useNavigate } from 'react-router'
import type { AlbumDetail, TrackDetail } from '@/features/detail/types/detail'
import { fetchAlbumTracks } from '@/features/detail/api/detailApi'
import { fetchAlbumTracksFromEdge } from '@/services/spotify/service'

type AlbumLinkProps = {
    album: AlbumDetail
    children: ReactNode
    style?: React.CSSProperties
}

export const AlbumLink = ({ album, children, style }: AlbumLinkProps) => {
    const navigate = useNavigate()
    const controllerRef = useRef<AbortController | null>(null)

    const handleClick = useCallback(
        (e: MouseEvent) => {
            if (album.total_tracks !== 1) return

            e.preventDefault()
            controllerRef.current?.abort()
            const controller = new AbortController()
            controllerRef.current = controller

            fetchAlbumTracks(album.id, (id) =>
                fetchAlbumTracksFromEdge(id, controller.signal)
            )
                .then((tracks) => {
                    if (controller.signal.aborted) return

                    if (tracks.length === 1) {
                        const track = tracks[0]
                        const trackState: TrackDetail = {
                            type: 'track',
                            id: track.id,
                            name: track.name,
                            image: album.image,
                            artists: track.artists,
                            album: { id: album.id, name: album.name },
                            duration_ms: track.duration_ms,
                            release_date: album.release_date,
                            external_url: track.external_url,
                        }
                        navigate(`/track/${track.id}`, { state: trackState })
                    } else {
                        navigate(`/album/${album.id}`, { state: album })
                    }
                })
                .catch(() => {
                    if (controller.signal.aborted) return
                    navigate(`/album/${album.id}`, { state: album })
                })
        },
        [album, navigate]
    )

    return (
        <Link
            to={`/album/${album.id}`}
            state={album}
            style={style}
            onClick={handleClick}
        >
            {children}
        </Link>
    )
}
