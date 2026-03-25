import { useEffect, useMemo } from 'react'
import { useLocation, useParams, Link } from 'react-router'
import {
    Box,
    Button,
    Center,
    Container,
    Flex,
    HStack,
    Spinner,
    Text,
    VStack,
} from '@chakra-ui/react'
import { FaCalendarAlt } from 'react-icons/fa'
import type { ItemDetail, ItemType } from '@/features/detail/types/detail'
import DetailHero from '@/features/detail/components/DetailHero'
import StarRating from '@/features/detail/components/StarRating'
import ActionBar from '@/features/detail/components/ActionBar'
import ReviewSection from '@/features/detail/components/ReviewSection'
import SectionCard from '@/features/detail/components/SectionCard'
import { usePersistInteractions } from '@/features/detail/hooks/usePersistInteractions'
import { useItemFallback } from '@/features/detail/hooks/useItemFallback'
import { useUserAuth } from '@/features/user-auth/context/UserAuthContext'

type DetailPageProps = {
    type: ItemType
}

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })

const DetailPage = ({ type }: DetailPageProps) => {
    const { id } = useParams<{ id: string }>()
    const { state } = useLocation()
    const { user } = useUserAuth()

    const initialItem = useMemo<ItemDetail | null>(() => {
        if (state) return state as ItemDetail
        if (!id) return null
        try {
            const cached = sessionStorage.getItem(`pressd_item_${id}`)
            return cached ? (JSON.parse(cached) as ItemDetail) : null
        } catch {
            return null
        }
    }, [id, state])

    useEffect(() => {
        if (state && id) {
            sessionStorage.setItem(`pressd_item_${id}`, JSON.stringify(state))
        }
    }, [state, id])

    const {
        item,
        isLoading,
        error: fetchError,
    } = useItemFallback(type, id, initialItem)

    const itemKey = `${type}:${id ?? ''}`
    const {
        interactions,
        setRating,
        toggleLike,
        toggleListened,
        toggleWantToListen,
        addReview,
        removeReview,
        addLogEntry,
    } = usePersistInteractions(itemKey, item, user?.id ?? null)

    if (isLoading) {
        return (
            <Center minH="60vh">
                <Spinner size="lg" color="var(--pressd-accent)" />
            </Center>
        )
    }

    if (!item || !id) {
        return (
            <Center minH="60vh" flexDirection="column" gap="5" py="12">
                <Text
                    className="pressd-mono"
                    fontSize="10px"
                    color="var(--pressd-text-muted)"
                >
                    {type} not found
                </Text>
                <Text
                    color="var(--pressd-text-sub)"
                    fontSize="14px"
                    textAlign="center"
                    maxW="320px"
                >
                    {fetchError ??
                        'Navigate here from search results to view this page.'}
                </Text>
                <Button
                    asChild
                    size="sm"
                    bg="var(--pressd-accent)"
                    color="var(--pressd-bg)"
                    borderRadius="999px"
                    fontWeight="600"
                    px="18px"
                    _hover={{
                        bg: 'var(--pressd-accent-dim)',
                        color: 'var(--pressd-text)',
                    }}
                >
                    <Link to="/search">Go to search</Link>
                </Button>
            </Center>
        )
    }

    const ratingLabel =
        interactions.rating !== null
            ? `${interactions.rating} / 5`
            : 'Not rated'

    return (
        <Box minH="100%">
            <DetailHero item={item} />

            <Container
                maxW="1200px"
                px={{ base: '4', md: '7' }}
                py={{ base: '6', md: '8' }}
            >
                <VStack align="stretch" gap="5">
                    {/* Rating + Actions */}
                    <SectionCard label="your activity">
                        <VStack align="stretch" gap="5">
                            <Flex
                                align={{ base: 'flex-start', sm: 'center' }}
                                justify="space-between"
                                flexDirection={{ base: 'column', sm: 'row' }}
                                gap="4"
                            >
                                <Box>
                                    <Text
                                        fontSize="11px"
                                        color="var(--pressd-text-muted)"
                                        mb="2"
                                    >
                                        Rate this {type}
                                    </Text>
                                    <StarRating
                                        value={interactions.rating}
                                        onChange={setRating}
                                        size="26px"
                                    />
                                </Box>
                                {interactions.rating !== null && (
                                    <HStack
                                        gap="1"
                                        bg="var(--pressd-accent-glow)"
                                        border="1px solid var(--pressd-accent)"
                                        borderRadius="999px"
                                        px="14px"
                                        py="6px"
                                    >
                                        <Text
                                            fontSize="18px"
                                            fontWeight="700"
                                            color="var(--pressd-accent)"
                                            lineHeight="1"
                                            className="pressd-mono"
                                        >
                                            {ratingLabel}
                                        </Text>
                                    </HStack>
                                )}
                            </Flex>

                            <Box
                                borderTop="1px solid var(--pressd-border)"
                                pt="4"
                            >
                                <ActionBar
                                    interactions={interactions}
                                    onToggleLike={toggleLike}
                                    onToggleListened={toggleListened}
                                    onToggleWantToListen={toggleWantToListen}
                                    onAddLog={addLogEntry}
                                />
                            </Box>
                        </VStack>
                    </SectionCard>

                    {/* Log Entries */}
                    {interactions.logEntries.length > 0 && (
                        <SectionCard
                            label={`listening log (${interactions.logEntries.length})`}
                        >
                            <VStack align="stretch" gap="2">
                                {interactions.logEntries.map((entry) => (
                                    <HStack
                                        key={entry.id}
                                        gap="2.5"
                                        color="var(--pressd-text-sub)"
                                        fontSize="13px"
                                    >
                                        <Box
                                            color="var(--pressd-accent)"
                                            fontSize="11px"
                                            flexShrink={0}
                                        >
                                            <FaCalendarAlt />
                                        </Box>
                                        <Text>
                                            Listened on {formatDate(entry.date)}
                                        </Text>
                                    </HStack>
                                ))}
                            </VStack>
                        </SectionCard>
                    )}

                    {/* Reviews */}
                    <SectionCard
                        label={`reviews (${interactions.reviews.length})`}
                    >
                        <ReviewSection
                            reviews={interactions.reviews}
                            onAddReview={(text, rating) => {
                                addReview(text, rating)
                                if (rating !== null) setRating(rating)
                            }}
                            onRemoveReview={removeReview}
                            currentRating={interactions.rating}
                        />
                    </SectionCard>
                </VStack>
            </Container>
        </Box>
    )
}

export default DetailPage
