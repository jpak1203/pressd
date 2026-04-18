import { Box, Flex, Heading, HStack, Image, Link, Skeleton, Text, VStack } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router'
import type { ItemDetail } from '@/features/detail/types/detail'
import { AlbumLink } from '@/components/album-link/AlbumLink'

type PopularItemsModuleProps = {
    items: ItemDetail[]
    headerText: string
    moreHref: string
    isLoading?: boolean
}

const itemHref = (item: ItemDetail): string => {
    if (item.type === 'track') return `/track/${item.id}`
    if (item.type === 'album') return `/album/${item.id}`
    return `/artist/${item.id}`
}

const SkeletonRow = () => (
    <HStack
        align="center"
        gap="3"
        p="10px 12px"
        borderRadius="8px"
        border="1px solid var(--pressd-border)"
        bg="var(--pressd-surface)"
    >
        <Skeleton width="20px" height="14px" borderRadius="3px" flexShrink={0} />
        <Skeleton width="40px" height="40px" borderRadius="6px" flexShrink={0} />
        <Box flex="1">
            <Skeleton height="13px" width="140px" borderRadius="3px" mb="5px" />
            <Skeleton height="11px" width="90px" borderRadius="3px" />
        </Box>
    </HStack>
)

const ItemRow = ({ item, rank }: { item: ItemDetail; rank: number }) => {
    const href = itemHref(item)
    const subtitle =
        item.type === 'track' || item.type === 'album'
            ? (item.artists[0]?.name ?? null)
            : null

    const content = (
        <HStack
            align="center"
            gap="3"
            p="10px 12px"
            borderRadius="8px"
            border="1px solid var(--pressd-border)"
            bg="var(--pressd-surface)"
            transition="border-color 0.15s ease, background-color 0.15s ease"
            _hover={{
                borderColor: 'var(--pressd-accent-dim)',
                bg: 'var(--pressd-surface-2)',
            }}
            width="100%"
        >
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
            <Image
                src={item.image ?? undefined}
                alt={item.name}
                width="40px"
                height="40px"
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
        </HStack>
    )

    if (item.type === 'album') {
        return (
            <AlbumLink album={item} style={{ width: '100%', display: 'block' }}>
                {content}
            </AlbumLink>
        )
    }

    return (
        <RouterLink to={href} state={item} style={{ width: '100%', display: 'block' }}>
            {content}
        </RouterLink>
    )
}

export const PopularItemsModule = ({
    items,
    headerText,
    moreHref,
    isLoading = false,
}: PopularItemsModuleProps) => (
    <Box as="section" w="100%">
        <Flex
            alignItems="center"
            justifyContent="space-between"
            borderBottom="1px solid var(--pressd-border)"
            pb="10px"
            mb="12px"
        >
            <Heading
                size="md"
                textTransform="uppercase"
                className="pressd-mono"
                letterSpacing="0.08em"
                fontSize="11px"
                color="var(--pressd-text-muted)"
            >
                {headerText}
            </Heading>
            <Link
                asChild
                fontSize="11px"
                textTransform="uppercase"
                color="var(--pressd-text-muted)"
                _hover={{ color: 'var(--pressd-accent)' }}
            >
                <RouterLink to={moreHref}>More</RouterLink>
            </Link>
        </Flex>

        <VStack align="stretch" gap="2">
            {isLoading
                ? Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
                : items.map((item, i) => (
                      <ItemRow key={item.id} item={item} rank={i + 1} />
                  ))}
        </VStack>
    </Box>
)
