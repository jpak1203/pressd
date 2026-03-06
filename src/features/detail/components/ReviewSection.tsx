import { useState } from 'react';
import {
	Box,
	Button,
	Flex,
	HStack,
	Text,
	Textarea,
	VStack,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import type { Review } from '../types/detail';
import StarRating from './StarRating';

type ReviewSectionProps = {
	reviews: Review[];
	onAddReview: (text: string, rating: number | null) => void;
	onRemoveReview: (id: string) => void;
	currentRating: number | null;
};

const formatDate = (iso: string) =>
	new Date(iso).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

const ReviewSection = ({
	reviews,
	onAddReview,
	onRemoveReview,
	currentRating,
}: ReviewSectionProps) => {
	const [text, setText] = useState('');
	const [reviewRating, setReviewRating] = useState<number | null>(
		currentRating,
	);
	const [isOpen, setIsOpen] = useState(false);

	const handleSubmit = () => {
		if (!text.trim()) return;
		onAddReview(text.trim(), reviewRating);
		setText('');
		setIsOpen(false);
	};

	const handleCancel = () => {
		setIsOpen(false);
		setText('');
	};

	return (
		<VStack align="stretch" gap="4">
			{!isOpen ? (
				<Button
					onClick={() => {
						setReviewRating(currentRating);
						setIsOpen(true);
					}}
					width="100%"
					border="1px dashed var(--pressd-border)"
					backgroundColor="transparent"
					color="var(--pressd-text-muted)"
					borderRadius="10px"
					fontSize="13px"
					height="42px"
					transition="all 0.15s ease"
					_hover={{
						borderColor: 'var(--pressd-accent-dim)',
						color: 'var(--pressd-text)',
						backgroundColor: 'var(--pressd-accent-glow)',
					}}
				>
					Write a review...
				</Button>
			) : (
				<Box
					bg="var(--pressd-surface-2)"
					border="1px solid var(--pressd-border)"
					borderRadius="12px"
					p="4"
				>
					<VStack align="stretch" gap="3">
						<HStack gap="2" align="center">
							<Text
								fontSize="10px"
								color="var(--pressd-text-muted)"
								className="pressd-mono"
								flexShrink={0}
							>
								rating
							</Text>
							<StarRating
								value={reviewRating}
								onChange={setReviewRating}
								size="16px"
							/>
						</HStack>
						<Textarea
							value={text}
							onChange={(e) => setText(e.target.value)}
							placeholder="What did you think?"
							rows={4}
							bg="var(--pressd-surface)"
							border="1px solid var(--pressd-border)"
							borderRadius="8px"
							color="var(--pressd-text)"
							fontSize="14px"
							p="3"
							resize="none"
							_placeholder={{ color: 'var(--pressd-text-muted)' }}
							_focusVisible={{
								borderColor: 'var(--pressd-accent)',
								boxShadow: '0 0 0 1px var(--pressd-accent)',
							}}
						/>
						<HStack gap="2" justify="flex-end">
							<Button
								onClick={handleCancel}
								size="sm"
								backgroundColor="transparent"
								color="var(--pressd-text-muted)"
								borderRadius="999px"
								border="1px solid var(--pressd-border)"
								fontSize="12px"
								height="32px"
								px="12px"
								_hover={{ color: 'var(--pressd-text)' }}
							>
								Cancel
							</Button>
							<Button
								onClick={handleSubmit}
								disabled={!text.trim()}
								size="sm"
								bg="var(--pressd-accent)"
								color="var(--pressd-bg)"
								borderRadius="999px"
								fontSize="12px"
								height="32px"
								px="14px"
								_hover={{
									bg: 'var(--pressd-accent-dim)',
									color: 'var(--pressd-text)',
								}}
								_disabled={{
									opacity: 0.4,
									cursor: 'not-allowed',
								}}
							>
								Save Review
							</Button>
						</HStack>
					</VStack>
				</Box>
			)}

			{reviews.length > 0 ? (
				<VStack align="stretch" gap="3">
					{reviews.map((review) => (
						<Box
							key={review.id}
							bg="var(--pressd-surface-2)"
							border="1px solid var(--pressd-border)"
							borderRadius="12px"
							p="4"
						>
							<Flex
								justify="space-between"
								align="flex-start"
								mb="2"
							>
								<VStack align="flex-start" gap="1">
									{review.rating !== null && (
										<StarRating
											value={review.rating}
											readOnly
											size="13px"
										/>
									)}
									<Text
										fontSize="10px"
										color="var(--pressd-text-muted)"
										className="pressd-mono"
									>
										{formatDate(review.date)}
									</Text>
								</VStack>
								<Button
									size="xs"
									onClick={() => onRemoveReview(review.id)}
									backgroundColor="transparent"
									color="var(--pressd-border)"
									borderRadius="999px"
									border="none"
									height="28px"
									width="28px"
									p="0"
									_hover={{ color: 'var(--pressd-red)' }}
									transition="color 0.15s ease"
								>
									<FaTrash />
								</Button>
							</Flex>
							<Text
								fontSize="14px"
								color="var(--pressd-text-sub)"
								lineHeight="1.65"
								whiteSpace="pre-wrap"
							>
								{review.text}
							</Text>
						</Box>
					))}
				</VStack>
			) : (
				<Text
					fontSize="13px"
					color="var(--pressd-text-muted)"
					textAlign="center"
					py="3"
				>
					No reviews yet.
				</Text>
			)}
		</VStack>
	);
};

export default ReviewSection;
