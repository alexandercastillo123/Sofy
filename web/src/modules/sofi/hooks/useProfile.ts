'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '../api/profile/profileApi';

export function useProfile() {
	return useQuery({
		queryKey: ['sofi', 'profile'],
		queryFn: fetchProfile
	});
}
