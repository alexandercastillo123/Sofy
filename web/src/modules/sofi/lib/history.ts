import { analyzeVein, computeProjects } from '../domain/calculations';
import { HistoryEntry, VeinInput } from '../domain/types';

export const HISTORY_STORAGE_KEY = 'sofi.history';
export const MAX_HISTORY_ENTRIES = 50;

type BuildHistoryEntryParams = {
	name: string;
	input: VeinInput;
	createdAt?: string;
	id?: string;
};

function createId(): string {
	if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
		return crypto.randomUUID();
	}

	return `calc-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/**
 * Freezes the calculation snapshot so a previous analysis can be reopened
 * even after the workspace inputs change.
 */
export function buildHistoryEntry({
	name,
	input,
	createdAt = new Date().toISOString(),
	id = createId()
}: BuildHistoryEntryParams): HistoryEntry {
	const analysis = analyzeVein(input);
	const projects = computeProjects(input, analysis);

	return {
		id,
		name,
		createdAt,
		input,
		strike: analysis.strike,
		strikeLabel: analysis.label,
		caseId: analysis.caseId,
		zone: analysis.zone,
		dip: input.dip,
		dipDirection: input.dipDirection,
		perpendicularDistance: projects[0].distance,
		diagonalDistance: projects[1].distance,
		tonnage: projects.reduce((total, project) => total + project.tonnage, 0),
		cost: projects.reduce((total, project) => total + project.cost, 0)
	};
}
