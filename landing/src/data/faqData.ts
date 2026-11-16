export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'mobile' | 'web' | 'billing';
}

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'general',
    question: '¿Qué es SOFI y en qué operaciones mineras se utiliza?',
    answer: 'SOFI es una plataforma integral de ingeniería geológica y minera diseñada para capturar datos en interior mina mediante su app Android y calcular, simular en 3D y presupuestar labores subterráneas (cortavetas perpendiculares y diagonales) en su plataforma web.'
  },
  {
    id: 'faq-2',
    category: 'mobile',
    question: '¿La app Android funciona bajo tierra sin conexión a internet?',
    answer: 'Sí. La app Android de SOFI fue desarrollada específicamente para condiciones de interior mina. Almacena localmente las mediciones de brújula, clinómetro y coordenadas de afloramiento de forma encriptada, y las sincroniza automáticamente con la plataforma web al detectar señal WiFi o red móvil.'
  },
  {
    id: 'faq-3',
    category: 'mobile',
    question: '¿Qué precisión tienen la brújula y el clinómetro de la app móvil?',
    answer: 'Utiliza los sensores inerciales y magnetométricos del dispositivo con filtros de calibración matemática para compensar anomalías magnéticas locales, alcanzando una precisión de 0.5° en buzamiento y 1° en rumbo de veta.'
  },
  {
    id: 'faq-4',
    category: 'web',
    question: '¿Cómo funciona la simulación 3D interactiva en la web?',
    answer: 'El motor Three.js de SOFI reconstruye en el navegador el plano tridimensional de la veta con su azimut y buzamiento exactos, el frente de avance y las trayectorias de los proyectos EP y PC. Permite orbitar libremente, medir distancias y activar o desactivar capas geológicas.'
  },
  {
    id: 'faq-5',
    category: 'billing',
    question: '¿Cómo solicito los 14 días de prueba gratuita?',
    answer: 'Solo necesitas hacer clic en "Probar 14 días gratis" y continuar con tu cuenta de Google. No se requiere tarjeta de crédito ni compromiso de pago. Tendrás acceso total a la app móvil y al sistema web durante el periodo de prueba.'
  },
  {
    id: 'faq-6',
    category: 'billing',
    question: '¿Puedo cambiar de plan mensual a anual más adelante?',
    answer: 'Sí, puedes actualizar tu suscripción en cualquier momento desde el módulo de facturación de la plataforma web. Al optar por planes anuales recibes un descuento equivalente a 2 meses gratuitos.'
  }
];

