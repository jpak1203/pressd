import { Box, Flex } from '@chakra-ui/react'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'

type StarDisplayProps = {
    /** Internal 1-10 scale */
    rating: number
}

const StarDisplay = ({ rating }: StarDisplayProps) => (
    <Flex gap="0.5" color="var(--pressd-accent)">
        {Array.from({ length: 5 }, (_, i) => {
            const full = (i + 1) * 2
            const half = full - 1
            if (rating >= full)
                return (
                    <Box key={i} fontSize="10px">
                        <FaStar />
                    </Box>
                )
            if (rating >= half)
                return (
                    <Box key={i} fontSize="10px">
                        <FaStarHalfAlt />
                    </Box>
                )
            return (
                <Box key={i} opacity={0.2} fontSize="10px">
                    <FaStar />
                </Box>
            )
        })}
    </Flex>
)

export { StarDisplay }
