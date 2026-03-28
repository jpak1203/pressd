import type { ReactNode } from 'react'
import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react'

type SearchSectionProps = {
    title: string
    emptyText: string
    isEmpty: boolean
    onSeeAll: () => void
    showSeeAll: boolean
    children: ReactNode
}

export const SearchSection = ({
    title,
    emptyText,
    isEmpty,
    onSeeAll,
    showSeeAll,
    children,
}: SearchSectionProps) => (
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
            {showSeeAll && !isEmpty && (
                <Button
                    variant="ghost"
                    size="xs"
                    className="pressd-mono"
                    color="var(--pressd-accent)"
                    _hover={{ bg: 'var(--pressd-surface-2)' }}
                    onClick={onSeeAll}
                >
                    see all
                </Button>
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
