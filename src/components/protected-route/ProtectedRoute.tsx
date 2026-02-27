import { Navigate } from 'react-router-dom';
import { useUserAuth } from '@/features/user-auth/context/UserAuthContext';
import { Spinner, Center } from '@chakra-ui/react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { user, isLoading } = useUserAuth();

	if (isLoading) {
		return (
			<Center h="100vh">
				<Spinner size="xl" />
			</Center>
		);
	}

	if (!user) {
		return <Navigate to="/signin" replace />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
