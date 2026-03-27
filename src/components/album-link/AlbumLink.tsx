import { type ReactNode, type MouseEvent, useCallback, useRef } from 'react'
import { Link, useNavigate } from 'react-router'
import type { AlbumDetail } from '@/features/detail/types/detail'
import { buildTrackDetail } from '@/features/detail/utils/buildTrackDetail'
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

            const goToAlbum = () =>
                navigate(`/album/${album.id}`, { state: album })

            fetchAlbumTracks(album.id, (id) =>
                fetchAlbumTracksFromEdge(id, controller.signal)
            )
                .then((tracks) => {
                    if (controller.signal.aborted) return
                    if (tracks.length !== 1) return goToAlbum()

                    const trackState = buildTrackDetail(tracks[0], album)
                    navigate(`/track/${tracks[0].id}`, { state: trackState })
                })
                .catch(() => {
                    if (!controller.signal.aborted) goToAlbum()
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
