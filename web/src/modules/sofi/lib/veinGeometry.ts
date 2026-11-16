import { DipDirection, ProjectResult, VeinAnalysis, VeinInput } from '../domain/types';

const DEG_TO_RAD = Math.PI / 180;

const DIP_QUADRANT: Record<DipDirection, number> = {
	NE: 45,
	SE: 135,
	SW: 225,
	NW: 315
};

export type Vec3 = {
	x: number;
	y: number;
	z: number;
};

export type SceneLabelKind = 'vein' | 'front' | 'perpendicular' | 'diagonal' | 'north';

export type SceneLabel = {
	id: string;
	kind: SceneLabelKind;
	text: string;
	position: Vec3;
};

export type ProjectTrajectory = {
	id: ProjectResult['id'];
	label: 'EP' | 'PC';
	distance: number;
	start: Vec3;
	end: Vec3;
};

export type VeinGeometry = {
	veinCorners: Vec3[];
	veinCenter: Vec3;
	front: {
		center: Vec3;
		width: number;
		height: number;
		depth: number;
		rotationY: number;
	};
	trajectories: ProjectTrajectory[];
	labels: SceneLabel[];
	northArrow: { from: Vec3; to: Vec3 };
	groundY: number;
	gridSize: number;
	extent: number;
	bounds: {
		min: Vec3;
		max: Vec3;
	};
};

