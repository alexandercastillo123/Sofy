import { MiningProject } from '../../domain/project';
import { MOCK_MINING_PROJECTS } from '../../data/mockProjects';
import { mockDelay } from '../mockDelay';

/**
 * Read-only projects created from the mobile app. When the backend exists,
 * replace these bodies with apiRequest<MiningProject[]>('/projects').
 */
export async function fetchProjects(): Promise<MiningProject[]> {
	return mockDelay(MOCK_MINING_PROJECTS);
}

export async function fetchProjectById(id: string): Promise<MiningProject | undefined> {
	return mockDelay(MOCK_MINING_PROJECTS.find((project) => project.id === id));
}
