import { Box, Image, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router'
import type { Top5Category } from '../types/profile'

type Top5CardProps = {
    spotifyId: string
    name: string
    imageUrl: string | null
    artistName: string | null
    rank: number
    category: Top5Category
}

const Top5Card = ({
    spotifyId,
    name,
    imageUrl,
    artistName,
    rank,
    category,
}: Top5CardProps) => {
    const routeType =
        category === 'album'
            ? 'album'
            : category === 'artist'
              ? 'artist'
              : 'track'
    const isArtist = category === 'artist'

    return (
        <Link to={`/${routeType}/${spotifyId}`}>
            <VStack
                gap="2"
                align="center"
                cursor="pointer"
                transition="opacity 0.15s ease"
                _hover={{ opacity: 0.8 }}
                width={{ base: '80px', md: '120px' }}
            >
                <Box position="relative">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={name}
                            width={{ base: '80px', md: '120px' }}
                            height={{ base: '80px', md: '120px' }}
                            objectFit="cover"
                            borderRadius={isArtist ? '50%' : '8px'}
                        />
                    ) : (
                        <Box
                            width={{ base: '80px', md: '120px' }}
                            height={{ base: '80px', md: '120px' }}
                            borderRadius={isArtist ? '50%' : '8px'}
                            bg="var(--pressd-surface-2)"
                            border="1px solid var(--pressd-border)"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Text fontSize="24px" color="var(--pressd-border)">
                                {isArtist ? '👤' : '🎵'}
                            </Text>
                        </Box>
                    )}
                    <Box
                        position="absolute"
                        top="-6px"
                        left="-6px"
                        bg="var(--pressd-accent)"
                        color="var(--pressd-bg)"
                        borderRadius="50%"
                        width="22px"
                        height="22px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="11px"
                        fontWeight="700"
                    >
                        {rank}
                    </Box>
                </Box>
                <Box textAlign="center" width="100%">
                    <Text
                        fontSize="12px"
                        fontWeight="600"
                        color="var(--pressd-text)"
                        lineClamp={1}
                    >
                        {name}
                    </Text>
                    {artistName && (
                        <Text
                            fontSize="11px"
                            color="var(--pressd-text-muted)"
                            lineClamp={1}
                        >
                            {artistName}
                        </Text>
                    )}
                </Box>
            </VStack>
        </Link>
    )
}

export default Top5Card
