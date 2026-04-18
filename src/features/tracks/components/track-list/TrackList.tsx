import { Box, HStack, Image, Skeleton, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router'
import type { TrackDetail } from '@/features/detail/types/detail'

type TrackListProps = {
    tracks: TrackDetail[]
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
        <Skeleton height="11px" width="50px" borderRadius="3px" flexShrink={0} />
    </HStack>
)

const TrackRow = ({ track }: { track: TrackDetail }) => {
    const artist = track.artists[0]?.name ?? null
    const year = track.release_date?.slice(0, 4) ?? null

    return (
        <Link to={`/track/${track.id}`} state={track} style={{ width: '100%', display: 'block' }}>
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
                    src={track.image ?? undefined}
                    alt={track.name}
                    width="44px"
                    height="44px"
                    objectFit="cover"
                    borderRadius="6px"
                    border="1px solid var(--pressd-border)"
                    flexShrink={0}
                />
                <Box minW="0" flex="1">
                    <Text fontWeight="600" lineClamp={1} color="var(--pressd-text)" fontSize="sm">
                        {track.name}
                    </Text>
                    {artist && (
                        <Text fontSize="xs" color="var(--pressd-text-muted)" lineClamp={1}>
                            {artist}
                        </Text>
                    )}
                </Box>
                {year && (
                    <Text
                        fontSize="xs"
                        color="var(--pressd-text-muted)"
                        className="pressd-mono"
                        flexShrink={0}
                    >
                        {year}
                    </Text>
                )}
            </HStack>
        </Link>
    )
}

export const TrackList = ({ tracks, isLoading }: TrackListProps) => {
    if (isLoading) {
        return (
            <VStack gap="2" align="stretch">
                {Array.from({ length: 8 }).map((_, i) => (
                    <SkeletonRow key={i} />
                ))}
            </VStack>
        )
    }

    if (tracks.length === 0) {
        return (
            <Box
                py="10"
                textAlign="center"
                bg="var(--pressd-surface)"
                borderRadius="10px"
                border="1px solid var(--pressd-border)"
            >
                <Text color="var(--pressd-text-muted)" className="pressd-mono" fontSize="sm">
                    No tracks found
                </Text>
            </Box>
        )
    }

    return (
        <VStack gap="2" align="stretch">
            {tracks.map((track) => (
                <TrackRow key={track.id} track={track} />
            ))}
        </VStack>
    )
}
