import { Box, Grid, Skeleton, Text, VStack } from '@chakra-ui/react'
import SectionCard from '@/features/detail/components/SectionCard'
import { useArtistDiscography } from '@/features/detail/hooks/useArtistDiscography'
import type { AlbumDetail } from '@/features/detail/types/detail'
import { AlbumCard } from './AlbumCard'

const AlbumGrid = ({ items }: { items: AlbumDetail[] }) => (
    <Grid
        templateColumns={{
            base: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
            lg: 'repeat(6, 1fr)',
        }}
        gap="4"
    >
        {items.map((album) => (
            <AlbumCard key={album.id} album={album} />
        ))}
    </Grid>
)

type DiscographySectionProps = { artistId: string }

export const DiscographySection = ({ artistId }: DiscographySectionProps) => {
    const { albums, singles, isLoading, error } = useArtistDiscography(artistId)

    if (error) {
        return (
            <SectionCard label="discography">
                <Text fontSize="13px" color="var(--pressd-red, #e74c3c)">
                    Failed to load discography.
                </Text>
            </SectionCard>
        )
    }

    if (isLoading) {
        const skeletonGrid = (
            <Grid
                templateColumns={{
                    base: 'repeat(2, 1fr)',
                    sm: 'repeat(3, 1fr)',
                    md: 'repeat(4, 1fr)',
                    lg: 'repeat(6, 1fr)',
                }}
                gap="4"
            >
                {Array.from({ length: 6 }).map((_, i) => (
                    <Box key={i}>
                        <Skeleton
                            borderRadius="6px"
                            width="100%"
                            paddingBottom="100%"
                        />
                        <Box pt="2">
                            <Skeleton
                                height="12px"
                                width="80%"
                                mb="1"
                                borderRadius="4px"
                            />
                            <Skeleton
                                height="10px"
                                width="40%"
                                borderRadius="4px"
                            />
                        </Box>
                    </Box>
                ))}
            </Grid>
        )

        return (
            <VStack align="stretch" gap="5">
                <SectionCard label="albums">{skeletonGrid}</SectionCard>
                <SectionCard label="singles">{skeletonGrid}</SectionCard>
            </VStack>
        )
    }

    return (
        <VStack align="stretch" gap="5">
            <SectionCard label={`albums (${albums.length})`}>
                {albums.length === 0 ? (
                    <Text fontSize="13px" color="var(--pressd-text-muted)">
                        No albums in catalog yet.
                    </Text>
                ) : (
                    <AlbumGrid items={albums} />
                )}
            </SectionCard>

            <SectionCard label={`singles/eps (${singles.length})`}>
                {singles.length === 0 ? (
                    <Text fontSize="13px" color="var(--pressd-text-muted)">
                        No singles in catalog yet.
                    </Text>
                ) : (
                    <AlbumGrid items={singles} />
                )}
            </SectionCard>
        </VStack>
    )
}
