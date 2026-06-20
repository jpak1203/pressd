import { Box, Container, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router'
import { ItemFilterBar } from '@/components/item-filter-bar/ItemFilterBar'
import { PopularItemsModule } from '@/components/popular-items-module/PopularItemsModule'
import RowModule from '@/features/home-page/components/row-module/RowModule'
import {
    EMPTY_ITEM_FILTERS,
    type ItemFilters,
} from '@/components/item-filter-bar/types'
import {
    featuredTracksData,
    recentlyReviewedTracksData,
    popularTracksThisWeek,
} from '@/features/tracks/data/tracksData'
import {
    featuredAlbumsData,
    recentlyReviewedAlbumsData,
    popularAlbumsThisWeek,
} from '@/features/albums/data/albumsData'
import type { ItemKind } from '@/features/items/hooks/useItemList'

type BrowseConfig = {
    featured: typeof featuredTracksData | typeof featuredAlbumsData
    recentlyReviewed: typeof recentlyReviewedTracksData | typeof recentlyReviewedAlbumsData
    popular: typeof popularTracksThisWeek | typeof popularAlbumsThisWeek
    featuredHeader: string
    searchPath: string
}

const CONFIG: Record<ItemKind, BrowseConfig> = {
    track: {
        featured: featuredTracksData,
        recentlyReviewed: recentlyReviewedTracksData,
        popular: popularTracksThisWeek,
        featuredHeader: 'Featured Tracks',
        searchPath: '/tracks/search',
    },
    album: {
        featured: featuredAlbumsData,
        recentlyReviewed: recentlyReviewedAlbumsData,
        popular: popularAlbumsThisWeek,
        featuredHeader: 'Featured Albums',
        searchPath: '/albums/search',
    },
}

type ItemBrowsePageProps = {
    kind: ItemKind
}

export const ItemBrowsePage = ({ kind }: ItemBrowsePageProps) => {
    const navigate = useNavigate()
    const config = CONFIG[kind]

    const handleFilterChange = (filters: ItemFilters) => {
        const params = new URLSearchParams()
        if (filters.decade) params.set('decade', filters.decade)
        if (filters.rating) params.set('rating', filters.rating)
        if (filters.popularity) params.set('popularity', filters.popularity)
        const qs = params.toString()
        void navigate(qs ? `${config.searchPath}?${qs}` : config.searchPath)
    }

    return (
        <Box minH="100%" py={{ base: '5', md: '7' }}>
            <Container maxW="1200px" px={{ base: '4', md: '7' }}>
                <VStack align="stretch" gap={{ base: '10', md: '12' }}>
                    <ItemFilterBar
                        filters={EMPTY_ITEM_FILTERS}
                        onChange={handleFilterChange}
                    />
                    <RowModule
                        data={config.featured}
                        headerText={config.featuredHeader}
                        showMore={false}
                    />
                    <RowModule
                        data={config.recentlyReviewed}
                        headerText="Recently Reviewed"
                        showMore={false}
                    />
                    <PopularItemsModule
                        items={config.popular}
                        headerText="Popular This Week"
                        moreHref={config.searchPath}
                    />
                </VStack>
            </Container>
        </Box>
    )
}
