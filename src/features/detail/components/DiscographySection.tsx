import { Box, Grid, Image, Skeleton, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router';
import SectionCard from '@/features/detail/components/SectionCard';
import { useArtistDiscography } from '@/features/detail/hooks/useArtistDiscography';
import type { AlbumDetail } from '@/features/detail/types/detail';

const getReleaseYear = (date: string): string => date.slice(0, 4);

type AlbumCardProps = { album: AlbumDetail };

const AlbumCard = ({ album }: AlbumCardProps) => (
	<Link to={`/album/${album.id}`} state={album} style={{ display: 'block' }}>
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
	</Link>
);

const AlbumGrid = ({ items }: { items: AlbumDetail[] }) => (
	<Grid
		templateColumns={{
			base: 'repeat(2, 1fr)',
			sm: 'repeat(3, 1fr)',
			md: 'repeat(4, 1fr)',
			lg: 'repeat(6, 1fr)',
		}}
		gap="4"
	>
		{items.map((album) => (
			<AlbumCard key={album.id} album={album} />
		))}
	</Grid>
);

type DiscographySectionProps = { artistId: string };

export const DiscographySection = ({ artistId }: DiscographySectionProps) => {
	const { albums, singles, isLoading } = useArtistDiscography(artistId);

	if (isLoading) {
		const skeletonGrid = (
			<Grid
				templateColumns={{
					base: 'repeat(2, 1fr)',
					sm: 'repeat(3, 1fr)',
					md: 'repeat(4, 1fr)',
					lg: 'repeat(6, 1fr)',
				}}
				gap="4"
			>
				{Array.from({ length: 6 }).map((_, i) => (
					<Box key={i}>
						<Skeleton borderRadius="6px" width="100%" paddingBottom="100%" />
						<Box pt="2">
							<Skeleton height="12px" width="80%" mb="1" borderRadius="4px" />
							<Skeleton height="10px" width="40%" borderRadius="4px" />
						</Box>
					</Box>
				))}
			</Grid>
		);

		return (
			<VStack align="stretch" gap="5">
				<SectionCard label="albums">
					{skeletonGrid}
				</SectionCard>
				<SectionCard label="singles">
					{skeletonGrid}
				</SectionCard>
			</VStack>
		);
	}

	return (
		<VStack align="stretch" gap="5">
			<SectionCard label={`albums (${albums.length})`}>
				{albums.length === 0 ? (
					<Text fontSize="13px" color="var(--pressd-text-muted)">
						No albums in catalog yet.
					</Text>
				) : (
					<AlbumGrid items={albums} />
				)}
			</SectionCard>

			<SectionCard label={`singles (${singles.length})`}>
				{singles.length === 0 ? (
					<Text fontSize="13px" color="var(--pressd-text-muted)">
						No singles in catalog yet.
					</Text>
				) : (
					<AlbumGrid items={singles} />
				)}
			</SectionCard>
		</VStack>
	);
};
