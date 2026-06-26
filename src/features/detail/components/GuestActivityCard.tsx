import { Button, HStack, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router'
import type { ItemType } from '@/features/detail/types/detail'
import { SectionCard } from '@/features/detail/components/SectionCard'

type GuestActivityCardProps = {
    type: ItemType
}

export const GuestActivityCard = ({ type }: GuestActivityCardProps) => (
    <SectionCard label="your activity">
        <VStack align="stretch" gap="4">
            <Text fontSize="14px" color="var(--pressd-text-sub)">
                Sign in to rate, like, and review this {type}.
            </Text>
            <HStack gap="2" flexWrap="wrap">
                <Button
                    asChild
                    size="sm"
                    borderRadius="999px"
                    bg="var(--pressd-accent)"
                    color="var(--pressd-bg)"
                    px="14px"
                    height="34px"
                    fontSize="12px"
                    className="pressd-mono"
                    transition="all 0.15s ease"
                    _hover={{
                        bg: 'var(--pressd-accent-dim)',
                        color: 'var(--pressd-text)',
                    }}
                >
                    <Link to="/signin">Sign in</Link>
                </Button>
                <Button
                    asChild
                    size="sm"
                    borderRadius="999px"
                    border="1px solid"
                    borderColor="var(--pressd-border)"
                    backgroundColor="transparent"
                    color="var(--pressd-text-sub)"
                    px="14px"
                    height="34px"
                    fontSize="12px"
                    className="pressd-mono"
                    transition="all 0.15s ease"
                    _hover={{
                        borderColor: 'var(--pressd-accent)',
                        color: 'var(--pressd-accent)',
                        backgroundColor: 'var(--pressd-accent-glow)',
                    }}
                >
                    <Link to="/signup">Create account</Link>
                </Button>
            </HStack>
        </VStack>
    </SectionCard>
)
