import { Provider } from '@/app/provider.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { UserAuthProvider } from '@/features/user-auth/context/UserAuthContext'
import { ErrorBoundary } from '@/components/error-boundary/ErrorBoundary'
import { CatastrophicFallback } from '@/components/error-boundary/CatastrophicFallback'
import { Toaster } from '@/components/toaster'
import { supabase } from '@/lib/supabase/client'
import type { Session } from '@supabase/supabase-js'
import { App } from '@/app/App.tsx'
import './index.less'

type SessionBootstrapWindow = Window & {
    __PRESSD_INITIAL_SESSION__?: Session | null
}

const getInitialSessionFromWindow = () => {
    const bootstrapWindow = window as SessionBootstrapWindow
    const isServerSessionInjected =
        '__PRESSD_INITIAL_SESSION__' in bootstrapWindow

    return {
        initialSession: bootstrapWindow.__PRESSD_INITIAL_SESSION__ ?? null,
        initialSessionResolved: isServerSessionInjected,
    }
}

const renderApp = (
    initialSession: Session | null,
    initialSessionResolved: boolean
) => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <BrowserRouter>
                <Provider>
                    <ErrorBoundary fallback={<CatastrophicFallback />}>
                        <UserAuthProvider
                            initialSession={initialSession}
                            initialSessionResolved={initialSessionResolved}
                        >
                            <App />
                        </UserAuthProvider>
                    </ErrorBoundary>
                    <Toaster />
                </Provider>
            </BrowserRouter>
        </StrictMode>
    )
}

const startApp = async () => {
    const { initialSession, initialSessionResolved } =
        getInitialSessionFromWindow()

    if (initialSessionResolved) {
        renderApp(initialSession, true)
        return
    }

    try {
        const { data } = await supabase.auth.getSession()
        renderApp(data.session, true)
    } catch (error) {
        console.error('Failed to fetch session:', error)
        renderApp(null, false)
    }
}

void startApp()
