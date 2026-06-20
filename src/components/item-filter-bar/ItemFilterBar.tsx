import { Box, Button, Flex, HStack, Text, VStack } from '@chakra-ui/react'
import { ComingSoonLabel, DISABLED_PILL_PROPS } from '@/components/filter-pill/comingSoon'
import type {
    ItemFilters,
    ItemDecadeFilter,
    ItemRatingFilter,
    ItemPopularityFilter,
} from './types'

export type { ItemFilters as ItemFilterState } from './types'

const DECADES: { value: ItemDecadeFilter; label: string }[] = [
    { value: '1950s', label: '50s' },
    { value: '1960s', label: '60s' },
    { value: '1970s', label: '70s' },
    { value: '1980s', label: '80s' },
    { value: '1990s', label: '90s' },
    { value: '2000s', label: '00s' },
    { value: '2010s', label: '10s' },
    { value: '2020s', label: '20s' },
    { value: 'upcoming', label: 'Upcoming' },
]

const RATINGS: { value: ItemRatingFilter; label: string }[] = [
    { value: 'highest', label: 'Highest' },
    { value: 'lowest', label: 'Lowest' },
    { value: 'highest-by-me', label: 'Highest by Me' },
    { value: 'lowest-by-me', label: 'Lowest by Me' },
]

const POPULARITY: { value: ItemPopularityFilter; label: string }[] = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' },
    { value: 'all', label: 'All Time' },
]

type FilterGroupProps<T extends string> = {
    label: string
    options: { value: T; label: string }[]
    active: T | null
    onSelect: (value: T | null) => void
    disabled?: boolean
}

const FilterGroup = <T extends string>({
    label,
    options,
    active,
    onSelect,
    disabled = false,
}: FilterGroupProps<T>) => (
    <Flex align="baseline" gap="3" flexWrap="wrap" opacity={disabled ? 0.5 : 1}>
        <HStack gap="2" align="baseline" flexShrink={0} mt="1">
            <Text
                fontSize="10px"
                className="pressd-mono"
                textTransform="uppercase"
                letterSpacing="0.08em"
                color="var(--pressd-text-muted)"
            >
                {label}
            </Text>
            {disabled && <ComingSoonLabel fontSize="9px" />}
        </HStack>
        <HStack gap="2" flexWrap="wrap">
            {options.map(({ value, label: optLabel }) => {
                const isActive = !disabled && active === value
                return (
                    <Button
                        key={value}
                        size="xs"
                        onClick={() => onSelect(isActive ? null : value)}
                        disabled={disabled}
                        title={disabled ? 'Coming soon' : undefined}
                        cursor={disabled ? 'not-allowed' : 'pointer'}
                        className="pressd-mono"
                        fontSize="10px"
                        textTransform="uppercase"
                        letterSpacing="0.06em"
                        borderRadius="9999px"
                        px="3"
                        h="24px"
                        bg={isActive ? 'var(--pressd-accent)' : 'var(--pressd-surface)'}
                        color={isActive ? 'white' : 'var(--pressd-text-muted)'}
                        border="1px solid"
                        borderColor={isActive ? 'var(--pressd-accent)' : 'var(--pressd-border)'}
                        _hover={
                            disabled
                                ? {}
                                : {
                                      bg: isActive
                                          ? 'var(--pressd-accent)'
                                          : 'var(--pressd-surface-2)',
                                      borderColor: isActive
                                          ? 'var(--pressd-accent)'
                                          : 'var(--pressd-accent-dim)',
                                  }
                        }
                        _disabled={DISABLED_PILL_PROPS}
                        transition="all 0.15s ease"
                    >
                        {optLabel}
                    </Button>
                )
            })}
        </HStack>
    </Flex>
)

type ItemFilterBarProps = {
    filters: ItemFilters
    onChange: (filters: ItemFilters) => void
}

export const ItemFilterBar = ({ filters, onChange }: ItemFilterBarProps) => (
    <Box
        p="14px 16px"
        bg="var(--pressd-surface)"
        border="1px solid var(--pressd-border)"
        borderRadius="12px"
    >
        <VStack align="stretch" gap="3">
            <FilterGroup
                label="Release"
                options={DECADES}
                active={filters.decade}
                onSelect={(v) => onChange({ ...filters, decade: v })}
            />
            <FilterGroup
                label="Rating"
                options={RATINGS}
                active={filters.rating}
                onSelect={(v) => onChange({ ...filters, rating: v })}
                disabled
            />
            <FilterGroup
                label="Popularity"
                options={POPULARITY}
                active={filters.popularity}
                onSelect={(v) => onChange({ ...filters, popularity: v })}
                disabled
            />
        </VStack>
    </Box>
)
