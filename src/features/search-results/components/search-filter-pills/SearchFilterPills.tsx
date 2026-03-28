import { Button, HStack } from '@chakra-ui/react'
import type { SearchFilter } from '@/features/search-results/types/search-results'

const FILTERS: SearchFilter[] = [
    'all',
    'tracks',
    'albums',
    'artists',
    'users',
    'playlists',
]

type SearchFilterPillsProps = {
    activeFilter: SearchFilter
    onFilterChange: (filter: SearchFilter) => void
}

export const SearchFilterPills = ({
    activeFilter,
    onFilterChange,
}: SearchFilterPillsProps) => (
    <HStack gap="2" flexWrap="wrap">
        {FILTERS.map((filter) => {
            const isActive = filter === activeFilter
            return (
                <Button
                    key={filter}
                    size="sm"
                    className="pressd-mono"
                    borderRadius="999px"
                    bg={
                        isActive
                            ? 'var(--pressd-accent)'
                            : 'var(--pressd-surface-2)'
                    }
                    color={
                        isActive
                            ? 'var(--pressd-bg)'
                            : 'var(--pressd-text-sub)'
                    }
                    _hover={{
                        bg: isActive
                            ? 'var(--pressd-accent)'
                            : 'var(--pressd-border)',
                    }}
                    onClick={() => onFilterChange(filter)}
                >
                    {filter}
                </Button>
            )
        })}
    </HStack>
)
