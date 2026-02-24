import { useEffect, useState } from 'react';
import { Grid } from '@chakra-ui/react';
import type { FeatureCardType } from '@/features/landing-page/types/feature-card';
import FeatureCard from '@/features/landing-page/components/feature-card/FeatureCard';
import { getFeatureCards } from '@/features/landing-page/api/getFeatureCards';

const FeatureCardGrid = () => {
	const [featureCards, setFeatureCards] = useState<FeatureCardType[]>([]);

	useEffect(() => {
		const data = getFeatureCards();
		setFeatureCards(data);
	}, []);

	return (
		<Grid templateColumns="repeat(3, 1fr)" gap="6" padding="12">
			{featureCards.map((item: FeatureCardType, index: number) => (
				<FeatureCard
					key={index}
					title={item.title}
					description={item.description}
					icon={item.icon}
				/>
			))}
		</Grid>
	);
};

export default FeatureCardGrid;
