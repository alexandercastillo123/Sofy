'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchDashboardData } from '../api/horusApi';

export function useDashboardData() {
	return useQuery({
		queryKey: ['horus', 'dashboard'],
		queryFn: fetchDashboardData
	});
}
