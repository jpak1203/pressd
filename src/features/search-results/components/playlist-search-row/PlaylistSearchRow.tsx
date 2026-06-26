import { Box, HStack, Text } from '@chakra-ui/react'
import { SearchResultsImage } from '@/features/search-results/components/search-results-image/SearchResultsImage'
import type { PlaylistSearchResult } from '@/features/search-results/types/search-results'

type PlaylistSearchRowProps = {
    playlist: PlaylistSearchResult
}

export const PlaylistSearchRow = ({ playlist }: PlaylistSearchRowProps) => (
    <HStack
        align="center"
        gap="3"
        p="10px"
        borderRadius="10px"
        border="1px solid var(--pressd-border)"
        bg="var(--pressd-surface)"
        transition="border-color 0.15s ease, background-color 0.15s ease"
        _hover={{
            borderColor: 'var(--pressd-accent-dim)',
            bg: 'var(--pressd-surface-2)',
        }}
        width="100%"
    >
        <SearchResultsImage
            image={playlist.image_url}
            title={playlist.name}
        />
        <Box minW="0" flex="1">
            <Text fontWeight="600" lineClamp={1} color="var(--pressd-text)">
                {playlist.name}
            </Text>
            <Text fontSize="sm" color="var(--pressd-text-sub)" lineClamp={1}>
                by {playlist.owner_username} &middot; {playlist.track_count}{' '}
                tracks
            </Text>
        </Box>
    </HStack>
)
