'use client';

import { useContext } from 'react';
import { SofiWorkspaceContext } from './SofiWorkspaceContext';

function useSofiWorkspace() {
	const context = useContext(SofiWorkspaceContext);

	if (!context) {
		throw new Error('useSofiWorkspace must be used inside <SofiWorkspaceProvider>.');
	}

	return context;
}

export default useSofiWorkspace;
