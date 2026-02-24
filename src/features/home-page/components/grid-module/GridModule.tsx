import {
	Avatar,
	Box,
	Flex,
	Grid,
	Heading,
	Image,
	Link,
	Text,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';
import { FaHeart, FaStar } from 'react-icons/fa';
import type { GridModuleData } from '@/features/home-page/types/home-page';

type GridModuleProps = {
	data: GridModuleData;
	linkText: string;
	headerText: string;
};

const GridModule = ({ data, linkText, headerText }: GridModuleProps) => {
	return (
		<Box as="section" w="100%">
			<Flex
				alignItems="center"
				justifyContent="space-between"
				borderBottom="1px solid"
				pb="2"
				mb="5"
			>
				<Heading size="md" textTransform="uppercase">
					{headerText}
				</Heading>
				<Link asChild fontSize="xs" textTransform="uppercase">
					<RouterLink to={data.moreHref}>{linkText}</RouterLink>
				</Link>
			</Flex>

			<Grid
				templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
				gap="6"
			>
				{data.items.map((review) => (
					<Box
						key={review.id}
						bg="whiteAlpha.50"
						border="1px solid"
						borderColor="whiteAlpha.200"
						borderRadius="md"
						p="4"
					>
						<Flex gap="4" mb="4" alignItems="stretch">
							<Box minW="84px" maxW="84px" flexShrink={0}>
								<Link asChild display="block">
									<RouterLink to={review.song.href}>
										<Image
											src={review.song.artworkUrl}
											alt={`${review.song.title} artwork`}
											aspectRatio={1}
											w="100%"
											objectFit="cover"
											borderRadius="md"
										/>
									</RouterLink>
								</Link>
							</Box>

							<Flex
								flex="1"
								direction="column"
								justifyContent="space-between"
								h="84px"
								minW={0}
							>
								<Flex alignItems="center" gap="2" mb="1">
									<Link asChild>
										<RouterLink to={review.reviewer.href}>
											<Flex alignItems="center" gap="2">
												<Avatar.Root size="xs">
													<Avatar.Image
														src={
															review.reviewer
																.avatarUrl
														}
													/>
													<Avatar.Fallback
														name={
															review.reviewer.name
														}
													/>
												</Avatar.Root>
												<Text
													textStyle="xs"
													color="whiteAlpha.900"
													fontWeight="700"
												>
													{review.reviewer.name}
												</Text>
											</Flex>
										</RouterLink>
									</Link>
								</Flex>

								<Link asChild display="block">
									<RouterLink to={review.song.href}>
										<Heading
											lineHeight="1.1"
											color="whiteAlpha.900"
											lineClamp={1}
										>
											{review.song.title}{' '}
											<Text
												as="span"
												color="whiteAlpha.700"
												fontWeight="400"
											>
												{review.song.releaseYear}
											</Text>
										</Heading>
									</RouterLink>
								</Link>
								<Link asChild display="block">
									<RouterLink to={review.song.artist.href}>
										<Text
											color="whiteAlpha.700"
											mb="1"
											lineClamp={1}
										>
											{review.song.artist.name}
										</Text>
									</RouterLink>
								</Link>
							</Flex>
							<Flex alignItems="center" gap="1" color="green.400">
								<FaStar />
								<Text>{review.userRating.toFixed(1)}</Text>
							</Flex>
						</Flex>

						<Text
							color="whiteAlpha.800"
							fontSize="lg"
							lineHeight="1.8"
							mb="4"
						>
							{review.reviewText}
						</Text>

						<Flex
							alignItems="center"
							justifyContent="space-between"
						>
							<Link
								color="whiteAlpha.800"
								px="0"
								_hover={{ color: 'whiteAlpha.900' }}
							>
								<FaHeart />{' '}
								<Text textStyle="xs"> Like review</Text>
							</Link>
							<Text color="whiteAlpha.700" fontSize="sm">
								{review.reviewLikes} likes
							</Text>
						</Flex>
					</Box>
				))}
			</Grid>
		</Box>
	);
};

export default GridModule;
