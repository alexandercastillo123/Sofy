import { DashboardData } from '../../domain/types';
import { MOCK_PROJECTS, PRODUCTION_HISTORY } from '../../data/mockProjects';
import { mockDelay } from '../mockDelay';

/**
 * Mocked dashboard endpoint. When the backend exists, replace the body with:
 * return apiRequest<DashboardData>('/dashboard');
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

	return mockDelay({
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
