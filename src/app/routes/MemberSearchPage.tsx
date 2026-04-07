import { Box, Button, Center, Container, Heading, Text, VStack } from '@chakra-ui/react'
import { useSearchParams } from 'react-router'
import { MemberList } from '@/features/members/components/member-list/MemberList'
import { MemberTimeFilterPills } from '@/features/members/components/member-time-filter-pills/MemberTimeFilterPills'
import { useMembersList } from '@/features/members/hooks/useMembersList'
import type { MemberTimeFrame } from '@/features/members/types/members'

const VALID_FILTERS: MemberTimeFrame[] = ['week', 'month', 'year', 'all']

const parseFilter = (raw: string | null): MemberTimeFrame => {
    if (raw && (VALID_FILTERS as string[]).includes(raw)) return raw as MemberTimeFrame
    return 'week'
}

export const MemberSearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const activeFilter = parseFilter(searchParams.get('filter'))
    const query = searchParams.get('q') ?? ''

    const { data, isLoading, hasMore, loadMore } = useMembersList({
        timeFrame: activeFilter,
        pageSize: 20,
        query,
    })

    const handleFilterChange = (filter: MemberTimeFrame) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev)
            next.set('filter', filter)
            return next
        })
    }

    return (
        <Box minH="100%" py={{ base: '5', md: '7' }}>
            <Container maxW="1200px" px={{ base: '4', md: '7' }}>
                <VStack align="stretch" gap={{ base: '5', md: '6' }}>
                    <Box>
                        <Text
                            fontSize="11px"
                            textTransform="uppercase"
                            className="pressd-mono"
                            letterSpacing="0.08em"
                            color="var(--pressd-text-muted)"
                            mb="1"
                        >
                            members
                        </Text>
                        <Heading
                            size="xl"
                            color="var(--pressd-text)"
                            fontWeight="700"
                        >
                            {query ? `Results for "${query}"` : 'Browse Members'}
                        </Heading>
                    </Box>

                    <MemberTimeFilterPills
                        activeFilter={activeFilter}
                        onChange={handleFilterChange}
                    />

                    <MemberList
                        members={data}
                        isLoading={isLoading}
                    />

                    {hasMore && (
                        <Center>
                            <Button
                                onClick={loadMore}
                                size="md"
                                className="pressd-mono"
                                fontSize="11px"
                                textTransform="uppercase"
                                letterSpacing="0.1em"
                                bg="var(--pressd-surface)"
                                color="var(--pressd-text-muted)"
                                border="1px solid var(--pressd-border)"
                                borderRadius="9999px"
                                px="8"
                                _hover={{
                                    bg: 'var(--pressd-surface-2)',
                                    borderColor: 'var(--pressd-accent-dim)',
                                    color: 'var(--pressd-text)',
                                }}
                                transition="all 0.15s ease"
                            >
                                Load More
                            </Button>
                        </Center>
                    )}
                </VStack>
            </Container>
        </Box>
    )
}
