'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchSubscription } from '../api/subscriptions/subscriptionsApi';

export function useSubscription() {
	return useQuery({
		queryKey: ['sofi', 'subscription'],
		queryFn: fetchSubscription
	});
}
