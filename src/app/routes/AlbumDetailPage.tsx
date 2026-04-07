import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Box, Container, VStack } from '@chakra-ui/react'
import { useDetailItem } from '@/features/detail/hooks/useDetailItem'
import { useAlbumTracks } from '@/features/detail/hooks/useAlbumTracks'
import { usePersistInteractions } from '@/features/detail/hooks/usePersistInteractions'
import { useItemAverageRating } from '@/features/detail/hooks/useItemAverageRating'
import type { AlbumDetail } from '@/features/detail/types/detail'
import { buildTrackDetail } from '@/features/detail/utils/buildTrackDetail'
import { useUserAuth } from '@/features/user-auth/context/UserAuthContext'
import { DetailHero } from '@/features/detail/components/DetailHero'
import { DetailPageGuard } from '@/features/detail/components/DetailPageGuard'
import { ActivitySection } from '@/features/detail/components/ActivitySection'
import { AlbumTracklist } from '@/features/detail/components/AlbumTracklist'

export const AlbumDetailPage = () => {
    const { id, item, isLoading, fetchError } = useDetailItem<AlbumDetail>('album')
    const { user } = useUserAuth()
    const navigate = useNavigate()

    const singleTrackAlbum =
        item?.type === 'album' && item.total_tracks === 1 ? item : null
    const { tracks: singleAlbumTracks, isLoading: isLoadingTracks } =
        useAlbumTracks(singleTrackAlbum)

    useEffect(() => {
        if (!singleTrackAlbum || isLoadingTracks || singleAlbumTracks.length !== 1) return
        const trackState = buildTrackDetail(singleAlbumTracks[0], singleTrackAlbum)
        navigate(`/track/${trackState.id}`, { replace: true, state: trackState })
    }, [singleTrackAlbum, isLoadingTracks, singleAlbumTracks, navigate])

    const { averageRating: avgRating, refetch: refetchAvgRating } = useItemAverageRating('album', id)
    const { interactions, setRating, toggleLike, toggleListened, toggleWantToListen, addReview, removeReview } =
        usePersistInteractions(`album:${id ?? ''}`, item, user?.id ?? null, refetchAvgRating)

    return (
        <DetailPageGuard
            isLoading={isLoading || !!singleTrackAlbum}
            item={item}
            id={id}
            fetchError={fetchError}
            type="album"
        >
            {(album) => (
                <Box minH="100%">
                    <DetailHero item={album} averageRating={avgRating} />
                    <Container maxW="1200px" px={{ base: '4', md: '7' }} py={{ base: '6', md: '8' }}>
                        <VStack align="stretch" gap="5">
                            <ActivitySection
                                type="album"
                                interactions={interactions}
                                setRating={setRating}
                                toggleLike={toggleLike}
                                toggleListened={toggleListened}
                                toggleWantToListen={toggleWantToListen}
                                addReview={addReview}
                                removeReview={removeReview}
                            />
                            <AlbumTracklist album={album} />
                        </VStack>
                    </Container>
                </Box>
            )}
        </DetailPageGuard>
    )
}
