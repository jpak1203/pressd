import { Flex, Box } from '@chakra-ui/react'
import { NavBar } from '@/components/nav-bar/NavBar'
import { Footer } from '@/components/footer/Footer'

interface LayoutWrapperProps {
    children: React.ReactNode
}

export const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
    return (
        <Flex direction="column" minH="100vh">
            <NavBar />
            <Box flex="1">{children}</Box>
            <Footer />
        </Flex>
    )
}

