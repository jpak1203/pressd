import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router'
import {
    Box,
    Center,
    Container,
    Flex,
    Grid,
    Spinner,
    Text,
} from '@chakra-ui/react'
import { useProfile } from '@/features/profile/hooks/useProfile'
import { RatedItemCard } from '@/features/profile/components/RatedItemCard'
import type {
    RatingItem,
    RatingSortOption,
} from '@/features/profile/types/profile'

const SORT_OPTIONS: { value: RatingSortOption; label: string }[] = [
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'release_date', label: 'Release Date' },
    { value: 'rating_high', label: 'Rating High→Low' },
    { value: 'rating_low', label: 'Rating Low→High' },
]

const sortRatings = (
    ratings: RatingItem[],
    sort: RatingSortOption
): RatingItem[] => {
    const sorted = [...ratings]
    switch (sort) {
        case 'newest':
            return sorted.sort((a, b) =>
                b.updated_at.localeCompare(a.updated_at)
            )
        case 'oldest':
            return sorted.sort((a, b) =>
                a.updated_at.localeCompare(b.updated_at)
            )
        case 'release_date':
            return sorted.sort((a, b) => {
                if (!a.release_date && !b.release_date) return 0
                if (!a.release_date) return 1
                if (!b.release_date) return -1
                return b.release_date.localeCompare(a.release_date)
            })
        case 'rating_high':
            return sorted.sort((a, b) => b.rating - a.rating)
        case 'rating_low':
            return sorted.sort((a, b) => a.rating - b.rating)
    }
}

const RatingsPage = () => {
    const { id } = useParams<{ id: string }>()
    const { data, isLoading, error } = useProfile(id)
    const [sort, setSort] = useState<RatingSortOption>('newest')

    const sortedRatings = useMemo(
        () => (data ? sortRatings(data.ratings, sort) : []),
        [data, sort]
    )

    if (isLoading) {
        return (
            <Center minH="60vh">
                <Spinner color="var(--pressd-accent)" size="lg" />
            </Center>
        )
    }

    if (error || !data) {
        return (
            <Center minH="60vh">
                <Text color="var(--pressd-text-sub)" fontSize="14px">
                    {error ?? 'Profile not found.'}
                </Text>
            </Center>
        )
    }

    return (
        <Container
            maxW="1200px"
            px={{ base: '4', md: '7' }}
            py={{ base: '6', md: '8' }}
        >
            <Flex align="center" gap="3" mb="2">
                <Link to={`/profile/${id}`}>
                    <Text
                        className="pressd-mono"
                        fontSize="10px"
                        color="var(--pressd-text-muted)"
                        _hover={{ color: 'var(--pressd-accent)' }}
                        transition="color 0.15s"
                    >
                        ← {data.profile.username}
                    </Text>
                </Link>
            </Flex>

            <Flex align="baseline" gap="3" mb="6">
                <Text
                    fontSize={{ base: '22px', md: '28px' }}
                    fontWeight="700"
                    color="var(--pressd-text)"
                >
                    Ratings
                </Text>
                <Text
                    className="pressd-mono"
                    fontSize="11px"
                    color="var(--pressd-text-muted)"
                >
                    {data.ratings.length}
                </Text>
            </Flex>

            <Flex gap="2" mb="6" flexWrap="wrap">
                {SORT_OPTIONS.map((option) => (
                    <Box
                        key={option.value}
                        as="button"
                        onClick={() => setSort(option.value)}
                        className="pressd-mono"
                        fontSize="10px"
                        letterSpacing="0.08em"
                        px="3"
                        py="1.5"
                        borderRadius="full"
                        border="1px solid"
                        borderColor={
                            sort === option.value
                                ? 'var(--pressd-accent)'
                                : 'var(--pressd-border)'
                        }
                        color={
                            sort === option.value
                                ? 'var(--pressd-accent)'
                                : 'var(--pressd-text-muted)'
                        }
                        bg={
                            sort === option.value
                                ? 'rgba(var(--pressd-accent-rgb, 0,0,0), 0.08)'
                                : 'transparent'
                        }
                        cursor="pointer"
                        transition="all 0.15s"
                        _hover={{
                            borderColor: 'var(--pressd-accent)',
                            color: 'var(--pressd-accent)',
                        }}
                    >
                        {option.label}
                    </Box>
                ))}
            </Flex>

            {sortedRatings.length === 0 ? (
                <Text fontSize="13px" color="var(--pressd-text-sub)">
                    No ratings yet.
                </Text>
            ) : (
                <Grid
                    templateColumns={{
                        base: 'repeat(2, 1fr)',
                        sm: 'repeat(3, 1fr)',
                        md: 'repeat(4, 1fr)',
                        lg: 'repeat(5, 1fr)',
                    }}
                    gap="3"
                >
                    {sortedRatings.map((item) => (
                        <RatedItemCard key={item.id} item={item} />
                    ))}
                </Grid>
            )}
        </Container>
    )
}

export { RatingsPage }
