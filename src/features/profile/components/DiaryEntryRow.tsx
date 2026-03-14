import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router';
import {
	FaHeart,
	FaStar,
	FaHeadphones,
	FaBookmark,
	FaPen,
} from 'react-icons/fa';
import type { DiaryAction, DiaryEntry } from '../types/profile';

type DiaryEntryRowProps = {
	entry: DiaryEntry;
};

const actionConfig: Record<
	DiaryAction,
	{ icon: React.ReactNode; label: string }
> = {
	liked: { icon: <FaHeart />, label: 'Liked' },
	rated: { icon: <FaStar />, label: 'Rated' },
	listened: { icon: <FaHeadphones />, label: 'Listened' },
	want_to_listen: { icon: <FaBookmark />, label: 'Want to listen' },
	reviewed: { icon: <FaPen />, label: 'Reviewed' },
};

const formatDate = (iso: string) =>
	new Date(iso).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
	});

const DiaryEntryRow = ({ entry }: DiaryEntryRowProps) => {
	const config = actionConfig[entry.action];

	return (
		<Link to={`/${entry.item_type}/${entry.spotify_id}`}>
			<Flex
				align="center"
				gap="3"
				py="2.5"
				px="1"
				borderRadius="8px"
				transition="background 0.15s"
				_hover={{ bg: 'var(--pressd-bg)' }}
			>
				<Text
					fontSize="11px"
					color="var(--pressd-text-muted)"
					minW="44px"
					className="pressd-mono"
				>
					{formatDate(entry.created_at)}
				</Text>

				<Box
					color="var(--pressd-accent)"
					fontSize="12px"
					flexShrink={0}
				>
					{config.icon}
				</Box>

				{entry.image_url && (
					<Image
						src={entry.image_url}
						alt={entry.name}
						boxSize="32px"
						borderRadius="4px"
						objectFit="cover"
						flexShrink={0}
					/>
				)}

				<Box flex="1" minW="0">
					<Text
						fontSize="13px"
						fontWeight="500"
						color="var(--pressd-text)"
						lineClamp={1}
					>
						{entry.name}
					</Text>
					{entry.artist_name && (
						<Text
							fontSize="11px"
							color="var(--pressd-text-sub)"
							lineClamp={1}
						>
							{entry.artist_name}
						</Text>
					)}
				</Box>

				{entry.action === 'rated' && entry.rating !== null && (
					<Flex
						align="center"
						gap="1"
						color="var(--pressd-accent)"
						fontSize="11px"
						flexShrink={0}
					>
						<FaStar />
						<Text className="pressd-mono" fontWeight="600">
							{entry.rating}
						</Text>
					</Flex>
				)}

				{entry.action === 'reviewed' && entry.review_text && (
					<Text
						fontSize="11px"
						color="var(--pressd-text-sub)"
						maxW="120px"
						lineClamp={1}
						flexShrink={0}
					>
						{entry.review_text}
					</Text>
				)}
			</Flex>
		</Link>
	);
};

export { DiaryEntryRow };
