'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '../api/projects/projectsApi';

export function useProjects() {
	return useQuery({
		queryKey: ['sofi', 'projects'],
		queryFn: fetchProjects
	});
}
