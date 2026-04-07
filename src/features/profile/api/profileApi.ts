import { supabase } from '@/lib/supabase/client'
import type {
    Top5Category,
    Top5Item,
    RatingItem,
    DiaryEntry,
    DiaryAction,
    FollowRow,
    ReviewRow,
    PlaylistRow,
    PlaylistItemRow,
} from '@/features/profile/types/profile'

export const createProfile = async (id: string, username: string) => {
    const { error } = await supabase
        .from('profiles')
        .upsert({ id, username }, { onConflict: 'id', ignoreDuplicates: true })
    if (error) throw error
}

export const fetchProfile = async (id: string) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single()

    if (error) throw error
    return data
}

export const fetchProfileByUsername = async (username: string) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single()

    if (error) throw error
    return data
}

export const fetchTop5 = async (profileId: string) => {
    const { data, error } = await supabase
        .from('top5')
        .select('*')
        .eq('profile_id', profileId)
        .order('position')

    if (error) throw error
    return data
}

export const updateProfile = async (
    id: string,
    updates: { display_name?: string; bio?: string; avatar_url?: string }
) => {
    const payload: Record<string, string | null> = {}
    if (updates.display_name !== undefined) {
        payload.display_name =
            updates.display_name === '' ? null : updates.display_name
    }
    if (updates.bio !== undefined) {
        payload.bio = updates.bio === '' ? null : updates.bio
    }
    if (updates.avatar_url !== undefined) {
        payload.avatar_url =
            updates.avatar_url === '' ? null : updates.avatar_url
    }

    const { error } = await supabase
        .from('profiles')
        .update(payload)
        .eq('id', id)

    if (error) throw error
}

export const upsertTop5 = async (
    profileId: string,
    category: Top5Category,
    items: Omit<Top5Item, 'id'>[]
) => {
    const { error: deleteError } = await supabase
        .from('top5')
        .delete()
        .eq('profile_id', profileId)
        .eq('category', category)

    if (deleteError) throw deleteError

    if (items.length === 0) return

    const rows = items.map((item, index) => ({
        profile_id: profileId,
        category,
        position: index + 1,
        spotify_id: item.spotify_id,
        name: item.name,
        image_url: item.image_url,
        artist_name: item.artist_name,
    }))

    const { error: insertError } = await supabase.from('top5').insert(rows)

    if (insertError) throw insertError
}

export const fetchRatings = async (
    profileId: string
): Promise<RatingItem[]> => {
    const { data, error } = await supabase
        .from('ratings')
        .select(
            'id, item_type, spotify_id, name, image_url, artist_name, rating, updated_at, release_date'
        )
        .eq('profile_id', profileId)
        .order('updated_at', { ascending: false })

    if (error) throw error
    return data as RatingItem[]
}

