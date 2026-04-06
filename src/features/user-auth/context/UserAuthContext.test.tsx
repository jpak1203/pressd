import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { ReactNode } from 'react'

const {
    onAuthStateChangeMock,
    getSessionMock,
    signInWithPasswordMock,
    signUpMock,
    signOutMock,
    unsubscribeMock,
} = vi.hoisted(() => ({
    onAuthStateChangeMock: vi.fn(),
    getSessionMock: vi.fn(),
    signInWithPasswordMock: vi.fn(),
    signUpMock: vi.fn(),
    signOutMock: vi.fn(),
    unsubscribeMock: vi.fn(),
}))

let authStateCallback: ((event: string, session: unknown) => void) | undefined

vi.mock('@/lib/supabase/client', () => ({
    supabase: {
        auth: {
            onAuthStateChange: onAuthStateChangeMock,
            getSession: getSessionMock,
            signInWithPassword: signInWithPasswordMock,
            signUp: signUpMock,
            signOut: signOutMock,
        },
    },
}))

import {
    useUserAuth,
    UserAuthProvider,
} from '@/features/user-auth/context/UserAuthContext'

const createWrapper = (providerProps = {}) =>
    function Wrapper({ children }: { children: ReactNode }) {
        return (
            <UserAuthProvider {...providerProps}>{children}</UserAuthProvider>
        )
    }

describe('UserAuthContext', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        authStateCallback = undefined

        onAuthStateChangeMock.mockImplementation((callback) => {
            authStateCallback = callback
            return {
                data: {
                    subscription: {
                        unsubscribe: unsubscribeMock,
                    },
                },
            }
        })

        getSessionMock.mockResolvedValue({
            data: { session: null },
        })
    })

    it('throws when useUserAuth is used outside provider', () => {
        expect(() => renderHook(() => useUserAuth())).toThrow(
            'useUserAuth must be used within a UserAuthProvider'
        )
    })

    it('loads initial auth state from getSession when initial session is not resolved', async () => {
        const { result } = renderHook(() => useUserAuth(), {
            wrapper: createWrapper(),
        })

        expect(result.current.isLoading).toBe(true)
        expect(getSessionMock).toHaveBeenCalledTimes(1)

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false)
        })
    })

    it('uses supplied initial session when already resolved', () => {
        const initialSession = {
            access_token: 'token-123',
            user: { id: 'user-1', email: 'user@example.com' },
        }

        const { result } = renderHook(() => useUserAuth(), {
            wrapper: createWrapper({
                initialSession,
                initialSessionResolved: true,
            }),
        })

        expect(result.current.isLoading).toBe(false)
        expect(result.current.isLoggedIn).toBe(true)
        expect(getSessionMock).not.toHaveBeenCalled()
    })

    it('updates user state from auth change events', () => {
        const { result } = renderHook(() => useUserAuth(), {
            wrapper: createWrapper({
                initialSessionResolved: true,
            }),
        })

        expect(result.current.isLoggedIn).toBe(false)

        act(() => {
            authStateCallback!('SIGNED_IN', {
                access_token: 'token-123',
                user: { id: 'user-1' },
            })
        })

        expect(result.current.isLoggedIn).toBe(true)

        act(() => {
            authStateCallback!('SIGNED_OUT', null)
        })

        expect(result.current.isLoggedIn).toBe(false)
    })

    it('delegates sign-in/create-account/sign-out calls to supabase auth', async () => {
        signInWithPasswordMock.mockResolvedValue({
            data: { user: { id: 'user-1' } },
            error: null,
        })
        signUpMock.mockResolvedValue({
            data: { user: { id: 'user-1' } },
            error: null,
        })
        signOutMock.mockResolvedValue({ error: null })

        const { result } = renderHook(() => useUserAuth(), {
            wrapper: createWrapper({
                initialSessionResolved: true,
            }),
        })

        await act(async () => {
            await result.current.signIn({
                email: 'user@example.com',
                password: 'password-123',
            })
        })

        await act(async () => {
            await result.current.createAccount({
                email: 'user@example.com',
                username: 'listener',
                password: 'password-123',
            })
        })

        await act(async () => {
            await result.current.signOut()
        })

        expect(signInWithPasswordMock).toHaveBeenCalledWith({
            email: 'user@example.com',
            password: 'password-123',
        })
        expect(signUpMock).toHaveBeenCalledWith({
            email: 'user@example.com',
            password: 'password-123',
            options: {
                data: {
                    username: 'listener',
                },
            },
        })
        expect(signOutMock).toHaveBeenCalledTimes(1)
    })
})
