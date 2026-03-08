import { Routes, Route } from 'react-router';
import ProtectedRoute from '@/components/protected-route/ProtectedRoute';
import LandingPage from '@/app/routes/LandingPage';
import CreateAccountPage from '@/app/routes/CreateAccountPage';
import SignInPage from '@/app/routes/SignInPage';
import HomePage from '@/app/routes/HomePage';
import SearchResultsPage from '@/app/routes/SearchResultsPage';
import DetailPage from '@/app/routes/DetailPage';
import LayoutWrapper from '@/components/layout-wrapper/LayoutWrapper';
import { useUserAuth } from '@/features/user-auth/context/UserAuthContext';

function App() {
	const { isGuestUser, isLoggedIn, isLoading } = useUserAuth();
	const shouldShowHomepage = !isGuestUser && isLoggedIn;

	return (
		<LayoutWrapper>
			<Routes>
				<Route
					path="/"
					element={
						isLoading ? null : shouldShowHomepage ? (
							<ProtectedRoute>
								<HomePage />
							</ProtectedRoute>
						) : (
							<LandingPage />
						)
					}
				/>
				<Route path="/signup" element={<CreateAccountPage />} />
				<Route path="/signin" element={<SignInPage />} />
				<Route path="/search" element={<SearchResultsPage />} />
				<Route
					path="/track/:id"
					element={<DetailPage type="track" />}
				/>
				<Route
					path="/album/:id"
					element={<DetailPage type="album" />}
				/>
				<Route
					path="/artist/:id"
					element={<DetailPage type="artist" />}
				/>
			</Routes>
		</LayoutWrapper>
	);
}

export default App;
