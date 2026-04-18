import { Box, Container, Flex, Heading, Link, VStack } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router'
import { PlaylistGridModule } from '@/features/playlists/components/playlist-grid-module/PlaylistGridModule'
import { PlaylistList } from '@/features/playlists/components/playlist-list/PlaylistList'
import { featuredPlaylists, popularPlaylists } from '@/features/playlists/data/playlistsData'

export const PlaylistsPage = () => (
    <Box minH="100%" py={{ base: '5', md: '7' }}>
        <Container maxW="1200px" px={{ base: '4', md: '7' }}>
            <VStack align="stretch" gap={{ base: '10', md: '12' }}>
                <PlaylistGridModule
                    items={featuredPlaylists}
                    headerText="Featured Playlists"
                />
                <Box as="section" w="100%">
                    <Flex
                        alignItems="center"
                        justifyContent="space-between"
                        borderBottom="1px solid var(--pressd-border)"
                        pb="10px"
                        mb="12px"
                    >
                        <Heading
                            size="md"
                            textTransform="uppercase"
                            className="pressd-mono"
                            letterSpacing="0.08em"
                            fontSize="11px"
                            color="var(--pressd-text-muted)"
                        >
                            Popular This Week
                        </Heading>
                        <Link
                            asChild
                            fontSize="11px"
                            textTransform="uppercase"
                            color="var(--pressd-text-muted)"
                            _hover={{ color: 'var(--pressd-accent)' }}
                        >
                            <RouterLink to="/playlists/search?filter=week">More</RouterLink>
                        </Link>
                    </Flex>
                    <PlaylistList playlists={popularPlaylists.slice(0, 6)} isLoading={false} />
                </Box>
            </VStack>
        </Container>
    </Box>
)
