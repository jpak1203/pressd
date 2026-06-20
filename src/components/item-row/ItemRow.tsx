import { Box, HStack, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router'
import type { ItemDetail } from '@/features/detail/types/detail'
import { AlbumLink } from '@/components/album-link/AlbumLink'

const ROW_LINK_STYLE: React.CSSProperties = { width: '100%', display: 'block' }

const itemHref = (item: ItemDetail): string => {
    if (item.type === 'track') return `/track/${item.id}`
    if (item.type === 'album') return `/album/${item.id}`
    return `/artist/${item.id}`
}

const itemSubtitle = (item: ItemDetail): string | null =>
    item.type === 'artist' ? null : (item.artists[0]?.name ?? null)

const itemYear = (item: ItemDetail): string | null =>
    item.type === 'artist' ? null : (item.release_date?.slice(0, 4) ?? null)

type ItemRowProps = {
    item: ItemDetail
    rank?: number
    showYear?: boolean
}

const ItemRowContent = ({ item, rank, showYear }: ItemRowProps) => {
    const subtitle = itemSubtitle(item)
    const year = showYear ? itemYear(item) : null

    return (
        <HStack
            align="center"
            gap="3"
            p="10px 14px"
            borderRadius="10px"
            border="1px solid var(--pressd-border)"
            bg="var(--pressd-surface)"
            transition="border-color 0.15s ease, background-color 0.15s ease"
            _hover={{
                borderColor: 'var(--pressd-accent-dim)',
                bg: 'var(--pressd-surface-2)',
            }}
            width="100%"
        >
            {rank !== undefined && (
                <Text
                    className="pressd-mono"
                    fontSize="12px"
                    color="var(--pressd-text-muted)"
                    fontWeight="600"
                    w="20px"
                    textAlign="right"
                    flexShrink={0}
                >
                    {rank}
                </Text>
            )}
            <Image
                src={item.image ?? undefined}
                alt={item.name}
                width="44px"
                height="44px"
                objectFit="cover"
                borderRadius="6px"
                border="1px solid var(--pressd-border)"
                flexShrink={0}
            />
            <Box minW="0" flex="1">
                <Text fontWeight="600" lineClamp={1} color="var(--pressd-text)" fontSize="sm">
                    {item.name}
                </Text>
                {subtitle && (
                    <Text fontSize="xs" color="var(--pressd-text-muted)" lineClamp={1}>
                        {subtitle}
                    </Text>
                )}
            </Box>
            {year && (
                <Text
                    fontSize="xs"
                    color="var(--pressd-text-muted)"
                    className="pressd-mono"
                    flexShrink={0}
                >
                    {year}
                </Text>
            )}
        </HStack>
    )
}

export const ItemRow = ({ item, rank, showYear = false }: ItemRowProps) => {
    const content = <ItemRowContent item={item} rank={rank} showYear={showYear} />

    if (item.type === 'album') {
        return (
            <AlbumLink album={item} style={ROW_LINK_STYLE}>
                {content}
            </AlbumLink>
        )
    }

    return (
        <Link to={itemHref(item)} state={item} style={ROW_LINK_STYLE}>
            {content}
        </Link>
    )
}
