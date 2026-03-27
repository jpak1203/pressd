import { supabase } from '@/lib/supabase/client'
import type {
    AlbumDetail,
    AlbumTrackItem,
    DiscographyResult,
    ItemDetail,
    ItemType,
} from '@/features/detail/types/detail'

const DISCOGRAPHY_TTL_MS = 1000 * 60 * 60 * 24 // 24 hours

type ArtistRef = { id: string; name: string }

type SongRow = {
    spotify_id: string
    name: string
    image_url: string | null
    duration_ms: number
    release_date: string | null
    external_url: string | null
    artists: ArtistRef[] | null
    albums: { spotify_id: string; name: string } | null
    track_number: number | null
}

type AlbumRow = {
    spotify_id: string
    name: string
    image_url: string | null
    release_date: string | null
    album_type: string | null
    total_tracks: number | null
    external_url: string | null
    artists: ArtistRef[] | null
}

type ArtistRow = {
    spotify_id: string
    name: string
    image_url: string | null
    external_url: string | null
    genres: string[] | null
    popularity: number | null
}

const fetchTrackFromCatalog = async (
    id: string
): Promise<ItemDetail | null> => {
    const { data, error } = await supabase
        .from('songs')
        .select(
            'spotify_id, name, image_url, duration_ms, release_date, external_url, artists, albums!songs_album_fk(spotify_id, name)'
        )
        .eq('spotify_id', id)
        .maybeSingle()

    if (error || !data) return null

    const row = data as unknown as SongRow
    if (!row.albums) return null

    return {
        type: 'track',
        id: row.spotify_id,
        name: row.name,
        image: row.image_url,
        artists: row.artists ?? [],
        album: { id: row.albums.spotify_id, name: row.albums.name },
        duration_ms: row.duration_ms,
        release_date: row.release_date,
        external_url: row.external_url ?? undefined,
    }
}

const fetchAlbumFromCatalog = async (
    id: string
): Promise<ItemDetail | null> => {
    const { data, error } = await supabase
        .from('albums')
        .select(
            'spotify_id, name, image_url, release_date, album_type, total_tracks, external_url, artists'
        )
        .eq('spotify_id', id)
        .maybeSingle()

    if (error || !data) return null

    const row = data as unknown as AlbumRow
    if (row.album_type === null || row.total_tracks === null) return null

    return {
        type: 'album',
        id: row.spotify_id,
        name: row.name,
        image: row.image_url,
        artists: row.artists ?? [],
        release_date: row.release_date ?? '',
        album_type: row.album_type,
        total_tracks: row.total_tracks,
        external_url: row.external_url ?? undefined,
    }
}

const fetchArtistFromCatalog = async (
    id: string
): Promise<ItemDetail | null> => {
    const { data, error } = await supabase
        .from('artists')
        .select('spotify_id, name, image_url, external_url, genres, popularity')
        .eq('spotify_id', id)
        .maybeSingle()

    if (error || !data) return null

    const row = data as unknown as ArtistRow

    return {
        type: 'artist',
        id: row.spotify_id,
        name: row.name,
        image: row.image_url,
        genres: row.genres ?? [],
        popularity: row.popularity,
        external_url: row.external_url ?? undefined,
    }
}

type RatingAvgInput = { type: 'track' | 'album'; id: string }
type RatingAvgMap = Map<string, number>

export const fetchAverageRatings = async (
    items: RatingAvgInput[]
): Promise<RatingAvgMap> => {
    if (items.length === 0) return new Map()

    const ids = items.map((i) => i.id)

    const { data, error } = await supabase
        .from('ratings')
        .select('item_type, spotify_id, rating')
        .in('spotify_id', ids)

    if (error || !data) return new Map()

    const totals = new Map<string, { sum: number; count: number }>()
    for (const row of data) {
        const key = `${row.item_type}:${row.spotify_id}`
        const existing = totals.get(key) ?? { sum: 0, count: 0 }
        totals.set(key, {
            sum: existing.sum + row.rating,
            count: existing.count + 1,
        })
    }

    const result: RatingAvgMap = new Map()
    for (const [key, { sum, count }] of totals) {
        result.set(key, sum / count)
    }
    return result
}

export const fetchItemFromCatalog = async (
    type: ItemType,
    id: string
): Promise<ItemDetail | null> => {
    if (type === 'track') return fetchTrackFromCatalog(id)
    if (type === 'album') return fetchAlbumFromCatalog(id)
    return fetchArtistFromCatalog(id)
}

export const fetchArtistDiscography = async (
    artistId: string,
    fetchFresh: (id: string) => Promise<DiscographyResult>
): Promise<DiscographyResult> => {
    const filter = JSON.stringify([{ id: artistId }])

    const { data } = await supabase
        .from('albums')
        .select(
            'spotify_id, name, image_url, release_date, album_type, total_tracks, external_url, artists, updated_at'
        )
        .filter('artists', 'cs', filter)
        .order('release_date', { ascending: false })

    const cachedAlbums = data ?? []
    const mostRecentUpdate = cachedAlbums.reduce<Date | null>((max, r) => {
        const d = new Date(r.updated_at as string)
        return max === null || d > max ? d : max
    }, null)
    const isStale =
        mostRecentUpdate === null ||
        Date.now() - mostRecentUpdate.getTime() > DISCOGRAPHY_TTL_MS

    if (isStale) {
        return fetchFresh(artistId)
    }

    const mapRow = (r: (typeof cachedAlbums)[number]): AlbumDetail => ({
        type: 'album' as const,
        id: r.spotify_id as string,
        name: r.name as string,
        image: (r.image_url as string | null) ?? null,
        artists: (r.artists as Array<{ id: string; name: string }>) ?? [],
        release_date: (r.release_date as string) ?? '',
        album_type: r.album_type as string,
        total_tracks: r.total_tracks as number,
        external_url: (r.external_url as string | undefined) ?? undefined,
    })

    const validRows = cachedAlbums.filter(
        (r) => r.album_type !== null && r.total_tracks !== null
    )

    return {
        albums: validRows.filter((r) => r.album_type === 'album').map(mapRow),
        singles: validRows.filter((r) => r.album_type === 'single').map(mapRow),
    }
}

export const fetchAlbumTracks = async (
    albumId: string,
    fetchFresh: (id: string) => Promise<AlbumTrackItem[]>
): Promise<AlbumTrackItem[]> => {
    const { data } = await supabase
        .from('songs')
        .select('spotify_id, name, track_number, duration_ms, artists, external_url')
        .eq('album_spotify_id', albumId)
        .not('track_number', 'is', null)
        .order('track_number', { ascending: true })

    if (data && data.length > 0) {
        return data.map((r) => ({
            id: r.spotify_id as string,
            name: r.name as string,
            track_number: r.track_number as number,
            duration_ms: r.duration_ms as number,
            artists: (r.artists as Array<{ id: string; name: string }>) ?? [],
            external_url: (r.external_url as string | undefined) ?? undefined,
        }))
    }

    return fetchFresh(albumId)
}
