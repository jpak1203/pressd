import { Box, Container, Flex } from '@chakra-ui/react'
import RowModule from '@/features/home-page/components/row-module/RowModule'
import GridModule from '@/features/home-page/components/grid-module/GridModule'
import {
    featuredReviewsData,
    featuredSongsData,
    featuredArtistsData,
    featuredAlbumsData,
    newFromFriendsData,
    newSongsData,
    popularWithFriendsData,
} from '@/features/home-page/data/homePageData'

const HomePage = () => {
    return (
        <Box minH="100%" py={{ base: '5', md: '7' }}>
            <Container maxW="1200px" px={{ base: '4', md: '7' }}>
                <Flex direction="column" gap={{ base: '10', md: '12' }}>
                    <RowModule
                        headerText="Featured Songs"
                        linkText="More"
                        data={featuredSongsData}
                    />
                    <RowModule
                        headerText="Featured Artists"
                        linkText="More"
                        data={featuredArtistsData}
                    />
                    <RowModule
                        headerText="Featured Albums"
                        linkText="More"
                        data={featuredAlbumsData}
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
    )
}

export default HomePage
