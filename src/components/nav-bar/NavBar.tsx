import { useNavigate } from 'react-router';
import { Box, Button, Flex, Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';
import { useUserAuth } from '@/features/user-auth/context/UserAuthContext';
import PressdLogo from '@/components/pressd-logo/PressdLogo';
import SearchBar from '../search-bar/SearchBar';

const NavBar = () => {
	const { signOut, isGuestUser, user } = useUserAuth();
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
		<Box
			position="sticky"
			top="0"
			zIndex="20"
			backdropFilter="blur(14px)"
			backgroundColor="color-mix(in srgb, var(--pressd-bg) 82%, transparent)"
			borderBottom="1px solid var(--pressd-border)"
		>
			<Flex
				maxW="1200px"
				mx="auto"
				px={{ base: '16px', md: '28px' }}
				py="16px"
				alignItems="center"
				justifyContent="space-between"
				gap="20px"
			>
				<PressdLogo size="medium" />
				<Flex
					as="nav"
					alignItems="center"
					gap={{ base: '12px', md: '20px' }}
					flexWrap="wrap"
					justifyContent="flex-end"
				>
					<SearchBar />
					{['songs', 'albums', 'playlists', 'users'].map((item) => (
						<ChakraLink
							key={item}
							asChild
							color="var(--pressd-text-muted)"
							fontSize="11px"
							className="pressd-mono"
							_hover={{ color: 'var(--pressd-text)' }}
							transition="color 0.15s ease"
						>
							<RouterLink to={`/${item}`}>{item}</RouterLink>
						</ChakraLink>
					))}
					{isGuestUser ? (
						<>
							<ChakraLink
								asChild
								fontSize="11px"
								color="var(--pressd-text-muted)"
								className="pressd-mono"
								_hover={{ color: 'var(--pressd-text)' }}
							>
								<RouterLink to="/signin">sign in</RouterLink>
							</ChakraLink>
							<Button
								asChild
								size="sm"
								bg="var(--pressd-accent)"
								color="var(--pressd-bg)"
								borderRadius="999px"
								fontSize="13px"
								fontWeight="600"
								px="18px"
								_hover={{
									bg: 'var(--pressd-accent-dim)',
									color: 'var(--pressd-text)',
								}}
							>
								<RouterLink to="/signup">
									Create account
								</RouterLink>
							</Button>
						</>
					) : (
						<>
							<ChakraLink
								asChild
								fontSize="11px"
								color="var(--pressd-text-muted)"
								className="pressd-mono"
								_hover={{ color: 'var(--pressd-text)' }}
								transition="color 0.15s ease"
							>
								<RouterLink to={`/profile/${user?.id}`}>
									profile
								</RouterLink>
							</ChakraLink>
							<Button
								size="sm"
								onClick={handleSignOut}
								border="1px solid var(--pressd-border)"
								backgroundColor="var(--pressd-surface-2)"
								color="var(--pressd-text-sub)"
								borderRadius="999px"
								fontSize="12px"
								className="pressd-mono"
								px="14px"
								_hover={{
									color: 'var(--pressd-text)',
									borderColor: 'var(--pressd-accent-dim)',
								}}
							>
								sign out
							</Button>
						</>
					)}
				</Flex>
			</Flex>
		</Box>
	);
};

export default NavBar;
