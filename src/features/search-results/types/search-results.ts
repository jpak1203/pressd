import type { ReactNode } from 'react'
import type { ItemDetail, ItemType } from '@/features/detail/types/detail'

export type SearchFilter =
    | 'all'
    | 'tracks'
    | 'albums'
    | 'artists'
    | 'playlists'
    | 'members'

export type UserSearchResult = {
    id: string
    username: string
    avatar_url: string | null
    bio: string | null
}

export type PlaylistSearchResult = {
    id: string
    name: string
    description: string | null
    owner_username: string
    image_url: string | null
    track_count: number
}

export type SearchItemRowType = {
    id: string
    title: string
    image: string | null
    rating?: number | null
    showRating: boolean
    itemType: ItemType
    stateData: ItemDetail
}

export type ResultsListType = {
    title: string
    emptyText: string
    children: ReactNode
    isEmpty: boolean
    seeAllHref?: string
}
