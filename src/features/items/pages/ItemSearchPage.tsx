import { Box, Container, Heading, Input, Text, VStack } from '@chakra-ui/react'
import { useSearchParams } from 'react-router'
import { ItemFilterBar } from '@/components/item-filter-bar/ItemFilterBar'
import {
    parseDecade,
    parseRating,
    parsePopularity,
    type ItemFilters,
} from '@/components/item-filter-bar/types'
import { ItemList } from '@/features/items/components/item-list/ItemList'
import { useItemList, type ItemKind } from '@/features/items/hooks/useItemList'
import { popularTracksThisWeek } from '@/features/tracks/data/tracksData'
import { popularAlbumsThisWeek } from '@/features/albums/data/albumsData'

type SearchConfig = {
    label: string
    placeholder: string
    browseHeading: string
    filteredHeading: string
    emptyText: string
}

const CONFIG: Record<ItemKind, SearchConfig> = {
    track: {
        label: 'tracks',
        placeholder: 'Search tracks…',
        browseHeading: 'Browse Tracks',
        filteredHeading: 'Filtered Tracks',
        emptyText: 'No tracks found',
    },
    album: {
        label: 'albums',
        placeholder: 'Search albums…',
        browseHeading: 'Browse Albums',
        filteredHeading: 'Filtered Albums',
        emptyText: 'No albums found',
    },
}

type ItemSearchPageProps = {
    kind: ItemKind
}

export const ItemSearchPage = ({ kind }: ItemSearchPageProps) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const config = CONFIG[kind]

    const filters: ItemFilters = {
        decade: parseDecade(searchParams.get('decade')),
        rating: parseRating(searchParams.get('rating')),
        popularity: parsePopularity(searchParams.get('popularity')),
    }

    const fallback = kind === 'track' ? popularTracksThisWeek : popularAlbumsThisWeek
    const { items, isLoading, setQuery, query } = useItemList({ kind, filters, fallback })

    const handleFilterChange = (next: ItemFilters) => {
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

    const trimmed = query.trim()
    const activeCount = [filters.decade, filters.rating, filters.popularity].filter(Boolean).length
    const headingText = trimmed
        ? `Results for "${trimmed}"`
        : activeCount > 0
          ? config.filteredHeading
          : config.browseHeading

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
                            {config.label}
                        </Text>
                        <Heading size="xl" color="var(--pressd-text)" fontWeight="700">
                            {headingText}
                        </Heading>
                    </Box>

                    <Input
                        placeholder={config.placeholder}
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

                    <ItemList items={items} isLoading={isLoading} emptyText={config.emptyText} />
                </VStack>
            </Container>
        </Box>
    )
}
