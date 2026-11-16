import * as THREE from 'three';
import { SimulatorPreset } from '../../data/simulatorPresets';

export interface SceneLayersConfig {
  vein: boolean;
  projects: boolean;
  grid: boolean;
}

export interface BuiltScene {
  root: THREE.Group;
  layers: {
    vein: THREE.Group;
    projects: THREE.Group;
    grid: THREE.Group;
  };
  dispose: () => void;
}

const DEG_TO_RAD = Math.PI / 180;

export function buildVeinScene(preset: SimulatorPreset): BuiltScene {
  const root = new THREE.Group();
  root.name = 'sofi-preset-scene';

  // Palette matching SOFI web platform
  const colors = {
    vein: 0x2f7df6,
    front: 0xf59e0b,
    perpendicular: 0x22c55e,
    diagonal: 0x6366f1,
    grid: 0x64748b
  };

  // 1. Grid & Coordinates
  const gridGroup = new THREE.Group();
  const grid = new THREE.GridHelper(40, 20, colors.grid, colors.grid);
  const gridMat = grid.material as THREE.LineBasicMaterial;
  gridMat.transparent = true;
  gridMat.opacity = 0.25;
  grid.position.y = -2;
  gridGroup.add(grid);

  // North Arrow
  const northDir = new THREE.Vector3(0, 0, 1).normalize();
  const northArrow = new THREE.ArrowHelper(northDir, new THREE.Vector3(0, -1.9, 0), 12, colors.grid, 2, 1);
  gridGroup.add(northArrow);

  // 2. Vein Plane
  const veinGroup = new THREE.Group();
  const strikeRad = preset.strike * DEG_TO_RAD;
  const dipRad = preset.dip * DEG_TO_RAD;
  const veinWidth = 32;
  const veinHeight = 26;

  const veinGeom = new THREE.PlaneGeometry(veinWidth, veinHeight);
  const veinMat = new THREE.MeshStandardMaterial({
    color: colors.vein,
    transparent: true,
    opacity: 0.35,
    side: THREE.DoubleSide,
    roughness: 0.7,
    metalness: 0.1,
    depthWrite: false
  });
  const veinMesh = new THREE.Mesh(veinGeom, veinMat);
  veinMesh.rotation.order = 'YXZ';
  veinMesh.rotation.y = strikeRad;
  veinMesh.rotation.x = dipRad;
  veinMesh.position.set(0, 4, 10);

  const veinEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(veinGeom),
    new THREE.LineBasicMaterial({ color: colors.vein, transparent: true, opacity: 0.85, linewidth: 2 })
  );
  veinEdges.rotation.order = 'YXZ';
  veinEdges.rotation.y = strikeRad;
  veinEdges.rotation.x = dipRad;
  veinEdges.position.set(0, 4, 10);

  veinGroup.add(veinMesh, veinEdges);

  // 3. Gallery Front Box (Frente de avance)
  const frontBoxGeom = new THREE.BoxGeometry(3, 3, 4);
  const frontBoxMat = new THREE.MeshStandardMaterial({
    color: colors.front,
    transparent: true,
    opacity: 0.65,
    roughness: 0.5,
    metalness: 0.1
  });
  const frontBox = new THREE.Mesh(frontBoxGeom, frontBoxMat);
  frontBox.position.set(0, 0, 0);

  const frontEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(frontBoxGeom),
    new THREE.LineBasicMaterial({ color: colors.front, transparent: true, opacity: 1 })
  );
  frontEdges.position.copy(frontBox.position);
  veinGroup.add(frontBox, frontEdges);

  // 4. Project Trajectories (EP & PC)
  const projectsGroup = new THREE.Group();

  // Helper for arrow tubes
  function createTrajectory(start: THREE.Vector3, end: THREE.Vector3, color: number) {
    const group = new THREE.Group();
    const dir = end.clone().sub(start);
    const len = dir.length();
    const radius = 0.22;

    const tubeGeom = new THREE.CylinderGeometry(radius, radius, len, 12);
    const tubeMat = new THREE.MeshStandardMaterial({ color, roughness: 0.35, metalness: 0.2 });
    const tube = new THREE.Mesh(tubeGeom, tubeMat);
    tube.position.copy(start.clone().add(end).multiplyScalar(0.5));
    tube.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());

    const coneGeom = new THREE.ConeGeometry(radius * 2.4, radius * 5, 16);
    const cone = new THREE.Mesh(coneGeom, tubeMat);
    cone.position.copy(end);
    cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());

    const sphereGeom = new THREE.SphereGeometry(radius * 1.8, 12, 12);
    const sphere = new THREE.Mesh(sphereGeom, tubeMat);
    sphere.position.copy(start);

    group.add(tube, cone, sphere);
    return group;
  }

  // Trajectory 1: Perpendicular (EP)
  const epStart = new THREE.Vector3(0, 0, 2);
  const epEnd = new THREE.Vector3(0, 1.8, preset.perpendicularDistance);
  const epTraj = createTrajectory(epStart, epEnd, colors.perpendicular);

  // Trajectory 2: Diagonal (PC)
  const pcStart = new THREE.Vector3(0, 0, 2);
  const pcEnd = new THREE.Vector3(8.5, 2.5, preset.diagonalDistance);
  const pcTraj = createTrajectory(pcStart, pcEnd, colors.diagonal);

  projectsGroup.add(epTraj, pcTraj);

  // Assemble scene
  root.add(gridGroup, veinGroup, projectsGroup);

  // Lighting
  const ambient = new THREE.HemisphereLight(0xffffff, 0x334155, 1.4);
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
  keyLight.position.set(15, 25, 20);
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
  fillLight.position.set(-20, 10, -15);
  root.add(ambient, keyLight, fillLight);

  return {
    root,
    layers: {
      vein: veinGroup,
      projects: projectsGroup,
      grid: gridGroup
    },
    dispose: () => {
      root.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else if (obj.material) {
            obj.material.dispose();
          }
        }
      });
    }
  };
}

