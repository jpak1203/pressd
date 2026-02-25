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
				borderBottom="1px solid var(--pressd-border)"
				pb="10px"
				mb="12px"
			>
				<Heading
					size="md"
					textTransform="uppercase"
					className="pressd-mono"
					letterSpacing="0.08em"
					fontSize="11px"
					color="var(--pressd-text-muted)"
				>
					{headerText}
				</Heading>
				<Link
					asChild
					fontSize="11px"
					textTransform="uppercase"
					color="var(--pressd-text-muted)"
					_hover={{ color: 'var(--pressd-accent)' }}
				>
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
										borderRadius="6px"
										border="1px solid var(--pressd-border)"
									/>
								</RouterLink>
							</Link>
							<Link asChild _hover={{ textDecoration: 'none' }}>
								<RouterLink to={song.href}>
									<Text
										mt="2"
										fontWeight="500"
										color="var(--pressd-text)"
										lineClamp={1}
									>
										{song.title}
									</Text>
								</RouterLink>
							</Link>
							<Link
								asChild
								color="var(--pressd-text-muted)"
								_hover={{ color: 'var(--pressd-text-sub)' }}
							>
								<RouterLink to={song.artist.href}>
									<Text fontSize="sm" lineClamp={1}>
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
									color="var(--pressd-green)"
									fontSize="sm"
									fontWeight="700"
								>
									<FaStar />
									<Text>{song.averageRating.toFixed(1)}</Text>
								</Flex>
								<Text color="var(--pressd-text-muted)" fontSize="sm">
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
