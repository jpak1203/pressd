import { useEffect, useMemo } from 'react'
import { useLocation, useParams } from 'react-router'
import type { ItemDetail, ItemType } from '@/features/detail/types/detail'
import { useItemFallback } from '@/features/detail/hooks/useItemFallback'

export const useDetailItem = <T extends ItemDetail>(type: ItemType) => {
    const { id } = useParams<{ id: string }>()
    const { state } = useLocation()

    const initialItem = useMemo<ItemDetail | null>(() => {
        if (state) return state as ItemDetail
        if (!id) return null
        try {
            const cached = sessionStorage.getItem(`pressd_item_${id}`)
            return cached ? (JSON.parse(cached) as ItemDetail) : null
        } catch {
            return null
        }
    }, [id, state])

    useEffect(() => {
        if (state && id) {
            try {
                sessionStorage.setItem(`pressd_item_${id}`, JSON.stringify(state))
            } catch {
                // sessionStorage quota exceeded — item will be re-fetched if needed
            }
        }
    }, [state, id])

    const { item, isLoading, error: fetchError } = useItemFallback(type, id, initialItem)

    return { id, item: item as T | null, isLoading, fetchError }
}
