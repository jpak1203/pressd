import { Button, Center, Flex, Text } from '@chakra-ui/react'
import PressdLogo from '@/components/pressd-logo/PressdLogo'

export const CatastrophicFallback = () => (
    <Flex
        direction="column"
        minH="100vh"
        bg="var(--pressd-bg)"
    >
        <Flex
            px={{ base: '16px', md: '28px' }}
            py="16px"
            borderBottom="1px solid var(--pressd-border)"
        >
            <PressdLogo size="medium" to="/" />
        </Flex>
        <Center flex="1" flexDirection="column" gap="4" px="6">
            <Text
                className="pressd-mono"
                fontSize="10px"
                color="var(--pressd-text-muted)"
            >
                something went wrong
            </Text>
            <Text
                color="var(--pressd-text-sub)"
                fontSize="14px"
                textAlign="center"
                maxW="320px"
            >
                We ran into an unexpected problem. Try refreshing the page.
            </Text>
            <Button
                onClick={() => window.location.reload()}
                size="sm"
                bg="var(--pressd-accent)"
                color="var(--pressd-bg)"
                borderRadius="999px"
                px="20px"
                mt="2"
                _hover={{
                    bg: 'var(--pressd-accent-dim)',
                    color: 'var(--pressd-text)',
                }}
            >
                refresh page
            </Button>
        </Center>
    </Flex>
)
