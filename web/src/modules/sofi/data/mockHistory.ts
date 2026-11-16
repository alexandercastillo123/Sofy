import { HistoryEntry, VeinInput } from '../domain/types';
import { DEFAULT_VEIN_INPUT } from './defaults';
import { buildHistoryEntry } from '../lib/history';

function withInput(overrides: Partial<VeinInput>): VeinInput {
	return { ...DEFAULT_VEIN_INPUT, ...overrides };
}

export const MOCK_HISTORY: HistoryEntry[] = [
	buildHistoryEntry({
		id: 'calc-esperanza-3850',
		name: 'Veta Esperanza · Nivel 3850',
		createdAt: '2026-11-02T08:40:00.000Z',
		input: withInput({})
	}),
	buildHistoryEntry({
		id: 'calc-san-jorge-120',
		name: 'Veta San Jorge · Crucero 120',
		createdAt: '2026-10-30T14:15:00.000Z',
		input: withInput({
			em: { east: 1284.2, north: 8512.4, elevation: 3891.7 },
			p2: { east: 1348.9, north: 8596.2 },
			frente: { east: 1210.8, north: 8560.3, elevation: 3864.1 },
			dip: 57,
			dipDirection: 'NE',
			section: { height: 3.2, width: 2.8 },
			blasting: { advancePerBlast: 2.4, blastsPerDay: 2, costPerMeter: 172 }
		})
	}),
	buildHistoryEntry({
		id: 'calc-rampa-norte-3',
		name: 'Rampa Norte 3 · Proyecto diagonal',
		createdAt: '2026-10-28T10:05:00.000Z',
		input: withInput({
			em: { east: 1176.1, north: 8388.6, elevation: 3802.4 },
			p2: { east: 1132.7, north: 8461.9 },
			frente: { east: 1198.4, north: 8422.8, elevation: 3788.2 },
			dip: 68,
			dipDirection: 'NW',
			section: { height: 4, width: 3.5 },
			rock: { density: 2.85, swellFactor: 32 },
			blasting: { advancePerBlast: 3, blastsPerDay: 2, costPerMeter: 214 }
		})
	}),
	buildHistoryEntry({
		id: 'calc-milagros-445',
		name: 'Veta Milagros · Nivel 445',
		createdAt: '2026-10-22T16:30:00.000Z',
		input: withInput({
			em: { east: 1342.5, north: 8284.1, elevation: 3920.8 },
			p2: { east: 1420.3, north: 8228.7 },
			frente: { east: 1308.9, north: 8310.2, elevation: 3896.4 },
			dip: 55,
			dipDirection: 'SW',
			section: { height: 3.4, width: 3 },
			blasting: { advancePerBlast: 2.6, blastsPerDay: 3, costPerMeter: 198 }
		})
	})
];
