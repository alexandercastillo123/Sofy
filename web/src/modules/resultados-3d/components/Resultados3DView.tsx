'use client';

import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useSnackbar } from 'notistack';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Link from '@fuse/core/Link';
import useSofiWorkspace from '../../sofi/contexts/useSofiWorkspace';
import PageHeader from '../../sofi/components/ui/PageHeader';
import CalculatedProjectCard from '../../sofi/components/projects/CalculatedProjectCard';
import { CURRENCY_OPTIONS } from '../../sofi/data/defaults';
import { Currency } from '../../sofi/domain/types';
import { formatDateTime } from '../../sofi/lib/format';
import { ResultMetrics, ResultsSceneCard, ResultsComparisonCard, CalculationNotesCard } from '.';

function Resultados3DView() {
	const { input, analysis, projects, currency, setCurrency, lastUpdated } = useSofiWorkspace();
	const { enqueueSnackbar } = useSnackbar();

	return (
		<div className="flex flex-auto flex-col p-4 md:p-6 lg:p-8">
			<PageHeader
				eyebrow="Módulo 03"
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

			<ResultMetrics
				projects={projects}
				input={input}
				currency={currency}
			/>

			<div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
				<ResultsSceneCard
					input={input}
					analysis={analysis}
					projects={projects}
				/>
				<ResultsComparisonCard
					projects={projects}
					currency={currency}
				/>
			</div>

			<div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
				{projects.map((project) => (
					<CalculatedProjectCard
						key={project.id}
						project={project}
						currency={currency}
					/>
				))}
			</div>

			<CalculationNotesCard
				input={input}
				analysis={analysis}
			/>
		</div>
	);
}

export default Resultados3DView;
