import { Box, Flex, Link, Text, VStack } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router'
import type { ResultsListType } from '@/features/search-results/types/search-results'

export const SearchResultsList = ({
    title,
    emptyText,
    children,
    isEmpty,
    seeAllHref,
}: ResultsListType) => (
    <Box
        p="16px"
        bg="var(--pressd-surface)"
        border="1px solid var(--pressd-border)"
        borderRadius="14px"
    >
        <Flex align="center" justify="space-between" mb="12px">
            <Text
                className="pressd-mono"
                fontSize="11px"
                letterSpacing="0.08em"
                color="var(--pressd-text-muted)"
            >
                {title}
            </Text>
            {seeAllHref && !isEmpty && (
                <Link
                    asChild
                    fontSize="11px"
                    className="pressd-mono"
                    color="var(--pressd-accent)"
                    _hover={{ color: 'var(--pressd-accent-dim)' }}
                >
                    <RouterLink to={seeAllHref}>see all</RouterLink>
                </Link>
            )}
        </Flex>
        <VStack align="stretch" gap="2.5">
            {isEmpty ? (
                <Text color="var(--pressd-text-sub)">{emptyText}</Text>
            ) : (
                children
            )}
        </VStack>
    </Box>
)

