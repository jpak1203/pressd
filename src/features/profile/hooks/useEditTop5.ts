import { useState } from 'react'
import { upsertTop5 } from '@/features/profile/api/profileApi'
import type { Top5Category, Top5Item } from '@/features/profile/types/profile'

export const useEditTop5 = (profileId: string, onSuccess: () => void) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const save = async (
        category: Top5Category,
        items: Omit<Top5Item, 'id'>[]
    ) => {
        setIsSubmitting(true)
        setError(null)
        try {
            await upsertTop5(profileId, category, items)
            onSuccess()
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'Failed to update top 5'
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    return { save, isSubmitting, error }
}
