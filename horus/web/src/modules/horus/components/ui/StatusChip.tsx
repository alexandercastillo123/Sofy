import Chip from '@mui/material/Chip';
import { alpha } from '@mui/material/styles';
import { ProjectStatus } from '../../domain/types';

type ChipColor = 'default' | 'success' | 'warning' | 'info' | 'error';

/**
 * MUI has no `palette.default` role, so "Cerrado" is resolved against
 * `text.primary` in the component instead of being looked up by palette name.
 */
const STATUS_COLOR: Record<ProjectStatus, ChipColor> = {
	'En análisis': 'warning',
	Aprobado: 'info',
	'En ejecución': 'success',
	Cerrado: 'default'
};

function StatusChip({ status }: { status: ProjectStatus }) {
	const color = STATUS_COLOR[status];

	return (
		<Chip
			size="small"
			label={status}
			color={color}
			className="rounded-md border-0 font-medium"
			sx={(theme) => {
				const main = color === 'default' ? theme.palette.text.primary : theme.palette[color].main;

				return {
					backgroundColor: alpha(main, 0.12),
					color: color === 'default' ? theme.palette.text.secondary : main,
					'& .MuiChip-label': { px: 1 }
				};
			}}
		/>
	);
}

export default StatusChip;
