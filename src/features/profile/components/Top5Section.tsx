import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react'
import { FaEdit } from 'react-icons/fa'
import { SectionCard } from '@/features/detail/components/SectionCard'
import { Top5Card } from './Top5Card'
import type { Top5Category, Top5Item } from '@/features/profile/types/profile'

type Top5SectionProps = {
    category: Top5Category
    items: Top5Item[]
    isOwnProfile: boolean
    onEdit: () => void
}

const categoryLabels: Record<Top5Category, string> = {
    album: 'TOP 5 ALBUMS',
    artist: 'TOP 5 ARTISTS',
    track: 'TOP 5 TRACKS',
}

export const Top5Section = ({
    category,
    items,
    isOwnProfile,
    onEdit,
}: Top5SectionProps) => {
    const emptySlots = 5 - items.length

    return (
        <SectionCard label={categoryLabels[category]}>
            <Flex justify="space-between" align="flex-start" gap="4">
                <HStack gap={{ base: '3', md: '5' }} flexWrap="wrap">
                    {items.map((item) => (
                        <Top5Card
                            key={item.id}
                            spotifyId={item.spotify_id}
                            name={item.name}
                            imageUrl={item.image_url}
                            artistName={item.artist_name}
                            rank={item.position}
                            category={category}
                        />
                    ))}
                    {Array.from({ length: emptySlots }).map((_, i) => (
                        <Box
                            key={`empty-${i}`}
                            width={{ base: '80px', md: '120px' }}
                            height={{ base: '80px', md: '120px' }}
                            borderRadius={category === 'artist' ? '50%' : '8px'}
                            border="2px dashed var(--pressd-border)"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Text
                                fontSize="18px"
                                color="var(--pressd-border)"
                                fontWeight="700"
                            >
                                {items.length + i + 1}
                            </Text>
                        </Box>
                    ))}
                </HStack>
                {isOwnProfile && (
                    <Button
                        size="sm"
                        onClick={onEdit}
                        border="1px solid var(--pressd-border)"
                        backgroundColor="var(--pressd-surface-2)"
                        color="var(--pressd-text-sub)"
                        borderRadius="999px"
                        fontSize="11px"
                        className="pressd-mono"
                        px="12px"
                        flexShrink={0}
                        _hover={{
                            color: 'var(--pressd-text)',
                            borderColor: 'var(--pressd-accent-dim)',
                        }}
                    >
                        <FaEdit />
                        edit
                    </Button>
                )}
            </Flex>
        </SectionCard>
    )
}

