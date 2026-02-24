import { Routes, Route } from 'react-router-dom';
import LandingPage from '@/app/routes/LandingPage';
import CreateAccountPage from '@/app/routes/CreateAccountPage';
import SignInPage from '@/app/routes/SignInPage';
import LayoutWrapper from '@/components/layout-wrapper/LayoutWrapper';

function App() {
	return (
		<LayoutWrapper>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/signup" element={<CreateAccountPage />} />
				<Route path="/signin" element={<SignInPage />} />
			</Routes>
		</LayoutWrapper>
	);
}

export default App;
