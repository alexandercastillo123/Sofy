import { User } from '@auth/user';

/**
 * Demo credentials for the mocked sign-in flow.
 * There is no backend yet, so authentication is resolved locally.
 */
export const SOFI_DEMO_CREDENTIALS = {
	email: 'admin@sofi.pe',
	password: 'sofi2026'
} as const;

export const SOFI_DEMO_USER: User = {
	id: 'usr-sofi-001',
	role: ['admin'],
	displayName: 'Ing. Alexander Ríos',
	email: SOFI_DEMO_CREDENTIALS.email,
	shortcuts: [
		'dashboard',
		'proyectos',
		'rumbo-de-veta',
		'resultados-3d',
		'historial',
		'punto-de-direccion',
		'perfil',
		'suscripciones'
	]
};
