import { analyzeVein, computeProjects } from './calculations';
import { MiningProject } from './project';
import { ProjectResult, VeinAnalysis, VeinInput } from './types';

export type ProjectSummary = {
	analysis: VeinAnalysis;
	projects: ProjectResult[];
	totalTonnage: number;
	totalCost: number;
	totalVolume: number;
	totalExpandedVolume: number;
	totalBlasts: number;
	durationDays: number;
};

/**
 * Single place that turns stored vein geometry into the numbers displayed in
 * the project header and detail. The same function feeds the list endpoint.
 */
export function summarizeProjectInput(input: VeinInput): ProjectSummary {
	const analysis = analyzeVein(input);
	const projects = computeProjects(input, analysis);

	return {
		analysis,
		projects,
		totalTonnage: projects.reduce((total, project) => total + project.tonnage, 0),
		totalCost: projects.reduce((total, project) => total + project.cost, 0),
		totalVolume: projects.reduce((total, project) => total + project.volume, 0),
		totalExpandedVolume: projects.reduce((total, project) => total + project.expandedVolume, 0),
		totalBlasts: projects.reduce((total, project) => total + project.blasts, 0),
		durationDays: Math.max(...projects.map((project) => project.durationDays))
	};
}

export function summarizeProject(project: MiningProject): ProjectSummary {
	return summarizeProjectInput(project.input);
}
