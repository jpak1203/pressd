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
		<Card.Root variant="elevated" colorPalette="red">
			<Card.Body gap="2">
				<Card.Title mb="2">
					<Icon size="md" color="tomato" mr="2">
						{getIconForCard(icon)}
					</Icon>
					{title}
				</Card.Title>
				<Card.Description>{description}</Card.Description>
			</Card.Body>
		</Card.Root>
	);
};

export default FeatureCard;
