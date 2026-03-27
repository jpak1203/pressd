import { Box, Container } from '@chakra-ui/react'
import type { ArtistDetail } from '@/features/detail/types/detail'
import { useDetailItem } from '@/features/detail/hooks/useDetailItem'
import DetailHero from '@/features/detail/components/DetailHero'
import { DetailPageGuard } from '@/features/detail/components/DetailPageGuard'
import { DiscographySection } from '@/features/detail/components/DiscographySection'

export const ArtistDetailPage = () => {
    const { id, item, isLoading, fetchError } = useDetailItem<ArtistDetail>('artist')

    return (
        <DetailPageGuard
            isLoading={isLoading}
            item={item}
            id={id}
            fetchError={fetchError}
            type="artist"
        >
            {(artist) => (
                <Box minH="100%">
                    <DetailHero item={artist} />
                    <Container maxW="1200px" px={{ base: '4', md: '7' }} py={{ base: '6', md: '8' }}>
                        <DiscographySection artistId={artist.id} />
                    </Container>
                </Box>
            )}
        </DetailPageGuard>
    )
}
