import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { TrackDetail } from '@/features/detail/types/detail'

const api = vi.hoisted(() => ({
    upsertRating: vi.fn(),
    deleteRating: vi.fn(),
    insertDiaryEntry: vi.fn(),
    insertReview: vi.fn(),
    deleteReview: vi.fn(),
    fetchItemInteraction: vi.fn(),
    upsertItemInteraction: vi.fn(),
    fetchItemRating: vi.fn(),
    fetchUserReviewsForItem: vi.fn(),
    deleteItemDiaryEntriesByAction: vi.fn(),
}))

const { errorToastMock } = vi.hoisted(() => ({ errorToastMock: vi.fn() }))

vi.mock('@/features/profile/api/profileApi', () => api)
vi.mock('@/lib/errorToast', () => ({ errorToast: errorToastMock }))

import { usePersistInteractions } from './usePersistInteractions'

const track: TrackDetail = {
    type: 'track',
    id: 'track-1',
    name: 'Around the World',
    image: 'cover.jpg',
    artists: [{ id: 'artist-1', name: 'Daft Punk' }],
    album: { id: 'album-1', name: 'Homework' },
    duration_ms: 429_000,
    release_date: '1997-01-20',
}

beforeEach(() => {
    vi.clearAllMocks()
    // Sensible resolved defaults for the on-mount load + every mutator write.
    api.fetchItemRating.mockResolvedValue(null)
    api.fetchItemInteraction.mockResolvedValue({
        liked: false,
        listened: false,
        want_to_listen: false,
    })
    api.fetchUserReviewsForItem.mockResolvedValue([])
    api.upsertRating.mockResolvedValue(undefined)
    api.deleteRating.mockResolvedValue(undefined)
    api.insertDiaryEntry.mockResolvedValue(undefined)
    api.insertReview.mockResolvedValue(undefined)
    api.deleteReview.mockResolvedValue(undefined)
    api.upsertItemInteraction.mockResolvedValue(undefined)
    api.deleteItemDiaryEntriesByAction.mockResolvedValue(undefined)
})

describe('usePersistInteractions — guest (no profile)', () => {
    it('never loads from Supabase on mount', async () => {
        renderHook(() => usePersistInteractions(track, null))
        await Promise.resolve()
        expect(api.fetchItemRating).not.toHaveBeenCalled()
        expect(api.fetchItemInteraction).not.toHaveBeenCalled()
    })

    it('treats every mutator as a no-op', () => {
        const { result } = renderHook(() => usePersistInteractions(track, null))

        act(() => {
            result.current.setRating(5)
            result.current.toggleLike()
            result.current.toggleListened()
            result.current.addReview('great', 5)
        })

        expect(api.upsertRating).not.toHaveBeenCalled()
        expect(api.upsertItemInteraction).not.toHaveBeenCalled()
        expect(api.insertDiaryEntry).not.toHaveBeenCalled()
        expect(api.insertReview).not.toHaveBeenCalled()
        // State stays at the empty default.
        expect(result.current.interactions.rating).toBeNull()
        expect(result.current.interactions.liked).toBe(false)
    })
})

describe('usePersistInteractions — logged in', () => {
    const profileId = 'profile-1'

    it('hydrates state from Supabase on mount', async () => {
        api.fetchItemRating.mockResolvedValueOnce(4)
        api.fetchItemInteraction.mockResolvedValueOnce({
            liked: true,
            listened: true,
            want_to_listen: false,
        })
        api.fetchUserReviewsForItem.mockResolvedValueOnce([
            { id: 'r1', body: 'solid', rating: 4, created_at: '2026-01-01' },
        ])

        const { result } = renderHook(() =>
            usePersistInteractions(track, profileId)
        )

        await waitFor(() => {
            expect(result.current.interactions.rating).toBe(4)
        })
        expect(result.current.interactions.liked).toBe(true)
        expect(result.current.interactions.listened).toBe(true)
        expect(result.current.interactions.reviews).toEqual([
            { id: 'r1', text: 'solid', rating: 4, date: '2026-01-01' },
        ])
    })

    it('setRating persists the rating, marks listened, and logs diary entries', async () => {
        const onStatsChanged = vi.fn()
        const { result } = renderHook(() =>
            usePersistInteractions(track, profileId, onStatsChanged)
        )
        await waitFor(() => expect(api.fetchItemRating).toHaveBeenCalled())

        await act(async () => {
            result.current.setRating(5)
        })

        // Optimistic state updates immediately.
        expect(result.current.interactions.rating).toBe(5)
        expect(result.current.interactions.listened).toBe(true)

        expect(api.upsertRating).toHaveBeenCalledWith(
            profileId,
            expect.objectContaining({
                item_type: 'track',
                spotify_id: 'track-1',
            }),
            5
        )
        // Logs a 'rated' diary entry, plus a 'listened' one since it was not
        // previously listened.
        const actions = api.insertDiaryEntry.mock.calls.map((c) => c[1].action)
        expect(actions).toContain('rated')
        expect(actions).toContain('listened')
        expect(onStatsChanged).toHaveBeenCalled()
    })

    it('setRating(null) removes the rating and its diary entry', async () => {
        const { result } = renderHook(() =>
            usePersistInteractions(track, profileId)
        )
        await waitFor(() => expect(api.fetchItemRating).toHaveBeenCalled())

        await act(async () => {
            result.current.setRating(null)
        })

        expect(result.current.interactions.rating).toBeNull()
        expect(api.deleteRating).toHaveBeenCalledWith(
            profileId,
            'track',
            'track-1'
        )
        expect(api.deleteItemDiaryEntriesByAction).toHaveBeenCalledWith(
            profileId,
            'track',
            'track-1',
            'rated'
        )
        expect(api.upsertRating).not.toHaveBeenCalled()
    })

    it('toggleLike optimistically flips state and writes a liked diary entry', async () => {
        const { result } = renderHook(() =>
            usePersistInteractions(track, profileId)
        )
        await waitFor(() => expect(api.fetchItemRating).toHaveBeenCalled())

        await act(async () => {
            result.current.toggleLike()
        })

        expect(result.current.interactions.liked).toBe(true)
        expect(api.upsertItemInteraction).toHaveBeenCalledWith(
            profileId,
            'track',
            'track-1',
            { liked: true }
        )
        expect(api.insertDiaryEntry).toHaveBeenCalledWith(
            profileId,
            expect.objectContaining({ action: 'liked' })
        )
    })

    it('shows an error toast when a rating write fails', async () => {
        api.upsertRating.mockRejectedValueOnce(new Error('network'))
        const { result } = renderHook(() =>
            usePersistInteractions(track, profileId)
        )
        await waitFor(() => expect(api.fetchItemRating).toHaveBeenCalled())

        await act(async () => {
            result.current.setRating(3)
        })

        await waitFor(() => {
            expect(errorToastMock).toHaveBeenCalledWith(
                'Failed to save rating.'
            )
        })
    })
})
