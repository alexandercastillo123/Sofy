'use client';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@auth/user';
import useAuth from '@/contexts/auth/useAuth';

type useUser = {
	data: User | null;
	isGuest: boolean;
	isReady: boolean;
	updateUser: (updates: Partial<User>) => Promise<User | undefined>;
	updateUserSettings: (newSettings: User['settings']) => Promise<User['settings'] | undefined>;
	signOut: () => Promise<void>;
};

/**
 * Fuse components consume the user through this hook.
 * It now reads from the mocked SOFI session instead of NextAuth.
 */
function useUser(): useUser {
	const { user, isGuest, isReady, signOut: clearSession, updateUser } = useAuth();
	const router = useRouter();

	const handleUpdateUser = useCallback(
		async (updates: Partial<User>) => {
			updateUser(updates);
			return { ...(user as User), ...updates };
		},
		[updateUser, user]
	);

	const handleUpdateUserSettings = useCallback(
		async (newSettings: User['settings']) => {
			if (!user) {
				return undefined;
			}

			const nextUser = { ...user, settings: newSettings };
			updateUser(nextUser);
			return newSettings;
		},
		[updateUser, user]
	);

	const handleSignOut = useCallback(async () => {
		clearSession();
		router.replace('/sign-in');
	}, [clearSession, router]);

	return useMemo(
		() => ({
			data: user,
			isGuest,
			isReady,
			signOut: handleSignOut,
			updateUser: handleUpdateUser,
			updateUserSettings: handleUpdateUserSettings
		}),
		[user, isGuest, isReady, handleSignOut, handleUpdateUser, handleUpdateUserSettings]
	);
}

export default useUser;
