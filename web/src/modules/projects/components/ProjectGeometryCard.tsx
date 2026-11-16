import Typography from '@mui/material/Typography';
import SectionCard from '../../sofi/components/ui/SectionCard';
import ResultRow from '../../sofi/components/ui/ResultRow';
import VeinPlanDiagram from '../../sofi/components/charts/VeinPlanDiagram';
import { ProjectResult, VeinAnalysis, VeinInput } from '../../sofi/domain/types';
import { formatNumber } from '../../sofi/lib/format';

type ProjectGeometryCardProps = {
	input: VeinInput;
	analysis: VeinAnalysis;
	projects: ProjectResult[];
};

function ProjectGeometryCard({ input, analysis, projects }: ProjectGeometryCardProps) {
	return (
		<SectionCard
			className="lg:col-span-2"
			title="Geometría y plan de labor"
			subtitle="Vista en planta y parámetros que alimentaron el cálculo original."
		>
			<div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
				<div className="rounded-lg border bg-[var(--mui-palette-background-default)] p-2">
					<VeinPlanDiagram
						input={input}
						analysis={analysis}
						projects={projects}
						className="h-auto w-full"
					/>
				</div>
				<div>
					<Typography
						className="text-[11px] font-semibold tracking-[0.12em] uppercase"
						color="text.secondary"
					>
						Veta
					</Typography>
					<ResultRow
						label="Rumbo"
						value={analysis.label}
					/>
					<ResultRow
						label="Buzamiento"
						value={`${input.dip}° ${analysis.dipDirection}`}
					/>
					<ResultRow
						label="Caso / zona"
						value={`${analysis.caseId} · ${analysis.zone}`}
					/>
					<Typography
						className="mt-4 text-[11px] font-semibold tracking-[0.12em] uppercase"
						color="text.secondary"
					>
						Labor y voladura
					</Typography>
					<ResultRow
						label="Sección"
						value={`${input.section.height} × ${input.section.width}`}
						unit="m"
					/>
					<ResultRow
						label="Densidad de roca"
						value={formatNumber(input.rock.density, 2)}
						unit="Tn/m³"
					/>
					<ResultRow
						label="Esponjamiento"
						value={`${input.rock.swellFactor}`}
						unit="%"
					/>
					<ResultRow
						label="Avance / disparo"
						value={formatNumber(input.blasting.advancePerBlast, 1)}
						unit="m"
					/>
					<ResultRow
						label="Disparos / día"
						value={`${input.blasting.blastsPerDay}`}
					/>
					<ResultRow
						label="Costo por metro"
						value={`S/. ${formatNumber(input.blasting.costPerMeter, 0)}`}
					/>
				</div>
			</div>
		</SectionCard>
	);
}

export default ProjectGeometryCard;
