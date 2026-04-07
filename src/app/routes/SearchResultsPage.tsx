import { useMemo } from 'react'
import { useAverageRatings } from '@/features/home-page/hooks/useAverageRatings'
import type { ItemDetail } from '@/features/detail/types/detail'
import { useSearchParams } from 'react-router'
import {
    Box,
    Button,
    Center,
    Container,
    Flex,
    Heading,
    HStack,
    Spinner,
    Text,
    VStack,
} from '@chakra-ui/react'
import { useUnifiedSearch } from '@/features/search-results/hooks/useUnifiedSearch'
import { SearchFilterPills } from '@/features/search-results/components/search-filter-pills/SearchFilterPills'
import { SearchSection } from '@/features/search-results/components/search-section/SearchSection'
import SearchLoadingList from '@/features/search-results/components/search-loading-list/SearchLoadingList'
import SearchResultsRow from '@/features/search-results/components/search-results-row/SearchResultsRow'
import SearchResultsList from '@/features/search-results/components/search-results-list/SearchResultsList'
import { UserSearchRow } from '@/features/search-results/components/user-search-row/UserSearchRow'
import { PlaylistSearchRow } from '@/features/search-results/components/playlist-search-row/PlaylistSearchRow'
import type { SearchFilter } from '@/features/search-results/types/search-results'

const VALID_FILTERS = new Set<SearchFilter>([
    'all',
    'tracks',
    'albums',
    'artists',
    'playlists',
    'members',
])

const parseFilter = (value: string | null): SearchFilter => {
    if (value && VALID_FILTERS.has(value as SearchFilter)) {
        return value as SearchFilter
    }
    return 'all'
}

const SearchResultsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const queryFromUrl = searchParams.get('query') ?? ''
    const filter = parseFilter(searchParams.get('filter'))

    const { spotify, users, playlists, isAnyLoading } = useUnifiedSearch(
        queryFromUrl,
        filter
    )

    const setFilter = (newFilter: SearchFilter) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev)
            if (newFilter === 'all') {
                next.delete('filter')
            } else {
                next.set('filter', newFilter)
            }
            return next
        })
    }

    const isAll = filter === 'all'
    const hasQuery = queryFromUrl.length >= 2
    const showSpotifyLoading =
        spotify.isLoading || (spotify.data === null && hasQuery)

    const ratableItems = useMemo<ItemDetail[]>(() => {
        if (!spotify.data) return []
        const tracks: ItemDetail[] = spotify.data.tracks.map((t) => ({
            type: 'track' as const,
            id: t.id,
            name: t.name,
            image: t.image_url ?? t.album.image,
            artists: t.artists,
            album: { id: t.album.id, name: t.album.name },
            duration_ms: t.duration_ms,
            release_date: t.release_date ?? null,
            external_url: t.external_url,
        }))
        const albums: ItemDetail[] = spotify.data.albums.map((a) => ({
            type: 'album' as const,
            id: a.id,
            name: a.name,
            image: a.image,
            artists: a.artists,
            release_date: a.release_date,
            total_tracks: a.total_tracks,
            album_type: a.album_type,
            external_url: a.external_url,
        }))
        return [...tracks, ...albums]
    }, [spotify.data])

    const { ratings: avgRatings } = useAverageRatings(ratableItems)

    const trackRows = spotify.data?.tracks.map((track) => (
        <SearchResultsRow
            key={track.id}
            id={track.id}
            title={track.name}
            image={track.album.image}
            rating={avgRatings.get(`track:${track.id}`)}
            showRating
            itemType="track"
            stateData={{
                type: 'track',
                id: track.id,
                name: track.name,
                image: track.image_url ?? track.album.image,
                artists: track.artists,
                album: { id: track.album.id, name: track.album.name },
                duration_ms: track.duration_ms,
                release_date: track.release_date ?? null,
                external_url: track.external_url,
            }}
        />
    ))

    const albumRows = spotify.data?.albums.map((album) => (
        <SearchResultsRow
            key={album.id}
            id={album.id}
            title={album.name}
            image={album.image}
            rating={avgRatings.get(`album:${album.id}`)}
            showRating
            itemType="album"
            stateData={{
                type: 'album',
                id: album.id,
                name: album.name,
                image: album.image,
                artists: album.artists,
                release_date: album.release_date,
                total_tracks: album.total_tracks,
                album_type: album.album_type,
                external_url: album.external_url,
            }}
        />
    ))

    const artistRows = spotify.data?.artists.map((artist) => (
        <SearchResultsRow
            key={artist.id}
            id={artist.id}
            title={artist.name}
            image={artist.image}
            showRating={false}
            itemType="artist"
            stateData={{
                type: 'artist',
                id: artist.id,
                name: artist.name,
                image: artist.image,
                genres: artist.genres,
                popularity: artist.popularity,
                external_url: artist.external_url,
            }}
        />
    ))

    const userRows = users.data.map((user) => (
        <UserSearchRow key={user.id} user={user} />
    ))

    const playlistRows = playlists.data.map((playlist) => (
        <PlaylistSearchRow key={playlist.id} playlist={playlist} />
    ))

    const renderAllView = () => (
        <VStack align="stretch" gap="4">
            {showSpotifyLoading ? (
                <>
                    <SearchLoadingList title="tracks" />
                    <SearchLoadingList title="albums" />
                    <SearchLoadingList title="artists" />
                </>
            ) : (
                <>
                    <SearchSection
                        title="tracks"
                        emptyText="No tracks found."
                        isEmpty={(spotify.data?.tracks.length ?? 0) === 0}
                        seeAllHref={`/search?filter=tracks&query=${encodeURIComponent(queryFromUrl)}`}
                        showSeeAll={(spotify.data?.tracks.length ?? 0) > 0}
                    >
                        {trackRows}
                    </SearchSection>
                    <SearchSection
                        title="albums"
                        emptyText="No albums found."
                        isEmpty={(spotify.data?.albums.length ?? 0) === 0}
                        seeAllHref={`/search?filter=albums&query=${encodeURIComponent(queryFromUrl)}`}
                        showSeeAll={(spotify.data?.albums.length ?? 0) > 0}
                    >
                        {albumRows}
                    </SearchSection>
                    <SearchSection
                        title="artists"
                        emptyText="No artists found."
                        isEmpty={(spotify.data?.artists.length ?? 0) === 0}
                        seeAllHref={`/search?filter=artists&query=${encodeURIComponent(queryFromUrl)}`}
                        showSeeAll={(spotify.data?.artists.length ?? 0) > 0}
                    >
                        {artistRows}
                    </SearchSection>
                </>
            )}
            {users.isLoading ? (
                <SearchLoadingList title="members" />
            ) : (
                <SearchSection
                    title="members"
                    emptyText="No members found."
                    isEmpty={users.data.length === 0}
                    seeAllHref={`/members/search?q=${encodeURIComponent(queryFromUrl)}`}
                    showSeeAll={users.data.length > 0}
                >
                    {userRows}
                </SearchSection>
            )}
            {playlists.isLoading ? (
                <SearchLoadingList title="playlists" />
            ) : (
                <SearchSection
                    title="playlists"
                    emptyText="No playlists found."
                    isEmpty={playlists.data.length === 0}
                    seeAllHref={`/search?filter=playlists&query=${encodeURIComponent(queryFromUrl)}`}
                    showSeeAll={playlists.data.length > 0}
                >
                    {playlistRows}
                </SearchSection>
            )}
        </VStack>
    )

    const renderSingleCategory = () => {
        if (filter === 'tracks') {
            return showSpotifyLoading ? (
                <SearchLoadingList title="tracks" />
            ) : (
                <SearchResultsList
                    title="tracks"
                    emptyText="No tracks found."
                    isEmpty={(spotify.data?.tracks.length ?? 0) === 0}
                >
                    {trackRows}
                </SearchResultsList>
            )
        }
        if (filter === 'albums') {
            return showSpotifyLoading ? (
                <SearchLoadingList title="albums" />
            ) : (
                <SearchResultsList
                    title="albums"
                    emptyText="No albums found."
                    isEmpty={(spotify.data?.albums.length ?? 0) === 0}
                >
                    {albumRows}
                </SearchResultsList>
            )
        }
        if (filter === 'artists') {
            return showSpotifyLoading ? (
                <SearchLoadingList title="artists" />
            ) : (
                <SearchResultsList
                    title="artists"
                    emptyText="No artists found."
                    isEmpty={(spotify.data?.artists.length ?? 0) === 0}
                >
                    {artistRows}
                </SearchResultsList>
            )
        }
        if (filter === 'members') {
            return users.isLoading ? (
                <SearchLoadingList title="members" />
            ) : (
                <SearchResultsList
                    title="members"
                    emptyText="No members found."
                    isEmpty={users.data.length === 0}
                    seeAllHref={`/members/search?q=${encodeURIComponent(queryFromUrl)}`}
                >
                    {userRows}
                </SearchResultsList>
            )
        }
        if (filter === 'playlists') {
            return playlists.isLoading ? (
                <SearchLoadingList title="playlists" />
            ) : (
                <SearchResultsList
                    title="playlists"
                    emptyText="No playlists found."
                    isEmpty={playlists.data.length === 0}
                >
                    {playlistRows}
                </SearchResultsList>
            )
        }
        return null
    }

    return (
        <Box minH="100%" py={{ base: '5', md: '7' }}>
            <Container maxW="1200px" px={{ base: '4', md: '7' }}>
                <VStack align="stretch" gap="5">
                    <Flex
                        align={{ base: 'flex-start', md: 'center' }}
                        justify="space-between"
                        gap="3"
                        flexDirection={{ base: 'column', md: 'row' }}
                    >
                        <Box>
                            <Text
                                className="pressd-mono"
                                fontSize="10px"
                                color="var(--pressd-text-muted)"
                                mb="1"
                            >
                                search results
                            </Text>
                            <Heading
                                size="lg"
                                fontWeight="600"
                                color="var(--pressd-text)"
                            >
                                {queryFromUrl
                                    ? `"${queryFromUrl}"`
                                    : 'Start searching'}
                            </Heading>
                        </Box>
                        {isAnyLoading && (
                            <HStack color="var(--pressd-accent)">
                                <Spinner size="sm" />
                                <Text fontSize="sm">Searching...</Text>
                            </HStack>
                        )}
                    </Flex>

                    <SearchFilterPills
                        activeFilter={filter}
                        onFilterChange={setFilter}
                    />

                    {spotify.error && !spotify.isLoading ? (
                        <Center
                            minH="360px"
                            p="8"
                            bg="var(--pressd-surface)"
                            border="1px solid var(--pressd-border)"
                            borderRadius="16px"
                            flexDirection="column"
                            textAlign="center"
                        >
                            <Text
                                className="pressd-mono"
                                fontSize="10px"
                                color="var(--pressd-red)"
                                mb="2"
                            >
                                spotify error
                            </Text>
                            <Heading size="md" mb="2">
                                We couldn&apos;t load search results.
                            </Heading>
                            <Text
                                color="var(--pressd-text-sub)"
                                maxW="560px"
                                mb="5"
                            >
                                {spotify.error}
                            </Text>
                            <Button
                                onClick={() => {
                                    void spotify.refetch()
                                }}
                                bg="var(--pressd-accent)"
                                color="var(--pressd-bg)"
                                borderRadius="999px"
                                _hover={{
                                    bg: 'var(--pressd-accent-dim)',
                                    color: 'var(--pressd-text)',
                                }}
                            >
                                Try again
                            </Button>
                        </Center>
                    ) : isAll ? (
                        renderAllView()
                    ) : (
                        renderSingleCategory()
                    )}
                </VStack>
            </Container>
        </Box>
    )
}

export default SearchResultsPage
