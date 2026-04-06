import { Box, Flex, Grid, Heading, Image, Link, Skeleton, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router'
import { FaStar } from 'react-icons/fa'
import type { RowModuleData } from '@/features/home-page/types/home-page'
import type { ItemDetail } from '@/features/detail/types/detail'
import { useAverageRatings } from '@/features/home-page/hooks/useAverageRatings'

type RowModuleProps = {
    data: RowModuleData
    linkText: string
    headerText: string
}

const itemHref = (item: ItemDetail): string => {
    if (item.type === 'track') return `/track/${item.id}`
    if (item.type === 'album') return `/album/${item.id}`
    return `/artist/${item.id}`
}

const RowModule = ({ data, linkText, headerText }: RowModuleProps) => {
    const { ratings: avgRatings, isLoading: ratingsLoading } = useAverageRatings(data.items)

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
                templateColumns={{
                    base: 'repeat(2, minmax(0, 1fr))',
                    sm: 'repeat(3, minmax(0, 1fr))',
                    md: 'repeat(4, minmax(0, 1fr))',
                    lg: 'repeat(6, minmax(0, 1fr))',
                }}
                gap="4"
                pb="2"
                w="100%"
            >
                {data.items.map((item) => {
                    const href = itemHref(item)
                    const isArtist = item.type === 'artist'

                    const subtitle =
                        item.type === 'artist'
                            ? (item.genres[0] ?? null)
                            : (item.artists[0]?.name ?? null)

                    const subtitleHref =
                        item.type !== 'artist' && item.artists[0]
                            ? `/artist/${item.artists[0].id}`
                            : null

                    const releaseYear =
                        item.type === 'track'
                            ? (item.release_date?.slice(0, 4) ?? null)
                            : item.type === 'album'
                              ? item.release_date.slice(0, 4)
                              : null

                    return (
                        <Flex key={item.id} minW={0}>
                            <Flex direction="column">
                                <Link
                                    asChild
                                    _hover={{ textDecoration: 'none' }}
                                >
                                    <RouterLink to={href} state={item}>
                                        <Image
                                            src={item.image ?? undefined}
                                            alt={`${item.name} artwork`}
                                            w="100%"
                                            aspectRatio={1}
                                            objectFit="cover"
                                            borderRadius={
                                                isArtist ? '9999px' : '6px'
                                            }
                                            border="1px solid var(--pressd-border)"
                                        />
                                    </RouterLink>
                                </Link>
                                <Link
                                    asChild
                                    _hover={{ textDecoration: 'none' }}
                                >
                                    <RouterLink to={href} state={item}>
                                        <Text
                                            mt="2"
                                            fontWeight="500"
                                            color="var(--pressd-text)"
                                            lineClamp={1}
                                        >
                                            {item.name}
                                        </Text>
                                    </RouterLink>
                                </Link>
                                {subtitle &&
                                    (subtitleHref ? (
                                        <Link
                                            asChild
                                            color="var(--pressd-text-muted)"
                                            _hover={{
                                                color: 'var(--pressd-text-sub)',
                                            }}
                                        >
                                            <RouterLink to={subtitleHref}>
                                                <Text
                                                    fontSize="sm"
                                                    lineClamp={1}
                                                >
                                                    {subtitle}
                                                </Text>
                                            </RouterLink>
                                        </Link>
                                    ) : (
                                        <Text
                                            fontSize="sm"
                                            lineClamp={1}
                                            color="var(--pressd-text-muted)"
                                        >
                                            {subtitle}
                                        </Text>
                                    ))}
                                {item.type !== 'artist' && (
                                    <Flex
                                        mt="2"
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        {(() => {
                                            const avg = avgRatings.get(
                                                `${item.type}:${item.id}`
                                            )
                                            if (ratingsLoading) {
                                                return (
                                                    <Skeleton
                                                        height="14px"
                                                        width="36px"
                                                        borderRadius="4px"
                                                    />
                                                )
                                            }
                                            return avg !== undefined ? (
                                                <Flex
                                                    alignItems="center"
                                                    gap="1"
                                                    color="var(--pressd-green)"
                                                    fontSize="sm"
                                                    fontWeight="700"
                                                >
                                                    <FaStar />
                                                    <Text>
                                                        {(avg / 2).toFixed(2)}
                                                    </Text>
                                                </Flex>
                                            ) : (
                                                <Text
                                                    color="var(--pressd-text-muted)"
                                                    fontSize="sm"
                                                >
                                                    N/A
                                                </Text>
                                            )
                                        })()}
                                        {releaseYear && (
                                            <Text
                                                color="var(--pressd-text-muted)"
                                                fontSize="sm"
                                            >
                                                {releaseYear}
                                            </Text>
                                        )}
                                    </Flex>
                                )}
                            </Flex>
                        </Flex>
                    )
                })}
            </Grid>
        </Box>
    )
}

export default RowModule
