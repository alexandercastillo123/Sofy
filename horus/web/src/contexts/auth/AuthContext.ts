'use client';

import { createContext } from 'react';
import { User } from '@auth/user';

export type SignInResult = {
	ok: boolean;
	error?: string;
};

export type AuthContextType = {
	user: User | null;
	isGuest: boolean;
	isReady: boolean;
	signIn: (email: string, password: string) => Promise<SignInResult>;
	signOut: () => void;
	updateUser: (updates: Partial<User>) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
