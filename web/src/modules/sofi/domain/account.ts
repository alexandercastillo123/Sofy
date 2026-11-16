export type PlanTier = 'trial' | 'basic' | 'premium';
export type BillingPeriod = 'trial' | 'monthly' | 'annual';

export type SubscriptionPlanId =
	| 'trial'
	| 'basic-monthly'
	| 'basic-annual'
	| 'premium-monthly'
	| 'premium-annual';

export type SubscriptionPlan = {
	id: SubscriptionPlanId;
	tier: PlanTier;
	name: string;
	billingPeriod: BillingPeriod;
	priceUsd: number;
	durationDays: number;
	description: string;
	features: string[];
	highlighted?: boolean;
	savingsUsd?: number;
};

export type SubscriptionStatus = 'trialing' | 'active' | 'past_due' | 'canceled';

export type PaymentGateway = 'culqi';

export type PaymentMethod = {
	id: string;
	gateway: PaymentGateway;
	label: string;
	status: 'pending' | 'active';
	brand?: string;
	last4?: string;
};

export type Subscription = {
	id: string;
	planId: SubscriptionPlanId;
	status: SubscriptionStatus;
	startedAt: string;
	endsAt: string;
	autoRenew: boolean;
	paymentMethod: PaymentMethod;
};

export type SubscriptionOverview = {
	subscription: Subscription;
	plan: SubscriptionPlan;
	plans: SubscriptionPlan[];
	daysElapsed: number;
	daysRemaining: number;
	progress: number;
	renewalDate: string;
	isTrial: boolean;
};

export type AccountProfile = {
	id: string;
	firstName: string;
	lastName: string;
	displayName: string;
	email: string;
	phone: string;
	company: string;
	role: string;
	location: string;
	timezone: string;
	memberSince: string;
	planId: SubscriptionPlanId;
};
