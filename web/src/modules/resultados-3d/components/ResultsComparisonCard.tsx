import Typography from '@mui/material/Typography';
import SectionCard from '../../sofi/components/ui/SectionCard';
import ProjectComparisonChart from '../../sofi/components/charts/ProjectComparisonChart';
import { CURRENCY_OPTIONS } from '../../sofi/data/defaults';
import { Currency, ProjectResult } from '../../sofi/domain/types';
import { currencyOption, formatMoney, formatNumber } from '../../sofi/lib/format';

type ResultsComparisonCardProps = {
	projects: ProjectResult[];
	currency: Currency;
};

function ResultsComparisonCard({ projects, currency }: ResultsComparisonCardProps) {
	const money = currencyOption(currency, CURRENCY_OPTIONS);

	return (
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
	);
}

export default ResultsComparisonCard;
