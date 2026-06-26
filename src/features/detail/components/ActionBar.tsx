import { Box, Button, HStack, Text } from '@chakra-ui/react'
import {
    FaHeart,
    FaRegHeart,
    FaHeadphones,
    FaBookmark,
    FaRegBookmark,
} from 'react-icons/fa'
import type { ItemInteraction } from '@/features/detail/types/detail'

type ActionBarProps = {
    interactions: ItemInteraction
    onToggleLike: () => void
    onToggleListened: () => void
    onToggleWantToListen: () => void
}

export const ActionBar = ({
    interactions,
    onToggleLike,
    onToggleListened,
    onToggleWantToListen,
}: ActionBarProps) => {
    return (
        <HStack gap="2" flexWrap="wrap">
            <Button
                onClick={onToggleLike}
                size="sm"
                borderRadius="999px"
                border="1px solid"
                borderColor={
                    interactions.liked
                        ? 'var(--pressd-red)'
                        : 'var(--pressd-border)'
                }
                backgroundColor="transparent"
                color={
                    interactions.liked
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
                        {interactions.liked ? <FaHeart /> : <FaRegHeart />}
                    </Box>
                    <Text>{interactions.liked ? 'Liked' : 'Like'}</Text>
                </HStack>
            </Button>

            <Button
                onClick={onToggleListened}
                size="sm"
                borderRadius="999px"
                border="1px solid"
                borderColor={
                    interactions.listened
                        ? 'var(--pressd-green)'
                        : 'var(--pressd-border)'
                }
                backgroundColor="transparent"
                color={
                    interactions.listened
                        ? 'var(--pressd-green)'
                        : 'var(--pressd-text-sub)'
                }
                transition="all 0.15s ease"
                _hover={{
                    borderColor: 'var(--pressd-green)',
                    color: 'var(--pressd-green)',
                    backgroundColor: 'rgba(92,255,194,0.08)',
                }}
                px="14px"
                height="34px"
                fontSize="12px"
                className="pressd-mono"
            >
                <HStack gap="1.5">
                    <Box fontSize="13px">
                        <FaHeadphones />
                    </Box>
                    <Text>
                        {interactions.listened ? 'Listened' : 'Mark Listened'}
                    </Text>
                </HStack>
            </Button>

            <Button
                onClick={onToggleWantToListen}
                size="sm"
                borderRadius="999px"
                border="1px solid"
                borderColor={
                    interactions.wantToListen
                        ? 'var(--pressd-accent)'
                        : 'var(--pressd-border)'
                }
                backgroundColor="transparent"
                color={
                    interactions.wantToListen
                        ? 'var(--pressd-accent)'
                        : 'var(--pressd-text-sub)'
                }
                transition="all 0.15s ease"
                _hover={{
                    borderColor: 'var(--pressd-accent)',
                    color: 'var(--pressd-accent)',
                    backgroundColor: 'var(--pressd-accent-glow)',
                }}
                px="14px"
                height="34px"
                fontSize="12px"
                className="pressd-mono"
            >
                <HStack gap="1.5">
                    <Box fontSize="13px">
                        {interactions.wantToListen ? (
                            <FaBookmark />
                        ) : (
                            <FaRegBookmark />
                        )}
                    </Box>
                    <Text>
                        {interactions.wantToListen
                            ? 'Want to Listen'
                            : 'Listen Later'}
                    </Text>
                </HStack>
            </Button>
        </HStack>
    )
}

