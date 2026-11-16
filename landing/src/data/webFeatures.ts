export interface WebFeature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  badge: string;
  highlights: string[];
}

export const WEB_FEATURES: WebFeature[] = [
  {
    id: 'web-simulation',
    title: 'Visualización y Simulación 3D en la Nube',
    subtitle: 'Escena Three.js de alta precisión en tiempo real',
    description: 'Renderiza el plano de veta georreferenciado, la galería de avance y las dos alternativas de desarrollo subterráneo (EP y PC) con control de capas interactivo.',
    imageSrc: '/assets/images/web/web-simulation.png',
    badge: 'Three.js Engine',
    highlights: [
      'Rotación, traslación y zoom orbital interactivo',
      'Plano de veta semi-transparente con azimut y buzamiento exactos',
      'Capas independientes: veta, proyectos, grilla y etiquetas 3D',
      'Modo pantalla completa para presentaciones técnicas'
    ]
  },
  {
    id: 'web-project',
    title: 'Análisis Comparativo y Detalle Matemático',
    subtitle: 'Proyecto Perpendicular (EP) vs Cortaveta Diagonal (PC)',
    description: 'Calcula azimuts, distancias críticas de contacto, coordenadas de intersección, volumen de desmonte, tonelaje de mineral y presupuesto de perforación y voladura.',
    imageSrc: '/assets/images/web/web-project.png',
    badge: 'Cálculo analítico',
    highlights: [
      'Comparativa de metros lineales requeridos entre EP y PC',
      'Desglose de costos por metro de avance y explosivos',
      'Resumen técnico estructurado listo para exportar a PDF',
      'Trazabilidad completa con autor y marcas de tiempo'
    ]
  },
  {
    id: 'web-billing',
    title: 'Gestión de Licencias y Suscripciones',
    subtitle: 'Control transparente de planes corporativos e individuales',
    description: 'Administra tu plan de suscripción, historial de facturación, usuarios vinculados y solicita o extiende tus días de prueba gratuita sin complicaciones.',
    imageSrc: '/assets/images/web/web-billing.png',
    badge: 'Administración',
    highlights: [
      'Activación inmediata de 14 días gratis con cuenta de Google',
      'Cambio flexible entre facturación mensual y anual con descuento',
      'Facturas descargables y gestión de métodos de pago',
      'Asignación de roles y accesos para el equipo minero'
    ]
  },
  {
    id: 'web-profile',
    title: 'Perfil Profesional y Auditoría Técnica',
    subtitle: 'Identidad, certificaciones y registro de operaciones',
    description: 'Gestiona la información del ingeniero o geólogo responsable, su registro CIP, roles de mina y auditoría de proyectos calculados.',
    imageSrc: '/assets/images/web/web-profile.png',
    badge: 'Seguridad y auditoría',
    highlights: [
      'Registro del colegiado y credenciales técnicas',
      'Bitácora de cálculos ejecutados y modificaciones',
      'Seguridad con doble factor de autenticación y Google SSO',
      'Acceso unificado móvil y web'
    ]
  }
];

