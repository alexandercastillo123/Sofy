'use client';

import { useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Link from '@fuse/core/Link';
import PageHeader from '../../sofi/components/ui/PageHeader';
import SectionCard from '../../sofi/components/ui/SectionCard';
import StatCard from '../../sofi/components/ui/StatCard';
import VeinScene3D from '../../sofi/components/three/VeinScene3D';
import SceneLegend from '../../sofi/components/three/SceneLegend';
import SceneLayerControls from '../../sofi/components/three/SceneLayerControls';
import type { SceneLayerVisibility } from '../../sofi/components/three/VeinScene3DCanvas';
import { useProject } from '../../sofi/hooks/useProject';
import { summarizeProject } from '../../sofi/domain/projectSummary';
import { CURRENCY_OPTIONS } from '../../sofi/data/defaults';
import { formatMoney, formatNumber } from '../../sofi/lib/format';
import ProjectSimulationSidebar from './ProjectSimulationSidebar';

function SimulationSkeleton() {
	return (
		<div className="flex flex-col gap-4">
			<Skeleton
				variant="rounded"
				height={90}
			/>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{Array.from({ length: 4 }).map((_, index) => (
					<Skeleton
						key={index}
						variant="rounded"
						height={132}
					/>
				))}
			</div>
			<Skeleton
				variant="rounded"
				height={600}
			/>
		</div>
	);
}

function ProjectSimulationView({ projectId }: { projectId: string }) {
	const { data: project, isLoading } = useProject(projectId);
	const [layers, setLayers] = useState<SceneLayerVisibility>({
		vein: true,
		projects: true,
		grid: true,
		labels: true
	});
	const summary = useMemo(() => (project ? summarizeProject(project) : null), [project]);
	const currency = CURRENCY_OPTIONS[0];

	if (isLoading) {
		return (
			<div className="flex flex-auto flex-col p-4 md:p-6 lg:p-8">
				<SimulationSkeleton />
			</div>
		);
	}

	if (!project || !summary) {
		return (
			<div className="flex flex-auto flex-col p-4 md:p-6 lg:p-8">
				<SectionCard
					title="Simulación no disponible"
					subtitle={`No se encontró el proyecto ${projectId}.`}
				>
					<Button
						component={Link}
						to="/proyectos"
						variant="contained"
						startIcon={<FuseSvgIcon size={16}>lucide:arrow-left</FuseSvgIcon>}
						className="self-start rounded-lg"
					>
						Volver a proyectos
					</Button>
				</SectionCard>
			</div>
		);
	}

	return (
		<div className="flex flex-auto flex-col p-4 md:p-6 lg:p-8">
			<PageHeader
				eyebrow={`${project.code} · ${project.location.zone}`}
				title={`Simulación 3D · ${project.name}`}
				subtitle="Modelo interactivo de la veta, el frente de labor y las dos trayectorias calculadas."
				actions={
					<>
						<Button
							component={Link}
							to={`/proyectos/${project.id}`}
							variant="outlined"
							color="inherit"
							startIcon={<FuseSvgIcon size={16}>lucide:file-text</FuseSvgIcon>}
							className="rounded-lg"
						>
							Ver detalle
						</Button>
						<Button
							component={Link}
							to="/proyectos"
							variant="contained"
							startIcon={<FuseSvgIcon size={16}>lucide:arrow-left</FuseSvgIcon>}
							className="rounded-lg"
						>
							Proyectos
						</Button>
					</>
				}
			/>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<StatCard
					label="Rumbo"
					value={summary.analysis.label}
					hint={`${summary.analysis.caseId} · ${summary.analysis.zone}`}
					icon="lucide:compass"
					accent="primary"
				/>
				<StatCard
					label="Buzamiento"
					value={`${project.input.dip}° ${summary.analysis.dipDirection}`}
					hint={`Sección ${project.input.section.height} × ${project.input.section.width} m`}
					icon="lucide:trending-down"
					accent="warning"
				/>
				<StatCard
					label="Tonelaje"
					value={`${formatNumber(summary.totalTonnage / 1000, 1)}k Tn`}
					hint={`${formatNumber(summary.totalVolume, 0)} m³ in situ`}
					icon="lucide:weight"
					accent="success"
				/>
				<StatCard
					label="Inversión"
					value={formatMoney(summary.totalCost, currency)}
					hint={`${formatNumber(project.input.blasting.costPerMeter, 0)} S/. por metro`}
					icon="lucide:wallet"
					accent="info"
				/>
			</div>

			<div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
				<SectionCard
					title="Simulación interactiva"
					subtitle="Three.js calcula la escena en tiempo real a partir de la geometría del proyecto."
					action={
						<div className="hidden lg:block">
							<SceneLegend />
						</div>
					}
				>
					<div className="mb-3">
						<SceneLayerControls
							value={layers}
							onChange={setLayers}
						/>
					</div>
					<VeinScene3D
						input={project.input}
						analysis={summary.analysis}
						projects={summary.projects}
						layers={layers}
						height="min(68vh, 640px)"
					/>
					<Typography
						className="mt-3 flex items-center gap-1.5"
						color="text.secondary"
					>
						<FuseSvgIcon size={14}>lucide:mouse-pointer-2</FuseSvgIcon>
						La vista se adapta al tamaño de la pantalla. Usa los controles superiores para centrar o
						entrar a pantalla completa.
					</Typography>
				</SectionCard>

				<ProjectSimulationSidebar
					project={project}
					summary={summary}
				/>
			</div>
		</div>
	);
}

export default ProjectSimulationView;
