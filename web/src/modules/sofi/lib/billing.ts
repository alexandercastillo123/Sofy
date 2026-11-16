import {
	Subscription,
	SubscriptionOverview,
	SubscriptionPlan
} from '../domain/account';
import { SUBSCRIPTION_PLANS } from '../data/plans';

const DAY_MS = 24 * 60 * 60 * 1000;

const USD_FORMATTER = new Intl.NumberFormat('es-PE', {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
});

export function formatUsd(amount: number): string {
	return `US$ ${USD_FORMATTER.format(amount)}`;
}

export function planPriceLabel(plan: SubscriptionPlan): string {
	if (plan.priceUsd === 0) {
		return 'Gratis';
	}

	return plan.billingPeriod === 'annual'
		? `${formatUsd(plan.priceUsd)} / año`
		: `${formatUsd(plan.priceUsd)} / mes`;
}

export function planMonthlyEquivalent(plan: SubscriptionPlan): number {
	return plan.billingPeriod === 'annual' ? plan.priceUsd / 12 : plan.priceUsd;
}

function clamp(value: number, min: number, max: number): number {
	return Math.min(max, Math.max(min, value));
}

/**
 * Converts the stored dates into the counters shown in the UI. It is a pure
 * function so the subscription card, the profile summary and the billing page
 * always report the same days.
 */
export function buildSubscriptionOverview(
	subscription: Subscription,
	plans: SubscriptionPlan[] = SUBSCRIPTION_PLANS
): SubscriptionOverview {
	const plan = plans.find((item) => item.id === subscription.planId) ?? plans[0];
	const startedAt = new Date(subscription.startedAt).getTime();
	const endsAt = new Date(subscription.endsAt).getTime();
	const now = Date.now();
	const totalDays = Math.max(1, Math.round((endsAt - startedAt) / DAY_MS));
	const daysElapsed = clamp(Math.floor((now - startedAt) / DAY_MS), 0, totalDays);
	const daysRemaining = clamp(Math.ceil((endsAt - now) / DAY_MS), 0, totalDays);

	return {
		subscription,
		plan,
		plans,
		daysElapsed,
		daysRemaining,
		progress: clamp((daysElapsed / totalDays) * 100, 0, 100),
		renewalDate: new Date(subscription.endsAt).toISOString(),
		isTrial: subscription.status === 'trialing'
	};
}
