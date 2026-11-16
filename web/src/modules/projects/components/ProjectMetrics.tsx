import { useMemo } from 'react';
import StatCard from '../../sofi/components/ui/StatCard';
import { CURRENCY_OPTIONS } from '../../sofi/data/defaults';
import { MiningProject } from '../../sofi/domain/project';
import { summarizeProject } from '../../sofi/domain/projectSummary';
import { formatMoney, formatNumber } from '../../sofi/lib/format';

function ProjectMetrics({ projects }: { projects: MiningProject[] }) {
	const currency = CURRENCY_OPTIONS[0];
	const totals = useMemo(() => {
		const summaries = projects.map(summarizeProject);

		return {
			active: projects.filter((project) => project.status !== 'Cerrado').length,
			tonnage: summaries.reduce((total, summary) => total + summary.totalTonnage, 0),
			cost: summaries.reduce((total, summary) => total + summary.totalCost, 0),
			mobile: projects.filter((project) => project.source.channel === 'mobile').length
		};
	}, [projects]);

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<StatCard
				label="Proyectos"
				value={`${projects.length}`}
				hint={`${totals.active} activos · ${projects.length - totals.active} cerrados`}
				icon="lucide:folder-kanban"
				accent="primary"
			/>
			<StatCard
				label="Creados en el celular"
				value={`${totals.mobile}`}
				hint="Sincronizados desde Sofy Corte de Vetas"
				icon="lucide:smartphone"
				accent="info"
			/>
			<StatCard
				label="Tonelaje proyectado"
				value={`${formatNumber(totals.tonnage / 1000, 1)}k Tn`}
				hint="Suma de los dos proyectos por registro"
				icon="lucide:weight"
				accent="success"
			/>
			<StatCard
				label="Inversión acumulada"
				value={formatMoney(totals.cost, currency)}
				hint="Estimación con los parámetros de cada proyecto"
				icon="lucide:wallet"
				accent="warning"
			/>
		</div>
	);
}

export default ProjectMetrics;
