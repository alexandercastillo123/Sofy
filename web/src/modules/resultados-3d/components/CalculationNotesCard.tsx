import Typography from '@mui/material/Typography';
import SectionCard from '../../sofi/components/ui/SectionCard';
import { VeinAnalysis, VeinInput } from '../../sofi/domain/types';
import { formatNumber } from '../../sofi/lib/format';

type CalculationNotesCardProps = {
	input: VeinInput;
	analysis: VeinAnalysis;
};

function CalculationNotesCard({ input, analysis }: CalculationNotesCardProps) {
	return (
		<SectionCard
			className="mt-4"
			title="Notas del cálculo"
			subtitle="Parámetros considerados por el motor de demostración."
		>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				<div className="rounded-lg bg-[var(--mui-palette-action-hover)] p-4">
					<Typography className="font-semibold">Sección de labor</Typography>
					<Typography
						className="mt-1"
						color="text.secondary"
					>
						{input.section.height} m de alto × {input.section.width} m de ancho ={' '}
						{formatNumber(input.section.height * input.section.width, 2)} m².
					</Typography>
				</div>
				<div className="rounded-lg bg-[var(--mui-palette-action-hover)] p-4">
					<Typography className="font-semibold">Voladura</Typography>
					<Typography
						className="mt-1"
						color="text.secondary"
					>
						{input.blasting.advancePerBlast} m por disparo y {input.blasting.blastsPerDay} disparos por día.
					</Typography>
				</div>
				<div className="rounded-lg bg-[var(--mui-palette-action-hover)] p-4">
					<Typography className="font-semibold">Geometría de veta</Typography>
					<Typography
						className="mt-1"
						color="text.secondary"
					>
						Buzamiento {input.dip}° hacia {analysis.dipDirection}, rumbo {analysis.label}.
					</Typography>
				</div>
			</div>
		</SectionCard>
	);
}

export default CalculationNotesCard;
