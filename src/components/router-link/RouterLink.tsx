import type { ReactNode } from 'react'
import { Link as ChakraLink } from '@chakra-ui/react'
import { Link } from 'react-router'

type RouterLinkType = {
    variant: 'underline' | 'plain' | undefined
    color: string
    slug: string
    children: ReactNode
}

export const RouterLink = ({ variant, color, slug, children }: RouterLinkType) => {
    return (
        <ChakraLink variant={variant} colorPalette={color} asChild>
            <Link to={slug}>{children}</Link>
        </ChakraLink>
    )
}

