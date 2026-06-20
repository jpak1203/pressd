import { Box, Button, Center, Container, Flex, Heading, Link, Text, VStack } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router'
import { MemberGridModule } from '@/features/members/components/member-grid-module/MemberGridModule'
import { MemberList } from '@/features/members/components/member-list/MemberList'
import { usePopularMembers } from '@/features/members/hooks/usePopularMembers'
import { useMembersList } from '@/features/members/hooks/useMembersList'

const WEEK_AGO = new Date(Date.now() - 7 * 86_400_000).toISOString()

export const MembersPage = () => {
    const { data: featuredData, isLoading: featuredLoading } = usePopularMembers({ since: null })
    const { data: weekData, isLoading: weekLoading } = usePopularMembers({ since: WEEK_AGO })
    const { data: listData, isLoading: listLoading } = useMembersList({
        timeFrame: 'week',
        pageSize: 10,
    })

    return (
        <Box minH="100%" py={{ base: '5', md: '7' }}>
            <Container maxW="1200px" px={{ base: '4', md: '7' }}>
                <VStack align="stretch" gap={{ base: '10', md: '12' }}>
                    <MemberGridModule
                        items={featuredData}
                        headerText="Featured Members"
                        isLoading={featuredLoading}
                    />
                    <MemberGridModule
                        items={weekData}
                        headerText="Popular This Week"
                        linkText="More"
                        moreHref="/members/search?filter=week"
                        isLoading={weekLoading}
                    />
                    <Box as="section" w="100%">
                        <Flex
                            alignItems="baseline"
                            justifyContent="space-between"
                            borderBottom="1px solid var(--pressd-border)"
                            pb="10px"
                            mb="12px"
                            gap="3"
                        >
                            <Heading
                                size="md"
                                textTransform="uppercase"
                                className="pressd-mono"
                                letterSpacing="0.08em"
                                fontSize="11px"
                                color="var(--pressd-text-muted)"
                            >
                                Popular Members
                            </Heading>
                            <Text
                                fontSize="11px"
                                color="var(--pressd-text-muted)"
                                fontStyle="italic"
                            >
                                Ranked by most liked reviews this week
                            </Text>
                        </Flex>
                        <MemberList
                            members={listData}
                            isLoading={listLoading}
                        />
                    </Box>
                    <Center>
                        <Link asChild _hover={{ textDecoration: 'none' }}>
                            <RouterLink to="/members/search">
                                <Button
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
                                    View More
                                </Button>
                            </RouterLink>
                        </Link>
                    </Center>
                </VStack>
            </Container>
        </Box>
    )
}
