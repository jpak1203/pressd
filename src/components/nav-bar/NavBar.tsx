import { useNavigate } from 'react-router';
import { Flex, Button, Heading } from '@chakra-ui/react';
import { Link } from 'react-router';
import RouterLink from '@/components/router-link/RouterLink';
import { useUserAuth } from '@/features/user-auth/context/UserAuthContext';
import logo from '@/assets/logo.svg';

const NavBar = () => {
	const { signOut, isLoggedIn } = useUserAuth();
	const navigate = useNavigate();

	const handleSignOut = async () => {
		try {
			await signOut();
			navigate('/');
		} catch (error) {
			console.error('Error signing out:', error);
		}
	};

	return (
		<Flex
			top="0"
			width="100%"
			px="2rem"
			py="1.5rem"
			direction="row"
			alignItems="center"
			justifyContent="space-around"
		>
			<Button variant="plain" className="logo" asChild>
				<Link to="/">
					<img src={logo} alt="logo" />
					<Heading
						letterSpacing="-0.05rem"
						fontWeight="600"
						size="3xl"
					>
						pressd
					</Heading>
				</Link>
			</Button>
			<nav>
				<Flex direction="row" gap="1.25rem">
					<RouterLink variant="plain" color="red" slug="/songs">
						SONGS
					</RouterLink>
					<RouterLink variant="plain" color="red" slug="/albums">
						ALBUMS
					</RouterLink>
					<RouterLink variant="plain" color="red" slug="/playlists">
						PLAYLISTS
					</RouterLink>
					<RouterLink variant="plain" color="red" slug="/users">
						USERS
					</RouterLink>
					{!isLoggedIn && (
						<>
							{' '}
							<RouterLink
								variant="plain"
								color="red"
								slug="/signin"
							>
								SIGN IN
							</RouterLink>
							<RouterLink
								variant="plain"
								color="red"
								slug="/signup"
							>
								CREATE ACCOUNT
							</RouterLink>
						</>
					)}
					{isLoggedIn && (
						<Button
							size="sm"
							colorPalette="red"
							onClick={handleSignOut}
						>
							SIGN OUT
						</Button>
					)}
				</Flex>
			</nav>
		</Flex>
	);
};

export default NavBar;
