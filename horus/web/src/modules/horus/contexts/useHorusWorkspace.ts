'use client';

import { useContext } from 'react';
import { HorusWorkspaceContext } from './HorusWorkspaceContext';

function useHorusWorkspace() {
	const context = useContext(HorusWorkspaceContext);

	if (!context) {
		throw new Error('useHorusWorkspace must be used inside <HorusWorkspaceProvider>.');
	}

	return context;
}

export default useHorusWorkspace;
