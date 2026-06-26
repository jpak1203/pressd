import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Flex, Box, IconButton, Icon, Input } from '@chakra-ui/react'
import { LuSearch } from 'react-icons/lu'
import { FaArrowCircleRight } from 'react-icons/fa'
import { TiDeleteOutline } from 'react-icons/ti'

export const SearchBar = () => {
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState('')
    const hasSearchText = searchValue.trim().length > 0

    const handleSearchSubmit = () => {
        const query = searchValue.trim()
        if (!query) return
        navigate(`/search?query=${encodeURIComponent(query)}`)
    }

    const handleClearSearch = () => {
        setSearchValue('')
    }

    return (
        <Flex position="relative" alignItems="center">
            <Box
                zIndex="2"
                position="absolute"
                left="4px"
                opacity={hasSearchText ? 1 : 0}
                pointerEvents={hasSearchText ? 'auto' : 'none'}
                transition="opacity 0.2s ease, transform 0.18s ease"
            >
                <IconButton
                    aria-label="Search"
                    size="2xs"
                    variant="ghost"
                    h="26px"
                    w="26px"
                    minW="26px"
                    borderRadius="6px"
                    bg="var(--pressd-surface)"
                    color="var(--pressd-accent)"
                    onClick={handleClearSearch}
                    _hover={{
                        color: 'var(--pressd-accent-dim)',
                    }}
                >
                    <TiDeleteOutline />
                </IconButton>
            </Box>
            <Icon
                zIndex="2"
                position="absolute"
                left="10px"
                color="var(--pressd-text-muted)"
                boxSize="14px"
                pointerEvents="none"
                opacity={hasSearchText ? 0 : 1}
                transition="opacity 0.2s ease, transform 0.18s ease"
            >
                <LuSearch />
            </Icon>
            <Input
                type="search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault()
                        handleSearchSubmit()
                    }
                }}
                placeholder="search artists, albums..."
                bg="var(--pressd-surface-2)"
                border="1px solid var(--pressd-border)"
                borderRadius="8px"
                color="var(--pressd-text)"
                fontSize="13px"
                h="34px"
                ps="34px"
                pe="40px"
                w={{ base: '200px', md: '230px' }}
                _focusVisible={{
                    borderColor: 'var(--pressd-accent)',
                    boxShadow: '0 0 0 1px var(--pressd-accent)',
                }}
            />
            <Box
                position="absolute"
                right="4px"
                opacity={hasSearchText ? 1 : 0}
                transform={hasSearchText ? 'translateX(0)' : 'translateX(6px)'}
                pointerEvents={hasSearchText ? 'auto' : 'none'}
                transition="opacity 0.18s ease, transform 0.18s ease"
            >
                <IconButton
                    aria-label="Search"
                    size="2xs"
                    variant="plain"
                    h="26px"
                    w="26px"
                    minW="26px"
                    borderRadius="6px"
                    border="1px solid var(--pressd-border)"
                    bg="var(--pressd-surface)"
                    color="var(--pressd-accent)"
                    onClick={handleSearchSubmit}
                    _hover={{
                        bg: 'var(--pressd-surface-2)',
                        borderColor: 'var(--pressd-accent-dim)',
                    }}
                >
                    <FaArrowCircleRight />
                </IconButton>
            </Box>
        </Flex>
    )
}

