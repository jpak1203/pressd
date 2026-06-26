import { useCallback, useEffect, useRef, useState } from 'react'
import {
    fetchProfileByUsername,
    fetchTop5,
    fetchRatings,
    fetchDiary,
} from '@/features/profile/api/profileApi'
import type {
    FullProfileData,
    Top5Category,
    Top5Item,
} from '@/features/profile/types/profile'

export const useProfile = (username: string | undefined) => {
    const [data, setData] = useState<FullProfileData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const requestIdRef = useRef(0)

    const refetch = useCallback(async () => {
        if (!username) return
        const reqId = ++requestIdRef.current
        const isCurrent = () => reqId === requestIdRef.current

        setIsLoading(true)
        setError(null)

        try {
            const profile = await fetchProfileByUsername(username)
            if (!profile) {
                if (isCurrent()) {
                    setData(null)
                    setError('This profile does not exist.')
                    setIsLoading(false)
                }
                return
            }
            const profileId = profile.id as string

            const [top5Raw, ratings, diary] = await Promise.all([
                fetchTop5(profileId),
                fetchRatings(profileId),
                fetchDiary(profileId, 50),
            ])

            const grouped: Record<Top5Category, Top5Item[]> = {
                album: [],
                artist: [],
                track: [],
            }

            for (const row of top5Raw) {
                const category = row.category as Top5Category
                if (grouped[category]) {
                    grouped[category].push({
                        id: row.id as string,
                        position: row.position as number,
                        spotify_id: row.spotify_id as string,
                        name: row.name as string,
                        image_url: row.image_url as string | null,
                        artist_name: row.artist_name as string | null,
                    })
                }
            }

            for (const cat of Object.keys(grouped) as Top5Category[]) {
                grouped[cat].sort((a, b) => a.position - b.position)
            }

            if (!isCurrent()) return
            setData({
                profile: {
                    id: profile.id as string,
                    username: profile.username as string,
                    bio: profile.bio as string | null,
                    avatar_url: profile.avatar_url as string | null,
                    created_at: profile.created_at as string,
                    display_name: profile.display_name as string,
                },
                top5Albums: grouped.album,
                top5Artists: grouped.artist,
                top5Tracks: grouped.track,
                ratings,
                diary,
            })
        } catch (err) {
            if (isCurrent()) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Failed to load profile'
                )
            }
        } finally {
            if (isCurrent()) setIsLoading(false)
        }
    }, [username])

    useEffect(() => {
        void refetch()
    }, [refetch])

    return { data, isLoading, error, refetch }
}
