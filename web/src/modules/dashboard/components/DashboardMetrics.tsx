import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import StatCard from '../../sofi/components/ui/StatCard';
import { DashboardData, CurrencyOption, VeinAnalysis } from '../../sofi/domain/types';
import { formatMoney, formatNumber } from '../../sofi/lib/format';

type DashboardMetricsProps = {
	data: DashboardData;
	analysis: VeinAnalysis;
	currency: CurrencyOption;
};

function DashboardMetrics({ data, analysis, currency }: DashboardMetricsProps) {
	return (
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
	);
}

export default DashboardMetrics;
