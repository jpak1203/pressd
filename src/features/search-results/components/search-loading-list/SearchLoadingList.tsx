import { Box, Text, VStack, HStack, Skeleton } from '@chakra-ui/react'

export const SearchLoadingList = ({ title }: { title: string }) => (
    <Box
        p="16px"
        bg="var(--pressd-surface)"
        border="1px solid var(--pressd-border)"
        borderRadius="14px"
    >
        <Text
            className="pressd-mono"
            fontSize="11px"
            letterSpacing="0.08em"
            color="var(--pressd-text-muted)"
            mb="12px"
        >
            {title}
        </Text>
        <VStack align="stretch" gap="2.5">
            {Array.from({ length: 4 }).map((_, idx) => (
                <HStack key={`${title}-${idx}`} gap="3">
                    <Skeleton
                        height="56px"
                        width="56px"
                        borderRadius="8px"
                        css={{
                            '--start-color': 'var(--pressd-surface-2)',
                            '--end-color': 'var(--pressd-border)',
                        }}
                    />
                    <VStack align="stretch" gap="2" flex="1">
                        <Skeleton
                            height="13px"
                            borderRadius="4px"
                            css={{
                                '--start-color': 'var(--pressd-surface-2)',
                                '--end-color': 'var(--pressd-border)',
                            }}
                        />
                        <Skeleton
                            height="11px"
                            width="45%"
                            borderRadius="4px"
                            css={{
                                '--start-color': 'var(--pressd-surface-2)',
                                '--end-color': 'var(--pressd-border)',
                            }}
                        />
                    </VStack>
                </HStack>
            ))}
        </VStack>
    </Box>
)

