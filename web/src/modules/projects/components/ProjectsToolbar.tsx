import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { ProjectStatus } from '../../sofi/domain/types';

type ProjectsToolbarProps = {
	query: string;
	onQueryChange: (value: string) => void;
	status: ProjectStatus | 'all';
	onStatusChange: (value: ProjectStatus | 'all') => void;
	zone: string;
	onZoneChange: (value: string) => void;
	zones: string[];
};

const STATUS_OPTIONS: (ProjectStatus | 'all')[] = [
	'all',
	'En análisis',
	'Aprobado',
	'En ejecución',
	'Cerrado'
];

function ProjectsToolbar({
	query,
	onQueryChange,
	status,
	onStatusChange,
	zone,
	onZoneChange,
	zones
}: ProjectsToolbarProps) {
	return (
		<div className="flex flex-col gap-3 pt-1 pb-4 md:flex-row md:items-center">
			<TextField
				size="small"
				value={query}
				onChange={(event) => onQueryChange(event.target.value)}
				placeholder="Buscar por nombre, código o ubicación"
				className="w-full md:max-w-sm"
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<FuseSvgIcon size={16}>lucide:search</FuseSvgIcon>
							</InputAdornment>
						)
					}
				}}
			/>
			<div className="flex flex-wrap items-center gap-2">
				<Select
					size="small"
					value={status}
					onChange={(event) => onStatusChange(event.target.value as ProjectStatus | 'all')}
					className="min-w-40 rounded-lg"
					startAdornment={<FuseSvgIcon size={16}>lucide:circle-dot</FuseSvgIcon>}
				>
					{STATUS_OPTIONS.map((option) => (
						<MenuItem
							key={option}
							value={option}
						>
							{option === 'all' ? 'Todos los estados' : option}
						</MenuItem>
					))}
				</Select>
				<Select
					size="small"
					value={zone}
					onChange={(event) => onZoneChange(event.target.value)}
					className="min-w-32 rounded-lg"
					startAdornment={<FuseSvgIcon size={16}>lucide:map</FuseSvgIcon>}
				>
					<MenuItem value="all">Todas las zonas</MenuItem>
					{zones.map((item) => (
						<MenuItem
							key={item}
							value={item}
						>
							{item}
						</MenuItem>
					))}
				</Select>
			</div>
		</div>
	);
}

export default ProjectsToolbar;
