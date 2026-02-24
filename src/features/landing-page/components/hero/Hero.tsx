import { Flex } from '@chakra-ui/react';
import HeroBanner from '@/features/landing-page/components/hero-banner/HeroBanner';
import FeatureCardGrid from '@/features/landing-page/components/feature-card-grid/FeatureCardGrid';

const Hero = () => {
	return (
		<Flex direction="column" alignContent="center" justifyContent="center">
			<HeroBanner />
			<FeatureCardGrid />
		</Flex>
	);
};

export default Hero;
