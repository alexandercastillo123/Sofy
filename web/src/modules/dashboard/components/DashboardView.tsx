'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Link from '@fuse/core/Link';
import { useDashboardData } from '../../sofi/hooks/useDashboardData';
import useSofiWorkspace from '../../sofi/contexts/useSofiWorkspace';
import PageHeader from '../../sofi/components/ui/PageHeader';
import SectionCard from '../../sofi/components/ui/SectionCard';
import { ProductionChart, ZonesChart } from '../../sofi/components/charts/DashboardCharts';
import { CURRENCY_OPTIONS } from '../../sofi/data/defaults';
import { formatDate } from '../../sofi/lib/format';
import DashboardMetrics from './DashboardMetrics';
import LatestAnalysisCard from './LatestAnalysisCard';
import RecentProjectsTable from './RecentProjectsTable';

function DashboardSkeleton() {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{Array.from({ length: 4 }).map((_, index) => (
				<Skeleton
					key={index}
					variant="rounded"
					height={132}
				/>
			))}
		</div>
	);
}

function DashboardView() {
	const { data, isLoading } = useDashboardData();
	const { analysis, projects, input, lastUpdated } = useSofiWorkspace();
	const currency = CURRENCY_OPTIONS[0];

	return (
		<div className="flex flex-auto flex-col p-4 md:p-6 lg:p-8">
			<PageHeader
				eyebrow="Centro de control"
				title="Panel operativo"
				subtitle="Resumen de proyectos, avance de producción y análisis geomecánicos del turno."
				actions={
					<>
						<Button
							variant="outlined"
							color="inherit"
							startIcon={<FuseSvgIcon size={16}>lucide:calendar-days</FuseSvgIcon>}
							className="rounded-lg"
						>
							{formatDate(lastUpdated.toISOString())}
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

			{isLoading || !data ? (
				<DashboardSkeleton />
			) : (
				<DashboardMetrics
					data={data}
					analysis={analysis}
					currency={currency}
				/>
			)}

			<div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
				<SectionCard
					className="lg:col-span-2"
					title="Producción y costo"
					subtitle="Tonelaje movido y costo operativo de los últimos 6 meses"
					action={
						<div className="flex items-center gap-4">
							<span className="flex items-center gap-1.5">
								<Box
									component="span"
									className="inline-block h-2 w-2 rounded-full"
									sx={{ backgroundColor: 'primary.main' }}
								/>
								<Typography color="text.secondary">Tonelaje</Typography>
							</span>
							<span className="flex items-center gap-1.5">
								<span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
								<Typography color="text.secondary">Costo</Typography>
							</span>
						</div>
					}
				>
					{data ? (
						<ProductionChart data={data.production} />
					) : (
						<Skeleton
							variant="rounded"
							height={260}
						/>
					)}
				</SectionCard>

				<SectionCard
					title="Proyectos por zona"
					subtitle="Distribución del portafolio"
				>
					{data ? (
						<ZonesChart data={data.zones} />
					) : (
						<Skeleton
							variant="rounded"
							height={260}
						/>
					)}
				</SectionCard>
			</div>

			<div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
				{data ? (
					<RecentProjectsTable
						projects={data.projects}
						currency={currency}
					/>
				) : (
					<SectionCard
						className="lg:col-span-2"
						title="Proyectos recientes"
					>
						<Skeleton
							variant="rounded"
							height={280}
						/>
					</SectionCard>
				)}

				<LatestAnalysisCard
					analysis={analysis}
					input={input}
					projects={projects}
				/>
			</div>
		</div>
	);
}

export default DashboardView;
