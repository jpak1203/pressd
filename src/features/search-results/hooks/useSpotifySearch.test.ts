import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const { searchSpotifyMock } = vi.hoisted(() => ({
    searchSpotifyMock: vi.fn(),
}))

vi.mock('@/services/spotify/service', () => ({
    searchSpotify: searchSpotifyMock,
}))

import { useSpotifySearch } from './useSpotifySearch'

const response = {
    tracks: [],
    artists: [],
    albums: [],
    cached: false,
}

describe('useSpotifySearch', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        vi.useFakeTimers()
        searchSpotifyMock.mockResolvedValue(response)
    })

    afterEach(() => {
        vi.runOnlyPendingTimers()
        vi.useRealTimers()
    })

    it('does not call the service for queries below minQueryLength', async () => {
        const { result } = renderHook(() => useSpotifySearch())

        act(() => result.current.setQuery('a'))
        await act(async () => {
            await vi.advanceTimersByTimeAsync(400)
        })

        expect(searchSpotifyMock).not.toHaveBeenCalled()
        expect(result.current.data).toBeNull()
        expect(result.current.isLoading).toBe(false)
    })

    it('debounces rapid input into a single search for the latest query', async () => {
        const { result } = renderHook(() => useSpotifySearch())

        act(() => result.current.setQuery('da'))
        act(() => result.current.setQuery('daf'))
        act(() => result.current.setQuery('daft'))

        // Nothing fires until the debounce window elapses.
        await act(async () => {
            await vi.advanceTimersByTimeAsync(349)
        })
        expect(searchSpotifyMock).not.toHaveBeenCalled()

        await act(async () => {
            await vi.advanceTimersByTimeAsync(1)
        })

        expect(searchSpotifyMock).toHaveBeenCalledTimes(1)
        expect(searchSpotifyMock.mock.calls[0][0]).toMatchObject({ q: 'daft' })
        expect(result.current.data).toEqual(response)
        expect(result.current.isLoading).toBe(false)
        expect(result.current.error).toBeNull()
    })

    it('surfaces the error message when the search fails', async () => {
        searchSpotifyMock.mockRejectedValueOnce(new Error('rate limited'))

        const { result } = renderHook(() => useSpotifySearch())

        act(() => result.current.setQuery('daft'))
        await act(async () => {
            await vi.advanceTimersByTimeAsync(350)
        })

        expect(result.current.error).toBe('rate limited')
        expect(result.current.data).toBeNull()
        expect(result.current.isLoading).toBe(false)
    })

    it('clears results and error when the query is emptied', async () => {
        const { result } = renderHook(() => useSpotifySearch())

        act(() => result.current.setQuery('daft'))
        await act(async () => {
            await vi.advanceTimersByTimeAsync(350)
        })
        expect(result.current.data).toEqual(response)

        act(() => result.current.setQuery(''))
        await act(async () => {
            await vi.advanceTimersByTimeAsync(350)
        })

        expect(result.current.data).toBeNull()
        expect(result.current.error).toBeNull()
        // No second service call for the empty query.
        expect(searchSpotifyMock).toHaveBeenCalledTimes(1)
    })

    it('runs an empty typed query when extraQuery is provided', async () => {
        renderHook(() => useSpotifySearch({ extraQuery: 'year:1990-1999' }))

        await act(async () => {
            await vi.advanceTimersByTimeAsync(350)
        })

        expect(searchSpotifyMock).toHaveBeenCalledTimes(1)
        expect(searchSpotifyMock.mock.calls[0][0]).toMatchObject({
            q: 'year:1990-1999',
        })
    })
})
