import { Box, Image, Text } from '@chakra-ui/react'
import type { AlbumDetail } from '@/features/detail/types/detail'
import { AlbumLink } from '@/components/album-link/AlbumLink'

const getReleaseYear = (date: string): string => date.slice(0, 4)

type AlbumCardProps = { album: AlbumDetail }

const AlbumCard = ({ album }: AlbumCardProps) => (
    <AlbumLink album={album} style={{ display: 'block' }}>
        <Box
            borderRadius="6px"
            overflow="hidden"
            transition="opacity 0.15s ease"
            _hover={{ opacity: 0.8 }}
        >
            <Box
                position="relative"
                width="100%"
                paddingBottom="100%"
                bg="var(--pressd-surface-2)"
                borderRadius="6px"
                overflow="hidden"
            >
                {album.image ? (
                    <Image
                        src={album.image}
                        alt={album.name}
                        position="absolute"
                        inset="0"
                        width="100%"
                        height="100%"
                        objectFit="cover"
                    />
                ) : (
                    <Box
                        position="absolute"
                        inset="0"
                        bg="var(--pressd-surface-2)"
                    />
                )}
            </Box>
            <Box pt="2">
                <Text
                    fontSize="12px"
                    fontWeight="600"
                    color="var(--pressd-text)"
                    lineClamp={1}
                >
                    {album.name}
                </Text>
                <Text
                    fontSize="11px"
                    color="var(--pressd-text-muted)"
                    className="pressd-mono"
                >
                    {getReleaseYear(album.release_date)}
                </Text>
            </Box>
        </Box>
    </AlbumLink>
)

export { AlbumCard }
