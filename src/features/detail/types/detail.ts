export type ItemType = 'track' | 'album' | 'artist'

export type TrackDetail = {
    type: 'track'
    id: string
    name: string
    image: string | null
    artists: Array<{ id: string; name: string }>
    album: { id: string; name: string }
    duration_ms: number
    release_date: string | null
    external_url?: string
}

export type AlbumDetail = {
    type: 'album'
    id: string
    name: string
    image: string | null
    artists: Array<{ id: string; name: string }>
    release_date: string
    total_tracks: number
    album_type: string
    external_url?: string
}

export type ArtistDetail = {
    type: 'artist'
    id: string
    name: string
    image: string | null
    genres: string[]
    popularity: number | null
    external_url?: string
}

export type ItemDetail = TrackDetail | AlbumDetail | ArtistDetail

export type DiscographyResult = {
	albums: AlbumDetail[];
	singles: AlbumDetail[];
};

export type AlbumTrackItem = {
    id: string
    name: string
    track_number: number
    duration_ms: number
    artists: Array<{ id: string; name: string }>
    external_url?: string
}

export type Review = {
    id: string
    text: string
    rating: number | null
    date: string
}

export type LogEntry = {
    id: string
    date: string
}

export type ItemInteraction = {
    rating: number | null
    liked: boolean
    listened: boolean
    wantToListen: boolean
    reviews: Review[]
    logEntries: LogEntry[]
}
