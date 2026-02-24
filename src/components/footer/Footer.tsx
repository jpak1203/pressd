import { Flex, Link, Group, Input, Button, Field } from '@chakra-ui/react';
import RouterLink from '@/components/router-link/RouterLink';

const Footer = () => {
	return (
		<Flex
			direction="row"
			padding="32px"
			justifyContent="space-evenly"
			backgroundColor="black"
			height="30vh"
		>
			<Flex direction="column">
				<RouterLink variant={undefined} color="red" slug="/about">
					About
				</RouterLink>
				<RouterLink variant={undefined} color="red" slug="/features">
					Features
				</RouterLink>
				<RouterLink variant={undefined} color="red" slug="/privacy">
					Privacy Policy
				</RouterLink>
				<RouterLink variant={undefined} color="red" slug="/terms">
					Terms of Service
				</RouterLink>
			</Flex>

			<Flex direction="column">
				<Link colorPalette="red" href="https://twitter.com/pressd">
					Twitter
				</Link>
				<Link colorPalette="red" href="https://instagram.com/pressd">
					Instagram
				</Link>
				<Link colorPalette="red" href="mailto:hello@pressd.app">
					Contact
				</Link>
			</Flex>

			<Flex direction="column">
				<Field.Root>
					<Field.Label>Join our newsletter!</Field.Label>
					<Group attached w="full" maxW="sm">
						<Input
							variant="subtle"
							placeholder="Enter your email"
						/>
						<Button variant="solid">Submit</Button>
					</Group>
				</Field.Root>
			</Flex>
		</Flex>
	);
};

export default Footer;
