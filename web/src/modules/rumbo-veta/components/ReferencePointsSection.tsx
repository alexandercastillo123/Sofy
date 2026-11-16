import { Control } from 'react-hook-form';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SectionCard from '../../sofi/components/ui/SectionCard';
import NumberField from './NumberField';
import { FormValues } from '../model/formSchema';

type ReferencePointsSectionProps = {
	control: Control<FormValues>;
};

function PointBadge({ children, tone = 'primary' }: { children: string; tone?: 'primary' | 'warning' }) {
	return (
		<Box
			component="span"
			className={
				tone === 'warning'
					? 'flex h-6 w-6 items-center justify-center rounded-md bg-amber-500/10 text-[10px] font-bold'
					: 'flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold'
			}
			sx={tone === 'warning' ? { color: 'warning.main' } : { backgroundColor: 'action.hover', color: 'primary.main' }}
		>
			{children}
		</Box>
	);
}

function ReferencePointsSection({ control }: ReferencePointsSectionProps) {
	return (
		<SectionCard
			title="01 · Puntos de referencia"
			subtitle="Coordenadas UTM del afloramiento, un segundo punto en veta y el frente de labor."
		>
			<div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
				<div className="flex flex-col gap-3">
					<div className="flex items-center gap-2">
						<PointBadge>EM</PointBadge>
						<Typography className="font-semibold">Punto en afloramiento</Typography>
					</div>
					<NumberField
						control={control}
						name="emEast"
						label="Este"
						unit="m"
					/>
					<NumberField
						control={control}
						name="emNorth"
						label="Norte"
						unit="m"
					/>
					<NumberField
						control={control}
						name="emElevation"
						label="Cota"
						unit="msnm"
					/>
				</div>

				<div className="flex flex-col gap-3">
					<div className="flex items-center gap-2">
						<PointBadge>P2</PointBadge>
						<Typography className="font-semibold">Otro punto en veta</Typography>
					</div>
					<NumberField
						control={control}
						name="p2East"
						label="Este"
						unit="m"
					/>
					<NumberField
						control={control}
						name="p2North"
						label="Norte"
						unit="m"
					/>
					<div className="flex h-[40px] items-center">
						<Typography color="text.secondary">El rumbo se calcula con la línea EM → P2.</Typography>
					</div>
				</div>

				<div className="flex flex-col gap-3">
					<div className="flex items-center gap-2">
						<PointBadge tone="warning">F</PointBadge>
						<Typography className="font-semibold">Coordenadas del frente</Typography>
					</div>
					<NumberField
						control={control}
						name="frenteEast"
						label="Este"
						unit="m"
					/>
					<NumberField
						control={control}
						name="frenteNorth"
						label="Norte"
						unit="m"
					/>
					<NumberField
						control={control}
						name="frenteElevation"
						label="Cota"
						unit="msnm"
					/>
				</div>
			</div>
		</SectionCard>
	);
}

export default ReferencePointsSection;
