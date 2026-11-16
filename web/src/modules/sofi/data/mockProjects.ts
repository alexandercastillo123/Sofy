import { DipDirection, SofiProject, VeinInput } from '../domain/types';
import { MiningProject, ProjectAuthor, ProjectLocation } from '../domain/project';
import { summarizeProject } from '../domain/projectSummary';
import { DEFAULT_VEIN_INPUT } from './defaults';

type InputOverrides = {
	em?: Partial<VeinInput['em']>;
	p2?: Partial<VeinInput['p2']>;
	frente?: Partial<VeinInput['frente']>;
	dip?: number;
	dipDirection?: DipDirection;
	section?: Partial<VeinInput['section']>;
	rock?: Partial<VeinInput['rock']>;
	blasting?: Partial<VeinInput['blasting']>;
};

function buildInput(overrides: InputOverrides): VeinInput {
	return {
		...DEFAULT_VEIN_INPUT,
		...overrides,
		em: { ...DEFAULT_VEIN_INPUT.em, ...overrides.em },
		p2: { ...DEFAULT_VEIN_INPUT.p2, ...overrides.p2 },
		frente: { ...DEFAULT_VEIN_INPUT.frente, ...overrides.frente },
		section: { ...DEFAULT_VEIN_INPUT.section, ...overrides.section },
		rock: { ...DEFAULT_VEIN_INPUT.rock, ...overrides.rock },
		blasting: { ...DEFAULT_VEIN_INPUT.blasting, ...overrides.blasting }
	};
}

const AUTHORS: Record<string, ProjectAuthor> = {
	alexander: {
		id: 'usr-sofi-001',
		name: 'Alexander Ríos',
		shortName: 'A. Ríos',
		role: 'Ingeniero de minas',
		email: 'admin@sofi.pe'
	},
	maria: {
		id: 'usr-sofi-002',
		name: 'María Quispe',
		shortName: 'M. Quispe',
		role: 'Geóloga senior',
		email: 'maria.quispe@sofi.pe'
	},
	luis: {
		id: 'usr-sofi-003',
		name: 'Luis Huamán',
		shortName: 'L. Huamán',
		role: 'Topógrafo de mina',
		email: 'luis.huaman@sofi.pe'
	}
};

type ProjectSeed = {
	id: string;
	code: string;
	name: string;
	description: string;
	status: MiningProject['status'];
	createdAt: string;
	updatedAt: string;
	author: ProjectAuthor;
	location: Omit<ProjectLocation, 'coordinates'> & {
		coordinates: VeinInput['em'];
	};
	input: InputOverrides;
	tags: string[];
};

