import { Box, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router'
import type { RatingItem } from '@/features/profile/types/profile'
import { StarDisplay } from './StarDisplay'

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
