import { AccountProfile } from '../domain/account';

export const PROFILE_STORAGE_KEY = 'sofi.profile';

export const MOCK_PROFILE: AccountProfile = {
	id: 'usr-sofi-001',
	firstName: 'Alexander',
	lastName: 'Ríos',
	displayName: 'Ing. Alexander Ríos',
	email: 'admin@sofi.pe',
	phone: '+51 987 654 321',
	company: 'Sofi Mining S.A.C.',
	role: 'Ingeniero de minas',
	location: 'Apurímac, Perú',
	timezone: 'America/Lima',
	memberSince: '2026-01-15',
	planId: 'trial'
};
