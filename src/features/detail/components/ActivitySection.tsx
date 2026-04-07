import { Box, Flex, HStack, IconButton, Text, VStack } from '@chakra-ui/react'
import { FaTimes } from 'react-icons/fa'
import type { ItemType, ItemInteraction } from '@/features/detail/types/detail'
import SectionCard from '@/features/detail/components/SectionCard'
import { StarRating } from '@/features/detail/components/StarRating'
import ActionBar from '@/features/detail/components/ActionBar'
import ReviewSection from '@/features/detail/components/ReviewSection'

type ActivitySectionProps = {
    type: ItemType
    interactions: ItemInteraction
    setRating: (rating: number | null) => void
    toggleLike: () => void
    toggleListened: () => void
    toggleWantToListen: () => void
    addReview: (text: string, rating: number | null) => void
    removeReview: (id: string) => void
}

export const ActivitySection = ({
    type,
    interactions,
    setRating,
    toggleLike,
    toggleListened,
    toggleWantToListen,
    addReview,
    removeReview,
}: ActivitySectionProps) => (
    <>
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
                        <HStack gap="1">
                            <StarRating
                                value={interactions.rating}
                                onChange={setRating}
                                size="26px"
                            />
                            {interactions.rating !== null && (
                                <IconButton
                                    aria-label="Remove rating"
                                    size="xs"
                                    variant="ghost"
                                    borderRadius="999px"
                                    color="var(--pressd-accent-glow )"
                                    minW="20px"
                                    h="20px"
                                    _hover={{
                                        color: 'var(--pressd-red)',
                                        bg: 'rgba(255,143,166,0.12)',
                                    }}
                                    onClick={() => setRating(null)}
                                >
                                    <FaTimes />
                                </IconButton>
                            )}
                        </HStack>
                    </Box>
                </Flex>

                <Box borderTop="1px solid var(--pressd-border)" pt="4">
                    <ActionBar
                        interactions={interactions}
                        onToggleLike={toggleLike}
                        onToggleListened={toggleListened}
                        onToggleWantToListen={toggleWantToListen}
                    />
                </Box>
            </VStack>
        </SectionCard>

        <SectionCard label={`reviews (${interactions.reviews.length})`}>
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
    </>
)
