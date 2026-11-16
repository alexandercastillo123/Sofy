export interface MobileFeature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  badge: string;
  specs: string[];
}

export const MOBILE_FEATURES: MobileFeature[] = [
  {
    id: 'brujula',
    title: 'Brújula Digital de Precisión',
    subtitle: 'Orientación estructural y rumbo de veta instantáneo',
    description: 'Calcula con exactitud milimétrica el rumbo geológico en campo mediante los sensores giroscópicos y magnetométricos del dispositivo móvil.',
    imageSrc: '/assets/images/android/BrujulaDigitalSofyAndroid.jpeg',
    badge: 'Sensores de campo',
    specs: ['Rumbo en cuadrante (N-E, S-E)', 'Filtro anti-interferencia ferrosa', 'Lectura continua en tiempo real']
  },
  {
    id: 'clinometro',
    title: 'Clinómetro Digital Integrado',
    subtitle: 'Medición de buzamiento e inclinación en tiempo real',
    description: 'Determina el ángulo de buzamiento y dirección de caída directamente apoyando el móvil sobre el plano de la falla o veta.',
    imageSrc: '/assets/images/android/ClinometroDigitalSofyAndroid.jpeg',
    badge: 'Inclinometría',
    specs: ['Buzamiento de 0° a 90°', 'Dirección de buzamiento calculada', 'Bloqueo rápido de medición']
  },
  {
    id: 'coordenadas',
    title: 'Coordenadas UTM y Afloramientos',
    subtitle: 'Captura georreferenciada de puntos clave',
    description: 'Registra las coordenadas del punto de estación (EM), punto de referencia (P2) y frente de avance con elevación precisa.',
    imageSrc: '/assets/images/android/CoordenadasAfloramientoSofyAndroid.jpeg',
    badge: 'Topografía GPS',
    specs: ['Coordenadas Este, Norte y Cota', 'Soporte UTM WGS84 y PSAD56', 'Validación topográfica inmediata']
  },
  {
    id: 'corte-vetas',
    title: 'Corte de Vetas y Sección',
    subtitle: 'Geometría del manto y modelado de galería',
    description: 'Define el ancho de labor, altura de galería, potencia de veta y parámetros de roca para proyectar el corte transversal de la labor.',
    imageSrc: '/assets/images/android/CorteVetasSofyAndroid.jpeg',
    badge: 'Ingeniería de labores',
    specs: ['Dimensiones de labor (Ancho x Alto)', 'Potencia verdadera y aparente', 'Tipo de roca y parámetros RMR']
  },
  {
    id: 'simulacion',
    title: 'Simulación Móvil en Terreno',
    subtitle: 'Validación visual previa a perforación',
    description: 'Visualiza en 3D en la palma de tu mano la trayectoria de intersección de la labor antes de subir a superficie o enviar el reporte.',
    imageSrc: '/assets/images/android/SimulacionSofyAndroid.jpeg',
    badge: 'Renderizado portátil',
    specs: ['Proyección de labor perpendicular', 'Proyección cortaveta diagonal', 'Estimación de metros de avance']
  },
  {
    id: 'registro',
    title: 'Gestión de Proyectos en Mina',
    subtitle: 'Registro ordenado por nivel y estructura',
    description: 'Organiza tus observaciones geológicas por código de proyecto, zona de explotación, nivel y fecha de muestreo sin hojas de papel.',
    imageSrc: '/assets/images/android/RegistrarSofyAndroid.jpeg',
    badge: 'Gestión de campo',
    specs: ['Códigos de proyecto autogenerados', 'Control de versiones por geólogo', 'Historial georreferenciado']
  },
  {
    id: 'inicio',
    title: 'Sincronización Segura en la Nube',
    subtitle: 'Conexión transparente móvil y web',
    description: 'Inicia sesión con tu cuenta de Google y trabaja offline en interior mina; al detectar conexión tus datos se sincronizan al sistema web.',
    imageSrc: '/assets/images/android/IniciarSofyAndroid.jpeg',
    badge: 'Cloud Sync',
    specs: ['Modo sin conexión garantizado', 'Sincronización automática con la Web', 'Encriptación de extremo a extremo']
  }
];

