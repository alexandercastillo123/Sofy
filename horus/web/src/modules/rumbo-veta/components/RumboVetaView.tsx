'use client';

import { Controller, Control, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSnackbar } from 'notistack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Link from '@fuse/core/Link';
import useHorusWorkspace from '../../horus/contexts/useHorusWorkspace';
import PageHeader from '../../horus/components/ui/PageHeader';
import SectionCard from '../../horus/components/ui/SectionCard';
import ResultRow from '../../horus/components/ui/ResultRow';
import VeinPlanDiagram from '../../horus/components/charts/VeinPlanDiagram';
import { DipDirection, VeinInput } from '../../horus/domain/types';
import { analyzeVein } from '../../horus/domain/calculations';
import { DEFAULT_VEIN_INPUT } from '../../horus/data/defaults';
import { formatDateTime, formatNumber } from '../../horus/lib/format';

const numberField = z.number({ message: 'Ingresa un número válido' });

const schema = z.object({
	emEast: numberField,
	emNorth: numberField,
	emElevation: numberField,
	p2East: numberField,
	p2North: numberField,
	frenteEast: numberField,
	frenteNorth: numberField,
	frenteElevation: numberField,
	dip: numberField
		.min(0, 'El buzamiento debe estar entre 0° y 90°')
		.max(90, 'El buzamiento debe estar entre 0° y 90°'),
	dipDirection: z.enum(['NE', 'SE', 'SW', 'NW']),
	height: numberField.positive('El alto debe ser mayor a 0'),
	width: numberField.positive('El ancho debe ser mayor a 0'),
	density: numberField.positive('El peso específico debe ser mayor a 0'),
	swellFactor: numberField.min(0, 'El esponjamiento no puede ser negativo').max(100, 'Máximo 100%'),
	advance: numberField.positive('El avance por disparo debe ser mayor a 0'),
	blastsPerDay: numberField.positive('Los disparos por día deben ser mayores a 0'),
	costPerMeter: numberField.min(0, 'El costo por metro no puede ser negativo')
});

type FormValues = z.infer<typeof schema>;

function toFormValues(input: VeinInput): FormValues {
	return {
		emEast: input.em.east,
		emNorth: input.em.north,
		emElevation: input.em.elevation,
		p2East: input.p2.east,
		p2North: input.p2.north,
		frenteEast: input.frente.east,
		frenteNorth: input.frente.north,
		frenteElevation: input.frente.elevation,
		dip: input.dip,
		dipDirection: input.dipDirection,
		height: input.section.height,
		width: input.section.width,
		density: input.rock.density,
		swellFactor: input.rock.swellFactor,
		advance: input.blasting.advancePerBlast,
		blastsPerDay: input.blasting.blastsPerDay,
		costPerMeter: input.blasting.costPerMeter
	};
}

function toVeinInput(values: FormValues): VeinInput {
	return {
		em: { east: values.emEast, north: values.emNorth, elevation: values.emElevation },
		p2: { east: values.p2East, north: values.p2North },
		frente: { east: values.frenteEast, north: values.frenteNorth, elevation: values.frenteElevation },
		dip: values.dip,
		dipDirection: values.dipDirection,
		section: { height: values.height, width: values.width },
		rock: { density: values.density, swellFactor: values.swellFactor },
		blasting: {
			advancePerBlast: values.advance,
			blastsPerDay: values.blastsPerDay,
			costPerMeter: values.costPerMeter
		}
	};
}

type NumericFieldName = Exclude<keyof FormValues, 'dipDirection'>;

type NumberFieldProps = {
	control: Control<FormValues>;
	name: NumericFieldName;
	label: string;
	unit?: string;
	step?: string;
};

