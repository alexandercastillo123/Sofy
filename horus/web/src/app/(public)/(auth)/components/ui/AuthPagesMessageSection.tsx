import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

const FEATURES = [
	{
		icon: 'lucide:compass',
		title: 'Rumbo de veta automático',
		description: 'Calcula rumbo, azimut, caso y zona desde coordenadas UTM.'
	},
	{
		icon: 'lucide:box',
		title: 'Proyectos 3D comparables',
		description: 'Compara el proyecto perpendicular y diagonal con costos y tonelaje.'
	},
	{
		icon: 'lucide:map-pin',
		title: 'Estacas listas para campo',
		description: 'Genera puntos de dirección a 5, 7 o 10 metros del frente.'
	}
];

function AuthPagesMessageSection() {
	return (
		<Box
			className="relative hidden h-full flex-auto items-center justify-center overflow-hidden p-16 md:flex lg:px-24"
			sx={{
				background: (theme) =>
					`linear-gradient(145deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 55%, ${theme.palette.secondary.dark} 100%)`,
				color: 'primary.contrastText'
			}}
		>
			<svg
				className="pointer-events-none absolute inset-0"
				viewBox="0 0 960 540"
				width="100%"
				height="100%"
				preserveAspectRatio="xMidYMax slice"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g
					className="opacity-10"
					fill="none"
					stroke="currentColor"
					strokeWidth="80"
				>
					<circle
						r="234"
						cx="196"
						cy="23"
					/>
					<circle
						r="234"
						cx="790"
						cy="491"
					/>
				</g>
				<g
					stroke="currentColor"
					strokeWidth="1"
					opacity="0.15"
				>
					{Array.from({ length: 14 }).map((_, index) => (
						<path
							key={index}
							d={`M -100 ${90 + index * 32} C 220 ${20 + index * 26}, 520 ${180 + index * 18}, 1060 ${
								60 + index * 28
							}`}
							fill="none"
						/>
					))}
				</g>
			</svg>

			<div className="relative z-10 w-full max-w-lg">
				<Typography className="text-[11px] font-semibold tracking-[0.24em] uppercase opacity-80">
					Workspace de operaciones
				</Typography>
				<Typography className="mt-4 text-5xl leading-[1.1] font-extrabold tracking-tight">
					Geometría de veta, resuelta en segundos.
				</Typography>
				<Typography className="mt-4 max-w-md text-lg leading-snug opacity-80">
					Del afloramiento al estacado en una sola línea de trabajo, con trazabilidad entre cada módulo.
				</Typography>

				<div className="mt-10 flex flex-col gap-5">
					{FEATURES.map((feature) => (
						<div
							key={feature.title}
							className="flex items-start gap-4"
						>
							<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15">
								<FuseSvgIcon size={20}>{feature.icon}</FuseSvgIcon>
							</span>
							<div>
								<Typography className="font-semibold">{feature.title}</Typography>
								<Typography className="mt-0.5 opacity-75">{feature.description}</Typography>
							</div>
						</div>
					))}
				</div>

				<div className="mt-12 flex items-center gap-2 text-sm opacity-70">
					<FuseSvgIcon size={14}>lucide:shield-check</FuseSvgIcon>
					Entorno de demostración · datos simulados, sin backend
				</div>
			</div>
		</Box>
	);
}

export default AuthPagesMessageSection;
