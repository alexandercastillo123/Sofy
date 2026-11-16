import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import SectionCard from '../../sofi/components/ui/SectionCard';
import ResultRow from '../../sofi/components/ui/ResultRow';
import StatusChip from '../../sofi/components/ui/StatusChip';
import { CURRENCY_OPTIONS } from '../../sofi/data/defaults';
import { MiningProject } from '../../sofi/domain/project';
import { ProjectSummary } from '../../sofi/domain/projectSummary';
import { formatMoney, formatNumber } from '../../sofi/lib/format';

const LEGEND = [
	{ color: '#2f7df6', label: 'Plano de veta', text: 'Superficie inclinada calculada con rumbo y buzamiento.' },
	{ color: '#f59e0b', label: 'Frente', text: 'Sección real de la labor en el punto de partida.' },
	{ color: '#22c55e', label: 'EP', text: 'Trayectoria perpendicular a la veta.' },
	{ color: '#6366f1', label: 'PC', text: 'Trayectoria perpendicular al frente.' }
];

type ProjectSimulationSidebarProps = {
	project: MiningProject;
	summary: ProjectSummary;
};

function ProjectSimulationSidebar({ project, summary }: ProjectSimulationSidebarProps) {
	const currency = CURRENCY_OPTIONS[0];
	const perpendicular = summary.projects.find((item) => item.id === 'perpendicular');
	const diagonal = summary.projects.find((item) => item.id === 'diagonal');

	return (
		<div className="flex flex-col gap-4">
			<SectionCard
				title="Resumen del modelo"
				subtitle="Datos calculados a partir de la geometría guardada."
				action={<StatusChip status={project.status} />}
			>
				<ResultRow
					label="Rumbo"
					value={summary.analysis.label}
				/>
				<ResultRow
					label="Buzamiento"
					value={`${project.input.dip}° ${summary.analysis.dipDirection}`}
				/>
				<ResultRow
					label="Sección"
					value={`${project.input.section.height} × ${project.input.section.width} m`}
				/>
				<ResultRow
					label="EP"
					value={perpendicular ? `${formatNumber(perpendicular.distance, 1)} m` : '—'}
				/>
				<ResultRow
					label="PC"
					value={diagonal ? `${formatNumber(diagonal.distance, 1)} m` : '—'}
				/>
				<ResultRow
					label="Tonelaje"
					value={`${formatNumber(summary.totalTonnage, 0)} Tn`}
					highlight
				/>
				<ResultRow
					label="Inversión"
					value={formatMoney(summary.totalCost, currency)}
				/>

				<div className="mt-4 flex flex-wrap gap-1.5">
					<Chip
						size="small"
						label={project.source.app}
						variant="outlined"
						className="rounded-md"
					/>
					<Chip
						size="small"
						label={project.location.zone}
						variant="outlined"
						className="rounded-md"
					/>
				</div>
			</SectionCard>

			<SectionCard
				title="Cómo leer la escena"
				subtitle="Arrastra, acerca y oculta capas desde la barra superior."
			>
				<div className="flex flex-col gap-3">
					{LEGEND.map((item) => (
						<div
							key={item.label}
							className="flex gap-3"
						>
							<span
								className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
								style={{ backgroundColor: item.color }}
							/>
							<div>
								<Typography className="text-sm font-semibold">{item.label}</Typography>
								<Typography
									className="text-sm"
									color="text.secondary"
								>
									{item.text}
								</Typography>
							</div>
						</div>
					))}
				</div>
			</SectionCard>
		</div>
	);
}

export default ProjectSimulationSidebar;
