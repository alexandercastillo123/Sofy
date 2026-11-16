import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { VeinGeometry, Vec3 } from '../lib/veinGeometry';

export type ThreeScenePalette = {
	vein: string;
	front: string;
	perpendicular: string;
	diagonal: string;
	grid: string;
	background: string;
};

export type SceneLayers = {
	vein: THREE.Group;
	projects: THREE.Group;
	grid: THREE.Group;
	labels: THREE.Group;
};

export type BuiltVeinScene = {
	root: THREE.Group;
	layers: SceneLayers;
	bounds: THREE.Box3;
	dispose: () => void;
};

function toVector(point: Vec3): THREE.Vector3 {
	return new THREE.Vector3(point.x, point.y, point.z);
}

function createVeinPlane(geometry: VeinGeometry, color: string): THREE.Group {
	const group = new THREE.Group();
	const positions = geometry.veinCorners.flatMap((corner) => [corner.x, corner.y, corner.z]);
	const planeGeometry = new THREE.BufferGeometry();
	planeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
	planeGeometry.setIndex([0, 1, 2, 0, 2, 3]);
	planeGeometry.computeVertexNormals();

	const material = new THREE.MeshStandardMaterial({
		color,
		transparent: true,
		opacity: 0.2,
		side: THREE.DoubleSide,
		roughness: 0.8,
		metalness: 0.05,
		depthWrite: false
	});
	const mesh = new THREE.Mesh(planeGeometry, material);

	const outlineGeometry = new THREE.BufferGeometry().setFromPoints(geometry.veinCorners.map(toVector));
	const outline = new THREE.LineLoop(
		outlineGeometry,
		new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.9 })
	);

	group.add(mesh, outline);
	return group;
}

function createFront(geometry: VeinGeometry, color: string): THREE.Group {
	const group = new THREE.Group();
	const { center, width, height, depth, rotationY } = geometry.front;
	const box = new THREE.BoxGeometry(width, height, depth);
	const mesh = new THREE.Mesh(
		box,
		new THREE.MeshStandardMaterial({
			color,
			transparent: true,
			opacity: 0.58,
			roughness: 0.55,
			metalness: 0.1
		})
	);

	mesh.position.copy(toVector(center));
	mesh.rotation.y = rotationY;

	const edges = new THREE.LineSegments(
		new THREE.EdgesGeometry(box),
		new THREE.LineBasicMaterial({ color, transparent: true, opacity: 1 })
	);
	edges.position.copy(mesh.position);
	edges.rotation.copy(mesh.rotation);

	group.add(mesh, edges);
	return group;
}

function createProjectTrajectories(geometry: VeinGeometry, colors: { perpendicular: string; diagonal: string }): THREE.Group {
	const group = new THREE.Group();
	const radius = Math.max(0.07, geometry.extent * 0.006);

	for (const trajectory of geometry.trajectories) {
		const start = toVector(trajectory.start);
		const end = toVector(trajectory.end);
		const direction = end.clone().sub(start);
		const length = direction.length();
		const color = trajectory.id === 'perpendicular' ? colors.perpendicular : colors.diagonal;
		const material = new THREE.MeshStandardMaterial({
			color,
			roughness: 0.35,
			metalness: 0.15
		});

		const tube = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, length, 10), material);
		tube.position.copy(start.clone().add(end).multiplyScalar(0.5));
		tube.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());

		const arrow = new THREE.Mesh(new THREE.ConeGeometry(radius * 2.5, radius * 6, 12), material);
		arrow.position.copy(end);
		arrow.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());

		const origin = new THREE.Mesh(
			new THREE.SphereGeometry(radius * 1.8, 12, 12),
			new THREE.MeshStandardMaterial({ color, roughness: 0.4 })
		);
		origin.position.copy(start);

		group.add(tube, arrow, origin);
	}

	return group;
}

function createGrid(geometry: VeinGeometry, color: string): THREE.Group {
	const group = new THREE.Group();
	const grid = new THREE.GridHelper(geometry.gridSize, 20, color, color);
	const material = grid.material as THREE.LineBasicMaterial;

	material.transparent = true;
	material.opacity = 0.28;
	grid.position.y = geometry.groundY;
	group.add(grid);

	const northDirection = toVector(geometry.northArrow.to).sub(toVector(geometry.northArrow.from)).normalize();
	const arrowLength = toVector(geometry.northArrow.to).distanceTo(toVector(geometry.northArrow.from));
	const northArrow = new THREE.ArrowHelper(
		northDirection,
		toVector(geometry.northArrow.from),
		arrowLength,
		color,
		arrowLength * 0.18,
		arrowLength * 0.1
	);

	group.add(northArrow);
	return group;
}

function createLabels(geometry: VeinGeometry): THREE.Group {
	const group = new THREE.Group();

	for (const label of geometry.labels) {
		const element = document.createElement('div');
		element.textContent = label.text;
		element.style.cssText = [
			'padding: 3px 7px',
			'border-radius: 6px',
			'background: rgba(15, 23, 42, 0.88)',
			'border: 1px solid rgba(255, 255, 255, 0.2)',
			'color: #fff',
			'font: 600 11px/1.35 Inter, Arial, sans-serif',
			'letter-spacing: 0.02em',
			'white-space: nowrap',
			'pointer-events: none',
			'user-select: none'
		].join(';');

		const object = new CSS2DObject(element);
		object.position.copy(toVector(label.position));
		group.add(object);
	}

	return group;
}

function disposeObject(root: THREE.Object3D): void {
	root.traverse((object) => {
		const mesh = object as THREE.Mesh;

		if (mesh.geometry) {
			mesh.geometry.dispose();
		}

		const material = (object as THREE.Mesh).material;

		if (Array.isArray(material)) {
			material.forEach((item) => disposeMaterial(item));
		} else if (material) {
			disposeMaterial(material);
		}
	});
}

function disposeMaterial(material: THREE.Material): void {
	const texture = (material as THREE.MeshStandardMaterial).map;
	texture?.dispose();
	material.dispose();
}

/**
 * Builds the Three.js graph. The function is renderer-agnostic: it only
 * creates meshes, so the React component stays focused on lifecycle.
 */
export function buildVeinThreeScene(geometry: VeinGeometry, palette: ThreeScenePalette): BuiltVeinScene {
	const root = new THREE.Group();
	root.name = 'sofi-vein-scene';

	const layers: SceneLayers = {
		vein: createVeinPlane(geometry, palette.vein),
		projects: createProjectTrajectories(geometry, {
			perpendicular: palette.perpendicular,
			diagonal: palette.diagonal
		}),
		grid: createGrid(geometry, palette.grid),
		labels: createLabels(geometry)
	};

	const front = createFront(geometry, palette.front);
	root.add(layers.grid, layers.vein, front, layers.projects, layers.labels);

	const hemisphere = new THREE.HemisphereLight(0xffffff, 0x334155, 1.35);
	const key = new THREE.DirectionalLight(0xffffff, 2.1);
	key.position.set(18, 28, 22);
	const fill = new THREE.DirectionalLight(0xffffff, 0.75);
	fill.position.set(-22, 12, -16);
	root.add(hemisphere, key, fill);

	return {
		root,
		layers,
		bounds: new THREE.Box3(toVector(geometry.bounds.min), toVector(geometry.bounds.max)),
		dispose: () => disposeObject(root)
	};
}