const SEEDS: ProjectSeed[] = [
	{
		id: 'hrs-2041',
		code: 'HRS-2041',
		name: 'Veta Esperanza',
		description:
			'Proyecto de preparación sobre la veta Esperanza, nivel 3850. Se evaluó el avance perpendicular y diagonal desde la galería 120.',
		status: 'En ejecución',
		createdAt: '2026-10-24T09:20:00-05:00',
		updatedAt: '2026-11-02T16:40:00-05:00',
		author: AUTHORS.alexander,
		location: {
			zone: 'Zona II',
			sector: 'Galería 120 · Nivel 3850',
			district: 'San Jerónimo',
			province: 'Andahuaylas',
			region: 'Apurímac',
			country: 'Perú',
			utmZone: '18L',
			datum: 'WGS 84',
			coordinates: { east: 1248.4, north: 8426.7, elevation: 3852.3 }
		},
		input: {},
		tags: ['Veta principal', 'Producción', 'Turno A']
	},
	{
		id: 'hrs-2038',
		code: 'HRS-2038',
		name: 'Veta San Jorge',
		description:
			'Crucero 120 sobre la veta San Jorge. El cálculo incluye sección de 3.2 × 2.8 m y un plan de voladura de dos disparos por día.',
		status: 'Aprobado',
		createdAt: '2026-10-26T11:05:00-05:00',
		updatedAt: '2026-10-30T14:15:00-05:00',
		author: AUTHORS.maria,
		location: {
			zone: 'Zona I',
			sector: 'Crucero 120 · Nivel 3890',
			district: 'San Jerónimo',
			province: 'Andahuaylas',
			region: 'Apurímac',
			country: 'Perú',
			utmZone: '18L',
			datum: 'WGS 84',
			coordinates: { east: 1284.2, north: 8512.4, elevation: 3891.7 }
		},
		input: {
			em: { east: 1284.2, north: 8512.4, elevation: 3891.7 },
			p2: { east: 1348.9, north: 8596.2 },
			frente: { east: 1210.8, north: 8560.3, elevation: 3864.1 },
			dip: 57,
			dipDirection: 'NE',
			section: { height: 3.2, width: 2.8 },
			blasting: { advancePerBlast: 2.4, blastsPerDay: 2, costPerMeter: 172 }
		},
		tags: ['Crucero', 'Aprobado', 'Geología']
	},
	{
		id: 'hrs-2035',
		code: 'HRS-2035',
		name: 'Rampa Norte 3',
		description:
			'Análisis de la rampa Norte 3 para definir el rumbo de avance y el sostenimiento del tramo inferior.',
		status: 'En análisis',
		createdAt: '2026-10-22T08:30:00-05:00',
		updatedAt: '2026-10-28T10:05:00-05:00',
		author: AUTHORS.alexander,
		location: {
			zone: 'Zona III',
			sector: 'Rampa Norte · Nivel 3800',
			district: 'Pacucha',
			province: 'Andahuaylas',
			region: 'Apurímac',
			country: 'Perú',
			utmZone: '18L',
			datum: 'WGS 84',
			coordinates: { east: 1176.1, north: 8388.6, elevation: 3802.4 }
		},
		input: {
			em: { east: 1176.1, north: 8388.6, elevation: 3802.4 },
			p2: { east: 1132.7, north: 8461.9 },
			frente: { east: 1198.4, north: 8422.8, elevation: 3788.2 },
			dip: 68,
			dipDirection: 'NW',
			section: { height: 4, width: 3.5 },
			rock: { density: 2.85, swellFactor: 32 },
			blasting: { advancePerBlast: 3, blastsPerDay: 2, costPerMeter: 214 }
		},
		tags: ['Rampa', 'Sostenimiento', 'Revisión']
	},
	{
		id: 'hrs-2029',
		code: 'HRS-2029',
		name: 'Veta Milagros',
		description:
			'Evaluación del nivel 445 de la veta Milagros. El frente se encuentra al suroeste y se comparó el avance con la alternativa diagonal.',
		status: 'En ejecución',
		createdAt: '2026-10-18T15:10:00-05:00',
		updatedAt: '2026-10-22T16:30:00-05:00',
		author: AUTHORS.luis,
		location: {
			zone: 'Zona IV',
			sector: 'Nivel 445 · Frente suroeste',
			district: 'Talavera',
			province: 'Andahuaylas',
			region: 'Apurímac',
			country: 'Perú',
			utmZone: '18L',
			datum: 'WGS 84',
			coordinates: { east: 1342.5, north: 8284.1, elevation: 3920.8 }
		},
		input: {
			em: { east: 1342.5, north: 8284.1, elevation: 3920.8 },
			p2: { east: 1420.3, north: 8228.7 },
			frente: { east: 1308.9, north: 8310.2, elevation: 3896.4 },
			dip: 55,
			dipDirection: 'SW',
			section: { height: 3.4, width: 3 },
			blasting: { advancePerBlast: 2.6, blastsPerDay: 3, costPerMeter: 198 }
		},
		tags: ['Nivel 445', 'Avance', 'Topografía']
	},
	{
		id: 'hrs-2024',
		code: 'HRS-2024',
		name: 'Cuerpo María',
		description:
			'Cuerpo mineralizado María. Proyecto cerrado con la información de campo del turno noche y el levantamiento topográfico final.',
		status: 'Cerrado',
		createdAt: '2026-10-02T09:45:00-05:00',
		updatedAt: '2026-10-15T18:20:00-05:00',
		author: AUTHORS.maria,
		location: {
			zone: 'Zona II',
			sector: 'Cuerpo María · Nivel 3875',
			district: 'San Jerónimo',
			province: 'Andahuaylas',
			region: 'Apurímac',
			country: 'Perú',
			utmZone: '18L',
			datum: 'WGS 84',
			coordinates: { east: 1301.8, north: 8440.5, elevation: 3876.2 }
		},
		input: {
			em: { east: 1301.8, north: 8440.5, elevation: 3876.2 },
			p2: { east: 1356.4, north: 8508.9 },
			frente: { east: 1244.2, north: 8476.1, elevation: 3862.8 },
			dip: 71,
			dipDirection: 'SE',
			section: { height: 3.8, width: 3.2 },
			rock: { density: 2.9, swellFactor: 30 },
			blasting: { advancePerBlast: 3.1, blastsPerDay: 2, costPerMeter: 205 }
		},
		tags: ['Cuerpo', 'Cerrado', 'Levantamiento']
	},
	{
		id: 'hrs-2018',
		code: 'HRS-2018',
		name: 'Veta Carmen',
		description:
			'Veta Carmen, zona I. El objetivo fue validar la continuidad del rumbo y estimar el costo del siguiente tramo de preparación.',
		status: 'Aprobado',
		createdAt: '2026-09-28T13:25:00-05:00',
		updatedAt: '2026-10-08T11:40:00-05:00',
		author: AUTHORS.luis,
		location: {
			zone: 'Zona I',
			sector: 'Galería Carmen · Nivel 3900',
			district: 'Pacucha',
			province: 'Andahuaylas',
			region: 'Apurímac',
			country: 'Perú',
			utmZone: '18L',
			datum: 'WGS 84',
			coordinates: { east: 1260.9, north: 8568.3, elevation: 3908.4 }
		},
		input: {
			em: { east: 1260.9, north: 8568.3, elevation: 3908.4 },
			p2: { east: 1322.5, north: 8604.8 },
			frente: { east: 1208.4, north: 8589.7, elevation: 3895.1 },
			dip: 60,
			dipDirection: 'NE',
			section: { height: 3.3, width: 2.9 },
			rock: { density: 2.75, swellFactor: 27 },
			blasting: { advancePerBlast: 2.5, blastsPerDay: 2, costPerMeter: 180 }
		},
		tags: ['Continuidad', 'Aprobado', 'Costo']
	}
];

