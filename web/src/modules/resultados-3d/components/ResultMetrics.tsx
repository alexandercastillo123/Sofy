import StatCard from '../../sofi/components/ui/StatCard';
import { CURRENCY_OPTIONS } from '../../sofi/data/defaults';
import { Currency, ProjectResult, VeinInput } from '../../sofi/domain/types';
import { currencyOption, formatMoney, formatNumber } from '../../sofi/lib/format';

type ResultMetricsProps = {
	projects: ProjectResult[];
	input: VeinInput;
	currency: Currency;
};

function ResultMetrics({ projects, input, currency }: ResultMetricsProps) {
	const money = currencyOption(currency, CURRENCY_OPTIONS);
	const totalCost = projects.reduce((total, project) => total + project.cost, 0);
	const totalTonnage = projects.reduce((total, project) => total + project.tonnage, 0);

	return (
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
	);
}

export default ResultMetrics;
