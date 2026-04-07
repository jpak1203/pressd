import { Box, Flex, HStack, Skeleton, Text, VStack } from '@chakra-ui/react'
import { MemberListRow } from '@/features/members/components/member-list-row/MemberListRow'
import type { MemberRow } from '@/features/members/types/members'

type MemberListProps = {
    members: MemberRow[]
    isLoading: boolean
}

const SkeletonRow = () => (
    <HStack
        align="center"
        justify="space-between"
        p="12px 14px"
        borderRadius="10px"
        border="1px solid var(--pressd-border)"
        bg="var(--pressd-surface)"
        width="100%"
        gap="4"
    >
        <HStack gap="3" flex="1">
            <Skeleton width="44px" height="44px" borderRadius="9999px" flexShrink={0} />
            <Box flex="1">
                <Skeleton height="14px" width="120px" borderRadius="4px" mb="6px" />
                <Skeleton height="12px" width="80px" borderRadius="4px" />
            </Box>
        </HStack>
        <HStack gap="5" flexShrink={0}>
            {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} height="32px" width="52px" borderRadius="4px" />
            ))}
        </HStack>
    </HStack>
)

export const MemberList = ({ members, isLoading }: MemberListProps) => (
    <Box as="section" w="100%">
        <Flex
            alignItems="center"
            borderBottom="1px solid var(--pressd-border)"
            pb="10px"
            mb="12px"
        >
            <Text
                textTransform="uppercase"
                className="pressd-mono"
                letterSpacing="0.08em"
                fontSize="11px"
                color="var(--pressd-text-muted)"
                fontWeight="600"
            >
                Members
            </Text>
        </Flex>

        {isLoading ? (
            <VStack gap="2" align="stretch">
                {Array.from({ length: 8 }).map((_, i) => (
                    <SkeletonRow key={i} />
                ))}
            </VStack>
        ) : members.length === 0 ? (
            <Box
                py="10"
                textAlign="center"
                bg="var(--pressd-surface)"
                borderRadius="10px"
                border="1px solid var(--pressd-border)"
            >
                <Text color="var(--pressd-text-muted)" className="pressd-mono" fontSize="sm">
                    No members found
                </Text>
            </Box>
        ) : (
            <VStack gap="2" align="stretch">
                {members.map((member) => (
                    <MemberListRow key={member.id} member={member} />
                ))}
            </VStack>
        )}
    </Box>
)
