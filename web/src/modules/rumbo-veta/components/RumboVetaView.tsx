'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSnackbar } from 'notistack';
import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import PageHeader from '../../sofi/components/ui/PageHeader';
import SectionCard from '../../sofi/components/ui/SectionCard';
import VeinPlanDiagram from '../../sofi/components/charts/VeinPlanDiagram';
import useSofiWorkspace from '../../sofi/contexts/useSofiWorkspace';
import { analyzeVein } from '../../sofi/domain/calculations';
import { DEFAULT_VEIN_INPUT } from '../../sofi/data/defaults';
import CalculationSummary from './CalculationSummary';
import OperationsSection from './OperationsSection';
import ReferencePointsSection from './ReferencePointsSection';
import VeinGeometrySection from './VeinGeometrySection';
import { FormValues, rumboVetaSchema, toFormValues, toVeinInput } from '../model/formSchema';

function RumboVetaView() {
	const { input, analysis, projects, applyInput, resetInput, lastUpdated, saveCurrentAnalysis } = useSofiWorkspace();
	const { enqueueSnackbar } = useSnackbar();
	const { control, handleSubmit, reset, watch, formState } = useForm<FormValues>({
		mode: 'onChange',
		defaultValues: toFormValues(input),
		resolver: zodResolver(rumboVetaSchema)
	});

	const dip = watch('dip') ?? DEFAULT_VEIN_INPUT.dip;
	const dipDirection = watch('dipDirection') ?? DEFAULT_VEIN_INPUT.dipDirection;
	const height = watch('height') ?? DEFAULT_VEIN_INPUT.section.height;
	const width = watch('width') ?? DEFAULT_VEIN_INPUT.section.width;
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

	const handleSave = () => {
		const entry = saveCurrentAnalysis();
		enqueueSnackbar(`Guardado en historial: ${entry.name}`, { variant: 'success' });
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
					<ReferencePointsSection control={control} />
					<VeinGeometrySection
						control={control}
						dip={dip}
						dipDirection={dipDirection}
						analysis={analysis}
						dipError={errors.dip?.message}
					/>
					<OperationsSection
						control={control}
						height={height}
						width={width}
					/>
				</div>

				<div className="flex flex-col gap-4">
					<CalculationSummary
						analysis={analysis}
						input={input}
						projects={projects}
						lastUpdated={lastUpdated}
						onSave={handleSave}
					/>

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
