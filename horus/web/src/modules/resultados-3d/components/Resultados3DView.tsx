'use client';

import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Link from '@fuse/core/Link';
import useHorusWorkspace from '../../horus/contexts/useHorusWorkspace';
import PageHeader from '../../horus/components/ui/PageHeader';
import SectionCard from '../../horus/components/ui/SectionCard';
import StatCard from '../../horus/components/ui/StatCard';
import ResultRow from '../../horus/components/ui/ResultRow';
import Project3DPreview from '../../horus/components/charts/Project3DPreview';
import ProjectComparisonChart from '../../horus/components/charts/ProjectComparisonChart';
import { CURRENCY_OPTIONS } from '../../horus/data/defaults';
import { Currency, ProjectResult } from '../../horus/domain/types';
import { currencyOption, formatDateTime, formatMoney, formatNumber } from '../../horus/lib/format';

function ProjectDetailCard({ project, currency }: { project: ProjectResult; currency: Currency }) {
	const money = currencyOption(currency, CURRENCY_OPTIONS);

	return (
		<SectionCard
			className="h-full"
			title={project.name}
			subtitle={project.description}
			action={
				<Chip
					size="small"
					label={project.id === 'perpendicular' ? 'EP' : 'PC'}
					className="rounded-md font-semibold"
					color={project.id === 'perpendicular' ? 'success' : 'primary'}
					variant="outlined"
				/>
			}
		>
			<div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
				<div>
					<Typography
						color="text.secondary"
						className="text-[11px] font-semibold tracking-[0.12em] uppercase"
					>
						Geometría
					</Typography>
					<ResultRow
						label="Rumbo"
						value={project.strikeLabel}
					/>
					<ResultRow
						label="Azimut"
						value={formatNumber(project.azimuth, 1)}
						unit="°"
					/>
					<ResultRow
						label="Distancia"
						value={formatNumber(project.distance, 1)}
						unit="m"
						highlight
					/>
					<ResultRow
						label="Coord. Este"
						value={formatNumber(project.endpoint.east, 1)}
						unit="m"
					/>
					<ResultRow
						label="Coord. Norte"
						value={formatNumber(project.endpoint.north, 1)}
						unit="m"
					/>
				</div>
				<div>
					<Typography
						color="text.secondary"
						className="text-[11px] font-semibold tracking-[0.12em] uppercase"
					>
						Producción
					</Typography>
					<ResultRow
						label="Área de frente"
						value={formatNumber(project.area, 2)}
						unit="m²"
					/>
					<ResultRow
						label="Volumen"
						value={formatNumber(project.volume, 1)}
						unit="m³"
					/>
					<ResultRow
						label="Volumen esponjado"
						value={formatNumber(project.expandedVolume, 1)}
						unit="m³"
					/>
					<ResultRow
						label="Tonelaje"
						value={formatNumber(project.tonnage, 1)}
						unit="Tn"
						highlight
					/>
					<ResultRow
						label="Duración / disparos"
						value={`${formatNumber(project.durationDays, 0)} días · ${formatNumber(project.blasts, 0)}`}
					/>
				</div>
			</div>

			<div className="mt-4 flex items-end justify-between rounded-lg bg-[var(--mui-palette-action-hover)] p-4">
				<div>
					<Typography
						color="text.secondary"
						className="text-[11px] font-semibold tracking-[0.12em] uppercase"
					>
						Inversión estimada
					</Typography>
					<Typography className="mt-1 text-2xl font-bold tracking-tight">
						{formatMoney(project.cost, money)}
					</Typography>
				</div>
				<Typography color="text.secondary">
					{formatNumber(project.cost / project.distance, 0)} {money.symbol}/m
				</Typography>
			</div>
		</SectionCard>
	);
}

