import { useCallback, useEffect, useRef, useState } from 'react'

import { searchSpotify } from '@/services/spotify/service'
import type {
    UseSpotifySearchOptions,
    UseSpotifySearchResult,
    SpotifySearchResponse,
} from '@/services/spotify/types'

export const useSpotifySearch = (
    options: UseSpotifySearchOptions = {}
): UseSpotifySearchResult => {
    const {
        type = 'track,artist,album',
        limit = 10,
        market = 'US',
        minQueryLength = 2,
        debounceMs = 350,
        enabled = true,
    } = options

    const [query, setQuery] = useState('')
    const [data, setData] = useState<SpotifySearchResponse | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const abortRef = useRef<AbortController | null>(null)
    const timeoutRef = useRef<number | null>(null)

    const runSearch = useCallback(async () => {
        const trimmed = query.trim()
        if (!enabled || trimmed.length < minQueryLength) {
            abortRef.current?.abort()
            setData(null)
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
            const result = await searchSpotify(
                {
                    q: trimmed,
                    type,
                    limit,
                    market,
                },
                controller.signal
            )
            setData(result)
        } catch (err) {
            if (controller.signal.aborted) return
            setError(err instanceof Error ? err.message : 'Search failed')
        } finally {
            if (!controller.signal.aborted) {
                setIsLoading(false)
            }
        }
    }, [enabled, limit, market, minQueryLength, query, type])

    useEffect(() => {
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = window.setTimeout(() => {
            void runSearch()
        }, debounceMs)

        return () => {
            if (timeoutRef.current) {
                window.clearTimeout(timeoutRef.current)
            }
        }
    }, [debounceMs, runSearch])

    useEffect(() => {
        return () => {
            abortRef.current?.abort()
        }
    }, [])

    return {
        query,
        setQuery,
        isLoading,
        error,
        data,
        refetch: runSearch,
    }
}
