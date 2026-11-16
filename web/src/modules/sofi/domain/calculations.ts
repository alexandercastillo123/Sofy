import { DipDirection, ProjectResult, Stake, StakeKind, VeinAnalysis, VeinInput, Coordinate3D } from './types';

const DEG_TO_RAD = Math.PI / 180;

const DIP_AZIMUTH: Record<DipDirection, number> = {
	NE: 45,
	SE: 135,
	SW: 225,
	NW: 315
};

const ZONES = ['Zona I', 'Zona II', 'Zona III', 'Zona IV'] as const;

export function normalizeAzimuth(angle: number): number {
	return ((angle % 360) + 360) % 360;
}

export function bearingBetween(from: { east: number; north: number }, to: { east: number; north: number }): number {
	const eastDelta = to.east - from.east;
	const northDelta = to.north - from.north;

	return normalizeAzimuth((Math.atan2(eastDelta, northDelta) * 180) / Math.PI);
}

export function bearingLabel(azimuth: number): string {
	const rounded = Math.round(azimuth);

	if (rounded <= 90) {
		return `N${rounded}°E`;
	}

	if (rounded <= 180) {
		return `S${180 - rounded}°E`;
	}

	if (rounded <= 270) {
		return `S${rounded - 180}°W`;
	}

	return `N${360 - rounded}°W`;
}

export function offsetCoordinate(
	origin: { east: number; north: number; elevation?: number },
	azimuth: number,
	distance: number
): Coordinate3D {
	const radians = azimuth * DEG_TO_RAD;

	return {
		east: origin.east + distance * Math.sin(radians),
		north: origin.north + distance * Math.cos(radians),
		elevation: origin.elevation ?? 0
	};
}

/**
 * Resolves strike, azimuth, zone and analysis format from the EM -> P2 line.
 * This mirrors the deterministic part of `RumboVeta.analisisRumboVeta`.
 */
export function analyzeVein(input: VeinInput): VeinAnalysis {
	const azimuth = bearingBetween(input.em, input.p2);
	const eastDelta = input.p2.east - input.em.east;
	const northDelta = input.p2.north - input.em.north;
	const format = Math.min(16, Math.max(1, Math.floor(azimuth / 22.5) + 1));
	const zone = ZONES[format % ZONES.length];
	const caseId = Math.abs(eastDelta) >= Math.abs(northDelta) ? 'Caso 2' : 'Caso 1';

	return {
		strike: azimuth,
		azimuth,
		label: bearingLabel(azimuth),
		caseId,
		zone,
		format,
		dipDirection: input.dipDirection,
		trend: azimuth <= 180 ? 'Positivo' : 'Negativo'
	};
}

function buildProject(
	input: VeinInput,
	analysis: VeinAnalysis,
	kind: 'perpendicular' | 'diagonal',
	azimuth: number,
	distance: number
): ProjectResult {
	const isPerpendicular = kind === 'perpendicular';
	const area = input.section.height * input.section.width * (isPerpendicular ? 1 : 1.06);
	const volume = area * distance;
	const expandedVolume = volume * (1 + input.rock.swellFactor / 100);
	const tonnage = volume * input.rock.density;
	const blasts = Math.max(1, Math.ceil(volume / (area * input.blasting.advancePerBlast)));
	const durationDays = Math.max(1, Math.ceil(blasts / input.blasting.blastsPerDay));
	const cost = distance * input.blasting.costPerMeter * (isPerpendicular ? 1 : 1.08);

	return {
		id: kind,
		name: isPerpendicular ? 'Proyecto Perpendicular' : 'Proyecto Diagonal',
		description: isPerpendicular
			? 'Rayo perpendicular a la veta desde el frente (EP).'
			: 'Rayo perpendicular al frente de labor (PC).',
		strike: analysis.strike,
		strikeLabel: analysis.label,
		azimuth,
		distance,
		endpoint: {
			...offsetCoordinate(input.frente, azimuth, distance),
			elevation: input.frente.elevation
		},
		area,
		volume,
		expandedVolume,
		tonnage,
		durationDays,
		blasts,
		cost
	};
}

/**
 * Builds the perpendicular and diagonal projects with a deterministic
 * geometry derived from the section, the dip and the front bearing.
 */
export function computeProjects(input: VeinInput, analysis: VeinAnalysis): ProjectResult[] {
	const dipRadians = input.dip * DEG_TO_RAD;
	const perpendicularDistance =
		input.section.height * Math.abs(Math.cos(dipRadians)) +
		input.section.width * 0.85 +
		input.section.width * Math.abs(Math.sin(dipRadians));

	const diagonalDistance = perpendicularDistance * 1.18;
	const frontBearing = bearingBetween(input.em, input.frente);
	const diagonalAzimuth = normalizeAzimuth(frontBearing + 90);
	const perpendicularAzimuth = DIP_AZIMUTH[analysis.dipDirection];

	return [
		buildProject(input, analysis, 'perpendicular', perpendicularAzimuth, perpendicularDistance),
		buildProject(input, analysis, 'diagonal', diagonalAzimuth, diagonalDistance)
	];
}

export function computeStakes(input: VeinInput, projects: ProjectResult[], distance: number): Stake[] {
	const stakeConfig: { kind: StakeKind; label: string; projectId: ProjectResult['id'] }[] = [
		{ kind: 'perpendicular', label: 'Estaca 1 · Perpendicular', projectId: 'perpendicular' },
		{ kind: 'diagonal', label: 'Estaca 2 · Diagonal', projectId: 'diagonal' }
	];

	return stakeConfig.map(({ kind, label, projectId }) => {
		const project = projects.find((item) => item.id === projectId) as ProjectResult;
		const azimuth = project.azimuth;

		return {
			id: `stake-${kind}-${distance}`,
			label,
			kind,
			distance,
			azimuth,
			bearingLabel: bearingLabel(azimuth),
			coordinate: {
				...offsetCoordinate(input.frente, azimuth, distance),
				elevation: input.frente.elevation
			}
		};
	});
}

export function convertCurrency(amountInSoles: number, rate: number): number {
	return amountInSoles * rate;
}
