import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react'
import { supabase } from '@/lib/supabase/client'
import type { Session } from '@supabase/supabase-js'
import type { Inputs } from '@/features/user-auth/types/user-auth'
import { createProfile } from '@/features/profile/api/profileApi'

type UserAuthContextType = {
    session: Session | null
    isLoading: boolean
}

type UserAuthProviderType = {
    children: ReactNode
    initialSession?: Session | null
    initialSessionResolved?: boolean
}

const UserAuthContext = createContext<UserAuthContextType | null>(null)

export const UserAuthProvider = ({
    children,
    initialSession = null,
    initialSessionResolved = false,
}: UserAuthProviderType) => {
    const [session, setSession] = useState<Session | null>(initialSession)
    const [isLoading, setIsLoading] = useState(!initialSessionResolved)

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, nextSession) => {
            if (event === 'INITIAL_SESSION') {
                setSession(nextSession)
                setIsLoading(false)
                return
            }

            if (event === 'SIGNED_OUT') {
                setSession(null)
                return
            }

            if (nextSession) {
                setSession(nextSession)
            }
        })

        if (!initialSessionResolved) {
            void supabase.auth.getSession().then(({ data }) => {
                setSession(data.session)
                setIsLoading(false)
            })
        }

        return () => subscription.unsubscribe()
    }, [initialSessionResolved])

    return (
        <UserAuthContext.Provider value={{ session, isLoading }}>
            {children}
        </UserAuthContext.Provider>
    )
}

const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
}

const signIn = async ({
    email,
    password,
}: Pick<Inputs, 'email' | 'password'>) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    if (error) throw error

    if (data.user) {
        const username =
            (data.user.user_metadata?.username as string) ??
            `user_${data.user.id.slice(0, 8)}`
        await createProfile(data.user.id, username).catch((err) => {
            console.error('Failed to ensure profile on sign-in:', err)
        })
    }

    return data
}

const createAccount = async ({
    email,
    username,
    password,
}: Pick<Inputs, 'email' | 'username' | 'password'>) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username,
            },
        },
    })
    if (error) throw error

    if (data.user) {
        await createProfile(data.user.id, username)
    }

    return data
}

export const useUserAuth = () => {
    const context = useContext(UserAuthContext)
    if (!context)
        throw new Error('useUserAuth must be used within a UserAuthProvider')

    return {
        isLoggedIn: !!context.session?.access_token,
        isGuestUser: context.session?.user?.is_anonymous,
        user: context.session?.user,
        isLoading: context.isLoading,
        signOut,
        createAccount,
        signIn,
    }
}
