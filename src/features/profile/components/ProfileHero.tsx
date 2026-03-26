import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Image,
    Text,
    VStack,
} from '@chakra-ui/react'
import { FaEdit } from 'react-icons/fa'
import type { ProfileData } from '@/features/profile/types/profile'
import { formatMemberSince } from '@/lib/formatters'

type ProfileHeroProps = {
    profile: ProfileData
    isOwnProfile: boolean
    onEdit: () => void
}

const ProfileHero = ({ profile, isOwnProfile, onEdit }: ProfileHeroProps) => {
    const avatarSrc = profile.avatar_url ?? undefined

    return (
        <Box position="relative" overflow="hidden">
            {avatarSrc && (
                <Box
                    position="absolute"
                    inset="0"
                    backgroundImage={`url(${avatarSrc})`}
                    backgroundSize="cover"
                    backgroundPosition="center"
                    filter="blur(60px) brightness(0.22) saturate(1.8)"
                    transform="scale(1.3)"
                />
            )}
            <Box
                position="absolute"
                inset="0"
                background="linear-gradient(to bottom, rgba(12,12,15,0.25) 0%, var(--pressd-bg) 100%)"
            />
            <Box
                position="absolute"
                inset="0"
                background="radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,167,255,0.06), transparent 70%)"
            />

            <Container
                maxW="1200px"
                px={{ base: '4', md: '7' }}
                pt={{ base: '10', md: '14' }}
                pb={{ base: '8', md: '10' }}
                position="relative"
            >
                <Flex
                    gap={{ base: '5', md: '8' }}
                    align={{ base: 'center', md: 'flex-end' }}
                    flexDirection={{ base: 'column', md: 'row' }}
                    textAlign={{ base: 'center', md: 'left' }}
                >
                    <Box flexShrink={0}>
                        {avatarSrc ? (
                            <Image
                                src={avatarSrc}
                                alt={profile.username}
                                width={{ base: '150px', md: '190px' }}
                                height={{ base: '150px', md: '190px' }}
                                objectFit="cover"
                                borderRadius="50%"
                                boxShadow="0 24px 60px rgba(0,0,0,0.7)"
                                border="3px solid var(--pressd-border)"
                            />
                        ) : (
                            <Box
                                width={{ base: '150px', md: '190px' }}
                                height={{ base: '150px', md: '190px' }}
                                borderRadius="50%"
                                bg="var(--pressd-surface-2)"
                                border="1px solid var(--pressd-border)"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Text
                                    fontSize="48px"
                                    color="var(--pressd-border)"
                                >
                                    👤
                                </Text>
                            </Box>
                        )}
                    </Box>

                    <VStack
                        align={{ base: 'center', md: 'flex-start' }}
                        gap="2"
                        flex="1"
                        minW="0"
                        pb={{ md: '1' }}
                    >
                        <Text
                            className="pressd-mono"
                            fontSize="10px"
                            color="var(--pressd-accent)"
                            letterSpacing="0.14em"
                        >
                            PROFILE
                        </Text>

                        <Heading
                            size={{ base: 'xl', md: '2xl' }}
                            fontWeight="700"
                            color="var(--pressd-text)"
                            lineHeight="1.15"
                            letterSpacing="-0.01em"
                        >
                            {profile.username}
                        </Heading>

                        {profile.bio && (
                            <Text
                                color="var(--pressd-text-sub)"
                                fontSize="14px"
                                maxW="480px"
                            >
                                {profile.bio}
                            </Text>
                        )}

                        <Text color="var(--pressd-text-muted)" fontSize="12px">
                            Member since {formatMemberSince(profile.created_at)}
                        </Text>

                        {isOwnProfile && (
                            <Button
                                size="sm"
                                onClick={onEdit}
                                border="1px solid var(--pressd-border)"
                                backgroundColor="var(--pressd-surface-2)"
                                color="var(--pressd-text-sub)"
                                borderRadius="999px"
                                fontSize="12px"
                                className="pressd-mono"
                                px="14px"
                                mt="1"
                                _hover={{
                                    color: 'var(--pressd-text)',
                                    borderColor: 'var(--pressd-accent-dim)',
                                }}
                            >
                                <FaEdit />
                                edit profile
                            </Button>
                        )}
                    </VStack>
                </Flex>
            </Container>
        </Box>
    )
}

export default ProfileHero
