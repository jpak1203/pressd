import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react'
import { FaCalendarAlt } from 'react-icons/fa'
import type { ItemType, ItemInteraction } from '@/features/detail/types/detail'
import SectionCard from '@/features/detail/components/SectionCard'
import StarRating from '@/features/detail/components/StarRating'
import ActionBar from '@/features/detail/components/ActionBar'
import ReviewSection from '@/features/detail/components/ReviewSection'
import { formatFullDate } from '@/lib/formatters'

type ActivitySectionProps = {
    type: ItemType
    interactions: ItemInteraction
    setRating: (rating: number | null) => void
    toggleLike: () => void
    toggleListened: () => void
    toggleWantToListen: () => void
    addReview: (text: string, rating: number | null) => void
    removeReview: (id: string) => void
    addLogEntry: () => void
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
    addLogEntry,
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
                                {interactions.rating} / 5
                            </Text>
                        </HStack>
                    )}
                </Flex>

                <Box borderTop="1px solid var(--pressd-border)" pt="4">
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
                            <Text>Listened on {formatFullDate(entry.date)}</Text>
                        </HStack>
                    ))}
                </VStack>
            </SectionCard>
        )}

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
