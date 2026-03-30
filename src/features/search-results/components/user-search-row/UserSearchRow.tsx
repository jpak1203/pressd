import { Box, HStack, Text } from '@chakra-ui/react'
import { Link } from 'react-router'
import { Avatar } from '@chakra-ui/react'
import type { UserSearchResult } from '@/features/search-results/types/search-results'

type UserSearchRowProps = {
    user: UserSearchResult
}

export const UserSearchRow = ({ user }: UserSearchRowProps) => (
    <Link to={`/profile/${user.username}`} style={{ width: '100%', display: 'block' }}>
        <HStack
            align="center"
            gap="3"
            p="10px"
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
            <Avatar.Root
                size="md"
                style={{ width: '42px', height: '42px' }}
            >
                {user.avatar_url ? (
                    <Avatar.Image src={user.avatar_url} />
                ) : null}
                <Avatar.Fallback
                    bg="var(--pressd-surface-2)"
                    color="var(--pressd-text-muted)"
                    fontSize="14px"
                    className="pressd-mono"
                >
                    {user.username.slice(0, 2).toUpperCase()}
                </Avatar.Fallback>
            </Avatar.Root>
            <Box minW="0" flex="1">
                <Text
                    fontWeight="600"
                    lineClamp={1}
                    color="var(--pressd-text)"
                >
                    {user.username}
                </Text>
                {user.bio && (
                    <Text
                        fontSize="sm"
                        color="var(--pressd-text-sub)"
                        lineClamp={1}
                    >
                        {user.bio}
                    </Text>
                )}
            </Box>
        </HStack>
    </Link>
)
