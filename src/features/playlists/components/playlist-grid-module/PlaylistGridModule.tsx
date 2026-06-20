import { Box, Flex, Grid, Heading, Image, Link, Skeleton, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router'
import type { PlaylistSearchResult } from '@/features/search-results/types/search-results'

type PlaylistGridModuleProps = {
    items: PlaylistSearchResult[]
    headerText: string
    linkText?: string
    moreHref?: string
    isLoading?: boolean
}

export const PlaylistGridModule = ({
    items,
    headerText,
    linkText,
    moreHref,
    isLoading = false,
}: PlaylistGridModuleProps) => (
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
                {headerText}
            </Heading>
            {linkText && moreHref && (
                <Link
                    asChild
                    fontSize="11px"
                    textTransform="uppercase"
                    color="var(--pressd-text-muted)"
                    _hover={{ color: 'var(--pressd-accent)' }}
                >
                    <RouterLink to={moreHref}>{linkText}</RouterLink>
                </Link>
            )}
        </Flex>

        <Grid
            templateColumns={{
                base: 'repeat(2, minmax(0, 1fr))',
                sm: 'repeat(3, minmax(0, 1fr))',
                md: 'repeat(4, minmax(0, 1fr))',
                lg: 'repeat(6, minmax(0, 1fr))',
            }}
            gap="4"
            pb="2"
            w="100%"
        >
            {isLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                      <Flex key={i} direction="column" gap="2">
                          <Skeleton width="100%" aspectRatio={1} borderRadius="8px" />
                          <Skeleton height="13px" width="80%" borderRadius="4px" />
                          <Skeleton height="11px" width="60%" borderRadius="4px" />
                      </Flex>
                  ))
                : items.map((playlist) => (
                      <Link
                          key={playlist.id}
                          asChild
                          _hover={{ textDecoration: 'none' }}
                      >
                          <RouterLink to={`/playlists/${playlist.id}`}>
                              <Flex direction="column" gap="2">
                                  <Image
                                      src={playlist.image_url ?? undefined}
                                      alt={playlist.name}
                                      w="100%"
                                      aspectRatio={1}
                                      objectFit="cover"
                                      borderRadius="8px"
                                      border="1px solid var(--pressd-border)"
                                  />
                                  <Text
                                      fontWeight="500"
                                      fontSize="sm"
                                      color="var(--pressd-text)"
                                      lineClamp={1}
                                  >
                                      {playlist.name}
                                  </Text>
                                  <Text
                                      fontSize="xs"
                                      color="var(--pressd-text-muted)"
                                      lineClamp={1}
                                  >
                                      by {playlist.owner_username} &middot; {playlist.track_count} tracks
                                  </Text>
                              </Flex>
                          </RouterLink>
                      </Link>
                  ))}
        </Grid>
    </Box>
)
