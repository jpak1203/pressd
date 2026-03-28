import { useState } from 'react'
import { useParams } from 'react-router'
import { Box, Center, Container, Spinner, Text, VStack } from '@chakra-ui/react'
import { useUserAuth } from '@/features/user-auth/context/UserAuthContext'
import { useProfile } from '@/features/profile/hooks/useProfile'
import ProfileHero from '@/features/profile/components/ProfileHero'
import Top5Section from '@/features/profile/components/Top5Section'
import EditProfileModal from '@/features/profile/components/EditProfileModal'
import Top5EditModal from '@/features/profile/components/Top5EditModal'
import { RatingsSection } from '@/features/profile/components/RatingsSection'
import { DiarySection } from '@/features/profile/components/DiarySection'
import type { Top5Category } from '@/features/profile/types/profile'

const ProfilePage = () => {
    const { username } = useParams<{ username: string }>()
    const { user } = useUserAuth()
    const { data, isLoading, error, refetch } = useProfile(username)

    const isOwnProfile = !!user && data?.profile.id === user.id

    const [editProfileOpen, setEditProfileOpen] = useState(false)
    const [editTop5Category, setEditTop5Category] =
        useState<Top5Category | null>(null)

    if (isLoading) {
        return (
            <Center minH="60vh">
                <Spinner color="var(--pressd-accent)" size="lg" />
            </Center>
        )
    }

    if (error || !data) {
        return (
            <Center minH="60vh" flexDirection="column" gap="4">
                <Text
                    className="pressd-mono"
                    fontSize="10px"
                    color="var(--pressd-text-muted)"
                >
                    profile not found
                </Text>
                <Text
                    color="var(--pressd-text-sub)"
                    fontSize="14px"
                    textAlign="center"
                    maxW="320px"
                >
                    {error ?? 'This profile does not exist.'}
                </Text>
            </Center>
        )
    }

    const top5Map: Record<Top5Category, typeof data.top5Albums> = {
        album: data.top5Albums,
        artist: data.top5Artists,
        track: data.top5Tracks,
    }

    return (
        <Box minH="100%">
            <ProfileHero
                profile={data.profile}
                isOwnProfile={isOwnProfile}
                onEdit={() => setEditProfileOpen(true)}
            />

            <Container
                maxW="1200px"
                px={{ base: '4', md: '7' }}
                py={{ base: '6', md: '8' }}
            >
                <VStack align="stretch" gap="5">
                    {(['album', 'artist', 'track'] as const).map((category) => (
                        <Top5Section
                            key={category}
                            category={category}
                            items={top5Map[category]}
                            isOwnProfile={isOwnProfile}
                            onEdit={() => setEditTop5Category(category)}
                        />
                    ))}

                    <RatingsSection
                        ratings={data.ratings}
                        username={data.profile.username}
                    />
                    <DiarySection entries={data.diary} />
                </VStack>
            </Container>

            {isOwnProfile && data.profile && (
                <EditProfileModal
                    profile={data.profile}
                    open={editProfileOpen}
                    onClose={() => setEditProfileOpen(false)}
                    onSaved={() => void refetch()}
                />
            )}

            {isOwnProfile && editTop5Category && (
                <Top5EditModal
                    profileId={data.profile.id}
                    category={editTop5Category}
                    currentItems={top5Map[editTop5Category]}
                    open={!!editTop5Category}
                    onClose={() => setEditTop5Category(null)}
                    onSaved={() => void refetch()}
                />
            )}
        </Box>
    )
}

export default ProfilePage
