import { Avatar, Box, HStack, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router'
import type { MemberRow } from '@/features/members/types/members'

type MemberListRowProps = {
    member: MemberRow
}

type StatColProps = {
    label: string
    value: number
}

const StatCol = ({ label, value }: StatColProps) => (
    <VStack gap="0" align="center" minW="52px">
        <Text
            fontSize="xs"
            fontWeight="600"
            color="var(--pressd-text)"
        >
            {value.toLocaleString()}
        </Text>
        <Text
            fontSize="10px"
            color="var(--pressd-text-muted)"
            className="pressd-mono"
            textTransform="uppercase"
            letterSpacing="0.05em"
        >
            {label}
        </Text>
    </VStack>
)

export const MemberListRow = ({ member }: MemberListRowProps) => (
    <Link to={`/profile/${member.username}`} style={{ width: '100%', display: 'block' }}>
        <HStack
            align="center"
            justify="space-between"
            p="12px 14px"
            borderRadius="10px"
            border="1px solid var(--pressd-border)"
            bg="var(--pressd-surface)"
            transition="border-color 0.15s ease, background-color 0.15s ease"
            _hover={{
                borderColor: 'var(--pressd-accent-dim)',
                bg: 'var(--pressd-surface-2)',
            }}
            width="100%"
            gap="4"
        >
            <HStack align="center" gap="3" minW="0" flex="1">
                <Avatar.Root style={{ width: '44px', height: '44px', flexShrink: 0 }}>
                    {member.avatar_url ? (
                        <Avatar.Image src={member.avatar_url} />
                    ) : null}
                    <Avatar.Fallback
                        bg="var(--pressd-surface-2)"
                        color="var(--pressd-text-muted)"
                        fontSize="14px"
                        className="pressd-mono"
                    >
                        {member.username.slice(0, 2).toUpperCase()}
                    </Avatar.Fallback>
                </Avatar.Root>
                <Box minW="0">
                    <Text fontWeight="600" lineClamp={1} color="var(--pressd-text)">
                        {member.display_name ?? member.username}
                    </Text>
                    {member.bio ? (
                        <Text
                            fontSize="sm"
                            color="var(--pressd-text-sub)"
                            lineClamp={1}
                        >
                            {member.bio}
                        </Text>
                    ) : (
                        <Text
                            fontSize="sm"
                            color="var(--pressd-text-muted)"
                            className="pressd-mono"
                        >
                            @{member.username}
                        </Text>
                    )}
                </Box>
            </HStack>

            <HStack gap={{ base: '3', md: '5' }} flexShrink={0}>
                <StatCol
                    label="Tracks"
                    value={member.tracks_listened}
                />
                <StatCol
                    label="Albums"
                    value={member.albums_listened}
                />
                <StatCol
                    label="Liked"
                    value={member.tracks_liked + member.albums_liked}
                />
                <StatCol
                    label="Lists"
                    value={member.public_playlists}
                />
            </HStack>
        </HStack>
    </Link>
)
