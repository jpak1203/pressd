import { Routes, Route } from 'react-router'
import ProtectedRoute from '@/components/protected-route/ProtectedRoute'
import LandingPage from '@/app/routes/LandingPage'
import CreateAccountPage from '@/app/routes/CreateAccountPage'
import SignInPage from '@/app/routes/SignInPage'
import HomePage from '@/app/routes/HomePage'
import SearchResultsPage from '@/app/routes/SearchResultsPage'
import { TrackDetailPage } from '@/app/routes/TrackDetailPage'
import { AlbumDetailPage } from '@/app/routes/AlbumDetailPage'
import { ArtistDetailPage } from '@/app/routes/ArtistDetailPage'
import ProfilePage from '@/app/routes/ProfilePage'
import { RatingsPage } from '@/app/routes/RatingsPage'
import LayoutWrapper from '@/components/layout-wrapper/LayoutWrapper'
import { ErrorBoundary } from '@/components/error-boundary/ErrorBoundary'
import { RouteError } from '@/components/error-boundary/RouteError'
import { useUserAuth } from '@/features/user-auth/context/UserAuthContext'

function App() {
    const { isGuestUser, isLoggedIn, isLoading } = useUserAuth()
    const shouldShowHomepage = !isGuestUser && isLoggedIn

    return (
        <LayoutWrapper>
            <ErrorBoundary>
            <Routes>
                <Route
                    path="/"
                    errorElement={<RouteError />}
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
                <Route path="/signup" element={<CreateAccountPage />} errorElement={<RouteError />} />
                <Route path="/signin" element={<SignInPage />} errorElement={<RouteError />} />
                <Route path="/search" element={<SearchResultsPage />} errorElement={<RouteError />} />
                <Route path="/track/:id" element={<TrackDetailPage />} errorElement={<RouteError />} />
                <Route path="/album/:id" element={<AlbumDetailPage />} errorElement={<RouteError />} />
                <Route path="/artist/:id" element={<ArtistDetailPage />} errorElement={<RouteError />} />
                <Route path="/profile/:username" element={<ProfilePage />} errorElement={<RouteError />} />
                <Route path="/profile/:username/ratings" element={<RatingsPage />} errorElement={<RouteError />} />
                <Route path="*" element={<RouteError />} />
            </Routes>
            </ErrorBoundary>
        </LayoutWrapper>
    )
}

export default App
