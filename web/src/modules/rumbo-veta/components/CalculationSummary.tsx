import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Link from '@fuse/core/Link';
import SectionCard from '../../sofi/components/ui/SectionCard';
import ResultRow from '../../sofi/components/ui/ResultRow';
import { ProjectResult, VeinAnalysis, VeinInput } from '../../sofi/domain/types';
import { formatDateTime, formatNumber } from '../../sofi/lib/format';

type CalculationSummaryProps = {
	analysis: VeinAnalysis;
	input: VeinInput;
	projects: ProjectResult[];
	lastUpdated: Date;
	onSave?: () => void;
};

function CalculationSummary({ analysis, input, projects, lastUpdated, onSave }: CalculationSummaryProps) {
	return (
		<SectionCard
			title="Resumen del cálculo"
			subtitle={`Actualizado ${formatDateTime(lastUpdated)}`}
		>
			<div className="flex items-center gap-3 rounded-lg bg-[var(--mui-palette-action-hover)] p-3">
				<span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--mui-palette-primary-main)] text-white">
					<FuseSvgIcon size={22}>lucide:compass</FuseSvgIcon>
				</span>
				<div>
					<Typography className="text-2xl font-bold tracking-tight">{analysis.label}</Typography>
					<Typography color="text.secondary">
						{analysis.caseId} · {analysis.zone}
					</Typography>
				</div>
			</div>

			<div className="mt-3">
				<ResultRow
					label="Azimut"
					value={formatNumber(analysis.azimuth, 1)}
					unit="°"
				/>
				<ResultRow
					label="Buzamiento"
					value={`${input.dip}`}
					unit={`° / ${analysis.dipDirection}`}
				/>
				<ResultRow
					label="Tendencia"
					value={analysis.trend}
					highlight
				/>
				<ResultRow
					label="Formato de análisis"
					value={`${analysis.format}`}
				/>
				<ResultRow
					label="Zona"
					value={analysis.zone}
				/>
			</div>

			{onSave && (
				<Button
					variant="outlined"
					color="inherit"
					fullWidth
					className="mt-4 rounded-lg"
					startIcon={<FuseSvgIcon size={16}>lucide:bookmark-plus</FuseSvgIcon>}
					onClick={onSave}
				>
					Guardar en historial
				</Button>
			)}

			<Button
				component={Link}
				to="/resultados-3d"
				variant="contained"
				fullWidth
				className={onSave ? 'mt-2 rounded-lg' : 'mt-4 rounded-lg'}
				endIcon={<FuseSvgIcon size={16}>lucide:arrow-right</FuseSvgIcon>}
			>
				Ver resultados 3D
			</Button>
			<Typography
				color="text.secondary"
				className="mt-2 text-center"
			>
				{formatNumber(projects[0].distance, 1)} m perp. · {formatNumber(projects[1].distance, 1)} m diag.
			</Typography>
		</SectionCard>
	);
}

export default CalculationSummary;
