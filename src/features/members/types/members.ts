export type MemberTimeFrame = 'week' | 'month' | 'year' | 'all'

export type MemberCardItem = {
    id: string
    username: string
    display_name: string | null
    avatar_url: string | null
    follower_count: number
}

export type MemberRow = {
    id: string
    username: string
    display_name: string | null
    avatar_url: string | null
    bio: string | null
    tracks_listened: number
    albums_listened: number
    tracks_liked: number
    albums_liked: number
    public_playlists: number
    new_followers: number
    total_followers: number
}
