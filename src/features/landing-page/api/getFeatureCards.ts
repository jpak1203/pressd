import featureCards from '@/features/landing-page/data/featureCards.json';
import type { FeatureCardType } from '@/features/landing-page/types/feature-card';

export const getFeatureCards = (): FeatureCardType[] => {
	return featureCards as FeatureCardType[];
};