function add(a: Vec3, b: Vec3): Vec3 {
	return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

function scale(point: Vec3, factor: number): Vec3 {
	return { x: point.x * factor, y: point.y * factor, z: point.z * factor };
}

function normalizeAzimuth(angle: number): number {
	return ((angle % 360) + 360) % 360;
}

/**
 * Builds the 3D geometry in local metres, with the front at the origin and
 * Y as elevation. Both the Three.js viewer and any future renderer consume
 * this data, keeping the camera/render code free of mining math.
 */
export function buildVeinGeometry(
	input: VeinInput,
	analysis: VeinAnalysis,
	projects: ProjectResult[]
): VeinGeometry {
	const origin = input.frente;
	const local = (point: { east: number; north: number; elevation?: number }): Vec3 => ({
		x: point.east - origin.east,
		y: (point.elevation ?? origin.elevation) - origin.elevation,
		z: point.north - origin.north
	});

	const front = local(input.frente);
	const perpendicular = projects.find((project) => project.id === 'perpendicular');
	const diagonal = projects.find((project) => project.id === 'diagonal');
	const maxDistance = Math.max(10, ...projects.map((project) => project.distance));
	const extent = Math.max(18, maxDistance * 1.6);

	const strikeRadians = analysis.strike * DEG_TO_RAD;
	const strikeVector: Vec3 = {
		x: Math.sin(strikeRadians),
		y: 0,
		z: Math.cos(strikeRadians)
	};

	let dipAzimuth = analysis.strike + 90;
	const quadrant = DIP_QUADRANT[analysis.dipDirection];
	const horizontalDip = {
		x: Math.sin(dipAzimuth * DEG_TO_RAD),
		z: Math.cos(dipAzimuth * DEG_TO_RAD)
	};
	const quadrantVector = {
		x: Math.sin(quadrant * DEG_TO_RAD),
		z: Math.cos(quadrant * DEG_TO_RAD)
	};

	if (horizontalDip.x * quadrantVector.x + horizontalDip.z * quadrantVector.z < 0) {
		dipAzimuth += 180;
	}

	dipAzimuth = normalizeAzimuth(dipAzimuth);

	const dipRadians = input.dip * DEG_TO_RAD;
	const dipVector: Vec3 = {
		x: Math.sin(dipAzimuth * DEG_TO_RAD) * Math.cos(dipRadians),
		y: -Math.sin(dipRadians),
		z: Math.cos(dipAzimuth * DEG_TO_RAD) * Math.cos(dipRadians)
	};

	const dipHalf = extent * 0.68;
	// The front is the point of interest: centering the vein plane there keeps
	// the front and both trajectories readable instead of shrinking them next
	// to a reference point tens of metres away.
	const veinCenter = front;
	const veinCorners: Vec3[] = [
		add(add(veinCenter, scale(strikeVector, extent)), scale(dipVector, dipHalf)),
		add(add(veinCenter, scale(strikeVector, -extent)), scale(dipVector, dipHalf)),
		add(add(veinCenter, scale(strikeVector, -extent)), scale(dipVector, -dipHalf)),
		add(add(veinCenter, scale(strikeVector, extent)), scale(dipVector, -dipHalf))
	];

	const frontAzimuth = (perpendicular ?? projects[0])?.azimuth ?? analysis.strike + 90;
	const frontRotationY = frontAzimuth * DEG_TO_RAD;
	const forward = {
		x: Math.sin(frontRotationY),
		z: Math.cos(frontRotationY)
	};
	const frontDepth = 1.8;
	const frontCenter: Vec3 = {
		x: front.x - forward.x * (frontDepth / 2),
		y: front.y + input.section.height / 2,
		z: front.z - forward.z * (frontDepth / 2)
	};

	const trajectories: ProjectTrajectory[] = [];
	const projectLabels: SceneLabel[] = [];
	const bridgeY = input.section.height / 2;

	for (const project of [perpendicular, diagonal]) {
		if (!project) {
			continue;
		}

		const endpoint = local(project.endpoint);
		const start: Vec3 = { x: front.x, y: front.y + bridgeY, z: front.z };
		const end: Vec3 = { x: endpoint.x, y: endpoint.y + bridgeY, z: endpoint.z };
		const azimuth = project.azimuth * DEG_TO_RAD;
		const side = project.id === 'perpendicular' ? 1 : -1;
		const labelOffset = {
			x: Math.cos(azimuth) * side * 4,
			z: -Math.sin(azimuth) * side * 4
		};

		trajectories.push({
			id: project.id,
			label: project.id === 'perpendicular' ? 'EP' : 'PC',
			distance: project.distance,
			start,
			end
		});
		projectLabels.push({
			id: `label-${project.id}`,
			kind: project.id,
			text: `${project.id === 'perpendicular' ? 'EP' : 'PC'} · ${Math.round(project.distance)} m`,
			position: add(end, { x: labelOffset.x, y: 2.2, z: labelOffset.z })
		});
	}

	const minCornerY = Math.min(...veinCorners.map((corner) => corner.y), front.y);
	const groundY = minCornerY - 2.5;
	const gridSize = Math.max(24, extent * 2.2);
	const labels: SceneLabel[] = [
		{
			id: 'label-vein',
			kind: 'vein',
			text: 'PLANO DE VETA',
			position: add(veinCorners[3], { x: 0, y: 2.5, z: 0 })
		},
		{
			id: 'label-front',
			kind: 'front',
			text: 'FRENTE',
			position: {
				x: front.x - forward.x * 6,
				y: front.y + input.section.height + 2.8,
				z: front.z - forward.z * 6
			}
		},
		...projectLabels
	];

	const northStart: Vec3 = {
		x: 0,
		y: groundY + 0.12,
		z: gridSize * 0.28
	};
	const northEnd: Vec3 = {
		x: 0,
		y: groundY + 0.12,
		z: gridSize * 0.28 + extent * 0.8
	};
	labels.push({
		id: 'label-north',
		kind: 'north',
		text: 'N',
		position: add(northEnd, { x: 0, y: 1.4, z: 0 })
	});

	const boundsPoints = [
		...veinCorners,
		...trajectories.flatMap((trajectory) => [trajectory.start, trajectory.end]),
		{ x: front.x, y: front.y, z: front.z },
		{ x: front.x, y: front.y + input.section.height, z: front.z },
		...labels.map((label) => label.position)
	];
	const minX = Math.min(...boundsPoints.map((point) => point.x));
	const maxX = Math.max(...boundsPoints.map((point) => point.x));
	const minY = Math.min(...boundsPoints.map((point) => point.y), groundY);
	const maxY = Math.max(...boundsPoints.map((point) => point.y));
	const minZ = Math.min(...boundsPoints.map((point) => point.z));
	const maxZ = Math.max(...boundsPoints.map((point) => point.z));

	return {
		veinCorners,
		veinCenter,
		front: {
			center: frontCenter,
			width: input.section.width,
			height: input.section.height,
			depth: frontDepth,
			rotationY: frontRotationY
		},
		trajectories,
		labels,
		northArrow: { from: northStart, to: northEnd },
		groundY,
		gridSize,
		extent,
		bounds: {
			min: { x: minX, y: minY, z: minZ },
			max: { x: maxX, y: maxY, z: maxZ }
		}
	};
}
