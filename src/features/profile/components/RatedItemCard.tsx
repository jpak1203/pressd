import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router'
import { FaStar } from 'react-icons/fa'
import type { RatingItem } from '../types/profile'

const StarDisplay = ({ rating }: { rating: number }) => {
    const stars = Math.round(rating / 2)
    return (
        <Flex gap="0.5" color="var(--pressd-accent)">
            {Array.from({ length: 5 }, (_, i) => (
                <Box key={i} opacity={i < stars ? 1 : 0.2} fontSize="10px">
                    <FaStar />
                </Box>
            ))}
        </Flex>
    )
}

type RatedItemCardProps = {
    item: RatingItem
}

const RatedItemCard = ({ item }: RatedItemCardProps) => (
    <Link to={`/${item.item_type}/${item.spotify_id}`}>
        <Box
            bg="var(--pressd-bg)"
            border="1px solid var(--pressd-border)"
            borderRadius="10px"
            overflow="hidden"
            transition="border-color 0.15s"
            _hover={{
                borderColor: 'var(--pressd-accent)',
            }}
        >
            {item.image_url && (
                <Image
                    src={item.image_url}
                    alt={item.name}
                    w="100%"
                    aspectRatio="1"
                    objectFit="cover"
                />
            )}
            <Box p="2.5">
                <Text
                    fontSize="12px"
                    fontWeight="600"
                    color="var(--pressd-text)"
                    lineClamp={1}
                >
                    {item.name}
                </Text>
                {item.artist_name && (
                    <Text
                        fontSize="11px"
                        color="var(--pressd-text-sub)"
                        lineClamp={1}
                    >
                        {item.artist_name}
                    </Text>
                )}
                <Box mt="1">
                    <StarDisplay rating={item.rating} />
                </Box>
            </Box>
        </Box>
    </Link>
)

export { RatedItemCard }
