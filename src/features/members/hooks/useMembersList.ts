import { useState, useEffect, useCallback } from 'react'
import {
    fetchMembersList,
    timeFrameToSince,
} from '@/features/members/api/membersApi'
import { popularMembersListData } from '@/features/members/data/membersData'
import type {
    MemberRow,
    MemberTimeFrame,
} from '@/features/members/types/members'

type UseMembersListOptions = {
    timeFrame: MemberTimeFrame
    pageSize?: number
    query?: string
}

type UseMembersListResult = {
    data: MemberRow[]
    isLoading: boolean
    hasMore: boolean
    loadMore: () => void
}

export const useMembersList = ({
    timeFrame,
    pageSize = 20,
    query = '',
}: UseMembersListOptions): UseMembersListResult => {
    const [data, setData] = useState<MemberRow[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        let cancelled = false
        setIsLoading(true)
        setPage(0)
        setData([])

        const since = timeFrameToSince(timeFrame)
        const sortBy = timeFrame === 'all' ? 'popularity' : 'timeframe'

        fetchMembersList({ since, sortBy, limit: pageSize, offset: 0, query })
            .then((rows) => {
                if (cancelled) return
                if (rows.length === 0) {
                    setData(popularMembersListData)
                    setHasMore(false)
                } else {
                    setData(rows)
                    setHasMore(rows.length === pageSize)
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setData(popularMembersListData)
                    setHasMore(false)
                }
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false)
            })

        return () => {
            cancelled = true
        }
    }, [timeFrame, pageSize, query])

    const loadMore = useCallback(() => {
        const nextPage = page + 1
        const since = timeFrameToSince(timeFrame)
        const sortBy = timeFrame === 'all' ? 'popularity' : 'timeframe'

        fetchMembersList({
            since,
            sortBy,
            limit: pageSize,
            offset: nextPage * pageSize,
            query,
        })
            .then((rows) => {
                setData((prev) => [...prev, ...rows])
                setPage(nextPage)
                setHasMore(rows.length === pageSize)
            })
            .catch(() => {
                setHasMore(false)
            })
    }, [page, timeFrame, pageSize, query])

    return { data, isLoading, hasMore, loadMore }
}
