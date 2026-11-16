export interface SimulatorPreset {
  id: string;
  name: string;
  location: string;
  level: string;
  strike: number;
  strikeLabel: string;
  dip: number;
  dipDirection: 'NE' | 'SE' | 'SW' | 'NW';
  perpendicularDistance: number;
  diagonalDistance: number;
  elevation: number;
  description: string;
}

export const SIMULATOR_PRESETS: SimulatorPreset[] = [
  {
    id: 'esperanza',
    name: 'Veta Esperanza',
    location: 'Zona Central - Yacimiento Polimetálico',
    level: 'Nivel 3850',
    strike: 45,
    strikeLabel: 'N 45° E',
    dip: 65,
    dipDirection: 'SE',
    perpendicularDistance: 18.4,
    diagonalDistance: 26.2,
    elevation: 3850,
    description: 'Estructura vetiforme con cuarzo y sulfuros. El corte perpendicular optimiza 7.8m de avance respecto a la diagonal.'
  },
  {
    id: 'san-jose',
    name: 'Veta San José',
    location: 'Bloque Norte - Falla Transversal',
    level: 'Nivel 4100',
    strike: 315,
    strikeLabel: 'N 45° W',
    dip: 75,
    dipDirection: 'SW',
    perpendicularDistance: 22.1,
    diagonalDistance: 31.8,
    elevation: 4100,
    description: 'Veta de alta ley con buzamiento pronunciado. Requiere control estricto de caja techo en la intersección.'
  },
  {
    id: 'el-carmen',
    name: 'Veta El Carmen',
    location: 'Rampa Sur - Nivel Intermedio',
    level: 'Nivel 3620',
    strike: 60,
    strikeLabel: 'N 60° E',
    dip: 50,
    dipDirection: 'NW',
    perpendicularDistance: 14.5,
    diagonalDistance: 19.8,
    elevation: 3620,
    description: 'Manto con buzamiento moderado. Excelente aplicabilidad para bypass de ventilación y extracción.'
  }
];

