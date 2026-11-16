import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';

/**
 * Main navigation for the SOFI workspace.
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
				id: 'proyectos',
				title: 'Proyectos',
				type: 'item',
				icon: 'lucide:folder-kanban',
				url: '/proyectos'
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
				id: 'historial',
				title: 'Historial',
				type: 'item',
				icon: 'lucide:history',
				url: '/historial'
			},
			{
				id: 'punto-de-direccion',
				title: 'Punto de Dirección',
				type: 'item',
				icon: 'lucide:map-pin',
				url: '/punto-de-direccion'
			}
		]
	},
	{
		id: 'cuenta',
		title: 'Cuenta',
		subtitle: 'Perfil y plan de SOFI',
		type: 'group',
		icon: 'lucide:user-round',
		children: [
			{
				id: 'perfil',
				title: 'Mi perfil',
				type: 'item',
				icon: 'lucide:user-round',
				url: '/perfil'
			},
			{
				id: 'suscripciones',
				title: 'Suscripción',
				type: 'item',
				icon: 'lucide:credit-card',
				url: '/suscripciones'
			}
		]
	}
];

export default navigationConfig;
