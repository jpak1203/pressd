import { Box, Container, VStack } from '@chakra-ui/react'
import type { TrackDetail } from '@/features/detail/types/detail'
import { useDetailItem } from '@/features/detail/hooks/useDetailItem'
import { usePersistInteractions } from '@/features/detail/hooks/usePersistInteractions'
import { useUserAuth } from '@/features/user-auth/context/UserAuthContext'
import DetailHero from '@/features/detail/components/DetailHero'
import { DetailPageGuard } from '@/features/detail/components/DetailPageGuard'
import { ActivitySection } from '@/features/detail/components/ActivitySection'

export const TrackDetailPage = () => {
    const { id, item, isLoading, fetchError } = useDetailItem<TrackDetail>('track')
    const { user } = useUserAuth()
    const { interactions, setRating, toggleLike, toggleListened, toggleWantToListen, addReview, removeReview, addLogEntry } =
        usePersistInteractions(`track:${id ?? ''}`, item, user?.id ?? null)

    return (
        <DetailPageGuard
            isLoading={isLoading}
            item={item}
            id={id}
            fetchError={fetchError}
            type="track"
        >
            {(track) => (
                <Box minH="100%">
                    <DetailHero item={track} />
                    <Container maxW="1200px" px={{ base: '4', md: '7' }} py={{ base: '6', md: '8' }}>
                        <VStack align="stretch" gap="5">
                            <ActivitySection
                                type="track"
                                interactions={interactions}
                                setRating={setRating}
                                toggleLike={toggleLike}
                                toggleListened={toggleListened}
                                toggleWantToListen={toggleWantToListen}
                                addReview={addReview}
                                removeReview={removeReview}
                                addLogEntry={addLogEntry}
                            />
                        </VStack>
                    </Container>
                </Box>
            )}
        </DetailPageGuard>
    )
}
