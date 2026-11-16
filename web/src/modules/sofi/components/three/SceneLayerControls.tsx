import Chip from '@mui/material/Chip';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import type { SceneLayerVisibility } from './VeinScene3DCanvas';

type SceneLayerControlsProps = {
	value: SceneLayerVisibility;
	onChange: (value: SceneLayerVisibility) => void;
};

const LAYERS: { key: keyof SceneLayerVisibility; label: string; icon: string }[] = [
	{ key: 'vein', label: 'Veta', icon: 'lucide:layers' },
	{ key: 'projects', label: 'Proyectos', icon: 'lucide:route' },
	{ key: 'grid', label: 'Grilla', icon: 'lucide:grid-3x3' },
	{ key: 'labels', label: 'Etiquetas', icon: 'lucide:tag' }
];

function SceneLayerControls({ value, onChange }: SceneLayerControlsProps) {
	const toggle = (key: keyof SceneLayerVisibility) => {
		onChange({ ...value, [key]: !value[key] });
	};

	return (
		<div className="flex flex-wrap items-center gap-2">
			<span className="mr-1 text-[11px] font-semibold tracking-[0.12em] text-text-secondary uppercase">
				Capas
			</span>
			{LAYERS.map((layer) => (
				<Chip
					key={layer.key}
					size="small"
					clickable
					icon={
						<FuseSvgIcon size={13}>
							{layer.icon}
						</FuseSvgIcon>
					}
					label={layer.label}
					color={value[layer.key] ? 'primary' : 'default'}
					variant={value[layer.key] ? 'filled' : 'outlined'}
					onClick={() => toggle(layer.key)}
					className="rounded-md"
				/>
			))}
		</div>
	);
}

export default SceneLayerControls;