function Resultados3DView() {
	const { input, analysis, projects, currency, setCurrency, lastUpdated } = useHorusWorkspace();
	const { enqueueSnackbar } = useSnackbar();
	const money = currencyOption(currency, CURRENCY_OPTIONS);
	const totalCost = projects.reduce((total, project) => total + project.cost, 0);
	const totalTonnage = projects.reduce((total, project) => total + project.tonnage, 0);

	return (
		<div className="flex flex-auto flex-col p-4 md:p-6 lg:p-8">
			<PageHeader
				eyebrow="Módulo 02"
				title="Resultados 3D"
				subtitle={`Proyectos derivados del rumbo ${analysis.label} · ${analysis.caseId} · ${analysis.zone}. Actualizado ${formatDateTime(lastUpdated)}.`}
				actions={
					<>
						<Select
							size="small"
							value={currency}
							onChange={(event) => setCurrency(event.target.value as Currency)}
							className="min-w-36 rounded-lg"
							startAdornment={<FuseSvgIcon size={16}>lucide:coins</FuseSvgIcon>}
						>
							{CURRENCY_OPTIONS.map((option) => (
								<MenuItem
									key={option.id}
									value={option.id}
								>
									{option.label}
								</MenuItem>
							))}
						</Select>
						<Button
							variant="outlined"
							color="inherit"
							startIcon={<FuseSvgIcon size={16}>lucide:download</FuseSvgIcon>}
							className="rounded-lg"
							onClick={() =>
								enqueueSnackbar('Reporte de demostración generado correctamente.', {
									variant: 'success'
								})
							}
						>
							Exportar
						</Button>
						<Button
							component={Link}
							to="/rumbo-de-veta"
							variant="contained"
							startIcon={<FuseSvgIcon size={16}>lucide:calculator</FuseSvgIcon>}
							className="rounded-lg"
						>
							Recalcular
						</Button>
					</>
				}
			/>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<StatCard
					label="Proyecto perpendicular"
					value={`${formatNumber(projects[0].distance, 1)} m`}
					hint={`${formatNumber(projects[0].volume, 0)} m³ · ${formatNumber(projects[0].blasts, 0)} disparos`}
					icon="lucide:move-up-right"
					accent="success"
				/>
				<StatCard
					label="Proyecto diagonal"
					value={`${formatNumber(projects[1].distance, 1)} m`}
					hint={`${formatNumber(projects[1].volume, 0)} m³ · ${formatNumber(projects[1].blasts, 0)} disparos`}
					icon="lucide:move-diagonal"
					accent="primary"
				/>
				<StatCard
					label="Tonelaje total"
					value={`${formatNumber(totalTonnage / 1000, 1)}k Tn`}
					hint={`Densidad ${input.rock.density} Tn/m³ · esponjamiento ${input.rock.swellFactor}%`}
					icon="lucide:weight"
					accent="info"
				/>
				<StatCard
					label="Inversión total"
					value={formatMoney(totalCost, money)}
					hint={`${formatNumber(input.blasting.costPerMeter, 0)} S/. por metro`}
					icon="lucide:wallet"
					accent="warning"
				/>
			</div>

			<div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
				<SectionCard
					className="lg:col-span-2"
					title="Vista isométrica de proyectos"
					subtitle="Representación esquemática del plano de veta, el frente y los dos proyectos calculados."
					action={
						<div className="hidden items-center gap-3 sm:flex">
							<span className="flex items-center gap-1.5">
								<span className="inline-block h-2 w-2 rounded-full bg-green-500" />
								<Typography color="text.secondary">Perpendicular</Typography>
							</span>
							<span className="flex items-center gap-1.5">
								<span className="inline-block h-2 w-2 rounded-full bg-[var(--mui-palette-primary-main)]" />
								<Typography color="text.secondary">Diagonal</Typography>
							</span>
						</div>
					}
				>
					<Project3DPreview projects={projects} />
				</SectionCard>

				<SectionCard
					title="Comparativa"
					subtitle="Volumen y tonelaje por tipo de proyecto"
				>
					<ProjectComparisonChart projects={projects} />
					<div className="mt-4 grid grid-cols-2 gap-3">
						<div className="rounded-lg border p-3">
							<Typography
								color="text.secondary"
								className="text-[11px] tracking-wide uppercase"
							>
								Diferencia de volumen
							</Typography>
							<Typography className="mt-1 text-lg font-semibold">
								{formatNumber(Math.abs(projects[1].volume - projects[0].volume), 0)} m³
							</Typography>
						</div>
						<div className="rounded-lg border p-3">
							<Typography
								color="text.secondary"
								className="text-[11px] tracking-wide uppercase"
							>
								Diferencia de inversión
							</Typography>
							<Typography className="mt-1 text-lg font-semibold">
								{formatMoney(Math.abs(projects[1].cost - projects[0].cost), money)}
							</Typography>
						</div>
					</div>
				</SectionCard>
			</div>

			<div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
				{projects.map((project) => (
					<ProjectDetailCard
						key={project.id}
						project={project}
						currency={currency}
					/>
				))}
			</div>

			<SectionCard
				className="mt-4"
				title="Notas del cálculo"
				subtitle="Parámetros considerados por el motor de demostración."
			>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div className="rounded-lg bg-[var(--mui-palette-action-hover)] p-4">
						<Typography className="font-semibold">Sección de labor</Typography>
						<Typography
							className="mt-1"
							color="text.secondary"
						>
							{input.section.height} m de alto × {input.section.width} m de ancho ={' '}
							{formatNumber(input.section.height * input.section.width, 2)} m².
						</Typography>
					</div>
					<div className="rounded-lg bg-[var(--mui-palette-action-hover)] p-4">
						<Typography className="font-semibold">Voladura</Typography>
						<Typography
							className="mt-1"
							color="text.secondary"
						>
							{input.blasting.advancePerBlast} m por disparo y {input.blasting.blastsPerDay} disparos por
							día.
						</Typography>
					</div>
					<div className="rounded-lg bg-[var(--mui-palette-action-hover)] p-4">
						<Typography className="font-semibold">Geometría de veta</Typography>
						<Typography
							className="mt-1"
							color="text.secondary"
						>
							Buzamiento {input.dip}° hacia {analysis.dipDirection}, rumbo {analysis.label}.
						</Typography>
					</div>
				</div>
			</SectionCard>
		</div>
	);
}

export default Resultados3DView;
