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
import { TrackList } from '@/features/tracks/components/track-list/TrackList'
import { useTracksList } from '@/features/tracks/hooks/useTracksList'
import type { ItemFilterState } from '@/components/item-filter-bar/ItemFilterBar'
import type {
    TrackDecadeFilter,
    TrackRatingFilter,
    TrackPopularity,
} from '@/features/tracks/types/tracks'

const VALID_DECADES: TrackDecadeFilter[] = [
    '1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s', 'upcoming',
]
const VALID_RATINGS: TrackRatingFilter[] = ['highest', 'lowest', 'highest-by-me', 'lowest-by-me']
const VALID_POPULARITY: TrackPopularity[] = ['week', 'month', 'year', 'all']

const parseDecade = (v: string | null): TrackDecadeFilter | null =>
    v && (VALID_DECADES as string[]).includes(v) ? (v as TrackDecadeFilter) : null
const parseRating = (v: string | null): TrackRatingFilter | null =>
    v && (VALID_RATINGS as string[]).includes(v) ? (v as TrackRatingFilter) : null
const parsePopularity = (v: string | null): TrackPopularity | null =>
    v && (VALID_POPULARITY as string[]).includes(v) ? (v as TrackPopularity) : null

export const TracksSearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const filters: ItemFilterState = {
        decade: parseDecade(searchParams.get('decade')),
        rating: parseRating(searchParams.get('rating')),
        popularity: parsePopularity(searchParams.get('popularity')),
    }

    const { tracks, isLoading, hasMore, setQuery, query } = useTracksList(filters)

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
    const headingText = activeCount > 0 ? 'Filtered Tracks' : 'Browse Tracks'

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
                            tracks
                        </Text>
                        <Heading size="xl" color="var(--pressd-text)" fontWeight="700">
                            {headingText}
                        </Heading>
                    </Box>

                    <Input
                        placeholder="Search tracks…"
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

                    <TrackList tracks={tracks} isLoading={isLoading} />

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
