import {
    Box,
    Container,
    Flex,
    Heading,
    HStack,
    Image,
    Text,
    VStack,
} from '@chakra-ui/react'
import { Link } from 'react-router'
import { FaHeart, FaSpotify, FaStar } from 'react-icons/fa'
import type { ItemDetail } from '@/features/detail/types/detail'
import { formatDuration } from '@/lib/formatters'

type DetailHeroProps = {
    item: ItemDetail
    averageRating?: number | null
    ratingCount?: number
    likeCount?: number
}

const DetailHero = ({
    item,
    averageRating,
    ratingCount = 0,
    likeCount = 0,
}: DetailHeroProps) => {
    const imgSrc = item.image ?? undefined
    const isArtist = item.type === 'artist'

    return (
        <Box position="relative" overflow="hidden">
            {/* Blurred background art */}
            {imgSrc && (
                <Box
                    position="absolute"
                    inset="0"
                    backgroundImage={`url(${imgSrc})`}
                    backgroundSize="cover"
                    backgroundPosition="center"
                    filter="blur(60px) brightness(0.22) saturate(1.8)"
                    transform="scale(1.3)"
                />
            )}
            {/* Dark gradient overlay fading to page bg */}
            <Box
                position="absolute"
                inset="0"
                background="linear-gradient(to bottom, rgba(12,12,15,0.25) 0%, var(--pressd-bg) 100%)"
            />
            {/* Subtle purple tint */}
            <Box
                position="absolute"
                inset="0"
                background="radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,167,255,0.06), transparent 70%)"
            />

            <Container
                maxW="1200px"
                px={{ base: '4', md: '7' }}
                pt={{ base: '10', md: '14' }}
                pb={{ base: '8', md: '10' }}
                position="relative"
            >
                <Flex
                    gap={{ base: '5', md: '8' }}
                    align={{ base: 'center', md: 'flex-end' }}
                    flexDirection={{ base: 'column', md: 'row' }}
                    textAlign={{ base: 'center', md: 'left' }}
                >
                    {/* Cover Art */}
                    <Box flexShrink={0}>
                        {imgSrc ? (
                            <Image
                                src={imgSrc}
                                alt={item.name}
                                width={{ base: '150px', md: '190px' }}
                                height={{ base: '150px', md: '190px' }}
                                objectFit="cover"
                                borderRadius={isArtist ? '50%' : '12px'}
                                boxShadow="0 24px 60px rgba(0,0,0,0.7)"
                                border={
                                    isArtist
                                        ? '3px solid var(--pressd-border)'
                                        : 'none'
                                }
                            />
                        ) : (
                            <Box
                                width={{ base: '150px', md: '190px' }}
                                height={{ base: '150px', md: '190px' }}
                                borderRadius={isArtist ? '50%' : '12px'}
                                bg="var(--pressd-surface-2)"
                                border="1px solid var(--pressd-border)"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Text
                                    fontSize="48px"
                                    color="var(--pressd-border)"
                                >
                                    {isArtist ? '👤' : '🎵'}
                                </Text>
                            </Box>
                        )}
                    </Box>

                    {/* Metadata */}
                    <VStack
                        align={{ base: 'center', md: 'flex-start' }}
                        gap="2"
                        flex="1"
                        minW="0"
                        pb={{ md: '1' }}
                    >
                        <Text
                            className="pressd-mono"
                            fontSize="10px"
                            color="var(--pressd-accent)"
                            letterSpacing="0.14em"
                        >
                            {item.type}
                        </Text>

                        <Heading
                            size={{ base: 'xl', md: '2xl' }}
                            fontWeight="700"
                            color="var(--pressd-text)"
                            lineHeight="1.15"
                            letterSpacing="-0.01em"
                        >
                            {item.name}
                        </Heading>

                        {/* Track metadata */}
                        {item.type === 'track' && (
                            <VStack
                                align={{ base: 'center', md: 'flex-start' }}
                                gap="0.5"
                            >
                                <HStack
                                    gap="1.5"
                                    flexWrap="wrap"
                                    justify={{
                                        base: 'center',
                                        md: 'flex-start',
                                    }}
                                >
                                    {item.artists.map((a, i) => (
                                        <Link
                                            key={a.id}
                                            to={`/artist/${a.id}`}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <Text
                                                color="var(--pressd-text-sub)"
                                                fontSize="15px"
                                                fontWeight="500"
                                                _hover={{ color: 'var(--pressd-text)' }}
                                                transition="color 0.15s"
                                            >
                                                {a.name}
                                                {i < item.artists.length - 1 && ','}
                                            </Text>
                                        </Link>
                                    ))}
                                </HStack>
                                <HStack
                                    gap="2"
                                    color="var(--pressd-text-muted)"
                                    fontSize="13px"
                                    justify={{
                                        base: 'center',
                                        md: 'flex-start',
                                    }}
                                >
                                    <Link
                                        to={`/album/${item.album.id}`}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <Text
                                            color="var(--pressd-text-muted)"
                                            fontSize="13px"
                                            _hover={{ color: 'var(--pressd-text-sub)' }}
                                            transition="color 0.15s"
                                        >
                                            {item.album.name}
                                        </Text>
                                    </Link>
                                    {item.duration_ms > 0 && (
                                        <>
                                            <Text>·</Text>
                                            <Text>
                                                {formatDuration(
                                                    item.duration_ms
                                                )}
                                            </Text>
                                        </>
                                    )}
                                </HStack>
                            </VStack>
                        )}

                        {/* Album metadata */}
                        {item.type === 'album' && (
                            <VStack
                                align={{ base: 'center', md: 'flex-start' }}
                                gap="0.5"
                            >
                                <HStack
                                    gap="1.5"
                                    flexWrap="wrap"
                                    justify={{
                                        base: 'center',
                                        md: 'flex-start',
                                    }}
                                >
                                    {item.artists.map((a, i) => (
                                        <Link
                                            key={a.id}
                                            to={`/artist/${a.id}`}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <Text
                                                color="var(--pressd-text-sub)"
                                                fontSize="15px"
                                                fontWeight="500"
                                                _hover={{ color: 'var(--pressd-text)' }}
                                                transition="color 0.15s"
                                            >
                                                {a.name}
                                                {i < item.artists.length - 1 && ','}
                                            </Text>
                                        </Link>
                                    ))}
                                </HStack>
                                <HStack
                                    gap="2"
                                    color="var(--pressd-text-muted)"
                                    fontSize="13px"
                                    flexWrap="wrap"
                                    justify={{
                                        base: 'center',
                                        md: 'flex-start',
                                    }}
                                >
                                    {item.release_date && (
                                        <Text>
                                            {item.release_date.split('-')[0]}
                                        </Text>
                                    )}
                                    {item.total_tracks > 0 && (
                                        <>
                                            <Text>·</Text>
                                            <Text>
                                                {item.total_tracks} tracks
                                            </Text>
                                        </>
                                    )}
                                    {item.album_type && (
                                        <>
                                            <Text>·</Text>
                                            <Text
                                                style={{
                                                    textTransform: 'capitalize',
                                                }}
                                            >
                                                {item.album_type}
                                            </Text>
                                        </>
                                    )}
                                </HStack>
                            </VStack>
                        )}

                        {/* Aggregate stats — average rating, # of ratings, # of
                            likes. Always rendered (guests included) so anyone can
                            see how the community has engaged with the item. */}
                        {(averageRating != null ||
                            ratingCount > 0 ||
                            likeCount > 0) && (
                            <HStack
                                gap="3"
                                fontSize="14px"
                                mt="1"
                                flexWrap="wrap"
                                justify={{ base: 'center', md: 'flex-start' }}
                            >
                                {averageRating != null && (
                                    <HStack
                                        gap="1.5"
                                        color="var(--pressd-green)"
                                    >
                                        <FaStar />
                                        <Text fontWeight="600">
                                            {(averageRating / 2).toFixed(2)}
                                        </Text>
                                    </HStack>
                                )}
                                {ratingCount > 0 && (
                                    <Text
                                        color="var(--pressd-text-muted)"
                                        fontSize="13px"
                                    >
                                        {ratingCount}{' '}
                                        {ratingCount === 1
                                            ? 'rating'
                                            : 'ratings'}
                                    </Text>
                                )}
                                {likeCount > 0 && (
                                    <HStack gap="1.5" color="var(--pressd-red)">
                                        <FaHeart />
                                        <Text fontWeight="600">
                                            {likeCount}
                                        </Text>
                                        <Text
                                            color="var(--pressd-text-muted)"
                                            fontSize="13px"
                                            fontWeight="400"
                                        >
                                            {likeCount === 1 ? 'like' : 'likes'}
                                        </Text>
                                    </HStack>
                                )}
                            </HStack>
                        )}

                        {/* Spotify link */}
                        {item.external_url && (
                            <a
                                href={item.external_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    marginTop: '4px',
                                    color: 'var(--pressd-text-muted)',
                                    fontSize: '11px',
                                    fontFamily: 'var(--pressd-mono)',
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    transition: 'color 0.15s ease',
                                    textDecoration: 'none',
                                }}
                                onMouseEnter={(e) => {
                                    ;(
                                        e.currentTarget as HTMLAnchorElement
                                    ).style.color = '#1DB954'
                                }}
                                onMouseLeave={(e) => {
                                    ;(
                                        e.currentTarget as HTMLAnchorElement
                                    ).style.color = 'var(--pressd-text-muted)'
                                }}
                            >
                                <FaSpotify />
                                <span>Open in Spotify</span>
                            </a>
                        )}
                    </VStack>
                </Flex>
            </Container>
        </Box>
    )
}

export { DetailHero }
