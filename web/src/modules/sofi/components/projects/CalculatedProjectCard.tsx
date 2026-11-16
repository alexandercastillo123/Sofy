import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import SectionCard from '../ui/SectionCard';
import ResultRow from '../ui/ResultRow';
import { Currency, ProjectResult } from '../../domain/types';
import { CURRENCY_OPTIONS } from '../../data/defaults';
import { currencyOption, formatMoney, formatNumber } from '../../lib/format';

type CalculatedProjectCardProps = {
	project: ProjectResult;
	currency: Currency;
};

/**
 * Read-only card shared by Resultados 3D and the project detail page.
 * Keeping it here avoids duplicating the same twelve result rows per view.
 */
function CalculatedProjectCard({ project, currency }: CalculatedProjectCardProps) {
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

export default CalculatedProjectCard;
