import { useState } from 'react';
import { Box, HStack } from '@chakra-ui/react';
import { FaStar, FaRegStar } from 'react-icons/fa';

type StarRatingProps = {
	value: number | null;
	onChange?: (rating: number | null) => void;
	size?: string;
	readOnly?: boolean;
};

const StarRating = ({
	value,
	onChange,
	size = '18px',
	readOnly = false,
}: StarRatingProps) => {
	const [hovered, setHovered] = useState<number | null>(null);
	const display = hovered ?? value ?? 0;

	return (
		<HStack gap="3px">
			{[1, 2, 3, 4, 5].map((star) => (
				<Box
					key={star}
					as="button"
					fontSize={size}
					lineHeight="1"
					display="flex"
					alignItems="center"
					color={
						display >= star
							? 'var(--pressd-accent)'
							: 'var(--pressd-border)'
					}
					cursor={readOnly ? 'default' : 'pointer'}
					transition="color 0.1s ease, transform 0.1s ease"
					_hover={
						!readOnly
							? {
									transform: 'scale(1.25)',
									color: 'var(--pressd-accent)',
								}
							: undefined
					}
					onClick={() => {
						if (readOnly || !onChange) return;
						onChange(value === star ? null : star);
					}}
					onMouseEnter={() => !readOnly && setHovered(star)}
					onMouseLeave={() => !readOnly && setHovered(null)}
				>
					{display >= star ? <FaStar /> : <FaRegStar />}
				</Box>
			))}
		</HStack>
	);
};

export default StarRating;
