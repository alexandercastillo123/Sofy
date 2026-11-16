import { z } from 'zod';
import { DipDirection, VeinInput } from '../../sofi/domain/types';

const numberField = z.number({ message: 'Ingresa un número válido' });

export const rumboVetaSchema = z.object({
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

export type FormValues = z.infer<typeof rumboVetaSchema>;

export type NumericFieldName = Exclude<keyof FormValues, 'dipDirection'>;

export const DIP_DIRECTIONS: { value: DipDirection; label: string; icon: string }[] = [
	{ value: 'NE', label: 'NE', icon: 'lucide:arrow-up-right' },
	{ value: 'SE', label: 'SE', icon: 'lucide:arrow-down-right' },
	{ value: 'SW', label: 'SW', icon: 'lucide:arrow-down-left' },
	{ value: 'NW', label: 'NW', icon: 'lucide:arrow-up-left' }
];

export function toFormValues(input: VeinInput): FormValues {
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

export function toVeinInput(values: FormValues): VeinInput {
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
