import { Navigate } from 'react-router-dom';
import { useUserAuth } from '@/features/user-auth/context/UserAuthContext';
import { Spinner, Center } from '@chakra-ui/react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const { user, isLoading } = useUserAuth();

	if (isLoading) {
		return (
			<Center h="100vh">
				<Spinner size="xl" />
			</Center>
		);
	}

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return <>{children}</>;
}
