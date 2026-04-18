import { Box, Container, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router'
import { ItemFilterBar } from '@/components/item-filter-bar/ItemFilterBar'
import { PopularItemsModule } from '@/components/popular-items-module/PopularItemsModule'
import RowModule from '@/features/home-page/components/row-module/RowModule'
import {
    featuredAlbumsData,
    recentlyReviewedAlbumsData,
    popularAlbumsThisWeek,
} from '@/features/albums/data/albumsData'
import type { ItemFilterState } from '@/components/item-filter-bar/ItemFilterBar'

const EMPTY_FILTERS: ItemFilterState = { decade: null, rating: null, popularity: null }

export const AlbumsPage = () => {
    const navigate = useNavigate()

    const handleFilterChange = (filters: ItemFilterState) => {
        const params = new URLSearchParams()
        if (filters.decade) params.set('decade', filters.decade)
        if (filters.rating) params.set('rating', filters.rating)
        if (filters.popularity) params.set('popularity', filters.popularity)
        void navigate(`/albums/search?${params.toString()}`)
    }

    return (
        <Box minH="100%" py={{ base: '5', md: '7' }}>
            <Container maxW="1200px" px={{ base: '4', md: '7' }}>
                <VStack align="stretch" gap={{ base: '10', md: '12' }}>
                    <ItemFilterBar filters={EMPTY_FILTERS} onChange={handleFilterChange} />
                    <RowModule
                        data={featuredAlbumsData}
                        headerText="Featured Albums"
                        showMore={false}
                    />
                    <RowModule
                        data={recentlyReviewedAlbumsData}
                        headerText="Recently Reviewed"
                        showMore={false}
                    />
                    <PopularItemsModule
                        items={popularAlbumsThisWeek}
                        headerText="Popular This Week"
                        moreHref="/albums/search?popularity=week"
                    />
                </VStack>
            </Container>
        </Box>
    )
}
