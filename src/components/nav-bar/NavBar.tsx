import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
	Box,
	Button,
	Flex,
	Icon,
	IconButton,
	Input,
	Link as ChakraLink,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';
import { LuSearch } from 'react-icons/lu';
import { FaArrowCircleRight } from 'react-icons/fa';
import { TiDeleteOutline } from 'react-icons/ti';
import { useUserAuth } from '@/features/user-auth/context/UserAuthContext';
import PressdLogo from '@/components/pressd-logo/PressdLogo';

const NavBar = () => {
	const { signOut, isLoggedIn } = useUserAuth();
	const navigate = useNavigate();
	const [searchValue, setSearchValue] = useState('');
	const hasSearchText = searchValue.trim().length > 0;

	const handleSignOut = async () => {
		try {
			await signOut();
			navigate('/');
		} catch (error) {
			console.error('Error signing out:', error);
		}
	};

	const handleSearchSubmit = () => {
		const query = searchValue.trim();
		if (!query) return;
		navigate(`/songs?query=${encodeURIComponent(query)}`);
	};

	const handleClearSearch = () => {
		setSearchValue('');
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
				<PressdLogo size="small" />
				<Flex
					as="nav"
					alignItems="center"
					gap={{ base: '12px', md: '20px' }}
					flexWrap="wrap"
					justifyContent="flex-end"
				>
					<Flex position="relative" alignItems="center">
						<Box
							zIndex="2"
							position="absolute"
							left="4px"
							opacity={hasSearchText ? 1 : 0}
							pointerEvents={hasSearchText ? 'auto' : 'none'}
							transition="opacity 0.2s ease, transform 0.18s ease"
						>
							<IconButton
								aria-label="Search"
								size="2xs"
								variant="ghost"
								h="26px"
								w="26px"
								minW="26px"
								borderRadius="6px"
								bg="var(--pressd-surface)"
								color="var(--pressd-accent)"
								onClick={handleClearSearch}
								_hover={{
									color: 'var(--pressd-accent-dim)',
								}}
							>
								<TiDeleteOutline />
							</IconButton>
						</Box>
						<Icon
							zIndex="2"
							position="absolute"
							left="10px"
							color="var(--pressd-text-muted)"
							boxSize="14px"
							pointerEvents="none"
							opacity={hasSearchText ? 0 : 1}
							transition="opacity 0.2s ease, transform 0.18s ease"
						>
							<LuSearch />
						</Icon>
						<Input
							type="search"
							value={searchValue}
							onChange={(event) =>
								setSearchValue(event.target.value)
							}
							onKeyDown={(event) => {
								if (event.key === 'Enter') {
									event.preventDefault();
									handleSearchSubmit();
								}
							}}
							placeholder="search artists, albums..."
							bg="var(--pressd-surface-2)"
							border="1px solid var(--pressd-border)"
							borderRadius="8px"
							color="var(--pressd-text)"
							fontSize="13px"
							h="34px"
							ps="34px"
							pe="40px"
							w={{ base: '200px', md: '230px' }}
							_focusVisible={{
								borderColor: 'var(--pressd-accent)',
								boxShadow: '0 0 0 1px var(--pressd-accent)',
							}}
						/>
						<Box
							position="absolute"
							right="4px"
							opacity={hasSearchText ? 1 : 0}
							transform={
								hasSearchText
									? 'translateX(0)'
									: 'translateX(6px)'
							}
							pointerEvents={hasSearchText ? 'auto' : 'none'}
							transition="opacity 0.18s ease, transform 0.18s ease"
						>
							<IconButton
								aria-label="Search"
								size="2xs"
								variant="plain"
								h="26px"
								w="26px"
								minW="26px"
								borderRadius="6px"
								border="1px solid var(--pressd-border)"
								bg="var(--pressd-surface)"
								color="var(--pressd-accent)"
								onClick={handleSearchSubmit}
								_hover={{
									bg: 'var(--pressd-surface-2)',
									borderColor: 'var(--pressd-accent-dim)',
								}}
							>
								<FaArrowCircleRight />
							</IconButton>
						</Box>
					</Flex>
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
					{!isLoggedIn && (
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
					)}
					{isLoggedIn && (
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
					)}
				</Flex>
			</Flex>
		</Box>
	);
};

export default NavBar;
