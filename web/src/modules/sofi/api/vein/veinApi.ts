import { analyzeVein, computeProjects } from '../../domain/calculations';
import { ProjectResult, VeinAnalysis, VeinInput } from '../../domain/types';
import { mockDelay } from '../mockDelay';

export type VeinCalculation = {
	analysis: VeinAnalysis;
	projects: ProjectResult[];
};

/**
 * Mocked calculation endpoint. The real implementation can post the input to
 * `/vein-cut` and return the server result without changing the UI contract.
 */
export async function calculateVein(input: VeinInput): Promise<VeinCalculation> {
	const analysis = analyzeVein(input);
	const projects = computeProjects(input, analysis);

	return mockDelay({ analysis, projects });
}
