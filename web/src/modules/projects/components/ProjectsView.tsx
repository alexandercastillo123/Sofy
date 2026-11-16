'use client';

import { useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Link from '@fuse/core/Link';
import PageHeader from '../../sofi/components/ui/PageHeader';
import SectionCard from '../../sofi/components/ui/SectionCard';
import { useProjects } from '../../sofi/hooks/useProjects';
import { ProjectStatus } from '../../sofi/domain/types';
import ProjectMetrics from './ProjectMetrics';
import ProjectsToolbar from './ProjectsToolbar';
import ProjectTable from './ProjectTable';
import ProjectCardList from './ProjectCardList';

function ProjectsSkeleton() {
	return (
		<div className="flex flex-col gap-4">
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

function ProjectsView() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const { data, isLoading, isError, refetch } = useProjects();
	const [query, setQuery] = useState('');
	const [status, setStatus] = useState<ProjectStatus | 'all'>('all');
	const [zone, setZone] = useState('all');

	const projects = data ?? [];
	const zones = useMemo(() => [...new Set(projects.map((project) => project.location.zone))], [projects]);

	const filteredProjects = useMemo(() => {
		const term = query.trim().toLowerCase();

		return projects.filter((project) => {
			const matchesStatus = status === 'all' || project.status === status;
			const matchesZone = zone === 'all' || project.location.zone === zone;
			const matchesQuery =
				!term ||
				[
					project.name,
					project.code,
					project.location.sector,
					project.location.district,
					project.createdBy.name
				].some((value) => value.toLowerCase().includes(term));

			return matchesStatus && matchesZone && matchesQuery;
		});
	}, [projects, query, status, zone]);

	return (
		<div className="flex flex-auto flex-col p-4 md:p-6 lg:p-8">
			<PageHeader
				eyebrow="Portafolio"
				title="Proyectos"
				subtitle="Consulta los proyectos que ya fueron creados y calculados en la app móvil Sofy Corte de Vetas."
				actions={
					<>
						<Button
							variant="outlined"
							color="inherit"
							startIcon={<FuseSvgIcon size={16}>lucide:refresh-cw</FuseSvgIcon>}
							className="rounded-lg"
							onClick={() => refetch()}
						>
							Actualizar
						</Button>
						<Button
							component={Link}
							to="/rumbo-de-veta"
							variant="contained"
							startIcon={<FuseSvgIcon size={16}>lucide:plus</FuseSvgIcon>}
							className="rounded-lg"
						>
							Nuevo análisis
						</Button>
					</>
				}
			/>

			{isLoading ? (
				<ProjectsSkeleton />
			) : isError ? (
				<SectionCard
					title="No se pudieron cargar los proyectos"
					subtitle="La fuente de datos simulada no respondió."
				>
					<Button
						variant="outlined"
						onClick={() => refetch()}
						className="self-start rounded-lg"
					>
						Reintentar
					</Button>
				</SectionCard>
			) : (
				<>
					<ProjectMetrics projects={projects} />

					<SectionCard
						className="mt-4"
						title="Proyectos registrados"
						subtitle="Cabecera, ubicación, coordenada, autor y fecha de cada proyecto."
						action={
							<Chip
								size="small"
								label={`${filteredProjects.length} de ${projects.length}`}
								variant="outlined"
								className="rounded-md"
							/>
						}
						contentClassName="pt-0"
					>
						<ProjectsToolbar
							query={query}
							onQueryChange={setQuery}
							status={status}
							onStatusChange={setStatus}
							zone={zone}
							onZoneChange={setZone}
							zones={zones}
						/>

						{filteredProjects.length ? (
							isMobile ? (
								<ProjectCardList projects={filteredProjects} />
							) : (
								<ProjectTable projects={filteredProjects} />
							)
						) : (
							<div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
								<FuseSvgIcon
									size={32}
									className="text-text-secondary"
								>
									lucide:folder-search
								</FuseSvgIcon>
								<Typography className="font-semibold">No hay proyectos con ese filtro</Typography>
								<Typography color="text.secondary">
									Prueba con otro nombre, estado o zona.
								</Typography>
							</div>
						)}
					</SectionCard>
				</>
			)}
		</div>
	);
}

export default ProjectsView;
