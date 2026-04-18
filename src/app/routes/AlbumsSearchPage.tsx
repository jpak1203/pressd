import {
    Box,
    Button,
    Center,
    Container,
    Heading,
    Input,
    Text,
    VStack,
} from '@chakra-ui/react'
import { useSearchParams } from 'react-router'
import { ItemFilterBar } from '@/components/item-filter-bar/ItemFilterBar'
import { AlbumList } from '@/features/albums/components/album-list/AlbumList'
import { useAlbumsList } from '@/features/albums/hooks/useAlbumsList'
import type { ItemFilterState } from '@/components/item-filter-bar/ItemFilterBar'
import type {
    AlbumDecadeFilter,
    AlbumRatingFilter,
    AlbumPopularity,
} from '@/features/albums/types/albums'

const VALID_DECADES: AlbumDecadeFilter[] = [
    '1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s', 'upcoming',
]
const VALID_RATINGS: AlbumRatingFilter[] = ['highest', 'lowest', 'highest-by-me', 'lowest-by-me']
const VALID_POPULARITY: AlbumPopularity[] = ['week', 'month', 'year', 'all']

const parseDecade = (v: string | null): AlbumDecadeFilter | null =>
    v && (VALID_DECADES as string[]).includes(v) ? (v as AlbumDecadeFilter) : null
const parseRating = (v: string | null): AlbumRatingFilter | null =>
    v && (VALID_RATINGS as string[]).includes(v) ? (v as AlbumRatingFilter) : null
const parsePopularity = (v: string | null): AlbumPopularity | null =>
    v && (VALID_POPULARITY as string[]).includes(v) ? (v as AlbumPopularity) : null

export const AlbumsSearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const filters: ItemFilterState = {
        decade: parseDecade(searchParams.get('decade')),
        rating: parseRating(searchParams.get('rating')),
        popularity: parsePopularity(searchParams.get('popularity')),
    }

    const { albums, isLoading, hasMore, setQuery, query } = useAlbumsList(filters)

    const handleFilterChange = (next: ItemFilterState) => {
        setSearchParams((prev) => {
            const p = new URLSearchParams(prev)
            if (next.decade) p.set('decade', next.decade)
            else p.delete('decade')
            if (next.rating) p.set('rating', next.rating)
            else p.delete('rating')
            if (next.popularity) p.set('popularity', next.popularity)
            else p.delete('popularity')
            return p
        })
    }

    const activeCount = [filters.decade, filters.rating, filters.popularity].filter(Boolean).length
    const headingText = activeCount > 0 ? 'Filtered Albums' : 'Browse Albums'

    return (
        <Box minH="100%" py={{ base: '5', md: '7' }}>
            <Container maxW="1200px" px={{ base: '4', md: '7' }}>
                <VStack align="stretch" gap={{ base: '5', md: '6' }}>
                    <Box>
                        <Text
                            fontSize="11px"
                            textTransform="uppercase"
                            className="pressd-mono"
                            letterSpacing="0.08em"
                            color="var(--pressd-text-muted)"
                            mb="1"
                        >
                            albums
                        </Text>
                        <Heading size="xl" color="var(--pressd-text)" fontWeight="700">
                            {headingText}
                        </Heading>
                    </Box>

                    <Input
                        placeholder="Search albums…"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        bg="var(--pressd-surface)"
                        border="1px solid var(--pressd-border)"
                        borderRadius="10px"
                        color="var(--pressd-text)"
                        _placeholder={{ color: 'var(--pressd-text-muted)' }}
                        _focus={{ borderColor: 'var(--pressd-accent)', outline: 'none' }}
                        px="4"
                        h="44px"
                    />

                    <ItemFilterBar filters={filters} onChange={handleFilterChange} />

                    <AlbumList albums={albums} isLoading={isLoading} />

                    {hasMore && (
                        <Center>
                            <Button
                                size="md"
                                className="pressd-mono"
                                fontSize="11px"
                                textTransform="uppercase"
                                letterSpacing="0.1em"
                                bg="var(--pressd-surface)"
                                color="var(--pressd-text-muted)"
                                border="1px solid var(--pressd-border)"
                                borderRadius="9999px"
                                px="8"
                                _hover={{
                                    bg: 'var(--pressd-surface-2)',
                                    borderColor: 'var(--pressd-accent-dim)',
                                    color: 'var(--pressd-text)',
                                }}
                                transition="all 0.15s ease"
                            >
                                Load More
                            </Button>
                        </Center>
                    )}
                </VStack>
            </Container>
        </Box>
    )
}
