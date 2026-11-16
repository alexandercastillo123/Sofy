'use client';

import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { User } from '@auth/user';
import { AuthContext, SignInResult } from './AuthContext';
import { HORUS_DEMO_CREDENTIALS, HORUS_DEMO_USER } from './mockUser';

const SESSION_STORAGE_KEY = 'horus.session';

function readStoredUser(): User | null {
	try {
		const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
		return raw ? (JSON.parse(raw) as User) : null;
	} catch {
		return null;
	}
}

function persistUser(user: User | null) {
	try {
		if (user) {
			window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
		} else {
			window.localStorage.removeItem(SESSION_STORAGE_KEY);
		}
	} catch {
		// Storage can be unavailable in private mode; the in-memory session still works.
	}
}

/**
 * Minimal mocked session provider.
 * Swap the body of `signIn` for a real API call once the backend exists.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		setUser(readStoredUser());
		setIsReady(true);
	}, []);

	const signIn = useCallback(async (email: string, password: string): Promise<SignInResult> => {
		// Simulate network latency so loading states are exercised.
		await new Promise((resolve) => setTimeout(resolve, 600));

		const emailMatches = email.trim().toLowerCase() === HORUS_DEMO_CREDENTIALS.email;
		const passwordMatches = password === HORUS_DEMO_CREDENTIALS.password;

		if (!emailMatches || !passwordMatches) {
			return {
				ok: false,
				error: 'Credenciales inválidas. Usa las credenciales de demostración que aparecen abajo.'
			};
		}

		const sessionUser = { ...HORUS_DEMO_USER, email };
		persistUser(sessionUser);
		setUser(sessionUser);

		return { ok: true };
	}, []);

	const signOut = useCallback(() => {
		persistUser(null);
		setUser(null);
	}, []);

	const updateUser = useCallback((updates: Partial<User>) => {
		setUser((current) => {
			if (!current) {
				return current;
			}

			const next = { ...current, ...updates };
			persistUser(next);
			return next;
		});
	}, []);

	const value = useMemo(
		() => ({
			user,
			isGuest: !user,
			isReady,
			signIn,
			signOut,
			updateUser
		}),
		[user, isReady, signIn, signOut, updateUser]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
