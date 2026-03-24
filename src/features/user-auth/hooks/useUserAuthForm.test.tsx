import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const { navigateMock, signInMock, createAccountMock } = vi.hoisted(() => ({
    navigateMock: vi.fn(),
    signInMock: vi.fn(),
    createAccountMock: vi.fn(),
}))

vi.mock('react-router', () => ({
    useNavigate: () => navigateMock,
}))

vi.mock('@/features/user-auth/context/UserAuthContext', () => ({
    useUserAuth: () => ({
        signIn: signInMock,
        createAccount: createAccountMock,
    }),
}))

import { useUserAuthForm } from '@/features/user-auth/hooks/useUserAuthForm'

const formInput = {
    email: 'user@example.com',
    username: 'listener',
    password: 'password-123',
}

describe('useUserAuthForm', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('submits sign in and navigates to home', async () => {
        signInMock.mockResolvedValueOnce({})

        const { result } = renderHook(() => useUserAuthForm(false))

        await act(async () => {
            await result.current.onSubmit(formInput)
        })

        expect(signInMock).toHaveBeenCalledWith(formInput)
        expect(createAccountMock).not.toHaveBeenCalled()
        expect(navigateMock).toHaveBeenCalledWith('/')
        expect(result.current.authError).toBe('')
        expect(result.current.isLoading).toBe(false)
    })

    it('submits create account and navigates to home', async () => {
        createAccountMock.mockResolvedValueOnce({})

        const { result } = renderHook(() => useUserAuthForm(true))

        await act(async () => {
            await result.current.onSubmit(formInput)
        })

        expect(createAccountMock).toHaveBeenCalledWith(formInput)
        expect(signInMock).not.toHaveBeenCalled()
        expect(navigateMock).toHaveBeenCalledWith('/')
        expect(result.current.authError).toBe('')
        expect(result.current.isLoading).toBe(false)
    })

    it('shows auth error when sign in fails and clears it when credentials change', async () => {
        signInMock.mockRejectedValueOnce(new Error('Invalid credentials'))

        const { result } = renderHook(() => useUserAuthForm(false))

        await act(async () => {
            await result.current.onSubmit(formInput)
        })

        expect(result.current.authError).toBe('Invalid credentials')
        expect(navigateMock).not.toHaveBeenCalled()

        act(() => {
            result.current.setValue('email', 'new-email@example.com')
        })

        await waitFor(() => {
            expect(result.current.authError).toBe('')
        })
    })
})
