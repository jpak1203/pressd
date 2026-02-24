import { Provider } from '@/app/provider.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { UserAuthProvider } from '@/features/user-auth/context/UserAuthContext';
import './index.less';
import App from './app/App.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Provider>
				<UserAuthProvider>
					<App />
				</UserAuthProvider>
			</Provider>
		</BrowserRouter>
	</StrictMode>,
);
