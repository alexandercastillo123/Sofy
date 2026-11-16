'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import clsx from 'clsx';
import { ProjectResult, VeinAnalysis, VeinInput } from '../../domain/types';
import { buildVeinGeometry } from '../../lib/veinGeometry';
import { buildVeinThreeScene, SceneLayers } from '../../three/buildVeinThreeScene';

export type SceneLayerVisibility = {
	vein: boolean;
	projects: boolean;
	grid: boolean;
	labels: boolean;
};

export type VeinScene3DProps = {
	input: VeinInput;
	analysis: VeinAnalysis;
	projects: ProjectResult[];
	layers?: Partial<SceneLayerVisibility>;
	height?: number | string;
	className?: string;
};

const DEFAULT_LAYERS: SceneLayerVisibility = {
	vein: true,
	projects: true,
	grid: true,
	labels: true
};

function VeinScene3DCanvas({ input, analysis, projects, layers, height = 480, className }: VeinScene3DProps) {
	const theme = useTheme();
	const frameRef = useRef<HTMLDivElement>(null);
	const hostRef = useRef<HTMLDivElement>(null);
	const layersRef = useRef<SceneLayers | null>(null);
	const resetViewRef = useRef<() => void>(() => {});
	const latestVisibility = useRef<SceneLayerVisibility>({ ...DEFAULT_LAYERS, ...layers });
	const [error, setError] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);

	const palette = useMemo(
		() => ({
			vein: '#2f7df6',
			front: '#f59e0b',
			perpendicular: '#22c55e',
			diagonal: '#6366f1',
			grid: '#64748b',
			background: theme.palette.mode === 'dark' ? '#0b1220' : '#f8fafc'
		}),
		[theme.palette.mode]
	);

	useEffect(() => {
		latestVisibility.current = { ...DEFAULT_LAYERS, ...layers };
		const current = layersRef.current;

		if (current) {
			current.vein.visible = latestVisibility.current.vein;
			current.projects.visible = latestVisibility.current.projects;
			current.grid.visible = latestVisibility.current.grid;
			current.labels.visible = latestVisibility.current.labels;
		}
	}, [layers]);

	useEffect(() => {
		const host = hostRef.current;

		if (!host) {
			return;
		}

		let renderer: THREE.WebGLRenderer;

		try {
			renderer = new THREE.WebGLRenderer({
				antialias: true,
				powerPreference: 'high-performance'
			});
		} catch {
			setError(true);
			return;
		}

		setError(false);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.outputColorSpace = THREE.SRGBColorSpace;
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1.05;
		renderer.domElement.setAttribute('aria-label', 'Simulación 3D interactiva de la veta y los proyectos');
		host.appendChild(renderer.domElement);

		const labelRenderer = new CSS2DRenderer();
		labelRenderer.domElement.style.position = 'absolute';
		labelRenderer.domElement.style.top = '0';
		labelRenderer.domElement.style.left = '0';
		labelRenderer.domElement.style.pointerEvents = 'none';
		host.appendChild(labelRenderer.domElement);

		const scene = new THREE.Scene();
		scene.background = new THREE.Color(palette.background);

		const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 5000);
		const geometry = buildVeinGeometry(input, analysis, projects);
		const built = buildVeinThreeScene(geometry, palette);
		layersRef.current = built.layers;
		built.layers.vein.visible = latestVisibility.current.vein;
		built.layers.projects.visible = latestVisibility.current.projects;
		built.layers.grid.visible = latestVisibility.current.grid;
		built.layers.labels.visible = latestVisibility.current.labels;
		scene.add(built.root);

		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = 0.075;
		controls.screenSpacePanning = false;
		controls.minPolarAngle = 0.12;
		controls.maxPolarAngle = Math.PI / 2.04;

		const fitView = () => {
			const size = built.bounds.getSize(new THREE.Vector3());
			const center = built.bounds.getCenter(new THREE.Vector3());
			const maxDimension = Math.max(size.x, size.y, size.z, 1);
			const fitHeightDistance = maxDimension / (2 * Math.tan((camera.fov * Math.PI) / 360));
			const fitWidthDistance = fitHeightDistance / Math.max(camera.aspect, 0.35);
			const distance = Math.max(fitHeightDistance, fitWidthDistance) * 1.22;
			const direction = new THREE.Vector3(0.9, 0.62, 1).normalize();

			camera.position.copy(center).add(direction.multiplyScalar(distance));
			camera.near = Math.max(0.1, distance / 120);
			camera.far = Math.max(2000, distance * 12);
			camera.updateProjectionMatrix();
			controls.target.copy(center);
			controls.minDistance = Math.max(2, distance * 0.16);
			controls.maxDistance = distance * 4.5;
			controls.update();
		};

		const resize = () => {
			const width = Math.max(host.clientWidth, 1);
			const heightValue = Math.max(host.clientHeight, 1);

			renderer.setSize(width, heightValue, false);
			labelRenderer.setSize(width, heightValue);
			camera.aspect = width / heightValue;
			camera.updateProjectionMatrix();
		};

		resize();
		fitView();
		resetViewRef.current = fitView;

		const observer = new ResizeObserver(resize);
		observer.observe(host);

		const renderFrame = () => {
			controls.update();
			renderer.render(scene, camera);
			labelRenderer.render(scene, camera);
			frameId = window.requestAnimationFrame(renderFrame);
		};

		let frameId = window.requestAnimationFrame(renderFrame);

		const handleFullscreenChange = () => {
			setIsFullscreen(Boolean(document.fullscreenElement));
			window.setTimeout(resize, 50);
		};

		document.addEventListener('fullscreenchange', handleFullscreenChange);

		return () => {
			window.cancelAnimationFrame(frameId);
			document.removeEventListener('fullscreenchange', handleFullscreenChange);
			observer.disconnect();
			controls.dispose();
			built.dispose();
			renderer.dispose();
			renderer.domElement.remove();
			labelRenderer.domElement.remove();
			layersRef.current = null;
		};
	}, [input, analysis, projects, palette]);

	const toggleFullscreen = async () => {
		if (!frameRef.current) {
			return;
		}

		if (document.fullscreenElement) {
			await document.exitFullscreen();
		} else {
			await frameRef.current.requestFullscreen();
		}
	};

	return (
		<div
			ref={frameRef}
			className={clsx(
				'relative overflow-hidden rounded-xl border bg-slate-50 [&:fullscreen]:h-screen [&:fullscreen]:w-screen [&:fullscreen]:rounded-none',
				className
			)}
			style={{ height, borderColor: 'var(--mui-palette-divider)' }}
		>
			<div
				ref={hostRef}
				className="absolute inset-0 h-full w-full [&_canvas]:block [&_canvas]:h-full [&_canvas]:w-full"
			/>

			{error ? (
				<div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
					<FuseSvgIcon
						size={32}
						className="text-text-secondary"
					>
						lucide:box
					</FuseSvgIcon>
					<Typography className="font-semibold">No se pudo iniciar WebGL</Typography>
					<Typography color="text.secondary">
						Actualiza el navegador o habilita la aceleración por hardware para ver la simulación.
					</Typography>
				</div>
			) : null}

			<div className="pointer-events-none absolute top-3 left-3 flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/70 px-3 py-1.5 text-white backdrop-blur">
				<span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
				<span className="text-[10px] font-semibold tracking-[0.14em] uppercase">Three.js · WebGL</span>
			</div>

			<div className="absolute top-3 right-3 flex items-center gap-1 rounded-lg border border-white/15 bg-slate-950/70 p-1 text-white backdrop-blur">
				<Tooltip title="Centrar vista">
					<IconButton
						size="small"
						className="text-white"
						onClick={() => resetViewRef.current()}
					>
						<FuseSvgIcon size={16}>lucide:focus</FuseSvgIcon>
					</IconButton>
				</Tooltip>
				<Tooltip title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}>
					<IconButton
						size="small"
						className="text-white"
						onClick={toggleFullscreen}
					>
						<FuseSvgIcon size={16}>
							{isFullscreen ? 'lucide:minimize-2' : 'lucide:maximize-2'}
						</FuseSvgIcon>
					</IconButton>
				</Tooltip>
			</div>

			<div className="pointer-events-none absolute right-3 bottom-3 left-3 flex flex-wrap items-end justify-between gap-2 text-[11px] text-slate-200">
				<span className="rounded-md bg-slate-950/65 px-2.5 py-1.5 backdrop-blur">
					Arrastra para rotar · Rueda para acercar · Clic derecho para desplazar
				</span>
				<span className="rounded-md bg-slate-950/65 px-2.5 py-1.5 backdrop-blur">
					{analysis.label} · buz. {input.dip}° {analysis.dipDirection}
				</span>
			</div>
		</div>
	);
}

export default VeinScene3DCanvas;
