import type {
    AlbumDetail,
    AlbumTrackItem,
    TrackDetail,
} from '@/features/detail/types/detail'

export const buildTrackDetail = (
    track: AlbumTrackItem,
    album: AlbumDetail
): TrackDetail => ({
    type: 'track',
    id: track.id,
    name: track.name,
    image: album.image,
    artists: track.artists,
    album: { id: album.id, name: album.name },
    duration_ms: track.duration_ms,
    release_date: album.release_date,
    external_url: track.external_url,
})
