import { HStack, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router';
import type { SearchItemRowType } from '@/features/search-results/types/search-results';
import { formatRating } from '@/features/search-results/utils/searchResultsUtils';
import SearchResultsImage from '@/features/search-results/components/search-results-image/SearchResultsImage';
import { FaStar } from 'react-icons/fa';

const getDetailPath = (
	itemType: SearchItemRowType['itemType'],
	id: string,
) => {
	if (itemType === 'track') return `/track/${id}`;
	if (itemType === 'album') return `/album/${id}`;
	return `/artist/${id}`;
};

const SearchResultsRow = ({
	id,
	title,
	image,
	rating,
	showRating,
	itemType,
	stateData,
}: SearchItemRowType) => {
	const to = getDetailPath(itemType, id);

	return (
		<Link
			to={to}
			state={stateData}
			style={{ width: '100%', display: 'block' }}
		>
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
				<SearchResultsImage image={image} title={title} />
				<Flex direction="column" minW="0" flex="1">
					<Text
						fontWeight="600"
						lineClamp={1}
						color="var(--pressd-text)"
					>
						{title}
					</Text>
					{showRating && (
						<HStack
							gap="1.5"
							mt="1"
							color="var(--pressd-green)"
							fontSize="12px"
						>
							<FaStar />
							<Text>{formatRating(rating)}</Text>
						</HStack>
					)}
				</Flex>
			</HStack>
		</Link>
	);
};

export default SearchResultsRow;
