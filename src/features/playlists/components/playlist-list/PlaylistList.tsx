import { Box, HStack, Image, Skeleton, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router'
import type { PlaylistSearchResult } from '@/features/search-results/types/search-results'

type PlaylistListProps = {
    playlists: PlaylistSearchResult[]
    isLoading: boolean
}

const SkeletonRow = () => (
    <HStack
        align="center"
        gap="3"
        p="10px 14px"
        borderRadius="10px"
        border="1px solid var(--pressd-border)"
        bg="var(--pressd-surface)"
    >
        <Skeleton width="44px" height="44px" borderRadius="6px" flexShrink={0} />
        <Box flex="1">
            <Skeleton height="13px" width="160px" borderRadius="3px" mb="6px" />
            <Skeleton height="11px" width="100px" borderRadius="3px" />
        </Box>
    </HStack>
)

const PlaylistRow = ({ playlist }: { playlist: PlaylistSearchResult }) => (
    <Link to={`/playlists/${playlist.id}`} style={{ width: '100%', display: 'block' }}>
        <HStack
            align="center"
            gap="3"
            p="10px 14px"
            borderRadius="10px"
            border="1px solid var(--pressd-border)"
            bg="var(--pressd-surface)"
            transition="border-color 0.15s ease, background-color 0.15s ease"
            _hover={{
                borderColor: 'var(--pressd-accent-dim)',
                bg: 'var(--pressd-surface-2)',
            }}
            width="100%"
        >
            <Image
                src={playlist.image_url ?? undefined}
                alt={playlist.name}
                width="44px"
                height="44px"
                objectFit="cover"
                borderRadius="6px"
                border="1px solid var(--pressd-border)"
                flexShrink={0}
            />
            <Box minW="0" flex="1">
                <Text fontWeight="600" lineClamp={1} color="var(--pressd-text)" fontSize="sm">
                    {playlist.name}
                </Text>
                <Text fontSize="xs" color="var(--pressd-text-muted)" lineClamp={1}>
                    by {playlist.owner_username} &middot; {playlist.track_count} tracks
                </Text>
            </Box>
        </HStack>
    </Link>
)

export const PlaylistList = ({ playlists, isLoading }: PlaylistListProps) => {
    if (isLoading) {
        return (
            <VStack gap="2" align="stretch">
                {Array.from({ length: 8 }).map((_, i) => (
                    <SkeletonRow key={i} />
                ))}
            </VStack>
        )
    }

    if (playlists.length === 0) {
        return (
            <Box
                py="10"
                textAlign="center"
                bg="var(--pressd-surface)"
                borderRadius="10px"
                border="1px solid var(--pressd-border)"
            >
                <Text color="var(--pressd-text-muted)" className="pressd-mono" fontSize="sm">
                    No playlists found
                </Text>
            </Box>
        )
    }

    return (
        <VStack gap="2" align="stretch">
            {playlists.map((playlist) => (
                <PlaylistRow key={playlist.id} playlist={playlist} />
            ))}
        </VStack>
    )
}
