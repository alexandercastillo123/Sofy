export const MOCK_NETWORK_DELAY = 450;

export function mockDelay<T>(value: T, ms = MOCK_NETWORK_DELAY): Promise<T> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(value), ms);
	});
}