export const fetchDiary = async (
    profileId: string,
    limit = 20,
    offset = 0
): Promise<DiaryEntry[]> => {
    const { data, error } = await supabase
        .from('diary')
        .select(
            'id, action, item_type, spotify_id, name, image_url, artist_name, rating, review_text, created_at'
        )
        .eq('profile_id', profileId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

    if (error) throw error
    return data as DiaryEntry[]
}

export const upsertRating = async (
    profileId: string,
    item: {
        item_type: 'track' | 'album'
        spotify_id: string
        name: string
        image_url: string | null
        artist_name: string | null
        release_date: string | null
    },
    rating: number
) => {
    const { error } = await supabase.from('ratings').upsert(
        {
            profile_id: profileId,
            item_type: item.item_type,
            spotify_id: item.spotify_id,
            name: item.name,
            image_url: item.image_url,
            artist_name: item.artist_name,
            release_date: item.release_date,
            rating,
            updated_at: new Date().toISOString(),
        },
        { onConflict: 'profile_id,item_type,spotify_id' }
    )

    if (error) throw error
}

export const deleteRating = async (
    profileId: string,
    itemType: 'track' | 'album',
    spotifyId: string
) => {
    const { error } = await supabase
        .from('ratings')
        .delete()
        .eq('profile_id', profileId)
        .eq('item_type', itemType)
        .eq('spotify_id', spotifyId)

    if (error) throw error
}

export const insertDiaryEntry = async (
    profileId: string,
    entry: {
        action: DiaryAction
        item_type: 'track' | 'album' | 'artist'
        spotify_id: string
        name: string
        image_url: string | null
        artist_name: string | null
        rating?: number | null
        review_text?: string | null
        created_at?: string
    }
) => {
    const { error } = await supabase.from('diary').insert({
        profile_id: profileId,
        action: entry.action,
        item_type: entry.item_type,
        spotify_id: entry.spotify_id,
        name: entry.name,
        image_url: entry.image_url,
        artist_name: entry.artist_name,
        rating: entry.rating ?? null,
        review_text: entry.review_text ?? null,
        ...(entry.created_at ? { created_at: entry.created_at } : {}),
    })

    if (error) throw error
}

// ---------------------------------------------------------------------------
// Follows
// ---------------------------------------------------------------------------

export const followUser = async (followerId: string, followingId: string) => {
    const { error } = await supabase
        .from('follows')
        .insert({ follower_id: followerId, following_id: followingId })
    if (error) throw error
}

export const unfollowUser = async (followerId: string, followingId: string) => {
    const { error } = await supabase
        .from('follows')
        .delete()
        .eq('follower_id', followerId)
        .eq('following_id', followingId)
    if (error) throw error
}

export const fetchFollowers = async (
    profileId: string
): Promise<FollowRow[]> => {
    const { data, error } = await supabase
        .from('follows')
        .select('*')
        .eq('following_id', profileId)
        .order('created_at', { ascending: false })
    if (error) throw error
    return data as FollowRow[]
}

export const fetchFollowing = async (
    profileId: string
): Promise<FollowRow[]> => {
    const { data, error } = await supabase
        .from('follows')
        .select('*')
        .eq('follower_id', profileId)
        .order('created_at', { ascending: false })
    if (error) throw error
    return data as FollowRow[]
}

export const isFollowing = async (
    followerId: string,
    followingId: string
): Promise<boolean> => {
    const { count, error } = await supabase
        .from('follows')
        .select('*', { count: 'exact', head: true })
        .eq('follower_id', followerId)
        .eq('following_id', followingId)
    if (error) throw error
    return (count ?? 0) > 0
}

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------

export const insertReview = async (
    profileId: string,
    review: {
        item_type: 'track' | 'album'
        spotify_id: string
        rating: number | null
        body: string
        name: string
        image_url: string | null
        artist_name: string | null
    }
) => {
    const { error } = await supabase.from('reviews').insert({
        profile_id: profileId,
        ...review,
    })
    if (error) throw error
}

export const fetchReviewsForItem = async (
    itemType: 'track' | 'album',
    spotifyId: string,
    limit = 20,
    offset = 0
): Promise<ReviewRow[]> => {
    const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('item_type', itemType)
        .eq('spotify_id', spotifyId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)
    if (error) throw error
    return data as ReviewRow[]
}

export const fetchUserReviews = async (
    profileId: string,
    limit = 20,
    offset = 0
): Promise<ReviewRow[]> => {
    const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('profile_id', profileId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)
    if (error) throw error
    return data as ReviewRow[]
}

export const deleteReview = async (reviewId: string) => {
    const { error } = await supabase.from('reviews').delete().eq('id', reviewId)
    if (error) throw error
}

export const fetchUserReviewsForItem = async (
    profileId: string,
    itemType: 'track' | 'album',
    spotifyId: string
): Promise<ReviewRow[]> => {
    const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('profile_id', profileId)
        .eq('item_type', itemType)
        .eq('spotify_id', spotifyId)
        .order('created_at', { ascending: false })
    if (error) throw error
    return data as ReviewRow[]
}

// ---------------------------------------------------------------------------
// Item Interactions (liked / listened / want_to_listen state)
// ---------------------------------------------------------------------------

export const fetchItemInteraction = async (
    profileId: string,
    itemType: 'track' | 'album' | 'artist',
    spotifyId: string
): Promise<{ liked: boolean; listened: boolean; want_to_listen: boolean }> => {
    const { data } = await supabase
        .from('item_interactions')
        .select('liked, listened, want_to_listen')
        .eq('profile_id', profileId)
        .eq('item_type', itemType)
        .eq('spotify_id', spotifyId)
        .maybeSingle()
    return data ?? { liked: false, listened: false, want_to_listen: false }
}

export const upsertItemInteraction = async (
    profileId: string,
    itemType: 'track' | 'album' | 'artist',
    spotifyId: string,
    patch: { liked?: boolean; listened?: boolean; want_to_listen?: boolean }
) => {
    const { error } = await supabase.from('item_interactions').upsert(
        {
            profile_id: profileId,
            item_type: itemType,
            spotify_id: spotifyId,
            ...patch,
            updated_at: new Date().toISOString(),
        },
        { onConflict: 'profile_id,item_type,spotify_id' }
    )
    if (error) throw error
}

export const deleteItemDiaryEntriesByAction = async (
    profileId: string,
    itemType: 'track' | 'album' | 'artist',
    spotifyId: string,
    action: 'rated' | 'liked' | 'listened' | 'want_to_listen' | 'reviewed'
): Promise<void> => {
    const { error } = await supabase
        .from('diary')
        .delete()
        .eq('profile_id', profileId)
        .eq('item_type', itemType)
        .eq('spotify_id', spotifyId)
        .eq('action', action)
    if (error) throw error
}

export const fetchItemRating = async (
    profileId: string,
    itemType: 'track' | 'album',
    spotifyId: string
): Promise<number | null> => {
    const { data } = await supabase
        .from('ratings')
        .select('rating')
        .eq('profile_id', profileId)
        .eq('item_type', itemType)
        .eq('spotify_id', spotifyId)
        .maybeSingle()
    return data?.rating ?? null
}

// ---------------------------------------------------------------------------
// Playlists
// ---------------------------------------------------------------------------

export const createPlaylist = async (
    profileId: string,
    title: string,
    description?: string
): Promise<PlaylistRow> => {
    const { data, error } = await supabase
        .from('playlists')
        .insert({
            profile_id: profileId,
            title,
            description: description ?? null,
        })
        .select()
        .single()
    if (error) throw error
    return data as PlaylistRow
}

export const fetchPlaylists = async (
    profileId: string
): Promise<PlaylistRow[]> => {
    const { data, error } = await supabase
        .from('playlists')
        .select('*')
        .eq('profile_id', profileId)
        .order('updated_at', { ascending: false })
    if (error) throw error
    return data as PlaylistRow[]
}

export const updatePlaylist = async (
    playlistId: string,
    updates: { title?: string; description?: string; is_public?: boolean }
) => {
    const { error } = await supabase
        .from('playlists')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', playlistId)
    if (error) throw error
}

export const deletePlaylist = async (playlistId: string) => {
    const { error } = await supabase
        .from('playlists')
        .delete()
        .eq('id', playlistId)
    if (error) throw error
}

export const fetchPlaylistItems = async (
    playlistId: string
): Promise<PlaylistItemRow[]> => {
    const { data, error } = await supabase
        .from('playlist_items')
        .select('*')
        .eq('playlist_id', playlistId)
        .order('position')
    if (error) throw error
    return data as PlaylistItemRow[]
}

export const addPlaylistItem = async (
    playlistId: string,
    item: {
        position: number
        item_type: 'track' | 'album'
        spotify_id: string
        name: string
        image_url: string | null
        artist_name: string | null
    }
) => {
    const { error } = await supabase.from('playlist_items').insert({
        playlist_id: playlistId,
        ...item,
    })
    if (error) throw error
}

export const removePlaylistItem = async (itemId: string) => {
    const { error } = await supabase
        .from('playlist_items')
        .delete()
        .eq('id', itemId)
    if (error) throw error
}
