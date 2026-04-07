import { Button, HStack } from '@chakra-ui/react'
import type { MemberTimeFrame } from '@/features/members/types/members'

type MemberTimeFilterPillsProps = {
    activeFilter: MemberTimeFrame
    onChange: (filter: MemberTimeFrame) => void
}

const FILTERS: { value: MemberTimeFrame; label: string }[] = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' },
    { value: 'all', label: 'All Time' },
]

export const MemberTimeFilterPills = ({ activeFilter, onChange }: MemberTimeFilterPillsProps) => (
    <HStack gap="2" flexWrap="wrap">
        {FILTERS.map(({ value, label }) => {
            const isActive = activeFilter === value
            return (
                <Button
                    key={value}
                    size="sm"
                    onClick={() => onChange(value)}
                    className="pressd-mono"
                    fontSize="11px"
                    textTransform="uppercase"
                    letterSpacing="0.06em"
                    borderRadius="9999px"
                    px="4"
                    bg={isActive ? 'var(--pressd-accent)' : 'var(--pressd-surface)'}
                    color={isActive ? 'white' : 'var(--pressd-text-muted)'}
                    border="1px solid"
                    borderColor={isActive ? 'var(--pressd-accent)' : 'var(--pressd-border)'}
                    _hover={{
                        bg: isActive ? 'var(--pressd-accent)' : 'var(--pressd-surface-2)',
                        borderColor: isActive ? 'var(--pressd-accent)' : 'var(--pressd-accent-dim)',
                    }}
                    transition="all 0.15s ease"
                >
                    {label}
                </Button>
            )
        })}
    </HStack>
)
