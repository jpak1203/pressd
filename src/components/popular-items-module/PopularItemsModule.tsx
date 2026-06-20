import { Box, Flex, Heading, HStack, Link, Skeleton, VStack } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router'
import type { ItemDetail } from '@/features/detail/types/detail'
import { ItemRow } from '@/components/item-row/ItemRow'

type PopularItemsModuleProps = {
    items: ItemDetail[]
    headerText: string
    moreHref: string
    isLoading?: boolean
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
        <Skeleton width="20px" height="14px" borderRadius="3px" flexShrink={0} />
        <Skeleton width="44px" height="44px" borderRadius="6px" flexShrink={0} />
        <Box flex="1">
            <Skeleton height="13px" width="140px" borderRadius="3px" mb="5px" />
            <Skeleton height="11px" width="90px" borderRadius="3px" />
        </Box>
    </HStack>
)

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
                      <ItemRow key={`${item.type}:${item.id}`} item={item} rank={i + 1} />
                  ))}
        </VStack>
    </Box>
)
