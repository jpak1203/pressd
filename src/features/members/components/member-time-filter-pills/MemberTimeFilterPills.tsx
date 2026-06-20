import { Button, Flex, HStack } from '@chakra-ui/react'
import type { MemberTimeFrame } from '@/features/members/types/members'
import { ComingSoonLabel, DISABLED_PILL_PROPS } from '@/components/filter-pill/comingSoon'

type MemberTimeFilterPillsProps = {
    activeFilter: MemberTimeFrame
    onChange: (filter: MemberTimeFrame) => void
    disabled?: boolean
}

const FILTERS: { value: MemberTimeFrame; label: string }[] = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' },
    { value: 'all', label: 'All Time' },
]

export const MemberTimeFilterPills = ({
    activeFilter,
    onChange,
    disabled = false,
}: MemberTimeFilterPillsProps) => (
    <Flex align="center" gap="3" flexWrap="wrap" opacity={disabled ? 0.5 : 1}>
        <HStack gap="2" flexWrap="wrap">
            {FILTERS.map(({ value, label }) => {
                const isActive = !disabled && activeFilter === value
                return (
                    <Button
                        key={value}
                        size="sm"
                        onClick={() => onChange(value)}
                        disabled={disabled}
                        title={disabled ? 'Coming soon' : undefined}
                        cursor={disabled ? 'not-allowed' : 'pointer'}
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
                        {label}
                    </Button>
                )
            })}
        </HStack>
        {disabled && <ComingSoonLabel />}
    </Flex>
)
