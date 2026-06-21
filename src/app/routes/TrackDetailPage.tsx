import { Box, Container, VStack } from '@chakra-ui/react'
import type { TrackDetail } from '@/features/detail/types/detail'
import { useDetailItem } from '@/features/detail/hooks/useDetailItem'
import { usePersistInteractions } from '@/features/detail/hooks/usePersistInteractions'
import { useItemStats } from '@/features/detail/hooks/useItemStats'
import { useUserAuth } from '@/features/user-auth/context/UserAuthContext'
import { DetailHero } from '@/features/detail/components/DetailHero'
import { DetailPageGuard } from '@/features/detail/components/DetailPageGuard'
import { ActivitySection } from '@/features/detail/components/ActivitySection'
import { GuestActivityCard } from '@/features/detail/components/GuestActivityCard'
import { GuestReviewsCard } from '@/features/detail/components/GuestReviewsCard'

export const TrackDetailPage = () => {
    const { id, item, isLoading, fetchError } = useDetailItem<TrackDetail>('track')
    const { user, isLoggedIn, isGuestUser } = useUserAuth()
    const profileId = isLoggedIn && !isGuestUser ? (user?.id ?? null) : null
    const { stats, refetch: refetchStats } = useItemStats('track', id)
    const { interactions, setRating, toggleLike, toggleListened, toggleWantToListen, addReview, removeReview, logItem } =
        usePersistInteractions(item, profileId, refetchStats)

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
                    <DetailHero
                        item={track}
                        averageRating={stats.average}
                        ratingCount={stats.ratingCount}
                        likeCount={stats.likeCount}
                    />
                    <Container maxW="1200px" px={{ base: '4', md: '7' }} py={{ base: '6', md: '8' }}>
                        <VStack align="stretch" gap="5">
                            {profileId ? (
                                <ActivitySection
                                    type="track"
                                    itemName={track.name}
                                    interactions={interactions}
                                    setRating={setRating}
                                    toggleLike={toggleLike}
                                    toggleListened={toggleListened}
                                    toggleWantToListen={toggleWantToListen}
                                    addReview={addReview}
                                    removeReview={removeReview}
                                    logItem={logItem}
                                />
                            ) : (
                                <>
                                    <GuestActivityCard type="track" />
                                    <GuestReviewsCard
                                        type="track"
                                        itemId={track.id}
                                    />
                                </>
                            )}
                        </VStack>
                    </Container>
                </Box>
            )}
        </DetailPageGuard>
    )
}
