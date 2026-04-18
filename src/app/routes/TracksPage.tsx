import { Box, Container, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router'
import { ItemFilterBar } from '@/components/item-filter-bar/ItemFilterBar'
import { PopularItemsModule } from '@/components/popular-items-module/PopularItemsModule'
import RowModule from '@/features/home-page/components/row-module/RowModule'
import {
    featuredTracksData,
    recentlyReviewedTracksData,
    popularTracksThisWeek,
} from '@/features/tracks/data/tracksData'
import type { ItemFilterState } from '@/components/item-filter-bar/ItemFilterBar'

const EMPTY_FILTERS: ItemFilterState = { decade: null, rating: null, popularity: null }

export const TracksPage = () => {
    const navigate = useNavigate()

    const handleFilterChange = (filters: ItemFilterState) => {
        const params = new URLSearchParams()
        if (filters.decade) params.set('decade', filters.decade)
        if (filters.rating) params.set('rating', filters.rating)
        if (filters.popularity) params.set('popularity', filters.popularity)
        void navigate(`/tracks/search?${params.toString()}`)
    }

    return (
        <Box minH="100%" py={{ base: '5', md: '7' }}>
            <Container maxW="1200px" px={{ base: '4', md: '7' }}>
                <VStack align="stretch" gap={{ base: '10', md: '12' }}>
                    <ItemFilterBar filters={EMPTY_FILTERS} onChange={handleFilterChange} />
                    <RowModule
                        data={featuredTracksData}
                        headerText="Featured Tracks"
                        showMore={false}
                    />
                    <RowModule
                        data={recentlyReviewedTracksData}
                        headerText="Recently Reviewed"
                        showMore={false}
                    />
                    <PopularItemsModule
                        items={popularTracksThisWeek}
                        headerText="Popular This Week"
                        moreHref="/tracks/search?popularity=week"
                    />
                </VStack>
            </Container>
        </Box>
    )
}
