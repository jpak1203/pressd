import {
    Avatar,
    Box,
    Flex,
    Grid,
    Heading,
    Image,
    Link,
    Text,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router'
import { FaHeart, FaStar } from 'react-icons/fa'
import type { GridModuleData } from '@/features/home-page/types/home-page'

type GridModuleProps = {
    data: GridModuleData
    linkText: string
    headerText: string
}

const GridModule = ({ data, linkText, headerText }: GridModuleProps) => {
    return (
        <Box as="section" w="100%">
            <Flex
                alignItems="center"
                justifyContent="space-between"
                borderBottom="1px solid var(--pressd-border)"
                pb="10px"
                mb="12px"
            >
                <Heading
                    size="md"
                    textTransform="uppercase"
                    className="pressd-mono"
                    letterSpacing="0.08em"
                    fontSize="11px"
                    color="var(--pressd-text-muted)"
                >
                    {headerText}
                </Heading>
                <Link
                    asChild
                    fontSize="11px"
                    textTransform="uppercase"
                    color="var(--pressd-text-muted)"
                    _hover={{ color: 'var(--pressd-accent)' }}
                >
                    <RouterLink to={data.moreHref}>{linkText}</RouterLink>
                </Link>
            </Flex>

            <Grid
                templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
                gap="6"
            >
                {data.items.map((review) => (
                    <Box
                        key={review.id}
                        bg="var(--pressd-surface)"
                        border="1px solid var(--pressd-border)"
                        borderRadius="10px"
                        p="4"
                    >
                        <Flex gap="4" mb="4" alignItems="stretch">
                            <Box minW="84px" maxW="84px" flexShrink={0}>
                                <Link asChild display="block">
                                    <RouterLink to={review.song.href}>
                                        <Image
                                            src={review.song.artworkUrl}
                                            alt={`${review.song.title} artwork`}
                                            aspectRatio={1}
                                            w="100%"
                                            objectFit="cover"
                                            borderRadius="md"
                                        />
                                    </RouterLink>
                                </Link>
                            </Box>

                            <Flex
                                flex="1"
                                direction="column"
                                justifyContent="space-between"
                                h="84px"
                                minW={0}
                            >
                                <Flex alignItems="center" gap="2" mb="1">
                                    <Link asChild>
                                        <RouterLink to={review.reviewer.href}>
                                            <Flex alignItems="center" gap="2">
                                                <Avatar.Root size="xs">
                                                    <Avatar.Image
                                                        src={
                                                            review.reviewer
                                                                .avatarUrl
                                                        }
                                                    />
                                                    <Avatar.Fallback
                                                        name={
                                                            review.reviewer.name
                                                        }
                                                    />
                                                </Avatar.Root>
                                                <Text
                                                    textStyle="xs"
                                                    color="whiteAlpha.900"
                                                    fontWeight="700"
                                                >
                                                    {review.reviewer.name}
                                                </Text>
                                            </Flex>
                                        </RouterLink>
                                    </Link>
                                </Flex>

                                <Link asChild display="block">
                                    <RouterLink to={review.song.href}>
                                        <Heading
                                            lineHeight="1.1"
                                            color="var(--pressd-text)"
                                            lineClamp={1}
                                        >
                                            {review.song.title}{' '}
                                            <Text
                                                as="span"
                                                color="var(--pressd-text-muted)"
                                                fontWeight="400"
                                            >
                                                {review.song.releaseYear}
                                            </Text>
                                        </Heading>
                                    </RouterLink>
                                </Link>
                                <Link asChild display="block">
                                    <RouterLink to={review.song.artist.href}>
                                        <Text
                                            color="var(--pressd-text-sub)"
                                            mb="1"
                                            lineClamp={1}
                                        >
                                            {review.song.artist.name}
                                        </Text>
                                    </RouterLink>
                                </Link>
                            </Flex>
                            <Flex
                                alignItems="center"
                                gap="1"
                                color="var(--pressd-green)"
                            >
                                <FaStar />
                                <Text>{review.userRating.toFixed(1)}</Text>
                            </Flex>
                        </Flex>

                        <Text
                            color="var(--pressd-text-sub)"
                            fontSize="16px"
                            lineHeight="1.75"
                            mb="4"
                        >
                            {review.reviewText}
                        </Text>

                        <Flex
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Link
                                color="var(--pressd-text-sub)"
                                px="0"
                                _hover={{ color: 'var(--pressd-text)' }}
                            >
                                <FaHeart />{' '}
                                <Text textStyle="xs"> Like review</Text>
                            </Link>
                            <Text
                                color="var(--pressd-text-muted)"
                                fontSize="sm"
                            >
                                {review.reviewLikes} likes
                            </Text>
                        </Flex>
                    </Box>
                ))}
            </Grid>
        </Box>
    )
}

export default GridModule
