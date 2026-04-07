import type { ReactNode } from 'react'
import { Center, Spinner, Text } from '@chakra-ui/react'
import type { ItemDetail, ItemType } from '@/features/detail/types/detail'

type DetailPageGuardProps<T extends ItemDetail> = {
    isLoading: boolean
    item: T | null
    id: string | undefined
    fetchError: string | null
    type: ItemType
    children: (item: T, id: string) => ReactNode
}

export const DetailPageGuard = <T extends ItemDetail>({
    isLoading,
    item,
    id,
    fetchError,
    type,
    children,
}: DetailPageGuardProps<T>) => {
    if (isLoading) {
        return (
            <Center minH="60vh">
                <Spinner size="lg" color="var(--pressd-accent)" />
            </Center>
        )
    }

    if (!item || !id) {
        return (
            <Center minH="60vh" flexDirection="column" gap="5" py="12">
                <Text
                    className="pressd-mono"
                    fontSize="10px"
                    color="var(--pressd-text-muted)"
                >
                    {type} not found
                </Text>
                <Text
                    color="var(--pressd-text-sub)"
                    fontSize="14px"
                    textAlign="center"
                    maxW="320px"
                >
                    {fetchError ??
                        'Navigate here from search results to view this page.'}
                </Text>
            </Center>
        )
    }

    return <>{children(item, id)}</>
}
