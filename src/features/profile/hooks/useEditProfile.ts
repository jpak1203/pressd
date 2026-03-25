import { useState } from 'react'
import { updateProfile } from '../api/profileApi'

export const useEditProfile = (profileId: string, onSuccess: () => void) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const save = async (updates: { bio?: string; avatar_url?: string }) => {
        setIsSubmitting(true)
        setError(null)
        try {
            await updateProfile(profileId, updates)
            onSuccess()
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'Failed to update profile'
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    return { save, isSubmitting, error }
}
