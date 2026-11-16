import { Control } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import SectionCard from '../../sofi/components/ui/SectionCard';
import { formatNumber } from '../../sofi/lib/format';
import { FormValues } from '../model/formSchema';
import NumberField from './NumberField';

type OperationsSectionProps = {
	control: Control<FormValues>;
	height: number;
	width: number;
};

function OperationsSection({ control, height, width }: OperationsSectionProps) {
	return (
		<SectionCard
			title="03 · Sección, roca y voladura"
			subtitle="Parámetros usados para áreas, volúmenes, tonelaje, disparos y costos."
		>
			<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
				<NumberField
					control={control}
					name="height"
					label="Alto"
					unit="m"
				/>
				<NumberField
					control={control}
					name="width"
					label="Ancho"
					unit="m"
				/>
				<NumberField
					control={control}
					name="density"
					label="Peso específico"
					unit="Tn/m³"
					step="0.01"
				/>
				<NumberField
					control={control}
					name="swellFactor"
					label="Esponjamiento"
					unit="%"
					step="1"
				/>
				<NumberField
					control={control}
					name="advance"
					label="Avance/disparo"
					unit="m"
					step="0.1"
				/>
				<NumberField
					control={control}
					name="blastsPerDay"
					label="Disparos/día"
					unit="día"
					step="1"
				/>
				<NumberField
					control={control}
					name="costPerMeter"
					label="Costo por metro"
					unit="S/."
					step="1"
				/>
				<div className="flex flex-col justify-center rounded-lg border border-dashed border-gray-300 px-3 dark:border-gray-700">
					<Typography
						color="text.secondary"
						className="text-[11px] tracking-wide uppercase"
					>
						Sección
					</Typography>
					<Typography className="font-semibold">{formatNumber(height * width, 2)} m²</Typography>
				</div>
			</div>
		</SectionCard>
	);
}

export default OperationsSection;
