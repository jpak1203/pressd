import type { FeatureCardType } from '@/features/landing-page/types/feature-card';
import { Card, Icon } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoIosJournal } from 'react-icons/io';
import { RiPlayList2Fill, RiUserFollowFill } from 'react-icons/ri';
import { MdOutlineRateReview } from 'react-icons/md';

const getIconForCard = (icon: string) => {
	switch (icon) {
		case 'heart':
			return <FaHeart />;
		case 'journal':
			return <IoIosJournal />;
		case 'playlist':
			return <RiPlayList2Fill />;
		case 'review':
			return <MdOutlineRateReview />;
		case 'user':
			return <RiUserFollowFill />;
		case 'magnifying-glass':
			return <FaMagnifyingGlass />;
		default:
			return <FaHeart />;
	}
};

const FeatureCard = ({ title, description, icon }: FeatureCardType) => {
	return (
		<Card.Root
			bg="var(--pressd-surface)"
			border="1px solid var(--pressd-border)"
			borderRadius="10px"
			_hover={{ bg: 'var(--pressd-surface-2)' }}
			transition="background 0.15s ease"
		>
			<Card.Body gap="2">
				<Card.Title
					mb="2"
					fontSize="16px"
					fontWeight="500"
					letterSpacing="-0.02em"
					color="var(--pressd-text)"
				>
					<Icon size="md" color="var(--pressd-accent)" mr="2">
						{getIconForCard(icon)}
					</Icon>
					{title}
				</Card.Title>
				<Card.Description color="var(--pressd-text-sub)" fontSize="14px">
					{description}
				</Card.Description>
			</Card.Body>
		</Card.Root>
	);
};

export default FeatureCard;
