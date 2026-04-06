import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { Button, Center, Flex, Text } from '@chakra-ui/react'

type ErrorBoundaryProps = {
    children: ReactNode
    fallback?: ReactNode
}

type ErrorBoundaryState = {
    hasError: boolean
    error: Error | null
}

export class ErrorBoundary extends Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error('ErrorBoundary caught:', error, info.componentStack)
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null })
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback

            return (
                <Center
                    minH="100%"
                    flexDirection="column"
                    gap="4"
                    px="6"
                    py="12"
                >
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
                        An unexpected error occurred.
                    </Text>
                </Center>
            )
        }

        return this.props.children
    }
}
