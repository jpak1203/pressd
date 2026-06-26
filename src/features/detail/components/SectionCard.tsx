import { Box, Text } from '@chakra-ui/react'
import type { ReactNode } from 'react'

type SectionCardProps = {
    label: ReactNode
    children: ReactNode
}

export const SectionCard = ({ label, children }: SectionCardProps) => (
    <Box
        bg="var(--pressd-surface)"
        border="1px solid var(--pressd-border)"
        borderRadius="16px"
        p={{ base: '4', md: '6' }}
    >
        <Text
            className="pressd-mono"
            fontSize="10px"
            color="var(--pressd-text-muted)"
            mb="4"
            letterSpacing="0.12em"
        >
            {label}
        </Text>
        {children}
    </Box>
)

