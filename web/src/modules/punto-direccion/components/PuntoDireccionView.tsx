'use client';

import { useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSnackbar } from 'notistack';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Link from '@fuse/core/Link';
import useSofiWorkspace from '../../sofi/contexts/useSofiWorkspace';
import PageHeader from '../../sofi/components/ui/PageHeader';
import SectionCard from '../../sofi/components/ui/SectionCard';
import StatCard from '../../sofi/components/ui/StatCard';
import VeinPlanDiagram from '../../sofi/components/charts/VeinPlanDiagram';
import { STAKE_DISTANCES, StakeDistance } from '../../sofi/data/defaults';
import { StakeKind } from '../../sofi/domain/types';
import { formatDateTime, formatNumber } from '../../sofi/lib/format';

function PuntoDireccionView() {
	const { input, analysis, projects, stakes, stakeDistance, setStakeDistance, lastUpdated } = useSofiWorkspace();
	const { enqueueSnackbar } = useSnackbar();
	const [visibleKinds, setVisibleKinds] = useState<StakeKind[]>(['perpendicular', 'diagonal']);

	const visibleStakes = useMemo(
		() => stakes.filter((stake) => visibleKinds.includes(stake.kind)),
		[stakes, visibleKinds]
	);

	const handleVisibility = (_event: React.MouseEvent<HTMLElement>, value: StakeKind[]) => {
		if (value.length > 0) {
			setVisibleKinds(value);
		}
	};

	const copyCoordinate = async (stake: (typeof stakes)[number]) => {
		const text = `E: ${stake.coordinate.east.toFixed(2)}, N: ${stake.coordinate.north.toFixed(2)}, Cota: ${stake.coordinate.elevation.toFixed(2)}`;

		try {
			await navigator.clipboard.writeText(text);
			enqueueSnackbar('Coordenada copiada al portapapeles.', { variant: 'success' });
		} catch {
			enqueueSnackbar('No se pudo acceder al portapapeles.', { variant: 'warning' });
		}
	};

	return (
		<div className="flex flex-auto flex-col p-4 md:p-6 lg:p-8">
			<PageHeader
				eyebrow="Módulo 03"
				title="Punto de Dirección"
				subtitle="Genera las estacas de control a partir del frente y de los rumbos de los proyectos calculados."
				actions={
					<>
						<Button
							variant="outlined"
							color="inherit"
							startIcon={<FuseSvgIcon size={16}>lucide:clipboard-copy</FuseSvgIcon>}
							className="rounded-lg"
							onClick={() =>
								enqueueSnackbar('Estacas listas para exportar (demo).', { variant: 'success' })
							}
						>
							Exportar estacas
						</Button>
						<Button
							component={Link}
							to="/resultados-3d"
							variant="contained"
							startIcon={<FuseSvgIcon size={16}>lucide:box</FuseSvgIcon>}
							className="rounded-lg"
						>
							Ver resultados 3D
						</Button>
					</>
				}
			/>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<StatCard
					label="Estacas generadas"
					value={`${visibleStakes.length}`}
					hint={`Distancia al frente: ${stakeDistance} m`}
					icon="lucide:map-pin"
					accent="primary"
				/>
				<StatCard
					label="Rumbo perpendicular"
					value={formatNumber(projects[0].azimuth, 0)}
					hint={projects[0].strikeLabel}
					icon="lucide:move-up-right"
					accent="success"
				/>
				<StatCard
					label="Rumbo diagonal"
					value={formatNumber(projects[1].azimuth, 0)}
					hint={projects[1].strikeLabel}
					icon="lucide:move-diagonal"
					accent="info"
				/>
				<StatCard
					label="Buzamiento"
					value={`${input.dip}°`}
					hint={`Hacia ${analysis.dipDirection} · ${analysis.zone}`}
					icon="lucide:compass"
					accent="warning"
				/>
			</div>

			<div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
				<SectionCard
					className="lg:col-span-2"
					title="Ubicación de estacas"
					subtitle={`Vista en planta actualizada ${formatDateTime(lastUpdated)}.`}
					action={
						<Chip
							size="small"
							label={`Frente ${formatNumber(input.frente.east, 0)} E / ${formatNumber(input.frente.north, 0)} N`}
							variant="outlined"
							className="rounded-md"
						/>
					}
				>
					<VeinPlanDiagram
						input={input}
						analysis={analysis}
						projects={projects}
						stakes={visibleStakes}
					/>
					<div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
						<span className="flex items-center gap-1.5">
							<span className="inline-block h-2 w-2 rounded-full bg-green-500" />
							<Typography color="text.secondary">Perpendicular (EP)</Typography>
						</span>
						<span className="flex items-center gap-1.5">
							<span className="inline-block h-2 w-2 rounded-full bg-[var(--mui-palette-primary-main)]" />
							<Typography color="text.secondary">Diagonal (PC)</Typography>
						</span>
						<span className="flex items-center gap-1.5">
							<span className="inline-block h-2 w-2 rounded-full border-2 border-gray-400" />
							<Typography color="text.secondary">Estaca de control</Typography>
						</span>
					</div>
				</SectionCard>

				<SectionCard
					title="Parámetros de estacado"
					subtitle="Ajusta la distancia sugerida y los frentes a marcar."
				>
					<Typography className="mb-2 font-medium">Distancia al frente</Typography>
					<ToggleButtonGroup
						value={stakeDistance}
						exclusive
						onChange={(_, value: StakeDistance | null) => value && setStakeDistance(value)}
						size="small"
						className="flex"
						fullWidth
					>
						{STAKE_DISTANCES.map((distance) => (
							<ToggleButton
								key={distance}
								value={distance}
								className="flex-auto rounded-md"
							>
								{distance} m
							</ToggleButton>
						))}
					</ToggleButtonGroup>

					<Typography className="mt-5 mb-2 font-medium">Proyectos a marcar</Typography>
					<ToggleButtonGroup
						value={visibleKinds}
						onChange={handleVisibility}
						size="small"
						className="flex"
						fullWidth
					>
						<ToggleButton
							value="perpendicular"
							className="flex-auto gap-1 rounded-md"
						>
							<FuseSvgIcon size={14}>lucide:move-up-right</FuseSvgIcon>
							Perpendicular
						</ToggleButton>
						<ToggleButton
							value="diagonal"
							className="flex-auto gap-1 rounded-md"
						>
							<FuseSvgIcon size={14}>lucide:move-diagonal</FuseSvgIcon>
							Diagonal
						</ToggleButton>
					</ToggleButtonGroup>

					<div className="mt-5 rounded-lg bg-[var(--mui-palette-action-hover)] p-4">
						<Typography className="font-semibold">Procedimiento sugerido</Typography>
						<ol className="mt-2 list-decimal space-y-1 pl-4">
							<li>
								<Typography color="text.secondary">
									Ubícate en el frente {formatNumber(input.frente.east, 0)} E /{' '}
									{formatNumber(input.frente.north, 0)} N.
								</Typography>
							</li>
							<li>
								<Typography color="text.secondary">
									Mide {stakeDistance} m en el rumbo de cada proyecto.
								</Typography>
							</li>
							<li>
								<Typography color="text.secondary">
									Verifica la cota {formatNumber(input.frente.elevation, 1)} msnm antes de pintar.
								</Typography>
							</li>
						</ol>
					</div>
				</SectionCard>
			</div>

			<div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
				{visibleStakes.map((stake) => (
					<SectionCard
						key={stake.id}
						title={stake.label}
						subtitle={`Rumbo ${stake.bearingLabel} · azimut ${formatNumber(stake.azimuth, 1)}°`}
						action={
							<Chip
								size="small"
								label={`${stake.distance} m`}
								color={stake.kind === 'perpendicular' ? 'success' : 'primary'}
								variant="outlined"
								className="rounded-md"
							/>
						}
					>
						<div className="grid grid-cols-3 gap-3">
							<div className="rounded-lg border p-3">
								<Typography
									color="text.secondary"
									className="text-[11px] tracking-wide uppercase"
								>
									Este
								</Typography>
								<Typography className="mt-1 text-lg font-bold tabular-nums">
									{formatNumber(stake.coordinate.east, 2)}
								</Typography>
							</div>
							<div className="rounded-lg border p-3">
								<Typography
									color="text.secondary"
									className="text-[11px] tracking-wide uppercase"
								>
									Norte
								</Typography>
								<Typography className="mt-1 text-lg font-bold tabular-nums">
									{formatNumber(stake.coordinate.north, 2)}
								</Typography>
							</div>
							<div className="rounded-lg border p-3">
								<Typography
									color="text.secondary"
									className="text-[11px] tracking-wide uppercase"
								>
									Cota
								</Typography>
								<Typography className="mt-1 text-lg font-bold tabular-nums">
									{formatNumber(stake.coordinate.elevation, 2)}
								</Typography>
							</div>
						</div>

						<div className="mt-4 flex items-center justify-between">
							<Typography color="text.secondary">
								Desplazamiento desde el frente: {stake.distance} m
							</Typography>
							<Tooltip title="Copiar coordenada">
								<IconButton
									size="small"
									onClick={() => copyCoordinate(stake)}
								>
									<FuseSvgIcon size={16}>lucide:copy</FuseSvgIcon>
								</IconButton>
							</Tooltip>
						</div>
					</SectionCard>
				))}
			</div>

			<SectionCard
				className="mt-4"
				title="Resumen de estacas"
				subtitle="Coordenadas finales para el equipo de topografía."
				contentClassName="pt-0"
			>
				<TableContainer>
					<Table size="small">
						<TableHead>
							<TableRow>
								<TableCell>Estaca</TableCell>
								<TableCell>Tipo</TableCell>
								<TableCell align="right">Este</TableCell>
								<TableCell align="right">Norte</TableCell>
								<TableCell align="right">Cota</TableCell>
								<TableCell align="right">Azimut</TableCell>
								<TableCell align="right">Distancia</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{visibleStakes.map((stake) => (
								<TableRow
									key={stake.id}
									hover
								>
									<TableCell className="font-semibold">{stake.label}</TableCell>
									<TableCell className="capitalize">{stake.kind}</TableCell>
									<TableCell align="right">{formatNumber(stake.coordinate.east, 2)}</TableCell>
									<TableCell align="right">{formatNumber(stake.coordinate.north, 2)}</TableCell>
									<TableCell align="right">{formatNumber(stake.coordinate.elevation, 2)}</TableCell>
									<TableCell align="right">{formatNumber(stake.azimuth, 1)}°</TableCell>
									<TableCell align="right">{stake.distance} m</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</SectionCard>
		</div>
	);
}

export default PuntoDireccionView;
