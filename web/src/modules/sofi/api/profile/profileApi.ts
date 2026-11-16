import { AccountProfile } from '../../domain/account';
import { MOCK_PROFILE, PROFILE_STORAGE_KEY } from '../../data/mockProfile';
import { mockDelay } from '../mockDelay';

function readStoredProfile(): AccountProfile {
	if (typeof window === 'undefined') {
		return MOCK_PROFILE;
	}

	try {
		const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
		return raw ? { ...MOCK_PROFILE, ...(JSON.parse(raw) as Partial<AccountProfile>) } : MOCK_PROFILE;
	} catch {
		return MOCK_PROFILE;
	}
}

function persistProfile(profile: AccountProfile): void {
	try {
		window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
	} catch {
		// Private mode: the in-memory mock still works during the session.
	}
}

export async function fetchProfile(): Promise<AccountProfile> {
	return mockDelay(readStoredProfile());
}

export async function updateProfile(updates: Partial<AccountProfile>): Promise<AccountProfile> {
	const next = { ...readStoredProfile(), ...updates };
	persistProfile(next);

	return mockDelay(next);
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<{ ok: boolean }> {
	if (!currentPassword || newPassword.length < 8) {
		return mockDelay({ ok: false });
	}

	return mockDelay({ ok: true });
}
