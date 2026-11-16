'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchProjectById } from '../api/projects/projectsApi';

export function useProject(id: string) {
	return useQuery({
		queryKey: ['sofi', 'projects', id],
		queryFn: () => fetchProjectById(id),
		enabled: Boolean(id)
	});
}
