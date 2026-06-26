import { Box, Container, Heading, Input, Text, VStack } from '@chakra-ui/react'
import { useSearchParams } from 'react-router'
import { useEffect, useState } from 'react'
import { MemberTimeFilterPills } from '@/features/members/components/member-time-filter-pills/MemberTimeFilterPills'
import { PlaylistList } from '@/features/playlists/components/playlist-list/PlaylistList'
import { usePlaylistsList } from '@/features/playlists/hooks/usePlaylistsList'
import type { PlaylistTimeFrame } from '@/features/playlists/types/playlists'

const VALID_FILTERS: PlaylistTimeFrame[] = ['week', 'month', 'year', 'all']

const parseFilter = (raw: string | null): PlaylistTimeFrame => {
    if (raw && (VALID_FILTERS as string[]).includes(raw))
        return raw as PlaylistTimeFrame
    return 'week'
}

export const PlaylistsSearchPage = () => {
    const [searchParams] = useSearchParams()
    const qParam = searchParams.get('q') ?? ''
    const [query, setQuery] = useState(qParam)
    const activeFilter = parseFilter(searchParams.get('filter'))

    useEffect(() => {
        setQuery(qParam)
    }, [qParam])

    const { data, isLoading } = usePlaylistsList({
        timeFrame: activeFilter,
        query,
    })

    const trimmed = query.trim()

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
                            playlists
                        </Text>
                        <Heading
                            size="xl"
                            color="var(--pressd-text)"
                            fontWeight="700"
                        >
                            {trimmed
                                ? `Results for "${trimmed}"`
                                : 'Browse Playlists'}
                        </Heading>
                    </Box>

                    <Input
                        placeholder="Search playlists…"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        bg="var(--pressd-surface)"
                        border="1px solid var(--pressd-border)"
                        borderRadius="10px"
                        color="var(--pressd-text)"
                        _placeholder={{ color: 'var(--pressd-text-muted)' }}
                        _focus={{
                            borderColor: 'var(--pressd-accent)',
                            outline: 'none',
                        }}
                        px="4"
                        h="44px"
                    />

                    <MemberTimeFilterPills
                        activeFilter={activeFilter}
                        onChange={() => {}}
                        disabled
                    />

                    <PlaylistList playlists={data} isLoading={isLoading} />
                </VStack>
            </Container>
        </Box>
    )
}
