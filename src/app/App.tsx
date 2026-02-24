import { Routes, Route } from 'react-router-dom';
import LandingPage from '@/app/routes/LandingPage';
import CreateAccountPage from '@/app/routes/CreateAccountPage';
import SignInPage from '@/app/routes/SignInPage';
import HomePage from '@/app/routes/HomePage';
import LayoutWrapper from '@/components/layout-wrapper/LayoutWrapper';
import { useUserAuth } from '@/features/user-auth/context/UserAuthContext';

function App() {
	const { isLoggedIn, isLoading } = useUserAuth();

	return (
		<LayoutWrapper>
			<Routes>
				<Route
					path="/"
					element={
						isLoading ? null : isLoggedIn ? (
							<HomePage />
						) : (
							<LandingPage />
						)
					}
				/>
				<Route path="/landing" element={<LandingPage />} />
				<Route path="/signup" element={<CreateAccountPage />} />
				<Route path="/signin" element={<SignInPage />} />
			</Routes>
		</LayoutWrapper>
	);
}

export default App;
