import { Box, HStack, Skeleton, Text, VStack } from '@chakra-ui/react'
import type { TrackDetail, AlbumDetail } from '@/features/detail/types/detail'
import { ItemRow } from '@/components/item-row/ItemRow'

type ListItem = TrackDetail | AlbumDetail

type ItemListProps = {
    items: ListItem[]
    isLoading: boolean
    emptyText?: string
}

const SkeletonRow = () => (
    <HStack
        align="center"
        gap="3"
        p="10px 14px"
        borderRadius="10px"
        border="1px solid var(--pressd-border)"
        bg="var(--pressd-surface)"
    >
        <Skeleton width="44px" height="44px" borderRadius="6px" flexShrink={0} />
        <Box flex="1">
            <Skeleton height="13px" width="160px" borderRadius="3px" mb="6px" />
            <Skeleton height="11px" width="100px" borderRadius="3px" />
        </Box>
        <Skeleton height="11px" width="50px" borderRadius="3px" flexShrink={0} />
    </HStack>
)

export const ItemList = ({ items, isLoading, emptyText = 'No results found' }: ItemListProps) => {
    if (isLoading) {
        return (
            <VStack gap="2" align="stretch">
                {Array.from({ length: 8 }).map((_, i) => (
                    <SkeletonRow key={i} />
                ))}
            </VStack>
        )
    }

    if (items.length === 0) {
        return (
            <Box
                py="10"
                textAlign="center"
                bg="var(--pressd-surface)"
                borderRadius="10px"
                border="1px solid var(--pressd-border)"
            >
                <Text color="var(--pressd-text-muted)" className="pressd-mono" fontSize="sm">
                    {emptyText}
                </Text>
            </Box>
        )
    }

    return (
        <VStack gap="2" align="stretch">
            {items.map((item) => (
                <ItemRow key={`${item.type}:${item.id}`} item={item} showYear />
            ))}
        </VStack>
    )
}
