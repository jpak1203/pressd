import { Box, Flex, Text } from '@chakra-ui/react'
import { Link } from 'react-router'
import SectionCard from '@/features/detail/components/SectionCard'
import { RatingBarGraph } from './RatingBarGraph'
import type { RatingItem } from '../types/profile'

type RatingsSectionProps = {
    ratings: RatingItem[]
    profileId: string
}

const RatingsSection = ({ ratings, profileId }: RatingsSectionProps) => {
    const avgRating =
        ratings.length > 0
            ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
            : 0

    const label = (
        <Link to={`/profile/${profileId}/ratings`}>
            <Text
                as="span"
                className="pressd-mono"
                fontSize="10px"
                color="var(--pressd-text-muted)"
                letterSpacing="0.12em"
                _hover={{ color: 'var(--pressd-accent)' }}
                transition="color 0.15s"
                cursor="pointer"
            >
                ratings ({ratings.length})
            </Text>
        </Link>
    )

    return (
        <SectionCard label={label}>
            {ratings.length === 0 ? (
                <Text fontSize="13px" color="var(--pressd-text-sub)">
                    No ratings yet.
                </Text>
            ) : (
                <Flex
                    gap={{ base: '4', md: '8' }}
                    align="center"
                    direction={{ base: 'column', sm: 'row' }}
                >
                    <Box flex="1" w="100%">
                        <RatingBarGraph ratings={ratings} />
                    </Box>
                    <Flex
                        direction="column"
                        align="center"
                        minW="100px"
                        flexShrink={0}
                    >
                        <Text
                            fontSize="36px"
                            fontWeight="700"
                            color="var(--pressd-accent)"
                            lineHeight="1"
                        >
                            {avgRating.toFixed(1)}
                        </Text>
                        <Text
                            className="pressd-mono"
                            fontSize="9px"
                            color="var(--pressd-text-muted)"
                            letterSpacing="0.12em"
                            mt="1"
                        >
                            avg rating
                        </Text>
                    </Flex>
                </Flex>
            )}
        </SectionCard>
    )
}

export { RatingsSection }
