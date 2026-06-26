import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router'
import { Button, Center, Flex, Text } from '@chakra-ui/react'

type RouteErrorProps = {
    forceNotFound?: boolean
}

export const RouteError = ({ forceNotFound = false }: RouteErrorProps) => {
    const error = useRouteError()
    const navigate = useNavigate()

    const is404 =
        forceNotFound || (isRouteErrorResponse(error) && error.status === 404)

    const label = is404 ? 'page not found' : 'something went wrong'
    const message = is404
        ? "The page you're looking for doesn't exist."
        : 'An unexpected error occurred. Try again or go back home.'

    return (
        <Center minH="100%" flexDirection="column" gap="4" px="6" py="12">
            <Text
                className="pressd-mono"
                fontSize="10px"
                color="var(--pressd-text-muted)"
            >
                {label}
            </Text>
            <Text
                color="var(--pressd-text-sub)"
                fontSize="14px"
                textAlign="center"
                maxW="320px"
            >
                {message}
            </Text>
            <Flex gap="3">
                {!is404 && (
                    <Button
                        onClick={() => navigate(0)}
                        size="sm"
                        border="1px solid var(--pressd-border)"
                        backgroundColor="var(--pressd-surface-2)"
                        color="var(--pressd-text-sub)"
                        borderRadius="999px"
                        px="20px"
                        _hover={{
                            color: 'var(--pressd-text)',
                            borderColor: 'var(--pressd-accent-dim)',
                        }}
                    >
                        retry
                    </Button>
                )}
                <Button
                    onClick={() => navigate('/')}
                    size="sm"
                    bg="var(--pressd-accent)"
                    color="var(--pressd-bg)"
                    borderRadius="999px"
                    px="20px"
                    _hover={{
                        bg: 'var(--pressd-accent-dim)',
                        color: 'var(--pressd-text)',
                    }}
                >
                    go home
                </Button>
            </Flex>
        </Center>
    )
}
