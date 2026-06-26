import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { escapeLike } from '@/lib/likePattern'
import type { UserSearchResult } from '@/features/search-results/types/search-results'

type UseUserSearchOptions = {
    query: string
    enabled?: boolean
    limit?: number
    debounceMs?: number
    minQueryLength?: number
}

type UseUserSearchResult = {
    data: UserSearchResult[]
    isLoading: boolean
    error: string | null
}

export const useUserSearch = ({
    query,
    enabled = true,
    limit = 10,
    debounceMs = 350,
    minQueryLength = 2,
}: UseUserSearchOptions): UseUserSearchResult => {
    const [data, setData] = useState<UserSearchResult[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const timeoutRef = useRef<number | null>(null)
    const abortRef = useRef<AbortController | null>(null)

    const runSearch = useCallback(async () => {
        const trimmed = query.trim()
        if (!enabled || trimmed.length < minQueryLength) {
            abortRef.current?.abort()
            setData([])
            setError(null)
            setIsLoading(false)
            return
        }

        abortRef.current?.abort()
        const controller = new AbortController()
        abortRef.current = controller

        setIsLoading(true)
        setError(null)

        try {
            const { data: profiles, error: supabaseError } = await supabase
                .from('profiles')
                .select('id, username, avatar_url, bio')
                .ilike('username', `%${escapeLike(trimmed)}%`)
                .limit(limit)
                .abortSignal(controller.signal)

            if (supabaseError) {
                throw new Error(supabaseError.message)
            }

            setData(profiles ?? [])
        } catch (err) {
            if (controller.signal.aborted) return
            setError(err instanceof Error ? err.message : 'User search failed')
        } finally {
            if (!controller.signal.aborted) {
                setIsLoading(false)
            }
        }
    }, [query, enabled, limit, minQueryLength])

    useEffect(() => {
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current)
        }

        const trimmed = query.trim()
        if (enabled && trimmed.length >= minQueryLength) {
            setIsLoading(true)
        }

        timeoutRef.current = window.setTimeout(() => {
            void runSearch()
        }, debounceMs)

        return () => {
            if (timeoutRef.current) {
                window.clearTimeout(timeoutRef.current)
            }
        }
    }, [debounceMs, runSearch, query, enabled, minQueryLength])

    useEffect(() => {
        return () => {
            abortRef.current?.abort()
        }
    }, [])

    return { data, isLoading, error }
}
