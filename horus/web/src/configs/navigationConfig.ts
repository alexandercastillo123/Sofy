import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';

/**
 * Main navigation for the HORUS workspace.
 * Each item maps one-to-one with a route inside (control-panel).
 */
const navigationConfig: FuseNavItemType[] = [
	{
		id: 'operacion',
		title: 'Operación',
		subtitle: 'Flujo de análisis minero',
		type: 'group',
		icon: 'lucide:pickaxe',
		children: [
			{
				id: 'dashboard',
				title: 'Panel operativo',
				type: 'item',
				icon: 'lucide:layout-dashboard',
				url: '/dashboard'
			},
			{
				id: 'rumbo-de-veta',
				title: 'Rumbo de Veta',
				type: 'item',
				icon: 'lucide:compass',
				url: '/rumbo-de-veta'
			},
			{
				id: 'resultados-3d',
				title: 'Resultados 3D',
				type: 'item',
				icon: 'lucide:box',
				url: '/resultados-3d'
			},
			{
				id: 'punto-de-direccion',
				title: 'Punto de Dirección',
				type: 'item',
				icon: 'lucide:map-pin',
				url: '/punto-de-direccion'
			}
		]
	}
];

export default navigationConfig;