function NumberField({ control, name, label, unit, step = '0.1' }: NumberFieldProps) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<TextField
					name={field.name}
					inputRef={field.ref}
					value={field.value ?? ''}
					onBlur={field.onBlur}
					onChange={(event) =>
						field.onChange(event.target.value === '' ? undefined : Number(event.target.value))
					}
					fullWidth
					size="small"
					type="number"
					label={label}
					error={!!fieldState.error}
					helperText={fieldState.error?.message}
					slotProps={{
						inputLabel: { shrink: true },
						htmlInput: { step },
						input: unit
							? {
									endAdornment: (
										<Typography
											className="ml-1 shrink-0"
											color="text.secondary"
										>
											{unit}
										</Typography>
									)
								}
							: undefined
					}}
				/>
			)}
		/>
	);
}

const DIP_DIRECTIONS: { value: DipDirection; label: string; icon: string }[] = [
	{ value: 'NE', label: 'NE', icon: 'lucide:arrow-up-right' },
	{ value: 'SE', label: 'SE', icon: 'lucide:arrow-down-right' },
	{ value: 'SW', label: 'SW', icon: 'lucide:arrow-down-left' },
	{ value: 'NW', label: 'NW', icon: 'lucide:arrow-up-left' }
];

function RumboVetaView() {
	const { input, analysis, projects, applyInput, resetInput, lastUpdated } = useHorusWorkspace();
	const { enqueueSnackbar } = useSnackbar();
	const { control, handleSubmit, reset, watch, formState } = useForm<FormValues>({
		mode: 'onChange',
		defaultValues: toFormValues(input),
		resolver: zodResolver(schema)
	});

	const dip = watch('dip');
	const dipDirection = watch('dipDirection');
	const { errors } = formState;

	const onSubmit = (values: FormValues) => {
		const nextInput = toVeinInput(values);
		const result = analyzeVein(nextInput);

		applyInput(nextInput);
		enqueueSnackbar(`Rumbo calculado: ${result.label} (${result.caseId})`, { variant: 'success' });
	};

	const handleReset = () => {
		reset(toFormValues(DEFAULT_VEIN_INPUT));
		resetInput();
		enqueueSnackbar('Valores de demostración restablecidos.', { variant: 'info' });
	};

	return (
		<div className="flex flex-auto flex-col p-4 md:p-6 lg:p-8">
			<PageHeader
				eyebrow="Módulo 01"
				title="Rumbo de Veta"
				subtitle="Define los puntos de referencia, la geometría de la veta y las propiedades de voladura para obtener el rumbo y los proyectos asociados."
				actions={
					<>
						<Button
							variant="outlined"
							color="inherit"
							onClick={handleReset}
							startIcon={<FuseSvgIcon size={16}>lucide:rotate-ccw</FuseSvgIcon>}
							className="rounded-lg"
						>
							Restablecer
						</Button>
						<Button
							variant="contained"
							type="submit"
							form="rumbo-form"
							startIcon={<FuseSvgIcon size={16}>lucide:calculator</FuseSvgIcon>}
							className="rounded-lg"
						>
							Calcular rumbo
						</Button>
					</>
				}
			/>

			<form
				id="rumbo-form"
				onSubmit={handleSubmit(onSubmit)}
				className="grid grid-cols-1 gap-4 lg:grid-cols-3"
			>
				<div className="flex flex-col gap-4 lg:col-span-2">
					<SectionCard
						title="01 · Puntos de referencia"
						subtitle="Coordenadas UTM del afloramiento, un segundo punto en veta y el frente de labor."
					>
						<div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
							<div className="flex flex-col gap-3">
								<div className="flex items-center gap-2">
									<Box
										component="span"
										className="flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold"
										sx={{ backgroundColor: 'action.hover', color: 'primary.main' }}
									>
										EM
									</Box>
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
									<Box
										component="span"
										className="flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold"
										sx={{ backgroundColor: 'action.hover', color: 'primary.main' }}
									>
										P2
									</Box>
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
									<Typography color="text.secondary">
										El rumbo se calcula con la línea EM → P2.
									</Typography>
								</div>
							</div>

							<div className="flex flex-col gap-3">
								<div className="flex items-center gap-2">
									<Box
										component="span"
										className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-500/10 text-[10px] font-bold"
										sx={{ color: 'warning.main' }}
									>
										F
									</Box>
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
								{errors.dip && (
									<Typography
										color="error"
										className="mt-2"
									>
										{errors.dip.message}
									</Typography>
								)}
							</div>

							<div>
								<Typography className="mb-2 font-medium">
									¿Hacia qué lado se inclina la veta?
								</Typography>
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
									Dirección activa: <b>{dipDirection}</b>. El proyecto perpendicular avanza en ese
									sentido.
								</Typography>
							</div>
						</div>

						<Divider className="my-5" />

						<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
							<div>
								<Typography
									color="text.secondary"
									className="text-[11px] tracking-wide uppercase"
								>
									Rumbo
								</Typography>
								<Typography className="text-lg font-semibold">{analysis.label}</Typography>
							</div>
							<div>
								<Typography
									color="text.secondary"
									className="text-[11px] tracking-wide uppercase"
								>
									Azimut
								</Typography>
								<Typography className="text-lg font-semibold">
									{formatNumber(analysis.azimuth, 1)}°
								</Typography>
							</div>
							<div>
								<Typography
									color="text.secondary"
									className="text-[11px] tracking-wide uppercase"
								>
									Caso
								</Typography>
								<Typography className="text-lg font-semibold">{analysis.caseId}</Typography>
							</div>
							<div>
								<Typography
									color="text.secondary"
									className="text-[11px] tracking-wide uppercase"
								>
									Formato
								</Typography>
								<Typography className="text-lg font-semibold">
									{analysis.format} · {analysis.zone}
								</Typography>
							</div>
						</div>
					</SectionCard>

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
								<Typography className="font-semibold">
									{formatNumber(watch('height') * watch('width'), 2)} m²
								</Typography>
							</div>
						</div>
					</SectionCard>
				</div>

				<div className="flex flex-col gap-4">
					<SectionCard
						title="Resumen del cálculo"
						subtitle={`Actualizado ${formatDateTime(lastUpdated)}`}
					>
						<div className="flex items-center gap-3 rounded-lg bg-[var(--mui-palette-action-hover)] p-3">
							<span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--mui-palette-primary-main)] text-white">
								<FuseSvgIcon size={22}>lucide:compass</FuseSvgIcon>
							</span>
							<div>
								<Typography className="text-2xl font-bold tracking-tight">{analysis.label}</Typography>
								<Typography color="text.secondary">
									{analysis.caseId} · {analysis.zone}
								</Typography>
							</div>
						</div>

						<div className="mt-3">
							<ResultRow
								label="Azimut"
								value={formatNumber(analysis.azimuth, 1)}
								unit="°"
							/>
							<ResultRow
								label="Buzamiento"
								value={`${input.dip}`}
								unit={`° / ${analysis.dipDirection}`}
							/>
							<ResultRow
								label="Tendencia"
								value={analysis.trend}
								highlight
							/>
							<ResultRow
								label="Formato de análisis"
								value={`${analysis.format}`}
							/>
							<ResultRow
								label="Zona"
								value={analysis.zone}
							/>
						</div>

						<Button
							component={Link}
							to="/resultados-3d"
							variant="contained"
							fullWidth
							className="mt-4 rounded-lg"
							endIcon={<FuseSvgIcon size={16}>lucide:arrow-right</FuseSvgIcon>}
						>
							Ver resultados 3D
						</Button>
						<Typography
							color="text.secondary"
							className="mt-2 text-center"
						>
							{formatNumber(projects[0].distance, 1)} m perp. · {formatNumber(projects[1].distance, 1)} m
							diag.
						</Typography>
					</SectionCard>

					<SectionCard
						title="Vista en planta"
						subtitle="Afloramiento, frente y proyectos sobre el plano."
					>
						<VeinPlanDiagram
							input={input}
							analysis={analysis}
							projects={projects}
						/>
					</SectionCard>
				</div>
			</form>
		</div>
	);
}

export default RumboVetaView;
