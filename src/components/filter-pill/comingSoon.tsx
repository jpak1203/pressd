import { Text } from '@chakra-ui/react'

/**
 * Styling applied to a pill `Button` while a filter group is gated
 * ("Coming Soon"). Keeps the disabled pill visually identical to its
 * resting state instead of Chakra's default dimming.
 */
export const DISABLED_PILL_PROPS = {
    opacity: 1,
    cursor: 'not-allowed',
    bg: 'var(--pressd-surface)',
    color: 'var(--pressd-text-muted)',
    borderColor: 'var(--pressd-border)',
} as const

type ComingSoonLabelProps = {
    fontSize?: string
}

export const ComingSoonLabel = ({ fontSize = '10px' }: ComingSoonLabelProps) => (
    <Text
        fontSize={fontSize}
        className="pressd-mono"
        textTransform="uppercase"
        letterSpacing="0.08em"
        color="var(--pressd-text-muted)"
        fontStyle="italic"
    >
        Coming Soon
    </Text>
)
