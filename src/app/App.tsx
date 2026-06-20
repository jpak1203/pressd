import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import { Center, Spinner } from '@chakra-ui/react'
import ProtectedRoute from '@/components/protected-route/ProtectedRoute'
import LayoutWrapper from '@/components/layout-wrapper/LayoutWrapper'
import { ErrorBoundary } from '@/components/error-boundary/ErrorBoundary'
import { RouteError } from '@/components/error-boundary/RouteError'
import { useUserAuth } from '@/features/user-auth/context/UserAuthContext'

const LandingPage = lazy(() => import('@/app/routes/LandingPage'))
const CreateAccountPage = lazy(() => import('@/app/routes/CreateAccountPage'))
const SignInPage = lazy(() => import('@/app/routes/SignInPage'))
const HomePage = lazy(() => import('@/app/routes/HomePage'))
const SearchResultsPage = lazy(() => import('@/app/routes/SearchResultsPage'))
const ProfilePage = lazy(() => import('@/app/routes/ProfilePage'))
const TrackDetailPage = lazy(() =>
    import('@/app/routes/TrackDetailPage').then((m) => ({ default: m.TrackDetailPage }))
)
const AlbumDetailPage = lazy(() =>
    import('@/app/routes/AlbumDetailPage').then((m) => ({ default: m.AlbumDetailPage }))
)
const ArtistDetailPage = lazy(() =>
    import('@/app/routes/ArtistDetailPage').then((m) => ({ default: m.ArtistDetailPage }))
)
const RatingsPage = lazy(() =>
    import('@/app/routes/RatingsPage').then((m) => ({ default: m.RatingsPage }))
)
const MembersPage = lazy(() =>
    import('@/app/routes/MembersPage').then((m) => ({ default: m.MembersPage }))
)
const MemberSearchPage = lazy(() =>
    import('@/app/routes/MemberSearchPage').then((m) => ({ default: m.MemberSearchPage }))
)
const ItemBrowsePage = lazy(() =>
    import('@/features/items/pages/ItemBrowsePage').then((m) => ({ default: m.ItemBrowsePage }))
)
const ItemSearchPage = lazy(() =>
    import('@/features/items/pages/ItemSearchPage').then((m) => ({ default: m.ItemSearchPage }))
)
const PlaylistsPage = lazy(() =>
    import('@/app/routes/PlaylistsPage').then((m) => ({ default: m.PlaylistsPage }))
)
const PlaylistsSearchPage = lazy(() =>
    import('@/app/routes/PlaylistsSearchPage').then((m) => ({ default: m.PlaylistsSearchPage }))
)

const RouteFallback = () => (
    <Center minH="60vh">
        <Spinner size="md" color="var(--pressd-accent)" />
    </Center>
)

function App() {
    const { isGuestUser, isLoggedIn, isLoading } = useUserAuth()
    const shouldShowHomepage = !isGuestUser && isLoggedIn
    const location = useLocation()

    return (
        <LayoutWrapper>
            <ErrorBoundary key={location.pathname}>
            <Suspense fallback={<RouteFallback />}>
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
                <Route path="/members" element={<MembersPage />} errorElement={<RouteError />} />
                <Route path="/members/search" element={<MemberSearchPage />} errorElement={<RouteError />} />
                <Route path="/tracks" element={<ItemBrowsePage kind="track" />} errorElement={<RouteError />} />
                <Route path="/tracks/search" element={<ItemSearchPage kind="track" />} errorElement={<RouteError />} />
                <Route path="/albums" element={<ItemBrowsePage kind="album" />} errorElement={<RouteError />} />
                <Route path="/albums/search" element={<ItemSearchPage kind="album" />} errorElement={<RouteError />} />
                <Route path="/playlists" element={<PlaylistsPage />} errorElement={<RouteError />} />
                <Route path="/playlists/search" element={<PlaylistsSearchPage />} errorElement={<RouteError />} />
                <Route path="*" element={<RouteError />} />
            </Routes>
            </Suspense>
            </ErrorBoundary>
        </LayoutWrapper>
    )
}

export default App
