import { CurrencyOption, VeinInput } from '../domain/types';

export const DEFAULT_VEIN_INPUT: VeinInput = {
	em: { east: 1248.4, north: 8426.7, elevation: 3852.3 },
	p2: { east: 1296.2, north: 8541.8 },
	frente: { east: 1182.5, north: 8489.1, elevation: 3828.6 },
	dip: 62,
	dipDirection: 'SE',
	section: { height: 3.5, width: 3 },
	rock: { density: 2.7, swellFactor: 28 },
	blasting: { advancePerBlast: 2.8, blastsPerDay: 2, costPerMeter: 185 }
};

export const CURRENCY_OPTIONS: CurrencyOption[] = [
	{ id: 'PEN', symbol: 'S/.', label: 'Soles', rate: 1 },
	{ id: 'USD', symbol: '$', label: 'Dólares', rate: 0.268 },
	{ id: 'EUR', symbol: '€', label: 'Euros', rate: 0.246 }
];

export const STAKE_DISTANCES = [5, 7, 10] as const;

export type StakeDistance = (typeof STAKE_DISTANCES)[number];
