import { Flex, Link, Text, IconButton } from '@chakra-ui/react';
import { FaXTwitter } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import RouterLink from '@/components/router-link/RouterLink';

const Footer = () => {
	return (
		<Flex
			direction="row"
			padding="32px"
			justifyContent="space-evenly"
			alignItems="center"
			backgroundColor="black"
		>
			<Text textStyle="xs">
				&copy; pressd. made by a music fan. music data from Spotify API.
			</Text>
			<Flex direction="row" gap="8px">
				<RouterLink variant={undefined} color="red" slug="/about">
					<Text textStyle="xs">About</Text>
				</RouterLink>
				<RouterLink variant={undefined} color="red" slug="/features">
					<Text textStyle="xs">Features</Text>
				</RouterLink>
				<RouterLink variant={undefined} color="red" slug="/privacy">
					<Text textStyle="xs">Privacy Policy</Text>
				</RouterLink>
				<RouterLink variant={undefined} color="red" slug="/terms">
					<Text textStyle="xs">Terms of Service</Text>
				</RouterLink>
			</Flex>

			<Flex direction="row" gap="8px">
				<Link href="https://twitter.com/pressd">
					<IconButton size="2xs" colorPalette="red" variant="ghost">
						<FaXTwitter />
					</IconButton>
				</Link>
				<Link href="https://instagram.com/pressd">
					<IconButton size="2xs" colorPalette="red" variant="ghost">
						<FaInstagram />
					</IconButton>
				</Link>
				<Link href="mailto:hello@pressd.app">
					<IconButton size="2xs" colorPalette="red" variant="ghost">
						<MdOutlineEmail />
					</IconButton>
				</Link>
			</Flex>
		</Flex>
	);
};

export default Footer;
