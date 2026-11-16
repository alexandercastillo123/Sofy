export interface SubscriptionPlan {
  id: string;
  tier: 'trial' | 'basic' | 'premium';
  name: string;
  billingPeriod: 'trial' | 'monthly' | 'annual';
  priceUsd: number;
  durationDays: number;
  description: string;
  features: string[];
  savingsUsd?: number;
  highlighted?: boolean;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'trial',
    tier: 'trial',
    name: 'Prueba Gratuita',
    billingPeriod: 'trial',
    priceUsd: 0,
    durationDays: 14,
    description: 'Experimenta SOFI completo durante 14 días con tu cuenta de Google. Sin tarjeta de crédito.',
    features: [
      'Acceso total a la aplicación móvil Android',
      'Brújula y clinómetro digital de campo',
      'Simulador 3D interactivo en la web',
      'Proyectos geológicos ilimitados en prueba',
      'Sincronización en tiempo real campo-oficina',
      'Soporte técnico por correo'
    ]
  },
  {
    id: 'basic-monthly',
    tier: 'basic',
    name: 'Básico Mensual',
    billingPeriod: 'monthly',
    priceUsd: 30.9,
    durationDays: 30,
    description: 'Funciones esenciales para trabajo geológico y cálculo diario en operaciones mineras.',
    features: [
      'Cálculo de rumbo de veta y sección',
      'Proyectos y detalle matemático de cálculos',
      'Historial de hasta 50 cálculos',
      'Exportación de reportes ejecutivos PDF',
      '1 usuario geólogo/ingeniero',
      'Sincronización móvil Android'
    ]
  },
  {
    id: 'basic-annual',
    tier: 'basic',
    name: 'Básico Anual',
    billingPeriod: 'annual',
    priceUsd: 309,
    durationDays: 365,
    description: 'Dos meses de ahorro frente al pago mensual para equipos y consultores independientes.',
    features: [
      'Todo lo del plan Básico Mensual',
      'Historial de hasta 100 cálculos',
      'Soporte estándar prioritario',
      'Ahorro directo de $61.80 USD al año'
    ],
    savingsUsd: 61.8
  },
  {
    id: 'premium-monthly',
    tier: 'premium',
    name: 'Premium Mensual',
    billingPeriod: 'monthly',
    priceUsd: 78.9,
    durationDays: 30,
    description: 'Potencia total con visualización 3D avanzada, cubicación y herramientas analíticas.',
    features: [
      'Todo lo del plan Básico',
      'Simulación 3D interactiva Three.js completa',
      'Comparación avanzada de proyectos (EP vs PC)',
      'Cálculo de volumen, tonelaje y costos de disparo',
      'Exportación 3D y reportes gerenciales',
      'Hasta 5 usuarios sincronizados',
      'Soporte prioritario 24/7'
    ],
    highlighted: true
  },
  {
    id: 'premium-annual',
    tier: 'premium',
    name: 'Premium Anual',
    billingPeriod: 'annual',
    priceUsd: 789,
    durationDays: 365,
    description: 'El plan corporativo más completo con la máxima rentabilidad y ahorro anual.',
    features: [
      'Todo lo del plan Premium Mensual',
      'Hasta 10 usuarios de campo y oficina',
      'Almacenamiento ilimitado de proyectos',
      'Ahorro directo de $157.80 USD al año',
      'Capacitación inicial y soporte dedicado'
    ],
    savingsUsd: 157.8,
    highlighted: true
  }
];

