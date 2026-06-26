import { useEffect, useState } from 'react'
import {
    Box,
    Button,
    CloseButton,
    Dialog,
    Flex,
    HStack,
    IconButton,
    Input,
    Text,
    Textarea,
    VStack,
} from '@chakra-ui/react'
import { FaHeart, FaRegHeart, FaTimes } from 'react-icons/fa'
import type { ItemType } from '@/features/detail/types/detail'
import type { LogItemOpts } from '@/features/detail/hooks/usePersistInteractions'
import { StarRating } from '@/features/detail/components/StarRating'

type LogModalProps = {
    open: boolean
    onClose: () => void
    itemName: string
    itemType: ItemType
    currentRating: number | null
    currentLiked: boolean
    onLog: (opts: LogItemOpts) => void
}

const toLocalDateString = (d: Date) => {
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

const today = toLocalDateString(new Date())

export const LogModal = ({
    open,
    onClose,
    itemName,
    itemType,
    currentRating,
    currentLiked,
    onLog,
}: LogModalProps) => {
    const [date, setDate] = useState(today)
    const [rating, setRating] = useState<number | null>(currentRating)
    const [liked, setLiked] = useState(currentLiked)
    const [reviewText, setReviewText] = useState('')

    useEffect(() => {
        if (open) {
            setDate(today)
            setRating(currentRating)
            setLiked(currentLiked)
            setReviewText('')
        }
    }, [open, currentRating, currentLiked])

    const handleSubmit = () => {
        onLog({
            listenedAt: date,
            rating,
            liked,
            reviewText: reviewText.trim() || undefined,
        })
        onClose()
    }

    return (
        <Dialog.Root open={open} onOpenChange={(e) => !e.open && onClose()}>
            <Dialog.Backdrop bg="blackAlpha.700" backdropFilter="blur(4px)" />
            <Dialog.Positioner>
                <Dialog.Content
                    bg="var(--pressd-surface)"
                    border="1px solid var(--pressd-border)"
                    borderRadius="16px"
                    p="6"
                    maxW="480px"
                    w="90vw"
                >
                    <Flex justify="space-between" align="center" mb="5">
                        <Box>
                            <Text
                                className="pressd-mono"
                                fontSize="10px"
                                color="var(--pressd-accent)"
                                letterSpacing="0.14em"
                            >
                                LOG {itemType.toUpperCase()}
                            </Text>
                            <Text
                                fontSize="14px"
                                fontWeight="600"
                                color="var(--pressd-text)"
                                mt="1"
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                            >
                                {itemName}
                            </Text>
                        </Box>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton
                                size="sm"
                                color="var(--pressd-text-muted)"
                            />
                        </Dialog.CloseTrigger>
                    </Flex>

                    <VStack gap="5" align="stretch">
                        <Box>
                            <Text
                                fontSize="11px"
                                color="var(--pressd-text-muted)"
                                mb="2"
                                className="pressd-mono"
                            >
                                DATE LISTENED
                            </Text>
                            <Input
                                type="date"
                                value={date}
                                max={today}
                                onChange={(e) => setDate(e.target.value)}
                                bg="var(--pressd-bg)"
                                border="1px solid var(--pressd-border)"
                                color="var(--pressd-text)"
                                fontSize="14px"
                                borderRadius="8px"
                                _focus={{
                                    borderColor: 'var(--pressd-accent)',
                                    outline: 'none',
                                }}
                                colorScheme="dark"
                            />
                        </Box>

                        {itemType !== 'artist' && (
                            <Box>
                                <Text
                                    fontSize="11px"
                                    color="var(--pressd-text-muted)"
                                    mb="2"
                                    className="pressd-mono"
                                >
                                    RATING
                                </Text>
                                <HStack gap="2">
                                    <StarRating
                                        value={rating}
                                        onChange={setRating}
                                        size="24px"
                                    />
                                    {rating !== null && (
                                        <IconButton
                                            aria-label="Clear rating"
                                            size="xs"
                                            variant="ghost"
                                            borderRadius="999px"
                                            color="var(--pressd-text-muted)"
                                            minW="20px"
                                            h="20px"
                                            _hover={{
                                                color: 'var(--pressd-red)',
                                                bg: 'rgba(255,143,166,0.12)',
                                            }}
                                            onClick={() => setRating(null)}
                                        >
                                            <FaTimes />
                                        </IconButton>
                                    )}
                                </HStack>
                            </Box>
                        )}

                        <Box>
                            <Text
                                fontSize="11px"
                                color="var(--pressd-text-muted)"
                                mb="2"
                                className="pressd-mono"
                            >
                                LIKED
                            </Text>
                            <Button
                                onClick={() => setLiked((prev) => !prev)}
                                size="sm"
                                borderRadius="999px"
                                border="1px solid"
                                borderColor={
                                    liked
                                        ? 'var(--pressd-red)'
                                        : 'var(--pressd-border)'
                                }
                                backgroundColor={
                                    liked
                                        ? 'rgba(255,143,166,0.08)'
                                        : 'transparent'
                                }
                                color={
                                    liked
                                        ? 'var(--pressd-red)'
                                        : 'var(--pressd-text-sub)'
                                }
                                transition="all 0.15s ease"
                                _hover={{
                                    borderColor: 'var(--pressd-red)',
                                    color: 'var(--pressd-red)',
                                    backgroundColor: 'rgba(255,143,166,0.08)',
                                }}
                                px="14px"
                                height="34px"
                                fontSize="12px"
                                className="pressd-mono"
                            >
                                <HStack gap="1.5">
                                    <Box fontSize="13px">
                                        {liked ? <FaHeart /> : <FaRegHeart />}
                                    </Box>
                                    <Text>{liked ? 'Liked' : 'Like'}</Text>
                                </HStack>
                            </Button>
                        </Box>

                        {itemType !== 'artist' && (
                            <Box>
                                <Text
                                    fontSize="11px"
                                    color="var(--pressd-text-muted)"
                                    mb="2"
                                    className="pressd-mono"
                                >
                                    REVIEW
                                </Text>
                                <Textarea
                                    value={reviewText}
                                    onChange={(e) =>
                                        setReviewText(e.target.value)
                                    }
                                    placeholder="What did you think?"
                                    bg="var(--pressd-bg)"
                                    border="1px solid var(--pressd-border)"
                                    color="var(--pressd-text)"
                                    fontSize="14px"
                                    borderRadius="8px"
                                    rows={3}
                                    resize="vertical"
                                    _focus={{
                                        borderColor: 'var(--pressd-accent)',
                                        outline: 'none',
                                    }}
                                />
                            </Box>
                        )}

                        <Flex gap="3" justify="flex-end" mt="1">
                            <Button
                                size="sm"
                                onClick={onClose}
                                border="1px solid var(--pressd-border)"
                                backgroundColor="transparent"
                                color="var(--pressd-text-muted)"
                                borderRadius="999px"
                                fontSize="12px"
                                className="pressd-mono"
                                px="14px"
                                _hover={{ color: 'var(--pressd-text)' }}
                            >
                                cancel
                            </Button>
                            <Button
                                size="sm"
                                onClick={handleSubmit}
                                bg="var(--pressd-accent)"
                                color="var(--pressd-bg)"
                                borderRadius="999px"
                                fontSize="12px"
                                className="pressd-mono"
                                px="18px"
                                _hover={{
                                    bg: 'var(--pressd-accent-dim)',
                                    color: 'var(--pressd-text)',
                                }}
                            >
                                log
                            </Button>
                        </Flex>
                    </VStack>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    )
}
