import { useState, useEffect } from 'react'
import { fetchMembersGrid } from '@/features/members/api/membersApi'
import {
    featuredMembersData,
    popularThisWeekData,
} from '@/features/members/data/membersData'
import type { MemberCardItem } from '@/features/members/types/members'

type UsePopularMembersOptions = {
    since: string | null
}

type UsePopularMembersResult = {
    data: MemberCardItem[]
    isLoading: boolean
}

export const usePopularMembers = ({
    since,
}: UsePopularMembersOptions): UsePopularMembersResult => {
    const [data, setData] = useState<MemberCardItem[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let cancelled = false
        setIsLoading(true)

        fetchMembersGrid(since, 6)
            .then((rows) => {
                if (cancelled) return
                if (rows.length > 0) {
                    setData(rows)
                } else {
                    setData(
                        since === null
                            ? featuredMembersData
                            : popularThisWeekData
                    )
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setData(
                        since === null
                            ? featuredMembersData
                            : popularThisWeekData
                    )
                }
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false)
            })

        return () => {
            cancelled = true
        }
    }, [since])

    return { data, isLoading }
}
