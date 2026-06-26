import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { escapeLike } from '@/lib/likePattern'
import type { PlaylistSearchResult } from '@/features/search-results/types/search-results'

type UsePlaylistSearchOptions = {
    query: string
    enabled?: boolean
    limit?: number
    debounceMs?: number
    minQueryLength?: number
}

type UsePlaylistSearchResult = {
    data: PlaylistSearchResult[]
    isLoading: boolean
    error: string | null
}

export const usePlaylistSearch = ({
    query,
    enabled = true,
    limit = 10,
    debounceMs = 350,
    minQueryLength = 2,
}: UsePlaylistSearchOptions): UsePlaylistSearchResult => {
    const [data, setData] = useState<PlaylistSearchResult[]>([])
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
            const { data: playlists, error: supabaseError } = await supabase
                .from('playlists')
                .select(
                    'id, name, description, owner_username, image_url, track_count'
                )
                .ilike('name', `%${escapeLike(trimmed)}%`)
                .limit(limit)
                .abortSignal(controller.signal)

            if (supabaseError) {
                // 42P01 = relation does not exist (table not created yet)
                if (supabaseError.code === '42P01') {
                    setData([])
                    return
                }
                throw new Error(supabaseError.message)
            }

            setData(playlists ?? [])
        } catch (err) {
            if (controller.signal.aborted) return
            setError(
                err instanceof Error ? err.message : 'Playlist search failed'
            )
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
