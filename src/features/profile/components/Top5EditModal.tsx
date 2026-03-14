import { useState } from 'react';
import {
	Box,
	Button,
	CloseButton,
	Dialog,
	Flex,
	HStack,
	Image,
	Input,
	Text,
	VStack,
} from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';
import { useSpotifySearch } from '@/features/search-results/hooks/useSpotifySearch';
import { useEditTop5 } from '../hooks/useEditTop5';
import type { Top5Category, Top5Item } from '../types/profile';
import type { SpotifySearchResponse } from '@/services/spotify/types';

type Top5EditModalProps = {
	profileId: string;
	category: Top5Category;
	currentItems: Top5Item[];
	open: boolean;
	onClose: () => void;
	onSaved: () => void;
};

const categoryLabels: Record<Top5Category, string> = {
	album: 'TOP 5 ALBUMS',
	artist: 'TOP 5 ARTISTS',
	track: 'TOP 5 TRACKS',
};

const searchTypeMap: Record<Top5Category, 'album' | 'artist' | 'track'> = {
	album: 'album',
	artist: 'artist',
	track: 'track',
};

type SearchResultItem = {
	id: string;
	name: string;
	image: string | null;
	artistName: string | null;
};

const extractResults = (
	data: SpotifySearchResponse | null,
	category: Top5Category,
): SearchResultItem[] => {
	if (!data) return [];

	if (category === 'album') {
		return data.albums.map((a) => ({
			id: a.id,
			name: a.name,
			image: a.image,
			artistName: a.artists.map((ar) => ar.name).join(', '),
		}));
	}
	if (category === 'artist') {
		return data.artists.map((a) => ({
			id: a.id,
			name: a.name,
			image: a.image,
			artistName: null,
		}));
	}
	return data.tracks.map((t) => ({
		id: t.id,
		name: t.name,
		image: t.album.image,
		artistName: t.artists.map((ar) => ar.name).join(', '),
	}));
};

