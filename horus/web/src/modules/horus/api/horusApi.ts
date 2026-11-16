import { DashboardData, HorusProject } from '../domain/types';
import { MOCK_PROJECTS, PRODUCTION_HISTORY } from '../data/mockProjects';

const NETWORK_DELAY = 450;

function delay<T>(value: T, ms = NETWORK_DELAY): Promise<T> {
	return new Promise((resolve) => {
		setTimeout(() => resolve(value), ms);
	});
}

/**
 * Mocked data access layer.
 * Replace these functions with HTTP calls when the backend is available.
 */
export async function fetchDashboardData(): Promise<DashboardData> {
	const projects = MOCK_PROJECTS;
	const activeProjects = projects.filter((project) => project.status !== 'Cerrado').length;
	const averageStrike = projects.reduce((total, project) => total + project.strike, 0) / projects.length;
	const estimatedInvestment = projects.reduce((total, project) => total + project.cost, 0);
	const projectedTonnage = projects.reduce((total, project) => total + project.tonnage, 0);
	const zoneMap = projects.reduce<Record<string, number>>((accumulator, project) => {
		accumulator[project.zone] = (accumulator[project.zone] ?? 0) + 1;
		return accumulator;
	}, {});

	return delay({
		metrics: {
			activeProjects,
			averageStrike,
			estimatedInvestment,
			projectedTonnage
		},
		production: PRODUCTION_HISTORY,
		zones: Object.entries(zoneMap).map(([zone, count]) => ({ zone, projects: count })),
		projects
	});
}

export async function fetchProjects(): Promise<HorusProject[]> {
	return delay(MOCK_PROJECTS);
}

export async function fetchProjectById(id: string): Promise<HorusProject | undefined> {
	return delay(MOCK_PROJECTS.find((project) => project.id === id));
}
