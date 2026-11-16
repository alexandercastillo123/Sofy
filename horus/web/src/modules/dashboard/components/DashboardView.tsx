'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Link from '@fuse/core/Link';
import { useDashboardData } from '../../horus/hooks/useDashboardData';
import useHorusWorkspace from '../../horus/contexts/useHorusWorkspace';
import PageHeader from '../../horus/components/ui/PageHeader';
import SectionCard from '../../horus/components/ui/SectionCard';
import StatCard from '../../horus/components/ui/StatCard';
import StatusChip from '../../horus/components/ui/StatusChip';
import { ProductionChart, ZonesChart } from '../../horus/components/charts/DashboardCharts';
import { formatDate, formatMoney, formatNumber } from '../../horus/lib/format';
import { CURRENCY_OPTIONS } from '../../horus/data/defaults';

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
	const { analysis, projects, input, lastUpdated } = useHorusWorkspace();
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
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					<StatCard
						label="Proyectos activos"
						value={`${data.metrics.activeProjects}`}
						hint={`${data.projects.length} proyectos registrados`}
						icon="lucide:pickaxe"
						accent="primary"
						footer={
							<div className="flex items-center gap-1 text-green-600">
								<FuseSvgIcon size={13}>lucide:trending-up</FuseSvgIcon>
								<Typography className="text-sm font-medium">+2 este mes</Typography>
							</div>
						}
					/>
					<StatCard
						label="Rumbo promedio"
						value={`${formatNumber(data.metrics.averageStrike, 1)}°`}
						hint={analysis.label}
						icon="lucide:compass"
						accent="info"
						footer={
							<Typography color="text.secondary">
								Último cálculo: {formatNumber(analysis.strike, 1)}° · {analysis.caseId}
							</Typography>
						}
					/>
					<StatCard
						label="Inversión estimada"
						value={formatMoney(data.metrics.estimatedInvestment, currency)}
						hint="Inversión acumulada del portafolio"
						icon="lucide:wallet"
						accent="warning"
						footer={
							<Typography color="text.secondary">
								{formatMoney(data.projects[0].cost, currency)} en el proyecto líder
							</Typography>
						}
					/>
					<StatCard
						label="Tonelaje proyectado"
						value={`${formatNumber(data.metrics.projectedTonnage / 1000, 1)}k Tn`}
						hint="Volumen económico estimado"
						icon="lucide:mountain"
						accent="success"
						footer={
							<div className="flex items-center gap-1 text-green-600">
								<FuseSvgIcon size={13}>lucide:trending-up</FuseSvgIcon>
								<Typography className="text-sm font-medium">+12.4% vs. mes anterior</Typography>
							</div>
						}
					/>
				</div>
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
				<SectionCard
					className="lg:col-span-2"
					title="Proyectos recientes"
					subtitle="Últimos análisis registrados por el equipo"
					action={
						<Button
							component={Link}
							to="/resultados-3d"
							size="small"
							endIcon={<FuseSvgIcon size={14}>lucide:arrow-right</FuseSvgIcon>}
						>
							Ver resultados
						</Button>
					}
					contentClassName="pt-0"
				>
					<TableContainer className="min-h-0 flex-auto overflow-auto">
						<Table
							size="small"
							stickyHeader
						>
							<TableHead>
								<TableRow>
									<TableCell>Proyecto</TableCell>
									<TableCell>Zona</TableCell>
									<TableCell align="right">Rumbo</TableCell>
									<TableCell>Estado</TableCell>
									<TableCell align="right">Tonelaje</TableCell>
									<TableCell align="right">Inversión</TableCell>
									<TableCell>Actualizado</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{(data?.projects ?? []).map((project) => (
									<TableRow
										key={project.id}
										hover
									>
										<TableCell>
											<div className="flex flex-col">
												<Typography className="font-semibold">{project.name}</Typography>
												<Typography
													className="text-sm"
													color="text.secondary"
												>
													{project.code} · {project.analyst}
												</Typography>
											</div>
										</TableCell>
										<TableCell>{project.zone}</TableCell>
										<TableCell align="right">{formatNumber(project.strike, 1)}°</TableCell>
										<TableCell>
											<StatusChip status={project.status} />
										</TableCell>
										<TableCell align="right">{formatNumber(project.tonnage, 0)} Tn</TableCell>
										<TableCell align="right">{formatMoney(project.cost, currency)}</TableCell>
										<TableCell>
											<Typography color="text.secondary">
												{formatDate(project.updatedAt)}
											</Typography>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</SectionCard>

				<SectionCard
					title="Último análisis"
					subtitle="Workspace activo compartido entre módulos"
				>
					<Box
						className="mb-4 rounded-lg p-4"
						sx={(theme) => ({
							backgroundColor: theme.palette.action.hover
						})}
					>
						<Typography
							className="text-[11px] font-semibold tracking-[0.12em] uppercase"
							color="text.secondary"
						>
							Rumbo de veta
						</Typography>
						<Typography className="mt-1 text-3xl font-bold tracking-tight">{analysis.label}</Typography>
						<Typography
							className="mt-1"
							color="text.secondary"
						>
							{analysis.caseId} · {analysis.zone} · Formato {analysis.format} · Buzamiento {input.dip}°
							hacia {analysis.dipDirection}
						</Typography>
					</Box>

					<div className="grid grid-cols-2 gap-3">
						<div className="rounded-lg border p-3">
							<Typography
								color="text.secondary"
								className="text-[11px] tracking-wide uppercase"
							>
								Perpendicular
							</Typography>
							<Typography className="mt-1 text-lg font-semibold">
								{formatNumber(projects[0].distance, 1)} m
							</Typography>
							<Typography color="text.secondary">{formatNumber(projects[0].tonnage, 0)} Tn</Typography>
						</div>
						<div className="rounded-lg border p-3">
							<Typography
								color="text.secondary"
								className="text-[11px] tracking-wide uppercase"
							>
								Diagonal
							</Typography>
							<Typography className="mt-1 text-lg font-semibold">
								{formatNumber(projects[1].distance, 1)} m
							</Typography>
							<Typography color="text.secondary">{formatNumber(projects[1].tonnage, 0)} Tn</Typography>
						</div>
					</div>

					<Button
						component={Link}
						to="/resultados-3d"
						variant="outlined"
						fullWidth
						className="mt-4 rounded-lg"
						startIcon={<FuseSvgIcon size={16}>lucide:box</FuseSvgIcon>}
					>
						Abrir resultados 3D
					</Button>
				</SectionCard>
			</div>
		</div>
	);
}

export default DashboardView;
