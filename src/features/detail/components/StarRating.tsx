import { useCallback, useRef, useState } from 'react'
import { Box, HStack } from '@chakra-ui/react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

type StarRatingProps = {
    /** Internal 1-10 scale (half-star granularity) */
    value: number | null
    onChange?: (rating: number | null) => void
    size?: string
    readOnly?: boolean
}

const StarRating = ({
    value,
    onChange,
    size = '18px',
    readOnly = false,
}: StarRatingProps) => {
    const [hovered, setHovered] = useState<number | null>(null)
    const display = hovered ?? value ?? 0
    const starRefs = useRef<(HTMLButtonElement | null)[]>([])

    const getHalfValue = useCallback(
        (starIndex: number, e: React.MouseEvent) => {
            const el = starRefs.current[starIndex]
            if (!el) return starIndex * 2
            const rect = el.getBoundingClientRect()
            const isLeft = e.clientX - rect.left < rect.width / 2
            return isLeft ? starIndex * 2 - 1 : starIndex * 2
        },
        []
    )

    const renderStar = (starIndex: number) => {
        const full = starIndex * 2
        const half = full - 1
        if (display >= full) return <FaStar />
        if (display >= half) return <FaStarHalfAlt />
        return <FaRegStar />
    }

    return (
        <HStack gap="3px">
            {[1, 2, 3, 4, 5].map((star) => (
                <Box
                    key={star}
                    ref={(el: HTMLButtonElement | null) => {
                        starRefs.current[star] = el
                    }}
                    as="button"
                    fontSize={size}
                    lineHeight="1"
                    display="flex"
                    alignItems="center"
                    color={
                        display >= star * 2 - 1
                            ? 'var(--pressd-accent)'
                            : 'var(--pressd-border)'
                    }
                    cursor={readOnly ? 'default' : 'pointer'}
                    transition="color 0.1s ease, transform 0.1s ease"
                    _hover={
                        !readOnly
                            ? {
                                  transform: 'scale(1.25)',
                                  color: 'var(--pressd-accent)',
                              }
                            : undefined
                    }
                    onClick={(e: React.MouseEvent) => {
                        if (readOnly || !onChange) return
                        const newVal = getHalfValue(star, e)
                        onChange(value === newVal ? null : newVal)
                    }}
                    onMouseMove={(e: React.MouseEvent) => {
                        if (readOnly) return
                        setHovered(getHalfValue(star, e))
                    }}
                    onMouseLeave={() => !readOnly && setHovered(null)}
                >
                    {renderStar(star)}
                </Box>
            ))}
        </HStack>
    )
}

export { StarRating }
