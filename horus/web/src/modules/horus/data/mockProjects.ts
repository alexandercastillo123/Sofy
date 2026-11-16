import { HorusProject } from '../domain/types';

export const MOCK_PROJECTS: HorusProject[] = [
	{
		id: 'hrs-2041',
		code: 'HRS-2041',
		name: 'Veta Esperanza',
		zone: 'Zona II',
		status: 'En ejecución',
		updatedAt: '2026-11-02',
		strike: 20.6,
		dip: 62,
		tonnage: 18420,
		cost: 126850,
		analyst: 'A. Ríos'
	},
	{
		id: 'hrs-2038',
		code: 'HRS-2038',
		name: 'Veta San Jorge',
		zone: 'Zona I',
		status: 'Aprobado',
		updatedAt: '2026-10-30',
		strike: 118.4,
		dip: 57,
		tonnage: 12680,
		cost: 94300,
		analyst: 'M. Quispe'
	},
	{
		id: 'hrs-2035',
		code: 'HRS-2035',
		name: 'Rampa Norte 3',
		zone: 'Zona III',
		status: 'En análisis',
		updatedAt: '2026-10-28',
		strike: 246.2,
		dip: 68,
		tonnage: 22150,
		cost: 168420,
		analyst: 'A. Ríos'
	},
	{
		id: 'hrs-2029',
		code: 'HRS-2029',
		name: 'Veta Milagros',
		zone: 'Zona IV',
		status: 'En ejecución',
		updatedAt: '2026-10-22',
		strike: 312.8,
		dip: 55,
		tonnage: 9870,
		cost: 78240,
		analyst: 'L. Huamán'
	},
	{
		id: 'hrs-2024',
		code: 'HRS-2024',
		name: 'Cuerpo María',
		zone: 'Zona II',
		status: 'Cerrado',
		updatedAt: '2026-10-15',
		strike: 41.5,
		dip: 71,
		tonnage: 31240,
		cost: 214600,
		analyst: 'M. Quispe'
	},
	{
		id: 'hrs-2018',
		code: 'HRS-2018',
		name: 'Veta Carmen',
		zone: 'Zona I',
		status: 'Aprobado',
		updatedAt: '2026-10-08',
		strike: 156.9,
		dip: 60,
		tonnage: 15340,
		cost: 108900,
		analyst: 'L. Huamán'
	}
];

export const PRODUCTION_HISTORY = [
	{ month: 'May', tonnage: 14800, cost: 98200 },
	{ month: 'Jun', tonnage: 16250, cost: 104800 },
	{ month: 'Jul', tonnage: 15120, cost: 99800 },
	{ month: 'Ago', tonnage: 18900, cost: 118400 },
	{ month: 'Sep', tonnage: 20450, cost: 124600 },
	{ month: 'Oct', tonnage: 22680, cost: 137200 }
];
