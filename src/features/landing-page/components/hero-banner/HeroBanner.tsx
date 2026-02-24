import { Flex, Grid, Text, Button, Image } from '@chakra-ui/react';
import blonde from '@/features/landing-page/assets/blonde.jpeg';

const HeroBanner = () => {
	return (
		<Flex direction="column" backgroundColor="black" padding="20px">
			<Grid templateColumns="repeat(6, 1fr)" gap="3" padding="40px 120px">
				{[...Array(6)].map((_, i) => (
					<Image
						key={i}
						objectFit="cover"
						aspectRatio={1}
						src={blonde}
					></Image>
				))}
			</Grid>
			<Flex alignContent="center" justifyContent="center" width="100%">
				<Text
					textStyle="4xl"
					fontWeight="semibold"
					textAlign="center"
					width="40%"
					lineHeight="1.25"
				>
					Your music, shared.
					<br />
					Log every song, curate your favorites, and connect with
					listeners who get it.
				</Text>
			</Flex>
			<Flex alignContent="center" justifyContent="center" width="100%">
				<Button
					margin="2rem"
					variant="solid"
					colorPalette="red"
					size="lg"
					rounded="3xl"
					width="20%"
				>
					<Text fontWeight="600" fontSize="1.1rem">
						Get started for free!
					</Text>
				</Button>
			</Flex>
		</Flex>
	);
};

export default HeroBanner;
