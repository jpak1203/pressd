import { Box, Flex, Grid, Heading, Image, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';
import { FaStar } from 'react-icons/fa';
import type { RowModuleData } from '@/features/home-page/types/home-page';

type RowModuleProps = {
	data: RowModuleData;
	linkText: string;
	headerText: string;
};

const RowModule = ({ data, linkText, headerText }: RowModuleProps) => {
	return (
		<Box as="section" w="100%">
			<Flex
				alignItems="center"
				justifyContent="space-between"
				borderBottom="1px solid"
				borderColor="whiteAlpha.300"
				pb="2"
				mb="4"
			>
				<Heading size="md" textTransform="uppercase">
					{headerText}
				</Heading>
				<Link asChild fontSize="xs" textTransform="uppercase">
					<RouterLink to={data.moreHref}>{linkText}</RouterLink>
				</Link>
			</Flex>

			<Grid
				templateColumns={{
					base: 'repeat(2, minmax(0, 1fr))',
					sm: 'repeat(3, minmax(0, 1fr))',
					md: 'repeat(4, minmax(0, 1fr))',
					lg: 'repeat(6, minmax(0, 1fr))',
				}}
				gap="4"
				pb="2"
				w="100%"
			>
				{data.items.map((song) => (
					<Flex key={song.id} minW={0}>
						<Flex direction="column">
							<Link asChild _hover={{ textDecoration: 'none' }}>
								<RouterLink to={song.href}>
									<Image
										src={song.artworkUrl}
										alt={`${song.title} artwork`}
										w="100%"
										aspectRatio={1}
										objectFit="cover"
										borderRadius="md"
										border="1px solid"
										borderColor="whiteAlpha.300"
									/>
								</RouterLink>
							</Link>
							<Link asChild _hover={{ textDecoration: 'none' }}>
								<RouterLink to={song.href}>
									<Text
										mt="2"
										fontWeight="700"
										color="whiteAlpha.900"
										lineClamp={1}
									>
										{song.title}
									</Text>
								</RouterLink>
							</Link>
							<Link asChild color="whiteAlpha.700">
								<RouterLink to={song.artist.href}>
									<Text
										color="whiteAlpha.700"
										fontSize="sm"
										lineClamp={1}
									>
										{song.artist.name}
									</Text>
								</RouterLink>
							</Link>
							<Flex
								mt="2"
								alignItems="center"
								justifyContent="space-between"
							>
								<Flex
									alignItems="center"
									gap="1"
									color="green.400"
									fontSize="sm"
									fontWeight="700"
								>
									<FaStar />
									<Text>{song.averageRating.toFixed(1)}</Text>
								</Flex>
								<Text color="whiteAlpha.700" fontSize="sm">
									{song.releaseDate}
								</Text>
							</Flex>
						</Flex>
					</Flex>
				))}
			</Grid>
		</Box>
	);
};

export default RowModule;
