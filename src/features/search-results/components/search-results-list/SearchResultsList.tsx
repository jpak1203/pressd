import { Box, Text, VStack } from '@chakra-ui/react';
import type { ResultsListType } from '@/features/search-results/types/search-results';

const SearchResultsList = ({
	title,
	emptyText,
	children,
	isEmpty,
}: ResultsListType) => (
	<Box
		p="16px"
		bg="var(--pressd-surface)"
		border="1px solid var(--pressd-border)"
		borderRadius="14px"
	>
		<Text
			className="pressd-mono"
			fontSize="11px"
			letterSpacing="0.08em"
			color="var(--pressd-text-muted)"
			mb="12px"
		>
			{title}
		</Text>
		<VStack align="stretch" gap="2.5">
			{isEmpty ? (
				<Text color="var(--pressd-text-sub)">{emptyText}</Text>
			) : (
				children
			)}
		</VStack>
	</Box>
);

export default SearchResultsList;
