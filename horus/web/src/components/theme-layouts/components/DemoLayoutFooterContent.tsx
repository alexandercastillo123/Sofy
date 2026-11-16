import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

/**
 * HORUS application footer.
 */
function DemoLayoutFooterContent() {
	return (
		<div className="flex w-full flex-auto flex-wrap items-center justify-between gap-2 px-2">
			<div className="flex items-center gap-2">
				<FuseSvgIcon
					size={14}
					color="primary"
				>
					lucide:mountain
				</FuseSvgIcon>
				<Typography color="text.secondary">HORUS · Inteligencia Artificial Minera</Typography>
			</div>
			<div className="flex items-center gap-4">
				<Typography color="text.secondary">Datos simulados</Typography>
				<Typography color="text.secondary">v1.0.0</Typography>
			</div>
		</div>
	);
}

export default DemoLayoutFooterContent;
