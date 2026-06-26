import { useState } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { SectionCard } from '@/features/detail/components/SectionCard'
import { DiaryEntryRow } from './DiaryEntryRow'
import type { DiaryEntry } from '@/features/profile/types/profile'

type DiarySectionProps = {
    entries: DiaryEntry[]
}

const INITIAL_COUNT = 10

const DiarySection = ({ entries }: DiarySectionProps) => {
    const [expanded, setExpanded] = useState(false)
    const visible = expanded ? entries : entries.slice(0, INITIAL_COUNT)
    const hasMore = entries.length > INITIAL_COUNT

    return (
        <SectionCard label={`diary (${entries.length})`}>
            {entries.length === 0 ? (
                <Text fontSize="13px" color="var(--pressd-text-sub)">
                    No activity yet.
                </Text>
            ) : (
                <>
                    <Box>
                        {visible.map((entry) => (
                            <DiaryEntryRow key={entry.id} entry={entry} />
                        ))}
                    </Box>
                    {hasMore && !expanded && (
                        <Text
                            fontSize="12px"
                            color="var(--pressd-accent)"
                            mt="3"
                            cursor="pointer"
                            _hover={{ textDecoration: 'underline' }}
                            onClick={() => setExpanded(true)}
                        >
                            Show all {entries.length} entries
                        </Text>
                    )}
                </>
            )}
        </SectionCard>
    )
}

export { DiarySection }
