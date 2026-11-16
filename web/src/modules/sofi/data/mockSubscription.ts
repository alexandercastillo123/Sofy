import { PaymentMethod, Subscription } from '../domain/account';

export const SUBSCRIPTION_STORAGE_KEY = 'sofi.subscription';

const DAY_MS = 24 * 60 * 60 * 1000;

export function createTrialSubscription(now = new Date()): Subscription {
	const startedAt = new Date(now.getTime() - 7 * DAY_MS);
	const endsAt = new Date(startedAt.getTime() + 14 * DAY_MS);

	return {
		id: 'sub-sofi-trial',
		planId: 'trial',
		status: 'trialing',
		startedAt: startedAt.toISOString(),
		endsAt: endsAt.toISOString(),
		autoRenew: false,
		paymentMethod: {
			id: 'pm-culqi-demo',
			gateway: 'culqi',
			label: 'Culqi · tarjeta',
			status: 'pending'
		}
	};
}

export const MOCK_PAYMENT_METHOD: PaymentMethod = {
	id: 'pm-culqi-demo',
	gateway: 'culqi',
	label: 'Culqi · tarjeta',
	status: 'pending'
};
