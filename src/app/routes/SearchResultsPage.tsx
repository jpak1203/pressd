import { useEffect } from 'react';
import { useSpotifySearch } from '@/services/spotify/useSpotifySearch';
import { useSearchParams } from 'react-router';
import {
	Box,
	Button,
	Center,
	Container,
	Flex,
	Heading,
	HStack,
	SimpleGrid,
	Spinner,
	Text,
	VStack,
} from '@chakra-ui/react';
import SearchLoadingList from '@/features/search-results/components/search-loading-list/SearchLoadingList';
import SearchResultsRow from '@/features/search-results/components/search-results-row/SearchResultsRow';
import SearchResultsList from '@/features/search-results/components/search-results-list/SearchResultsList';

const SearchResultsPage = () => {
	const [searchParams] = useSearchParams();
	const queryFromUrl = searchParams.get('query') ?? '';
	const spotify = useSpotifySearch();

	useEffect(() => {
		spotify.setQuery(queryFromUrl);
	}, [queryFromUrl, spotify.setQuery]);

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
						{spotify.isLoading && (
							<HStack color="var(--pressd-accent)">
								<Spinner size="sm" />
								<Text fontSize="sm">Searching Spotify...</Text>
							</HStack>
						)}
					</Flex>

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
									void spotify.refetch();
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
					) : (
						<SimpleGrid columns={{ base: 1, lg: 3 }} gap="4">
							{spotify.isLoading ||
							(spotify.data === null &&
								queryFromUrl.length >= 2) ? (
								<>
									<SearchLoadingList title="tracks" />
									<SearchLoadingList title="albums" />
									<SearchLoadingList title="artists" />
								</>
							) : (
								<>
									<SearchResultsList
										title="tracks"
										emptyText="No tracks found."
										isEmpty={
											(spotify.data?.tracks.length ??
												0) === 0
										}
									>
										{spotify.data?.tracks.map((track) => (
											<SearchResultsRow
												key={track.id}
												id={track.id}
												title={track.name}
												image={track.album.image}
												rating={track.rating}
												showRating
											/>
										))}
									</SearchResultsList>
									<SearchResultsList
										title="albums"
										emptyText="No albums found."
										isEmpty={
											(spotify.data?.albums.length ??
												0) === 0
										}
									>
										{spotify.data?.albums.map((album) => (
											<SearchResultsRow
												key={album.id}
												id={album.id}
												title={album.name}
												image={album.image}
												rating={album.rating}
												showRating
											/>
										))}
									</SearchResultsList>
									<SearchResultsList
										title="artists"
										emptyText="No artists found."
										isEmpty={
											(spotify.data?.artists.length ??
												0) === 0
										}
									>
										{spotify.data?.artists.map((artist) => (
											<SearchResultsRow
												key={artist.id}
												id={artist.id}
												title={artist.name}
												image={artist.image}
												showRating={false}
											/>
										))}
									</SearchResultsList>
								</>
							)}
						</SimpleGrid>
					)}
				</VStack>
			</Container>
		</Box>
	);
};

export default SearchResultsPage;
