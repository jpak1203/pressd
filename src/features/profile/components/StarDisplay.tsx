import { Box, Flex } from '@chakra-ui/react'
import { FaStar } from 'react-icons/fa'

type StarDisplayProps = {
    rating: number
}

const StarDisplay = ({ rating }: StarDisplayProps) => {
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

export { StarDisplay }
