import { Box, Flex, Skeleton, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router'
import { SectionCard } from '@/features/detail/components/SectionCard'
import { useAlbumTracks } from '@/features/detail/hooks/useAlbumTracks'
import { buildTrackDetail } from '@/features/detail/utils/buildTrackDetail'
import { formatDuration } from '@/lib/formatters'
import type { AlbumDetail } from '@/features/detail/types/detail'

type AlbumTracklistProps = { album: AlbumDetail }

export const AlbumTracklist = ({ album }: AlbumTracklistProps) => {
    const { tracks, isLoading, error } = useAlbumTracks(album)

    if (error) {
        return (
            <SectionCard label={`tracks (${album.total_tracks})`}>
                <Text fontSize="13px" color="var(--pressd-red, #e74c3c)">
                    Failed to load tracks.
                </Text>
            </SectionCard>
        )
    }

    if (isLoading) {
        return (
            <SectionCard label={`tracks (${album.total_tracks})`}>
                <VStack align="stretch" gap="0">
                    {Array.from({ length: Math.min(album.total_tracks, 10) }).map(
                        (_, i) => (
                            <Box
                                key={i}
                                py="10px"
                                borderBottom="1px solid var(--pressd-border)"
                                _last={{ borderBottom: 'none' }}
                            >
                                <Skeleton height="14px" width={`${60 + (i % 3) * 15}%`} borderRadius="4px" />
                            </Box>
                        )
                    )}
                </VStack>
            </SectionCard>
        )
    }

    return (
        <SectionCard label={`tracks (${album.total_tracks})`}>
            {tracks.length === 0 ? (
                <Text fontSize="13px" color="var(--pressd-text-muted)">
                    No tracks in catalog yet.
                </Text>
            ) : (
                <VStack align="stretch" gap="0">
                    {tracks.map((track) => {
                        const trackState = buildTrackDetail(track, album)
                        return (
                            <Link
                                key={track.id}
                                to={`/track/${track.id}`}
                                state={trackState}
                                style={{ textDecoration: 'none', display: 'block' }}
                            >
                                <Flex
                                    align="center"
                                    gap="3"
                                    py="10px"
                                    px="2"
                                    borderBottom="1px solid var(--pressd-border)"
                                    borderRadius="6px"
                                    _last={{ borderBottom: 'none' }}
                                    _hover={{
                                        bg: 'rgba(255,255,255,0.04)',
                                    }}
                                    transition="background 0.15s"
                                >
                                    <Text
                                        className="pressd-mono"
                                        fontSize="11px"
                                        color="var(--pressd-text-muted)"
                                        minW="22px"
                                        textAlign="right"
                                        flexShrink={0}
                                    >
                                        {track.track_number}
                                    </Text>
                                    <Text
                                        fontSize="14px"
                                        color="var(--pressd-text)"
                                        flex="1"
                                        overflow="hidden"
                                        textOverflow="ellipsis"
                                        whiteSpace="nowrap"
                                    >
                                        {track.name}
                                    </Text>
                                    <Text
                                        className="pressd-mono"
                                        fontSize="11px"
                                        color="var(--pressd-text-muted)"
                                        flexShrink={0}
                                    >
                                        {formatDuration(track.duration_ms)}
                                    </Text>
                                </Flex>
                            </Link>
                        )
                    })}
                </VStack>
            )}
        </SectionCard>
    )
}
