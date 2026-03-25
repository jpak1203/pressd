export type Top5Category = 'album' | 'artist' | 'track'

export type Top5Item = {
    id: string
    position: number
    spotify_id: string
    name: string
    image_url: string | null
    artist_name: string | null
}

export type ProfileData = {
    id: string
    username: string
    display_name: string | null
    bio: string | null
    avatar_url: string | null
    created_at: string
}

export type ProfileWithTop5 = {
    profile: ProfileData
    top5Albums: Top5Item[]
    top5Artists: Top5Item[]
    top5Tracks: Top5Item[]
}

export type RatingItem = {
    id: string
    item_type: 'track' | 'album'
    spotify_id: string
    name: string
    image_url: string | null
    artist_name: string | null
    rating: number
    updated_at: string
    release_date: string | null
}

export type RatingSortOption =
    | 'newest'
    | 'oldest'
    | 'release_date'
    | 'rating_high'
    | 'rating_low'

export type DiaryAction =
    | 'rated'
    | 'liked'
    | 'listened'
    | 'want_to_listen'
    | 'reviewed'

export type DiaryEntry = {
    id: string
    action: DiaryAction
    item_type: 'track' | 'album' | 'artist'
    spotify_id: string
    name: string
    image_url: string | null
    artist_name: string | null
    rating: number | null
    review_text: string | null
    created_at: string
}

export type FullProfileData = ProfileWithTop5 & {
    ratings: RatingItem[]
    diary: DiaryEntry[]
}

export type FollowRow = {
    follower_id: string
    following_id: string
    created_at: string
}

export type ReviewRow = {
    id: string
    profile_id: string
    item_type: 'track' | 'album'
    spotify_id: string
    rating: number | null
    body: string
    created_at: string
    name: string
    image_url: string | null
    artist_name: string | null
}

export type PlaylistRow = {
    id: string
    profile_id: string
    title: string
    description: string | null
    is_public: boolean
    created_at: string
    updated_at: string
}

export type PlaylistItemRow = {
    id: string
    playlist_id: string
    position: number
    item_type: 'track' | 'album'
    spotify_id: string
    name: string
    image_url: string | null
    artist_name: string | null
    added_at: string
}

export type TagRow = {
    id: string
    name: string
    created_at: string
}
