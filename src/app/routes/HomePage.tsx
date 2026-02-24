import { Box, Container, Flex } from '@chakra-ui/react';
import RowModule from '@/features/home-page/components/row-module/RowModule';
import GridModule from '@/features/home-page/components/grid-module/GridModule';
import {
	featuredReviewsData,
	featuredSongsData,
	newFromFriendsData,
	newSongsData,
	popularWithFriendsData,
} from '@/features/home-page/data/homePageData';

const HomePage = () => {
	return (
		<Box minH="100%" py={{ base: '8', md: '12' }}>
			<Container maxW="7xl" px={{ base: '4', md: '8' }}>
				<Flex direction="column" gap={{ base: '10', md: '12' }}>
					<RowModule
						headerText="Featured Songs"
						linkText="More"
						data={featuredSongsData}
					/>
					<RowModule
						headerText="New From Friends"
						linkText="More"
						data={newFromFriendsData}
					/>
					<RowModule
						headerText="Popular With Friends"
						linkText="More"
						data={popularWithFriendsData}
					/>
					<RowModule
						headerText="New Songs"
						linkText="More"
						data={newSongsData}
					/>
					<GridModule
						headerText="Featured Reviews"
						linkText="More"
						data={featuredReviewsData}
					/>
				</Flex>
			</Container>
		</Box>
	);
};

export default HomePage;
