import {
	Subscription,
	SubscriptionOverview,
	SubscriptionPlan,
	SubscriptionPlanId
} from '../../domain/account';
import { buildSubscriptionOverview } from '../../lib/billing';
import { getPlan, SUBSCRIPTION_PLANS } from '../../data/plans';
import {
	createTrialSubscription,
	SUBSCRIPTION_STORAGE_KEY
} from '../../data/mockSubscription';
import { mockDelay } from '../mockDelay';

const DAY_MS = 24 * 60 * 60 * 1000;

function readStoredSubscription(): Subscription {
	if (typeof window === 'undefined') {
		return createTrialSubscription();
	}

	try {
		const raw = window.localStorage.getItem(SUBSCRIPTION_STORAGE_KEY);

		if (!raw) {
			const trial = createTrialSubscription();
			window.localStorage.setItem(SUBSCRIPTION_STORAGE_KEY, JSON.stringify(trial));
			return trial;
		}

		return JSON.parse(raw) as Subscription;
	} catch {
		return createTrialSubscription();
	}
}

function persistSubscription(subscription: Subscription): void {
	try {
		window.localStorage.setItem(SUBSCRIPTION_STORAGE_KEY, JSON.stringify(subscription));
	} catch {
		// The demo still updates in memory through the query cache.
	}
}

function overview(subscription: Subscription): SubscriptionOverview {
	return buildSubscriptionOverview(subscription);
}

export async function fetchSubscription(): Promise<SubscriptionOverview> {
	return mockDelay(overview(readStoredSubscription()));
}

export async function fetchPlans(): Promise<SubscriptionPlan[]> {
	return mockDelay(SUBSCRIPTION_PLANS);
}

export async function changeSubscriptionPlan(planId: SubscriptionPlanId): Promise<SubscriptionOverview> {
	const current = readStoredSubscription();
	const plan = getPlan(planId);
	const now = new Date();
	const next: Subscription = {
		...current,
		planId,
		status: planId === 'trial' ? 'trialing' : 'active',
		startedAt: now.toISOString(),
		endsAt: new Date(now.getTime() + plan.durationDays * DAY_MS).toISOString(),
		autoRenew: planId !== 'trial'
	};

	persistSubscription(next);
	return mockDelay(overview(next));
}

/**
 * Culqi is the selected gateway, but the checkout is not connected yet.
 * This mock marks the gateway as ready so the UI can show the complete flow.
 */
export async function configureCulqiPaymentMethod(): Promise<SubscriptionOverview> {
	const current = readStoredSubscription();
	const next: Subscription = {
		...current,
		paymentMethod: {
			...current.paymentMethod,
			id: 'pm-culqi-demo',
			gateway: 'culqi',
			label: 'Culqi · tarjeta',
			status: 'active'
		}
	};

	persistSubscription(next);
	return mockDelay(overview(next));
}
