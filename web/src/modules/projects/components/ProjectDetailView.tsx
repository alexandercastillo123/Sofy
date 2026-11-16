'use client';

import { useMemo } from 'react';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Link from '@fuse/core/Link';
import PageHeader from '../../sofi/components/ui/PageHeader';
import SectionCard from '../../sofi/components/ui/SectionCard';
import StatusChip from '../../sofi/components/ui/StatusChip';
import CalculatedProjectCard from '../../sofi/components/projects/CalculatedProjectCard';
import { useProject } from '../../sofi/hooks/useProject';
import { summarizeProject } from '../../sofi/domain/projectSummary';
import { CURRENCY_OPTIONS } from '../../sofi/data/defaults';
import ProjectIdentityCard from './ProjectIdentityCard';
import ProjectSummaryMetrics from './ProjectSummaryMetrics';
import ProjectGeometryCard from './ProjectGeometryCard';
import ProjectSceneCTA from './ProjectSceneCTA';

function ProjectDetailSkeleton() {
	return (
		<div className="flex flex-col gap-4">
			<Skeleton
				variant="rounded"
				height={92}
			/>
			<Skeleton
				variant="rounded"
				height={220}
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
				height={420}
			/>
		</div>
	);
}

function ProjectDetailView({ projectId }: { projectId: string }) {
	const { data: project, isLoading } = useProject(projectId);
	const summary = useMemo(() => (project ? summarizeProject(project) : null), [project]);
	const currency = CURRENCY_OPTIONS[0].id;

	if (isLoading) {
		return (
			<div className="flex flex-auto flex-col p-4 md:p-6 lg:p-8">
				<ProjectDetailSkeleton />
			</div>
		);
	}

	if (!project || !summary) {
		return (
			<div className="flex flex-auto flex-col p-4 md:p-6 lg:p-8">
				<SectionCard
					title="Proyecto no encontrado"
					subtitle={`No existe un proyecto con el identificador ${projectId}.`}
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
				title={project.name}
				subtitle={project.description}
				actions={
					<>
						<StatusChip status={project.status} />
						<Button
							component={Link}
							to="/proyectos"
							variant="outlined"
							color="inherit"
							startIcon={<FuseSvgIcon size={16}>lucide:arrow-left</FuseSvgIcon>}
							className="rounded-lg"
						>
							Proyectos
						</Button>
						<Button
							component={Link}
							to={`/proyectos/${project.id}/simulacion-3d`}
							variant="contained"
							startIcon={<FuseSvgIcon size={16}>lucide:box</FuseSvgIcon>}
							className="rounded-lg"
						>
							Simulación 3D
						</Button>
					</>
				}
			/>

			<ProjectIdentityCard project={project} />

			<div className="mt-4">
				<ProjectSummaryMetrics summary={summary} />
			</div>

			<div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
				<ProjectGeometryCard
					input={project.input}
					analysis={summary.analysis}
					projects={summary.projects}
				/>
				<ProjectSceneCTA
					projectId={project.id}
					projectName={project.name}
				/>
			</div>

			<div className="mt-6">
				<Typography className="text-lg font-semibold tracking-tight">Alternativas calculadas</Typography>
				<Typography
					className="mb-3"
					color="text.secondary"
				>
					Resumen numérico de los dos proyectos que se guardaron desde el celular.
				</Typography>
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
					{summary.projects.map((calculated) => (
						<CalculatedProjectCard
							key={calculated.id}
							project={calculated}
							currency={currency}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default ProjectDetailView;
