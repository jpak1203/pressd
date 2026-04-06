import { toaster } from '@/components/toaster'

export const errorToast = (description: string) => {
    toaster.create({
        title: 'Something went wrong',
        description,
        type: 'error',
        duration: 4000,
    })
}