const SOURCE_BY_INDEX: MiningProject['source'][] = [
	{
		channel: 'mobile',
		app: 'Sofy Corte de Vetas',
		platform: 'Android',
		syncedAt: '2026-11-02T17:05:00-05:00'
	},
	{
		channel: 'mobile',
		app: 'Sofy Corte de Vetas',
		platform: 'Android',
		syncedAt: '2026-10-30T14:40:00-05:00'
	},
	{
		channel: 'mobile',
		app: 'Sofy Corte de Vetas',
		platform: 'Android',
		syncedAt: '2026-10-28T10:30:00-05:00'
	},
	{
		channel: 'mobile',
		app: 'Sofy Corte de Vetas',
		platform: 'iOS',
		syncedAt: '2026-10-22T17:00:00-05:00'
	},
	{
		channel: 'web',
		app: 'SOFI Web',
		platform: 'Escritorio',
		syncedAt: '2026-10-15T18:30:00-05:00'
	},
	{
		channel: 'mobile',
		app: 'Sofy Corte de Vetas',
		platform: 'Android',
		syncedAt: '2026-10-08T12:05:00-05:00'
	}
];

export const MOCK_MINING_PROJECTS: MiningProject[] = SEEDS.map((seed, index) => ({
	id: seed.id,
	code: seed.code,
	name: seed.name,
	description: seed.description,
	status: seed.status,
	createdAt: seed.createdAt,
	updatedAt: seed.updatedAt,
	createdBy: seed.author,
	location: seed.location,
	source: SOURCE_BY_INDEX[index] ?? SOURCE_BY_INDEX[0],
	input: buildInput(seed.input),
	tags: seed.tags
}));

/**
 * Dashboard keeps its flatter view model. It is derived from the same stored
 * projects, so project names, tonnage and costs never drift between modules.
 */
export const MOCK_PROJECTS: SofiProject[] = MOCK_MINING_PROJECTS.map((project) => {
	const summary = summarizeProject(project);

	return {
		id: project.id,
		code: project.code,
		name: project.name,
		zone: project.location.zone,
		status: project.status,
		updatedAt: project.updatedAt.slice(0, 10),
		strike: summary.analysis.strike,
		dip: project.input.dip,
		tonnage: summary.totalTonnage,
		cost: summary.totalCost,
		analyst: project.createdBy.shortName
	};
});

export const PRODUCTION_HISTORY = [
	{ month: 'May', tonnage: 14800, cost: 98200 },
	{ month: 'Jun', tonnage: 16250, cost: 104800 },
	{ month: 'Jul', tonnage: 15120, cost: 99800 },
	{ month: 'Ago', tonnage: 18900, cost: 118400 },
	{ month: 'Sep', tonnage: 20450, cost: 124600 },
	{ month: 'Oct', tonnage: 22680, cost: 137200 }
];
