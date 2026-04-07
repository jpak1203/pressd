import { supabase } from '@/lib/supabase/client'
import type { MemberCardItem, MemberRow, MemberTimeFrame } from '@/features/members/types/members'

export const timeFrameToSince = (tf: MemberTimeFrame): string | null => {
    if (tf === 'all') return null
    const days = { week: 7, month: 30, year: 365 }[tf]
    return new Date(Date.now() - days * 86_400_000).toISOString()
}

export const fetchMembersGrid = async (
    since: string | null,
    limitCount: number
): Promise<MemberCardItem[]> => {
    const { data, error } = await supabase.rpc('get_popular_member_cards', {
        since,
        limit_count: limitCount,
    })
    if (error) throw new Error(error.message)
    return (data ?? []).map((row: {
        id: string
        username: string
        display_name: string | null
        avatar_url: string | null
        follower_count: number
    }) => ({
        id: row.id,
        username: row.username,
        display_name: row.display_name,
        avatar_url: row.avatar_url,
        follower_count: row.follower_count,
    }))
}

export const fetchMembersList = async (options: {
    since: string | null
    sortBy: 'popularity' | 'timeframe'
    limit: number
    offset: number
    query: string
}): Promise<MemberRow[]> => {
    const { data, error } = await supabase.rpc('get_members_list', {
        since: options.since,
        sort_by: options.sortBy,
        limit_count: options.limit,
        offset_count: options.offset,
        query_filter: options.query,
    })
    if (error) throw new Error(error.message)
    return (data ?? []).map((row: {
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
    }) => ({
        id: row.id,
        username: row.username,
        display_name: row.display_name,
        avatar_url: row.avatar_url,
        bio: row.bio,
        tracks_listened: row.tracks_listened,
        albums_listened: row.albums_listened,
        tracks_liked: row.tracks_liked,
        albums_liked: row.albums_liked,
        public_playlists: row.public_playlists,
        new_followers: row.new_followers,
        total_followers: row.total_followers,
    }))
}
