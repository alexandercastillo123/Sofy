import { SubscriptionPlan } from '../domain/account';

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
	{
		id: 'trial',
		tier: 'trial',
		name: 'Prueba gratuita',
		billingPeriod: 'trial',
		priceUsd: 0,
		durationDays: 14,
		description: 'Experimenta SOFI completo durante 14 días, sin tarjeta.',
		features: [
			'Todas las funcionalidades',
			'Simulación 3D interactiva',
			'Proyectos ilimitados',
			'Historial de cálculos',
			'Soporte por correo'
		]
	},
	{
		id: 'basic-monthly',
		tier: 'basic',
		name: 'Básico mensual',
		billingPeriod: 'monthly',
		priceUsd: 30.9,
		durationDays: 30,
		description: 'Las funciones fundamentales para el trabajo diario en mina.',
		features: [
			'Rumbo de veta y sección',
			'Proyectos y detalle de cálculos',
			'Historial de 50 cálculos',
			'Exportación de reportes',
			'1 usuario'
		]
	},
	{
		id: 'basic-annual',
		tier: 'basic',
		name: 'Básico anual',
		billingPeriod: 'annual',
		priceUsd: 309,
		durationDays: 365,
		description: 'Dos meses de ahorro frente al pago mensual.',
		features: [
			'Rumbo de veta y sección',
			'Proyectos y detalle de cálculos',
			'Historial de 50 cálculos',
			'Exportación de reportes',
			'1 usuario'
		],
		savingsUsd: 61.8
	},
	{
		id: 'premium-monthly',
		tier: 'premium',
		name: 'Premium mensual',
		billingPeriod: 'monthly',
		priceUsd: 78.9,
		durationDays: 30,
		description: 'Todas las funciones, visualización 3D y herramientas avanzadas.',
		features: [
			'Todo lo del plan Básico',
			'Simulación 3D interactiva',
			'Comparación avanzada de proyectos',
			'Exportación 3D y reportes',
			'Hasta 5 usuarios',
			'Soporte prioritario'
		],
		highlighted: true
	},
	{
		id: 'premium-annual',
		tier: 'premium',
		name: 'Premium anual',
		billingPeriod: 'annual',
		priceUsd: 789,
		durationDays: 365,
		description: 'El plan completo con el mejor precio por mes.',
		features: [
			'Todo lo del plan Básico',
			'Simulación 3D interactiva',
			'Comparación avanzada de proyectos',
			'Exportación 3D y reportes',
			'Hasta 5 usuarios',
			'Soporte prioritario'
		],
		savingsUsd: 157.8
	}
];

export function getPlan(planId: SubscriptionPlan['id']): SubscriptionPlan {
	return SUBSCRIPTION_PLANS.find((plan) => plan.id === planId) ?? SUBSCRIPTION_PLANS[0];
}

export const DEFAULT_SUBSCRIPTION_PLAN_ID = 'trial' as const;
