import { Button, Flex, Grid, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router';
import blonde from '@/features/landing-page/assets/blonde.jpeg';

const HeroBanner = () => {
	return (
		<Flex
			direction="column"
			overflow="hidden"
			mt={{ base: '18px', md: '24px' }}
		>
			<Grid
				templateColumns={{
					base: 'repeat(3, 1fr)',
					md: 'repeat(6, 1fr)',
				}}
				gap="3"
				padding={{ base: '16px', md: '32px' }}
			>
				{[...Array(6)].map((_, i) => (
					<Image
						key={i}
						objectFit="cover"
						aspectRatio={1}
						src={blonde}
						borderRadius="6px"
						border="1px solid var(--pressd-border)"
						filter="saturate(0.85)"
					/>
				))}
			</Grid>
			<Flex
				alignContent="center"
				justifyContent="center"
				width="100%"
				px="16px"
			>
				<Text
					fontSize={{ base: '32px', md: '42px' }}
					letterSpacing="-0.03em"
					fontWeight="500"
					textAlign="center"
					maxW="760px"
					lineHeight="1.15"
				>
					Your music, documented.
					<br />
					Log every song and track what you really listen to.
				</Text>
			</Flex>
			<Flex
				alignContent="center"
				justifyContent="center"
				width="100%"
				pb="26px"
			>
				<Button
					mt="20px"
					asChild
					size="lg"
					borderRadius="999px"
					border="1px solid transparent"
					backgroundColor="var(--pressd-accent)"
					color="var(--pressd-bg)"
					_hover={{
						bg: 'var(--pressd-accent-dim)',
						color: 'var(--pressd-text)',
					}}
				>
					<Link to="/signup">
						<Text fontWeight="600" fontSize="1.1rem">
							Get started for free
						</Text>
					</Link>
				</Button>
			</Flex>
		</Flex>
	);
};

export default HeroBanner;
