import { User } from '@auth/user';

/**
 * Demo credentials for the mocked sign-in flow.
 * There is no backend yet, so authentication is resolved locally.
 */
export const HORUS_DEMO_CREDENTIALS = {
	email: 'admin@horus.pe',
	password: 'horus2026'
} as const;

export const HORUS_DEMO_USER: User = {
	id: 'usr-horus-001',
	role: ['admin'],
	displayName: 'Ing. Alexander Ríos',
	email: HORUS_DEMO_CREDENTIALS.email,
	shortcuts: ['dashboard', 'rumbo-de-veta', 'resultados-3d', 'punto-de-direccion']
};
