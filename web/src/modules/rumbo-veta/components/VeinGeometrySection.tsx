import { Control, Controller } from 'react-hook-form';
import Divider from '@mui/material/Divider';
import Slider from '@mui/material/Slider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import SectionCard from '../../sofi/components/ui/SectionCard';
import { DipDirection, VeinAnalysis } from '../../sofi/domain/types';
import { formatNumber } from '../../sofi/lib/format';
import { DIP_DIRECTIONS, FormValues } from '../model/formSchema';

type VeinGeometrySectionProps = {
	control: Control<FormValues>;
	dip: number;
	dipDirection: DipDirection;
	analysis: VeinAnalysis;
	dipError?: string;
};

function Metric({ label, value }: { label: string; value: string }) {
	return (
		<div>
			<Typography
				color="text.secondary"
				className="text-[11px] tracking-wide uppercase"
			>
				{label}
			</Typography>
			<Typography className="text-lg font-semibold">{value}</Typography>
		</div>
	);
}

function VeinGeometrySection({ control, dip, dipDirection, analysis, dipError }: VeinGeometrySectionProps) {
	return (
		<SectionCard
			title="02 · Geometría de la veta"
			subtitle="Buzamiento y sentido de inclinación. Estos valores condicionan los proyectos perpendicular y diagonal."
		>
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<div>
					<div className="mb-2 flex items-baseline justify-between">
						<Typography className="font-medium">Buzamiento β</Typography>
						<Typography className="text-xl font-bold">{dip}°</Typography>
					</div>
					<Controller
						name="dip"
						control={control}
						render={({ field }) => (
							<Slider
								value={Number(field.value)}
								onChange={(_, value) => field.onChange(value)}
								min={0}
								max={90}
								step={1}
								valueLabelDisplay="auto"
								valueLabelFormat={(value) => `${value}°`}
								marks={[
									{ value: 0, label: '0°' },
									{ value: 45, label: '45°' },
									{ value: 90, label: '90°' }
								]}
							/>
						)}
					/>
					{dipError && (
						<Typography
							color="error"
							className="mt-2"
						>
							{dipError}
						</Typography>
					)}
				</div>

				<div>
					<Typography className="mb-2 font-medium">¿Hacia qué lado se inclina la veta?</Typography>
					<Controller
						name="dipDirection"
						control={control}
						render={({ field }) => (
							<ToggleButtonGroup
								value={field.value}
								exclusive
								onChange={(_, value: DipDirection | null) => value && field.onChange(value)}
								size="small"
								className="flex flex-wrap"
							>
								{DIP_DIRECTIONS.map((direction) => (
									<ToggleButton
										key={direction.value}
										value={direction.value}
										className="min-w-16 gap-1 rounded-md"
									>
										<FuseSvgIcon size={14}>{direction.icon}</FuseSvgIcon>
										{direction.label}
									</ToggleButton>
								))}
							</ToggleButtonGroup>
						)}
					/>
					<Typography
						className="mt-3"
						color="text.secondary"
					>
						Dirección activa: <b>{dipDirection}</b>. El proyecto perpendicular avanza en ese sentido.
					</Typography>
				</div>
			</div>

			<Divider className="my-5" />

			<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
				<Metric
					label="Rumbo"
					value={analysis.label}
				/>
				<Metric
					label="Azimut"
					value={`${formatNumber(analysis.azimuth, 1)}°`}
				/>
				<Metric
					label="Caso"
					value={analysis.caseId}
				/>
				<Metric
					label="Formato"
					value={`${analysis.format} · ${analysis.zone}`}
				/>
			</div>
		</SectionCard>
	);
}

export default VeinGeometrySection;
