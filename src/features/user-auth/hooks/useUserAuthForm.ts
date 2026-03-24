import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type { Inputs } from '@/features/user-auth/types/user-auth'
import { useUserAuth } from '@/features/user-auth/context/UserAuthContext'

export const useUserAuthForm = (isCreateAccount: boolean) => {
    const navigate = useNavigate()
    const [authError, setAuthError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { createAccount, signIn } = useUserAuth()
    const form = useForm<Inputs>()

    const { email, password } = form.watch()
    useEffect(() => {
        setAuthError('')
    }, [email, password])

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true)
        try {
            if (isCreateAccount) {
                await createAccount(data)
            } else {
                await signIn(data)
            }
            navigate('/')
        } catch (err: unknown) {
            setAuthError(
                err instanceof Error ? err.message : 'Something went wrong'
            )
        } finally {
            setIsLoading(false)
        }
    }
    return { ...form, onSubmit, authError, isLoading }
}
