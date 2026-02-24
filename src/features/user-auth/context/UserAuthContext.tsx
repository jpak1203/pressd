import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from 'react';
import { supabase } from '@/lib/supabase/client';
import type { Session } from '@supabase/supabase-js';
import type { Inputs } from '@/features/user-auth/types/user-auth';

type UserAuthContextType = {
	session: Session | null;
	isLoading: boolean;
};

type UserAuthProviderType = {
	children: ReactNode;
};

const UserAuthContext = createContext<UserAuthContextType | null>(null);

export const UserAuthProvider = ({ children }: UserAuthProviderType) => {
	const [session, setSession] = useState<Session | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// get initial session
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
			setIsLoading(false);
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, session) => {
			if (event === 'SIGNED_OUT') {
				setSession(null);
			} else if (session) {
				setSession(session);
			}
		});

		return () => subscription.unsubscribe();
	}, []);

	return (
		<UserAuthContext.Provider value={{ session, isLoading }}>
			{children}
		</UserAuthContext.Provider>
	);
};

const signOut = async () => {
	const { error } = await supabase.auth.signOut();
	if (error) console.error('Error signing out:', error);
};

const signIn = async ({
	email,
	password,
}: Pick<Inputs, 'email' | 'password'>) => {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	if (error) throw error;
	return data;
};

const createAccount = async ({
	email,
	username,
	password,
}: Pick<Inputs, 'email' | 'username' | 'password'>) => {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				username,
			},
		},
	});
	if (error) throw error;
	return data;
};

export const useUserAuth = () => {
	const context = useContext(UserAuthContext);
	if (!context)
		throw new Error('useUserAuth must be used within a UserAuthProvider');

	return {
		isLoggedIn: !!context.session?.access_token,
		user: context.session?.user,
		isLoading: context.isLoading,
		signOut,
		createAccount,
		signIn,
	};
};
