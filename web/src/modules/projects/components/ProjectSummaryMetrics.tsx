import StatCard from '../../sofi/components/ui/StatCard';
import { CURRENCY_OPTIONS } from '../../sofi/data/defaults';
import { ProjectSummary } from '../../sofi/domain/projectSummary';
import { formatMoney, formatNumber } from '../../sofi/lib/format';

function ProjectSummaryMetrics({ summary }: { summary: ProjectSummary }) {
	const currency = CURRENCY_OPTIONS[0];
	const avgCostPerMeter = summary.totalCost / Math.max(summary.projects[0].distance, 1);

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<StatCard
				label="Tonelaje del proyecto"
				value={`${formatNumber(summary.totalTonnage / 1000, 1)}k Tn`}
				hint={`${formatNumber(summary.totalVolume, 0)} m³ in situ`}
				icon="lucide:weight"
				accent="success"
			/>
			<StatCard
				label="Inversión estimada"
				value={formatMoney(summary.totalCost, currency)}
				hint={`${formatNumber(avgCostPerMeter, 0)} ${currency.symbol}/m promedio`}
				icon="lucide:wallet"
				accent="warning"
			/>
			<StatCard
				label="Volumen esponjado"
				value={`${formatNumber(summary.totalExpandedVolume, 0)} m³`}
				hint={`${formatNumber(summary.totalBlasts, 0)} disparos totales`}
				icon="lucide:boxes"
				accent="info"
			/>
			<StatCard
				label="Duración estimada"
				value={`${formatNumber(summary.durationDays, 0)} días`}
				hint={`${summary.projects.length} alternativas evaluadas`}
				icon="lucide:calendar-clock"
				accent="primary"
			/>
		</div>
	);
}

export default ProjectSummaryMetrics;
