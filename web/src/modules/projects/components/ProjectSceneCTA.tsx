import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Link from '@fuse/core/Link';

function ProjectSceneCTA({ projectId, projectName }: { projectId: string; projectName: string }) {
	return (
		<Paper
			elevation={0}
			className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl border p-5"
			sx={{
				borderColor: 'divider',
				background:
					'linear-gradient(145deg, rgba(47,125,246,0.14) 0%, rgba(99,102,241,0.08) 48%, rgba(15,23,42,0.02) 100%)'
			}}
		>
			<div>
				<div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--mui-palette-primary-main)] text-white">
					<FuseSvgIcon size={22}>lucide:box</FuseSvgIcon>
				</div>
				<Typography className="mt-4 text-lg font-semibold">Modelo 3D del proyecto</Typography>
				<Typography
					className="mt-1"
					color="text.secondary"
				>
					Recorre la veta, el frente y las dos trayectorias calculadas para {projectName}. Puedes rotar,
					acercar y ocultar capas.
				</Typography>
			</div>

			<div className="mt-6 flex flex-col gap-2">
				<Button
					component={Link}
					to={`/proyectos/${projectId}/simulacion-3d`}
					variant="contained"
					size="large"
					startIcon={<FuseSvgIcon size={17}>lucide:play</FuseSvgIcon>}
					className="rounded-lg"
					fullWidth
				>
					Abrir simulación 3D
				</Button>
				<Typography
					className="text-center text-xs"
					color="text.secondary"
				>
					Three.js · WebGL · vista interactiva
				</Typography>
			</div>
		</Paper>
	);
}

export default ProjectSceneCTA;
