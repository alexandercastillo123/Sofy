'use client';

import dynamic from 'next/dynamic';
import Skeleton from '@mui/material/Skeleton';
import type { VeinScene3DProps } from './VeinScene3DCanvas';

const VeinScene3DCanvas = dynamic(() => import('./VeinScene3DCanvas'), {
	ssr: false,
	loading: () => (
		<Skeleton
			variant="rounded"
			width="100%"
			height={480}
		/>
	)
});

/**
 * Three.js is loaded only on the client, so the rest of the page can still be
 * rendered on the server and the viewer does not inflate the initial bundle.
 */
function VeinScene3D(props: VeinScene3DProps) {
	return <VeinScene3DCanvas {...props} />;
}

export default VeinScene3D;
