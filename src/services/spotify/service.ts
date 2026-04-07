import { supabase } from '@/lib/supabase/client'
import type {
    SpotifySearchParams,
    SpotifySearchResponse,
} from '@/services/spotify/types'
import type {
    AlbumTrackItem,
    DiscographyResult,
    ItemDetail,
    ItemType,
} from '@/features/detail/types/detail'

const supabaseFnUrl = import.meta.env.VITE_SUPABASE_FN_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

const buildHeaders = async (): Promise<Record<string, string>> => {
    const {
        data: { session },
    } = await supabase.auth.getSession()

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        apikey: supabasePublishableKey,
    }

    if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`
    }

    return headers
}

export const searchSpotify = async (
    params: SpotifySearchParams,
    signal?: AbortSignal
): Promise<SpotifySearchResponse> => {
    if (!supabaseFnUrl || !supabasePublishableKey)
        throw new Error('Missing env vars')

    const payload = {
        q: params.q,
        type: params.type ?? 'track,artist,album',
        limit: params.limit ?? 10,
        market: params.market ?? 'US',
    }

    const res = await fetch(`${supabaseFnUrl}/spotify-search`, {
        method: 'POST',
        headers: await buildHeaders(),
        body: JSON.stringify(payload),
        signal,
    })

    if (!res.ok) {
        const message = await res.text()
        throw new Error(`Spotify search failed (${res.status}): ${message}`)
    }

    return res.json() as Promise<SpotifySearchResponse>
}

export const lookupSpotifyItem = async (
    type: ItemType,
    id: string,
    signal?: AbortSignal
): Promise<ItemDetail> => {
    if (!supabaseFnUrl || !supabasePublishableKey)
        throw new Error('Missing env vars')

    const res = await fetch(`${supabaseFnUrl}/spotify-lookup`, {
        method: 'POST',
        headers: await buildHeaders(),
        body: JSON.stringify({ type, id }),
        signal,
    })

    if (!res.ok) {
        const message = await res.text()
        throw new Error(`Spotify lookup failed (${res.status}): ${message}`)
    }

    return res.json() as Promise<ItemDetail>
}

export const fetchDiscographyFromEdge = async (
    artistId: string,
    signal?: AbortSignal
): Promise<DiscographyResult> => {
    if (!supabaseFnUrl || !supabasePublishableKey)
        throw new Error('Missing env vars')

    const res = await fetch(`${supabaseFnUrl}/spotify-discography`, {
        method: 'POST',
        headers: await buildHeaders(),
        body: JSON.stringify({ id: artistId }),
        signal,
    })

    if (!res.ok) throw new Error(`Discography fetch failed (${res.status})`)
    return res.json() as Promise<DiscographyResult>
}

export const fetchAlbumTracksFromEdge = async (
    albumId: string,
    signal?: AbortSignal
): Promise<AlbumTrackItem[]> => {
    if (!supabaseFnUrl || !supabasePublishableKey)
        throw new Error('Missing env vars')

    const res = await fetch(`${supabaseFnUrl}/spotify-album-tracks`, {
        method: 'POST',
        headers: await buildHeaders(),
        body: JSON.stringify({ id: albumId }),
        signal,
    })

    if (!res.ok) throw new Error(`Album tracks fetch failed (${res.status})`)
    const data = await res.json() as { tracks: AlbumTrackItem[] }
    return data.tracks
}
