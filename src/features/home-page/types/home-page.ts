import type { ItemDetail } from '@/features/detail/types/detail'

export type RowModuleData = {
    items: ItemDetail[]
    moreHref?: string
}

export type FeaturedReviewItem = {
    id: string
    reviewer: {
        name: string
        avatarUrl: string
        href: string
    }
    song: {
        title: string
        artist: {
            name: string
            href: string
        }
        releaseYear: number
        artworkUrl: string
        href: string
    }
    userRating: number
    reviewText: string
    reviewLikes: number
}

export type GridModuleData = {
    items: FeaturedReviewItem[]
    moreHref?: string
}
