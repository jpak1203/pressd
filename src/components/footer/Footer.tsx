import { Box, Flex, IconButton, Link, Text } from '@chakra-ui/react'
import { FaXTwitter } from 'react-icons/fa6'
import { FaInstagram } from 'react-icons/fa'
import { MdOutlineEmail } from 'react-icons/md'
import { Link as RouterLink } from 'react-router'

const Footer = () => {
    return (
        <Box borderTop="1px solid var(--pressd-border)" mt="24px">
            <Flex
                maxW="1200px"
                mx="auto"
                px={{ base: '16px', md: '28px' }}
                py="20px"
                direction={{ base: 'column', md: 'row' }}
                gap="14px"
                justifyContent="space-between"
                alignItems={{ base: 'flex-start', md: 'center' }}
            >
                <Flex direction="column" gap="8px">
                    <Text fontSize="12px" color="var(--pressd-text-muted)">
                        &copy; pressd. made by a music fan.
                    </Text>
                </Flex>
                <Flex
                    direction="row"
                    gap={{ base: '10px', md: '16px' }}
                    flexWrap="wrap"
                >
                    {[
                        { label: 'about', to: '/about' },
                        { label: 'features', to: '/features' },
                        { label: 'privacy', to: '/privacy' },
                        { label: 'terms', to: '/terms' },
                    ].map((item) => (
                        <Link
                            key={item.label}
                            asChild
                            color="var(--pressd-text-muted)"
                            className="pressd-mono"
                            fontSize="10px"
                            _hover={{ color: 'var(--pressd-text)' }}
                        >
                            <RouterLink to={item.to}>{item.label}</RouterLink>
                        </Link>
                    ))}
                </Flex>
                <Flex direction="row" gap="8px">
                    <Link href="https://twitter.com/pressd">
                        <IconButton
                            size="2xs"
                            variant="plain"
                            border="1px solid var(--pressd-border)"
                            bg="var(--pressd-surface-2)"
                            color="var(--pressd-text-sub)"
                            _hover={{
                                color: 'var(--pressd-accent)',
                                borderColor: 'var(--pressd-accent-dim)',
                            }}
                        >
                            <FaXTwitter />
                        </IconButton>
                    </Link>
                    <Link href="https://instagram.com/pressd">
                        <IconButton
                            size="2xs"
                            variant="plain"
                            border="1px solid var(--pressd-border)"
                            bg="var(--pressd-surface-2)"
                            color="var(--pressd-text-sub)"
                            _hover={{
                                color: 'var(--pressd-accent)',
                                borderColor: 'var(--pressd-accent-dim)',
                            }}
                        >
                            <FaInstagram />
                        </IconButton>
                    </Link>
                    <Link href="mailto:hello@pressd.app">
                        <IconButton
                            size="2xs"
                            variant="plain"
                            border="1px solid var(--pressd-border)"
                            bg="var(--pressd-surface-2)"
                            color="var(--pressd-text-sub)"
                            _hover={{
                                color: 'var(--pressd-accent)',
                                borderColor: 'var(--pressd-accent-dim)',
                            }}
                        >
                            <MdOutlineEmail />
                        </IconButton>
                    </Link>
                </Flex>
            </Flex>
        </Box>
    )
}

export default Footer
