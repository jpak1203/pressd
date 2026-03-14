import { Box, Flex, Text } from '@chakra-ui/react';
import type { RatingItem } from '../types/profile';

type RatingBarGraphProps = {
	ratings: RatingItem[];
};

const RatingBarGraph = ({ ratings }: RatingBarGraphProps) => {
	const counts = Array.from({ length: 10 }, (_, i) => {
		const value = i + 1;
		return ratings.filter((r) => r.rating === value).length;
	});

	const maxCount = Math.max(...counts, 1);

	return (
		<Flex align="flex-end" gap="1" h="80px">
			{counts.map((count, i) => (
				<Flex
					key={i}
					direction="column"
					align="center"
					flex="1"
					gap="1"
					h="100%"
					justifyContent="flex-end"
				>
					<Text
						fontSize="9px"
						color="var(--pressd-text-muted)"
						lineHeight="1"
					>
						{count > 0 ? count : ''}
					</Text>
					<Box
						w="100%"
						bg="var(--pressd-accent)"
						borderRadius="2px"
						h={`${(count / maxCount) * 60}px`}
						minH={count > 0 ? '4px' : '0px'}
						transition="height 0.2s"
					/>
					<Text
						fontSize="9px"
						color="var(--pressd-text-sub)"
						lineHeight="1"
						className="pressd-mono"
					>
						{i + 1}
					</Text>
				</Flex>
			))}
		</Flex>
	);
};

export { RatingBarGraph };