const Top5EditModal = ({
	profileId,
	category,
	currentItems,
	open,
	onClose,
	onSaved,
}: Top5EditModalProps) => {
	const [items, setItems] = useState<Omit<Top5Item, 'id'>[]>(
		currentItems.map((item) => ({
			position: item.position,
			spotify_id: item.spotify_id,
			name: item.name,
			image_url: item.image_url,
			artist_name: item.artist_name,
		})),
	);

	const { query, setQuery, data, isLoading } = useSpotifySearch({
		type: searchTypeMap[category],
		limit: 5,
		enabled: open,
	});

	const { save, isSubmitting, error } = useEditTop5(profileId, () => {
		onSaved();
		onClose();
	});

	const results = extractResults(data, category);
	const isAtMax = items.length >= 5;

	const addItem = (result: SearchResultItem) => {
		if (isAtMax) return;
		if (items.some((i) => i.spotify_id === result.id)) return;

		setItems((prev) => [
			...prev,
			{
				position: prev.length + 1,
				spotify_id: result.id,
				name: result.name,
				image_url: result.image,
				artist_name: result.artistName,
			},
		]);
	};

	const removeItem = (index: number) => {
		setItems((prev) =>
			prev
				.filter((_, i) => i !== index)
				.map((item, i) => ({ ...item, position: i + 1 })),
		);
	};

	const handleSave = () => {
		void save(category, items);
	};

	return (
		<Dialog.Root open={open} onOpenChange={(e) => !e.open && onClose()}>
			<Dialog.Backdrop bg="blackAlpha.700" backdropFilter="blur(4px)" />
			<Dialog.Positioner>
				<Dialog.Content
					bg="var(--pressd-surface)"
					border="1px solid var(--pressd-border)"
					borderRadius="16px"
					p="6"
					maxW="520px"
					w="90vw"
					maxH="85vh"
					overflow="auto"
				>
					<Flex justify="space-between" align="center" mb="5">
						<Text
							className="pressd-mono"
							fontSize="10px"
							color="var(--pressd-accent)"
							letterSpacing="0.14em"
						>
							EDIT {categoryLabels[category]}
						</Text>
						<Dialog.CloseTrigger asChild>
							<CloseButton
								size="sm"
								color="var(--pressd-text-muted)"
							/>
						</Dialog.CloseTrigger>
					</Flex>

					<VStack gap="4" align="stretch">
						{/* Current items */}
						<VStack gap="2" align="stretch">
							{items.map((item, index) => (
								<HStack
									key={item.spotify_id}
									gap="3"
									bg="var(--pressd-bg)"
									border="1px solid var(--pressd-border)"
									borderRadius="10px"
									p="2.5"
								>
									<Text
										fontSize="13px"
										fontWeight="700"
										color="var(--pressd-accent)"
										minW="20px"
										textAlign="center"
									>
										{index + 1}
									</Text>
									{item.image_url && (
										<Image
											src={item.image_url}
											alt={item.name}
											width="36px"
											height="36px"
											objectFit="cover"
											borderRadius={
												category === 'artist'
													? '50%'
													: '4px'
											}
										/>
									)}
									<Box flex="1" minW="0">
										<Text
											fontSize="13px"
											fontWeight="600"
											color="var(--pressd-text)"
											lineClamp={1}
										>
											{item.name}
										</Text>
										{item.artist_name && (
											<Text
												fontSize="11px"
												color="var(--pressd-text-muted)"
												lineClamp={1}
											>
												{item.artist_name}
											</Text>
										)}
									</Box>
									<Button
										size="xs"
										onClick={() => removeItem(index)}
										bg="transparent"
										color="var(--pressd-text-muted)"
										_hover={{ color: 'var(--pressd-red)' }}
										p="1"
										minW="auto"
									>
										<FaTimes />
									</Button>
								</HStack>
							))}
							{items.length === 0 && (
								<Text
									fontSize="13px"
									color="var(--pressd-text-muted)"
									textAlign="center"
									py="3"
								>
									No items yet. Search below to add.
								</Text>
							)}
						</VStack>

						{/* Search */}
						{!isAtMax && (
							<Box>
								<Text
									fontSize="12px"
									color="var(--pressd-text-muted)"
									mb="1.5"
									className="pressd-mono"
								>
									SEARCH TO ADD
								</Text>
								<Input
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									placeholder={`Search for ${category}s...`}
									bg="var(--pressd-bg)"
									border="1px solid var(--pressd-border)"
									color="var(--pressd-text)"
									fontSize="14px"
									borderRadius="8px"
									_focus={{
										borderColor: 'var(--pressd-accent)',
										outline: 'none',
									}}
								/>

								{isLoading && (
									<Text
										fontSize="12px"
										color="var(--pressd-text-muted)"
										mt="2"
									>
										Searching...
									</Text>
								)}

								{results.length > 0 && (
									<VStack
										gap="1"
										align="stretch"
										mt="2"
										maxH="200px"
										overflow="auto"
									>
										{results
											.filter(
												(r) =>
													!items.some(
														(i) =>
															i.spotify_id ===
															r.id,
													),
											)
											.map((result) => (
												<HStack
													key={result.id}
													gap="3"
													p="2"
													borderRadius="8px"
													cursor="pointer"
													transition="background 0.15s ease"
													_hover={{
														bg: 'var(--pressd-surface-2)',
													}}
													onClick={() =>
														addItem(result)
													}
												>
													{result.image && (
														<Image
															src={result.image}
															alt={result.name}
															width="32px"
															height="32px"
															objectFit="cover"
															borderRadius={
																category ===
																'artist'
																	? '50%'
																	: '4px'
															}
														/>
													)}
													<Box flex="1" minW="0">
														<Text
															fontSize="13px"
															fontWeight="500"
															color="var(--pressd-text)"
															lineClamp={1}
														>
															{result.name}
														</Text>
														{result.artistName && (
															<Text
																fontSize="11px"
																color="var(--pressd-text-muted)"
																lineClamp={1}
															>
																{
																	result.artistName
																}
															</Text>
														)}
													</Box>
												</HStack>
											))}
									</VStack>
								)}
							</Box>
						)}

						{error && (
							<Text fontSize="13px" color="var(--pressd-red)">
								{error}
							</Text>
						)}

						<Flex gap="3" justify="flex-end" mt="2">
							<Button
								size="sm"
								onClick={onClose}
								border="1px solid var(--pressd-border)"
								backgroundColor="var(--pressd-surface-2)"
								color="var(--pressd-text-sub)"
								borderRadius="999px"
								fontSize="12px"
								className="pressd-mono"
								px="14px"
								_hover={{
									color: 'var(--pressd-text)',
								}}
							>
								cancel
							</Button>
							<Button
								size="sm"
								onClick={handleSave}
								disabled={isSubmitting}
								bg="var(--pressd-accent)"
								color="var(--pressd-bg)"
								borderRadius="999px"
								fontSize="12px"
								className="pressd-mono"
								px="18px"
								_hover={{
									bg: 'var(--pressd-accent-dim)',
									color: 'var(--pressd-text)',
								}}
							>
								{isSubmitting ? 'saving...' : 'save'}
							</Button>
						</Flex>
					</VStack>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
};

export default Top5EditModal;
