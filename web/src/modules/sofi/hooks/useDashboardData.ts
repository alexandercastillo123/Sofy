'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchDashboardData } from '../api/dashboard/dashboardApi';

export function useDashboardData() {
	return useQuery({
		queryKey: ['sofi', 'dashboard'],
		queryFn: fetchDashboardData
	});
}
