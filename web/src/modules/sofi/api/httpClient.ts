const API_BASE_URL = process.env.NEXT_PUBLIC_SOFI_API_URL ?? '';
const ACCESS_TOKEN_KEY = 'sofi.accessToken';

export class ApiError extends Error {
	readonly status: number;
	readonly payload: unknown;

	constructor(status: number, message: string, payload?: unknown) {
		super(message);
		this.name = 'ApiError';
		this.status = status;
		this.payload = payload;
	}
}

export function isApiConfigured(): boolean {
	return API_BASE_URL.length > 0;
}

function getAccessToken(): string | null {
	if (typeof window === 'undefined') {
		return null;
	}

	try {
		return window.localStorage.getItem(ACCESS_TOKEN_KEY);
	} catch {
		return null;
	}
}

/**
 * Thin HTTP transport for the future backend. Feature API modules should call
 * this function instead of using fetch directly, so auth and errors stay
 * consistent across the app.
 */
export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
	if (!API_BASE_URL) {
		throw new ApiError(0, 'NEXT_PUBLIC_SOFI_API_URL no está configurada todavía.');
	}

	const headers = new Headers(init.headers);
	const token = getAccessToken();

	headers.set('Accept', 'application/json');

	if (init.body && !headers.has('Content-Type')) {
		headers.set('Content-Type', 'application/json');
	}

	if (token) {
		headers.set('Authorization', `Bearer ${token}`);
	}

	const response = await fetch(`${API_BASE_URL.replace(/\/$/, '')}${path}`, {
		...init,
		headers
	});

	const contentType = response.headers.get('content-type') ?? '';
	const payload = contentType.includes('application/json') ? await response.json() : await response.text();

	if (!response.ok) {
		throw new ApiError(response.status, `La API respondió con ${response.status}.`, payload);
	}

	return payload as T;
}
