import type { ItemType } from '@/features/detail/types/detail'

export type Top5Category = 'album' | 'artist' | 'track'

type MusicItemRef = {
    spotify_id: string
    name: string
    image_url: string | null
    artist_name: string | null
}

export type Top5Item = MusicItemRef & {
    id: string
    position: number
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

export type RatingItem = MusicItemRef & {
    id: string
    item_type: 'track' | 'album'
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

export type DiaryEntry = MusicItemRef & {
    id: string
    action: DiaryAction
    item_type: ItemType
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

export type ReviewRow = MusicItemRef & {
    id: string
    profile_id: string
    item_type: 'track' | 'album'
    rating: number | null
    body: string
    created_at: string
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

export type PlaylistItemRow = MusicItemRef & {
    id: string
    playlist_id: string
    position: number
    item_type: 'track' | 'album'
    added_at: string
}

export type TagRow = {
    id: string
    name: string
    created_at: string
}
