export type Coordinate2D = {
	east: number;
	north: number;
};

export type Coordinate3D = Coordinate2D & {
	elevation: number;
};

export type DipDirection = 'NE' | 'SE' | 'SW' | 'NW';

export type VeinInput = {
	em: Coordinate3D;
	p2: Coordinate2D;
	frente: Coordinate3D;
	dip: number;
	dipDirection: DipDirection;
	section: {
		height: number;
		width: number;
	};
	rock: {
		density: number;
		swellFactor: number;
	};
	blasting: {
		advancePerBlast: number;
		blastsPerDay: number;
		costPerMeter: number;
	};
};

export type VeinAnalysis = {
	/** Rumbo de veta en grados (0-360). */
	strike: number;
	/** Azimut del rumbo. */
	azimuth: number;
	/** Etiqueta tipo N42.5°E. */
	label: string;
	/** Caso geométrico detectado por el motor (1 o 2). */
	caseId: 'Caso 1' | 'Caso 2';
	/** Zona de evaluación. */
	zone: string;
	/** Formato de análisis (1-16), equivalente al escritorio. */
	format: number;
	/** Sentido del buzamiento elegido por el usuario. */
	dipDirection: DipDirection;
	/** El proyecto perpendicular queda delante o detrás del frente. */
	trend: 'Positivo' | 'Negativo';
};

export type ProjectKind = 'perpendicular' | 'diagonal';

export type ProjectResult = {
	id: ProjectKind;
	name: string;
	description: string;
	strike: number;
	strikeLabel: string;
	azimuth: number;
	distance: number;
	endpoint: Coordinate3D;
	area: number;
	volume: number;
	expandedVolume: number;
	tonnage: number;
	durationDays: number;
	blasts: number;
	cost: number;
};

export type StakeKind = 'perpendicular' | 'diagonal';

export type Stake = {
	id: string;
	label: string;
	kind: StakeKind;
	distance: number;
	azimuth: number;
	bearingLabel: string;
	coordinate: Coordinate3D;
};

export type ProjectStatus = 'En análisis' | 'Aprobado' | 'En ejecución' | 'Cerrado';

export type SofiProject = {
	id: string;
	code: string;
	name: string;
	zone: string;
	status: ProjectStatus;
	updatedAt: string;
	strike: number;
	dip: number;
	tonnage: number;
	cost: number;
	analyst: string;
};

export type DashboardMetrics = {
	activeProjects: number;
	averageStrike: number;
	estimatedInvestment: number;
	projectedTonnage: number;
};

export type DashboardData = {
	metrics: DashboardMetrics;
	production: { month: string; tonnage: number; cost: number }[];
	zones: { zone: string; projects: number }[];
	projects: SofiProject[];
};

export type Currency = 'PEN' | 'USD' | 'EUR';

export type CurrencyOption = {
	id: Currency;
	symbol: string;
	label: string;
	/** Unidades de la moneda por 1 sol. */
	rate: number;
};

export type HistoryEntry = {
	id: string;
	name: string;
	createdAt: string;
	input: VeinInput;
	strike: number;
	strikeLabel: string;
	caseId: VeinAnalysis['caseId'];
	zone: string;
	dip: number;
	dipDirection: DipDirection;
	perpendicularDistance: number;
	diagonalDistance: number;
	tonnage: number;
	cost: number;
};
