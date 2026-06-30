import { z } from 'zod'

import type {
    SpotifySearchResponse,
    SpotifyTrackItem,
    SpotifyArtistItem,
    SpotifyAlbumItem,
} from '@/services/spotify/types'
import type {
    AlbumTrackItem,
    DiscographyResult,
    ItemDetail,
} from '@/features/detail/types/detail'

// Runtime schemas for the untyped JSON returned by the Spotify edge functions.
// These mirror the hand-written types in types.ts / detail.ts; the `satisfies`
// guards below fail at compile time if a schema drifts from its type, and
// parseEdgeResponse() turns any *runtime* drift (Spotify or an edge-function
// change) into a clear, surfaced error instead of silently malformed objects.

const artistRefSchema = z.object({
    id: z.string(),
    name: z.string(),
})

// ---------------------------------------------------------------------------
// /spotify-search
// ---------------------------------------------------------------------------

const spotifyTrackItemSchema = z.object({
    id: z.string(),
    name: z.string(),
    artists: z.array(artistRefSchema),
    album: z.object({
        id: z.string(),
        name: z.string(),
        image: z.string().nullable(),
    }),
    image_url: z.string().nullable(),
    release_date: z.string().nullable(),
    external_url: z.string(),
    duration_ms: z.number(),
}) satisfies z.ZodType<SpotifyTrackItem>

const spotifyArtistItemSchema = z.object({
    id: z.string(),
    name: z.string(),
    image: z.string().nullable(),
    genres: z.array(z.string()),
    popularity: z.number().nullable(),
    external_url: z.string(),
}) satisfies z.ZodType<SpotifyArtistItem>

const spotifyAlbumItemSchema = z.object({
    id: z.string(),
    name: z.string(),
    album_type: z.string(),
    total_tracks: z.number(),
    image: z.string().nullable(),
    release_date: z.string(),
    artists: z.array(artistRefSchema),
    external_url: z.string(),
}) satisfies z.ZodType<SpotifyAlbumItem>

export const spotifySearchResponseSchema = z.object({
    tracks: z.array(spotifyTrackItemSchema),
    artists: z.array(spotifyArtistItemSchema),
    albums: z.array(spotifyAlbumItemSchema),
    cached: z.boolean(),
}) satisfies z.ZodType<SpotifySearchResponse>

// ---------------------------------------------------------------------------
// /spotify-lookup  (returns a single ItemDetail)
// ---------------------------------------------------------------------------

const trackDetailSchema = z.object({
    type: z.literal('track'),
    id: z.string(),
    name: z.string(),
    image: z.string().nullable(),
    artists: z.array(artistRefSchema),
    album: z.object({ id: z.string(), name: z.string() }),
    duration_ms: z.number(),
    release_date: z.string().nullable(),
    external_url: z.string().optional(),
})

const albumDetailSchema = z.object({
    type: z.literal('album'),
    id: z.string(),
    name: z.string(),
    image: z.string().nullable(),
    artists: z.array(artistRefSchema),
    release_date: z.string(),
    total_tracks: z.number(),
    album_type: z.string(),
    external_url: z.string().optional(),
})

const artistDetailSchema = z.object({
    type: z.literal('artist'),
    id: z.string(),
    name: z.string(),
    image: z.string().nullable(),
    genres: z.array(z.string()),
    popularity: z.number().nullable(),
    external_url: z.string().optional(),
})

export const itemDetailSchema = z.discriminatedUnion('type', [
    trackDetailSchema,
    albumDetailSchema,
    artistDetailSchema,
]) satisfies z.ZodType<ItemDetail>

// ---------------------------------------------------------------------------
// /spotify-discography
// ---------------------------------------------------------------------------

export const discographyResultSchema = z.object({
    albums: z.array(albumDetailSchema),
    singles: z.array(albumDetailSchema),
}) satisfies z.ZodType<DiscographyResult>

// ---------------------------------------------------------------------------
// /spotify-album-tracks
// ---------------------------------------------------------------------------

const albumTrackItemSchema = z.object({
    id: z.string(),
    name: z.string(),
    track_number: z.number(),
    duration_ms: z.number(),
    artists: z.array(artistRefSchema),
    external_url: z.string().optional(),
}) satisfies z.ZodType<AlbumTrackItem>

export const albumTracksResponseSchema = z.object({
    tracks: z.array(albumTrackItemSchema),
})

// ---------------------------------------------------------------------------

/**
 * Validate an edge-function response against its schema, throwing a labelled
 * error if the shape drifts. Keeps malformed data from silently flowing into
 * the UI as half-populated objects.
 */
export const parseEdgeResponse = <S extends z.ZodType>(
    schema: S,
    data: unknown,
    label: string
): z.infer<S> => {
    const result = schema.safeParse(data)
    if (!result.success) {
        throw new Error(
            `Malformed ${label} response from edge function:\n${z.prettifyError(result.error)}`
        )
    }
    return result.data
}
